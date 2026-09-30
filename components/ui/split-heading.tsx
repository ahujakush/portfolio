'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType } from 'react';
import { EASE_EXPO, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Swoosh } from '@/components/ui/swoosh';

type Props = {
  /** Each entry renders on its own line. */
  lines: string[];
  /** Words (exact match, punctuation included) drawn in crimson. */
  accent?: string[];
  /**
   * `serif` (default for section headings): accent words switch to Instrument
   * Serif italic. `sans`: accent words stay in Bricolage, like the agents-hub h1.
   */
  accentStyle?: 'serif' | 'sans';
  /** One word that gets the hand-drawn swoosh underneath. */
  swoosh?: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate on mount instead of on scroll (page h1s). */
  onMount?: boolean;
};

/* The agents-hub hero entrance: each word rises out of a blur, 70ms apart. */
const word: Variants = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(8px)' },
  show: { opacity: 1, y: '0em', filter: 'blur(0px)', transition: { duration: 1, ease: EASE_EXPO } },
};
const fade: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } };

export function SplitHeading({
  lines,
  accent = [],
  accentStyle = 'serif',
  swoosh,
  as = 'h2',
  className,
  delay = 0,
  onMount = false,
}: Props) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.h2;
  const reduced = useReducedMotion();
  const trigger = onMount
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: viewportOnce };

  let count = 0;

  return (
    <Tag
      className={className}
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    >
      {lines.map((line, i) => {
        const words = line.split(' ');
        return (
          <span key={i} className="block">
            {words.map((w, j) => {
              const isAccent = accent.includes(w);
              const idx = count++;
              return (
                <motion.span
                  key={j}
                  variants={reduced ? fade : word}
                  className={cn(
                    'inline-block',
                    isAccent && 'text-accent',
                    isAccent &&
                      accentStyle === 'serif' &&
                      'font-serif text-[1.1em] font-normal italic leading-[0.9] tracking-[-0.01em]',
                    w === swoosh && 'relative',
                  )}
                >
                  {w}
                  {w === swoosh && <Swoosh delay={delay + idx * 0.07 + 0.6} />}
                  {j < words.length - 1 ? ' ' : null}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
