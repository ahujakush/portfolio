import { notes } from './notes';
import { orderedPosts } from './posts';
import { projects } from './projects';

export type LinkItem = {
  label: string;
  subtext?: string;
  href: string;
  /** External links get an outbound arrow; internal ones don't. */
  external?: boolean;
};

export type LinkGroup = {
  heading: string;
  items: LinkItem[];
};

const agentsHub = projects.find((p) => p.slug === 'agents-hub')!;
const byc = projects.find((p) => p.slug === 'buildyour-company')!;
const latestPost = orderedPosts()[0];

/** Content for the /links "link in bio" page. Edit here, not in the component. */
export const linkGroups: LinkGroup[] = [
  {
    heading: 'Featured',
    items: [
      { label: agentsHub.title, subtext: agentsHub.tagline, href: agentsHub.href!, external: true },
      { label: byc.title, subtext: byc.tagline, href: byc.href!, external: true },
    ],
  },
  {
    heading: 'Read',
    items: [
      { label: 'The daily AI brief', subtext: 'Today’s AI news, research and releases', href: '/news' },
      { label: 'Notes', subtext: `${notes.length} short essays, one idea each`, href: '/notes' },
      { label: latestPost.title, subtext: 'From the blog', href: `/blog/${latestPost.slug}` },
    ],
  },
  {
    heading: 'More',
    items: [
      { label: 'Full portfolio', subtext: 'Every project, the long version', href: '/' },
      { label: 'Work with me', subtext: 'Freelance and full-time AI work', href: '/#contact' },
    ],
  },
];
