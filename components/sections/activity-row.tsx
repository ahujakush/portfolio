'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, GitCommitHorizontal } from 'lucide-react';
import { useMemo } from 'react';
import { ctaCard, currentlyBuilding, heatmapSeed, latestCommit } from '@/data/activity';
import { site } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Stagger, StaggerItem } from '@/components/ui/reveal';
import { Magnetic } from '@/components/ui/magnetic';
import { viewportOnce } from '@/lib/motion';
import { seededRandom } from '@/lib/utils';

/** The four-card dashboard row above the footer. */
export function ActivityRow() {
  return (
    <Stagger
      as="section"
      id="contact"
      className="grid scroll-mt-24 gap-3 md:grid-cols-2 xl:grid-cols-4"
      gap={0.09}
    >
      <StaggerItem className="h-full">
        <CtaCard />
      </StaggerItem>
      <StaggerItem className="h-full">
        <CommitCard />
      </StaggerItem>
      <StaggerItem className="h-full">
        <HeatmapCard />
      </StaggerItem>
      <StaggerItem className="h-full">
        <BuildingCard />
      </StaggerItem>
    </Stagger>
  );
}

/* ------------------------------------------------------------------ */

function CtaCard() {
  return (
    <div className="panel relative h-full overflow-hidden p-5 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-12 size-52 rounded-full blur-[70px]"
        style={{ background: 'radial-gradient(circle, rgb(79 140 255 / 0.26), transparent 70%)' }}
      />
      <div className="relative flex h-full flex-col">
        <h3 className="font-display text-[19px] font-semibold leading-snug tracking-tight">
          {ctaCard.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <Magnetic strength={8} className="mt-auto pt-6">
          <Button asChild variant="tile" size="sm">
            <a href={`mailto:${site.email}`}>
              {ctaCard.action}
              <ArrowRight />
            </a>
          </Button>
        </Magnetic>
      </div>
    </div>
  );
}

function CommitCard() {
  return (
    <div className="panel h-full p-5 sm:p-6">
      <h3 className="text-[13px] font-semibold text-fg2">Latest Commit</h3>

      <p className="mt-4 flex items-start gap-2 text-[13px] font-medium leading-snug">
        <GitCommitHorizontal className="mt-0.5 size-4 shrink-0 text-accent" />
        <span className="font-mono text-[12.5px]">{latestCommit.message}</span>
      </p>
      <p className="mt-1.5 pl-6 text-[11.5px] text-fg3">{latestCommit.relativeTime}</p>

      {/* Week activity dots */}
      <div className="mt-5 flex items-center gap-1.5">
        {latestCommit.weekActivity.map((level, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0.4, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className={`size-2 rounded-full ${
              level === 0 ? 'bg-fg/10' : level > 2 ? 'bg-warning' : 'bg-accent/70'
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-[11.5px] text-fg3">
        + {latestCommit.monthTotal} commits this month
      </p>
    </div>
  );
}

const WEEKS = 17;
const DAYS = 7;
const LEVELS = ['bg-fg/[0.06]', 'bg-accent/25', 'bg-accent/45', 'bg-accent/70', 'bg-accent'];

function HeatmapCard() {
  // Seeded so the server and client render identical markup.
  const grid = useMemo(() => {
    const rand = seededRandom(heatmapSeed);
    return Array.from({ length: WEEKS }, () =>
      Array.from({ length: DAYS }, () => {
        const roll = rand();
        if (roll < 0.22) return 0;
        if (roll < 0.44) return 1;
        if (roll < 0.66) return 2;
        if (roll < 0.86) return 3;
        return 4;
      }),
    );
  }, []);

  return (
    <div className="panel h-full p-5 sm:p-6">
      <h3 className="text-[13px] font-semibold text-fg2">GitHub Activity</h3>

      <div className="mt-4 flex gap-2">
        {/* Day labels */}
        <div className="flex flex-col justify-between py-[1px] font-mono text-[9px] text-fg3">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        <div className="flex flex-1 gap-[3px] overflow-hidden">
          {grid.map((week, w) => (
            <div key={w} className="flex flex-1 flex-col gap-[3px]">
              {week.map((level, d) => (
                <motion.span
                  key={d}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.4,
                    delay: w * 0.012 + d * 0.006,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`aspect-square w-full rounded-[2px] ${LEVELS[level]}`}
                  aria-hidden
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="sr-only">A heatmap of recent code contributions.</p>
    </div>
  );
}

function BuildingCard() {
  return (
    <div className="panel h-full p-5 sm:p-6">
      <h3 className="text-[13px] font-semibold text-fg2">Currently building</h3>

      <p className="mt-4 font-display text-[15px] font-semibold">{currentlyBuilding.name}</p>

      {/* Progress bar */}
      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-fg/[0.08]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${currentlyBuilding.progress}%` }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover"
          />
        </div>
        <span className="font-mono text-[11px] tabular-nums text-fg3">
          {currentlyBuilding.progress}%
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-[12px] leading-relaxed text-fg2">{currentlyBuilding.description}</p>
        <a
          href={currentlyBuilding.href}
          aria-label={`More about ${currentlyBuilding.name}`}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-fg/[0.08] bg-fg/[0.03] text-fg2 transition-all duration-500 ease-premium hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
        >
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </div>
  );
}
