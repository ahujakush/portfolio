'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

type Props = {
  items: string[];
  /** Percent of one copy per second. Negative runs right-to-left reversed. */
  baseVelocity?: number;
  className?: string;
  itemClassName?: string;
};

/**
 * A row of words that drifts on its own and speeds up, flips direction and
 * leans with your scroll velocity. Two copies side by side wrap seamlessly.
 */
export function VelocityMarquee({ items, baseVelocity = 2, className, itemClassName }: Props) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smooth, [-2500, 2500], [10, -10]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <motion.div style={{ x, skewX: reduced ? 0 : skewX }} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <span key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={i} className={cn('flex items-center', itemClassName)}>
                {item}
                <span className="mx-[0.35em] text-accent" aria-hidden>
                  ✳
                </span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
