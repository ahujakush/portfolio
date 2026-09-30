import Link from 'next/link';
import { orderedPosts, posts, readTime } from '@/data/posts';
import { SplitHeading } from '@/components/ui/split-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';
import { PostRow } from '@/components/blog/post-row';
import { ArrowRight } from '@/components/ui/icons';

/** Latest posts from the build-in-public series. */
export function Writing() {
  // Two from each series: the pillar pieces first
  const all = orderedPosts();
  const latest = [...all.filter((p) => p.series === 'agents-hub').slice(0, 2), ...all.filter((p) => p.series === 'byc').slice(0, 2)];

  return (
    <section id="writing" className="py-24 sm:py-32">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SplitHeading className="text-big font-bold" lines={['Notes from', 'the build.']} accent={['the', 'build.']} />
          <Reveal as="p" delay={0.15} className="max-w-sm text-fg2">
            Build-in-public notes on AI agents, agents-hub and BuildYour.Company: every decision, the numbers behind it, and what broke.
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-12 border-t border-line" gap={0.07}>
          {latest.map((p) => (
            <StaggerItem as="li" key={p.slug}>
              <PostRow post={p} readTime={readTime(p)} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10">
          <Link href="/blog" className="btn-ghost group">
            Read all {posts.length} posts
            <ArrowRight
              width={17}
              height={17}
              className="transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
