'use client';

import { Background } from '@/components/effects/background';
import { Cursor } from '@/components/effects/cursor';
import { ScrollProgress } from '@/components/effects/scroll-progress';
import { CommandPalette } from '@/components/layout/command-palette';

/**
 * One client boundary for every global layer, so app/layout.tsx and the
 * page itself can stay server components.
 */
export function SiteChrome() {
  return (
    <>
      <Background />
      <Cursor />
      <ScrollProgress />
      <CommandPalette />
    </>
  );
}
