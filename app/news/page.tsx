import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/data/site';
import { getDigest, type NewsItem } from '@/lib/news';
import { SplitHeading } from '@/components/ui/split-heading';
import { Reveal } from '@/components/ui/reveal';
import { ArrowUpRight } from '@/components/ui/icons';

export const revalidate = 1800;

export const metadata: Metadata = {
  title: 'Daily AI brief: today’s AI news, research and releases',
  description:
    'A curated, de-duplicated daily digest of AI releases, research papers and discussion from the labs, the press and Hacker News. Refreshed every 30 minutes, with every story linking to its original publisher.',
  alternates: { canonical: '/news', types: { 'text/markdown': '/news/md' } },
};

const IST = { timeZone: 'Asia/Kolkata' } as const;
const when = (iso: string | null) =>
  iso
    ? new Intl.DateTimeFormat('en-GB', { ...IST, day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso))
    : null;

function Story({ item }: { item: NewsItem }) {
  const time = when(item.publishedAt);
  return (
    <li className="border-b border-line">
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[1fr_auto] items-start gap-4 py-6 sm:gap-8">
        <span>
          <span className="block font-display text-[19px] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent-text sm:text-[22px]">
            {item.title}
          </span>
          {item.summary && (
            <span className="prose-serif mt-2 line-clamp-2 block max-w-[68ch] text-[16px] leading-relaxed text-fg2">{item.summary}</span>
          )}
          <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-fg3">
            <span className="text-fg2">{item.source}</span>
            {time && item.publishedAt && <time dateTime={item.publishedAt}>{time} IST</time>}
            {item.tags.map((t) => (
              <span key={t} className="rounded-full border border-fg/10 px-2 py-0.5">
                {t}
              </span>
            ))}
          </span>
        </span>
        <span className="mt-1 grid size-9 place-items-center rounded-full border border-fg/10 text-fg2 transition-[background-color,border-color,color] duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <ArrowUpRight width={15} height={15} />
        </span>
      </a>
    </li>
  );
}

export default async function NewsPage() {
  const d = await getDigest();
  const sections = d.sections.filter((s) => s.items.length);
  const date = new Intl.DateTimeFormat('en-GB', { ...IST, dateStyle: 'full' }).format(new Date(d.generatedAt));
  const updated = new Intl.DateTimeFormat('en-GB', { ...IST, dateStyle: 'medium', timeStyle: 'short' }).format(new Date(d.generatedAt));

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Daily AI brief',
    url: `${site.url}/news`,
    description: 'A curated, de-duplicated daily digest of AI releases, research and discussion.',
    dateModified: d.generatedAt,
    author: { '@id': `${site.url}/#person` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: d.items.length,
      itemListElement: d.items.slice(0, 30).map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.title, url: i.url })),
    },
  };

  return (
    <div className="container pb-24 pt-36 sm:pt-44">
      <p className="eyebrow flex items-center gap-2">
        <span className="h-px w-6 bg-accent" />
        Daily brief · {date}
      </p>
      <SplitHeading
        as="h1"
        onMount
        className="mt-6 text-huge font-bold"
        lines={['The daily', 'AI brief.']}
        accent={['AI', 'brief.']}
        accentStyle="sans"
        swoosh="brief."
      />
      <Reveal as="p" delay={0.2} className="mt-8 max-w-[62ch] text-[19px] leading-relaxed text-fg">
        What shipped, what was published and what people are arguing about in AI today. Headlines are gathered from lab blogs, the press, research feeds and
        Hacker News, then de-duplicated and tagged. Every story links to its original publisher.
      </Reveal>
      <Reveal delay={0.3} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-fg3">
        <span>
          Updated {updated} IST · refreshed every 30 minutes
        </span>
        <span aria-hidden>·</span>
        <span>{d.items.length} stories</span>
        <span aria-hidden>·</span>
        <a href="/news/md" className="underline decoration-fg/20 underline-offset-4 transition-colors hover:text-fg">
          Markdown
        </a>
        <a href="/api/news" className="underline decoration-fg/20 underline-offset-4 transition-colors hover:text-fg">
          JSON
        </a>
      </Reveal>

      {sections.length > 1 && (
        <nav aria-label="Sections" className="mt-10 flex flex-wrap gap-2">
          {sections.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="btn-ghost h-10 px-4 text-[14px]">
              {s.title}
              <span className="font-mono text-[12px] text-fg3">{s.items.length}</span>
            </a>
          ))}
        </nav>
      )}

      {sections.length === 0 ? (
        <p className="mt-16 max-w-[52ch] text-[18px] text-fg2">
          The feeds are warming up. Check back in a few minutes, or read the <Link href="/notes" className="text-accent-text underline underline-offset-4">notes</Link> in the meantime.
        </p>
      ) : (
        sections.map((s) => (
          <section key={s.slug} id={s.slug} className="mt-16 scroll-mt-28">
            <div className="flex flex-col gap-1 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-[28px] font-bold tracking-[-0.03em]">{s.title}</h2>
              <p className="text-[14px] text-fg3">{s.description}</p>
            </div>
            <ul>
              {s.items.map((i) => (
                <Story key={i.id} item={i} />
              ))}
            </ul>
          </section>
        ))
      )}

      <p className="mt-16 max-w-[70ch] border-t border-line pt-6 text-[13px] leading-relaxed text-fg3">
        Sources: {d.sources.map((s) => s.name).join(', ')}. Summaries are short excerpts supplied by each publisher’s own feed; follow the link for the full piece.
        Agents can use the <a href="/docs/api" className="underline underline-offset-4 hover:text-fg">public API</a> or the{' '}
        <a href="/news/mcp" className="underline underline-offset-4 hover:text-fg">MCP server</a>.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
