import type { MetadataRoute } from 'next';
import { posts } from '@/data/posts';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(`${p.date}T00:00:00Z`),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
