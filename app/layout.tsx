import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { site } from '@/data/site';
import { SiteChrome } from '@/components/layout/site-chrome';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import './globals.css';

/* Self-hosted by next/font — no runtime request, no layout shift. */
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['500', '600', '700'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI Engineer & Founder`,
    template: `%s · ${site.name}`,
  },
  description: site.headline,
  keywords: [
    'Kush Ahuja',
    'AI Engineer',
    'CTO',
    'Machine Learning',
    'LLM',
    'RAG',
    'Next.js',
    'Python',
    'Portfolio',
    'SGT University',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — AI Engineer & Founder`,
    description: site.headline,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — AI Engineer & Founder`,
    description: site.headline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: '#09090B',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: 'AI Engineer & CTO',
  email: `mailto:${site.email}`,
  url: site.url,
  worksFor: { '@type': 'Organization', name: 'BYC' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'SGT University' },
  address: { '@type': 'PostalAddress', addressLocality: 'Gurugram', addressCountry: 'IN' },
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.twitter],
  knowsAbout: ['Artificial Intelligence', 'Machine Learning', 'Software Engineering'],
};

/**
 * Applies the saved theme before first paint so light mode never flashes
 * dark on load. Must run synchronously in <head>.
 */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (!t) t = 'dark';
    document.documentElement.classList.remove('light','dark');
    document.documentElement.classList.add(t);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-bg font-sans text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>

        <SiteChrome />

        {/* The bento column: every panel lives inside this width */}
        <div className="mx-auto w-full max-w-[1120px] space-y-3 px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
          <Navbar />
          <main id="main" className="space-y-3">
            {children}
          </main>
          <Footer />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
