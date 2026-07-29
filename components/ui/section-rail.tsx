'use client';

import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { navLinks } from '@/data/site';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

/**
 * The "01 · · · ·" indicator down the left gutter of the hero.
 * Highlights whichever section is currently in view.
 */
export function SectionRail() {
  const ids = useMemo(() => navLinks.map((l) => l.href.replace('#', '')), []);
  const active = useScrollSpy(ids);
  const index = Math.max(ids.indexOf(active), 0);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex"
    >
      <span className="font-mono text-[11px] tabular-nums text-fg3">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="flex flex-col items-center gap-2.5">
        {ids.map((id, i) => (
          <span
            key={id}
            className={cn(
              'rounded-full transition-all duration-500 ease-premium',
              i === index ? 'size-1.5 bg-accent' : 'size-1 bg-fg/20',
            )}
          />
        ))}
      </span>
    </div>
  );
}
