@AGENTS.md

# archit-website

Personal developer workspace site for Archit Bhullar, hosted at architbhullar.com on Vercel.

## Stack

- **Next.js 16.2.9** (App Router, Turbopack) — uses `proxy.ts` not `middleware.ts`
- **React 19** with `'use client'` for all interactive components
- **Tailwind CSS v4** — uses `@import "tailwindcss"` + `@theme inline {}`, no `tailwind.config.ts`
- **Framer Motion v12** — `motion`, `AnimatePresence`
- **Supabase** — PostgreSQL (content), Storage (files), Auth (single admin account)
- **zod** — request validation on all admin API routes
- **lucide-react v1.22.0** — brand icons (GitHub, LinkedIn) removed; custom SVGs in `components/ui/Icons.tsx`
- **Geist Sans + Geist Mono** via `next/font/google`

## Architecture

### Content layer

All editable content lives in Supabase Postgres. `lib/content.ts`'s `getContent()` is the single
read path — it queries every table via a plain (cookie-free) anon-key Supabase client and assembles
the `SiteContent` shape consumed by every page. It's called directly from server components
(`app/page.tsx`, `app/[view]/page.tsx`), never over HTTP, so the browser never talks to Postgres.

Cookie-free is deliberate: calling `cookies()` would force those routes into dynamic rendering and
break the `revalidate = 60` ISR setup. `lib/supabase/public.ts` provides that client.

```
lib/
  content.ts           ← getContent() — reads all tables, maps snake_case rows to camelCase types
  validation.ts         ← zod schemas for every admin API payload
  revalidate.ts          ← revalidateAll() — called after every admin write
  compressImage.ts       ← client-side canvas downscale/re-encode before image upload
  supabase/
    public.ts            ← anon client, no cookies — used by getContent() (server components)
    server.ts             ← cookie-aware client + requireAdmin() — used by /api/admin/* route handlers
    admin.ts               ← service-role client — bypasses RLS, used only after requireAdmin() passes
    browser.ts              ← browser client — login/set-password pages
    middleware.ts            ← session helper used by proxy.ts

types/
  index.ts              ← all shared types including SiteContent
```

**Tables** (10, all RLS-enabled — public read, writes restricted to the admin's email via
`auth.jwt() ->> 'email'`): `profile`, `timeline_entries`, `experience_items`, `skill_categories`,
`skills`, `projects`, `project_media`, `social_links`, `resume`, `contact_information`.

`content/stack.ts` (About page's tech-stack table) is the one piece of content still a static file —
it isn't editable in the admin panel, so there was no reason to move it to Postgres.

**Storage buckets** (all public-read, admin-write-only): `profile`, `projects`, `videos`, `resumes`.
Every upload goes through `POST /api/admin/upload` (generic) or `POST /api/admin/resume` (resume —
always overwrites the same storage path, so there's never more than one active file), both of which
return a public URL that gets stored in Postgres. No binary ever touches Postgres directly.

`projects.banner` / `projects.video` (as consumed by the frontend `Project` type) are derived at read
time from `project_media` rows with `kind='cover'` / `kind='video'` — there's no `banner`/`video`
column on the `projects` table itself.

The schema migration lives at `supabase/migrations/0001_init_schema.sql`. The one-off script that
populated it from the old `content/*.ts` files is `scripts/migrate-to-supabase.ts` (already run once
against production — kept for reference, not meant to be re-run).

### View routing

Single-page workspace with URL-based view switching. No scroll — content switches.

- `/` → About
- `/projects` → Projects list (click → project detail, no URL change)
- `/skills` → Skills
- `/experience` → Experience
- `/contact` → Contact

`app/page.tsx` and `app/[view]/page.tsx` are async server components that call `getContent()` and pass content as props to `<Workspace content={content} />`.

`Workspace.tsx` reads `usePathname()` to derive the active view. `router.push()` on nav click updates the URL. `AnimatePresence mode="wait"` handles view transitions.

### Admin panel

- Route: `/admin` — only accessible to the one Supabase Auth account (`bhullararchit@gmail.com`,
  public signup disabled)
- Auth: `proxy.ts` checks the Supabase session cookie (via `@supabase/ssr`) on every `/admin/*` and
  `/api/admin/*` request; no valid session for that email → redirected to `/admin/login`. Every
  `/api/admin/*` route handler *also* independently calls `requireAdmin()` — proxy coverage alone
  isn't trusted (see the file-convention docs' own warning about relying on proxy alone).
- Login: `/admin/login` (email + password) → `POST /api/admin/login` → Supabase session cookie.
  Forgotten password: use Supabase's password-reset email flow, which lands on
  `/admin/set-password`.
- Content editor: `/admin` has tabs for Profile, Story, Projects, Skills, Experience, Socials & Resume
  (the last one also covers the previously-hardcoded contact-page copy).
- Save: each tab's "Save & Publish" PUTs to its own resource endpoint (`/api/admin/profile`,
  `/api/admin/timeline`, `/api/admin/projects`, etc.) rather than one big blob — see the table below.
  Every write revalidates all public routes via `revalidateAll()`.
- File uploads (images, project media) commit immediately on file-picker change, same as before;
  images get client-side compressed first.

| Tab | Endpoint(s) | DB write strategy |
|---|---|---|
| Profile | `PUT /api/admin/profile` | upsert singleton |
| Story | `PUT /api/admin/timeline` | full replace (no stable id in the admin UI's local state) |
| Experience | `PUT /api/admin/experience` | full replace |
| Skills | `PUT /api/admin/skills` | full replace (categories cascade-delete skills) |
| Projects | `PUT /api/admin/projects` | upsert + delete diff by `id` (slug); banner/video synced to `project_media` |
| Socials & Resume | `PUT /api/admin/social-links` + `PUT /api/admin/contact-information` | upsert singletons |
| (resume file) | `POST /api/admin/resume` | commits immediately, not gated behind Save |

## Running locally

```bash
npm install
npm run dev
```

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key — server-only, never expose>
```

All three are required — there is no longer a static-content fallback; `getContent()` will error
without them.

## Deploying to Vercel

1. Connect GitHub repo to Vercel
2. Set the three env vars above in the Vercel dashboard — **must be checked for the Production
   environment specifically**, not just Preview/Development, since `/projects`, `/skills`,
   `/experience`, `/contact` are statically prerendered (SSG) and `getContent()` needs
   `NEXT_PUBLIC_SUPABASE_URL` at build time. Missing/wrong-scoped env vars fail the build with
   `Error: supabaseUrl is required.` while prerendering `/projects` — this exact failure has
   happened once already.
3. Adding/changing an env var does **not** itself trigger a rebuild — deploy (or redeploy) after
   saving them.
4. Deploy, then check the build log for the `supabaseUrl is required` error specifically if the
   build fails — that error means the env vars weren't actually visible to this particular build.

Existing content is already live in Supabase — nothing to seed post-deploy.

## Key conventions

- **No comments in code** unless the WHY is non-obvious
- **`'use client'`** required on any component using hooks or browser APIs
- **Tailwind v4**: arbitrary values like `bg-[#0d0d10]`, zinc scale for text, violet-400 for accent
- **Icons**: use `GitHubIcon` / `LinkedInIcon` from `components/ui/Icons.tsx` — lucide-react v1.22 removed brand icons
- **Colors**: `#0d0d10` background, `text-zinc-200` primary, `text-zinc-500` secondary, `text-violet-400` accent
- **Font**: 14px base, `font-mono` only for terminal labels/prompts
- **Admin API routes**: every mutation route validates its payload with a `zod` schema from
  `lib/validation.ts` and calls `requireAdmin()` before touching data — follow that pattern for any
  new admin endpoint.
