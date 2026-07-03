# architbhullar.com

Personal developer workspace site built with Next.js, backed by Supabase, deployed on Vercel.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Animations:** Framer Motion
- **Backend:** Supabase — Postgres (content), Storage (files), Auth (single admin account)
- **Validation:** zod (all admin API routes)
- **Hosting:** Vercel

---

## Local Development

### Prerequisites

- Node.js **v18 or higher** (developed on v24)
- npm
- A Supabase project (see [Supabase Setup](#supabase-setup) below)

### Install

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon / public key>
SUPABASE_SERVICE_ROLE_KEY=<service role key — server-only, never commit or expose>
```

All three come from your Supabase project's **Settings → API** page. There is no static-content
fallback — the site will not build or run without these set.

### Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

---

## Supabase Setup

If starting from a fresh Supabase project (one already exists for this site — this is only needed if
rebuilding from scratch):

1. Run the schema migration: `supabase/migrations/0001_init_schema.sql` against your project's
   Postgres database. Creates all 10 content tables with RLS enabled (public read, writes restricted
   to a single admin email), plus the 4 Storage buckets (`profile`, `projects`, `videos`, `resumes`)
   with matching public-read / admin-write policies. Change the hardcoded `bhullararchit@gmail.com`
   in the migration file if setting this up for a different admin email.
2. Create the admin user: **Authentication → Users → Add user**. Set the email to match what's
   hardcoded in `proxy.ts` and `lib/supabase/server.ts` (`ADMIN_EMAIL` constant in both), set a
   password directly, and make sure **Auto Confirm User** is checked.
3. (Recommended) **Authentication → Sign In / Providers → Email → disable "Allow new users to sign
   up"** — RLS already restricts writes to the one admin email regardless, but this closes the door
   on any account existing at all besides that one.

---

## Deployment (Vercel CI/CD)

This project uses **Vercel's built-in CI/CD** — no GitHub Actions needed.

### How It Works

```
Local changes
  → git add .
  → git commit -m "update"
  → git push origin main
  → GitHub receives the push
  → Vercel detects the push automatically
  → Vercel builds the project
  → Live site updates (usually in 30–60 seconds)
```

Pull requests automatically get **preview deployments** — a unique URL you can share before merging.

### Environment Variables in Vercel

Add the same three variables from `.env.local` in **Settings → Environment Variables**, and:

- **They must be checked for the Production environment specifically**, not only
  Preview/Development. `/projects`, `/skills`, `/experience`, `/contact` are statically prerendered
  at build time, and the build needs `NEXT_PUBLIC_SUPABASE_URL` to do that — missing or
  wrong-scoped env vars fail the build with `Error: supabaseUrl is required.` (this has happened once
  already on this project).
- `SUPABASE_SERVICE_ROLE_KEY` should be added as a **Sensitive** variable — note Vercel won't let a
  Sensitive variable target the Development environment, only Production + Preview.
- **Adding or changing an env var does not itself trigger a rebuild.** Deploy (or redeploy) after
  saving.

### Production Branch must match the branch you actually push to

Vercel's **Settings → Git → Production Branch** is a Vercel-only setting, completely separate from
GitHub's "default branch." If they don't match your actual working branch, every push still builds
successfully but only ever becomes a *preview* deployment — `architbhullar.com` silently never
updates, with no error anywhere to tell you why. This happened once already (Vercel's Production
Branch was `main` while all work was pushed to `master`) and cost a lot of confused debugging before
being traced to a mismatched setting rather than a code or env var problem. This repo's branch is
`main` — keep Vercel's Production Branch set to `main` to match.

---

## Admin Panel

The site has a real login (Supabase Auth, single account) protected admin panel at `/admin` for
updating content without touching code or the Supabase dashboard.

- **URL:** `yourdomain.com/admin`
- **Login:** the one admin email + its password (set directly in Supabase Authentication → Users, or
  via the "Reset Password" action there if you forget it — no email link required)
- Tabs: Profile, Story, Projects, Skills, Experience, Socials & Resume
- Every tab's "Save & Publish" writes straight to Postgres/Storage; the public site reflects changes
  within ~60 seconds (ISR revalidation)

---

## Checking Deployment Logs if Build Fails

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard) → your project
2. Click **Deployments**
3. Click the failed deployment
4. Click **Build Logs** to see the full error output

Common causes:
- `Error: supabaseUrl is required.` → Supabase env vars missing or not scoped to Production, see above
- Missing environment variable → add it in Vercel dashboard and redeploy
- TypeScript error → fix locally, push again
- `npm install` failure → check `package.json` for version conflicts

---

## Project Structure

```
app/                  # Next.js App Router pages
  page.tsx            # / (About view)
  [view]/page.tsx     # /projects, /skills, /experience, /contact
  admin/              # Admin panel (Supabase Auth protected)
    login/            # Email + password sign-in
    set-password/     # Handles Supabase password-reset/invite email links
  api/admin/          # Admin API routes — one per resource, zod-validated

components/
  Workspace.tsx       # Main shell (nav + view switching)
  views/              # One component per view

content/
  stack.ts             # About page's tech-stack table — the one thing still a static file

lib/
  content.ts            # getContent() — reads all Supabase tables, assembles SiteContent
  validation.ts          # zod schemas for every admin API payload
  revalidate.ts           # revalidateAll() — called after every admin write
  compressImage.ts         # client-side image downscale/compress before upload
  supabase/
    public.ts              # anon client, no cookies — used by getContent()
    server.ts               # cookie-aware client + requireAdmin() — used by API routes
    admin.ts                 # service-role client — bypasses RLS
    browser.ts                # browser client — login/set-password pages
    middleware.ts               # session helper used by proxy.ts

types/
  index.ts              # All shared TypeScript types

supabase/
  migrations/            # SQL schema + RLS + storage bucket definitions

proxy.ts              # Supabase-session-based auth guard for /admin/* and /api/admin/*
```
