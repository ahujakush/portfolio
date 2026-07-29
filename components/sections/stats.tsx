'use client';

import { motion } from 'framer-motion';
import { stats } from '@/data/stats';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Stagger, StaggerItem } from '@/components/ui/reveal';
import { toneStyles } from '@/lib/tone';
import { cn } from '@/lib/utils';

/** Six metric tiles. Numbers count up the first time they scroll into view. */
export function Stats() {
  return (
    <Stagger
      as="section"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      gap={0.07}
    >
      {stats.map((stat) => {
        const tone = toneStyles[stat.tone];
        const Icon = stat.icon;

        return (
          <StaggerItem key={stat.label} className="h-full">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="panel h-full p-4 transition-colors duration-500 hover:border-accent/25 sm:p-5"
            >
              <span className={cn('flex size-7 items-center justify-center', tone.text)}>
                <Icon className="size-[18px]" />
              </span>
              <p className="mt-3 font-display text-[22px] font-bold tracking-tight sm:text-2xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-0.5 text-[11.5px] leading-tight text-fg3">{stat.label}</p>
            </motion.div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
