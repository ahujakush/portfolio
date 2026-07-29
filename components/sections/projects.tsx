'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { Panel, PanelHeading } from '@/components/ui/panel';
import { Tag } from '@/components/ui/badge';
import { Stagger, StaggerItem } from '@/components/ui/reveal';

const statusDot = {
  live: 'bg-success',
  'in-progress': 'bg-warning',
  archived: 'bg-fg3',
} as const;

/** Compact project rows: thumbnail, copy, tech tags, open button. */
export function Projects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <Panel id="projects" as="section" className="scroll-mt-24 p-6 sm:p-7">
      <PanelHeading title="Projects" action="View all" href={projects[0]?.repo ?? '#contact'} />

      <Stagger className="mt-6 space-y-3" gap={0.1}>
        {featured.map((project, i) => (
          <StaggerItem key={project.slug}>
            <motion.article
              whileHover={{ y: -3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="tile group flex items-stretch gap-4 p-3 transition-colors duration-500 hover:border-accent/30"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] w-[118px] shrink-0 overflow-hidden rounded-lg border border-fg/[0.06] sm:w-[132px]">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.tagline}`}
                  fill
                  sizes="140px"
                  priority={i === 0}
                  loading={i === 0 ? undefined : 'lazy'}
                  className="object-cover transition-transform ease-premium [transition-duration:800ms] group-hover:scale-110"
                />
              </div>

              {/* Copy */}
              <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-[14.5px] font-semibold">{project.title}</h3>
                  <span
                    aria-label={project.status}
                    className={`size-1.5 shrink-0 rounded-full ${statusDot[project.status]}`}
                  />
                </div>
                <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-fg2">
                  <span className="text-accent">{project.tagline}</span> — {project.description}
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 3).map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Open */}
              <a
                href={project.demo ?? project.repo ?? '#contact'}
                target={project.demo || project.repo ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={`Open ${project.title}`}
                className="my-auto flex size-9 shrink-0 items-center justify-center rounded-lg border border-fg/[0.08] bg-fg/[0.03] text-fg2 transition-all duration-500 ease-premium group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent"
              >
                <ArrowUpRight className="size-4" />
              </a>
            </motion.article>
          </StaggerItem>
        ))}
      </Stagger>
    </Panel>
  );
}
