'use client'

import { useState } from 'react'
import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate } from '../core/Narration'
import { Particles } from '../core/Particles'
import { useJourney } from '../core/JourneyContext'

function Countdown({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const [label, setLabel] = useState('35:59:41')
  useMotionValueEvent(p, 'change', (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.08) / 0.72))
    const total = Math.max(0, Math.floor((1 - t) * 36 * 3600 - 19))
    const h = String(Math.floor(total / 3600)).padStart(2, '0')
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
    const s = String(total % 60).padStart(2, '0')
    setLabel(`${h}:${m}:${s}`)
  })
  return (
    <p className="font-mono text-xl tabular-nums text-amber-400/90 md:text-2xl">
      {reduced ? '00:00:00' : label}
      <span className="ml-3 text-[10px] uppercase tracking-[0.25em] text-zinc-600">remaining</span>
    </p>
  )
}

function Whiteboard() {
  return (
    <svg viewBox="0 0 220 130" className="w-64 md:w-72" aria-hidden>
      <rect x="4" y="4" width="212" height="122" rx="3" fill="#0e1015" stroke="rgba(226,232,240,0.25)" />
      <g stroke="rgba(226,232,240,0.5)" strokeWidth="1.4" fill="none">
        <rect x="22" y="22" width="46" height="22" rx="2" />
        <rect x="150" y="20" width="48" height="22" rx="2" />
        <rect x="86" y="62" width="52" height="24" rx="2" />
        <path d="M 68 33 C 100 33 100 30 150 30" />
        <path d="M 45 44 C 45 74 60 74 86 74" />
        <path d="M 174 42 C 174 76 160 74 138 74" />
        <path d="M 30 100 q 8 -8 16 0 q 8 8 16 0 q 8 -8 16 0" strokeDasharray="2 3" opacity="0.6" />
      </g>
      <text x="112" y="112" fontSize="9" fontFamily="monospace" fill="rgba(251,191,36,0.8)">ship by 9am ↑</text>
    </svg>
  )
}

const CUTS: Array<{ at: [number, number, number, number]; caption: string; body: React.ReactNode }> = [
  {
    at: [0.12, 0.15, 0.24, 0.27],
    caption: 'hour 01 · brainstorm',
    body: <Whiteboard />,
  },
  {
    at: [0.27, 0.3, 0.38, 0.41],
    caption: 'hour 07 · fuel',
    body: (
      <div className="flex items-end gap-3">
        {[38, 52, 44, 58].map((h, i) => (
          <div key={i} className="w-7 rounded-t-sm border border-white/15 bg-[#10141c]" style={{ height: h }} />
        ))}
        <p className="ml-3 font-mono text-[10px] text-zinc-500">energy drinks · count: 4</p>
      </div>
    ),
  },
  {
    at: [0.41, 0.44, 0.52, 0.55],
    caption: 'hour 19 · heads down',
    body: (
      <div className="w-72 space-y-1.5 font-mono text-[10px] text-zinc-500">
        <p><span className="text-emerald-400/80">+</span> feat: realtime sync (do not ask how)</p>
        <p><span className="text-rose-400/80">✗</span> tests: 3 failed, 1 passed</p>
        <p><span className="text-emerald-400/80">+</span> fix: the demo path. only the demo path.</p>
        <p className="text-zinc-600">02:47 — someone is asleep under the desk</p>
      </div>
    ),
  },
  {
    at: [0.55, 0.58, 0.66, 0.69],
    caption: 'hour 35 · the pitch',
    body: (
      <div className="relative flex h-32 w-64 items-end justify-center">
        <div className="absolute top-0 h-full w-24 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.18),transparent_70%)]" />
        <div className="mb-2 h-14 w-8 rounded-t-full bg-[#141821]" />
        <p className="absolute bottom-0 right-0 font-mono text-[10px] text-zinc-500">3 min · demo gods willing</p>
      </div>
    ),
  },
]

export function S09Hackathons() {
  return (
    <Scene index={9} title="Hackathons" mood="pulse" height={380} className="bg-[#0a0a0d]">
      {(p) => (
        <>
          <CenterStage className="justify-start pt-[15vh]">
            <Slate p={p} at={[0.02, 0.05, 0.88, 0.94]}>
              Scene 09 · 36 hours · no plan survives
            </Slate>
            <div className="mt-4">
              <Fade p={p} at={[0.05, 0.09, 0.78, 0.84]} y={8}>
                <Countdown p={p} />
              </Fade>
            </div>
          </CenterStage>

          {CUTS.map((cut) => (
            <CenterStage key={cut.caption}>
              <Fade p={p} at={cut.at} y={6} scale={[1.04, 0.98]} className="flex flex-col items-center gap-4">
                {cut.body}
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">{cut.caption}</p>
              </Fade>
            </CenterStage>
          ))}

          <CenterStage>
            <Fade p={p} at={[0.7, 0.73, 0.82, 0.86]} className="relative flex flex-col items-center gap-4">
              <div className="absolute -inset-16">
                <Particles mode="embers" count={50} color="251,191,36" />
              </div>
              <p className="text-3xl font-light text-zinc-100 md:text-5xl">Applause.</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                the demo worked · nobody knows why
              </p>
            </Fade>
          </CenterStage>

          <CenterStage>
            <Line p={p} at={[0.88, 0.92, 0.98, 1]} size="lg">
              36 hours. One idea.
              <br />
              <span className="text-zinc-400">Ship it anyway.</span>
            </Line>
          </CenterStage>
        </>
      )}
    </Scene>
  )
}
