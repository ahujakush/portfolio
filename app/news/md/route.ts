import { text } from '@/lib/api';
import { digestToMarkdown, getDigest } from '@/lib/news';

export const revalidate = 1800;

export async function GET() {
  return text(digestToMarkdown(await getDigest()), 'text/markdown; charset=utf-8', 1800);
}
