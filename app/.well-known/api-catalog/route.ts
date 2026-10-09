import { site } from '@/data/site';

export const dynamic = 'force-static';

/** RFC 9727 API catalog: one linkset that points at every machine-readable resource. */
export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${site.url}/`,
        'service-desc': [
          { href: `${site.url}/openapi.json`, type: 'application/vnd.oai.openapi+json', title: `OpenAPI 3.1 description of the ${site.name} read-only API` },
        ],
        'service-doc': [
          { href: `${site.url}/docs/api`, type: 'text/markdown', title: `${site.name} service documentation` },
          { href: `${site.url}/developers`, type: 'text/html', title: `${site.name} developer page` },
        ],
        'service-meta': [{ href: `${site.url}/.well-known/mcp.json`, type: 'application/json', title: 'MCP server manifest' }],
        alternate: [
          { href: `${site.url}/index.md`, type: 'text/markdown', title: 'Markdown representation of the home page' },
          { href: `${site.url}/.well-known/home.md`, type: 'text/markdown', title: 'Agent markdown home document' },
          { href: `${site.url}/llms.txt`, type: 'text/plain', title: 'llms.txt profile and link index' },
        ],
        collection: [
          { href: `${site.url}/news`, type: 'text/html', title: 'Curated daily AI brief' },
          { href: `${site.url}/notes`, type: 'text/html', title: 'Published notes' },
          { href: `${site.url}/blog`, type: 'text/html', title: 'Build-in-public blog' },
        ],
        related: [
          { href: `${site.url}/news/mcp`, type: 'application/json', title: 'Read-only MCP endpoint (JSON-RPC 2.0, no credentials)' },
          { href: `${site.url}/auth.md`, type: 'text/markdown', title: 'Authentication: none required' },
        ],
      },
    ],
  };
  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
