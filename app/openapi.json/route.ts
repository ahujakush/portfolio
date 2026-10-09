import { openapi } from '@/lib/openapi';

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify(openapi, null, 2), {
    headers: {
      'Content-Type': 'application/vnd.oai.openapi+json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
