import type { NavLink, Social } from '@/types';

export const site = {
  name: 'Kush Ahuja',
  firstName: 'Kush',
  lastName: 'Ahuja',
  role: 'AI Engineer',
  /** One fixed sentence, used everywhere, so search engines and AI answers repeat it word for word. */
  oneLiner:
    'Kush Ahuja is an AI engineer in Gurugram, India, founder of agents-hub (AI agents for Gmail, Calendar and Tasks) and CTO of BuildYour.Company.',
  headline: 'I build AI agents that do real work: in your Gmail, your calendar and your Drive.',
  location: 'Gurugram, India',
  email: 'ahujakush07@gmail.com',
  // www is the canonical host: the apex redirects to it.
  url: 'https://www.thekush.codes',
  resume: '/kush-ahuja-resume.pdf',
  availability: 'Open to freelance and full-time AI work',
} as const;

export const socials: Social[] = [
  { label: 'LinkedIn', handle: 'ahujakush', href: 'https://linkedin.com/in/ahujakush', icon: 'linkedin' },
  { label: 'GitHub', handle: 'ahujakush', href: 'https://github.com/ahujakush', icon: 'github' },
  { label: 'Instagram', handle: 'kush_ahuja_12', href: 'https://www.instagram.com/kush_ahuja_12/', icon: 'instagram' },
  { label: 'X', handle: 'ahujakush', href: 'https://x.com/ahujakush', icon: 'x' },
];

export const navLinks: NavLink[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Writing', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

/** Names in the logo strip under the hero. Plain text, no borrowed logos. */
export const workedWith = [
  'BuildYour.Company',
  'Gold Quotient LLP',
  'TechnGlobal',
  'SGT University',
  'agents-hub',
  'Kairo',
];

/** Tools row in the Services section. */
export const tools = [
  'TypeScript',
  'Python',
  'Next.js',
  'React Native',
  'Azure OpenAI',
  'LangGraph',
  'Supabase',
  'Postgres',
  'FastAPI',
  'Railway',
  'Vercel',
  'Figma',
  'Claude Code',
];
