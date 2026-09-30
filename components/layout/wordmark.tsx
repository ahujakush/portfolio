'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE_EXPO } from '@/lib/motion';

/**
 * Oversized crimson name at the very bottom of every page. Letters rise out
 * of the bottom edge one after another when it scrolls into view.
 */
export function Wordmark({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const letters = text.split('');

  return (
    <div aria-hidden className="select-none overflow-hidden">
      <motion.p
        className="flex justify-center whitespace-nowrap px-2 font-display font-bold leading-[0.78] tracking-[-0.055em] text-accent"
        style={{ fontSize: 'clamp(3.5rem, 15.4vw, 17rem)' }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={
              reduced
                ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
                : {
                    hidden: { y: '70%', opacity: 0 },
                    show: { y: '12%', opacity: 1, transition: { duration: 1.1, ease: EASE_EXPO } },
                  }
            }
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}
