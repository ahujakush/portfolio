import type { Tone } from '@/types';

/** Single source of truth for how a semantic tone renders. */
export const toneStyles: Record<
  Tone,
  { text: string; chip: string; dot: string; glow: string }
> = {
  accent: {
    text: 'text-accent',
    chip: 'border-accent/20 bg-accent/10 text-accent',
    dot: 'bg-accent',
    glow: 'rgb(79 140 255 / 0.35)',
  },
  success: {
    text: 'text-success',
    chip: 'border-success/20 bg-success/10 text-success',
    dot: 'bg-success',
    glow: 'rgb(34 197 94 / 0.3)',
  },
  warning: {
    text: 'text-warning',
    chip: 'border-warning/20 bg-warning/10 text-warning',
    dot: 'bg-warning',
    glow: 'rgb(245 158 11 / 0.3)',
  },
  danger: {
    text: 'text-danger',
    chip: 'border-danger/20 bg-danger/10 text-danger',
    dot: 'bg-danger',
    glow: 'rgb(239 68 68 / 0.3)',
  },
  info: {
    text: 'text-info',
    chip: 'border-info/20 bg-info/10 text-info',
    dot: 'bg-info',
    glow: 'rgb(56 189 248 / 0.3)',
  },
  neutral: {
    text: 'text-fg2',
    chip: 'border-fg/10 bg-fg/[0.06] text-fg2',
    dot: 'bg-fg3',
    glow: 'rgb(255 255 255 / 0.12)',
  },
};
