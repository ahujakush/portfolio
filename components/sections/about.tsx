'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { education, experiences } from '@/data/experience';
import { site, socials } from '@/data/site';
import { EASE_EXPO, viewportOnce } from '@/lib/motion';
import { SplitHeading } from '@/components/ui/split-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';
import { socialIcon } from '@/components/ui/icons';

const bio = [
  'I got into software by breaking things and rebuilding them until they held up. Most of what I know came from shipping: reading docs at 2am, watching real people use what I made, and fixing what they tripped on.',
  'Today I lead engineering at BuildYour.Company, where we help founders diagnose their startup before they build more of it. On the side I build agents-hub, an AI team that works inside your Gmail, Calendar and Drive, and I write about every decision in public.',
  'I study Computer Science with a specialisation in AI & ML at SGT University, in my third year. The degree gives me the theory. The products keep me honest about it.',
];

export function About() {
  const photo = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: photo, offset: ['start end', 'end start'] });
  // The photo drifts slightly inside its frame while the frame scrolls
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container">
        <SplitHeading
          className="text-big font-bold"
          lines={['Building agents', 'that finish the job.']}
          accent={['that', 'finish', 'the', 'job.']}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          {/* The in-view trigger lives on this unclipped wrapper: a fully
              clipped element never registers as visible. */}
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.div
              ref={photo}
              className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface"
              variants={
                reduced
                  ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
                  : {
                      hidden: { clipPath: 'inset(100% 0% 0% 0% round 20px)' },
                      show: {
                        clipPath: 'inset(0% 0% 0% 0% round 20px)',
                        transition: { duration: 1.3, ease: EASE_EXPO },
                      },
                    }
              }
            >
              <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
                <Image
                  src="/kush/portrait.jpg"
                  alt="Kush Ahuja, AI engineer, in a crimson jacket"
                  fill
                  sizes="(min-width: 1024px) 420px, 92vw"
                  className="object-cover"
                />
              </motion.div>
              {/* Crimson grade from the bottom, after the reference's red portrait */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/55 via-accent/10 to-transparent mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/70 to-transparent" />
              <ul className="absolute bottom-4 right-4 flex gap-1.5">
                {socials.map((s) => {
                  const Icon = socialIcon[s.icon];
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label={s.label}
                        className="grid size-10 place-items-center rounded-full bg-bg/60 text-fg backdrop-blur-md transition-colors duration-200 hover:bg-accent"
                      >
                        <Icon width={16} height={16} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
            <Reveal className="mt-6">
              <p className="font-display text-2xl font-semibold tracking-[-0.02em]">{site.name}</p>
              <p className="mt-1 text-[16px] text-fg2">AI Engineer · CTO · Founder</p>
            </Reveal>
          </motion.div>

          <div>
            <Stagger className="space-y-5 text-[17px] leading-[1.75] text-fg2" gap={0.1}>
              {bio.map((para) => (
                <StaggerItem as="p" key={para.slice(0, 20)}>
                  {para}
                </StaggerItem>
              ))}
              <StaggerItem>
                <p aria-hidden className="pt-2 font-serif text-5xl italic text-accent">Kush</p>
              </StaggerItem>
            </Stagger>

            <Reveal as="h3" className="mt-14 font-display text-xl font-semibold tracking-[-0.01em]">
              Work history
            </Reveal>
            <Stagger as="ul" className="mt-5 space-y-3" gap={0.07}>
              {experiences.map((e) => (
                <StaggerItem
                  as="li"
                  key={e.company}
                  className="rounded-tile border border-fg/[0.07] bg-surface p-5 transition-colors duration-200 hover:border-fg/15"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-display text-[18px] font-semibold tracking-[-0.01em]">
                      {e.company}
                      {e.current && (
                        <span className="ml-2 inline-flex translate-y-[-2px] items-center rounded-full bg-accent/15 px-2 py-0.5 align-middle font-sans text-[11px] font-medium text-accent-text">
                          Now
                        </span>
                      )}
                    </p>
                    <p className="font-mono text-[12px] text-fg3">{e.period}</p>
                  </div>
                  <p className="mt-0.5 text-[14px] text-fg2">{e.role}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-fg3">{e.summary}</p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal as="h3" className="mt-12 font-display text-xl font-semibold tracking-[-0.01em]">
              Education
            </Reveal>
            <Stagger as="ul" className="mt-5 divide-y divide-line border-y border-line">
              {education.map((ed) => (
                <StaggerItem as="li" key={ed.school} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                  <div>
                    <p className="text-[16px] text-fg">{ed.school}</p>
                    <p className="text-[14px] text-fg3">
                      {ed.qualification}
                      {ed.detail ? ` · ${ed.detail}` : ''}
                    </p>
                  </div>
                  <p className="font-mono text-[12px] text-fg3">{ed.period}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
