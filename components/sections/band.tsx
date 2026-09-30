import { VelocityMarquee } from '@/components/ui/velocity-marquee';

/**
 * Two oversized rows running in opposite directions. Filled white on top,
 * crimson outline underneath. Speed and lean follow your scroll.
 */
export function Band({ top, bottom }: { top: string[]; bottom: string[] }) {
  return (
    // Wider than the viewport so the tilted ribbon never shows its corners
    <section
      aria-hidden
      className="relative left-1/2 my-10 w-[112vw] -translate-x-1/2 -rotate-2 select-none border-y border-line bg-bg py-6 sm:py-8"
    >
      <VelocityMarquee
        items={top}
        baseVelocity={-2.2}
        itemClassName="font-display text-[clamp(2.6rem,7vw,6.5rem)] font-extrabold uppercase leading-none tracking-[-0.04em] text-fg"
      />
      <VelocityMarquee
        items={bottom}
        baseVelocity={2.2}
        className="mt-2"
        itemClassName="font-display text-[clamp(2.6rem,7vw,6.5rem)] font-extrabold uppercase leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_rgb(var(--accent))]"
      />
    </section>
  );
}
