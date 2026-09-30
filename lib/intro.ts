'use client';

import { useSyncExternalStore } from 'react';

/**
 * Tiny shared flag: has the intro loader finished? The hero waits on it so
 * its entrance plays after the curtain lifts, not hidden underneath it.
 */
let done = false;
const listeners = new Set<() => void>();

export function finishIntro() {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
}

export function useIntroDone() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => done,
    () => false,
  );
}
