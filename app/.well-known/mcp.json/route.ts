import { site } from '@/data/site';
import { MCP_TOOLS } from '@/lib/mcp';

export const dynamic = 'force-static';

export function GET() {
  return new Response(
    JSON.stringify(
      {
        name: `${site.name} read-only server`,
        description: 'Daily AI brief and published notes. Read-only, no credentials.',
        version: '1.0.0',
        transport: { type: 'http', endpoint: `${site.url}/news/mcp` },
        authentication: { required: false },
        tools: MCP_TOOLS.map((t) => ({ name: t.name, description: t.description })),
        documentation: `${site.url}/docs/api`,
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=3600' } },
  );
}
