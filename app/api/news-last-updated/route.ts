import { json } from '@/lib/api';
import { getDigest } from '@/lib/news';

export const revalidate = 300;

export async function GET() {
  const d = await getDigest();
  return json({ lastUpdatedMarker: d.lastUpdatedMarker, generatedAt: d.generatedAt, count: d.items.length }, { maxAge: 300 });
}
