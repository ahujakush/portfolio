import { Braces, Clock, GitBranch, Rocket, Trophy, Users } from 'lucide-react';
import type { Stat } from '@/types';

export const stats: Stat[] = [
  { label: 'Projects Completed', value: 12, suffix: '+', icon: Rocket, tone: 'accent' },
  { label: 'Years Experience', value: 2, suffix: '+', icon: Clock, tone: 'info' },
  { label: 'Hackathons', value: 8, suffix: '+', icon: Trophy, tone: 'warning' },
  { label: 'Happy Clients', value: 15, suffix: '+', icon: Users, tone: 'success' },
  { label: 'GitHub Contributions', value: 150, suffix: '+', icon: GitBranch, tone: 'accent' },
  { label: 'Lines of Code', value: 10, suffix: 'K+', icon: Braces, tone: 'info' },
];
