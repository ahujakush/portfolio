'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { site, socialLinks } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/ui/magnetic';
import { ProfileCard } from '@/components/sections/profile-card';
import { CommandBar } from '@/components/sections/command-bar';
import { SectionRail } from '@/components/ui/section-rail';
import { fadeUp, stagger } from '@/lib/motion';

/** Split hero inside the top bento panel, with the command bar underneath. */
export function Hero() {
  return (
    <section id="top" className="panel sheen relative overflow-hidden">
      {/* Ambient blue bloom, bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 size-[520px] animate-orb-drift rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgb(79 140 255 / 0.22), transparent 70%)' }}
      />
      <div aria-hidden className="noise pointer-events-none absolute inset-0 opacity-[0.14]" />

      <SectionRail />

      <div className="relative px-6 pb-6 pt-12 sm:px-10 sm:pb-8 sm:pt-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger(0.09, 0.1)}
          className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12"
        >
          {/* ------------- Copy ------------- */}
          <div>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-fg/[0.08] bg-fg/[0.04] py-1.5 pl-2.5 pr-3.5 text-[12px] text-fg2"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              {site.badge}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-[2.75rem] font-bold leading-[1.05] tracking-tightest sm:text-6xl"
            >
              Hi, I&apos;m <span className="text-accent-gradient">Kush</span>
              <br />
              Ahuja
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-fg2"
            >
              {site.headline}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={9}>
                <Button asChild variant="solid">
                  <a href="#projects">
                    View Projects
                    <ArrowUpRight />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={9}>
                <Button asChild variant="tile">
                  <a href={site.resume} download>
                    Download Resume
                    <Download />
                  </a>
                </Button>
              </Magnetic>
            </motion.div>

            <motion.ul variants={fadeUp} className="mt-7 flex items-center gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Magnetic strength={6}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="tile flex size-10 items-center justify-center text-fg2 transition-all duration-500 ease-premium hover:border-accent/35 hover:bg-accent/[0.08] hover:text-fg"
                    >
                      <Icon className="size-[17px]" />
                    </a>
                  </Magnetic>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ------------- Profile card ------------- */}
          <div className="lg:pl-4">
            <ProfileCard />
          </div>
        </motion.div>

        {/* Command bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <CommandBar />
        </motion.div>
      </div>
    </section>
  );
}
