import { posts, projects, workedWith } from '@/data';

/** Strip under the hero: real counts on the left, where I've built on the right. */
export function Marquee() {
  const items = [...workedWith, ...workedWith];

  return (
    <section aria-label="Where I have built" className="border-y border-line bg-bg">
      <div className="container flex flex-col gap-6 py-7 sm:flex-row sm:items-center sm:gap-10">
        <dl className="flex shrink-0 gap-8">
          <div>
            <dt className="eyebrow">Projects</dt>
            <dd className="font-display text-3xl font-bold">{projects.length}</dd>
          </div>
          <div>
            <dt className="eyebrow">Posts</dt>
            <dd className="font-display text-3xl font-bold">{posts.length}</dd>
          </div>
          <div>
            <dt className="eyebrow">Live products</dt>
            <dd className="font-display text-3xl font-bold">3</dd>
          </div>
        </dl>

        <div className="mask-fade-x relative min-w-0 flex-1 overflow-hidden">
          <ul className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
            {items.map((name, i) => (
              <li
                key={i}
                aria-hidden={i >= workedWith.length}
                className="flex items-center gap-10 pr-10 font-display text-[22px] font-medium tracking-[-0.01em] text-fg3"
              >
                {name}
                <span className="text-accent">✳</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
