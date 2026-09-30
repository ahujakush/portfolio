'use client';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { EASE_EXPO, EASE_QUART } from '@/lib/motion';
import { useHasPointer } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { Check } from '@/components/ui/icons';

/* ------------------------------------------------------------------------ */
/*  Content                                                                 */
/* ------------------------------------------------------------------------ */

const CARES = [
  {
    title: 'I sweat the details',
    body: 'The wait before a reply, the words on a button, the edge case nobody tested. Products are won or lost in the small stuff, so that is where I spend my time.',
    say: 'details matter.',
    Demo: TypingDemo,
    place: 'lg:left-[3%] lg:top-[16%]',
  },
  {
    title: 'I build for trust',
    body: 'Anything that acts for you should earn it. I ship with clear states, honest numbers and a human in the loop where it counts.',
    say: 'trust comes first.',
    Demo: SendDemo,
    place: 'lg:right-[3%] lg:top-[30%]',
  },
  {
    title: 'I own it end to end',
    body: 'Idea, database, AI, interface and deploy. One person who cares about every layer and keeps it working long after launch day.',
    say: 'I’ll ship it.',
    Demo: VaultDemo,
    place: 'lg:left-[7%] lg:bottom-[7%]',
  },
] as const;

/* ------------------------------------------------------------------------ */
/*  Section                                                                 */
/* ------------------------------------------------------------------------ */

/**
 * A pinned scene: giant words drift behind the 3D avatar while three small,
 * live demos of the details I obsess over arrive one by one as you scroll.
 */
export function Care() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [step, setStep] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setStep(v < 0.16 ? 0 : v < 0.42 ? 1 : v < 0.68 ? 2 : 3);
  });

  const xTop = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['8%', '-22%']);
  const xBottom = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-18%', '10%']);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section ref={ref} id="care" aria-labelledby="care-title" className="relative h-[330vh] lg:h-[380vh]">
      <h2 id="care-title" className="sr-only">
        What I care about: I sweat the details, I build for trust, and I own my work end to end.
      </h2>

      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Crimson bloom behind the avatar */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[58%] size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[110px]"
        />

        {/* Giant words, drifting apart as you scroll */}
        <div aria-hidden className="absolute inset-x-0 top-[16%] select-none sm:top-[12%]">
          <motion.p
            style={{ x: xTop }}
            className="whitespace-nowrap font-display text-[clamp(4.5rem,17vw,16rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.05em] text-fg"
          >
            Sweat the
          </motion.p>
          <motion.p
            style={{ x: xBottom }}
            className="whitespace-nowrap font-display text-[clamp(4.5rem,17vw,16rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.05em] text-accent"
          >
            small stuff.
          </motion.p>
        </div>

        {/* Top rail: label + progress */}
        <div className="container relative z-30 flex items-center justify-between pt-24 sm:pt-28">
          <p className="eyebrow flex items-center gap-2">
            <span className="h-px w-6 bg-accent" />
            What I care about
          </p>
          <div className="flex items-center gap-3 font-mono text-[12px] text-fg3">
            <span className="tabular-nums text-fg">0{Math.max(step, 1)}</span>
            <span className="relative h-px w-16 overflow-hidden bg-fg/15">
              <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-accent" />
            </span>
            <span>03</span>
          </div>
        </div>

        <Avatar step={step} progress={scrollYProgress} />

        {/* Desktop: cards collect around the avatar. Phones: one at a time, at the bottom. */}
        {CARES.map((c, i) => {
          const shown = step >= i + 1;
          const active = step === i + 1;
          return (
            // Plain wrapper owns the position: Framer's transforms would override Tailwind's translate
            <div
              key={c.title}
              className={cn(
                'absolute inset-x-4 bottom-5 z-30 transition-opacity duration-300 sm:inset-x-0 sm:mx-auto sm:w-[380px] lg:inset-x-auto lg:bottom-auto lg:mx-0 lg:w-[340px]',
                c.place,
                // Phones show one card at a time
                !active && 'max-lg:pointer-events-none max-lg:opacity-0',
              )}
            >
              <motion.article
                initial={false}
                animate={
                  shown
                    ? { opacity: active ? 1 : 0.5, y: 0, scale: active ? 1 : 0.96, filter: 'blur(0px)' }
                    : {
                        opacity: 0,
                        y: reduced ? 0 : 50,
                        scale: reduced ? 1 : 0.9,
                        filter: reduced ? 'blur(0px)' : 'blur(8px)',
                      }
                }
                transition={{ duration: 0.7, ease: EASE_EXPO }}
                className="rounded-[22px] border border-fg/10 bg-surface/90 p-4 shadow-[0_30px_70px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl"
              >
                <div className="rounded-[14px] bg-bg/70 p-3 ring-1 ring-fg/[0.06]">
                  <c.Demo active={active && !reduced} />
                </div>
                <div className="px-1 pb-1 pt-4">
                  <p className="font-mono text-[11px] text-accent-text">0{i + 1}</p>
                  <h3 className="mt-1 font-display text-[22px] font-bold leading-tight tracking-[-0.03em]">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-fg2">{c.body}</p>
                </div>
              </motion.article>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/*  Avatar                                                                   */
/* ------------------------------------------------------------------------ */

function Avatar({ step, progress }: { step: number; progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const hasPointer = useHasPointer();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 90, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 90, damping: 18 });
  const scrollRotate = useTransform(progress, [0, 1], reduced ? [0, 0] : [-5, 5]);
  const scale = useTransform(progress, [0, 0.15, 1], reduced ? [1, 1, 1] : [0.9, 1, 1.04]);

  // The head follows the pointer anywhere on screen (mouse only)
  useEffect(() => {
    if (!hasPointer || reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [hasPointer, reduced, mx, my]);

  const line = step === 0 ? 'scroll. I’ll show you.' : CARES[step - 1].say;

  return (
    <div className="absolute inset-x-0 bottom-[33%] z-20 flex justify-center sm:bottom-[26%] lg:bottom-0">
      <motion.div style={{ scale, rotate: scrollRotate }} className="relative [perspective:900px]">
        {/* Speech bubble */}
        <div className="absolute -top-2 left-[62%] z-10 sm:left-[68%]">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 10, scale: 0.8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE_EXPO } }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: EASE_QUART } }}
              className="relative origin-bottom-left whitespace-nowrap rounded-2xl rounded-bl-md bg-fg px-4 py-2.5 font-display text-[15px] font-semibold text-bg shadow-lg sm:text-[17px]"
            >
              {line}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          style={{ rotateX, rotateY }}
          animate={reduced ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* A little nod every time the step changes */}
          <motion.div
            key={step}
            initial={reduced ? false : { rotate: 0 }}
            animate={reduced ? undefined : { rotate: [0, -7, 5, 0] }}
            transition={{ duration: 0.8, ease: EASE_QUART }}
            className="relative h-[34svh] w-[calc(34svh*0.874)] sm:h-[44svh] sm:w-[calc(44svh*0.874)] lg:h-[min(60svh,560px)] lg:w-[calc(min(60svh,560px)*0.874)]"
          >
            <Image
              src="/kush/avatar-3d.webp"
              alt="3D cartoon avatar of Kush Ahuja"
              fill
              sizes="(min-width: 1024px) 490px, 45vw"
              className="object-contain object-bottom drop-shadow-[0_40px_60px_rgb(0_0_0/0.6)]"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  Demos                                                                    */
/* ------------------------------------------------------------------------ */

/**
 * Steps through timestamps (ms) while active and loops. Inactive or reduced
 * motion shows the last frame, so every demo has a complete static state.
 */
function useSequence(active: boolean, marks: number[], loop: number) {
  const [i, setI] = useState(marks.length);
  useEffect(() => {
    if (!active) {
      setI(marks.length);
      return;
    }
    let timers: number[] = [];
    const run = () => {
      setI(0);
      timers = marks.map((t, k) => window.setTimeout(() => setI(k + 1), t));
    };
    run();
    const id = window.setInterval(run, loop);
    return () => {
      window.clearInterval(id);
      timers.forEach(clearTimeout);
    };
    // marks are static per demo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, loop]);
  return i;
}

const pop = {
  initial: { opacity: 0, y: 8, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: EASE_EXPO } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

function Bubble({ me, children }: { me?: boolean; children: ReactNode }) {
  return (
    <motion.p
      layout
      {...pop}
      className={cn(
        'max-w-[85%] rounded-2xl px-3 py-1.5 text-[12.5px] leading-snug',
        me ? 'self-end rounded-br-md bg-accent text-white' : 'self-start rounded-bl-md bg-raised text-fg',
      )}
    >
      {children}
    </motion.p>
  );
}

function TypingDemo({ active }: { active: boolean }) {
  const s = useSequence(active, [300, 1200, 2100, 2500, 4900], 7000);
  return (
    <div className="flex h-[136px] flex-col justify-end gap-1.5">
      <AnimatePresence initial={false}>
        {s >= 1 && <Bubble me key="a">add to my todo list</Bubble>}
        {s >= 2 && <Bubble me key="b">gym tomorrow</Bubble>}
        {s >= 3 && <Bubble me key="c">at 7 am</Bubble>}
        {s === 4 && (
          <motion.div key="wait" {...pop} className="flex items-center gap-2 self-start text-[11.5px] text-fg3">
            <svg viewBox="0 0 20 20" className="size-4 -rotate-90">
              <circle cx="10" cy="10" r="8" fill="none" stroke="rgb(var(--fg)/0.12)" strokeWidth="2.5" />
              <motion.circle
                cx="10"
                cy="10"
                r="8"
                fill="none"
                stroke="rgb(var(--accent))"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.3, ease: 'linear' }}
              />
            </svg>
            waiting for the whole thought
          </motion.div>
        )}
        {s >= 5 && (
          <Bubble key="r">
            <span className="inline-flex items-center gap-1">
              <Check width={13} height={13} className="text-accent-text" /> Added: Gym, tomorrow 7:00
            </span>
          </Bubble>
        )}
      </AnimatePresence>
    </div>
  );
}

function SendDemo({ active }: { active: boolean }) {
  const s = useSequence(active, [700, 1500, 1800], 4600);
  const sent = s >= 3;
  return (
    <div className="relative h-[136px] text-[12px]">
      <div className="rounded-xl border border-fg/[0.08] bg-surface p-3">
        <p className="text-fg3">
          To <span className="text-fg">priya@acme.com</span>
        </p>
        <p className="mt-1 font-medium text-fg">Q3 deck is ready</p>
        <p className="mt-0.5 line-clamp-1 text-fg2">Want to go through it Friday at 4?</p>
      </div>
      <div className="mt-2.5 flex gap-2">
        <motion.span
          animate={{ scale: s === 2 ? 0.92 : 1, backgroundColor: sent ? 'rgb(36 35 40)' : 'rgb(234 0 68)' }}
          transition={{ duration: 0.2, ease: EASE_QUART }}
          className="inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 font-medium text-white"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={sent ? 'sent' : 'send'} {...pop} className="inline-flex items-center gap-1.5">
              {sent ? (
                <>
                  <Check width={13} height={13} className="text-accent-text" /> Sent by you
                </>
              ) : (
                <>📤 Send</>
              )}
            </motion.span>
          </AnimatePresence>
        </motion.span>
        <span className="inline-flex h-8 items-center rounded-full border border-fg/10 px-3.5 text-fg2">Cancel</span>
      </div>
      {/* A pretend finger that walks over and taps Send */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 size-4 rounded-full border-2 border-white bg-white/30"
        animate={
          s >= 1 && s < 3
            ? { x: 40, y: 92, opacity: 1, scale: s === 2 ? 0.75 : 1 }
            : { x: 160, y: 120, opacity: 0, scale: 1 }
        }
        transition={{ duration: 0.6, ease: EASE_EXPO }}
      />
    </div>
  );
}

function VaultDemo({ active }: { active: boolean }) {
  const s = useSequence(active, [300, 1300, 2300], 5200);
  const files = ['compiler-report.pdf', 'Q3-deck.pptx', 'invoice-aug.xlsx'];
  return (
    <div className="flex h-[136px] flex-col gap-1.5 text-[12px]">
      <div className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-fg2 ring-1 ring-fg/[0.08]">
        <span className="size-1.5 rounded-full bg-accent" />
        <span className="truncate">{s >= 1 ? '“send me that compiler report”' : 'Agent Hub Vault'}</span>
      </div>
      <ul className="space-y-1">
        {files.map((f, i) => (
          <motion.li
            key={f}
            animate={{
              backgroundColor: s >= 2 && i === 0 ? 'rgb(234 0 68 / 0.16)' : 'rgb(0 0 0 / 0)',
              opacity: s >= 2 && i !== 0 ? 0.35 : 1,
            }}
            transition={{ duration: 0.3, ease: EASE_QUART }}
            className="flex items-center justify-between rounded-lg px-2.5 py-1 text-fg"
          >
            {f}
            {s >= 3 && i === 0 && (
              <motion.span {...pop} className="inline-flex items-center gap-1 text-[11px] text-accent-text">
                <Check width={12} height={12} /> sent to chat
              </motion.span>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
