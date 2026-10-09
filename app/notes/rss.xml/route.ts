import { notes } from '@/data/notes';
import { site } from '@/data/site';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const items = notes
    .map(
      (n) => `
    <item>
      <title>${esc(n.title)}</title>
      <link>${site.url}/notes/${n.slug}</link>
      <guid isPermaLink="true">${site.url}/notes/${n.slug}</guid>
      <pubDate>${new Date(`${n.date}T00:00:00Z`).toUTCString()}</pubDate>${n.tags.map((t) => `\n      <category>${esc(t)}</category>`).join('')}
      <description>${esc(n.summary)}</description>
      <author>${esc(site.email)} (${esc(site.name)})</author>
    </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}: notes</title>
    <link>${site.url}/notes</link>
    <atom:link href="${site.url}/notes/rss.xml" rel="self" type="application/rss+xml" />
    <description>Short, one-idea notes on building and shipping AI products.</description>
    <language>en-in</language>${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
