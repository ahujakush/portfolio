'use client';

import { ArrowUp, Heart } from 'lucide-react';
import { site, socialLinks } from '@/data/site';
import { Magnetic } from '@/components/ui/magnetic';

export function Footer() {
  return (
    <footer className="panel sheen flex flex-col items-center gap-4 px-5 py-4 md:flex-row md:justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="font-display text-[15px] font-bold tracking-tight">
          <span className="text-fg">K</span>
          <span className="text-accent">A</span>
        </span>
        <span className="text-[12px] text-fg3">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
      </div>

      {/* Middle */}
      <p className="flex items-center gap-1.5 text-[12px] text-fg3">
        Built with
        <Heart className="size-3.5 fill-danger text-danger" aria-label="love" />
        using Next.js &amp; Tailwind CSS
      </p>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-8 items-center justify-center rounded-lg text-fg3 transition-all duration-500 ease-premium hover:bg-fg/[0.06] hover:text-fg"
          >
            <Icon className="size-4" />
          </a>
        ))}

        <Magnetic strength={6}>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="ml-1 flex size-8 items-center justify-center rounded-lg border border-fg/[0.08] bg-fg/[0.04] text-fg2 transition-all duration-500 ease-premium hover:border-accent/40 hover:text-accent"
          >
            <ArrowUp className="size-4" />
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}
