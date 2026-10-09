import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site, socials } from '@/data/site';
import { linkGroups } from '@/data/links';
import { socialIcon, ArrowUpRight, Mail } from '@/components/ui/icons';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'Links',
  description: `Every ${site.name} link in one place: agents-hub, BuildYour.Company, writing and socials.`,
  alternates: { canonical: '/links' },
};

function LinkRow({ label, subtext, href, external }: { label: string; subtext?: string; href: string; external?: boolean }) {
  const classes =
    'group flex items-center justify-between gap-4 rounded-tile border border-line bg-surface px-5 py-4 transition-colors duration-200 ease-out-quart hover:border-fg/20 hover:bg-raised';
  const content = (
    <>
      <span className="min-w-0">
        <span className="block truncate text-[15px] font-medium text-fg">{label}</span>
        {subtext ? <span className="block truncate text-sm text-fg3">{subtext}</span> : null}
      </span>
      <ArrowUpRight
        width={18}
        height={18}
        className="shrink-0 text-fg3 transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
      />
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export default function LinksPage() {
  return (
    <div className="container flex min-h-[calc(100svh-var(--nav-h))] flex-col items-center pb-24 pt-36 sm:pt-44">
      <div className="w-full max-w-[460px]">
        <Reveal className="flex flex-col items-center text-center">
          <Image
            src="/kush/avatar.jpg"
            alt={site.name}
            width={88}
            height={88}
            className="rounded-full border border-line object-cover"
            priority
          />
          <h1 className="mt-5 font-display text-2xl font-bold text-fg">{site.name}</h1>
          <p className="mt-1.5 max-w-[32ch] text-[15px] text-fg3">{site.role} · {site.location}</p>

          <div className="mt-6 flex items-center gap-3">
            {socials.map((s) => {
              const Icon = socialIcon[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-fg2 transition-colors duration-200 ease-out-quart hover:border-fg/20 hover:bg-raised hover:text-fg"
                >
                  <Icon width={18} height={18} />
                </a>
              );
            })}
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-fg2 transition-colors duration-200 ease-out-quart hover:border-fg/20 hover:bg-raised hover:text-fg"
            >
              <Mail width={18} height={18} />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 space-y-8">
          {linkGroups.map((group, gi) => (
            <Stagger key={group.heading} delay={0.1 + gi * 0.05}>
              <p className="eyebrow">{group.heading}</p>
              <div className="mt-3 space-y-2.5">
                {group.items.map((item) => (
                  <StaggerItem key={item.label}>
                    <LinkRow {...item} />
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          ))}
        </div>
      </div>
    </div>
  );
}
