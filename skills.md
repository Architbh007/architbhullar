
# Anti-Slop Checklist — archit-website

Concrete rules to check every UI change against, so the site doesn't drift back toward generic
AI-generated-template defaults. [design.md](design.md) explains *why*; this file is the fast
pass/fail list — run through it before calling any visual change done.

## The one-line test

> If you removed all the copy and colors, would this layout/motion/component be indistinguishable
> from a random SaaS landing page or Dribbble "AI app" shot?

If yes, it fails, regardless of how good the copy or colors are on top of it.

## Hard bans

Do not use these, anywhere, in the revamp — no exceptions without discussing first:

- [ ] Centered hero section with headline + subtitle + centered CTA button
- [ ] `shadow-lg`/`shadow-xl` glow under a colored button or card (`shadow-{color}-500/NN`)
- [ ] Card hover = translate up + shadow grow + border glow, all three at once
- [ ] `rounded-full` pill/chip badges with tinted background + tinted border
- [ ] `rounded-xl` / `rounded-2xl` "soft card" treatment
- [ ] Diagonal or radial gradient tile used as an image placeholder/filler
- [ ] Glassmorphism: `backdrop-blur` + translucent white/black layered card
- [ ] A single generic fade+slide-up scroll-reveal reused for every section on every page
- [ ] Three-column "feature grid" (icon + heading + one sentence, repeated 3x) for anything
- [ ] Gradient text (`bg-clip-text` rainbow/duotone headline)
- [ ] A second decorative accent color added purely for "visual interest" (one accent + semantic
      colors only — see design.md Color section)
- [ ] Icon-in-a-circle/square tinted-background treatment (the ubiquitous "feature icon" chip)
- [ ] lucide-react (or any icon library) beyond what's already justified for brand icons — see
      `components/ui/Icons.tsx`'s existing raw-SVG pattern

## Required checks before shipping a component/view change

1. **Layout**: Is content left-aligned inside the terminal/command-output column (`max-w-3xl`),
   not centered? Tabular content (skills, stack, experience) rendered as rows, not cards?
2. **Motion**: Does this content's entrance motion match its *type* (line-stagger for lists,
   typewriter for prompt headers, snap-cut for view changes) rather than reusing one universal
   fade-up, per design.md's Motion section?
3. **Color**: Is violet the only decorative accent, with emerald/amber/rose used strictly as
   semantic status signals (not decoration, not backgrounds-under-everything)?
4. **Radius**: Flat or `rounded-sm` (2-4px) max, except genuinely circular elements (avatar, status
   dot)?
5. **Hover/interactive state**: Does it read as a terminal affordance (invert, bracket, prefix
   change, underline) rather than a physical-elevation/glow effect?
6. **Density**: Does type scale vary deliberately (a few large moments, mostly small/dense data)
   rather than everything sitting at the same `text-sm`?
7. **Novelty check**: Would a screenshot of this component, stripped of the site's copy, be
   recognizable as *this* site specifically — or could it be swapped into any other portfolio without
   anyone noticing? If the latter, it's not done yet.

## When extending to a new component

Ask "what is the terminal/CLI/log-file equivalent of this UI need?" before reaching for the default
web-component answer:

| Generic instinct | This site's answer |
|---|---|
| Feature card grid | Structured row list, tabular |
| Tag/chip | Bracketed inline mono token `[like-this]` |
| Loading spinner | Blinking cursor / `...` dot-cycle, mono |
| Empty state illustration | ASCII/text-first placeholder, no gradient tile |
| Modal/dialog | Inline expansion in the command-output flow where possible |
| Toast notification | A line appended to the "output," not a floating card |
| Progress bar | ASCII-style bracket meter (`[====------]`) or plain percentage text |

If a new pattern isn't covered by this table, default to *less* — a hairline-bordered row of mono
text beats inventing a new card/shadow/gradient component.

## Review cadence

Re-run this checklist against the diff for any PR/change that touches `components/views/**`,
`components/ui/**`, or `app/globals.css`. If a change adds a new Tailwind utility combination not
already described in design.md (a new shadow, a new gradient, a new rounded value), treat that as a
signal to stop and check it against the hard-ban list above before merging.
