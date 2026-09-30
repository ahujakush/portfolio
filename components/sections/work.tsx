'use client';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { projects, statusLabel } from '@/data/projects';
import { EASE_EXPO, EASE_QUART, viewportOnce } from '@/lib/motion';
import { useHasPointer } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';
import { SplitHeading } from '@/components/ui/split-heading';
import { ProjectArt } from '@/components/ui/project-art';
import { Reveal } from '@/components/ui/reveal';
import { ArrowUpRight, Plus } from '@/components/ui/icons';

export function Work() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SplitHeading className="text-big font-bold" lines={['Latest projects']} accent={['projects']} />
          <Reveal as="p" delay={0.15} className="max-w-sm text-fg2">
            Products I lead today, and the builds that taught me how to ship them.
          </Reveal>
        </div>

        {/* The first project leads full width; the rest pair up */}
        <div className="mt-14 grid gap-x-6 gap-y-16 md:grid-cols-2">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} wide={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Everything else, as an expandable index. Sits after About on the home page. */
export function MoreBuilds() {
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id="more-builds" className="py-20 sm:py-28">
      <div className="container">
        <Reveal className="flex items-end justify-between border-b border-line pb-6">
          <SplitHeading className="text-big font-bold" lines={['More builds']} accent={['builds']} />
          <span className="font-mono text-xs text-fg3">{rest.length} projects</span>
        </Reveal>
        <ProjectIndex projects={rest} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */

function projectLink(p: Project) {
  if (p.href) return { href: p.href, label: 'View project', external: true };
  if (p.post) return { href: `/blog/${p.post}`, label: 'Read the story', external: false };
  return null;
}

function CardLink({ project, children }: { project: Project; children: ReactNode }) {
  const link = projectLink(project);
  const cls = 'group block outline-none';
  if (!link) return <div className={cls}>{children}</div>;
  if (link.external)
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  return (
    <Link href={link.href} className={cls}>
      {children}
    </Link>
  );
}

function Cover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_0%,rgb(var(--accent)/0.35),transparent_60%)]">
        {/* The live site peeks in from the lower right, like a window left open */}
        <div className="absolute left-[7%] top-[10%] h-full w-full overflow-hidden rounded-tl-[14px] shadow-[0_30px_70px_-20px_rgb(0_0_0/0.9)] ring-1 ring-white/10 transition-transform duration-700 ease-out-quart group-hover:-translate-x-1.5 group-hover:-translate-y-1.5">
          <Image
            src={project.image}
            alt={`${project.title} website`}
            fill
            sizes="(min-width: 768px) 560px, 92vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]">
      <ProjectArt kind={project.art ?? 'code'} label={project.slug} />
    </div>
  );
}

function FeaturedCard({ project, wide }: { project: Project; wide: boolean }) {
  const reduced = useReducedMotion();
  const hasPointer = useHasPointer();
  const link = projectLink(project);

  // Cursor-follow bubble inside the cover (mouse only)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });
  const [hover, setHover] = useState(false);

  return (
    <motion.article
      className={cn(wide && 'md:col-span-2')}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <CardLink project={project}>
        <motion.div
          className={cn(
            'relative aspect-[16/11] overflow-hidden rounded-card bg-surface ring-1 ring-fg/[0.06]',
            wide && 'md:aspect-[16/7]',
          )}
          variants={
            reduced
              ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
              : {
                  hidden: { clipPath: 'inset(12% 8% 12% 8% round 20px)' },
                  show: { clipPath: 'inset(0% 0% 0% 0% round 20px)', transition: { duration: 1.2, ease: EASE_EXPO } },
                }
          }
          onPointerMove={(e) => {
            if (!hasPointer) return;
            const r = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
          onPointerEnter={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const px = e.clientX - r.left;
            const py = e.clientY - r.top;
            x.jump(px);
            y.jump(py);
            sx.jump(px);
            sy.jump(py);
            setHover(true);
          }}
          onPointerLeave={() => setHover(false)}
        >
          <motion.div
            className="absolute inset-0"
            variants={reduced ? {} : { hidden: { scale: 1.15 }, show: { scale: 1, transition: { duration: 1.5, ease: EASE_EXPO } } }}
          >
            <Cover project={project} />
          </motion.div>

          <AnimatePresence>
            {hasPointer && hover && !reduced && (
              <motion.span
                aria-hidden
                style={{ x: sx, y: sy }}
                className="pointer-events-none absolute left-0 top-0 z-10 -ml-11 -mt-11 grid size-[88px] place-items-center rounded-full bg-accent text-[13px] font-medium text-white shadow-[0_12px_30px_-8px_rgb(var(--accent)/0.8)]"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_QUART }}
              >
                {link ? (link.external ? 'Visit' : 'Read') : 'Soon'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_EXPO, delay: 0.15 } },
          }}
        >
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-[26px] font-semibold leading-tight tracking-[-0.02em]">{project.title}</h3>
              <p className="mt-1 text-[13px] text-fg3">{project.kind}</p>
            </div>
            {link && (
              <span className="mt-1.5 inline-flex shrink-0 items-center gap-1 text-[13px] text-fg2 transition-colors group-hover:text-fg">
                <ArrowUpRight
                  width={15}
                  height={15}
                  className="transition-transform duration-300 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                {link.label}
              </span>
            )}
          </div>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-fg2">{project.description}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-fg/10 px-2.5 py-1 text-[12px] text-fg2">
                {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </CardLink>
    </motion.article>
  );
}

/* ------------------------------------------------------------------------ */

function ProjectIndex({ projects: list }: { projects: Project[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<Project | null>(null);
  const hasPointer = useHasPointer();
  const reduced = useReducedMotion();

  // Floating preview that trails the cursor over the list (mouse only)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  return (
    <div
      className="relative"
      // Jump (not spring) to the entry point, or the preview flies in from the corner
      onPointerEnter={(e) => {
        x.jump(e.clientX);
        y.jump(e.clientY);
        sx.jump(e.clientX);
        sy.jump(e.clientY);
      }}
      onPointerMove={(e) => {
        if (!hasPointer) return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ul>
        {list.map((p) => {
          const isOpen = open === p.slug;
          return (
            <li key={p.slug} className="border-b border-line" onPointerEnter={() => setHovered(p)}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`proj-${p.slug}`}
                onClick={() => setOpen(isOpen ? null : p.slug)}
                className="group grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[4.5rem_1fr_14rem_auto]"
              >
                <span className="font-mono text-[12px] text-fg3">{p.year}</span>
                <span className="font-display text-[22px] font-semibold tracking-[-0.02em] transition-[color,transform] duration-300 ease-out-quart group-hover:translate-x-1 group-hover:text-accent-text sm:text-[28px]">
                  {p.title}
                </span>
                <span className="hidden text-[14px] text-fg3 sm:block">{p.kind}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: EASE_EXPO }}
                  className={cn(
                    'grid size-9 place-items-center rounded-full border transition-colors duration-200',
                    isOpen ? 'border-accent bg-accent text-white' : 'border-fg/10 text-fg2 group-hover:border-fg/25',
                  )}
                >
                  <Plus width={16} height={16} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`proj-${p.slug}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1, transition: { duration: 0.45, ease: EASE_EXPO } }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.25, ease: EASE_QUART } }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 pb-8 sm:grid-cols-[4.5rem_1fr] sm:gap-4">
                      <div className="hidden sm:block" />
                      <div className="grid gap-6 md:grid-cols-[1fr_280px]">
                        <div>
                          <p className="text-[15px] text-fg">{p.tagline}</p>
                          <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-fg2">{p.description}</p>
                          <ul className="mt-4 flex flex-wrap gap-1.5">
                            <li className="rounded-full bg-accent/15 px-2.5 py-1 text-[12px] text-accent-text">
                              {statusLabel[p.status]}
                            </li>
                            {p.stack.map((s) => (
                              <li key={s} className="rounded-full border border-fg/10 px-2.5 py-1 text-[12px] text-fg2">
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* On touch screens the preview lives inline */}
                        <div className="relative aspect-[16/11] overflow-hidden rounded-tile ring-1 ring-fg/[0.06] md:hidden">
                          <ProjectArt kind={p.art ?? 'code'} label={p.slug} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {hasPointer && hovered && !reduced && !open && (
          <motion.div
            aria-hidden
            style={{ x: sx, y: sy }}
            className="pointer-events-none fixed left-0 top-0 z-30 -ml-[140px] -mt-[220px] hidden h-[193px] w-[280px] overflow-hidden rounded-tile shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] ring-1 ring-fg/10 md:block"
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={hovered.slug}
                className="absolute inset-0"
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_QUART }}
              >
                <ProjectArt kind={hovered.art ?? 'code'} label={hovered.slug} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
