/**
 * Short notes: one idea each, a minute to read. Each one is the distilled
 * lesson from a longer build-in-public post and links back to it.
 */
export type Note = {
  slug: string;
  title: string;
  /** One sentence. Used as the list blurb, meta description and API summary. */
  summary: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  tags: string[];
  body: string[];
  /** Slug of the full post this note comes from. */
  post?: string;
};

export const notes: Note[] = [
  {
    slug: 'wait-for-the-whole-thought',
    title: 'Wait for the whole thought',
    summary: 'People send one idea as three messages. An agent that answers the first piece gets it wrong twice.',
    date: '2026-10-09',
    tags: ['Chat UX', 'AI agents'],
    post: 'is-the-user-done-typing',
    body: [
      'Nobody writes a chat message like an email. They send “add to my todo list”, then “gym tomorrow”, then “at 7”. Three messages, one thought. An agent that answers the first piece replies to half a request, then replies again when the rest arrives.',
      'A human would just wait. The hard part is knowing how long, and Telegram gives bots no typing signal, so the bot has to guess. What worked: reply six seconds after the last piece, give an unfinished line up to eight more seconds, and never treat a line that ends on a connecting word as done.',
      'The best part is that it costs nothing extra. The router already reads every message, so asking it whether the turn is finished does not need another model call.',
      'Small waits are product decisions. Users never notice a good one and always notice a bad one.',
    ],
  },
  {
    slug: 'the-ai-drafts-the-human-sends',
    title: 'The AI drafts. The human sends.',
    summary: 'Anything that acts for someone has to earn their trust, and the cheapest way is to leave the step they cannot undo to them.',
    date: '2026-10-09',
    tags: ['Trust', 'AI agents'],
    post: 'ai-writes-the-email-you-send-it',
    body: [
      'A chatbot can be wrong in words. An agent can be wrong in your inbox. That difference is why I put guardrails ahead of prompts: a prompt is a request, a guardrail is a limit the model cannot talk its way around.',
      'The rule I ship with is simple. The AI can draft an email, but only a human tap on Send sends it. Files land in a folder in the person’s own Google Drive, not somewhere I control.',
      'It is a small constraint that removes most of the fear. People hand an agent real work once they know it cannot do the one thing they cannot take back.',
    ],
  },
  {
    slug: 'copy-the-recipe-not-the-model',
    title: 'Copy the recipe, not the model',
    summary: 'Good AI-made documents come from a sandbox and a playbook, not just a bigger model.',
    date: '2026-10-09',
    tags: ['AI engineering', 'Documents'],
    post: 'claude-quality-documents-on-an-azure-key',
    body: [
      'When Claude makes a PDF, it looks designed. My agent’s first PDFs looked generated. I only had an Azure OpenAI key, and the goal was to get as close to Claude’s output as I could.',
      'The insight was that those documents are not good because of the model alone. They come from a recipe: code running in a sandbox with real document libraries, following a written playbook. A recipe can be copied without copying the model.',
      'So I built the recipe: a Python sandbox, a playbook and helper scripts. Style kits learn a company’s document look from a few samples, as editable lines. Photos come from Google Maps or Creative Commons with credit lines, and when there is no real photo there is no picture.',
    ],
  },
  {
    slug: 'do-not-freeze-the-chat',
    title: 'Do not freeze the chat on long jobs',
    summary: 'A four-minute job needs a visible status and a free conversation, or the user assumes it is broken.',
    date: '2026-10-09',
    tags: ['Systems', 'AI agents'],
    post: 'long-jobs-without-a-frozen-chat',
    body: [
      'Most agent replies take a few seconds. Generating a document is different: it writes code in a sandbox, renders a file, checks it and fixes it, and a real job takes one to four minutes.',
      'I asked my own agent to edit a report. The edit took four minutes, and when I sent “where is the report?” it waited behind the job with nothing on screen but “typing…”. If I could not tell whether anything was happening, a customer never would.',
      'The fix was to let go of the chat after 15 seconds and run the job in the background, with one status message edited in place to show the steps and elapsed time. If you change your mind halfway, the job restarts with both requests. Anything unrelated runs alongside it.',
    ],
  },
  {
    slug: 'diagnose-before-you-build',
    title: 'Diagnose before you build',
    summary: 'Most early founders do not need more features. They need to know exactly what is stuck.',
    date: '2026-10-09',
    tags: ['Startups', 'Product'],
    post: 'startup-map-30-day-plan',
    body: [
      'Early founders usually build more when they feel stuck. More often the problem is upstream: the wrong customer, an unclear offer, a leak in the funnel. Building faster just makes the wrong thing bigger.',
      'That is the idea behind BuildYour.Company. A free voice call produces a diagnosis: the biggest blocker, the chain of causes behind it, a clarity score out of 100 and a map of where growth leaks. The paid Startup Map turns it into a 30-day, day-by-day plan.',
      'One decision I like: finishing 80 percent of month one drops the price of month two. It rewards doing the work, not signing up.',
    ],
  },
  {
    slug: 'write-for-answer-engines-too',
    title: 'Write for answer engines too',
    summary: 'AI search cites pages it can read and trust, so make your site easy for machines to understand.',
    date: '2026-10-09',
    tags: ['SEO', 'AI search'],
    post: 'make-your-startup-site-readable-by-ai',
    body: [
      'AI search engines cite pages they can read and trust. That changes what a website is for: it still has to convince people, and it also has to be easy for a machine to parse and quote.',
      'The checklist is short. Ship an llms.txt, a public OpenAPI spec and API docs next to the usual canonical URLs, Open Graph tags, sitemap and robots.txt. Give each landing page one search intent instead of asking a single page to rank for everything.',
      'Then give the engines something specific to quote: case studies and first-hand posts beat generic copy every time.',
    ],
  },
];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);

export const noteDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  );

export function noteToMarkdown(n: Note, siteUrl: string) {
  const from = n.post ? `\n\nFull story: ${siteUrl}/blog/${n.post}` : '';
  return `# ${n.title}\n\n> ${n.summary}\n\nPublished ${n.date} · ${n.tags.join(', ')}\n\n${n.body.join('\n\n')}${from}\n`;
}
