# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Start dev server with Turbopack (http://localhost:3000)
bun run build        # Production build
bun run start        # Start production server
bun run lint         # Run ESLint
```

## Deployment

Pushes to `main` trigger GitHub Actions deployment via SSH to the production server. The deployment uses Docker:
- Container name: `clashware-landing-page`
- Port: 3000

## Architecture

This is a simple Next.js 15 landing page for Clashware, a Swiss company. Uses App Router.

**Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion

**Routes:**
- `/` - Homepage with product showcase
- `/about`, `/contact`, `/privacy`, `/terms` - Static pages

**Components:**
- `components/ProductCards.tsx` - Client component (uses Framer Motion for hover animations) displaying product cards that link to external sites
- `components/Footer.tsx` - Shared footer with navigation, legal links, and social icons (lucide-react)

**Styling:**
- `app/globals.css` - Custom Tailwind animations: `animate-wave`, `animate-bounce`, `animate-spin-slow`, `animate-light-reflection`
- Local Geist fonts loaded via `next/font/local`
