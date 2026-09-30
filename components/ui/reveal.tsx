'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { fadeIn, fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Common = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
};

const tag = (as: ElementType) => motion[as as keyof typeof motion] as typeof motion.div;

/** Fades content in the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = 'div',
  id,
}: Common & { delay?: number; variants?: Variants }) {
  const Tag = tag(as);
  // Reduced motion keeps the fade and drops the travel and blur.
  const reduced = useReducedMotion();

  return (
    <Tag
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={reduced ? fadeIn : variants}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

/** Orchestrates its <StaggerItem> children into a sequence. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
  as = 'div',
  id,
}: Common & { gap?: number; delay?: number }) {
  const Tag = tag(as);

  return (
    <Tag
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(gap, delay)}
    >
      {children}
    </Tag>
  );
}

/** A child of <Stagger>. Inherits the parent's hidden/show orchestration. */
export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  as = 'div',
  id,
}: Common & { variants?: Variants }) {
  const Tag = tag(as);
  const reduced = useReducedMotion();

  return (
    <Tag id={id} className={cn(className)} variants={reduced ? fadeIn : variants}>
      {children}
    </Tag>
  );
}
