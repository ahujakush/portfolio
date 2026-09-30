'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Circular text badge that spins slowly and turns faster while you scroll,
 * with a crimson button in the middle.
 */
export function RotatingBadge({
  text,
  href,
  label,
  className,
  children,
}: {
  text: string;
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const id = useId().replace(/:/g, '');
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollTurn = useTransform(scrollY, (v) => (reduced ? 0 : v * 0.25));

  return (
    <a href={href} aria-label={label} className={cn('group relative grid size-32 place-items-center', className)}>
      <motion.span style={{ rotate: scrollTurn }} className="absolute inset-0">
        <svg
          viewBox="0 0 120 120"
          className={cn('h-full w-full', !reduced && 'animate-[spin_18s_linear_infinite]')}
          aria-hidden
        >
          <defs>
            <path id={`c-${id}`} d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
          </defs>
          <text className="fill-fg2 font-mono text-[9.6px] uppercase" letterSpacing="3.2">
            <textPath href={`#c-${id}`}>{text}</textPath>
          </text>
        </svg>
      </motion.span>
      <span className="grid size-14 place-items-center rounded-full bg-accent text-white shadow-[0_10px_30px_-8px_rgb(var(--accent)/0.8)] transition-transform duration-300 ease-out-quart group-hover:scale-110">
        {children}
      </span>
    </a>
  );
}
