/** A tiny RSS 2.0 / Atom reader. Pulling in an XML library for four fields is not worth the bundle. */
export type FeedItem = { title: string; url: string; summary: string; publishedAt: string | null };

const NAMED: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', hellip: '…' };

function decodeEntities(s: string) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n: string) => NAMED[n.toLowerCase()] ?? m);
}

/** CDATA out, entities decoded, tags dropped, whitespace collapsed. */
export function toPlainText(raw: string) {
  const noCdata = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  return decodeEntities(decodeEntities(noCdata).replace(/<\/?[a-z][^>]*>/gi, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function tag(block: string, name: string) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? m[1] : '';
}

function linkOf(block: string) {
  const rss = toPlainText(tag(block, 'link'));
  if (/^https?:\/\//i.test(rss)) return rss;
  const links = [...block.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
  const alternate = links.find((l) => /rel=["']alternate["']/i.test(l)) ?? links.find((l) => !/rel=/i.test(l)) ?? links[0];
  const href = alternate?.match(/href=["']([^"']+)["']/i)?.[1];
  if (href) return decodeEntities(href);
  const guid = toPlainText(tag(block, 'guid'));
  return /^https?:\/\//i.test(guid) ? guid : '';
}

function isoDate(raw: string) {
  if (!raw) return null;
  const d = new Date(toPlainText(raw));
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export function parseFeed(xml: string): FeedItem[] {
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) ?? [];
  const items: FeedItem[] = [];
  for (const block of blocks) {
    const title = toPlainText(tag(block, 'title'));
    const url = linkOf(block);
    if (!title || !url) continue;
    const summary = toPlainText(tag(block, 'description') || tag(block, 'summary') || tag(block, 'content:encoded') || tag(block, 'content'));
    const publishedAt = isoDate(tag(block, 'pubDate') || tag(block, 'published') || tag(block, 'updated') || tag(block, 'dc:date'));
    items.push({ title, url, summary, publishedAt });
  }
  return items;
}
