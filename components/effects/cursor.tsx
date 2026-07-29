'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useHasPointer } from '@/hooks/use-media-query';

/**
 * Three-layer custom cursor:
 *   · a wide soft glow that lags behind
 *   · a ring that expands over interactive elements
 *   · a hard dot pinned to the real pointer position
 *
 * Only mounts on devices with a fine pointer, and never for users who
 * prefer reduced motion.
 */
export function Cursor() {
  const hasPointer = useHasPointer();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.15 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.15 });
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.4 });
  const glowX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.8 });
  const glowY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.8 });

  useEffect(() => {
    if (!hasPointer) return;

    const root = document.documentElement;
    root.classList.add('cursor-none-all');

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setActive(Boolean((event.target as Element | null)?.closest?.(interactiveSelector)));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      root.classList.remove('cursor-none-all');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [hasPointer, x, y]);

  if (!hasPointer) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200] hidden lg:block">
      {/* Ambient glow */}
      <motion.div
        style={{ x: glowX, y: glowY, opacity: visible ? 1 : 0 }}
        className="absolute -ml-[180px] -mt-[180px] size-[360px] rounded-full transition-opacity duration-500"
      >
        <div
          className="size-full rounded-full blur-[70px]"
          style={{
            background: 'radial-gradient(circle, rgba(79,157,255,0.16), transparent 65%)',
          }}
        />
      </motion.div>

      {/* Ring — outer node carries the position, inner node the size, so the
          ring stays centred on the pointer as it grows. */}
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.div
          initial={false}
          animate={{
            width: active ? 46 : 28,
            height: active ? 46 : 28,
            opacity: visible ? (active ? 0.9 : 0.45) : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/70"
        />
      </motion.div>

      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        animate={{ scale: active ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-white"
      />
    </div>
  );
}
