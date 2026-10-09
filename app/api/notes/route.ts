import { json } from '@/lib/api';
import { notes } from '@/data/notes';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export function GET() {
  return json({
    count: notes.length,
    notes: notes.map((n) => ({
      slug: n.slug,
      title: n.title,
      summary: n.summary,
      date: n.date,
      tags: n.tags,
      url: `${site.url}/notes/${n.slug}`,
      api: `${site.url}/api/notes/${n.slug}`,
      fullPost: n.post ? `${site.url}/blog/${n.post}` : null,
    })),
  });
}
