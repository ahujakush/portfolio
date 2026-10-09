import { handleRpc } from '@/lib/mcp';
import { site } from '@/data/site';

export const dynamic = 'force-dynamic';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers });
}

export function GET() {
  return new Response(
    JSON.stringify({ name: `${site.name} MCP server`, transport: 'POST JSON-RPC 2.0 to this URL', manifest: `${site.url}/.well-known/mcp.json` }, null, 2),
    { headers },
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }), { status: 400, headers });
  }
  const batch = Array.isArray(body);
  const messages = (batch ? body : [body]) as Parameters<typeof handleRpc>[0][];
  const replies = (await Promise.all(messages.map((m) => handleRpc(m)))).filter(Boolean);
  if (!replies.length) return new Response(null, { status: 202, headers });
  return new Response(JSON.stringify(batch ? replies : replies[0]), { headers });
}
