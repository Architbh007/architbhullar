'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate } from '../core/Narration'
import { useJourney } from '../core/JourneyContext'

const AUS_PATH =
  'M 95 95 C 60 120 35 170 45 215 C 55 255 90 275 130 268 C 160 262 175 270 200 278 C 230 286 252 298 272 291 L 284 279 C 305 283 330 260 340 235 C 352 205 350 170 335 140 C 322 112 302 82 278 66 L 270 42 L 256 70 C 242 84 232 70 227 56 L 216 36 C 192 26 168 40 152 55 C 132 66 112 80 95 95 Z'

const NODES: Array<{ x: number; y: number; label: string }> = [
  { x: 272, y: 288, label: 'MEL' },
  { x: 330, y: 252, label: 'SYD' },
  { x: 344, y: 192, label: 'BNE' },
  { x: 228, y: 262, label: 'ADL' },
  { x: 62, y: 222, label: 'PER' },
  { x: 212, y: 42, label: 'DRW' },
]

const FLOWS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [2, 5],
]

function AusMap({ p, phase }: { p: MotionValue<number>; phase: 'grid' | 'ev' }) {
  const { reduced } = useJourney()
  const draw = useTransform(p, phase === 'grid' ? [0.08, 0.22] : [0.55, 0.62], [0, 1])
  const accent = phase === 'grid' ? '#34d399' : '#7dd3fc'

  return (
    <svg viewBox="0 0 400 340" className="w-[78vw] max-w-md" aria-hidden>
      <motion.path
        d={AUS_PATH}
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(226,232,240,0.3)"
        strokeWidth="1.4"
        style={{ pathLength: reduced ? 1 : draw }}
      />
      <path d="M 282 310 q 10 -6 18 0 q 4 8 -4 14 q -12 4 -16 -4 z" fill="rgba(255,255,255,0.025)" stroke="rgba(226,232,240,0.3)" strokeWidth="1.2" />
      {FLOWS.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke={accent}
          strokeWidth="1"
          strokeDasharray="3 5"
          opacity="0.5"
        >
          {!reduced && (
            <animate attributeName="stroke-dashoffset" from="16" to="0" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" />
          )}
        </line>
      ))}
      {NODES.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="3.4" fill={accent}>
            {!reduced && <animate attributeName="opacity" values="1;0.45;1" dur="2.2s" repeatCount="indefinite" />}
          </circle>
          {phase === 'ev' && (
            <text x={n.x} y={n.y - 7} textAnchor="middle" fontSize="8" fontFamily="monospace" fill={accent} opacity="0.9">
              ⚡
            </text>
          )}
          <text x={n.x + 8} y={n.y + 3} fontSize="8" fontFamily="monospace" fill="rgba(148,163,184,0.7)">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function Leaderboard() {
  const rows: Array<[string, string, number]> = [
    ['VIC', '4.1 GW', 8],
    ['NSW', '3.8 GW', 7],
    ['QLD', '3.2 GW', 6],
    ['SA', '2.4 GW', 9],
    ['TAS', '1.1 GW', 10],
  ]
  return (
    <div className="w-64 border border-white/10 bg-black/70 p-4 font-mono text-[11px]">
      <p className="mb-2.5 text-[10px] uppercase tracking-[0.25em] text-emerald-400/80">renewables · live</p>
      <div className="space-y-1.5">
        {rows.map(([state, val, meter]) => (
          <div key={state} className="grid grid-cols-[2.4rem_1fr_3.4rem] items-baseline gap-2 text-zinc-500">
            <span className="text-zinc-300">{state}</span>
            <span className="tracking-tighter text-emerald-400/60">
              [{'='.repeat(meter)}{'-'.repeat(10 - meter)}]
            </span>
            <span className="text-right">{val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EvatChat() {
  return (
    <div className="w-full max-w-sm space-y-2.5 font-mono text-[11px]">
      <div className="ml-10 border border-white/10 bg-[#10131a] p-3 text-zinc-300">
        closest fast charger without a queue?
      </div>
      <div className="mr-10 border border-sky-400/20 bg-[#0a1119] p-3 text-zinc-400">
        Rosanna Station — 2 bays free, 350 kW. Adding it to your route. <span className="text-sky-300">⚡</span>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {['intent: find_charger', 'entities: fast, no_queue', 'source: live availability'].map((chip) => (
          <span key={chip} className="border border-white/8 px-2 py-0.5 text-[9px] uppercase tracking-widest text-zinc-600">
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

export function S13Bigger() {
  return (
    <Scene index={13} title="GridRace → EVAT" mood="pulse" height={520} className="bg-[#06080b]">
      {(p) => (
        <>
          <CenterStage className="justify-start pt-[15vh]">
            <Slate p={p} at={[0.02, 0.06, 0.42, 0.47]}>
              Scene 13 · the projects grew up
            </Slate>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.06, 0.12, 0.4, 0.46]} className="flex flex-col items-center gap-4 md:flex-row md:gap-10">
              <AusMap p={p} phase="grid" />
              <div className="flex flex-col items-center gap-3">
                <Leaderboard />
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  GridRace · the national grid, live
                </p>
              </div>
            </Fade>
          </CenterStage>

          <CenterStage>
            <Line p={p} at={[0.47, 0.51, 0.55, 0.58]} size="md" className="text-zinc-300">
              Then the map changed meaning.
            </Line>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.58, 0.64, 0.82, 0.87]} className="flex flex-col items-center gap-5 md:flex-row md:gap-10">
              <AusMap p={p} phase="ev" />
              <div className="flex flex-col items-center gap-3 px-4">
                <EvatChat />
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  EVAT · an ecosystem for electric vehicles
                </p>
              </div>
            </Fade>
          </CenterStage>

          <CenterStage>
            <Line p={p} at={[0.88, 0.93, 0.98, 1]} size="lg">
              Building software
              <br />
              <span className="text-zinc-400">for real users.</span>
            </Line>
          </CenterStage>
        </>
      )}
    </Scene>
  )
}
