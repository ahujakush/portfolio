import Link from 'next/link';
import { navLinks, site, socials } from '@/data/site';
import { CycleWord } from '@/components/ui/cycle-word';
import { Reveal } from '@/components/ui/reveal';
import { ArrowUpRight } from '@/components/ui/icons';
import { Wordmark } from '@/components/layout/wordmark';

/** Contact block + site footer, on every page. */
export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line pt-24 sm:pt-32">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-5 max-w-[16ch] text-huge font-bold">
            Let&apos;s{' '}
            <CycleWord
              words={['build', 'ship', 'design', 'launch']}
              className="font-serif font-normal italic tracking-[-0.02em] text-accent"
            />
            <br />
            something that works.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid gap-10 border-b border-line pb-14 sm:grid-cols-3">
          <div>
            <p className="eyebrow">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-3 inline-flex items-center gap-2 text-lg text-fg transition-colors hover:text-accent-text"
            >
              {site.email}
              <ArrowUpRight
                width={18}
                height={18}
                className="transition-transform duration-300 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
          <div>
            <p className="eyebrow">Based in</p>
            <p className="mt-3 text-lg">{site.location}</p>
            <p className="text-sm text-fg3">IST, UTC+5:30</p>
          </div>
          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="text-lg text-fg2 transition-colors hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 py-8 text-sm text-fg3 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            © {new Date().getFullYear()} {site.name}. {site.availability}.
          </p>
        </div>
      </div>

      <Wordmark text="KUSH AHUJA" />
    </footer>
  );
}
