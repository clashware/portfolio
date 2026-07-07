# Clashware — Company Site

Landing site for [clashware.com](https://clashware.com): Clashware Sàrl (Lausanne, Switzerland) and its products — Metacube, Bonega.ai, Coira.io, WaiverKit.

## Stack

- **Next.js 16** (App Router, React 19, React Compiler enabled, `output: "standalone"`)
- **Tailwind CSS 4** + shadcn/ui primitives
- **next-intl** — locales `en` (default, unprefixed), `fr`, `de`, `it` (`localePrefix: "as-needed"`); messages in `messages/*.json` (keep key parity across all four files)
- **framer-motion** via `LazyMotion` (`m.` components) with a global `MotionConfig reducedMotion="user"`
- **bun** as package manager / runner

## Scripts

```bash
bun install          # install dependencies
bun run dev          # dev server (Turbopack)
bun run build        # production build
bun run start        # serve production build
bun run typecheck    # tsc --noEmit
bun run lint         # eslint (incl. jsx-a11y)
bun run lint:ox      # oxlint
bun run doctor       # react-doctor
```

## Structure

- `app/[locale]/` — pages (home, about, contact, terms, privacy) + layout (metadata, JSON-LD, fonts)
- `app/sitemap.ts`, `app/robots.ts` — generated SEO routes; `public/llms.txt` for AI crawlers
- `lib/seo.ts` — canonical/hreflang/OG metadata + JSON-LD builders
- `lib/i18n/` — next-intl routing/config; `proxy.ts` is the locale middleware
- `components/sections/` — homepage sections; `components/layout/` — navbar/footer/page shell

## Deploy

Docker multi-stage build (see `Dockerfile`): builds with bun, then runs the Next.js **standalone** output (`node server.js`) on port 3000 as a non-root user.

```bash
docker build -t clashware-site .
docker run -p 3000:3000 clashware-site
```
