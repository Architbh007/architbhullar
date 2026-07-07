# Design System — archit-website

This is the design direction for architbhullar.com. It exists so future changes push the site
further in one deliberate direction instead of drifting toward generic template defaults. Read
[skills.md](skills.md) alongside this — that file is the enforcement checklist; this file is the
reasoning behind it.

## The concept

This is not a marketing site. It's a **developer's workspace** — the visitor is looking at a
terminal/IDE-adjacent tool, not a landing page. Every view should read like output from a command,
not a hero section. The site already has the bones of this (breadcrumb path in the nav, `>` command
prompts opening each view, monospace labels) — the revamp's job is to push that metaphor harder and
strip out the generic SaaS/portfolio patterns that leaked in around it.

Concretely: think `git log`, `git diff`, `htop`, a REPL session, a man page, a structured log file —
not a Squarespace template, not a Dribbble "SaaS landing page" shot, not a component-library demo.

## What we're moving away from

The current site is already dense and mono-forward, but five patterns still read as generic
AI-template/SaaS defaults and should be replaced, not incrementally polished:

1. **Button glow** (`shadow-lg shadow-violet-500/20` on primary buttons) — the default "SaaS CTA"
   treatment. Replace with something that reads as a terminal affordance ( underline-on-hover,
   inverted fill) rather than a glowing plastic button.
2. **Card hover lift** (translate-up + border-glow + shadow on project cards) — the default "product
   card" recipe used on every AI-generated site. Replace with a state change that fits the metaphor:
   corner brackets appearing, a line prefix changing from ` ` to `>`, background inverting slightly —
   not physical elevation.
3. **Pill badges** (`rounded-full` tinted chips for skills/tags) — the ubiquitous "feature chip" look.
   Replace with inline bracketed or slash-delimited text tokens (`[react]`, `/typescript`) that read as
   data, not UI chrome.
4. **One universal scroll-reveal** (`AnimatedSection`'s single fade+slide-up reused everywhere) —
   the default Framer Motion scroll animation every AI-built site ships. Replace with 2-3 motion
   primitives tied to *what* is entering (see Motion section) so different content types move
   differently, on purpose.
5. **Gradient placeholder tiles** (diagonal `#1a1a24 → #111116` gradient behind project initials) —
   generic empty-state filler. Replace with something that looks intentional even with no image:
   ASCII-art-adjacent treatment, ANSI-style color block, or ditch the placeholder concept entirely in
   favor of a text-first project row.

If a new component's hover/entrance/empty-state instinct is "add a shadow and translate it up 4px" —
that's the tell. Stop and ask what a terminal/CLI equivalent of that state would look like instead.

## Color

Keep the existing base — it's already correct for this concept:

- Background: `#0d0d10`
- Primary text: `zinc-200` / `#e2e2e8`
- Secondary/muted text: `zinc-500`
- Borders: hairline only, `rgba(255,255,255,0.05–0.14)` — never a solid gray border
- Accent: `violet-400` — reserved for interactive/active state (nav underline, links, cursor caret),
  not decoration

**Add semantic color, used the way a terminal or diff view uses it** — sparingly, purposefully, never
as a background tint on a whole card:
- `emerald-400` — success/positive/"added" (already used for status; extend to diff-style "+" markers,
  active/available states)
- `amber-400` — caution/in-progress/"modified"
- A muted red (`rose-400` at low usage) reserved for anything genuinely negative — do not use it for
  decoration or hover states

Do not introduce a second decorative accent color (no teal-and-violet duotone, no rainbow gradient
text). One accent (violet) + semantic colors used like log-level indicators is the palette. If a
component wants a second color for visual interest, that's a sign it should use texture/typography
instead (see below).

## Typography

- Geist Sans for body/UI text, Geist Mono for labels, prompts, data, and anything that represents
  "system output" rather than "prose."
- Current scale is compact (14px base, mostly `text-xs`/`text-sm`) — keep the density, but stop making
  *everything* the same size. Introduce real contrast: a handful of moments (name on About, view-level
  command headers) get pushed larger and given room, while data-dense areas (skills, stack table,
  experience rows) stay small and tight. Contrast should come from **scale variance**, not from adding
  a decorative display font.
- Uppercase-tracked mono labels (`text-[11px] uppercase tracking-widest`) stay reserved for actual
  labels (section eyebrows, breadcrumbs) — don't let them creep into body copy.

## Layout

- No centered-hero-with-CTA anywhere. Content stays left-aligned inside the existing `max-w-3xl` command-output column — this is the single strongest thing distinguishing this site from a template and it must not regress.
- Prefer structured rows/tables over card grids where the content is genuinely tabular (skills,
  stack, experience) — `SkillsView`'s row pattern is the model to extend, not the grid pattern in
  `ProjectsView`. Cards are acceptable only where content is genuinely heterogeneous (Projects), and
  even there, favor a denser list-with-inline-preview over a gradient-tile grid.
- Dividers are hairline rules or a literal mono divider glyph (e.g. a rendered `───` line or repeated
  `·`), not `<hr>`-as-shadow or gradient fades.
- Radius: flat or barely-rounded (`rounded-none` / `rounded-sm`, 2-4px max). No `rounded-xl`/
  `rounded-2xl` soft-card look anywhere in the revamp. The one exception is genuinely circular UI
  (avatar, status dot).

## Motion

Replace the single `AnimatedSection` fade+slide-up with 2-3 distinct primitives, chosen by content
type — this is the biggest lever for feeling designed rather than templated:

1. **Line-stagger reveal** for list/row content (skills, experience, stack table): rows appear in
   quick sequence top-to-bottom, like output printing, rather than the whole block fading as one unit.
2. **Typewriter/decode** for the command-prompt header opening each view (extend the nav breadcrumb's
   existing typewriter effect to the `>` prompt line at the top of each view, if not already shared).
3. **Snap/cut** for view-to-view navigation instead of a soft crossfade — content should feel like it's
   being swapped, not dissolved. A very short (under 120ms) opacity or clip transition reads as
   "terminal redraw"; a long eased fade reads as "marketing site page transition."

Keep all durations short (150-300ms) and easing sharp/linear rather than the soft spring/ease-out used
for marketing sites. The existing nav underline `layoutId` spring is fine to keep — it's a UI
affordance, not a content reveal, and springs suit small interactive elements even in this system.

## Components — direction per file

- `Button.tsx`: drop the glow shadow. Primary = solid fill with hard edge; hover = invert (bg becomes
  text color, text becomes bg) rather than lighten/shadow. Ghost/outline stay hairline-bordered.
- `Badge.tsx`: replace pill/chip with inline bracketed text token, monospace, no background tint —
  color comes from text color only.
- `AnimatedSection.tsx`: split into the 2-3 primitives above rather than one configurable
  fade/slide/none variant.
- `ProjectsView.tsx`: reconsider the 2-col gradient-tile card grid in favor of a denser row-based list
  (title, one-line description, tag tokens, view-on-hover preview) consistent with how `SkillsView`
  already treats content as data rather than product cards.
- `Icons.tsx`: no change in approach — keep raw inline SVGs, no icon library. Extend the same pattern
  for any new icons rather than pulling in lucide-react for anything beyond what's already justified.

## Non-negotiables (carried over, do not regress)

- No scroll-jacking; content still switches by view/route, not by scroll position.
- Cookie-free `getContent()` read path and ISR (`revalidate = 60`) are unaffected by any visual change
  — this is a styling/motion revamp, not an architecture change.
- Admin panel (`/admin`) is a tool, not part of this brand exercise — it can stay functional/plain and
  does not need to carry the terminal aesthetic unless doing so is free.
