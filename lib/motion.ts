import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion language.
 * Every transition sits in the 0.5–0.8s range with a single easing curve so
 * the whole site feels like one object rather than a pile of components.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

export const transition: Transition = { duration: 0.65, ease: EASE };
export const transitionSlow: Transition = { duration: 0.8, ease: EASE };
export const spring: Transition = { type: 'spring', stiffness: 220, damping: 26, mass: 0.7 };

/** Fade + rise. The default entrance for almost everything. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitionSlow },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition },
};

/** Parent wrapper that staggers its children. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Viewport config used by every scroll-triggered section. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
