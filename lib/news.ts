import { createHash } from 'node:crypto';
import { parseFeed, toPlainText } from '@/lib/feed';
import { site } from '@/data/site';

/**
 * The daily AI brief: headlines and one-line summaries pulled from open feeds,
 * de-duplicated and tagged. Each item links to the original publisher; nothing
 * is republished in full.
 */

export type SectionSlug = 'releases' | 'research' | 'news' | 'community';

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string | null;
  section: SectionSlug;
  tags: string[];
};

export type NewsSection = { slug: SectionSlug; title: string; description: string; items: NewsItem[] };

export type Digest = {
  generatedAt: string;
  /** Changes only when the set of stories changes, so agents can poll cheaply. */
  lastUpdatedMarker: string;
  sources: { name: string; url: string }[];
  failedSources: string[];
  keywords: string[];
  sections: NewsSection[];
  items: NewsItem[];
};

export const REVALIDATE_SECONDS = 1800;
const UA = `Mozilla/5.0 (compatible; ${site.name.replace(' ', '')}Digest/1.0; +${site.url}/news)`;
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const PER_SOURCE_CAP = 3;

const SECTIONS: Record<SectionSlug, { title: string; description: string; limit: number }> = {
  releases: {
    title: 'From the labs',
    description: 'Announcements and engineering posts straight from the teams building the models.',
    limit: 10,
  },
  research: {
    title: 'Research worth reading',
    description: 'The most upvoted new papers of the day, via Hugging Face Daily Papers.',
    limit: 8,
  },
  news: {
    title: 'In the news',
    description: 'Reporting and analysis from technology publications.',
    limit: 10,
  },
  community: {
    title: 'On Hacker News',
    description: 'AI stories on the front page right now, and the discussion around them.',
    limit: 8,
  },
};

const FEEDS: { name: string; url: string; section: SectionSlug }[] = [
  { name: 'OpenAI', url: 'https://openai.com/news/rss.xml', section: 'releases' },
  { name: 'Google DeepMind', url: 'https://deepmind.google/blog/rss.xml', section: 'releases' },
  { name: 'Google Research', url: 'https://research.google/blog/rss/', section: 'releases' },
  { name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', section: 'releases' },
  { name: 'TechCrunch', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', section: 'news' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', section: 'news' },
  { name: 'MIT Technology Review', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed', section: 'news' },
];

const TAGS: [string, RegExp][] = [
  ['agents', /\bagent(s|ic)?\b|\bMCP\b|tool[- ]use|function[- ]calling|computer use/i],
  ['models', /\b(GPT|Claude|Gemini|Llama|Mistral|Qwen|DeepSeek|Grok|Sonnet|Opus|Haiku|LLMs?)\b|language model|foundation model|frontier model/i],
  ['open-source', /open[- ]source|open[- ]weights?|\bapache\b|hugging ?face/i],
  ['research', /\bpapers?\b|arxiv|benchmarks?|researchers?|study\b/i],
  ['safety', /\bsafety\b|alignment|jailbreak|red[- ]team|guardrails?|misuse|security/i],
  ['infra', /\bGPUs?\b|inference|\bchips?\b|data ?cent(er|re)s?|\bcloud\b|latency|compute/i],
  ['coding', /\bcod(e|ing)\b|developers?|\bIDE\b|Cursor|Copilot|Codex|software engineer/i],
  ['startups', /\braises?\b|funding|series [a-d]\b|valuation|acquir|\bIPO\b/i],
  ['robotics', /robot/i],
  ['india', /\bIndia(n)?\b|Bengaluru|Bangalore|Gurugram|Delhi|Mumbai|Hyderabad/i],
];

const AI_RELEVANT = /\bAI\b|\bA\.I\.|\bLLMs?\b|\bGPT|Claude|Anthropic|OpenAI|Gemini|DeepMind|Mistral|Llama|Qwen|DeepSeek|neural|machine learning|deep learning|transformer|diffusion|chatbot|copilot|agentic|\bagents?\b|\bMCP\b|inference|fine-?tun|embedding|RAG\b|\bGPU|NVIDIA|robot/i;

const hash = (s: string) => createHash('sha1').update(s).digest('hex').slice(0, 10);

const shorten = (s: string, max = 220) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 120)).replace(/[.,;:!?-]+$/, '')}…`;
};

function tagsFor(text: string) {
  return TAGS.filter(([, re]) => re.test(text)).map(([t]) => t).slice(0, 4);
}

function words(title: string) {
  return new Set(title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2));
}

function similar(a: Set<string>, b: Set<string>) {
  if (!a.size || !b.size) return false;
  let hit = 0;
  for (const w of a) if (b.has(w)) hit++;
  return hit / Math.min(a.size, b.size) >= 0.75 && hit >= 4;
}

async function getText(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*' },
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(9000),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.text();
}

async function getJson<T>(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(9000),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return (await res.json()) as T;
}

type Raw = Omit<NewsItem, 'id' | 'tags'> & { rank?: number };

async function fromFeeds(failed: string[]): Promise<Raw[]> {
  const batches = await Promise.all(
    FEEDS.map(async (f) => {
      try {
        const xml = await getText(f.url);
        return parseFeed(xml).map<Raw>((i) => ({
          title: i.title,
          // Some feeds put only a category label in the description; that is not a summary.
          summary: i.summary.length >= 50 ? shorten(i.summary) : '',
          url: i.url,
          source: f.name,
          publishedAt: i.publishedAt,
          section: f.section,
        }));
      } catch {
        failed.push(f.name);
        return [];
      }
    }),
  );
  return batches.flat();
}

async function fromHackerNews(failed: string[]): Promise<Raw[]> {
  try {
    const data = await getJson<{ hits: { title: string; url: string | null; objectID: string; created_at: string; points: number; num_comments: number }[] }>(
      'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=60',
    );
    return data.hits
      .filter((h) => h.title && AI_RELEVANT.test(h.title))
      .map<Raw>((h) => ({
        title: h.title,
        summary: `${h.points} points · ${h.num_comments} comments on Hacker News`,
        url: h.url ?? `https://news.ycombinator.com/item?id=${h.objectID}`,
        source: 'Hacker News',
        publishedAt: h.created_at,
        section: 'community',
        rank: h.points,
      }));
  } catch {
    failed.push('Hacker News');
    return [];
  }
}

async function fromPapers(failed: string[]): Promise<Raw[]> {
  try {
    const data = await getJson<{ paper: { id: string; title: string; summary: string; upvotes: number; publishedAt: string } }[]>(
      'https://huggingface.co/api/daily_papers?limit=30',
    );
    return data
      .filter((d) => d.paper?.title)
      .map<Raw>((d) => ({
        title: toPlainText(d.paper.title),
        summary: shorten(toPlainText(d.paper.summary ?? '')),
        url: `https://huggingface.co/papers/${d.paper.id}`,
        source: 'Hugging Face Papers',
        publishedAt: d.paper.publishedAt ?? null,
        section: 'research',
        rank: d.paper.upvotes,
      }));
  } catch {
    failed.push('Hugging Face Papers');
    return [];
  }
}

export async function getDigest(): Promise<Digest> {
  const failed: string[] = [];
  const [feeds, hn, papers] = await Promise.all([fromFeeds(failed), fromHackerNews(failed), fromPapers(failed)]);
  const now = Date.now();

  const fresh = [...feeds, ...hn, ...papers].filter((i) => {
    if (!/^https?:\/\//.test(i.url)) return false;
    // Feeds with no date stay; dated items must be recent.
    if (i.publishedAt && now - new Date(i.publishedAt).getTime() > MAX_AGE_MS) return false;
    // General-interest feeds only: the lab and paper sources are already on topic.
    if (i.section === 'news' && !AI_RELEVANT.test(`${i.title} ${i.summary}`)) return false;
    return true;
  });

  // Dedupe by canonical URL, then by near-identical headlines.
  const seenUrl = new Set<string>();
  const kept: { item: Raw; words: Set<string> }[] = [];
  for (const item of fresh) {
    const key = item.url.replace(/[?#].*$/, '').replace(/\/$/, '').toLowerCase();
    if (seenUrl.has(key)) continue;
    const w = words(item.title);
    if (kept.some((k) => similar(k.words, w))) continue;
    seenUrl.add(key);
    kept.push({ item, words: w });
  }

  const byNewest = (a: Raw, b: Raw) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime();

  const sections = (Object.keys(SECTIONS) as SectionSlug[]).map<NewsSection>((slug) => {
    const pool = kept.map((k) => k.item).filter((i) => i.section === slug);
    const ranked = slug === 'research' || slug === 'community';
    const ordered = ranked ? pool.sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0)) : pool.sort(byNewest);
    // No single publisher fills a section: one voice would make the brief a feed, not a digest.
    const taken = new Map<string, number>();
    const balanced = ranked
      ? ordered
      : ordered.filter((i) => {
          const n = taken.get(i.source) ?? 0;
          taken.set(i.source, n + 1);
          return n < PER_SOURCE_CAP;
        });
    const items = balanced.slice(0, SECTIONS[slug].limit).map<NewsItem>(({ rank: _rank, ...rest }) => ({
      ...rest,
      id: hash(rest.url),
      tags: tagsFor(`${rest.title} ${rest.summary}`),
    }));
    return { slug, title: SECTIONS[slug].title, description: SECTIONS[slug].description, items };
  });

  const items = sections.flatMap((s) => s.items);
  const tally = new Map<string, number>();
  for (const i of items) for (const t of i.tags) tally.set(t, (tally.get(t) ?? 0) + 1);
  const keywords = [...tally.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);

  return {
    generatedAt: new Date().toISOString(),
    lastUpdatedMarker: hash(items.map((i) => i.id).join(',')),
    sources: [
      ...FEEDS.map((f) => ({ name: f.name, url: f.url })),
      { name: 'Hacker News', url: 'https://news.ycombinator.com' },
      { name: 'Hugging Face Papers', url: 'https://huggingface.co/papers' },
    ],
    failedSources: failed,
    keywords,
    sections,
    items,
  };
}

export function digestToMarkdown(d: Digest) {
  const date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeZone: 'Asia/Kolkata' }).format(new Date(d.generatedAt));
  const body = d.sections
    .filter((s) => s.items.length)
    .map(
      (s) =>
        `## ${s.title}\n\n${s.items
          .map((i) => `- [${i.title}](${i.url}) (${i.source})${i.summary ? `: ${i.summary}` : ''}`)
          .join('\n')}`,
    )
    .join('\n\n');
  return `# The daily AI brief, ${date}\n\n> A curated, de-duplicated digest of AI releases, research and discussion from open sources. Every item links to its original publisher.\n\nUpdated: ${d.generatedAt}\n\n${body}\n`;
}
