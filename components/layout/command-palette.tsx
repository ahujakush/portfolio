'use client';

import {
  ArrowUp,
  Download,
  Github,
  Hash,
  Linkedin,
  Mail,
  Search,
  Twitter,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { navLinks, site } from '@/data/site';
import { onOpenCommandPalette } from '@/lib/command-events';
import { cn } from '@/lib/utils';
import type { CommandItem } from '@/types';

/**
 * ⌘K / Ctrl+K palette. Keyboard-first: type to filter, ↑↓ to move,
 * ↵ to run, Esc to dismiss. Also opens from the hero command bar.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);

  const commands: CommandItem[] = useMemo(
    () => [
      ...navLinks.map((link) => ({
        id: `nav-${link.href}`,
        label: `Go to ${link.label}`,
        group: 'Navigate' as const,
        icon: Hash,
        href: link.href,
      })),
      { id: 'top', label: 'Back to top', group: 'Navigate', icon: ArrowUp, href: '#top' },
      {
        id: 'resume',
        label: 'Download resume',
        group: 'Actions',
        icon: Download,
        href: site.resume,
        hint: 'PDF',
      },
      {
        id: 'email',
        label: 'Send an email',
        group: 'Actions',
        icon: Mail,
        href: `mailto:${site.email}`,
        hint: site.email,
      },
      { id: 'github', label: 'GitHub', group: 'Social', icon: Github, href: site.socials.github },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        group: 'Social',
        icon: Linkedin,
        href: site.socials.linkedin,
      },
      { id: 'x', label: 'X / Twitter', group: 'Social', icon: Twitter, href: site.socials.twitter },
    ],
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    results.forEach((item) => {
      map.set(item.group, [...(map.get(item.group) ?? []), item]);
    });
    return Array.from(map.entries());
  }, [results]);

  /* Open from the hero command bar */
  useEffect(() => onOpenCommandPalette(() => setOpen(true)), []);

  /* Global shortcuts: ⌘K toggles, "/" opens when not typing */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const el = event.target as HTMLElement | null;
      const typing =
        el?.tagName === 'INPUT' || el?.tagName === 'TEXTAREA' || el?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((v) => !v);
      } else if (event.key === '/' && !typing) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
    }
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  function run(item: CommandItem) {
    setOpen(false);
    if (!item.href) return;

    if (item.href.startsWith('#')) {
      // Wait for the dialog to close so focus and scroll don't fight.
      setTimeout(() => {
        document.querySelector(item.href!)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else if (item.href.startsWith('mailto:') || item.href.endsWith('.pdf')) {
      window.location.href = item.href;
    } else {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    }
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const len = Math.max(results.length, 1);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((c) => (c + 1) % len);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((c) => (c - 1 + len) % len);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = results[cursor];
      if (item) run(item);
    }
  }

  let flat = -1;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0" onKeyDown={onKeyDown}>
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Jump to a section, download the resume, or open a social profile.
        </DialogDescription>

        <div className="flex items-center gap-3 border-b border-fg/[0.08] px-4">
          <Search className="size-4 shrink-0 text-fg3" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            aria-label="Search commands"
            className="h-14 w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg3"
          />
          <kbd className="hidden shrink-0 rounded-md border border-fg/[0.08] bg-fg/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-fg3 sm:block">
            Esc
          </kbd>
        </div>

        <div className="max-h-[min(56vh,380px)] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-fg3">
              No matches for &ldquo;{query}&rdquo;.
            </p>
          )}

          {grouped.map(([group, items]) => (
            <div key={group} className="mb-1">
              <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg3">
                {group}
              </p>
              <ul>
                {items.map((item) => {
                  flat += 1;
                  const index = flat;
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => run(item)}
                        onMouseEnter={() => setCursor(index)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200',
                          cursor === index
                            ? 'bg-accent/12 text-fg'
                            : 'text-fg2 hover:bg-fg/[0.05]',
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.hint && (
                          <span className="truncate text-[11px] text-fg3">{item.hint}</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-fg/[0.08] px-4 py-2.5 text-[11px] text-fg3">
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-fg/10 px-1 font-mono">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-fg/10 px-1 font-mono">↵</kbd> select
          </span>
          <span className="ml-auto hidden items-center gap-1.5 sm:flex">
            <kbd className="rounded border border-fg/10 px-1 font-mono">/</kbd> to open
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
