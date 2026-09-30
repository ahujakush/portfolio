'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE_QUART } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Hand-drawn underline that draws itself in, after the agents-hub hero.
 * Lives inside a `relative` word; inherits its parent's hidden/show state.
 */
export function Swoosh({ className, delay = 0.9 }: { className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute -bottom-[0.16em] left-[-2%] h-[0.3em] w-[104%] overflow-visible', className)}
    >
      <motion.path
        d="M3 14C60 6 160 3 297 9"
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth={5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        variants={{
          hidden: { pathLength: reduced ? 1 : 0, opacity: reduced ? 0 : 1 },
          show: { pathLength: 1, opacity: 0.9, transition: { duration: 1, ease: EASE_QUART, delay } },
        }}
      />
    </svg>
  );
}
