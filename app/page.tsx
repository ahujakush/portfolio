import { Hero } from '@/components/sections/hero';
import { Marquee } from '@/components/sections/marquee';
import { MoreBuilds, Work } from '@/components/sections/work';
import { Care } from '@/components/sections/care';
import { Band } from '@/components/sections/band';
import { Services } from '@/components/sections/services';
import { About } from '@/components/sections/about';
import { Writing } from '@/components/sections/writing';
import { Faq } from '@/components/sections/faq';
import { Dock } from '@/components/layout/dock';
import { faqs } from '@/data/services';

/** FAQ as structured data, so search and AI answers can quote it directly. */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <Band
        top={['AI agents', 'Full-stack', 'Mobile apps', 'Backend']}
        bottom={['Ship', 'Measure', 'Fix', 'Repeat']}
      />
      <Care />
      <Services />
      <Band
        top={['Build in public', 'agents-hub', 'BuildYour.Company']}
        bottom={['Gurugram', 'India', 'Available for work']}
      />
      <About />
      <MoreBuilds />
      <Writing />
      <Faq />
      <Dock />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
