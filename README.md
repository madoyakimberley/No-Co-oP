# No Co-op

> "Precision in Darkness" — a personal discipline and routine-reinforcement system.

No Co-op is a self-built system to enforce new routines, track skill growth (coding + drawing), manage school/curriculum, and stay disciplined without relying on AI-assisted shortcuts. Built to carry through the transition into Zetech University.

## Core Philosophy

The system runs on a learn → apply → test → drill loop, generalized from ranked competitive gaming: learn a concept, apply it immediately, face a real test, take an honest loss, drill the specific weak spot, repeat. Applied here to coding, drawing, and school topics — not just games.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Webpack — see Known Issues)
- **Styling:** Tailwind CSS v4 (`@theme` tokens, no config file)
- **Font:** Playfair Display (serif)
- **Design system:** Obsidian — near-black zinc surfaces, violet (`#a78bfa`) primary accent, emerald (`#34d399`) tertiary, high-contrast text, border-based separation (no heavy shadows)
- **Database:** TiDB Serverless (MySQL-compatible)
- **ORM:** Drizzle ORM (`drizzle-orm/mysql2`)
- **AI:** Gemini API (`gemini-3.5-flash`) — meal suggestions, quiz generation, study resource recommendations, hobby content nudges
- **PWA:** next-pwa (offline caching, installable)

## Features Built So Far

| Page | Route | Status |
|---|---|---|
| Dashboard | `/dashboard` | Live — pulls exercise + skill counts |
| Routine | `/routine` | Live — add/view weekly routine blocks |
| Study Hub | `/study` | Live — subject/grade tracking + AI understanding self-check |
| Exam Drill | `/exam` | Live — Gemini-generated questions on weakest topics, mastery scoring |
| Skill Tracker | `/skills` | Live — logs coding/drawing practice by stage |
| Drawing Progress | `/drawing` | Live — logs art practice sessions |
| Weekly Planner | `/planner` | Live — 7-day grid of routine blocks |
| Meals | `/meals` | Live — Gemini meal suggestions (student-budget, Kenyan ingredients) |
| Pull Me Back | `/pull` | Live — Gemini content nudges (coding/art/gaming) + browser notifications |

## Database Schema

- `routine_blocks` — weekly schedule entries
- `exercise_logs` — workout sets/reps
- `skill_practice` — coding/drawing practice log (learn/apply/test/drill stages)
- `subjects` — school subjects + current grade
- `assessments` — per-subject test/assignment scores
- `meals` — logged meals, flagged if AI-suggested
- `topics` — curriculum topics with a rolling mastery score (0–100)
- `quiz_attempts` — logged answers to self-generated quiz questions

## Setup

```bash
npm install
```

Create `.env.local` with:

DB_PASSWORD="..."

APP_SECRET="..." 

### generate with: openssl rand -hex 32

NEXT_PUBLIC_APP_SECRET="..." # MUST match APP_SECRET exactly
GEMINI_API_KEY="..."

### from ai.google.dev


Copy to `.env` as well (Drizzle Kit CLI doesn't read `.env.local`):
```bash
cp .env.local .env
```

Run migrations:
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

Start dev server:
```bash
npm run dev
```

## Known Issues / Gotchas

- **Tailwind v4, not v3** — this project uses `@import "tailwindcss"` + `@theme` in `globals.css`, no `tailwind.config.ts`. Don't paste v3-style Tailwind setup instructions.
- **SSL handshake with TiDB** — locally may throw `self-signed certificate in certificate chain` due to a network-level cert interceptor (VPN/antivirus). Current workaround: `ssl: { rejectUnauthorized: false }` in `src/db/index.ts` — **this is dev-only and insecure; must be replaced with a proper `NODE_EXTRA_CA_CERTS` fix before any production deploy.**
- **DB connection pool caching** — `src/db/index.ts` caches the pool on `globalThis` to survive hot reloads. If you change SSL/connection settings, a hot reload won't pick it up — you must fully stop and restart `npm run dev`.
- **Gemini model versions deprecate fast** — currently on `gemini-3.5-flash`. Check `https://ai.google.dev/gemini-api/docs/models` if API calls start returning 404.
- **API auth is basic** — a shared `x-api-key` header, not real user auth. Fine for solo use now; replace with proper auth (NextAuth or similar) before any multi-user or public deployment.
- **Alarms are in-app only** — notifications fire while the app is open in a tab. True background/closed-app push notifications need a service worker + push subscription setup (not yet built).
- **PWA icons are placeholders** — `public/icon-192.png` / `icon-512.png` need real branding.

## Not Yet Built

- Stakes/consequence enforcement (phone lock, money-revoked, music-locked mechanics)
- Grade-based weakness targeting tied automatically into the exam drill
- True background push notifications for alarms
- Offline-first local caching (currently online-only for all data)

## Repo

https://github.com/madoyakimberley/No-Co-oP
