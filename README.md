<div align="center">

# Kush Ahuja — Portfolio

Dark, editorial portfolio and build-in-public blog for [thekush.codes](https://www.thekush.codes).

**Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion 13**

</div>

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build, every route prerendered
npm run typecheck    # tsc --noEmit
```

## Where things live

All copy is data. You never need to touch a component to change text.

| What | File |
|---|---|
| Name, email, domain, one-line bio, socials, nav | `data/site.ts` |
| Projects (featured cards + "More builds" list) | `data/projects.ts` |
| Work history, education | `data/experience.ts` |
| Services cards, FAQ | `data/services.ts` |
| Blog posts ("Building agents-hub" series) | `data/posts.ts` |
| Photos | `public/kush/` (hero cut-out, portrait, avatar) |
| Live-site screenshots used as project covers | `public/projects/` |

A project with `image` shows its screenshot. Without one it gets a code-drawn cover from
`components/ui/project-art.tsx` (set `art`).

## Pages

```
/                    Hero · Marquee · Work · Statement · Services · About · Writing · FAQ
/blog                All posts
/blog/[slug]         Post, with reading progress, prev/next and BlogPosting JSON-LD
/blog/rss.xml        RSS feed
/llms.txt            Plain-text summary for AI answer engines, built from the same data
/opengraph-image     Generated share images (home + one per post)
/sitemap.xml · /robots.txt
```

## Design tokens

Palette after [ruchitdesigns.framer.website](https://ruchitdesigns.framer.website/). Dark only.
Declared once as RGB channels in `app/globals.css`, so Tailwind opacity modifiers work.

| Token | Hex | Use |
|---|---|---|
| `bg` | `#141316` | Page |
| `surface` / `raised` | `#1C1B1F` / `#242328` | Cards, hover |
| `fg` / `fg2` / `fg3` | `#F7F7F7` / `#B8B8B8` / `#828282` | Text |
| `accent` | `#EA0044` | Fills and display type (white on it: 4.6:1) |
| `accent-text` | `#FF3D6E` | Small crimson text on dark (5.4:1) |

Type: **Space Grotesk** display, **Geist** body, **Geist Mono** labels, **Instrument Serif** italic
for the one cycling accent word. All self-hosted by `next/font`.

## Motion

Rules from the `design-engineering` skill. Curves live in `lib/motion.ts`: expo out for
entrances, quart out for hovers, in-out for state travel. Only `transform`, `opacity`,
`clip-path` and small blurs are animated.

| Effect | File |
|---|---|
| Letter mask reveal, scroll parallax | `components/sections/hero.tsx` |
| Word-by-word heading reveal | `components/ui/split-heading.tsx` |
| Clip-path card reveal, cursor "Visit" bubble, hover preview list | `components/sections/work.tsx` |
| Scroll-linked word highlight | `components/sections/statement.tsx` |
| Sticky stacking service cards | `components/sections/services.tsx` |
| Cross-blur word cycling | `components/ui/cycle-word.tsx` |
| Morphing menu glyph, pill that grows into the menu | `components/layout/nav.tsx` |
| Letters rising out of the footer edge | `components/layout/wordmark.tsx` |

`prefers-reduced-motion` keeps opacity fades and drops travel, blur, parallax and loops.

## Deploy

Push to GitHub and import in Vercel, or `vercel --prod`. `site.url` in `data/site.ts` must stay
`https://www.thekush.codes`: it drives canonical URLs, Open Graph, the sitemap and `llms.txt`.
