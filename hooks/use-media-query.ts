'use client';

import { useEffect, useState } from 'react';

/**
 * Subscribes to a media query. Returns false during SSR and on the first
 * render so markup is stable, then updates once mounted.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True on devices with a precise pointer — i.e. a real mouse. */
export const useHasPointer = () => useMediaQuery('(pointer: fine)');
