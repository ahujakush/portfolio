export type Post = {
  title: string;
  blurb: string;
  date: string;
  readTime: string;
  tag: string;
  href?: string;
};

export const posts: Post[] = [
  {
    title: 'Building AI agents that actually finish the task',
    blurb:
      'What breaks when an agent moves from a notebook demo to something people depend on, and how to fix each failure mode.',
    date: 'Jun 12, 2026',
    readTime: '6 min',
    tag: 'AI',
  },
  {
    title: 'Lessons from building my first startup',
    blurb:
      'Everything I got wrong in the first six months of BYC, written down so I stop repeating it.',
    date: 'May 20, 2026',
    readTime: '5 min',
    tag: 'Founding',
  },
  {
    title: 'A practical prompt engineering cheatsheet',
    blurb:
      'The patterns I reach for most, with the reasoning behind each one instead of just the template.',
    date: 'May 02, 2026',
    readTime: '4 min',
    tag: 'Engineering',
  },
];
