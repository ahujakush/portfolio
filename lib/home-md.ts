import { education, experiences } from '@/data/experience';
import { notes } from '@/data/notes';
import { projects } from '@/data/projects';
import { site, socials } from '@/data/site';
import { orderedPosts } from '@/data/posts';

const UPDATED = '2026-10-09';

/** The home page as markdown, for agents that would rather not execute JavaScript. */
export function homeMarkdown() {
  return `---
title: ${site.name}, ${site.role}
description: ${site.oneLiner}
canonical: ${site.url}/
last-updated: ${UPDATED}
---

# ${site.name}

${site.oneLiner}

${site.headline} Based in ${site.location}. ${site.availability}.

## Work

${projects
  .filter((p) => p.featured)
  .map((p) => `- **${p.title}** (${p.kind}, ${p.year}): ${p.tagline}. ${p.description}${p.href ? ` ${p.href}` : ''}`)
  .join('\n')}

More builds: ${projects
    .filter((p) => !p.featured)
    .map((p) => p.title)
    .join(', ')}.

## Experience

${experiences.map((e) => `- ${e.company}, ${e.role} (${e.period}): ${e.summary}`).join('\n')}

## Education

${education.map((e) => `- ${e.school}, ${e.qualification} (${e.period})`).join('\n')}

## Writing

- [Notes](${site.url}/notes): short, one-idea essays
${notes.map((n) => `  - [${n.title}](${site.url}/notes/${n.slug})`).join('\n')}
- [Blog](${site.url}/blog): build-in-public series
${orderedPosts()
  .map((p) => `  - [${p.title}](${site.url}/blog/${p.slug})`)
  .join('\n')}
- [Daily AI brief](${site.url}/news): curated AI news digest, refreshed every 30 minutes

## Developer resources

A public, unauthenticated, read-only API. See [OpenAPI](${site.url}/openapi.json), [docs](${site.url}/docs/api), [API catalog](${site.url}/.well-known/api-catalog), and the [MCP server](${site.url}/news/mcp).

## Contact

- Email: ${site.email}
${socials.map((s) => `- ${s.label}: ${s.href}`).join('\n')}
- Links page: ${site.url}/links
`;
}
