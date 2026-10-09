import Link from 'next/link';
import { noteDate, notes } from '@/data/notes';
import { posts } from '@/data/posts';
import { SplitHeading } from '@/components/ui/split-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';
import { ArrowRight, ArrowUpRight } from '@/components/ui/icons';

/** The latest notes: one idea each. The long build-in-public posts live on /blog. */
export function Writing() {
  const latest = notes.slice(0, 4);

  return (
    <section id="writing" className="py-24 sm:py-32">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SplitHeading className="text-big font-bold" lines={['Notes from', 'the build.']} accent={['the', 'build.']} />
          <Reveal as="p" delay={0.15} className="max-w-sm text-fg2">
            Short notes on building and shipping AI products. One idea each, with the numbers behind it and what broke.
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-12 border-t border-line" gap={0.07}>
          {latest.map((n, i) => (
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
                  <span className="prose-serif mt-2 line-clamp-2 block max-w-[62ch] text-[16px] leading-relaxed text-fg2">{n.summary}</span>
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

        <Reveal className="mt-10 flex flex-wrap gap-3">
          <Link href="/notes" className="btn-ghost group">
            All {notes.length} notes
            <ArrowRight width={17} height={17} className="transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5" />
          </Link>
          <Link href="/blog" className="btn-ghost group">
            Read the {posts.length} blog posts
            <ArrowRight width={17} height={17} className="transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
