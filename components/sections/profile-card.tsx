'use client';

import { motion, useTransform } from 'framer-motion';
import { useState } from 'react';
import { profileStack, site } from '@/data/site';
import { useMouseParallax } from '@/hooks/use-mouse-parallax';

const FIELDS = [
  { label: 'Role', value: site.role },
  { label: 'Location', value: site.location },
  { label: 'Experience', value: site.experience },
  { label: 'Focus', value: site.focus },
];

/**
 * The hero identity card: labelled fields on the left, a glowing avatar
 * ring on the right, tech chips underneath. Tilts slightly with the pointer.
 */
export function ProfileCard() {
  // Drop a square image at public/avatar.png to replace the monogram.
  const [hasPhoto, setHasPhoto] = useState(true);
  const { x, y } = useMouseParallax(70, 24);

  const rotateY = useTransform(x, [-1, 1], [5, -5]);
  const rotateX = useTransform(y, [-1, 1], [-4, 4]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full [perspective:1200px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="tile relative overflow-hidden rounded-panel p-5 sm:p-6"
      >
        {/* Blue bloom behind the avatar */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full blur-[70px]"
          style={{ background: 'radial-gradient(circle, rgb(79 140 255 / 0.28), transparent 70%)' }}
        />

        {/* Availability pill */}
        <div className="relative mb-5 flex justify-end">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-success" />
            </span>
            {site.availability}
          </span>
        </div>

        <div className="relative flex items-center gap-6">
          {/* Fields */}
          <dl className="min-w-0 flex-1 space-y-4">
            {FIELDS.map((field) => (
              <div key={field.label}>
                <dt className="text-[11px] uppercase tracking-[0.1em] text-fg3">
                  {field.label}
                </dt>
                <dd className="mt-1 truncate text-[14px] font-medium text-fg">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Avatar in an animated ring */}
          <div className="relative shrink-0">
            <span
              aria-hidden
              className="absolute -inset-5 rounded-full border border-accent/20"
            />
            <span
              aria-hidden
              className="absolute -inset-5 animate-ring-spin rounded-full border border-transparent border-t-accent/70"
            />
            <div className="glow-ring relative size-[116px] overflow-hidden rounded-full sm:size-[132px]">
              {hasPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/avatar.png"
                  alt={site.name}
                  onError={() => setHasPhoto(false)}
                  className="size-full rounded-full object-cover"
                />
              ) : (
                <div
                  className="flex size-full items-center justify-center rounded-full font-display text-3xl font-bold text-fg"
                  style={{
                    background:
                      'linear-gradient(150deg, rgb(79 140 255 / 0.35), rgb(24 24 27 / 0.9) 65%)',
                  }}
                >
                  {site.initials}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tech chips */}
        <ul className="relative mt-6 flex items-center gap-2.5">
          {profileStack.map((tech, i) => (
            <motion.li
              key={tech.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              title={tech.name}
              className="flex size-9 items-center justify-center rounded-lg border font-display text-[12px] font-bold transition-transform duration-500 ease-premium hover:scale-110"
              style={{
                color: tech.color,
                borderColor: `${tech.color}2E`,
                background: `${tech.color}12`,
              }}
            >
              <span aria-hidden>{tech.short}</span>
              <span className="sr-only">{tech.name}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
