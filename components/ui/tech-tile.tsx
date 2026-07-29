'use client';

import { motion } from 'framer-motion';
import type { Tech } from '@/types';

/**
 * A tech-stack tile. The glyph is a tinted monogram rather than a vendor
 * logo, so there are no third-party image assets or licensing questions.
 */
export function TechTile({ tech, index = 0 }: { tech: Tech; index?: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="tile group flex flex-col items-center gap-3 px-3 py-5 transition-colors duration-500 hover:border-accent/30"
    >
      <span
        aria-hidden
        className="flex size-10 items-center justify-center rounded-xl border font-display text-[15px] font-bold transition-transform duration-500 ease-premium group-hover:scale-110"
        style={{
          color: tech.color,
          borderColor: `${tech.color}33`,
          background: `${tech.color}14`,
        }}
      >
        {tech.short}
      </span>
      <span className="text-center font-mono text-[11px] leading-tight text-fg2 transition-colors duration-500 group-hover:text-fg">
        {tech.name}
      </span>
    </motion.li>
  );
}
