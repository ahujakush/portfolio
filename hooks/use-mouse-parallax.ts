'use client';

import { useEffect } from 'react';
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Tracks the pointer as a normalised -1..1 offset from the centre of the
 * viewport, smoothed by a spring. Feed the result into transforms for a
 * subtle depth effect.
 */
export function useMouseParallax(stiffness = 60, damping = 22) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness, damping, mass: 0.6 });
  const springY = useSpring(y, { stiffness, damping, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        x.set((event.clientX / window.innerWidth - 0.5) * 2);
        y.set((event.clientY / window.innerHeight - 0.5) * 2);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [x, y, reduced]);

  return { x: springX, y: springY };
}
