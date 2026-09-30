'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { services } from '@/data/services';
import { tools } from '@/data/site';
import { EASE_EXPO } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';
import { SplitHeading } from '@/components/ui/split-heading';
import { Reveal } from '@/components/ui/reveal';

const TILT = [-4, 3, -2.5, 3.5];

/**
 * Left: a pinned intro and the tools I use. Right: service cards that stick
 * and pile up like a hand of cards, each one shrinking a little as the next
 * lands on top of it.
 */
export function Services() {
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stack, offset: ['start start', 'end end'] });

  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="container grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SplitHeading className="text-big font-bold" lines={['What I help', 'you build…']} accent={['build…']} />
          <Reveal as="p" delay={0.1} className="mt-6 max-w-md text-[17px] leading-relaxed text-fg2">
            I work across the whole product, and I am happiest where AI meets real accounts, real data and real
            deadlines.
          </Reveal>
          <Reveal delay={0.2}>
            <p className="eyebrow mt-10">Tools I use</p>
            <ul className="mt-4 flex max-w-md flex-wrap gap-2">
              {tools.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-1.5 text-[13px] text-fg2 transition-colors duration-200 hover:border-accent/50 hover:text-fg"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div ref={stack} className="relative">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} total={services.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index) * 0.04]);
  const tilt = reduced ? 0 : TILT[index % TILT.length];
  const red = index % 2 === 0;
  const last = index === total - 1;

  return (
    <div
      className={cn('sticky flex items-start justify-center', last ? 'h-auto pb-4' : 'h-[62vh] sm:h-[66vh]')}
      style={{ top: `calc(var(--nav-h) + 40px + ${index * 26}px)` }}
    >
      <motion.article
        style={reduced ? undefined : { scale }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 90, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: tilt }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: EASE_EXPO }}
        className={cn(
          'w-full max-w-[560px] origin-top rounded-[28px] p-7 sm:p-9',
          red
            ? 'bg-accent text-white shadow-[0_30px_80px_-30px_rgb(var(--accent)/0.7)]'
            : 'border border-fg/10 bg-surface shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]',
        )}
      >
        <div className="flex items-center justify-between">
          <span className={cn('font-mono text-[12px]', red ? 'text-white/70' : 'text-fg3')}>
            0{index + 1} / 0{total}
          </span>
          <span
            aria-hidden
            className={cn('size-2.5 rounded-full', red ? 'bg-white' : 'bg-accent')}
          />
        </div>
        <h3 className="mt-10 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-none tracking-[-0.03em]">
          {service.title}
        </h3>
        <p className={cn('mt-4 max-w-[40ch] text-[16px] leading-relaxed', red ? 'text-white/85' : 'text-fg2')}>
          {service.body}
        </p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {service.chips.map((c) => (
            <li
              key={c}
              className={cn(
                'rounded-full border px-3 py-1.5 text-[13px]',
                red ? 'border-white/35 text-white' : 'border-fg/10 text-fg2',
              )}
            >
              {c}
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}
