import type { EducationItem, Experience } from '@/types';

export const experiences: Experience[] = [
  {
    company: 'agents-hub',
    role: 'Founder',
    period: '2026 — Now',
    current: true,
    summary: 'AI agents in Telegram and a mobile app, working inside Gmail, Calendar, Tasks and Drive.',
  },
  {
    company: 'BuildYour.Company',
    role: 'CTO & Co-founder',
    period: '2025 — Now',
    current: true,
    summary: 'Architecture, agent workflows and infrastructure for an AI startup diagnosis platform and Kairo.',
  },
  {
    company: 'Gold Quotient LLP',
    role: 'AI Intern',
    period: 'Jun — Dec 2025',
    summary: 'Built and benchmarked production LLM features and internal tools that cut manual review time.',
  },
  {
    company: 'TechnGlobal Pvt. Ltd.',
    role: 'Software Intern',
    period: 'Jan — Jul 2024',
    summary: 'Backend services and fixes on live products with the engineering team.',
  },
];

export const education: EducationItem[] = [
  {
    school: 'SGT University',
    qualification: 'B.Tech, CSE (AI & ML)',
    period: '2023 — 2027',
    detail: 'Third year',
  },
  {
    school: 'Jaspal Kaur Public School',
    qualification: 'Senior Secondary, Science',
    period: 'Until 2023',
  },
];
