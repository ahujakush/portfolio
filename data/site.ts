import type { NavLink, Social } from '@/types';

export const site = {
  name: 'Kush Ahuja',
  firstName: 'Kush',
  lastName: 'Ahuja',
  role: 'AI Engineer & Founder',
  /** One fixed sentence, used everywhere, so search engines and AI answers repeat it word for word. */
  oneLiner:
    'Kush Ahuja is an AI engineer and founder based in Gurugram, India. He founded agents-hub and is CTO and co-founder of BuildYour.Company.',
  headline: 'I’m a founder and engineer building AI products people actually use.',
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
  { label: 'Notes', href: '/notes' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/#contact' },
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
