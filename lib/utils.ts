import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** shadcn/ui class merger. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deterministic PRNG (mulberry32).
 *
 * Anything decorative that "looks random" — particles, heatmap cells — must
 * produce identical values on the server and the client, otherwise React
 * throws a hydration mismatch. Never use Math.random() during render.
 */
export function seededRandom(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Clamp a number between min and max. */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** 1234 -> "1,234" */
export const formatNumber = (n: number) => new Intl.NumberFormat('en-US').format(n);
