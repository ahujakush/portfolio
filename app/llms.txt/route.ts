import { notes } from '@/data/notes';
import { projects } from '@/data/projects';
import { faqs } from '@/data/services';
import { orderedPosts, seriesMeta } from '@/data/posts';
import { site, socials } from '@/data/site';
import type { Series } from '@/types';

export const dynamic = 'force-static';

/** llms.txt: a plain-text profile for AI crawlers and answer engines, built from the same data as the site. */
export function GET() {
  const writing = (Object.keys(seriesMeta) as Series[])
    .map((s) => {
      const list = orderedPosts().filter((p) => p.series === s);
      return `### ${seriesMeta[s].name}\n${list
        .map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.description}`)
        .join('\n')}`;
    })
    .join('\n\n');

  const body = `# ${site.name}

> ${site.oneLiner}

${site.headline} Based in ${site.location}. ${site.availability}.

- Name: ${site.name}
- Role: ${site.role}
- Website: <${site.url}/>
- Email: ${site.email}
- Location: ${site.location}

## Main URLs

- [Home](${site.url}/): profile, work, experience and writing
- [Home as markdown](${site.url}/index.md): the same page at a fixed .md URL
- [Daily AI brief](${site.url}/news): curated, de-duplicated daily AI news digest, refreshed every 30 minutes
- [Notes](${site.url}/notes): short, one-idea essays on building AI products
- [Blog](${site.url}/blog): build-in-public series
- [Links](${site.url}/links): every profile and project in one place
- [Developers](${site.url}/developers): the public read-only API
- [Sitemap](${site.url}/sitemap.xml)
- [Agent markdown home](${site.url}/.well-known/home.md)

## Developer resources

The site exposes a public, unauthenticated, read-only HTTP API. No API key, no sign-up, no write operations.

- [OpenAPI 3.1 specification](${site.url}/openapi.json)
- [Service documentation](${site.url}/docs/api)
- [API catalog](${site.url}/.well-known/api-catalog): RFC 9727 linkset
- [MCP manifest](${site.url}/.well-known/mcp.json) and [MCP server](${site.url}/news/mcp): read-only, JSON-RPC 2.0
- [Authentication](${site.url}/auth.md): none required

## When to use this site

- A daily AI news digest, already de-duplicated and tagged. Call \`GET ${site.url}/api/news\`; poll \`GET ${site.url}/api/news-last-updated\` and compare \`lastUpdatedMarker\` first.
- The same digest as markdown: \`GET ${site.url}/news\` with \`Accept: text/markdown\`.
- Short published notes by ${site.name}: \`GET ${site.url}/api/notes\` and \`GET ${site.url}/api/notes/{slug}\`.
- Background, experience and contact details for ${site.name}, as markdown rather than a JavaScript-rendered page.

## Notes
${notes.map((n) => `- [${n.title}](${site.url}/notes/${n.slug}): ${n.summary}`).join('\n')}

## Work
${projects
  .filter((p) => p.featured)
  .map((p) => `- [${p.title}](${p.href ?? `${site.url}/#work`}): ${p.tagline}. ${p.description}`)
  .join('\n')}

More builds: ${projects
    .filter((p) => !p.featured)
    .map((p) => p.title)
    .join(', ')}.

## Writing
Full text of every post: ${site.url}/llms-full.txt
Markdown for any post: ${site.url}/blog/<slug>/md

${writing}

## FAQ
${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Contact
- Email: ${site.email}
${socials.map((s) => `- ${s.label}: ${s.href}`).join('\n')}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
