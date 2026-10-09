import type { MetadataRoute } from 'next';
import { notes } from '@/data/notes';
import { posts } from '@/data/posts';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();
  return [
    { url: site.url, lastModified: today, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/news`, lastModified: today, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${site.url}/blog`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/notes`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/links`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/developers`, changeFrequency: 'monthly', priority: 0.4 },
    ...notes.map((n) => ({
      url: `${site.url}/notes/${n.slug}`,
      lastModified: new Date(`${n.date}T00:00:00Z`),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(`${p.date}T00:00:00Z`),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
