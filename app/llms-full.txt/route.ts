import { orderedPosts } from '@/data/posts';
import { site } from '@/data/site';
import { postToMarkdown } from '@/lib/post-md';

export const dynamic = 'force-static';

/** Every post in full, as one Markdown file (llmstxt.org "llms-full.txt"). */
export function GET() {
  const body = [`# ${site.name}: full writing`, '', `> ${site.oneLiner}`, '', ...orderedPosts().map(postToMarkdown)].join(
    '\n\n---\n\n',
  );
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
