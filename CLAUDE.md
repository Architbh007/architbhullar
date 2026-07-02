@AGENTS.md

# archit-website

Personal developer workspace site for Archit Bhullar, hosted at architbhullar.com on Vercel.

## Stack

- **Next.js 16.2.9** (App Router, Turbopack) — uses `proxy.ts` not `middleware.ts`
- **React 19** with `'use client'` for all interactive components
- **Tailwind CSS v4** — uses `@import "tailwindcss"` + `@theme inline {}`, no `tailwind.config.ts`
- **Framer Motion v12** — `motion`, `AnimatePresence`
- **lucide-react v1.22.0** — brand icons (GitHub, LinkedIn) removed; custom SVGs in `components/ui/Icons.tsx`
- **@vercel/blob** — content storage for admin-edited data
- **Geist Sans + Geist Mono** via `next/font/google`

## Architecture

### Content layer

All content is defined in `content/*.ts` as TypeScript files. These are the **defaults/fallback**.

When `BLOB_READ_WRITE_TOKEN` is set, `lib/content.ts` fetches from Vercel Blob (`content/site-content.json`) and overrides the defaults. The blob is written by the admin panel at `/admin`.

```
content/
  profile.ts     ← name, title, bio, WAM, location
  story.ts       ← year timeline entries
  stack.ts       ← tech stack snapshot (About page)
  projects.ts    ← all project case studies
  skills.ts      ← skill categories + skills
  experience.ts  ← experience timeline
  socials.ts     ← links (GitHub, LinkedIn, email, resume)

lib/
  content.ts     ← getContent() — reads Blob or falls back to TS files

types/
  index.ts       ← all shared types including SiteContent
```

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

- Route: `/admin` — only accessible to you
- Auth: `proxy.ts` checks `admin-session` cookie against `ADMIN_PASSWORD` env var. No cookie → redirected to `/admin/login`.
- Login: POST to `/api/admin/login` → sets httpOnly cookie for 7 days
- Content editor: `/admin` page has tabs for Profile, Story, Projects, Skills, Experience
- Save: PUT to `/api/admin/content` → writes to Vercel Blob → calls `revalidatePath()` on all routes → live within 60s

## Running locally

```bash
npm install
npm run dev
```

For admin panel locally, create `.env.local`:
```
ADMIN_PASSWORD=yourchosenpassword
BLOB_READ_WRITE_TOKEN=<from Vercel dashboard>
```

Without `BLOB_READ_WRITE_TOKEN`, the site uses the static TS content files. Admin saves will return 503.

## Deploying to Vercel

1. Connect GitHub repo to Vercel
2. Set env vars in Vercel dashboard:
   - `ADMIN_PASSWORD` — password for `/admin`
   - `BLOB_READ_WRITE_TOKEN` — from Vercel Storage → Blob → your store
3. Deploy

After first deploy, visit `architbhullar.com/admin`, log in, and hit "Save & Publish" to write the initial blob (seeds from TS files). From then on, admin edits go to blob; the TS files are just fallbacks.

## Key conventions

- **No comments in code** unless the WHY is non-obvious
- **`'use client'`** required on any component using hooks or browser APIs
- **Tailwind v4**: arbitrary values like `bg-[#0d0d10]`, zinc scale for text, violet-400 for accent
- **Icons**: use `GitHubIcon` / `LinkedInIcon` from `components/ui/Icons.tsx` — lucide-react v1.22 removed brand icons
- **Colors**: `#0d0d10` background, `text-zinc-200` primary, `text-zinc-500` secondary, `text-violet-400` accent
- **Font**: 14px base, `font-mono` only for terminal labels/prompts
