import { Code2, Compass, Rocket, UserRound } from 'lucide-react';
import type { AboutCard } from '@/types';

export const aboutIntro =
  "I'm an AI engineer and founder who likes building intelligent systems, developer tools and products that create real impact.";

export const aboutCards: AboutCard[] = [
  {
    title: 'Who I Am',
    icon: UserRound,
    tone: 'accent',
    body: 'A problem solver who enjoys building and scaling products end to end.',
  },
  {
    title: 'My Journey',
    icon: Compass,
    tone: 'accent',
    body: 'From curiosity to code — exploring AI and shipping software since day one.',
  },
  {
    title: 'What I Build',
    icon: Code2,
    tone: 'accent',
    body: 'AI apps, developer tools and scalable backend systems.',
  },
  {
    title: 'Current Focus',
    icon: Rocket,
    tone: 'accent',
    body: 'Building AI products that are helpful, usable and genuinely reliable.',
  },
];

/** Expanded copy revealed by the "Know more" toggle. */
export const aboutMore = [
  'I study Computer Science with a specialisation in AI & ML at SGT University, currently in my third year. Most of what I know came from shipping — breaking things, reading docs at 2am and rebuilding until they held up.',
  'Right now I lead engineering at BYC as CTO, where I own the architecture, the AI layer and the roadmap. Before that I shipped production AI features across two internships.',
];
