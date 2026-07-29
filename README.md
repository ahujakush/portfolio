<div align="center">

# Kush Ahuja — Portfolio

A dark, bento-grid personal site that reads like a developer command center rather than a
traditional portfolio.

**Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui · Lucide**

</div>

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serve the build
npm run typecheck    # tsc --noEmit
```

Requires Node 18.18+. The first run downloads Inter, Space Grotesk and JetBrains Mono once and
self-hosts them — no runtime request to Google.

---

## Before you deploy — 4 things to replace

All of it lives in `data/`, so you never touch a component.

| What | Where |
|---|---|
| Social URLs | `data/site.ts` → `site.socials` |
| Live domain | `data/site.ts` → `site.url` (drives canonical, OG tags, sitemap) |
| Resume PDF | drop it at `public/kush-ahuja-resume.pdf` |
| Profile photo | drop a square image at `public/avatar.png` — falls back to a "KA" monogram |

Optional: add `demo` / `repo` URLs to entries in `data/projects.ts` and the project rows link out
automatically instead of pointing at the contact card.

---

## Layout

The page is one column of bento panels inside a 1120px shell:

```
Navbar            sticky, blurs on scroll
Hero              split — copy + identity card, command bar underneath
About             intro + four capability tiles
Experience │ Projects    side by side on large screens
Tech Stack        tabbed, seven categories
Stats             six animated counters
Writing           three post cards
Activity row      CTA · latest commit · GitHub heatmap · currently building
Footer
```

---

## Design tokens

Dark by default, with a working light theme behind the moon toggle. Colours are declared once as
raw RGB channels in `app/globals.css` so Tailwind's opacity modifiers (`bg-accent/10`) still work
and the whole palette can be swapped by toggling one class on `<html>`.

| Purpose | Token | Dark |
|---|---|---|
| Background | `bg-bg` | `#09090B` |
| Surface (panel) | `bg-surface` | `#111113` |
| Card | `bg-card` | `#18181B` |
| Glass | `.glass` | `rgba(255,255,255,0.05)` |
| Border | — | `rgba(255,255,255,0.08)` |
| Divider | `bg-divider` | `#27272A` |
| Primary text | `text-fg` | `#FAFAFA` |
| Secondary text | `text-fg2` | `#A1A1AA` |
| Muted text | `text-fg3` | `#71717A` |
| Accent | `text-accent` | `#4F8CFF` |
| Accent hover | `text-accent-hover` | `#6EA8FF` |
| Success | `text-success` | `#22C55E` |
| Warning | `text-warning` | `#F59E0B` |
| Error | `text-danger` | `#EF4444` |
| Info | `text-info` | `#38BDF8` |

Component classes in `globals.css`: `.panel`, `.tile`, `.glass`, `.sheen` (luminous top hairline),
`.glow-ring` (animated conic border), `.nav-link`, `.hairline`, `.noise`, `.text-accent-gradient`.

Type: **Space Grotesk** headings, **Inter** body, **JetBrains Mono** for labels and code.

---

## Motion

Timings live in `lib/motion.ts` — one easing curve, `cubic-bezier(0.22, 1, 0.36, 1)`, and
durations in the 0.5–0.8s range so the whole site moves like a single object.

| Effect | File |
|---|---|
| Scroll reveal + stagger | `components/ui/reveal.tsx` |
| Magnetic buttons | `components/ui/magnetic.tsx` |
| Mouse parallax | `hooks/use-mouse-parallax.ts` |
| Drifting orbs, grid, dust | `components/effects/background.tsx` |
| Custom cursor + glow | `components/effects/cursor.tsx` |
| Scroll progress bar | `components/effects/scroll-progress.tsx` |
| Timeline draw-on-scroll | `components/sections/experience.tsx` |
| Sliding tab underline | `components/sections/tech-stack.tsx` (`layoutId`) |
| Counters | `components/ui/animated-counter.tsx` |
| Theme icon morph | `components/ui/theme-toggle.tsx` |

Every one checks `prefers-reduced-motion` and degrades to a static state.

---

## Keyboard

| Key | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Toggle the command palette |
| `/` | Open it (when not typing in a field) |
| `↑` `↓` `↵` | Navigate and run |
| `Esc` | Close |
| `Tab` from load | Reveals "Skip to content" |

---

## Structure

```
app/
├── layout.tsx        fonts, metadata, JSON-LD, theme script, bento shell  (server)
├── page.tsx          section order                                        (server)
├── globals.css       tokens + panel/tile/glass utilities
├── not-found.tsx · sitemap.ts · robots.ts · icon.png

components/
├── ui/               panel, button, badge, reveal, magnetic, counter,
│                     dialog, tech-tile, theme-toggle, section-rail
├── effects/          background, cursor, scroll-progress
├── layout/           navbar, footer, command-palette, site-chrome
└── sections/         hero, profile-card, command-bar, about, experience,
                      projects, tech-stack, stats, blog, activity-row

data/    every piece of copy
hooks/   use-mounted · use-media-query · use-scroll-spy · use-mouse-parallax
lib/     utils (cn, seeded PRNG) · motion variants · tone map · command events
types/   shared TypeScript types
```

**Server vs client.** `layout.tsx` and `page.tsx` are server components. Only interactive leaves
carry `'use client'`. The command palette is opened through a tiny event bus
(`lib/command-events.ts`) rather than lifted state, which is what keeps the page tree on the server.

---

## Implementation notes

**No `Math.random()` during render.** The floating dust and the GitHub heatmap look random but
come from a seeded PRNG (`seededRandom` in `lib/utils.ts`), so server and client emit identical
markup and React never throws a hydration mismatch.

**No theme flash.** An inline script in `<head>` applies the saved theme before first paint.

**Placeholder data, clearly marked.** `data/activity.ts` holds the latest-commit and heatmap
values — swap them for the GitHub API when you want live numbers. Everything else is real.

**Tech tiles are tinted monograms**, not vendor logos, so there are no third-party image assets
or licensing questions.

---

## Deploy

```bash
npm i -g vercel
vercel --prod
```

Or push to GitHub and import at [vercel.com/new](https://vercel.com/new) — Next.js is
auto-detected, no configuration needed. Afterwards set `site.url` in `data/site.ts` to your real
domain so canonical URLs, Open Graph tags and `sitemap.xml` point to the right place.

The app is fully static (`next build` prerenders every route), so any Node host or a
`node:20-alpine` container works too.
