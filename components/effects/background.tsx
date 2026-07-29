'use client';

import { motion, useTransform } from 'framer-motion';
import { useMemo } from 'react';
import { useMouseParallax } from '@/hooks/use-mouse-parallax';
import { seededRandom } from '@/lib/utils';

/**
 * Very restrained page backdrop — two drifting blue orbs, a faint grid and a
 * few floating dust motes. The bento panels do the visual work; this only
 * keeps the void behind them from looking flat.
 *
 * Particle positions come from a seeded PRNG so SSR and hydration match.
 */
const PARTICLES = 18;

export function Background() {
  const { x, y } = useMouseParallax(38, 20);

  const orbAX = useTransform(x, [-1, 1], [-26, 26]);
  const orbAY = useTransform(y, [-1, 1], [-20, 20]);
  const orbBX = useTransform(x, [-1, 1], [20, -20]);
  const orbBY = useTransform(y, [-1, 1], [14, -14]);

  const particles = useMemo(() => {
    const rand = seededRandom(884422);
    return Array.from({ length: PARTICLES }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: 1 + rand() * 1.8,
      duration: 16 + rand() * 14,
      delay: rand() * 12,
      drift: -28 - rand() * 46,
      opacity: 0.12 + rand() * 0.22,
    }));
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-bg" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 255 255 / 0.022) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.022) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 55% at 50% 0%, #000 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 55% at 50% 0%, #000 30%, transparent 100%)',
        }}
      />

      {/* Orbs */}
      <motion.div
        style={{ x: orbAX, y: orbAY }}
        className="absolute -left-[10%] -top-[8%] size-[560px] animate-orb-drift rounded-full blur-[150px]"
      >
        <div
          className="size-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgb(79 140 255 / 0.20), transparent 70%)' }}
        />
      </motion.div>

      <motion.div
        style={{ x: orbBX, y: orbBY }}
        className="absolute -right-[8%] top-[45%] size-[480px] animate-orb-drift rounded-full blur-[150px] [animation-delay:-11s]"
      >
        <div
          className="size-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgb(56 189 248 / 0.12), transparent 70%)' }}
        />
      </motion.div>

      {/* Dust */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-fg"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{ y: [0, p.drift, 0], opacity: [p.opacity, p.opacity * 0.25, p.opacity] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Noise */}
      <div className="noise absolute inset-0 opacity-[0.12] mix-blend-soft-light" />
    </div>
  );
}
