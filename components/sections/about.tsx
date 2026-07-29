'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { aboutCards, aboutIntro, aboutMore } from '@/data/about';
import { Panel } from '@/components/ui/panel';
import { Button } from '@/components/ui/button';
import { Stagger, StaggerItem } from '@/components/ui/reveal';
import { toneStyles } from '@/lib/tone';
import { cn } from '@/lib/utils';

/** Intro copy on the left, four capability tiles on the right. */
export function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Panel id="about" as="section" className="scroll-mt-24 p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_2fr] lg:gap-10">
        {/* ---------------- Intro ---------------- */}
        <div>
          <h2 className="text-[19px] font-semibold tracking-tight">About Me</h2>
          <p className="mt-4 text-pretty text-[14px] leading-relaxed text-fg2">
            {aboutIntro}
          </p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-4">
                  {aboutMore.map((para) => (
                    <p
                      key={para.slice(0, 24)}
                      className="text-pretty text-[13.5px] leading-relaxed text-fg2"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="tile"
            size="sm"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-6"
          >
            {expanded ? 'Show less' : 'Know more'}
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex"
            >
              <ArrowRight className="size-4" />
            </motion.span>
          </Button>
        </div>

        {/* ---------------- Capability tiles ---------------- */}
        <Stagger className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" gap={0.08}>
          {aboutCards.map((card) => {
            const tone = toneStyles[card.tone];
            const Icon = card.icon;

            return (
              <StaggerItem key={card.title} className="h-full">
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="tile h-full p-5 transition-colors duration-500 hover:border-accent/30"
                >
                  <span className={cn('flex size-8 items-center justify-center rounded-lg', tone.text)}>
                    <Icon className="size-[18px]" />
                  </span>
                  <h3 className="mt-4 text-[14.5px] font-semibold">{card.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-fg2">{card.body}</p>
                </motion.article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Panel>
  );
}
