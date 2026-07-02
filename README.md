# architbhullar.com

Personal developer workspace site built with Next.js and deployed on Vercel.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Animations:** Framer Motion
- **Storage:** Vercel Blob (dynamic content)
- **Hosting:** Vercel

---

## Local Development

### Prerequisites

- Node.js **v18 or higher** (developed on v24)
- npm

### Install

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# Required for the admin panel
ADMIN_PASSWORD=yourchosenpassword

# Required for dynamic content + file uploads (get from Vercel dashboard → Storage → Blob)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxx
```

Without `BLOB_READ_WRITE_TOKEN`, the site falls back to the static content files in `content/`. The admin panel will return 503 on save.

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

---

## One-Time Setup: Connect GitHub to Vercel

### 1. Change default branch to `main`

The repo was renamed from `master` to `main`. You need to update GitHub:

1. Go to [github.com/Architbh007/architbhullar](https://github.com/Architbh007/architbhullar)
2. **Settings → Branches → Default branch**
3. Switch from `master` to `main` → click **Update**
4. Then delete the old `master` branch from **Settings → Branches**

### 2. Import project into Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select `Architbh007/architbhullar`
4. Vercel auto-detects Next.js — leave all build settings as default
5. Click **Deploy**

Vercel will now rebuild and redeploy automatically on every push to `main`.

### 3. Add Environment Variables in Vercel

1. Go to your project in the Vercel dashboard
2. **Settings → Environment Variables**
3. Add the following:

| Name | Value | Environment |
|------|-------|-------------|
| `ADMIN_PASSWORD` | your chosen password | Production, Preview |
| `BLOB_READ_WRITE_TOKEN` | from Vercel Storage → Blob | Production, Preview |

4. **Redeploy** after adding variables (Settings → Deployments → Redeploy)

### 4. Set Up Vercel Blob Storage

1. In the Vercel dashboard → **Storage → Create Database → Blob**
2. Name it anything (e.g. `archit-blob`)
3. Copy the `BLOB_READ_WRITE_TOKEN` and add it as an environment variable (step above)
4. After the first deploy, visit `/admin`, log in, and click **Save & Publish** to seed the blob with your content

### 5. Connect Custom Domain

1. Vercel dashboard → **Settings → Domains**
2. Add `architbhullar.com`
3. Vercel gives you DNS records — go to your domain registrar and add them:
   - **A record:** `@` → Vercel's IP (shown in dashboard)
   - **CNAME record:** `www` → `cname.vercel-dns.com`
4. DNS propagation takes 5–30 minutes
5. Vercel auto-provisions an SSL certificate

---

## Admin Panel

The site has a password-protected admin panel at `/admin` for updating content without touching code.

- **URL:** `yourdomain.com/admin`
- **Password:** whatever you set as `ADMIN_PASSWORD`
- Tabs: Profile, Story, Projects, Skills, Experience, Socials & Resume

---

## Checking Deployment Logs if Build Fails

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard) → your project
2. Click **Deployments**
3. Click the failed deployment
4. Click **Build Logs** to see the full error output

Common causes:
- Missing environment variable → add it in Vercel dashboard and redeploy
- TypeScript error → fix locally, push again
- `npm install` failure → check `package.json` for version conflicts

---

## Project Structure

```
app/                  # Next.js App Router pages
  page.tsx            # / (About view)
  [view]/page.tsx     # /projects, /skills, /experience, /contact
  admin/              # Admin panel (password protected)
  api/admin/          # Admin API routes (content, upload, login)

components/
  Workspace.tsx       # Main shell (nav + view switching)
  views/              # One component per view

content/              # Default content (TypeScript files, used as fallback)
lib/
  content.ts          # getContent() — reads Blob or falls back to TS files
types/
  index.ts            # All shared TypeScript types
proxy.ts              # Auth middleware protecting /admin routes
```
