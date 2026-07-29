import type { LucideIcon } from 'lucide-react';

/** Accent tone used by icon chips, badges and glows. */
export type Tone = 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export type NavLink = { label: string; href: string };

export type SocialLink = { label: string; href: string; icon: LucideIcon };

export type AboutCard = {
  title: string;
  body: string;
  icon: LucideIcon;
  tone: Tone;
};

export type Experience = {
  company: string;
  short: string;
  role: string;
  duration: string;
  summary: string;
  tags: string[];
  current?: boolean;
  tone: Tone;
};

export type ProjectStatus = 'live' | 'in-progress' | 'archived';

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  stack: string[];
  status: ProjectStatus;
  featured?: boolean;
  demo?: string;
  repo?: string;
  year: string;
};

/** One tile in the tech-stack grid. `color` is the brand hue for the glyph. */
export type Tech = { name: string; color: string; short: string };

export type TechGroup = { id: string; label: string; items: Tech[] };

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  tone: Tone;
};

export type EducationItem = {
  school: string;
  qualification: string;
  period: string;
  detail?: string;
};

export type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  group: 'Navigate' | 'Actions' | 'Social';
  icon: LucideIcon;
  href?: string;
};
