'use client';

import { ChevronRight } from 'lucide-react';
import { openCommandPalette } from '@/lib/command-events';

/**
 * Faux input strip that opens the real command palette.
 * A button rather than an <input>, so keyboard and screen-reader users get
 * one clear action instead of a field that swallows their typing.
 */
export function CommandBar() {
  return (
    <button
      type="button"
      onClick={openCommandPalette}
      aria-keyshortcuts="Meta+K Control+K"
      className="tile group flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all duration-500 ease-premium hover:border-accent/30 hover:bg-accent/[0.04]"
    >
      <ChevronRight className="size-4 shrink-0 text-accent" />
      <span className="flex-1 truncate text-[13.5px] text-fg3 transition-colors duration-500 group-hover:text-fg2">
        Type a command or search...
      </span>
      <kbd className="shrink-0 rounded-md border border-fg/[0.08] bg-fg/[0.04] px-1.5 py-0.5 font-mono text-[10.5px] text-fg3">
        ⌘ K
      </kbd>
    </button>
  );
}
