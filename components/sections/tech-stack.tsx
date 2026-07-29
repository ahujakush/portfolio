'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { techGroups } from '@/data/skills';
import { Panel } from '@/components/ui/panel';
import { TechTile } from '@/components/ui/tech-tile';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

/** Tabbed tech grid. The active tab underline slides between tabs. */
export function TechStack() {
  const [active, setActive] = useState(techGroups[0].id);
  const group = techGroups.find((g) => g.id === active) ?? techGroups[0];

  return (
    <Panel id="skills" as="section" className="scroll-mt-24 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-[17px] font-semibold tracking-tight">Tech Stack</h2>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Tech stack categories"
          className="mask-fade-x -mx-1 flex flex-1 items-center gap-1 overflow-x-auto px-1 lg:justify-center"
        >
          {techGroups.map((g) => {
            const isActive = g.id === active;
            return (
              <button
                key={g.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(g.id)}
                className={cn(
                  'relative shrink-0 rounded-lg px-3 py-1.5 text-[13px] transition-colors duration-500',
                  isActive ? 'text-accent' : 'text-fg2 hover:text-fg',
                )}
              >
                {g.label}
                {isActive && (
                  <motion.span
                    layoutId="tech-tab-underline"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>

        <a
          href="#resume"
          className="hidden text-[13px] text-accent transition-colors duration-500 hover:text-accent-hover sm:block"
        >
          Explore all
        </a>
      </div>

      <Reveal className="mt-8">
        <AnimatePresence mode="wait">
          <motion.ul
            key={group.id}
            className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10"
          >
            {group.items.map((tech, i) => (
              <TechTile key={tech.name} tech={tech} index={i} />
            ))}
          </motion.ul>
        </AnimatePresence>
      </Reveal>
    </Panel>
  );
}
