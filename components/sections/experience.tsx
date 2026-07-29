'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { experiences } from '@/data/experience';
import { Panel, PanelHeading } from '@/components/ui/panel';
import { Tag } from '@/components/ui/badge';
import { Stagger, StaggerItem } from '@/components/ui/reveal';
import { toneStyles } from '@/lib/tone';
import { cn } from '@/lib/utils';

/** Vertical timeline whose rail fills as you scroll past it. */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <Panel id="experience" as="section" className="scroll-mt-24 p-6 sm:p-7">
      <PanelHeading title="Experience" action="View all" href="#resume" />

      <div ref={ref} className="relative mt-7">
        {/* Rail */}
        <div aria-hidden className="absolute bottom-2 left-[17px] top-2 w-px">
          <div className="absolute inset-0 bg-divider" />
          <motion.div
            style={{ scaleY }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-accent via-accent/60 to-success/40"
          />
        </div>

        <Stagger className="space-y-7" gap={0.12}>
          {experiences.map((job) => {
            const tone = toneStyles[job.tone];

            return (
              <StaggerItem key={job.company} className="relative pl-[52px]">
                {/* Company avatar sitting on the rail */}
                <span
                  className={cn(
                    'absolute left-0 top-0 flex size-9 items-center justify-center rounded-lg border bg-card font-display text-[12px] font-bold',
                    tone.chip,
                  )}
                >
                  {job.short}
                  {job.current && (
                    <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-70" />
                      <span className="relative inline-flex size-2.5 rounded-full border-2 border-card bg-success" />
                    </span>
                  )}
                </span>

                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[15px] font-semibold leading-tight">{job.company}</h3>
                  <span className="font-mono text-[11.5px] text-fg3">{job.duration}</span>
                </div>
                <p className={cn('mt-0.5 text-[12.5px]', tone.text)}>{job.role}</p>

                <p className="mt-2.5 text-pretty text-[13px] leading-relaxed text-fg2">
                  {job.summary}
                </p>

                <ul className="mt-3.5 flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Panel>
  );
}
