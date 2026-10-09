import type { Metadata } from 'next';
import Link from 'next/link';
import { noteDate, notes } from '@/data/notes';
import { site } from '@/data/site';
import { SplitHeading } from '@/components/ui/split-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';
import { ArrowUpRight } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Notes: short essays on building AI products',
  description: `Short, one-idea notes from ${site.name} on building and shipping AI products: agents, trust, chat UX, documents and startups.`,
  alternates: { canonical: '/notes', types: { 'application/rss+xml': '/notes/rss.xml' } },
};

export default function NotesIndex() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Notes by ${site.name}`,
    url: `${site.url}/notes`,
    author: { '@id': `${site.url}/#person` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: notes.map((n, i) => ({ '@type': 'ListItem', position: i + 1, name: n.title, url: `${site.url}/notes/${n.slug}` })),
    },
  };

  return (
    <div className="container pb-24 pt-36 sm:pt-44">
      <p className="eyebrow flex items-center gap-2">
        <span className="h-px w-6 bg-accent" />
        Notes · {notes.length}
      </p>
      <SplitHeading
        as="h1"
        onMount
        className="mt-6 text-huge font-bold"
        lines={['One idea,', 'one minute.']}
        accent={['one', 'minute.']}
        accentStyle="sans"
        swoosh="minute."
      />
      <Reveal as="p" delay={0.2} className="mt-8 max-w-[60ch] text-[19px] leading-relaxed text-fg">
        Short notes on building and shipping AI products. Each one is a single lesson, with a link to the full write-up when there is one.
      </Reveal>

      <Stagger as="ul" className="mt-14 border-t border-line" gap={0.07}>
        {notes.map((n, i) => (
          <StaggerItem as="li" key={n.slug}>
            <Link
              href={`/notes/${n.slug}`}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 border-b border-line py-7 sm:grid-cols-[4rem_1fr_11rem_auto] sm:gap-6"
            >
              <span className="pt-1.5 font-mono text-[12px] text-accent-text">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="block font-display text-[21px] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent-text sm:text-[25px]">
                  {n.title}
                </span>
                <span className="prose-serif mt-2 block max-w-[62ch] text-[16px] leading-relaxed text-fg2">{n.summary}</span>
              </span>
              <span className="hidden pt-2 text-[13px] text-fg3 sm:block">
                <span className="block text-fg2">{n.tags[0]}</span>
                <span className="block">{noteDate(n.date)}</span>
              </span>
              <span className="grid size-10 place-items-center rounded-full border border-fg/10 text-fg2 transition-[background-color,border-color,color] duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <ArrowUpRight width={16} height={16} className="transition-transform duration-300 ease-out-quart group-hover:rotate-45" />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      <p className="mt-10 text-[14px] text-fg3">
        Want the long versions? Read the <Link href="/blog" className="text-fg2 underline underline-offset-4 hover:text-fg">build-in-public posts</Link>, or follow today’s{' '}
        <Link href="/news" className="text-fg2 underline underline-offset-4 hover:text-fg">AI brief</Link>.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
