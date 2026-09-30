import type { Metadata } from 'next';
import { orderedPosts, readTime, seriesMeta } from '@/data/posts';
import { site } from '@/data/site';
import type { Series } from '@/types';
import { PostRow } from '@/components/blog/post-row';
import { SplitHeading } from '@/components/ui/split-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'Blog: building AI agents and AI startups in public',
  description:
    'Kush Ahuja writes about building AI agents (agents-hub) and an AI startup platform (BuildYour.Company) in public: architecture, memory, safety and AI SEO.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  const list = orderedPosts();
  const groups = (Object.keys(seriesMeta) as Series[]).map((s) => ({
    series: s,
    ...seriesMeta[s],
    posts: list.filter((p) => p.series === s),
  }));

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${site.name}: building AI agents in public`,
    url: `${site.url}/blog`,
    author: { '@id': `${site.url}/#person` },
    blogPost: list.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.date,
      keywords: p.keywords.join(', '),
    })),
  };

  return (
    <div className="container pb-24 pt-36 sm:pt-44">
      <p className="eyebrow flex items-center gap-2">
        <span className="h-px w-6 bg-accent" />
        Writing · {list.length} posts
      </p>
      <SplitHeading
        as="h1"
        onMount
        className="mt-6 text-huge font-bold"
        lines={['Building AI agents', 'in public.']}
        accent={['in', 'public.']}
        accentStyle="sans"
        swoosh="public."
      />
      <Reveal as="p" delay={0.2} className="mt-8 max-w-[60ch] text-[19px] leading-relaxed text-fg">
        Two products, written up as I build them. agents-hub is a team of AI agents that works inside your Gmail,
        Calendar, Tasks and Drive. BuildYour.Company diagnoses why a startup is stuck and coaches the founder through the
        fix. Every post has the decisions, the numbers and what broke first.
      </Reveal>

      {groups.map((g) => (
        <section key={g.series} className="mt-20" aria-labelledby={`series-${g.series}`}>
          <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
            <h2 id={`series-${g.series}`} className="font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              {g.name}
            </h2>
            <a href={g.url} className="shrink-0 text-[14px] text-fg3 transition-colors hover:text-fg">
              {new URL(g.url).host} ↗
            </a>
          </div>
          <Stagger as="ul" gap={0.06}>
            {g.posts.map((p) => (
              <StaggerItem as="li" key={p.slug}>
                <PostRow post={p} readTime={readTime(p)} detailed />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ))}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
