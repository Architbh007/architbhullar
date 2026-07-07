'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate, Stage, Sub } from '../core/Narration'
import { Particles } from '../core/Particles'
import { useJourney } from '../core/JourneyContext'

function MelbourneSkyline({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const y = useTransform(p, [0, 1], ['0%', '8%'])
  const opacity = useTransform(p, [0, 0.05, 0.28, 0.36], [0, 1, 1, 0.12])

  return (
    <motion.svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 h-[46vh] w-full"
      style={{ y: reduced ? 0 : y, opacity: reduced ? 0.3 : opacity }}
      aria-hidden
    >
      <g fill="#0e141c">
        <rect x="60" y="120" width="70" height="180" />
        <rect x="150" y="170" width="50" height="130" />
        <rect x="230" y="90" width="64" height="210" />
        <path d="M 294 90 L 294 300 L 320 300 L 320 130 Z" />
        <rect x="360" y="150" width="80" height="150" />
        <rect x="470" y="60" width="56" height="240" />
        <path d="M 526 60 L 560 300 L 526 300 Z" />
        <polygon points="600,300 600,110 626,96 652,110 652,300" />
        <line x1="626" y1="96" x2="626" y2="30" stroke="#0e141c" strokeWidth="3" />
        <rect x="700" y="140" width="90" height="160" />
        <rect x="820" y="100" width="48" height="200" />
        <rect x="900" y="180" width="120" height="120" />
        <polygon points="1060,300 1060,190 1130,150 1130,300" />
      </g>
      <g fill="#f5d68a" opacity="0.35">
        {Array.from({ length: 60 }).map((_, i) => (
          <rect key={i} x={70 + ((i * 97) % 1050)} y={110 + ((i * 53) % 170)} width="3" height="4" />
        ))}
      </g>
    </motion.svg>
  )
}

function EmptyRoom() {
  return (
    <svg viewBox="0 0 360 200" className="w-full max-w-md" aria-hidden>
      <g stroke="rgba(226,232,240,0.35)" strokeWidth="1.2" fill="none">
        <path d="M 20 40 L 180 20 L 340 40" />
        <path d="M 20 40 L 20 180 L 340 180 L 340 40" />
        <path d="M 20 180 L 180 196 L 340 180" />
        <rect x="230" y="52" width="70" height="86" opacity="0.7" />
        <line x1="230" y1="95" x2="300" y2="95" opacity="0.5" />
      </g>
      <g>
        <rect x="48" y="140" width="120" height="18" rx="3" fill="#141821" stroke="rgba(226,232,240,0.3)" />
        <rect x="52" y="132" width="40" height="10" rx="3" fill="#10131a" stroke="rgba(226,232,240,0.2)" />
      </g>
      <g>
        <rect x="196" y="110" width="26" height="48" rx="3" fill="#10131a" stroke="rgba(226,232,240,0.3)" />
        <rect x="203" y="104" width="12" height="7" rx="2" fill="none" stroke="rgba(226,232,240,0.3)" />
      </g>
      <g>
        <path d="M 120 176 L 150 176 L 148 168 L 122 168 Z" fill="#10131a" stroke="rgba(226,232,240,0.35)" />
        <rect x="123" y="152" width="24" height="16" rx="1.5" fill="#0b0e14" stroke="rgba(226,232,240,0.35)" />
        <rect x="125" y="154" width="20" height="12" fill="rgba(125,163,196,0.28)">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </rect>
      </g>
      <circle cx="262" cy="70" r="8" fill="rgba(226,232,240,0.12)" />
    </svg>
  )
}

function MapWalk({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const draw = useTransform(p, [0.62, 0.82], [0, 1])

  return (
    <div className="w-full max-w-md">
      <svg viewBox="0 0 360 140" className="w-full" aria-hidden>
        <g stroke="rgba(148,163,184,0.14)" strokeWidth="6" strokeLinecap="round">
          <line x1="0" y1="40" x2="360" y2="34" />
          <line x1="0" y1="92" x2="360" y2="100" />
          <line x1="80" y1="0" x2="70" y2="140" />
          <line x1="210" y1="0" x2="220" y2="140" />
          <line x1="300" y1="0" x2="295" y2="140" />
        </g>
        <circle cx="40" cy="66" r="5" fill="#7dd3fc" />
        <text x="40" y="54" fill="rgba(148,163,184,0.8)" fontSize="9" fontFamily="monospace" textAnchor="middle">flat</text>
        <circle cx="322" cy="66" r="5" fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
        <text x="322" y="54" fill="rgba(148,163,184,0.8)" fontSize="9" fontFamily="monospace" textAnchor="middle">station</text>
        <motion.path
          d="M 48 66 L 120 62 L 150 96 L 240 96 L 262 66 L 314 66"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: reduced ? 1 : draw }}
        />
      </svg>
    </div>
  )
}

export function S04FirstDays() {
  return (
    <Scene index={4} title="First Days" mood="cold" height={430} className="bg-[linear-gradient(to_bottom,#05080d,#0a1017_60%,#0d141d)]">
      {(p) => (
        <>
          <MelbourneSkyline p={p} />
          <Particles mode="snow" count={70} color="200,215,235" className="opacity-70" />

          <CenterStage>
            <Slate p={p} at={[0.02, 0.07, 0.2, 0.26]}>
              Scene 04 · Melbourne · week one
            </Slate>
            <div className="mt-6">
              <Line p={p} at={[0.06, 0.12, 0.2, 0.27]} size="lg">
                Cold air. New city.
              </Line>
            </div>
            <div className="mt-4">
              <Sub p={p} at={[0.13, 0.18, 0.22, 0.28]}>
                Everything felt unfamiliar. Even the light.
              </Sub>
            </div>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.32, 0.38, 0.52, 0.58]} className="flex w-full flex-col items-center gap-6">
              <EmptyRoom />
              <div className="space-y-1 text-center">
                <p className="text-xl font-light text-zinc-200 md:text-2xl">One suitcase. A mattress.</p>
                <p className="text-xl font-light text-zinc-200 md:text-2xl">A laptop on the floor.</p>
              </div>
            </Fade>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.6, 0.66, 0.8, 0.85]} className="flex w-full flex-col items-center gap-5">
              <MapWalk p={p} />
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                google maps · myki card · wrong tram, twice
              </p>
            </Fade>
          </CenterStage>

          <CenterStage>
            <div className="space-y-3">
              <Line p={p} at={[0.86, 0.91, 0.97, 1]} size="xl">
                No shortcuts.
              </Line>
              <Line p={p} at={[0.9, 0.95, 0.99, 1]} size="xl" className="text-zinc-400">
                Only learning.
              </Line>
            </div>
          </CenterStage>
        </>
      )}
    </Scene>
  )
}
