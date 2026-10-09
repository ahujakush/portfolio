import { site } from '@/data/site';

export const dynamic = 'force-static';

const TRAINING = ['GPTBot', 'ClaudeBot', 'anthropic-ai', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Amazonbot', 'meta-externalagent', 'cohere-ai', 'Diffbot'];
const SEARCH = ['OAI-SearchBot', 'ChatGPT-User', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'DuckAssistBot', 'Bingbot'];

const SIGNAL = 'Content-Signal: ai-train=yes, search=yes, ai-input=yes';

/**
 * Everyone is welcome, AI crawlers included: being found and quoted is the point.
 * Named groups repeat the signal because a crawler that matches a named group ignores the `*` group.
 * To opt out of model training, change ai-train to no.
 */
export function GET() {
  const body = `# ${site.url.replace('https://', '')}: crawl and content-preference policy
# This site welcomes search engines and AI crawlers.

User-agent: *
Allow: /
${SIGNAL}

# Model-training and general-purpose AI crawlers
${TRAINING.map((a) => `User-agent: ${a}`).join('\n')}
Allow: /
${SIGNAL}

# AI search and live user-triggered retrieval
${SEARCH.map((a) => `User-agent: ${a}`).join('\n')}
Allow: /
${SIGNAL}

Sitemap: ${site.url}/sitemap.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
