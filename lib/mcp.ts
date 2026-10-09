import { getNote, notes } from '@/data/notes';
import { site } from '@/data/site';
import { getDigest } from '@/lib/news';

/** Minimal read-only MCP server (JSON-RPC 2.0 over HTTP). Three tools, no credentials, no writes. */
export const MCP_TOOLS = [
  {
    name: 'get_daily_ai_brief',
    description: 'Get the curated daily AI news digest: lab announcements, research, news and Hacker News discussion, de-duplicated.',
    inputSchema: {
      type: 'object',
      properties: {
        section: { type: 'string', enum: ['releases', 'research', 'news', 'community'], description: 'Limit to one section.' },
        tag: { type: 'string', description: 'Only items carrying this tag, for example "agents" or "open-source".' },
        limit: { type: 'integer', minimum: 1, maximum: 50, description: 'Maximum items to return. Default 20.' },
      },
    },
  },
  {
    name: 'list_notes',
    description: `List the short notes published by ${site.name}.`,
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_note',
    description: 'Read one note in full by slug.',
    inputSchema: { type: 'object', properties: { slug: { type: 'string' } }, required: ['slug'] },
  },
] as const;

type Rpc = { jsonrpc?: string; id?: string | number | null; method?: string; params?: Record<string, unknown> };

const ok = (id: Rpc['id'], result: unknown) => ({ jsonrpc: '2.0', id: id ?? null, result });
const fail = (id: Rpc['id'], code: number, message: string) => ({ jsonrpc: '2.0', id: id ?? null, error: { code, message } });
const content = (data: unknown) => ({ content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] });

async function callTool(name: string, args: Record<string, unknown>) {
  if (name === 'get_daily_ai_brief') {
    const d = await getDigest();
    const limit = Math.min(Math.max(Number(args.limit) || 20, 1), 50);
    const items = d.items
      .filter((i) => !args.section || i.section === args.section)
      .filter((i) => !args.tag || i.tags.includes(String(args.tag)))
      .slice(0, limit);
    return content({ generatedAt: d.generatedAt, lastUpdatedMarker: d.lastUpdatedMarker, count: items.length, items });
  }
  if (name === 'list_notes') {
    return content(notes.map((n) => ({ slug: n.slug, title: n.title, summary: n.summary, date: n.date, url: `${site.url}/notes/${n.slug}` })));
  }
  if (name === 'get_note') {
    const n = getNote(String(args.slug ?? ''));
    return n ? content(n) : { isError: true, content: [{ type: 'text', text: 'No note with that slug.' }] };
  }
  return null;
}

/** Returns a JSON-RPC response, or null for notifications (which get no reply). */
export async function handleRpc(msg: Rpc) {
  const { id, method, params = {} } = msg;
  switch (method) {
    case 'initialize':
      return ok(id, {
        protocolVersion: '2025-03-26',
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: `${site.url.replace('https://', '')}`, version: '1.0.0' },
        instructions: 'Read-only. Use get_daily_ai_brief for current AI news and list_notes / get_note for published notes.',
      });
    case 'ping':
      return ok(id, {});
    case 'tools/list':
      return ok(id, { tools: MCP_TOOLS });
    case 'tools/call': {
      const result = await callTool(String(params.name ?? ''), (params.arguments as Record<string, unknown>) ?? {});
      return result ? ok(id, result) : fail(id, -32602, `Unknown tool: ${String(params.name)}`);
    }
    default:
      if (method?.startsWith('notifications/')) return null;
      return fail(id, -32601, `Method not found: ${method ?? ''}`);
  }
}
