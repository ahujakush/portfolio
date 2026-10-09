import type { Metadata } from 'next';
import { site } from '@/data/site';
import { SplitHeading } from '@/components/ui/split-heading';
import { Reveal } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'Developers: public read-only API and MCP server',
  description: `A free, unauthenticated, read-only API for the daily AI brief and notes of ${site.name}, with an OpenAPI spec, an API catalog and an MCP server.`,
  alternates: { canonical: '/developers' },
};

const endpoints = [
  { method: 'GET', path: '/api/news', note: 'The daily AI digest: sections, stories, tags, sources.' },
  { method: 'GET', path: '/api/news-last-updated', note: 'Freshness marker. Compare before re-fetching the digest.' },
  { method: 'GET', path: '/api/notes', note: 'All published notes.' },
  { method: 'GET', path: '/api/notes/{slug}', note: 'One note in full.' },
  { method: 'POST', path: '/news/mcp', note: 'Read-only MCP server (JSON-RPC 2.0). Tools: get_daily_ai_brief, list_notes, get_note.' },
];

const resources = [
  ['OpenAPI 3.1 spec', '/openapi.json'],
  ['Service documentation (markdown)', '/docs/api'],
  ['API catalog (RFC 9727)', '/.well-known/api-catalog'],
  ['MCP manifest', '/.well-known/mcp.json'],
  ['Home page as markdown', '/index.md'],
  ['llms.txt', '/llms.txt'],
  ['Sitemap', '/sitemap.xml'],
];

export default function DevelopersPage() {
  return (
    <div className="container pb-24 pt-36 sm:pt-44">
      <p className="eyebrow flex items-center gap-2">
        <span className="h-px w-6 bg-accent" />
        Developers
      </p>
      <SplitHeading as="h1" onMount className="mt-6 text-huge font-bold" lines={['Read-only,', 'open to all.']} accent={['open', 'to', 'all.']} accentStyle="sans" />
      <Reveal as="p" delay={0.2} className="mt-8 max-w-[60ch] text-[19px] leading-relaxed text-fg">
        A free public API for the daily AI brief and notes. No key, no sign-up, no write operations. Built so people and AI agents can use the same data the site shows.
      </Reveal>

      <Reveal delay={0.25} className="mt-14">
        <h2 className="font-display text-[26px] font-bold tracking-[-0.03em]">Endpoints</h2>
        <ul className="mt-5 border-t border-line">
          {endpoints.map((e) => (
            <li key={e.path} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[5rem_17rem_1fr] sm:gap-6">
              <span className="font-mono text-[12px] text-accent-text">{e.method}</span>
              <code className="font-mono text-[14px] text-fg">{e.path}</code>
              <span className="text-[15px] text-fg2">{e.note}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.3} className="mt-14">
        <h2 className="font-display text-[26px] font-bold tracking-[-0.03em]">Resources</h2>
        <ul className="mt-5 border-t border-line">
          {resources.map(([label, href]) => (
            <li key={href} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
              <span className="text-[15px] text-fg2">{label}</span>
              <a href={href} className="font-mono text-[13px] text-fg underline decoration-fg/20 underline-offset-4 transition-colors hover:text-accent-text">
                {href}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[60ch] text-[14px] leading-relaxed text-fg3">
          Please stay under about 60 requests per minute and send an identifying User-Agent. News items link to their original publishers. Questions:{' '}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-fg">{site.email}</a>.
        </p>
      </Reveal>
    </div>
  );
}
