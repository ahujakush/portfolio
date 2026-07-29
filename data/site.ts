import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import type { NavLink, SocialLink } from '@/types';

export const site = {
  name: 'Kush Ahuja',
  firstName: 'Kush',
  lastName: 'Ahuja',
  initials: 'KA',
  badge: 'AI Engineer & Founder',
  headline: 'I build AI products and scalable systems that solve real world problems.',
  role: 'AI Engineer',
  location: 'Gurugram, India',
  experience: '2+ Years',
  focus: 'AI • Backend • Cloud',
  availability: 'Available for work',
  email: 'ahujakush07@gmail.com',
  resume: '/kush-ahuja-resume.pdf',
  url: 'https://kushahuja.dev',
  // Replace with your real profiles before deploying.
  socials: {
    github: 'https://github.com/ahujakush',
    linkedin: 'https://linkedin.com/in/ahujakush',
    twitter: 'https://x.com/ahujakush',
  },
} as const;

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: site.socials.github, icon: Github },
  { label: 'LinkedIn', href: site.socials.linkedin, icon: Linkedin },
  { label: 'X', href: site.socials.twitter, icon: Twitter },
  { label: 'Email', href: `mailto:${site.email}`, icon: Mail },
];

/** Small logo chips along the bottom of the hero profile card. */
export const profileStack = [
  { name: 'Python', short: 'Py', color: '#4F8CFF' },
  { name: 'React', short: 'Re', color: '#38BDF8' },
  { name: 'Next.js', short: 'N', color: '#FAFAFA' },
  { name: 'Node.js', short: 'No', color: '#22C55E' },
  { name: 'Cloud', short: 'Cl', color: '#A1A1AA' },
];
