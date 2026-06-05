# Student Learning Dashboard

A production-grade student learning dashboard built with Next.js 15, Supabase, Tailwind CSS, and Framer Motion.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Icons | Lucide React |
| Fonts | Geist (Vercel) |
| Deployment | Vercel |

## Folder Structure

```
app/
  layout.tsx        # Root layout, font setup
  page.tsx          # Server component, fetches courses via Suspense
  loading.tsx       # Skeleton loader matching final card sizes
  error.tsx         # Error boundary with retry
  globals.css

components/
  Sidebar.tsx       # Collapsible nav with layoutId active indicator
  HeroTile.tsx      # Greeting + streak UI
  CourseCard.tsx    # Dynamic card with animated progress bar
  ActivityTile.tsx  # GitHub-style contribution grid
  BentoGrid.tsx     # Stagger orchestrator, grid layout

lib/
  supabase.ts       # Supabase client + getCourses() helper

types/
  course.ts         # Course interface

supabase/
  seed.sql          # Table definition + RLS policy + seed rows
```

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Open the SQL editor and run the contents of `supabase/seed.sql`
3. Copy your project URL and anon key from **Settings → API**

## Environment Variables

```bash
cp .env.example .env.local
```

Fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Never commit `.env.local`. The `.env.example` file is safe to commit and shows reviewers which variables are required.

## Server Component Architecture

Data fetching happens exclusively in `app/page.tsx` via an async Server Component (`DashboardContent`). The `getCourses()` helper in `lib/supabase.ts` runs on the server — no API routes, no `useEffect`, no client-side fetching.

`<Suspense>` wraps `DashboardContent` so the shell (sidebar, header) renders immediately while the database query resolves. The `loading.tsx` skeleton matches the final grid dimensions to prevent layout shift when data arrives.

## Animation Strategy

- **Stagger**: `BentoGrid` uses Framer Motion `variants` with `staggerChildren: 0.1` so tiles appear sequentially rather than all at once.
- **Entrance**: Each tile fades in and translates from `y: 16` to `y: 0` using a spring (`stiffness: 280, damping: 24`).
- **Hover**: Cards scale to `1.02` with `type: "spring", stiffness: 300, damping: 20` — no `width`, `height`, or `margin` changes.
- **Progress bar**: Animates from `0%` to the database value using a lazy spring (`stiffness: 60`) with a 300ms delay so it fires after the card entrance.
- **Sidebar**: Active item highlight uses `layoutId="sidebar-active"` for smooth positional transitions between nav items.

All animations use only `transform` and `opacity` — no layout-triggering properties.

## Performance Optimizations

- Server-side data fetching eliminates client waterfalls
- `will-change` avoided; Framer Motion handles compositing via `transform`
- Skeleton heights match real content — no cumulative layout shift
- Fonts loaded via `next/font` (zero FOUT)
- Images: none (icon-based UI, no CLS risk)

## Deployment

```bash
# Install
npm install

# Development
npm run dev

# Production build
npm run build
npm start
```

**Vercel:**
1. Push to GitHub
2. Import repo on vercel.com
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in project Settings → Environment Variables
4. Deploy
