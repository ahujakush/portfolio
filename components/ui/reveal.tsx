'use client';

import { motion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Common = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
};

/** Fades content in the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = 'div',
  id,
}: Common & { delay?: number; variants?: Variants }) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Tag
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
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
  gap = 0.09,
  delay = 0,
  as = 'div',
  id,
}: Common & { gap?: number; delay?: number }) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

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
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Tag id={id} className={cn(className)} variants={variants}>
      {children}
    </Tag>
  );
}
