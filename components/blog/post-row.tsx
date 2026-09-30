import Link from 'next/link';
import { formatDate, seriesMeta } from '@/data/posts';
import type { Post } from '@/types';
import { ArrowUpRight } from '@/components/ui/icons';

/** One post in a list: part number, title, blurb, meta. Used on / and /blog. */
export function PostRow({ post, readTime, detailed = false }: { post: Post; readTime: string; detailed?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 border-b border-line py-7 sm:grid-cols-[4rem_1fr_12rem_auto] sm:gap-6"
    >
      <span className="pt-1.5 font-mono text-[12px] text-accent-text">{String(post.part).padStart(2, '0')}</span>
      <span>
        <span className="block font-display text-[21px] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent-text sm:text-[25px]">
          {post.title}
        </span>
        <span
          className={`prose-serif mt-2 block max-w-[62ch] text-[16px] leading-relaxed text-fg2 ${detailed ? '' : 'line-clamp-2'}`}
        >
          {post.description}
        </span>
        <span className="mt-3 flex gap-3 text-[12px] text-fg3 sm:hidden">
          <span>{seriesMeta[post.series].short}</span>
          <span>{readTime}</span>
        </span>
      </span>
      <span className="hidden pt-2 text-[13px] text-fg3 sm:block">
        <span className="block text-fg2">{seriesMeta[post.series].short}</span>
        <span className="block">
          {post.tag} · {formatDate(post.date)} · {readTime}
        </span>
      </span>
      <span className="grid size-10 place-items-center rounded-full border border-fg/10 text-fg2 transition-[background-color,border-color,color] duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
        <ArrowUpRight
          width={16}
          height={16}
          className="transition-transform duration-300 ease-out-quart group-hover:rotate-45"
        />
      </span>
    </Link>
  );
}
