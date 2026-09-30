'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks, site, socials } from '@/data/site';
import { EASE_EXPO, EASE_QUART } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { socialIcon } from '@/components/ui/icons';

/**
 * Floating pill at the top centre: avatar, name, menu. The menu grows out of
 * the pill itself rather than opening a separate sheet, so it reads as one
 * object changing shape.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // Close on route change and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* Dim the page behind an open menu; clicking it closes the menu */}
      <AnimatePresence>
        {open && (
          <motion.button
            key="scrim"
            aria-label="Close menu"
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default bg-bg/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_QUART }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5">
        <motion.nav
          aria-label="Main"
          initial={reduced ? false : { y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.2 }}
          className="pointer-events-auto w-full max-w-[400px] overflow-hidden rounded-[28px] border border-fg/10 bg-surface/80 shadow-[0_18px_50px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl backdrop-saturate-150"
        >
          <div className="flex h-14 items-center gap-3 pl-2 pr-1.5">
            <Link href="/" className="group flex items-center gap-2.5 rounded-full pr-2" aria-label="Kush Ahuja, home">
              <span className="relative size-10 overflow-hidden rounded-full ring-1 ring-fg/10">
                <Image src="/kush/avatar.jpg" alt="Kush Ahuja" fill sizes="40px" className="object-cover" priority />
              </span>
              <span className="font-display text-[15px] font-semibold tracking-[-0.01em]">{site.name}</span>
            </Link>

            <span className="ml-auto hidden items-center gap-1.5 text-[12px] text-fg3 sm:flex">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-pulse-dot rounded-full bg-accent" />
                <span className="relative size-2 rounded-full bg-accent" />
              </span>
              Available
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="ml-auto grid size-11 place-items-center rounded-full transition-colors duration-200 hover:bg-fg/[0.06] sm:ml-1"
            >
              <MenuGlyph open={open} />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="site-menu"
                key="menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1, transition: { duration: 0.5, ease: EASE_EXPO } }}
                exit={{ height: 0, opacity: 0, transition: { duration: 0.3, ease: EASE_QUART } }}
              >
                <motion.ul
                  className="px-5 pb-2 pt-3"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } } }}
                >
                  {navLinks.map((link, i) => {
                    const active = link.href === pathname || (link.href === '/blog' && pathname.startsWith('/blog'));
                    return (
                      <motion.li
                        key={link.href}
                        variants={{
                          hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                          show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE_EXPO } },
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'group flex items-baseline gap-3 border-b border-fg/[0.06] py-3 font-display text-[26px] font-semibold tracking-[-0.02em] transition-colors duration-200',
                            active ? 'text-accent-text' : 'text-fg hover:text-accent-text',
                          )}
                        >
                          <span className="font-mono text-[11px] font-normal text-fg3">0{i + 1}</span>
                          <span className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1">
                            {link.label}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                <div className="flex items-center justify-between gap-3 px-5 pb-5 pt-3">
                  <a href={`mailto:${site.email}`} className="truncate text-[13px] text-fg2 transition-colors hover:text-fg">
                    {site.email}
                  </a>
                  <div className="flex gap-1">
                    {socials.map((s) => {
                      const Icon = socialIcon[s.icon];
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="grid size-9 place-items-center rounded-full text-fg2 transition-colors duration-200 hover:bg-fg/[0.06] hover:text-fg"
                        >
                          <Icon width={16} height={16} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}

/** Two bars that fold into an X. One glyph transforming, not two cross-fading. */
function MenuGlyph({ open }: { open: boolean }) {
  const t = { duration: 0.35, ease: EASE_EXPO };
  return (
    <span className="relative block h-3 w-[18px]" aria-hidden>
      <motion.span
        className="absolute left-0 top-0 h-[1.8px] w-full rounded-full bg-fg"
        animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={t}
      />
      <motion.span
        className="absolute bottom-0 left-0 h-[1.8px] w-full rounded-full bg-fg"
        animate={open ? { y: -5.2, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={t}
      />
    </span>
  );
}
