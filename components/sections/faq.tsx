'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { faqs } from '@/data/services';
import { site } from '@/data/site';
import { EASE_EXPO, EASE_QUART } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { SplitHeading } from '@/components/ui/split-heading';
import { Reveal } from '@/components/ui/reveal';
import { Mail, Plus } from '@/components/ui/icons';

/** Plain-text answers to the questions people (and AI search) ask about me. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SplitHeading className="text-big font-bold" lines={['Questions', 'people ask.']} accent={['people', 'ask.']} />
          <Reveal delay={0.15} className="mt-8 max-w-sm rounded-card border border-fg/[0.07] bg-surface p-6">
            <p className="font-display text-lg font-semibold">Still not sure?</p>
            <p className="mt-1 text-[15px] text-fg2">Tell me what you are building. I reply within a day.</p>
            <a href={`mailto:${site.email}`} className="btn-primary mt-5 h-11 px-5 text-[14px]">
              <Mail width={16} height={16} />
              Write to me
            </a>
          </Reveal>
        </div>

        <Reveal as="ul" className="border-t border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span className="font-mono text-[12px] text-accent-text">0{i + 1}</span>
                    <span className="flex-1 font-display text-[19px] font-semibold tracking-[-0.01em] sm:text-[22px]">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: EASE_EXPO }}
                      className={cn(
                        'grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-200',
                        isOpen ? 'border-accent bg-accent text-white' : 'border-fg/10 text-fg2 group-hover:border-fg/25',
                      )}
                    >
                      <Plus width={16} height={16} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1, transition: { duration: 0.45, ease: EASE_EXPO } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.25, ease: EASE_QUART } }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-7 pl-10 text-[16px] leading-relaxed text-fg2">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
