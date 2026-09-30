'use client';

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { EASE_EXPO } from '@/lib/motion';

/** Counts up from zero the first time it scrolls into view. */
export function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduced = useReducedMotion();
  const mv = useMotionValue(reduced ? value : 0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(mv, value, { duration: 1.6, ease: EASE_EXPO });
    return () => controls.stop();
  }, [inView, reduced, value, mv]);

  return (
    <span ref={ref} className={className}>
      {/* Real number for crawlers and screen readers; the animated one is decorative */}
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden>{rounded}</motion.span>
    </span>
  );
}
