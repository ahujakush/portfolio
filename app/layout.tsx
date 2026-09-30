import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, EB_Garamond, Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { site, socials } from '@/data/site';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { Preloader, introScript } from '@/components/effects/preloader';
import { Cursor } from '@/components/effects/cursor';
import './globals.css';

/* Self-hosted by next/font: no runtime request to Google, no layout shift. */
/* Same face as the agents-hub hero h1. Variable: optical size follows the font size. */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'wdth'],
});
/* Paragraph text. Headings stay in Bricolage. */
const garamond = EB_Garamond({ subsets: ['latin'], variable: '--font-garamond', display: 'swap' });
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
const serif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: '400',
  style: 'italic',
});

const title = `${site.name} · AI Engineer building AI agents (agents-hub)`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: `${site.oneLiner} ${site.headline}`,
  keywords: [
    'Kush Ahuja',
    'AI engineer',
    'AI agents',
    'AI agent developer',
    'personal AI assistant',
    'AI agents for Gmail',
    'AI assistant in Telegram',
    'agents-hub',
    'BuildYour.Company',
    'AI startup diagnosis',
    'Gurugram',
    'India',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title,
    description: site.oneLiner,
  },
  twitter: { card: 'summary_large_image', title, description: site.oneLiner },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: '/', types: { 'application/rss+xml': '/blog/rss.xml' } },
  // Set these in Vercel once you add the site in Google Search Console / Bing Webmaster Tools
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#141316',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/**
 * One connected graph so search engines and AI answers see the same entity
 * everywhere: the person, his two products, and the site that describes them.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      givenName: site.firstName,
      familyName: site.lastName,
      url: site.url,
      image: `${site.url}/kush/portrait.jpg`,
      email: `mailto:${site.email}`,
      jobTitle: 'AI Engineer',
      description: site.oneLiner,
      worksFor: { '@id': 'https://buildyour.company/#org' },
      founder: { '@id': 'https://agentshub.thekush.codes/#app' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'SGT University' },
      address: { '@type': 'PostalAddress', addressLocality: 'Gurugram', addressRegion: 'Haryana', addressCountry: 'IN' },
      nationality: 'Indian',
      sameAs: [...socials.map((s) => s.href), 'https://agentshub.thekush.codes'],
      knowsAbout: [
        'AI agents',
        'Multi-agent systems',
        'Large language models',
        'Voice AI',
        'Retrieval-augmented generation',
        'TypeScript',
        'Python',
        'Next.js',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://agentshub.thekush.codes/#app',
      name: 'agents-hub',
      url: 'https://agentshub.thekush.codes',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Telegram, Android, iOS, Web',
      description:
        'A team of AI agents for Gmail, Google Calendar, Google Tasks, documents and maps that you use in Telegram or a mobile app.',
      creator: { '@id': `${site.url}/#person` },
      offers: { '@type': 'Offer', price: '99', priceCurrency: 'INR', description: 'From ₹99 per agent for 30 days' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://buildyour.company/#org',
      name: 'BuildYour.Company',
      url: 'https://buildyour.company',
      description: 'AI startup diagnosis and 30-day Startup Maps for early-stage founders.',
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: 'en',
      publisher: { '@id': `${site.url}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${site.url}/#profile`,
      url: site.url,
      name: `${site.name}, AI engineer`,
      isPartOf: { '@id': `${site.url}/#website` },
      mainEntity: { '@id': `${site.url}/#person` },
      dateModified: '2026-09-30',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${geist.variable} ${mono.variable} ${serif.variable} ${garamond.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Decides before first paint whether the intro plays; see components/effects/preloader.tsx */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <Preloader />
        <Cursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
