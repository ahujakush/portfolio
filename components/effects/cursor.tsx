'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useHasPointer } from '@/hooks/use-media-query';

/**
 * Crimson dot that sticks to the pointer plus a ring that trails it. The ring
 * grows over anything clickable. Mouse only; the native cursor stays visible,
 * so nothing breaks if this layer fails.
 */
export function Cursor() {
  const hasPointer = useHasPointer();
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const enabled = hasPointer && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      setHot(!!t?.closest('a, button, [role="button"], summary, label'));
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[150]">
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: down ? 0.8 : hot ? 1.9 : 1,
          backgroundColor: hot ? 'rgb(234 0 68 / 0.14)' : 'rgb(234 0 68 / 0)',
        }}
        transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
        className="absolute -left-5 -top-5 size-10 rounded-full border border-accent/70"
      />
      <motion.div
        style={{ x, y }}
        animate={{ opacity: visible && !hot ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="absolute -left-[3px] -top-[3px] size-1.5 rounded-full bg-accent"
      />
    </div>
  );
}
