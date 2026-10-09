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
    a: 'Kush Ahuja is an AI engineer and founder based in Gurugram, India. He founded agents-hub, is CTO and co-founder of BuildYour.Company, and is a B.Tech student in CSE (AI & ML) at SGT University. He designs, builds and ships AI products end to end.',
  },
  {
    q: 'What can you help me build?',
    a: 'AI agents that act inside real accounts, full-stack web products, backend and data systems, and mobile apps. I take a product from the first schema to the deploy and keep it working after launch.',
  },
  {
    q: 'Are you available for work?',
    a: 'Yes, for select freelance builds and for full-time roles where I can own an AI product end to end. Email ahujakush07@gmail.com is the fastest way to reach me.',
  },
  {
    q: 'What have you built?',
    a: 'agents-hub, a team of AI agents that work inside Gmail, Calendar, Tasks and Drive from Telegram or a mobile app. BuildYour.Company, an AI startup diagnosis platform for early founders, and Kairo, its daily go-to-market coach. Smaller builds include a voice assistant, a RAG chatbot and a code studio.',
  },
  {
    q: 'What are AI agents?',
    a: 'AI agents are programs that use a language model to decide what to do, then act through real tools such as email, a calendar or a file store, and check the result. A chatbot tells you how to book a meeting; an AI agent books it.',
  },
  {
    q: 'Where are you based?',
    a: 'Gurugram, India (IST, UTC+5:30). You can follow my work on LinkedIn, GitHub, X and Instagram, or read the build-in-public posts on the blog.',
  },
  {
    q: 'What do you usually build with?',
    a: 'TypeScript and Python. Next.js on the web, Expo for mobile, Supabase or Postgres for data, and Azure OpenAI or Claude for the models. I keep dependencies few and deploy on Railway or Vercel.',
  },
];
