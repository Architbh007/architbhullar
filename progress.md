# progress.md

## Status: Backend migrated from Vercel Blob to Supabase, admin login working locally.
## BLOCKED: production deployment on Vercel is currently failing to build — see "Active blocker" below.

---

## What's built

### Site

- [x] Workspace layout — 40px nav bar, URL-based view switching, no scroll
- [x] `~/archit > {view}` terminal breadcrumb with animated transitions
- [x] 5 views: About, Projects, Skills, Experience, Contact
- [x] **About** — whoami block (photo, name, title, WAM, links), About me paragraphs, Tech Stack table, Story timeline
- [x] **Projects** — `> ls projects` table list → click for full case study (Problem, Architecture, Challenges, Stack, Learnings, Impact, Future)
- [x] **Skills** — category banners + pill chips, no project references
- [x] **Experience** — story-style timeline with type labels (edu/work/award)
- [x] **Contact** — email + copy button, GitHub, LinkedIn, Resume links, Cal.com booking, availability blurb (all editable now — see below)
- [x] Mobile responsive — hamburger menu, compact layout
- [x] URL routing — `/projects`, `/skills`, `/experience`, `/contact` all resolve correctly, browser back/forward works
- [x] WAM (79.65 → 85 target) displayed on About under university

### Backend (Supabase)

- [x] 10 Postgres tables, RLS enabled on all — public read, writes restricted to the admin's email
- [x] 4 Storage buckets (`profile`, `projects`, `videos`, `resumes`), public-read / admin-write
- [x] Supabase Auth — single account (`bhullararchit@gmail.com`), public signup disabled
- [x] `getContent()` rewritten to query Postgres directly (cookie-free client, keeps ISR intact)
- [x] All existing content migrated from the old `content/*.ts` files — verified row counts match
- [x] Profile photo migrated from `public/images/profile.jpg` (static file) into Supabase Storage

### Admin

- [x] `/admin/login` — email + password against Supabase Auth (was: single shared password)
- [x] `/admin/set-password` — handles Supabase's invite/recovery email link
- [x] `/admin` — full content editor: Profile, Story, Projects, Skills, Experience, Socials & Resume tabs
- [x] `proxy.ts` — Supabase-session-based protection for `/admin/*` and `/api/admin/*`, plus every
      admin route independently re-checks auth (not relying on proxy alone)
- [x] 9 admin API routes, each zod-validated: `profile`, `timeline`, `experience`, `skills`,
      `projects`, `social-links`, `contact-information`, `resume` (upload), `upload` (generic)
- [x] Per-tab "Save & Publish" — each tab now PUTs to its own resource endpoint instead of one big blob
- [x] Toast notifications (replaced the old inline status line)
- [x] Client-side image compression before upload
- [x] Profile photo upload field added to admin (previously had to be swapped manually on disk)
- [x] Contact page copy (availability blurb, extra blurb, response note, Cal.com link) — previously
      hardcoded in `ContactView.tsx`, now editable from the Socials & Resume tab
- [x] Resume upload always replaces the single active file (no duplicate resumes ever pile up in storage)
- [x] **Admin login verified working locally** — signed in successfully at `localhost:3000/admin/login`
      with `bhullararchit@gmail.com`. (Getting here took two failed Supabase email-link attempts and
      a hit rate limit; password was ultimately set directly via the Supabase admin API, chosen and
      given by the user, verified by an immediate sign-in check in the same step before confirming.)

### Infrastructure

- [x] `lib/content.ts` — `getContent()`, Supabase-backed, no fallback (Supabase is now the only backend)
- [x] `lib/supabase/{public,server,admin,browser,middleware}.ts` — the 5 Supabase client variants and why each exists
- [x] `lib/validation.ts` — zod schemas for every admin write
- [x] `SiteContent` type — extended with `contactInformation`
- [x] All views accept content as props (no direct imports from content files in components)
- [x] ISR with 60s revalidation on all routes — confirmed still static/prerendered after the migration
- [x] `supabase/migrations/0001_init_schema.sql` — schema + RLS + storage bucket definitions
- [x] `scripts/migrate-to-supabase.ts` — one-off content migration, already run against production
- [x] `@vercel/blob` dependency removed
- [x] `CLAUDE.md` — updated for the new architecture

---

## Active blocker: production build failing on Vercel

`architbhullar.com` is currently still serving the **old**, pre-migration build (old password-only
login page, old unauthenticated `/api/admin/content` route) — not because old code is deliberately
still live, but because **every deployment attempt of the new code has failed to build**, and Vercel
falls back to serving the last successful (old) deployment instead of taking the site down.

Confirmed via the build log for commit `03e5831`:

```
Error occurred prerendering page "/projects".
Error: supabaseUrl is required.
Export encountered an error on /[view]/page: /projects, exiting the build.
```

**Root cause:** `NEXT_PUBLIC_SUPABASE_URL` was not available in the build environment when this ran.
`getContent()` needs it at build time because `/projects`, `/skills`, `/experience`, `/contact` are
statically prerendered (SSG, per `generateStaticParams` in `app/[view]/page.tsx`).

**What we know:** the user has since added the Supabase env vars in the Vercel dashboard. Not yet
confirmed:
1. Whether `NEXT_PUBLIC_SUPABASE_URL` (exact name, no typo/whitespace) is checked for the
   **Production** environment specifically, not only Preview/Development.
2. Whether a fresh deployment has actually been triggered *after* saving the env vars — adding an
   env var alone does not rebuild anything.

**Next step:** verify env var scope in Vercel, then trigger a redeploy and confirm the build log shows
no `supabaseUrl is required` error and the deployed login page has an Email field (a quick way to
visually confirm the new code is actually live, vs. the stale fallback).

---

## Pending

- [ ] Resolve the Vercel build failure above — this is what's actually blocking production.
- [ ] Once production is live: verify `architbhullar.com/admin/login` shows the Email+Password form
      (not the old password-only one) and that login works there too, not just locally.
- [ ] Old `content/profile.ts`, `story.ts`, `projects.ts`, `skills.ts`, `experience.ts`, `socials.ts`
      are now dead code (nothing imports them except the already-run migration script) — left in
      place pending an explicit go-ahead to delete them.
- [ ] `scripts/migrate-to-supabase.ts` is similarly done-its-job — fine to delete once the dead
      `content/*.ts` files above go, since it depends on them.
- [ ] `README.md` still describes the old Vercel Blob deployment steps — not yet updated.
- [ ] Add real resume PDF via the new admin resume-upload feature (no `public/resume.pdf` ever existed).

---

## Known gaps / future improvements

- [ ] Architecture-diagram and multiple-screenshots support exist at the schema level
      (`project_media.kind` supports `'architecture'` / `'screenshot'`) but there's no admin UI or
      public rendering for them yet — only `cover` (banner) and one `video` are wired up end-to-end.
      Deferred to keep the public site's output unchanged in this pass.
- [ ] Project media reorder/replace is minimal (banner/video are just overwritten in place) — no
      drag-and-drop manager yet.
- [ ] Stack snapshot (`content/stack.ts`) not editable in admin — edit the TS file directly for now
- [ ] No project reordering in admin (drag-and-drop) — reorder via JSON array order in the editor
- [ ] `/admin` login has no rate limiting beyond Supabase Auth's own defaults
- [ ] Project detail doesn't have a URL (`/projects/evat`) — sub-view state only

---

## Content update workflow (post-deploy)

**For text changes (bio, story, projects, skills, experience, contact copy):**
1. Go to `architbhullar.com/admin`
2. Log in with your Supabase account (`bhullararchit@gmail.com`)
3. Edit the relevant tab
4. Click "Save & Publish" — live within ~60 seconds

**For adding a new project:**
1. Admin panel → Projects tab → "+ Add project"
2. Fill in all fields, upload a banner/video if wanted
3. Save

**For replacing your resume:**
1. Admin panel → Socials & Resume tab → "Upload new PDF"
2. Live immediately — no separate Save step needed for the file itself

**For code/design changes that go beyond content:**
1. Edit the relevant component or style files
2. `git push` → Vercel auto-redeploys (~1 min)
