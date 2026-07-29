import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { TechStack } from '@/components/sections/tech-stack';
import { Stats } from '@/components/sections/stats';
import { Blog } from '@/components/sections/blog';
import { ActivityRow } from '@/components/sections/activity-row';

/**
 * Server component. Sections decide for themselves whether they need a
 * client boundary, so only interactive parts ship JavaScript.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />

      {/* Experience and Projects sit side by side on large screens */}
      <div className="grid gap-3 lg:grid-cols-2">
        <Experience />
        <Projects />
      </div>

      <TechStack />
      <Stats />
      <Blog />
      <ActivityRow />
    </>
  );
}
