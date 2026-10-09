import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNote, noteDate, notes } from '@/data/notes';
import { getPost } from '@/data/posts';
import { site } from '@/data/site';
import { Reveal } from '@/components/ui/reveal';
import { ArrowLeft, ArrowRight } from '@/components/ui/icons';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const n = getNote((await params).slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.summary,
    keywords: n.tags,
    alternates: { canonical: `/notes/${n.slug}`, types: { 'application/json': `/api/notes/${n.slug}` } },
    openGraph: { type: 'article', title: n.title, description: n.summary, url: `/notes/${n.slug}`, publishedTime: n.date, authors: [site.name], tags: n.tags },
    twitter: { card: 'summary_large_image', title: n.title, description: n.summary },
  };
}

export default async function NotePage({ params }: Params) {
  const n = getNote((await params).slug);
  if (!n) notFound();

  const idx = notes.findIndex((x) => x.slug === n.slug);
  const prev = notes[idx - 1];
  const next = notes[idx + 1];
  const full = n.post ? getPost(n.post) : undefined;
  const url = `${site.url}/notes/${n.slug}`;

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: n.title,
      description: n.summary,
      datePublished: n.date,
      dateModified: n.date,
      url,
      mainEntityOfPage: url,
      inLanguage: 'en',
      keywords: n.tags.join(', '),
      author: { '@type': 'Person', '@id': `${site.url}/#person`, name: site.name, url: site.url },
      publisher: { '@id': `${site.url}/#person` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Notes', item: `${site.url}/notes` },
        { '@type': 'ListItem', position: 3, name: n.title, item: url },
      ],
    },
  ];

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <header className="container max-w-[820px]">
        <Reveal>
          <Link href="/notes" className="group inline-flex items-center gap-2 text-[14px] text-fg3 transition-colors hover:text-fg">
            <ArrowLeft width={16} height={16} className="transition-transform duration-300 ease-out-quart group-hover:-translate-x-0.5" />
            All notes
          </Link>
          <p className="eyebrow mt-10">{n.tags.join(' · ')}</p>
          <h1 className="mt-5 text-[clamp(2.3rem,5.4vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em]">{n.title}</h1>
          <p className="mt-6 text-[20px] leading-relaxed text-fg">{n.summary}</p>
          <div className="mt-8 flex items-center gap-3 border-y border-line py-5">
            <span className="relative size-10 overflow-hidden rounded-full ring-1 ring-fg/10">
              <Image src="/kush/avatar.jpg" alt={`Photo of ${site.name}`} fill sizes="40px" className="object-cover" />
            </span>
            <div className="text-[14px] leading-tight">
              <p className="font-medium">{site.name}</p>
              <p className="text-fg3">
                <time dateTime={n.date}>{noteDate(n.date)}</time> · 1 min read
              </p>
            </div>
          </div>
        </Reveal>
      </header>

      <Reveal delay={0.1} className="container mt-12 max-w-[820px]">
        <div className="max-w-[680px]">
          <div className="post">
            {n.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          {full && (
            <aside aria-label="Full story" className="mt-12 rounded-card border border-accent/30 bg-accent/[0.06] p-6">
              <p className="eyebrow text-accent-text">The full story</p>
              <p className="prose-serif mt-3 text-[17px] leading-relaxed text-fg">{full.title}</p>
              <Link href={`/blog/${full.slug}`} className="btn-primary mt-5 h-10 gap-2 px-4 text-[14px]">
                Read the post <ArrowRight width={15} height={15} />
              </Link>
            </aside>
          )}
        </div>
      </Reveal>

      <footer className="container mt-20 max-w-[820px]">
        <nav aria-label="More notes" className="grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link href={`/notes/${prev.slug}`} className="group rounded-card border border-fg/[0.07] p-6 transition-colors duration-200 hover:border-fg/20">
              <span className="flex items-center gap-2 text-[13px] text-fg3">
                <ArrowLeft width={15} height={15} /> Previous
              </span>
              <span className="mt-2 block font-display text-lg font-semibold leading-snug transition-colors group-hover:text-accent-text">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/notes/${next.slug}`} className="group rounded-card border border-fg/[0.07] p-6 text-right transition-colors duration-200 hover:border-fg/20">
              <span className="flex items-center justify-end gap-2 text-[13px] text-fg3">
                Next <ArrowRight width={15} height={15} />
              </span>
              <span className="mt-2 block font-display text-lg font-semibold leading-snug transition-colors group-hover:text-accent-text">{next.title}</span>
            </Link>
          )}
        </nav>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </article>
  );
}
