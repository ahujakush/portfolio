export type NavLink = { label: string; href: string };

export type Social = {
  label: string;
  handle: string;
  href: string;
  icon: 'github' | 'linkedin' | 'instagram' | 'x' | 'mail';
};

export type ProjectStatus = 'live' | 'in-progress' | 'archived';

/** Code-drawn cover used when a project has no live UI to screenshot. */
export type ProjectArt =
  | 'chat'
  | 'voice'
  | 'traffic'
  | 'finance'
  | 'code'
  | 'report'
  | 'dashboard';

export type Project = {
  slug: string;
  title: string;
  /** Short line under the title, e.g. "AI product · Founder". */
  kind: string;
  tagline: string;
  description: string;
  stack: string[];
  year: string;
  status: ProjectStatus;
  /** Real screenshot in /public. Takes priority over `art`. */
  image?: string;
  art?: ProjectArt;
  href?: string;
  /** Slug of a related blog post. */
  post?: string;
  featured?: boolean;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  current?: boolean;
};

export type EducationItem = {
  school: string;
  qualification: string;
  period: string;
  detail?: string;
};

export type Service = {
  title: string;
  body: string;
  chips: string[];
};

export type Faq = { q: string; a: string };

/** One block of a blog post body. Kept as data so posts stay plain TypeScript. */
export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'code'; text: string };

export type Series = 'agents-hub' | 'byc';

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  /** Last meaningful edit, shown as "Updated". Defaults to `date`. */
  updated?: string;
  tag: string;
  series: Series;
  /** Order inside its series. */
  part: number;
  /** Search phrases this post answers. Feeds meta keywords and JSON-LD. */
  keywords: string[];
  /** 2-4 self-contained sentences at the top of the post (answer engines quote these). */
  takeaways: string[];
  body: PostBlock[];
};
