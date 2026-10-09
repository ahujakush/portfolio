import { text } from '@/lib/api';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export const GET = () =>
  text(
    `# Authentication

${site.url} needs no credentials.

- Every endpoint documented at ${site.url}/docs/api is a public GET and needs no API key, token or sign-up.
- The MCP server at ${site.url}/news/mcp is read-only and needs no credentials.
- There are no write endpoints, so there is nothing to authenticate for.

Questions: ${site.email}
`,
    'text/markdown; charset=utf-8',
  );
