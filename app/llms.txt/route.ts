import { projects } from '@/data/projects';
import { faqs } from '@/data/services';
import { orderedPosts, seriesMeta } from '@/data/posts';
import { site, socials } from '@/data/site';
import type { Series } from '@/types';

export const dynamic = 'force-static';

/** llms.txt: a plain-text summary for AI crawlers and answer engines, built from the same data as the site. */
export function GET() {
  const writing = (Object.keys(seriesMeta) as Series[])
    .map((s) => {
      const list = orderedPosts().filter((p) => p.series === s);
      return `### ${seriesMeta[s].name}\n${list
        .map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.description}`)
        .join('\n')}`;
    })
    .join('\n\n');

  const body = `# ${site.name}

> ${site.oneLiner}

${site.headline}

Full text of every post: ${site.url}/llms-full.txt
Markdown for any post: ${site.url}/blog/<slug>/md

## Products
- [agents-hub](https://agentshub.thekush.codes): a team of AI agents for Gmail, Google Calendar, Google Tasks, documents and maps, used in Telegram or a mobile app. Founded and built by ${site.name}.
  - [Telegram AI assistant](https://agentshub.thekush.codes/telegram-ai-assistant)
  - [AI assistant for Gmail](https://agentshub.thekush.codes/gmail-ai-assistant)
  - [AI calendar assistant](https://agentshub.thekush.codes/ai-calendar-assistant)
  - [AI to-do list](https://agentshub.thekush.codes/ai-to-do-list)
  - [AI document generator](https://agentshub.thekush.codes/ai-document-generator)
  - [AI maps assistant](https://agentshub.thekush.codes/ai-maps-assistant)
  - [Hinglish AI assistant](https://agentshub.thekush.codes/hinglish-ai-assistant)
- [BuildYour.Company](https://buildyour.company): AI startup diagnosis and a 30-day Startup Map for early founders. ${site.name} is CTO and co-founder.

## Projects
${projects.map((p) => `- [${p.title}](${p.href ?? `${site.url}/#work`}): ${p.tagline}. ${p.description}`).join('\n')}

## Writing
${writing}

## FAQ
${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Contact
- Email: ${site.email}
${socials.map((s) => `- ${s.label}: ${s.href}`).join('\n')}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
