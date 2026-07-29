import type { TechGroup } from '@/types';

/**
 * Tabbed tech stack. `short` is the glyph shown in the tile and `color`
 * is the brand hue used to tint it — no external logo assets required.
 */
export const techGroups: TechGroup[] = [
  {
    id: 'ai',
    label: 'AI/ML',
    items: [
      { name: 'Python', short: 'Py', color: '#4F8CFF' },
      { name: 'PyTorch', short: 'Pt', color: '#EF4444' },
      { name: 'TensorFlow', short: 'Tf', color: '#F59E0B' },
      { name: 'Scikit-learn', short: 'Sk', color: '#38BDF8' },
      { name: 'Hugging Face', short: 'Hf', color: '#F59E0B' },
      { name: 'LangChain', short: 'Lc', color: '#22C55E' },
      { name: 'OpenAI', short: 'Ai', color: '#FAFAFA' },
      { name: 'Pandas', short: 'Pd', color: '#6EA8FF' },
      { name: 'NumPy', short: 'Np', color: '#4F8CFF' },
      { name: 'OpenCV', short: 'Cv', color: '#EF4444' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', short: 'Re', color: '#38BDF8' },
      { name: 'Next.js', short: 'N', color: '#FAFAFA' },
      { name: 'TypeScript', short: 'Ts', color: '#4F8CFF' },
      { name: 'Tailwind', short: 'Tw', color: '#38BDF8' },
      { name: 'Framer Motion', short: 'Fm', color: '#6EA8FF' },
      { name: 'shadcn/ui', short: 'Sh', color: '#FAFAFA' },
      { name: 'Zustand', short: 'Zu', color: '#F59E0B' },
      { name: 'Vite', short: 'Vi', color: '#6EA8FF' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'FastAPI', short: 'Fa', color: '#22C55E' },
      { name: 'Node.js', short: 'No', color: '#22C55E' },
      { name: 'Express', short: 'Ex', color: '#A1A1AA' },
      { name: 'REST', short: 'Re', color: '#4F8CFF' },
      { name: 'WebSockets', short: 'Ws', color: '#38BDF8' },
      { name: 'Celery', short: 'Ce', color: '#22C55E' },
      { name: 'Auth', short: 'Au', color: '#F59E0B' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    items: [
      { name: 'AWS', short: 'Aw', color: '#F59E0B' },
      { name: 'Vercel', short: 'Ve', color: '#FAFAFA' },
      { name: 'Railway', short: 'Ra', color: '#6EA8FF' },
      { name: 'Cloudflare', short: 'Cf', color: '#F59E0B' },
      { name: 'Supabase', short: 'Sb', color: '#22C55E' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    items: [
      { name: 'PostgreSQL', short: 'Pg', color: '#4F8CFF' },
      { name: 'pgvector', short: 'Pv', color: '#6EA8FF' },
      { name: 'Redis', short: 'Rd', color: '#EF4444' },
      { name: 'MongoDB', short: 'Mg', color: '#22C55E' },
      { name: 'SQLite', short: 'Sq', color: '#38BDF8' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    items: [
      { name: 'Docker', short: 'Dk', color: '#38BDF8' },
      { name: 'GitHub Actions', short: 'Ga', color: '#FAFAFA' },
      { name: 'Nginx', short: 'Nx', color: '#22C55E' },
      { name: 'Linux', short: 'Lx', color: '#F59E0B' },
      { name: 'Observability', short: 'Ob', color: '#6EA8FF' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { name: 'Git', short: 'Gi', color: '#EF4444' },
      { name: 'VS Code', short: 'Vs', color: '#4F8CFF' },
      { name: 'Figma', short: 'Fi', color: '#EF4444' },
      { name: 'Postman', short: 'Pm', color: '#F59E0B' },
      { name: 'Notion', short: 'No', color: '#FAFAFA' },
    ],
  },
];
