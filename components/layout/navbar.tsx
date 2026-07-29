'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { navLinks, site } from '@/data/site';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Magnetic } from '@/components/ui/magnetic';
import { cn } from '@/lib/utils';

/** Sticky bento navbar. Gains blur and a stroke once the page scrolls. */
export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const ids = useMemo(() => navLinks.map((l) => l.href.replace('#', '')), []);
  const active = useScrollSpy(ids);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 16));

  return (
    <div className="sticky top-3 z-50">
      <motion.nav
        aria-label="Primary"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'flex h-[60px] items-center justify-between rounded-panel px-4 transition-all duration-700 ease-premium sm:px-5',
          scrolled
            ? 'glass sheen shadow-panel'
            : 'border border-transparent bg-surface/60 backdrop-blur-sm',
        )}
      >
        {/* Logo */}
        <a
          href="#top"
          aria-label={`${site.name} — back to top`}
          className="font-display text-lg font-bold tracking-tight"
        >
          <span className="text-fg">K</span>
          <span className="text-accent">A</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace('#', '');
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-active={isActive}
                  className={cn(
                    'nav-link',
                    isActive ? 'text-accent' : 'text-fg2 hover:text-fg',
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <Magnetic strength={7} className="hidden sm:inline-flex">
            <Button asChild variant="tile" size="sm" className="h-9 rounded-lg">
              <a href={site.resume} download>
                Resume
                <Download />
              </a>
            </Button>
          </Magnetic>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-lg text-fg2 transition-colors hover:bg-fg/[0.06] hover:text-fg md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass sheen mt-2 rounded-panel p-2 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-lg px-3.5 py-2.5 text-sm transition-colors',
                      active === link.href.replace('#', '')
                        ? 'bg-accent/10 text-accent'
                        : 'text-fg2 hover:bg-fg/[0.05] hover:text-fg',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild variant="accent" className="mt-2 w-full">
              <a href={site.resume} download onClick={() => setOpen(false)}>
                Download Resume
                <Download />
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
