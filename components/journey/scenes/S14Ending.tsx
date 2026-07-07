'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { Socials } from '@/types'
import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate } from '../core/Narration'
import { Particles } from '../core/Particles'
import { useJourney } from '../core/JourneyContext'

const DONE = [
  { x: 24, y: 66, label: 'nodemap' },
  { x: 42, y: 40, label: 'gridrace' },
  { x: 60, y: 62, label: 'evat' },
]

const NEXT = [
  { x: 78, y: 38 },
  { x: 88, y: 58 },
]

function Constellation({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const scale = useTransform(p, [0.05, 0.4], [1, 1.35])
  const x = useTransform(p, [0.05, 0.4], ['0%', '-16%'])

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="h-[60vh] w-full"
      preserveAspectRatio="xMidYMid meet"
      style={reduced ? undefined : { scale, x }}
      aria-hidden
    >
      <g stroke="rgba(148,163,184,0.25)" strokeWidth="0.3">
        <line x1={DONE[0].x} y1={DONE[0].y} x2={DONE[1].x} y2={DONE[1].y} />
        <line x1={DONE[1].x} y1={DONE[1].y} x2={DONE[2].x} y2={DONE[2].y} />
        <line x1={DONE[2].x} y1={DONE[2].y} x2={NEXT[0].x} y2={NEXT[0].y} strokeDasharray="1 1.4" />
        <line x1={NEXT[0].x} y1={NEXT[0].y} x2={NEXT[1].x} y2={NEXT[1].y} strokeDasharray="1 1.4" />
      </g>
      {DONE.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="1.5" fill="#e2e8f0" />
          <circle cx={n.x} cy={n.y} r="3.2" fill="none" stroke="rgba(226,232,240,0.25)" strokeWidth="0.3">
            {!reduced && <animate attributeName="r" values="2.4;4;2.4" dur="3.4s" repeatCount="indefinite" />}
          </circle>
          <text x={n.x} y={n.y + 6.5} textAnchor="middle" fontSize="2.6" fontFamily="monospace" fill="rgba(148,163,184,0.8)">
            {n.label}
          </text>
        </g>
      ))}
      {NEXT.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="1.3" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="0.35" strokeDasharray="0.8 0.8" />
      ))}
    </motion.svg>
  )
}

function Sunrise({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const opacity = useTransform(p, [0.42, 0.52, 0.72, 0.8], [0, 1, 1, 0])
  const scale = useTransform(p, [0.45, 0.78], [1.5, 1])
  const sunY = useTransform(p, [0.45, 0.72], ['74%', '52%'])

  return (
    <motion.div className="absolute inset-0" style={{ opacity: reduced ? 0 : opacity }}>
      <motion.div className="absolute inset-0" style={{ scale: reduced ? 1 : scale }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#3b1d0a_0%,#12100f_45%,#08090c_100%)]" />
        <motion.div
          className="absolute left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-[#f59e0b]/80 blur-[3px]"
          style={{ top: sunY, boxShadow: '0 0 70px 26px rgba(245,158,11,0.25)' }}
        />
        <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" className="absolute bottom-0 h-[38vh] w-full" aria-hidden>
          <g fill="#0a0d13">
            <rect x="60" y="120" width="70" height="180" />
            <rect x="150" y="170" width="50" height="130" />
            <rect x="230" y="90" width="64" height="210" />
            <path d="M 294 90 L 294 300 L 320 300 L 320 130 Z" />
            <rect x="360" y="150" width="80" height="150" />
            <rect x="470" y="60" width="56" height="240" />
            <path d="M 526 60 L 560 300 L 526 300 Z" />
            <polygon points="600,300 600,110 626,96 652,110 652,300" />
            <line x1="626" y1="96" x2="626" y2="30" stroke="#0a0d13" strokeWidth="3" />
            <rect x="700" y="140" width="90" height="160" />
            <rect x="820" y="100" width="48" height="200" />
            <rect x="900" y="180" width="120" height="120" />
            <polygon points="1060,300 1060,190 1130,150 1130,300" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  )
}

export function S14Ending({ socials }: { socials: Socials }) {
  return (
    <>
      <Scene index={14} title="Still Being Written" mood="dawn" height={520} className="bg-[#08090c]">
        {(p) => <EndingInner p={p} />}
      </Scene>
      <FinalInterface socials={socials} />
    </>
  )
}

function EndingInner({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const fadeToBlack = useTransform(p, [0.86, 0.98], [0, 1])

  return (
    <>
      <Particles mode="dust" count={40} className="opacity-50" />

      <CenterStage className="justify-start pt-[15vh]">
        <Slate p={p} at={[0.02, 0.06, 0.36, 0.42]}>
          Scene 14 · future vision
        </Slate>
      </CenterStage>

      <CenterStage>
        <Fade p={p} at={[0.05, 0.1, 0.34, 0.4]} className="w-full">
          <Constellation p={p} />
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            three shipped · the next ones are still outlines
          </p>
        </Fade>
      </CenterStage>

      <Sunrise p={p} />
      <CenterStage>
        <Line p={p} at={[0.5, 0.56, 0.68, 0.74]} size="lg" className="[text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
          Melbourne, at sunrise.
          <br />
          <span className="text-zinc-400">Every milestone glowing behind.</span>
        </Line>
      </CenterStage>

      <CenterStage>
        <div className="space-y-3">
          <Line p={p} at={[0.78, 0.84, 0.97, 1]} size="xl">
            The story isn&rsquo;t finished.
          </Line>
          <Line p={p} at={[0.82, 0.88, 0.97, 1]} size="xl" className="text-zinc-400">
            It&rsquo;s still being written<span className="j-cursor ml-2 opacity-80" />
          </Line>
        </div>
      </CenterStage>

      <motion.div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: reduced ? 0 : fadeToBlack }} />
    </>
  )
}

function FinalInterface({ socials }: { socials: Socials }) {
  const links = [
    { label: 'View resume', href: socials.resume, download: true },
    { label: 'Explore projects', href: '/projects' },
    { label: 'GitHub', href: socials.github, external: true },
    { label: 'LinkedIn', href: socials.linkedin, external: true },
    { label: 'Get in touch', href: `mailto:${socials.email}` },
  ]
  return (
    <section aria-label="Continue" className="relative flex min-h-screen flex-col items-center justify-center bg-black px-6">
      <div className="w-full max-w-xs">
        <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-700">
          fin · what happens next is up to you
        </p>
        <nav className="flex flex-col">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...(l.download ? { download: 'Archit_Bhullar_Resume.pdf' } : {})}
              className="group flex items-baseline justify-between border-b border-white/8 py-4 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <span>{l.label}</span>
              <span className="font-mono text-xs text-zinc-700 transition-colors group-hover:text-violet-400">
                {l.download ? '↓' : l.external ? '↗' : '→'}
              </span>
            </a>
          ))}
        </nav>
        <a href="/" className="mt-10 inline-block font-mono text-[11px] text-zinc-600 transition-colors hover:text-zinc-300">
          ← back to the workspace
        </a>
      </div>
    </section>
  )
}
