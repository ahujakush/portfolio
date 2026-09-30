'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { EASE_EXPO, EASE_QUART } from '@/lib/motion';
import { Check, Copy, Mail } from '@/components/ui/icons';

/**
 * Bottom "speak to me" dock. Shows once the hero is behind you, and steps
 * aside when the contact section is on screen so the page never shows the
 * same call to action twice.
 */
export function Dock() {
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setPastHero(y > window.innerHeight * 0.75));

  useEffect(() => {
    const el = document.getElementById('contact');
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), {
      rootMargin: '0px 0px -20% 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  const show = pastHero && !contactVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="dock"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE_EXPO } }}
          exit={{ y: 90, opacity: 0, transition: { duration: 0.3, ease: EASE_QUART } }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 sm:bottom-6"
        >
          <div className="flex items-center gap-2 rounded-full border border-fg/10 bg-surface/85 py-1.5 pl-5 pr-1.5 shadow-[0_18px_50px_-18px_rgb(0_0_0/0.85)] backdrop-blur-xl">
            <div className="mr-3 leading-tight">
              <p className="font-sans text-[14px] font-medium">Speak to me</p>
              <p className="font-sans text-[12px] text-fg3">Email or copy the address</p>
            </div>
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.email}`}
              className="grid size-11 place-items-center rounded-full bg-accent text-white transition-[background-color,transform] duration-200 ease-out-quart hover:bg-accent-deep active:scale-95"
            >
              <Mail width={18} height={18} />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
              className="relative grid size-11 place-items-center rounded-full bg-fg/[0.06] text-fg transition-[background-color,transform] duration-200 ease-out-quart hover:bg-fg/10 active:scale-95"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={copied ? 'check' : 'copy'}
                  initial={{ opacity: 0, scale: 0.6, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.6, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, ease: EASE_QUART }}
                >
                  {copied ? <Check width={18} height={18} className="text-accent-text" /> : <Copy width={17} height={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <span role="status" className="sr-only">
              {copied ? 'Email address copied' : ''}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
