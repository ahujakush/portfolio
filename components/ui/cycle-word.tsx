'use client';

import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EASE_EXPO, EASE_QUART } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Props = { words: string[]; className?: string; interval?: number };

/**
 * Swaps one word for the next with a cross-blur. Every word is rendered
 * invisibly in the same grid cell, so the slot is always as wide as the
 * longest word and the sentence around it never reflows.
 */
export function CycleWord({ words, className, interval = 2200 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduced, inView, interval, words.length]);

  return (
    <span ref={ref} className={cn('relative inline-grid align-baseline', className)}>
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <span className="sr-only">{words[0]}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden
          className="col-start-1 row-start-1"
          initial={{ opacity: 0, y: '0.35em', filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: '0em', filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_EXPO } }}
          // Exit with fewer properties than the entrance: it leaves softly.
          exit={{ opacity: 0, filter: 'blur(4px)', transition: { duration: 0.3, ease: EASE_QUART } }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
