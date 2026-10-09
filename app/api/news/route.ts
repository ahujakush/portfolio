import { json } from '@/lib/api';
import { getDigest, REVALIDATE_SECONDS } from '@/lib/news';

export const revalidate = 1800;

export async function GET() {
  const d = await getDigest();
  return json(
    {
      generatedAt: d.generatedAt,
      lastUpdatedMarker: d.lastUpdatedMarker,
      keywords: d.keywords,
      sources: d.sources,
      failedSources: d.failedSources,
      sections: d.sections,
      items: d.items,
    },
    { maxAge: REVALIDATE_SECONDS },
  );
}
