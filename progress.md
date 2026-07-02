# progress.md

## Status: Production-ready, pending Vercel deployment

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
- [x] **Contact** — email + copy button, GitHub, LinkedIn, Resume links
- [x] Mobile responsive — hamburger menu, compact layout
- [x] URL routing — `/projects`, `/skills`, `/experience`, `/contact` all resolve correctly, browser back/forward works
- [x] WAM (79.65 → 85 target) displayed on About under university

### Admin

- [x] `/admin/login` — password form, httpOnly cookie, 7-day session
- [x] `/admin` — full content editor: Profile, Story, Projects, Skills, Experience tabs
- [x] `proxy.ts` — protects all `/admin/*` and `/api/admin/*` routes
- [x] `PUT /api/admin/content` — writes to Vercel Blob, revalidates all routes
- [x] `GET /api/admin/content` — returns current live content
- [x] Content falls back to static TS files when Blob not configured (local dev)

### Infrastructure

- [x] `lib/content.ts` — `getContent()` with Blob + fallback
- [x] `SiteContent` type — unified type for all content sections
- [x] All views accept content as props (no direct imports from content files in components)
- [x] ISR with 60s revalidation on all routes
- [x] `CLAUDE.md` — full project documentation

---

## Pending (before launch)

- [ ] Add real profile photo to `public/images/profile.jpg`
- [ ] Add real resume PDF to `public/resume.pdf`
- [ ] Set `ADMIN_PASSWORD` in Vercel env vars
- [ ] Set up Vercel Blob store → add `BLOB_READ_WRITE_TOKEN` to Vercel env vars
- [ ] Connect domain `architbhullar.com` in Vercel dashboard
- [ ] First admin save after deploy (seeds Blob from TS files)
- [ ] Update GitHub URLs in `content/projects.ts` if repos are private/different names

---

## Known gaps / future improvements

- [ ] Photo upload in admin panel (currently update manually in `public/images/`)
- [ ] Stack snapshot (`content/stack.ts`) not editable in admin — edit the TS file directly for now
- [ ] Socials not editable in admin — edit `content/socials.ts` directly
- [ ] No project reordering in admin (drag-and-drop) — reorder via JSON in the editor
- [ ] `/admin` login has no rate limiting (not a concern for a personal site)
- [ ] Project detail doesn't have a URL (`/projects/evat`) — sub-view state only

---

## Content update workflow (post-deploy)

**For text changes (bio, story, projects, skills, experience):**
1. Go to `architbhullar.com/admin`
2. Log in with your password
3. Edit the relevant tab
4. Click "Save & Publish" — live within ~60 seconds

**For adding a new project:**
1. Admin panel → Projects tab → "+ Add project"
2. Fill in all fields
3. Save

**For monthly story updates:**
1. Admin panel → Story tab
2. Find the current year → click "+ Add event"
3. Type the event
4. Save

**For code/design changes that go beyond content:**
1. Edit the relevant component or style files
2. `git push` → Vercel auto-redeploys (~1 min)
