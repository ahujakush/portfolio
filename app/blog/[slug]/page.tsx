import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate, getPost, orderedPosts, posts, readTime, seriesMeta, tryIt } from '@/data/posts';
import { site } from '@/data/site';
import { PostBody } from '@/components/blog/post-body';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { Reveal } from '@/components/ui/reveal';
import { ArrowLeft, ArrowRight } from '@/components/ui/icons';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: { 'text/markdown': `/blog/${post.slug}/md` },
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.name],
      tags: [post.tag, ...post.keywords],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const series = seriesMeta[post.series];
  const ordered = orderedPosts().filter((p) => p.series === post.series);
  const idx = ordered.findIndex((p) => p.slug === post.slug);
  const prev = ordered[idx - 1];
  const next = ordered[idx + 1];

  const url = `${site.url}/blog/${post.slug}`;
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      abstract: post.takeaways.join(' '),
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      url,
      mainEntityOfPage: url,
      image: `${url}/opengraph-image`,
      inLanguage: 'en',
      author: {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.name,
        url: site.url,
        jobTitle: 'AI Engineer, CTO of BuildYour.Company, founder of agents-hub',
      },
      publisher: { '@id': `${site.url}/#person` },
      isPartOf: { '@type': 'Blog', name: series.name, url: `${site.url}/blog` },
      about: { '@type': 'SoftwareApplication', name: series.short, url: series.url },
      keywords: post.keywords.join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <ReadingProgress />

      <header className="container max-w-[820px]">
        <Reveal>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[14px] text-fg3 transition-colors hover:text-fg"
          >
            <ArrowLeft
              width={16}
              height={16}
              className="transition-transform duration-300 ease-out-quart group-hover:-translate-x-0.5"
            />
            All posts
          </Link>
          <p className="eyebrow mt-10">
            <span className="text-accent-text">{series.name}</span> · Part {post.part} of {ordered.length} · {post.tag}
          </p>
          <h1 className="mt-5 text-[clamp(2.3rem,5.4vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            {post.title}
          </h1>
          <p className="mt-6 text-[20px] leading-relaxed text-fg">{post.description}</p>
          <div className="mt-8 flex items-center gap-3 border-y border-line py-5">
            <span className="relative size-10 overflow-hidden rounded-full ring-1 ring-fg/10">
              <Image src="/kush/avatar.jpg" alt="" fill sizes="40px" className="object-cover" />
            </span>
            <div className="text-[14px] leading-tight">
              <p className="font-medium">{site.name}</p>
              <p className="text-fg3">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.updated && post.updated !== post.date && <> · Updated {formatDate(post.updated)}</>} ·{' '}
                {readTime(post)}
              </p>
            </div>
          </div>
        </Reveal>
      </header>

      <Reveal delay={0.1} className="container mt-12 max-w-[820px]">
        <div className="max-w-[680px]">
          {/* Short, self-contained answers first: what answer engines quote */}
          <aside aria-label="Key takeaways" className="mb-12 rounded-card border border-accent/30 bg-accent/[0.06] p-6">
            <p className="eyebrow text-accent-text">Key takeaways</p>
            <ul className="mt-4 space-y-3">
              {post.takeaways.map((t) => (
                <li key={t} className="prose-serif flex gap-3 text-[17px] leading-relaxed text-fg">
                  <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-sm bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </aside>
          <PostBody blocks={post.body} />
          {tryIt[post.slug] && (
            <aside aria-label="Try it" className="mt-12 rounded-card border border-accent/30 bg-accent/[0.06] p-6">
              <p className="eyebrow text-accent-text">Try it</p>
              <p className="prose-serif mt-3 text-[17px] leading-relaxed text-fg">{tryIt[post.slug].text}</p>
              <a href={tryIt[post.slug].href} className="btn-primary mt-5 h-10 gap-2 px-4 text-[14px]">
                {tryIt[post.slug].label} <ArrowRight width={15} height={15} />
              </a>
            </aside>
          )}
        </div>
      </Reveal>

      <footer className="container mt-20 max-w-[820px]">
        <div className="rounded-card border border-fg/[0.07] bg-surface p-6 sm:p-8">
          <p className="eyebrow">Written by</p>
          <div className="mt-4 flex items-start gap-4">
            <span className="relative size-14 shrink-0 overflow-hidden rounded-full ring-1 ring-fg/10">
              <Image src="/kush/avatar.jpg" alt="" fill sizes="56px" className="object-cover" />
            </span>
            <div>
              <p className="font-display text-xl font-semibold">{site.name}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-fg2">{site.oneLiner}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/" className="btn-ghost h-10 px-4 text-[14px]">
                  See my work
                </Link>
                <a href={`mailto:${site.email}`} className="btn-primary h-10 px-4 text-[14px]">
                  Email me
                </a>
              </div>
            </div>
          </div>
        </div>

        <nav aria-label="More posts" className="mt-10 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group rounded-card border border-fg/[0.07] p-6 transition-colors duration-200 hover:border-fg/20"
            >
              <span className="flex items-center gap-2 text-[13px] text-fg3">
                <ArrowLeft width={15} height={15} /> Part {prev.part}
              </span>
              <span className="mt-2 block font-display text-lg font-semibold leading-snug transition-colors group-hover:text-accent-text">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group rounded-card border border-fg/[0.07] p-6 text-right transition-colors duration-200 hover:border-fg/20"
            >
              <span className="flex items-center justify-end gap-2 text-[13px] text-fg3">
                Part {next.part} <ArrowRight width={15} height={15} />
              </span>
              <span className="mt-2 block font-display text-lg font-semibold leading-snug transition-colors group-hover:text-accent-text">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </article>
  );
}
