import { getPost, posts } from '@/data/posts';
import { postToMarkdown } from '@/lib/post-md';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return new Response('Not found', { status: 404 });
  return new Response(postToMarkdown(post), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
