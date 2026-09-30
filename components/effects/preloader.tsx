'use client';

import { animate, AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EASE_EXPO, EASE_IN_OUT } from '@/lib/motion';
import { finishIntro } from '@/lib/intro';

/**
 * Runs in <head> before first paint. Only a first visit this session, without
 * reduced motion and not from a crawler, gets `data-intro="play"`. Everything
 * else never sees the overlay, not even for a frame.
 */
export const introScript = `(function(){try{var k='kush-intro-seen';var seen=sessionStorage.getItem(k);sessionStorage.setItem(k,'1');var r=matchMedia('(prefers-reduced-motion: reduce)').matches;var b=/bot|crawl|spider|slurp|preview|lighthouse|headless/i.test(navigator.userAgent);if(!seen&&!r&&!b){document.documentElement.dataset.intro='play'}}catch(e){}})();`;

/** A 0-100 counter and the name, then the curtain wipes up into the hero. */
export function Preloader() {
  const [show, setShow] = useState(true);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'));
  const bar = useTransform(count, [0, 100], [0, 1]);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== 'play') {
      setShow(false);
      finishIntro();
      return;
    }
    const controls = animate(count, 100, { duration: 1.2, ease: EASE_IN_OUT, onComplete: () => setShow(false) });
    return () => controls.stop();
  }, [count]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        delete document.documentElement.dataset.intro;
        finishIntro();
      }}
    >
      {show && (
        <motion.div
          key="intro"
          aria-hidden
          className="fixed inset-0 z-[200] hidden flex-col justify-between bg-bg p-6 sm:p-10 [html[data-intro=play]_&]:flex"
          initial={false}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.9, ease: EASE_EXPO } }}
          style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        >
          <p className="eyebrow">thekush.codes</p>
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-[clamp(3rem,12vw,9rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.05em]"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: EASE_EXPO }}
            >
              Kush <span className="text-accent">Ahuja</span>
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <p className="max-w-[26ch] text-sm text-fg3">AI engineer building agents that do real work.</p>
            <motion.p className="font-mono text-5xl tabular-nums text-accent sm:text-7xl">{rounded}</motion.p>
          </div>
          <motion.div style={{ scaleX: bar }} className="absolute inset-x-0 bottom-0 h-1 origin-left bg-accent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
