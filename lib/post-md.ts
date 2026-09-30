import { formatDate, seriesMeta } from '@/data/posts';
import { site } from '@/data/site';
import type { Post } from '@/types';

/** A post as plain Markdown, for AI tools and llms-full.txt. */
export function postToMarkdown(post: Post) {
  const lines: string[] = [
    `# ${post.title}`,
    '',
    `By ${site.name} · ${formatDate(post.date)} · ${seriesMeta[post.series].name}, part ${post.part}`,
    `Source: ${site.url}/blog/${post.slug}`,
    '',
    `> ${post.description}`,
    '',
    '## Key takeaways',
    ...post.takeaways.map((t) => `- ${t}`),
    '',
  ];
  for (const b of post.body) {
    if (b.type === 'p') lines.push(b.text, '');
    else if (b.type === 'h2') lines.push(`## ${b.text}`, '');
    else if (b.type === 'h3') lines.push(`### ${b.text}`, '');
    else if (b.type === 'quote') lines.push(`> ${b.text}`, '');
    else if (b.type === 'code') lines.push('```', b.text, '```', '');
    else if (b.type === 'ul') lines.push(...b.items.map((i) => `- ${i}`), '');
    else if (b.type === 'ol') lines.push(...b.items.map((i, n) => `${n + 1}. ${i}`), '');
  }
  return lines.join('\n');
}
