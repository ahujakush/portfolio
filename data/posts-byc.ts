import type { Post } from '@/types';

/**
 * "Building BuildYour.Company". Every feature and price here comes from the
 * BYC feature list (FEATURES.md, updated 23 Aug 2026).
 */
export const bycPosts: Post[] = [
  {
    slug: 'what-is-buildyour-company',
    series: 'byc',
    part: 1,
    title: 'What is BuildYour.Company? AI startup diagnosis for early founders',
    description:
      'BuildYour.Company diagnoses why an early startup is stuck with a free AI discovery call, then turns the diagnosis into a 30-day Startup Map, daily WhatsApp briefs and an AI coach called Kairo.',
    date: '2026-09-30',
    tag: 'Startups',
    keywords: [
      'AI startup diagnosis',
      'startup growth consulting AI',
      'go-to-market strategy for startups',
      'AI business coach for founders',
      'BuildYour.Company',
    ],
    takeaways: [
      'BuildYour.Company is an AI platform that tells early-stage founders exactly why their startup is stuck, and what to do about it this month.',
      'It starts with a free voice discovery call with Kairo, an AI coach, which produces a Startup Diagnosis: the biggest blocker, its root cause chain, a clarity score and a growth leak map.',
      'The paid Startup Map (₹999 for month one) turns that diagnosis into a 30-day, day-by-day plan with proof of work and a WhatsApp brief every morning.',
    ],
    body: [
      {
        type: 'p',
        text: 'Most early founders do not need more advice. They need to know which one problem is actually stopping growth. BuildYour.Company exists to answer that question fast, and then stay with the founder while they fix it. I am its CTO and co-founder, and I lead the engineering.',
      },
      { type: 'h2', text: 'How it works, in four steps' },
      {
        type: 'ol',
        items: [
          'A free AI discovery call. The founder talks to Kairo, our AI coach, in the browser. No download.',
          'A free Startup Diagnosis. Generated from the call: biggest blocker, root cause chain, weakest area, a clarity score out of 100, the one metric to watch and the recommended next move.',
          'A paid Startup Map. A 30-day plan built from the diagnosis, every task with the why, the how and a proof hint.',
          'Daily execution. A work board, a calendar, proof uploads and a WhatsApp brief every morning at 8 AM in the founder’s own timezone.',
        ],
      },
      { type: 'h2', text: 'Who it is for' },
      {
        type: 'p',
        text: 'Pre-revenue to early-traction founders, often solo or bootstrapped, who are stuck on growth and cannot afford or do not trust an agency. The whole product is built so a skeptical founder can see a real diagnosis before paying anything.',
      },
      { type: 'h2', text: 'Pricing' },
      {
        type: 'ul',
        items: [
          'Startup Diagnosis: free.',
          'Startup Map, month one: ₹999.',
          'Month two: ₹1,000, or ₹750 if the founder finishes 80 percent of month one.',
          'A second startup workspace: ₹499.',
        ],
      },
      { type: 'h2', text: 'What is under the hood' },
      {
        type: 'p',
        text: 'A Next.js app on Supabase, Azure OpenAI for generation, ElevenLabs for Kairo’s voice, Tavily for live web search in competitor analysis, the WhatsApp Cloud API for daily briefs, and Razorpay and Stripe for payments. The next posts in this series go through each piece.',
      },
    ],
  },
  {
    slug: 'ai-discovery-call-startup-diagnosis',
    series: 'byc',
    part: 2,
    title: 'Diagnosing a startup with an AI voice call',
    description:
      'How the BuildYour.Company discovery call works: a live voice conversation with Kairo, a saved transcript, and an automatic Startup Diagnosis with a root cause chain, clarity score, leak map, website health check and competitor analysis.',
    date: '2026-09-30',
    tag: 'Startups',
    keywords: [
      'AI voice agent',
      'AI discovery call',
      'startup diagnosis tool',
      'ElevenLabs conversational AI',
      'AI competitor analysis',
    ],
    takeaways: [
      'The BuildYour.Company discovery call is a live voice conversation with Kairo, built on ElevenLabs conversational AI, that runs in the browser.',
      'After the call the transcript is analysed into a Startup Diagnosis: biggest blocker, root cause chain, clarity score out of 100, growth leak map and buyer concerns.',
      'The diagnosis adds real Google PageSpeed scores for the founder’s website and a competitor analysis from live web search that marks which competitors the founder named and which the AI found.',
    ],
    body: [
      {
        type: 'p',
        text: 'Forms get lies. Conversations get the truth. Founders write "marketing" in a form field, then spend ten minutes on a call explaining that nobody who visits the site understands what they sell. So the first thing a BuildYour.Company user does is talk, not type.',
      },
      { type: 'h2', text: 'The call' },
      {
        type: 'ul',
        items: [
          'A live voice conversation with Kairo, built on ElevenLabs conversational AI, in the browser.',
          'Founder and startup identity are captured first, so the rest of the call is about the business, not about spelling a company name.',
          'The founder can start now or schedule the call for later.',
          'The full transcript is saved, and token use is tracked per call.',
        ],
      },
      { type: 'h2', text: 'From transcript to diagnosis' },
      {
        type: 'p',
        text: 'When the call ends, analysis starts on its own. The output is deliberately narrow: one biggest blocker, not twelve. It comes with a root cause chain that explains why the blocker exists, the weakest area of the business, a clarity score out of 100, the one metric to watch and the recommended next move.',
      },
      {
        type: 'p',
        text: 'Two parts make it more than an opinion. A growth leak map shows where customers are lost, and a buyer concern analysis lists what stops people from buying.',
      },
      { type: 'h2', text: 'Checks against the real world' },
      {
        type: 'ul',
        items: [
          'Website health check: real Google PageSpeed scores for performance, accessibility, best practices and SEO.',
          'Competitor analysis: AI plus live web search scores the startup against real competitors, and clearly marks which ones the founder named and which the AI found.',
        ],
      },
      { type: 'h2', text: 'When analysis fails' },
      {
        type: 'p',
        text: 'Long AI jobs fail sometimes. Every analysis has retry and recovery, and every diagnosis version is saved, so a founder can see how their clarity changed over time and share a snapshot page with a co-founder or mentor.',
      },
    ],
  },
  {
    slug: 'startup-map-30-day-plan',
    series: 'byc',
    part: 3,
    title: 'From diagnosis to a 30-day Startup Map',
    description:
      'How BuildYour.Company turns an AI startup diagnosis into a 30-day, day-by-day execution plan with proof of work, a kanban board, a calendar and a reward for finishing.',
    date: '2026-09-30',
    tag: 'Startups',
    keywords: [
      'startup execution plan',
      '30 day go-to-market plan',
      'AI startup plan generator',
      'startup marketing strategy',
      'founder accountability',
    ],
    takeaways: [
      'The Startup Map is a four-week plan generated from the founder’s diagnosis, where every task explains why it matters, how to do it, the expected outcome and how to prove it is done.',
      'Tasks are split into daily steps and show up on a kanban board and a calendar; proof uploads are saved to Google Drive and reviewed within 48 hours.',
      'Finishing 80 percent of month one drops month two from ₹1,000 to ₹750, which rewards execution instead of sign-ups.',
    ],
    body: [
      {
        type: 'p',
        text: 'A diagnosis without a plan is a nice PDF. The Startup Map is where BuildYour.Company earns its money: ₹999 for a first month that turns the diagnosis into work the founder can actually do, one day at a time.',
      },
      { type: 'h2', text: 'What is inside a Startup Map' },
      {
        type: 'ul',
        items: [
          'A four-week plan built from the diagnosis, with weekly modules and objectives.',
          'Every task explains why it matters, how to do it, in plain words, step by step, the expected outcome and a proof hint.',
          'A day-by-day breakdown of every task.',
          'A narrative strategy section with the reasoning behind the whole plan, plus revenue model, playbook and competitor pages.',
          'A PDF download of the whole map.',
        ],
      },
      { type: 'h2', text: 'Execution, not just planning' },
      {
        type: 'ul',
        items: [
          'A work board (kanban) and a work calendar with real dates.',
          'Progress per week and overall.',
          'Proof upload for every task, saved to the founder’s Google Drive and reviewed by the team within 48 hours.',
          'AI-generated task assets: real deliverables, not just instructions, and each can be regenerated.',
        ],
      },
      { type: 'h2', text: 'Pricing that rewards finishing' },
      {
        type: 'p',
        text: 'Month two costs ₹1,000, or ₹750 for founders who complete 80 percent of month one. The discount is tied to proof of work, so the incentive points at the only thing that changes a startup: doing the tasks.',
      },
      { type: 'h2', text: 'What I would build again' },
      {
        type: 'p',
        text: 'Proof hints. Asking "how will you know it is done?" for every task turned vague advice into checkable work, and made the admin review fast and fair.',
      },
    ],
  },
  {
    slug: 'whatsapp-ai-coach-kairo',
    series: 'byc',
    part: 4,
    title: 'Kairo: an AI go-to-market coach on WhatsApp',
    description:
      'How Kairo sends every BuildYour.Company founder a WhatsApp brief at 8 AM in their timezone with today’s exact tasks and an AI voice note, and answers questions on every page of the site.',
    date: '2026-09-30',
    tag: 'AI Agents',
    keywords: [
      'WhatsApp AI assistant',
      'AI coach for founders',
      'WhatsApp Cloud API automation',
      'AI GTM coach',
      'Kairo AI',
    ],
    takeaways: [
      'Kairo sends each paying founder a WhatsApp brief at 8 AM in their own timezone with today’s tasks, including how to do them, plus an AI voice note.',
      'The brief uses the Meta WhatsApp Cloud API directly, logs every send in a delivery ledger, and links back into a logged-in dashboard with one tap.',
      'On the website Kairo is available on every page and, when a founder is signed in, answers from their real diagnosis, plan and progress.',
    ],
    body: [
      {
        type: 'p',
        text: 'Founders do not open dashboards. They open WhatsApp. So the plan comes to them: every morning at 8 AM in their own timezone, Kairo sends today’s exact tasks, with the how and not just the title.',
      },
      { type: 'h2', text: 'The morning brief' },
      {
        type: 'ul',
        items: [
          'Sent at 8 AM local time, with today’s tasks and how to do them.',
          'An AI voice note of the brief, made with ElevenLabs, for founders who would rather listen.',
          'Day one arrives the moment someone pays, not the next morning.',
          'A one-tap link back into the dashboard, already logged in.',
          'Pause or opt out anytime.',
        ],
      },
      { type: 'h2', text: 'Built on the WhatsApp Cloud API' },
      {
        type: 'p',
        text: 'We talk to Meta’s WhatsApp Cloud API directly, with no reseller in between. Every send is written to a delivery ledger, a webhook receives replies, and every paying customer is enrolled automatically, with welcome and payment confirmation messages.',
      },
      { type: 'h2', text: 'Kairo on every page' },
      {
        type: 'p',
        text: 'On the site, Kairo is an AI assistant available on every page. Signed in, it knows the founder’s diagnosis, plan, tasks, competitors and progress, and answers from that data instead of generic advice. Signed out, it answers questions about the product, services and pricing. An "email the team" button sits inside the chat, and it is rate-limited against abuse.',
      },
      {
        type: 'quote',
        text: 'The best coach is the one that shows up every morning, not the one with the best dashboard.',
      },
    ],
  },
  {
    slug: 'make-your-startup-site-readable-by-ai',
    series: 'byc',
    part: 5,
    title: 'Making a startup website readable by AI search',
    description:
      'What we did so ChatGPT, Perplexity and Google can read and cite BuildYour.Company: llms.txt, a public OpenAPI spec, eight focused SEO pages, case studies and structured data.',
    date: '2026-09-30',
    tag: 'SEO',
    keywords: [
      'AI SEO',
      'generative engine optimization',
      'answer engine optimization',
      'llms.txt',
      'SEO for startups',
    ],
    takeaways: [
      'AI search engines cite pages they can read and trust, so BuildYour.Company ships an llms.txt, a public OpenAPI spec and API docs alongside the usual canonical URLs, Open Graph tags, sitemap and robots.txt.',
      'Eight focused landing pages each answer one search intent, such as AI startup diagnosis or startup marketing strategy, instead of one page trying to rank for everything.',
      'Case studies and an insights blog give answer engines first-hand, specific material to quote.',
    ],
    body: [
      {
        type: 'p',
        text: 'Founders increasingly ask ChatGPT or Perplexity "why is my startup not growing" before they ever open Google. If an answer engine cannot read your site, you do not exist in that answer. Here is what we built into BuildYour.Company from the first phase.',
      },
      { type: 'h2', text: 'The basics, done properly' },
      {
        type: 'ul',
        items: [
          'Canonical URLs, Open Graph tags, a sitemap and robots.txt on every page.',
          'Individual pages for every case study and every insights article, so each one can be found and cited on its own.',
        ],
      },
      { type: 'h2', text: 'One page per search intent' },
      {
        type: 'p',
        text: 'Instead of one homepage trying to rank for everything, eight landing pages each answer one question: AI sales strategy, AI startup diagnosis, go-to-market strategy, GTM consulting, social media growth, startup growth consulting, startup marketing strategy and website development for startups.',
      },
      { type: 'h2', text: 'Files written for machines' },
      {
        type: 'ul',
        items: [
          'llms.txt: a plain-text summary of what the product does and where the key pages are.',
          'A public OpenAPI spec and API docs, so AI tools can understand what the product exposes.',
        ],
      },
      { type: 'h2', text: 'What I apply everywhere now' },
      {
        type: 'ol',
        items: [
          'Say who you are in one fixed sentence and repeat it across your site and profiles.',
          'Lead every section with a direct answer, then the detail.',
          'Use real numbers from your own product; answer engines prefer specific, first-hand data.',
          'Never block the AI crawlers you want to be cited by.',
        ],
      },
      {
        type: 'p',
        text: 'This portfolio follows the same rules: it has an llms.txt, structured data for every post, and a plain-text FAQ.',
      },
    ],
  },
];
