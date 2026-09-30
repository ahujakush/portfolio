'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { useHasPointer } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

/** Leans toward the cursor in 3D while hovered (mouse only), then settles back. */
export function Tilt({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const reduced = useReducedMotion();
  const hasPointer = useHasPointer();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 22 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 22 });
  const active = hasPointer && !reduced;

  return (
    <div className={cn('[perspective:1200px]', className)}>
      <motion.div
        style={active ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        onPointerMove={(e) => {
          if (!active) return;
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
