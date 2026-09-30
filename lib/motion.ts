import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion language (design-engineering: easing-curves, duration-table).
 * Three curves, used on purpose:
 *   expo  — entrances, the element arrives fast and settles
 *   quart — hovers, fades, small state changes
 *   inOut — things travelling between two states
 */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_QUART = [0.25, 1, 0.5, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const enter: Transition = { duration: 0.9, ease: EASE_EXPO };
export const quick: Transition = { duration: 0.2, ease: EASE_QUART };

/** Rise + un-blur. The default entrance (transitions.dev cross-blur). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: enter },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_QUART } },
};

/** Parent wrapper that staggers its children. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/**
 * Viewport config for scroll reveals. `amount` is tiny on purpose: tall
 * sections never reach a big threshold and would sit invisible.
 */
export const viewportOnce = { once: true, amount: 0.01, margin: '0px 0px -12% 0px' } as const;
