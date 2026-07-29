/**
 * Content for the four cards in the bottom activity row.
 *
 * `latestCommit` and `heatmap` are static placeholders — swap them for the
 * GitHub REST/GraphQL API when you want live numbers. Everything else is real.
 */

export const latestCommit = {
  message: 'feat: add multi-agent evaluation harness',
  repo: 'byc/platform',
  relativeTime: '2 hours ago',
  monthTotal: 120,
  /** Fills the seven dots under the commit message. */
  weekActivity: [3, 1, 2, 4, 2, 0, 3],
};

export const currentlyBuilding = {
  name: 'BYC Platform',
  description: 'AI workflows that take a company from idea to running team.',
  progress: 79,
  href: '#projects',
};

export const ctaCard = {
  title: ["Let's build", 'something', 'amazing together.'],
  action: 'Get In Touch',
};

/** Seed for the deterministic contribution grid — change it to reshuffle. */
export const heatmapSeed = 20260729;
