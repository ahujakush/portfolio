import { apiError, json } from '@/lib/api';
import { getNote, notes } from '@/data/notes';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const n = getNote((await params).slug);
  if (!n) return apiError(404, 'note_not_found', 'No note with that slug.');
  return json({
    slug: n.slug,
    title: n.title,
    summary: n.summary,
    date: n.date,
    tags: n.tags,
    body: n.body,
    url: `${site.url}/notes/${n.slug}`,
    fullPost: n.post ? `${site.url}/blog/${n.post}` : null,
    author: { name: site.name, url: site.url },
  });
}
