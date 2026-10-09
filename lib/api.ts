import { site } from '@/data/site';

export const API_VERSION = '2026.10';

const base: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'X-API-Version': API_VERSION,
  'X-Content-Type-Options': 'nosniff',
};

/** Every REST response goes through here: JSON, open CORS, version header. */
export function json(data: unknown, init: { status?: number; maxAge?: number } = {}) {
  const { status = 200, maxAge = 300 } = init;
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      ...base,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 4}`,
    },
  });
}

/** Errors share one shape. Branch on `code`, never on `message`. */
export function apiError(status: number, code: string, message: string) {
  return json({ error: { code, message, docs: `${site.url}/docs/api` } }, { status, maxAge: 0 });
}

export const text = (body: string, type: string, maxAge = 3600) =>
  new Response(body, {
    headers: {
      'Content-Type': type,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}`,
    },
  });
