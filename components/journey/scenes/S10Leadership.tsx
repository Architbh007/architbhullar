'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate } from '../core/Narration'
import { Egg } from '../core/EasterEgg'
import { useJourney } from '../core/JourneyContext'

const ACTIVITY = [
  'merged #142 — feat: auth flow',
  'review: LGTM ✓ two nits',
  'opened #147 — fix: race in scheduler',
  'assigned @junior-dev — good first issue',
  'review: “what happens if this is null?”',
  'merged #151 — docs: onboarding guide',
]

function ActivityStream() {
  const { reduced } = useJourney()
  if (reduced) return null
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[12vh] h-24 overflow-hidden" aria-hidden>
      {ACTIVITY.map((line, i) => (
        <motion.p
          key={line}
          className="absolute whitespace-nowrap font-mono text-[10px] text-zinc-600/80"
          style={{ top: `${(i * 37) % 90}%` }}
          animate={{ x: ['104vw', '-64vw'] }}
          transition={{ duration: 22 + (i % 3) * 7, repeat: Infinity, ease: 'linear', delay: i * 3.4 }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  )
}

function Table() {
  return (
    <svg viewBox="0 0 200 110" className="w-64 md:w-72" aria-hidden>
      <ellipse cx="100" cy="58" rx="46" ry="20" fill="none" stroke="rgba(226,232,240,0.25)" strokeWidth="1.4" />
      <circle cx="100" cy="30" r="4.5" fill="#fbbf24" />
      {[
        [58, 50], [70, 74], [100, 84], [130, 74], [142, 50],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.2" fill="rgba(203,213,225,0.55)" />
      ))}
      <path d="M 78 20 h 44 v -12 h -44 z" fill="none" stroke="rgba(226,232,240,0.2)" strokeDasharray="2 2" />
    </svg>
  )
}

function Architecture({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const draw = useTransform(p, [0.36, 0.52], [0, 1])
  const boxes: Array<[number, number, string]> = [
    [20, 16, 'client'],
    [140, 16, 'api'],
    [20, 78, 'queue'],
    [140, 78, 'db'],
    [80, 47, 'core'],
  ]
  return (
    <svg viewBox="0 0 220 120" className="w-72 md:w-80" aria-hidden>
      {boxes.map(([x, y, label]) => (
        <g key={label}>
          <rect x={x} y={y} width="60" height="26" fill="#0d0f15" stroke="rgba(226,232,240,0.35)" strokeWidth="1.2" />
          <text x={x + 30} y={y + 17} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(203,213,225,0.75)">
            {label}
          </text>
        </g>
      ))}
      {[
        'M 80 29 L 140 29',
        'M 50 42 L 50 78',
        'M 170 42 L 170 78',
        'M 80 60 L 80 60 L 50 78',
        'M 140 60 L 170 78',
        'M 110 47 L 110 29',
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="rgba(139,124,245,0.7)"
          strokeWidth="1.3"
          style={{ pathLength: reduced ? 1 : draw }}
        />
      ))}
    </svg>
  )
}

function SketchesEgg() {
  return (
    <div>
      <svg viewBox="0 0 320 180" className="w-full" aria-hidden>
        <rect x="2" y="2" width="316" height="176" fill="#0f0f13" stroke="rgba(226,232,240,0.15)" />
        <g stroke="rgba(226,232,240,0.5)" strokeWidth="1.1" fill="none">
          <path d="M 30 40 q 2 -3 5 -2 l 50 0 q 3 1 2 4 l 0 22 q -1 3 -4 3 l -49 0 q -4 -1 -4 -4 z" />
          <path d="M 130 30 q 30 -8 60 0 q 8 20 0 40 q -30 8 -60 0 q -8 -20 0 -40 z" />
          <path d="M 245 42 l 48 0 l 0 28 l -48 0 z" transform="rotate(-2 269 56)" />
          <path d="M 88 52 C 110 52 112 50 128 50" strokeDasharray="3 3" />
          <path d="M 192 50 C 220 50 224 54 243 54" strokeDasharray="3 3" />
          <path d="M 60 70 C 60 110 100 116 150 118" />
          <path d="M 160 72 q 4 40 -6 44" strokeDasharray="2 3" />
          <ellipse cx="170" cy="130" rx="34" ry="14" />
        </g>
        <text x="55" y="30" fontSize="9" fontFamily="monospace" fill="rgba(148,163,184,0.7)">ingest?</text>
        <text x="150" y="24" fontSize="9" fontFamily="monospace" fill="rgba(148,163,184,0.7)">core (rewrite??)</text>
        <text x="252" y="36" fontSize="9" fontFamily="monospace" fill="rgba(148,163,184,0.7)">cache</text>
        <text x="140" y="156" fontSize="9" fontFamily="monospace" fill="rgba(251,191,36,0.75)">simpler. do the simpler one.</text>
      </svg>
      <p className="mt-3 font-mono text-[11px] leading-relaxed text-zinc-500">
        Notebook, page 34. Three architectures; the crossed-out ones taught the most.
      </p>
    </div>
  )
}

function ReviewCard() {
  return (
    <div className="w-full max-w-sm border border-white/10 bg-[#0b0d12] p-4 font-mono text-[11px]">
      <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-zinc-600">pull request #147 · review</p>
      <p className="text-zinc-500"><span className="text-rose-400/80">-</span>  if (user) doThing(user)</p>
      <p className="text-zinc-400"><span className="text-emerald-400/80">+</span>  if (!user) return logMissing()</p>
      <p className="text-zinc-400"><span className="text-emerald-400/80">+</span>  doThing(user)</p>
      <p className="mt-3 border-t border-white/8 pt-2 text-zinc-500">
        “nice catch — what happens when the queue retries this?” <span className="text-emerald-400/80">✓ approved</span>
      </p>
    </div>
  )
}

export function S10Leadership() {
  return (
    <Scene index={10} title="Leadership" mood="hum" height={420} className="bg-[#090a0e]">
      {(p) => (
        <>
          <ActivityStream />

          <CenterStage className="justify-start pt-[15vh]">
            <Slate p={p} at={[0.02, 0.06, 0.88, 0.94]}>
              Scene 10 · nobody announced it
            </Slate>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.06, 0.12, 0.26, 0.32]} className="flex flex-col items-center gap-4">
              <Table />
              <p className="text-xl font-light text-zinc-100 md:text-2xl">People started gathering.</p>
            </Fade>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.34, 0.4, 0.52, 0.58]} className="flex flex-col items-center gap-4">
              <Egg label="Open the notebook" egg={{ title: 'Memory · the notebook', body: <SketchesEgg /> }}>
                <Architecture p={p} />
              </Egg>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                planning · diagrams · the notebook knows more
              </p>
            </Fade>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.6, 0.66, 0.78, 0.83]} className="flex w-full flex-col items-center gap-4 px-4">
              <ReviewCard />
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                reviewing · mentoring · unblocking
              </p>
            </Fade>
          </CenterStage>

          <CenterStage>
            <div className="space-y-2">
              <Line p={p} at={[0.85, 0.9, 0.97, 1]} size="lg">
                Leadership isn&rsquo;t a title.
              </Line>
              <Line p={p} at={[0.89, 0.94, 0.99, 1]} size="lg" className="text-zinc-400">
                It&rsquo;s responsibility.
              </Line>
            </div>
          </CenterStage>
        </>
      )}
    </Scene>
  )
}
