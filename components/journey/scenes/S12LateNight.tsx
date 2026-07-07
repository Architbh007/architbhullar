'use client'

import { useState } from 'react'
import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate } from '../core/Narration'
import { Particles } from '../core/Particles'
import { Egg } from '../core/EasterEgg'
import { useJourney } from '../core/JourneyContext'

const BOKEH = [
  { left: '8%', top: '22%', size: 26, color: 'rgba(251,191,36,0.16)' },
  { left: '18%', top: '55%', size: 14, color: 'rgba(251,191,36,0.2)' },
  { left: '30%', top: '30%', size: 34, color: 'rgba(125,211,252,0.1)' },
  { left: '70%', top: '20%', size: 20, color: 'rgba(251,191,36,0.14)' },
  { left: '82%', top: '48%', size: 30, color: 'rgba(244,114,182,0.08)' },
  { left: '60%', top: '62%', size: 16, color: 'rgba(125,211,252,0.12)' },
  { left: '44%', top: '14%', size: 12, color: 'rgba(251,191,36,0.2)' },
  { left: '90%', top: '30%', size: 18, color: 'rgba(251,191,36,0.12)' },
]

function Mug() {
  return (
    <svg viewBox="0 0 80 70" className="h-16 w-auto" aria-hidden>
      <path d="M 18 26 h 34 v 26 q 0 8 -8 8 h -18 q -8 0 -8 -8 z" fill="#141821" stroke="rgba(226,232,240,0.35)" strokeWidth="1.5" />
      <path d="M 52 32 q 12 0 12 9 q 0 9 -12 9" fill="none" stroke="rgba(226,232,240,0.35)" strokeWidth="1.5" />
      <path d="M 28 20 q 2 -5 0 -9 M 38 20 q 2 -5 0 -9" fill="none" stroke="rgba(226,232,240,0.25)" strokeWidth="1.4">
        <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3.2s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}

const TERMINAL_LINES = [
  { text: '$ git add -A', cls: 'text-zinc-400' },
  { text: '$ git commit -m "fix: null check on retry path"', cls: 'text-zinc-400' },
  { text: '[main 3f2a91c] fix: null check on retry path', cls: 'text-zinc-600' },
  { text: '$ npm run build', cls: 'text-zinc-400' },
  { text: 'compiling…', cls: 'text-zinc-600' },
]

function Terminal({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const [count, setCount] = useState(reduced ? TERMINAL_LINES.length : 0)
  useMotionValueEvent(p, 'change', (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.34) / 0.28))
    const next = Math.round(t * TERMINAL_LINES.length)
    setCount((prev) => (prev === next ? prev : next))
  })
  return (
    <div className="w-full max-w-md border border-white/10 bg-black/80 p-4 font-mono text-[11px] leading-relaxed md:text-xs">
      <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-zinc-700">tue 02:14 am</p>
      {TERMINAL_LINES.slice(0, count).map((l) => (
        <p key={l.text} className={l.cls}>{l.text}</p>
      ))}
      {count > 0 && count < TERMINAL_LINES.length && !reduced && <span className="j-cursor text-zinc-500" />}
    </div>
  )
}

export function S12LateNight() {
  return (
    <Scene index={12} title="Late Night Coding" mood="rain" height={420} className="bg-[#05070c]">
      {(p) => (
        <>
          <div className="absolute inset-0" aria-hidden>
            {BOKEH.map((b, i) => (
              <span
                key={i}
                className="absolute rounded-full blur-md"
                style={{ left: b.left, top: b.top, width: b.size, height: b.size, background: b.color }}
              />
            ))}
          </div>
          <Particles mode="rain" count={110} color="148,163,184" className="opacity-60" />

          <CenterStage className="justify-start pt-[15vh]">
            <Slate p={p} at={[0.02, 0.06, 0.9, 0.96]}>
              Scene 12 · rain outside · lo-fi inside
            </Slate>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.07, 0.13, 0.26, 0.32]} className="flex flex-col items-center gap-5">
              <div className="flex items-center gap-6">
                <Egg
                  label="A memory about coffee"
                  egg={{
                    title: 'Memory · the mug',
                    body: (
                      <p className="text-sm leading-relaxed text-zinc-400">
                        Semester one. Debugged for three hours. The bug: I was editing the wrong
                        file — same name, different folder, open in the next tab the entire time.
                        <br />
                        <br />
                        The coffee went cold. The lesson didn&rsquo;t.
                      </p>
                    ),
                  }}
                >
                  <Mug />
                </Egg>
                <div className="border border-white/8 bg-black/60 px-3 py-2 font-mono text-[10px] text-zinc-500">
                  ♪ lo-fi beats to debug to <span className="text-zinc-700">— 02:14</span>
                </div>
              </div>
              <p className="text-xl font-light text-zinc-200 md:text-2xl">The city sleeps. The cursor doesn&rsquo;t.</p>
            </Fade>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.34, 0.4, 0.62, 0.68]} className="w-full px-4 flex justify-center">
              <Terminal p={p} />
            </Fade>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.7, 0.76, 0.95, 1]} className="text-center">
              <p className="font-mono text-2xl text-emerald-400 md:text-4xl">✓ Build Successful</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                02:31 am · worth it
              </p>
            </Fade>
          </CenterStage>
        </>
      )}
    </Scene>
  )
}
