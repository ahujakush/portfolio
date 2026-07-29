import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    company: 'BYC',
    short: 'BYC',
    role: 'CTO & Co-Founder',
    duration: 'Jan 2025 — Present',
    current: true,
    tone: 'accent',
    summary:
      'Leading engineering on an AI platform for company building and hiring — architecture, agents and infrastructure.',
    tags: ['AI', 'Next.js', 'TypeScript', 'PostgreSQL', 'LangGraph'],
  },
  {
    company: 'Gold Quotient LLP',
    short: 'GQ',
    role: 'AI Intern',
    duration: 'Jun 2025 — Dec 2025',
    tone: 'info',
    summary:
      'Built and benchmarked production LLM features, and shipped internal tooling that cut manual review time.',
    tags: ['Python', 'FastAPI', 'OpenAI', 'LangChain', 'Pandas'],
  },
  {
    company: 'TechnGlobal Pvt. Ltd.',
    short: 'TG',
    role: 'Software Intern',
    duration: 'Jan 2024 — Jul 2024',
    tone: 'success',
    summary:
      'Contributed backend services and bug fixes to live products alongside the engineering team.',
    tags: ['Node.js', 'JavaScript', 'REST APIs', 'Git'],
  },
];

export const education = [
  {
    school: 'SGT University',
    qualification: 'B.Tech — CSE (AI & ML)',
    period: '2023 — 2027',
    detail: 'Currently in 3rd year',
  },
  {
    school: 'Jaspal Kaur Public School',
    qualification: 'Senior Secondary — Science',
    period: 'Until 2023',
  },
];
