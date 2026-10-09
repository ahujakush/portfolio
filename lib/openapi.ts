import { API_VERSION } from '@/lib/api';
import { site } from '@/data/site';

const errorRef = { $ref: '#/components/schemas/Error' };
const err = (description: string) => ({ description, content: { 'application/json': { schema: errorRef } } });

/** OpenAPI 3.1 description of the public, read-only API. Served at /openapi.json. */
export const openapi = {
  openapi: '3.1.0',
  info: {
    title: `${site.name} API`,
    version: API_VERSION,
    summary: `Read-only endpoints for the daily AI brief and published notes of ${site.name}.`,
    description:
      'Public, unauthenticated, read-only HTTP API. No API key, no sign-up, no write operations.\n\n' +
      'When to use: fetch the curated daily AI news digest, read published notes, or get an agent-readable markdown version of the site. Every endpoint is a plain GET and returns JSON unless stated otherwise.\n\n' +
      'Markdown negotiation: `/` and `/news` return `text/markdown` when the request sends `Accept: text/markdown`, and HTML otherwise.\n\n' +
      'Versioning: the API is versioned by date, matching info.version, and reported in the `X-API-Version` response header. Every endpoint is also reachable under a stable `/api/v1/` prefix.\n\n' +
      'Rate limits: none are enforced. Please stay under about 60 requests per minute and send an identifying User-Agent.\n\n' +
      'Errors: every REST error uses the Error schema. Branch on the stable `code` field, never on the message text.',
    contact: { name: site.name, email: site.email, url: site.url },
  },
  servers: [
    { url: site.url, description: 'Production' },
    { url: `${site.url}/api/v1`, description: 'Stable versioned prefix' },
  ],
  externalDocs: { description: 'Service documentation', url: `${site.url}/docs/api` },
  tags: [
    { name: 'news', description: 'Curated daily AI news digest.' },
    { name: 'notes', description: 'Published notes.' },
  ],
  paths: {
    '/api/news': {
      get: {
        operationId: 'getNewsDigest',
        tags: ['news'],
        summary: 'Get the current daily news digest',
        description:
          'Returns the aggregated AI digest behind /news: sections, de-duplicated stories with short summaries and tags, and the sources it was built from. Refreshed every 30 minutes. Use `lastUpdatedMarker` to detect a change without diffing the body.',
        responses: {
          '200': {
            description: 'The digest.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Digest' } } },
          },
        },
      },
    },
    '/api/news-last-updated': {
      get: {
        operationId: 'getNewsLastUpdated',
        tags: ['news'],
        summary: 'Cheap freshness check for the digest',
        description: 'Compare `lastUpdatedMarker` for equality before re-fetching /api/news.',
        responses: {
          '200': {
            description: 'Freshness marker.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['lastUpdatedMarker', 'generatedAt', 'count'],
                  properties: {
                    lastUpdatedMarker: { type: 'string' },
                    generatedAt: { type: 'string', format: 'date-time' },
                    count: { type: 'integer' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/notes': {
      get: {
        operationId: 'listNotes',
        tags: ['notes'],
        summary: 'List published notes',
        responses: {
          '200': {
            description: 'All notes, newest first.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    count: { type: 'integer' },
                    notes: { type: 'array', items: { $ref: '#/components/schemas/NoteSummary' } },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/notes/{slug}': {
      get: {
        operationId: 'getNote',
        tags: ['notes'],
        summary: 'Get one note in full',
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': {
            description: 'The note.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Note' } } },
          },
          '404': err('No note with that slug. Error code: note_not_found.'),
        },
      },
    },
  },
  components: {
    schemas: {
      Error: {
        type: 'object',
        required: ['error'],
        properties: {
          error: {
            type: 'object',
            required: ['code', 'message'],
            properties: { code: { type: 'string' }, message: { type: 'string' }, docs: { type: 'string', format: 'uri' } },
          },
        },
      },
      NewsItem: {
        type: 'object',
        required: ['id', 'title', 'url', 'source', 'section', 'tags'],
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          summary: { type: 'string' },
          url: { type: 'string', format: 'uri', description: 'Link to the original publisher.' },
          source: { type: 'string' },
          publishedAt: { type: ['string', 'null'], format: 'date-time' },
          section: { type: 'string', enum: ['releases', 'research', 'news', 'community'] },
          tags: { type: 'array', items: { type: 'string' } },
        },
      },
      Digest: {
        type: 'object',
        required: ['generatedAt', 'lastUpdatedMarker', 'sections', 'items'],
        properties: {
          generatedAt: { type: 'string', format: 'date-time' },
          lastUpdatedMarker: { type: 'string' },
          keywords: { type: 'array', items: { type: 'string' } },
          sources: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, url: { type: 'string', format: 'uri' } } } },
          failedSources: { type: 'array', items: { type: 'string' } },
          sections: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                slug: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                items: { type: 'array', items: { $ref: '#/components/schemas/NewsItem' } },
              },
            },
          },
          items: { type: 'array', items: { $ref: '#/components/schemas/NewsItem' } },
        },
      },
      NoteSummary: {
        type: 'object',
        properties: {
          slug: { type: 'string' },
          title: { type: 'string' },
          summary: { type: 'string' },
          date: { type: 'string', format: 'date' },
          tags: { type: 'array', items: { type: 'string' } },
          url: { type: 'string', format: 'uri' },
          api: { type: 'string', format: 'uri' },
          fullPost: { type: ['string', 'null'], format: 'uri' },
        },
      },
      Note: {
        type: 'object',
        properties: {
          slug: { type: 'string' },
          title: { type: 'string' },
          summary: { type: 'string' },
          date: { type: 'string', format: 'date' },
          tags: { type: 'array', items: { type: 'string' } },
          body: { type: 'array', items: { type: 'string' }, description: 'Paragraphs, in order.' },
          url: { type: 'string', format: 'uri' },
          fullPost: { type: ['string', 'null'], format: 'uri' },
          author: { type: 'object', properties: { name: { type: 'string' }, url: { type: 'string', format: 'uri' } } },
        },
      },
    },
  },
} as const;

export function apiDocsMarkdown() {
  return `---
title: ${site.name} API
version: ${API_VERSION}
canonical: ${site.url}/docs/api
---

# ${site.name} API

A public, unauthenticated, read-only HTTP API. No API key, no sign-up, no write operations.

- OpenAPI 3.1: ${site.url}/openapi.json
- API catalog (RFC 9727): ${site.url}/.well-known/api-catalog
- MCP server (read-only, JSON-RPC 2.0): POST ${site.url}/news/mcp
- Base URL: \`${site.url}\`. Also available under \`${site.url}/api/v1\`.

## Endpoints

### GET /api/news
The current daily AI digest: sections, de-duplicated stories with short summaries and tags, and the sources it was built from. Refreshed every 30 minutes.

### GET /api/news-last-updated
Returns \`lastUpdatedMarker\`. Compare it for equality before re-fetching \`/api/news\`.

### GET /api/notes
List of published notes with summaries and links.

### GET /api/notes/{slug}
One note in full, as paragraphs.

## Markdown

\`GET /\` and \`GET /news\` return \`text/markdown\` when the request sends \`Accept: text/markdown\`. The home page is also at ${site.url}/.well-known/home.md and ${site.url}/index.md.

## Errors

Every error looks like \`{"error":{"code":"note_not_found","message":"...","docs":"..."}}\`. Branch on \`code\`.

## Etiquette

No limits are enforced. Please stay under about 60 requests per minute, send an identifying User-Agent, and back off on 5xx. News items link to their original publishers; the summaries are short excerpts, not republished articles.

## Contact

${site.email}
`;
}
