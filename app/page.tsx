import { Hero } from '@/components/sections/hero';
import { MoreBuilds, Work } from '@/components/sections/work';
import { Care } from '@/components/sections/care';
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
      <Work />
      <Care />
      <Services />
      <About />
      <MoreBuilds />
      <Writing />
      <Faq />
      <Dock />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
