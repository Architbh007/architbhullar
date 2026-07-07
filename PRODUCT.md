# Product

## Register

brand

## Users

Primary visitor is a recruiter or hiring manager evaluating Archit for a role. They land with a
specific job to be done: assess technical credibility and project depth, fast, and decide whether to
take the next step (reach out, book a call, download the resume). They are scanning, not browsing —
the site needs to read as evidence of engineering craft within seconds, not warm them up with a
marketing narrative.

## Product Purpose

architbhullar.com is a personal developer workspace, not a marketing site. It exists to make the case
for Archit's engineering ability through the site itself — the interface is the portfolio piece, not
just the container for one. Success is a visitor concluding "this person is meticulous and technically
sharp" from the interaction alone, before reading a single project write-up, then following through
(contact, resume, call booking).

## Brand Personality

Sharp, opinionated, a little dry. The site should feel like it was built by someone with strong,
considered opinions about how software should work — not neutral, not eager to please. Confidence
comes from precision and restraint, not enthusiasm or persuasion copy.

Visual identity is the CLI/terminal-workspace metaphor already established in `design.md`: `git log`,
`git diff`, `htop`, a REPL session, a man page — structured system output, not a hero section. Within
that identity, motion should be raised to Apple-level polish: a few deliberate, cinematic scroll-linked
moments (About intro, project case studies) are allowed, layered on top of the terminal aesthetic
rather than replacing it. This is a blend, not a pivot — the CLI colors, density, and anti-slop rules
stay load-bearing; only the ambition level of the motion craft changes.

## Anti-references

Everything `skills.md`'s hard-ban list already names: centered hero + CTA, glow-shadow buttons, card
hover = lift+shadow+glow, pill/chip badges, gradient placeholder tiles, glassmorphism, one universal
fade-slide-up reused everywhere, three-column feature grids, gradient text, a second decorative accent
color, icon-in-a-circle chips, and default icon libraries beyond the existing raw-SVG pattern. These
read as generic AI-template/SaaS defaults and are explicitly what this site is moving away from.

The one addition from this round: don't chase Apple's *literal* visual style (glossy product
photography, huge centered typographic hero, marketing whitespace) — the terminal identity stays the
frame. What's being borrowed from Apple is motion craft and precision, not the visual language.

## Design Principles

1. **The interface is the pitch.** Every interaction is itself evidence of engineering quality — a
   sloppy hover state undermines the portfolio content sitting right next to it.
2. **System output, not marketing copy.** Content presents as structured data (logs, diffs, tables,
   command output), left-aligned in the workspace column — never a centered persuasion layout.
3. **One accent, semantic color otherwise.** Violet is the only decorative accent; emerald/amber/rose
   are log-level indicators, never decoration.
4. **Motion matches content type, and earns its craft.** No universal scroll-reveal. Line-stagger for
   lists, typewriter for prompt headers, snap-cut for view changes — and a small number of cinematic,
   scroll-linked moments where the content specifically warrants it (About intro, case studies), held
   to Apple-level smoothness rather than default Framer Motion easing.
5. **When in doubt, do less.** A hairline-bordered row of mono text beats inventing a new
   card/shadow/gradient component; restraint is the differentiator from template-generated sites.

## Accessibility & Inclusion

No formal WCAG compliance target set. Best-effort only — reasonable contrast and keyboard
navigability are still expected as baseline engineering quality (consistent with "the interface is the
pitch"), but no specific compliance level or reduced-motion requirement is mandated. Given more
animation is being added, not less, revisit this if it becomes a real accessibility complaint.
