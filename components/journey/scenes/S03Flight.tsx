'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { Scene, useNearViewport } from '../core/Scene'
import { CenterStage, Fade, Line, Slate, Stage } from '../core/Narration'
import { Particles } from '../core/Particles'
import { Egg } from '../core/EasterEgg'
import { useJourney } from '../core/JourneyContext'

const FlightGlobe = dynamic(() => import('./FlightGlobe'), { ssr: false })

function RouteReplay() {
  return (
    <div>
      <svg viewBox="0 0 320 160" className="w-full" aria-hidden>
        <circle cx="46" cy="44" r="4" fill="#fbbf24" />
        <circle cx="274" cy="122" r="4" fill="#7dd3fc" />
        <motion.path
          d="M 46 44 Q 170 -14 274 122"
          fill="none"
          stroke="#e2e2e8"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
        />
        <text x="46" y="30" fill="#fbbf24" fontSize="10" fontFamily="monospace" textAnchor="middle">ATQ</text>
        <text x="274" y="142" fill="#7dd3fc" fontSize="10" fontFamily="monospace" textAnchor="middle">MEL</text>
      </svg>
      <p className="mt-3 font-mono text-[11px] leading-relaxed text-zinc-500">
        ~9,800 km. One stopover. Fourteen hours of window seat.
        <br />
        The route replays; the decision only happened once.
      </p>
    </div>
  )
}

function Window({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const day = useTransform(p, [0.08, 0.3], [1, 0])
  const night = useTransform(p, [0.22, 0.4], [0, 1])
  const cloudY = useTransform(p, [0, 0.5], ['0%', '30%'])
  const cityLights = useTransform(p, [0.34, 0.44], [0, 1])
  const windowOpacity = useTransform(p, [0, 0.04, 0.46, 0.56], [0, 1, 1, 0])

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: reduced ? 1 : windowOpacity }}>
      <div className="relative h-[58vh] w-[72vw] max-w-md overflow-hidden rounded-[46px] border-[10px] border-[#131318] bg-[#0f172a] shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_0_120px_rgba(0,0,0,0.9)] md:h-[62vh]">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0b1120_0%,#1e3a5f_55%,#7295b8_100%)]" style={{ opacity: 1 }} />
        <motion.div className="absolute inset-0 bg-[linear-gradient(to_bottom,#7dd3fc_0%,#bae6fd_60%,#fde68a_100%)]" style={{ opacity: reduced ? 0.5 : day }} />
        <motion.div className="absolute inset-0 bg-[linear-gradient(to_bottom,#020617_0%,#0b1120_70%,#1e293b_100%)]" style={{ opacity: reduced ? 0 : night }} />

        <motion.div className="absolute inset-0" style={{ y: reduced ? 0 : cloudY }}>
          {[
            { top: '30%', left: '-20%', w: 150, d: 46 },
            { top: '48%', left: '10%', w: 210, d: 62 },
            { top: '62%', left: '-10%', w: 120, d: 38 },
          ].map((c, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/50 blur-xl"
              style={{ top: c.top, left: c.left, width: c.w, height: c.w / 3.2 }}
              animate={reduced ? undefined : { x: ['0%', '260%'] }}
              transition={{ duration: c.d, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: reduced ? 0.6 : night }}>
          <Particles mode="stars" count={70} />
        </motion.div>

        <motion.div className="absolute inset-x-0 bottom-0 h-1/4" style={{ opacity: reduced ? 0.6 : cityLights }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-0.5 w-0.5 rounded-full"
              style={{
                left: `${(i * 61) % 97}%`,
                top: `${28 + ((i * 37) % 65)}%`,
                background: i % 4 === 0 ? '#fbbf24' : '#fde68a',
                opacity: 0.5 + ((i * 13) % 40) / 100,
              }}
            />
          ))}
        </motion.div>

        <svg viewBox="0 0 100 40" className="absolute bottom-0 left-0 w-3/4" aria-hidden>
          <path d="M 0 40 L 0 26 L 62 34 L 100 40 Z" fill="#0a0a0d" />
        </svg>
      </div>
    </motion.div>
  )
}

export function S03Flight() {
  const pr = useRef({ v: 0 })
  const stageRef = useRef<HTMLDivElement>(null)
  const near = useNearViewport(stageRef)

  return (
    <Scene index={3} title="The Flight" mood="cabin" height={560} className="bg-[#05070f]">
      {(p) => (
        <FlightInner p={p} pr={pr} stageRef={stageRef} near={near} />
      )}
    </Scene>
  )
}

function FlightInner({
  p,
  pr,
  stageRef,
  near,
}: {
  p: MotionValue<number>
  pr: { current: { v: number } }
  stageRef: React.RefObject<HTMLDivElement | null>
  near: boolean
}) {
  const { reduced } = useJourney()
  useMotionValueEvent(p, 'change', (v) => {
    pr.current.v = Math.min(1, Math.max(0, (v - 0.5) / 0.36))
  })
  const globeOpacity = useTransform(p, [0.5, 0.58, 0.86, 0.93], [0, 1, 1, 0])
  const landingOpacity = useTransform(p, [0.9, 0.95, 1, 1], [0, 1, 1, 1])

  return (
    <div ref={stageRef} className="absolute inset-0">
      <Window p={p} />

      <CenterStage className="justify-end pb-[16vh]">
        <Slate p={p} at={[0.02, 0.06, 0.14, 0.18]}>
          Scene 03 · seat 32A · window
        </Slate>
        <div className="mt-4 space-y-2">
          <Line p={p} at={[0.08, 0.13, 0.19, 0.24]} size="sm" className="text-zinc-300">
            Clouds. Time passing.
          </Line>
          <Line p={p} at={[0.24, 0.29, 0.37, 0.42]} size="sm" className="text-zinc-300">
            Day becomes night.
          </Line>
          <Line p={p} at={[0.4, 0.45, 0.5, 0.55]} size="sm" className="text-zinc-300">
            City lights, ten kilometres down.
          </Line>
        </div>
      </CenterStage>

      <motion.div className="absolute inset-0" style={{ opacity: reduced ? 1 : globeOpacity }}>
        {(near || reduced) && (
          <div className="absolute inset-0">
            <FlightGlobe pr={pr.current} />
          </div>
        )}
        <div className="absolute inset-x-0 top-[14vh] flex flex-col items-center gap-3 text-center">
          <Slate p={p} at={[0.54, 0.6, 0.82, 0.88]}>
            31.63°N 74.87°E → 37.81°S 144.96°E
          </Slate>
          <Fade p={p} at={[0.58, 0.64, 0.8, 0.86]} y={10}>
            <Egg label="Replay the route" egg={{ title: 'Memory · the crossing', body: <RouteReplay /> }}>
              <span className="font-mono text-xs text-zinc-500 underline decoration-white/20 underline-offset-4">
                ✈ replay the crossing
              </span>
            </Egg>
          </Fade>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#05070f]"
        style={{ opacity: reduced ? 0 : landingOpacity }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">now arriving</p>
        <p className="text-4xl font-light tracking-tight text-zinc-100 md:text-6xl">Melbourne.</p>
        <svg viewBox="0 0 200 60" className="w-56 opacity-80" aria-hidden>
          {Array.from({ length: 7 }).map((_, i) => {
            const t = i / 6
            return (
              <g key={i}>
                <circle cx={100 - 8 - 52 * t} cy={8 + t * 48} r={1.2 + t * 1.4} fill="#fbbf24" opacity={0.4 + t * 0.6} />
                <circle cx={100 + 8 + 52 * t} cy={8 + t * 48} r={1.2 + t * 1.4} fill="#fbbf24" opacity={0.4 + t * 0.6} />
              </g>
            )
          })}
        </svg>
      </motion.div>
    </div>
  )
}
