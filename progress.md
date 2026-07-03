# progress.md

## Status: Migration complete. Verified end-to-end in production — content, auth, uploads, deploys.

---

## What's built

### Site

- [x] Workspace layout — 40px nav bar, URL-based view switching, no scroll
- [x] `~/archit > {view}` terminal breadcrumb with animated transitions
- [x] 5 views: About, Projects, Skills, Experience, Contact
- [x] **About** — whoami block (photo, name, title, WAM, links), About me paragraphs, Tech Stack table, Story timeline
- [x] **Projects** — card grid (was a plain list): banner hover-zoom, gradient overlay, status dot, tech-stack pills → click for full case study (Problem, Architecture, Challenges, Stack, Learnings, Impact, Future)
- [x] **Skills** — category banners + pill chips, no project references
- [x] **Experience** — story-style timeline with type labels (edu/work/award)
- [x] **Contact** — email + copy button, GitHub, LinkedIn, Resume links, Cal.com booking (glow-accented card), availability blurb (all editable now — see below)
- [x] Mobile responsive — hamburger menu, compact layout
- [x] URL routing — `/projects`, `/skills`, `/experience`, `/contact` all resolve correctly, browser back/forward works
- [x] WAM (79.65 → 85 target) displayed on About under university
- [x] Visual polish pass: staggered fade-in on every section (using previously-built but unused
      `AnimatedSection`/`lib/animations.ts`), animated sliding underline on the active nav tab, subtle
      grain texture over the whole public site, soft violet glow behind the profile photo and the
      Book-a-call card, bigger name typography on About, animated link underlines, skeleton loading
      state in admin (was plain "Loading content..." text) — verified visually via Playwright
      screenshots across all 5 public views, zero console errors
- [x] Experience given the same card treatment Projects has (border + subtle background per entry,
      timeline connector line kept). Skills got the same treatment briefly, but the user asked for it
      to be removed from Skills specifically — reverted back to its plain row layout, Experience and
      Projects unaffected. (A terminal-style corner-bracket decoration was also tried on the
      photo/cards/Book-a-call box and explicitly rejected — reverted same session, not present in the
      final code.)

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
- [x] 8 admin API routes, each zod-validated: `profile`, `timeline`, `experience`, `skills`,
      `projects`, `social-links`, `contact-information`, `resume` (metadata only, see below)
- [x] Per-tab "Save & Publish" — each tab now PUTs to its own resource endpoint instead of one big blob
- [x] Toast notifications (replaced the old inline status line)
- [x] Client-side image compression before upload
- [x] Profile photo upload field added to admin (previously had to be swapped manually on disk)
- [x] Contact page copy (availability blurb, extra blurb, response note, Cal.com link) — previously
      hardcoded in `ContactView.tsx`, now editable from the Socials & Resume tab
- [x] Resume upload always replaces the single active file (no duplicate resumes ever pile up in storage)
- [x] Rate limiting on `/api/admin/login` — 5 failed attempts per IP per 15 minutes → 429, tracked via
      a `login_attempts` Postgres table (no new external service like Redis needed), self-cleans
      entries older than 24h, resets on a successful login
- [x] **Fixed: video uploads failing in production.** Root cause — Vercel Serverless Functions cap
      request bodies at ~4.5MB (a hard platform limit, not configurable), so any video routed through
      our own `/api/admin/upload` route got rejected with `413 FUNCTION_PAYLOAD_TOO_LARGE` before our
      code even ran. Reproduced directly against production (1MB succeeded, 5MB/10MB both 413'd).
      Fixed by uploading images/video/resumes straight from the browser to Supabase Storage
      (`lib/uploadToStorage.ts`), bypassing our server entirely — Storage RLS already restricts writes
      to the logged-in admin. The old generic `/api/admin/upload` route is deleted (no longer used);
      `/api/admin/resume` now only records the filename/timestamp after the browser's direct upload
      completes, rather than handling the file itself.
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
- [x] `@vercel/blob` dependency removed
- [x] `CLAUDE.md` — updated for the new architecture
- [x] Old `content/profile.ts`, `story.ts`, `projects.ts`, `skills.ts`, `experience.ts`, `socials.ts`,
      and `scripts/migrate-to-supabase.ts` deleted — all fully superseded by Supabase, nothing else
      referenced them (`content/stack.ts` kept — still in active use, not editable in admin)

---

## Resolved incidents (kept for reference — not active issues)

**Production build failing** — `Error: supabaseUrl is required.` while prerendering `/projects`. Root
cause: the Supabase env vars had never actually been added to the Vercel project (only old
`ADMIN_PASSWORD` / Blob-related vars were present). Fixed by adding the 3 Supabase env vars (production
+ preview scope; service role key needs `sensitive` type, which can't target `development`), removing
the 4 old unused vars, and redeploying.

**Production silently never updating after that** — every push built successfully but never appeared
on `architbhullar.com`. Root cause: Vercel's Production Branch setting was `main`, a stale/abandoned
branch from before this migration, while all real work was pushed to `master` — a Vercel-only setting
completely unrelated to GitHub's "default branch." Fixed by renaming `master` → `main` locally and
pushing, reconciling the two so Vercel's existing `main` setting now points at the real code. Confirmed
the auto-deploy pipeline works correctly going forward (a normal push now triggers a proper
`production` target deployment with no manual intervention).

**Video/image/resume uploads failing (413 in production)** — Vercel Serverless Functions cap request
bodies at ~4.5MB, not configurable via Next.js. Reproduced directly against production (1MB fine,
5MB/10MB both `413 FUNCTION_PAYLOAD_TOO_LARGE`). Fixed by uploading directly from the browser to
Supabase Storage (`lib/uploadToStorage.ts`), bypassing our server's request entirely; Storage RLS
already restricts writes to the logged-in admin. Confirmed working — user successfully uploaded a real
resume PDF via the new flow.

---

## Pending

- [ ] Revoke the temporary Vercel API token (vercel.com/account/tokens) — no longer needed.
- [ ] Delete the old `master` branch on GitHub — blocked until GitHub's default branch is switched to
      `main` first (**github.com/Architbh007/architbhullar → Settings → Branches → Default branch**),
      since GitHub refuses to delete whatever branch is currently marked default. Not urgent — `main`
      is already what Vercel deploys from, this is just cleanup.

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
