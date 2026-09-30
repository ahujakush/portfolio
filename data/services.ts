import type { Faq, Service } from '@/types';

export const services: Service[] = [
  {
    title: 'AI agents',
    body: 'Agents that act in real accounts and stop at the right moment for a human tap.',
    chips: ['Tool calling', 'Multi-agent routing', 'Memory', 'Guardrails'],
  },
  {
    title: 'Full-stack products',
    body: 'From the first schema to the landing page, shipped by one person who owns all of it.',
    chips: ['Next.js', 'TypeScript', 'Supabase', 'Payments'],
  },
  {
    title: 'Backend & data',
    body: 'Services that stay fast when an AI call takes four minutes and a user keeps typing.',
    chips: ['Postgres', 'Hybrid search', 'Job queues', 'OAuth'],
  },
  {
    title: 'Mobile apps',
    body: 'One TypeScript codebase for Android and iOS, with updates that ship in minutes.',
    chips: ['Expo', 'React Native', 'Native maps', 'OTA updates'],
  },
];

export const faqs: Faq[] = [
  {
    q: 'Who is Kush Ahuja?',
    a: 'Kush Ahuja is an AI engineer in Gurugram, India. He is the founder of agents-hub, a team of AI agents for Gmail, Calendar and Tasks, CTO and co-founder of BuildYour.Company, and a B.Tech student in CSE (AI & ML) at SGT University.',
  },
  {
    q: 'What are AI agents?',
    a: 'AI agents are programs that use a language model to decide what to do, then act through real tools such as Gmail, a calendar or a file store, and check the result. A chatbot tells you how to book a meeting; an AI agent books it. Kush builds them for agents-hub and BuildYour.Company.',
  },
  {
    q: 'What is agents-hub?',
    a: 'agents-hub is a team of AI agents you talk to in Telegram or a mobile app. You sign in with Google once, unlock the agents you need (Gmail, Calendar, Tasks, Docs, Maps), and they work inside your own accounts. An email is only sent when you tap Send. It lives at agentshub.thekush.codes.',
  },
  {
    q: 'Is agents-hub an alternative to Poke or Grok?',
    a: 'It solves a different problem. Chat assistants like Grok answer questions in a chat window. agents-hub runs separate AI agents that act inside your Gmail, Calendar, Tasks and Drive, reply in a Telegram group or app, and are priced per agent in rupees.',
  },
  {
    q: 'What is BuildYour.Company?',
    a: 'BuildYour.Company is an AI startup diagnosis platform for early founders. A free voice call with Kairo, its AI coach, finds the one thing stopping growth; a paid 30-day Startup Map and a daily WhatsApp brief help the founder fix it. Kush is its CTO and co-founder.',
  },
  {
    q: 'Are you available for work?',
    a: 'Yes, for freelance AI agent builds and full-time roles where I can own an AI product end to end. Email ahujakush07@gmail.com is the fastest way to reach me.',
  },
  {
    q: 'What do you usually build with?',
    a: 'TypeScript and Python. Next.js on the web, Expo for mobile, Supabase or Postgres for data, and Azure OpenAI or Claude for the models. I keep dependencies few and deploy on Railway or Vercel.',
  },
];
