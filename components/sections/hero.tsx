'use client';

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { site } from '@/data/site';
import { EASE_EXPO } from '@/lib/motion';
import { useIntroDone } from '@/lib/intro';
import { ArrowRight, Mail } from '@/components/ui/icons';

const letter: Variants = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 1.1, ease: EASE_EXPO } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE_EXPO } },
};

/**
 * Editorial hero after the reference: the name set huge, white over crimson,
 * with the portrait standing on the fold and overlapping the second line.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // Hold the entrance until the intro curtain has lifted
  const ready = useIntroDone();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // The two lines drift apart and the portrait sinks as you scroll away.
  const xTop = useTransform(scrollYProgress, [0, 1], ['0vw', reduced ? '0vw' : '-9vw']);
  const xBottom = useTransform(scrollYProgress, [0, 1], ['0vw', reduced ? '0vw' : '7vw']);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '12%']);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const lines = [
    {
      word: site.firstName.toUpperCase(),
      x: xTop,
      className: 'text-fg',
      // White that cools off to the right, like the reference's "THINK"
      wrap: '[mask-image:linear-gradient(90deg,#000_35%,rgb(0_0_0/0.5))]',
    },
    { word: site.lastName.toUpperCase(), x: xBottom, className: 'text-accent', wrap: 'relative z-20' },
  ];

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden pt-24 sm:pt-28 lg:pt-32"
    >
      {/* Crimson bloom behind the portrait */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-18vmin] right-[8%] hidden size-[80vmin] rounded-full bg-accent/25 blur-[110px] lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
      />

      <motion.div
        className="container relative z-10 flex flex-1 flex-col"
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
      >
        <motion.p variants={rise} className="eyebrow flex items-center gap-2">
          <span className="h-px w-6 bg-accent" />
          AI engineer &amp; founder · {site.location}
        </motion.p>

        <h1 className="mt-5 font-display text-[clamp(4.5rem,25vw,8rem)] font-bold leading-[0.84] tracking-[-0.045em] sm:text-mega">
          <span className="sr-only">
            {site.name}, {site.role.toLowerCase()} in {site.location}
          </span>
          {lines.map((line) => (
            <motion.span
              key={line.word}
              aria-hidden
              style={{ x: line.x }}
              className={`block will-change-transform ${line.wrap}`}
            >
              {/* pr/-mr: negative tracking shrinks the box past the last glyph's ink */}
              <span className="-my-[0.06em] -mr-[0.1em] inline-block overflow-hidden py-[0.06em] pr-[0.1em]">
                {line.word.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    variants={reduced ? rise : letter}
                    className={`inline-block ${line.className}`}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            </motion.span>
          ))}
        </h1>

        {/* Portrait: in flow on phones, standing on the fold on desktop */}
        <motion.div
          style={{ y: portraitY }}
          className="pointer-events-none relative -mt-10 h-[52svh] w-full sm:-mt-16 lg:absolute lg:bottom-0 lg:right-[2%] lg:mt-0 lg:h-[min(86svh,800px)] lg:w-auto lg:aspect-[1000/1379]"
        >
          {/* Phone/tablet bloom sits inside this box so the fade below covers it cleanly */}
          <div
            aria-hidden
            className="absolute left-1/2 top-[20%] size-[70vmin] -translate-x-1/2 rounded-full bg-accent/25 blur-[90px] lg:hidden"
          />
          <motion.div
            className="relative h-full w-full"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 70, scale: 0.97 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 1.4, ease: EASE_EXPO, delay: 0.35 }}
          >
            <Image
              src="/kush/hero-cutout.webp"
              alt="Portrait of Kush Ahuja"
              fill
              priority
              sizes="(min-width: 1024px) 580px, 90vw"
              className="object-contain object-bottom drop-shadow-[0_30px_60px_rgb(0_0_0/0.5)]"
            />
          </motion.div>
          {/* Fade the bottom of the photo into the page on phones */}
          {/* Negative inset reaches past the container gutters so no seam shows */}
          <div className="absolute -inset-x-5 bottom-0 h-3/5 bg-gradient-to-t from-bg via-bg/80 to-transparent sm:-inset-x-8 lg:hidden" />
        </motion.div>

        <motion.div
          style={{ opacity: fade }}
          className="relative z-20 -mt-24 pb-10 sm:-mt-28 lg:mt-10 lg:max-w-[440px] lg:pb-16"
        >
          <motion.p variants={rise} className="text-[19px] leading-relaxed text-fg2 sm:text-xl">
            {site.headline}
          </motion.p>
          <motion.p variants={rise} className="mt-3 text-[14px] text-fg3">
            CTO at BuildYour.Company · Founder of agents-hub
          </motion.p>
          <motion.div variants={rise} className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="btn-primary">
              <Mail width={18} height={18} />
              Email me
            </a>
            <a href="#work" className="btn-ghost group">
              See my work
              <ArrowRight
                width={17}
                height={17}
                className="transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
