'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate, Stage, Sub } from '../core/Narration'
import { Egg } from '../core/EasterEgg'
import { useJourney } from '../core/JourneyContext'

function BoardingPass() {
  return (
    <div className="border border-dashed border-white/15 bg-[#111116] p-4 font-mono text-xs">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        <span>Boarding pass</span>
        <span className="text-amber-400/90">One way</span>
      </div>
      <p className="text-base text-zinc-200">BHULLAR / ARCHIT</p>
      <div className="mt-3 grid grid-cols-3 gap-3 text-zinc-400">
        <div>
          <p className="text-[10px] uppercase text-zinc-600">From</p>
          <p className="text-lg text-zinc-200">ATQ</p>
          <p className="text-[10px] text-zinc-600">Amritsar</p>
        </div>
        <div className="self-center text-center text-zinc-600">✈ →</div>
        <div>
          <p className="text-[10px] uppercase text-zinc-600">To</p>
          <p className="text-lg text-zinc-200">MEL</p>
          <p className="text-[10px] text-zinc-600">Melbourne</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-3 text-zinc-400">
        <div>
          <p className="text-[10px] uppercase text-zinc-600">Gate</p>
          <p>14</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-zinc-600">Seat</p>
          <p>32A · window</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-zinc-600">Baggage</p>
          <p>1 suitcase</p>
        </div>
      </div>
      <p className="mt-4 text-[10px] leading-relaxed text-zinc-600">
        Everything else stayed behind.
      </p>
    </div>
  )
}

function Suitcase({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden>
      <rect x="10" y="22" width="44" height="50" rx="5" fill="#131318" stroke="rgba(255,255,255,0.25)" />
      <rect x="24" y="10" width="16" height="12" rx="3" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <line x1="22" y1="22" x2="22" y2="72" stroke="rgba(255,255,255,0.12)" />
      <line x1="42" y1="22" x2="42" y2="72" stroke="rgba(255,255,255,0.12)" />
      <circle cx="20" cy="75" r="3" fill="#1c1c22" stroke="rgba(255,255,255,0.2)" />
      <circle cx="44" cy="75" r="3" fill="#1c1c22" stroke="rgba(255,255,255,0.2)" />
      <rect x="14" y="40" width="10" height="7" rx="1" fill="rgba(251,191,36,0.25)" />
    </svg>
  )
}

function Skyline({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const sunY = useTransform(p, [0, 0.55], ['62%', '30%'])
  const darken = useTransform(p, [0.6, 0.95], [0, 0.88])
  const farY = useTransform(p, [0, 1], ['0%', '6%'])

  return (
    <Stage>
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#4a1d06_0%,#7c2d12_28%,#b45309_55%,#d97706_72%,#1c1917_100%)]" />
      <motion.div
        className="absolute left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[#fbbf24] blur-[2px] md:h-32 md:w-32"
        style={{ top: reduced ? '38%' : sunY, boxShadow: '0 0 80px 30px rgba(251,146,60,0.35)' }}
      />
      <motion.svg
        viewBox="0 0 1200 260"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 h-[38vh] w-full"
        style={{ y: reduced ? 0 : farY }}
        aria-hidden
      >
        <g fill="#160c05" opacity="0.75">
          <rect x="0" y="190" width="1200" height="70" />
          <rect x="40" y="150" width="60" height="60" />
          <rect x="130" y="170" width="90" height="40" />
          <rect x="260" y="140" width="50" height="80" />
          <path d="M 340 200 h 140 v -34 h -140 z" />
          <rect x="900" y="150" width="70" height="60" />
          <rect x="1020" y="165" width="110" height="55" />
        </g>
        <g fill="#0d0703">
          <rect x="0" y="215" width="1200" height="45" />
          <path d="M 520 215 v -60 q 0 -10 10 -10 h 140 q 10 0 10 10 v 60 z" />
          <path d="M 600 148 q -32 0 -32 -30 q 0 -22 20 -30 q 2 -18 12 -18 q 10 0 12 18 q 20 8 20 30 q 0 30 -32 30 z" />
          <rect x="536" y="120" width="7" height="36" />
          <rect x="560" y="126" width="6" height="30" />
          <rect x="634" y="126" width="6" height="30" />
          <rect x="657" y="120" width="7" height="36" />
          <circle cx="539.5" cy="116" r="4" />
          <circle cx="660.5" cy="116" r="4" />
          <rect x="760" y="170" width="80" height="45" />
          <path d="M 800 170 q -18 0 -18 -16 q 0 -12 12 -16 q 1 -10 6 -10 q 5 0 6 10 q 12 4 12 16 q 0 16 -18 16 z" />
          <rect x="120" y="185" width="70" height="30" />
          <path d="M 155 185 q -14 0 -14 -13 q 0 -9 9 -12 q 1 -8 5 -8 q 4 0 5 8 q 9 3 9 12 q 0 13 -14 13 z" />
        </g>
      </motion.svg>
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: reduced ? 0 : darken }} />
    </Stage>
  )
}

function DepartureBoard() {
  const rows = [
    ['05:40', 'DXB', 'EK 619', 'DEPARTED'],
    ['06:15', 'SIN', 'SQ 403', 'DEPARTED'],
    ['07:05', 'MEL', 'AB 2022', 'BOARDING'],
    ['08:30', 'LHR', 'BA 256', 'ON TIME'],
    ['09:10', 'DEL', 'AI 454', 'DELAYED'],
  ]
  return (
    <div className="w-full max-w-md border border-white/10 bg-black/70 p-4 font-mono text-[11px] md:text-xs">
      <div className="mb-2 flex justify-between text-[10px] uppercase tracking-[0.25em] text-amber-500/90">
        <span>Departures</span>
        <span>Sri Guru Ram Dass Jee Intl</span>
      </div>
      <div className="space-y-1.5">
        {rows.map(([time, dest, flight, status]) => {
          const boarding = status === 'BOARDING'
          return (
            <div
              key={flight}
              className={`grid grid-cols-[3.2rem_3rem_1fr_auto] gap-2 ${boarding ? 'text-amber-300' : 'text-zinc-500'}`}
            >
              <span>{time}</span>
              <span>{dest}</span>
              <span>{flight}</span>
              <span className={boarding ? 'animate-pulse' : status === 'DELAYED' ? 'text-rose-400/70' : ''}>{status}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function S02LeavingHome() {
  return (
    <Scene index={2} title="Leaving Home" mood="dawn" height={480} className="bg-[#1c1917]">
      {(p) => {
        return (
          <>
            <Skyline p={p} />

            <CenterStage className="justify-end pb-[18vh]">
              <Slate p={p} at={[0.02, 0.07, 0.16, 0.22]}>
                Scene 02 · Amritsar, Punjab · sunrise
              </Slate>
              <div className="mt-5">
                <Line p={p} at={[0.06, 0.12, 0.18, 0.24]} size="xl">
                  Home.
                </Line>
              </div>
              <div className="mt-3">
                <Sub p={p} at={[0.12, 0.17, 0.2, 0.26]}>
                  Golden light. Busy streets. Family, everywhere.
                </Sub>
              </div>
            </CenterStage>

            <CenterStage>
              <Fade p={p} at={[0.26, 0.32, 0.42, 0.48]} className="flex flex-col items-center gap-6">
                <Egg
                  label="Open the boarding pass"
                  egg={{ title: 'Memory · the ticket', body: <BoardingPass /> }}
                >
                  <Suitcase className="h-28 w-24 md:h-36 md:w-28" />
                </Egg>
                <p className="max-w-xs text-lg font-light text-zinc-100 md:text-2xl">
                  Packing one life into one suitcase.
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  passport · boarding pass · everything else stays
                </p>
              </Fade>
            </CenterStage>

            <CenterStage>
              <Fade p={p} at={[0.5, 0.56, 0.66, 0.72]} className="flex w-full flex-col items-center gap-5">
                <DepartureBoard />
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  no dialogue · only the tannoy
                </p>
              </Fade>
            </CenterStage>

            <GateWalk p={p} />

            <CenterStage>
              <Line p={p} at={[0.86, 0.92, 0.97, 1]} size="lg" className="text-zinc-200">
                Leaving everything
                <br />
                familiar behind.
              </Line>
            </CenterStage>
          </>
        )
      }}
    </Scene>
  )
}

function GateWalk({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const x = useTransform(p, [0.72, 0.86], ['-30vw', '26vw'])
  const opacity = useTransform(p, [0.7, 0.74, 0.84, 0.88], [0, 1, 1, 0])

  if (reduced) return null
  return (
    <motion.div className="absolute inset-x-0 bottom-[18vh]" style={{ opacity }}>
      <div className="absolute right-[8vw] bottom-0 font-mono text-xs uppercase tracking-[0.3em] text-amber-300/80">
        Gate 14 →
      </div>
      <motion.div style={{ x }} className="flex justify-center">
        <Suitcase className="h-20 w-16 opacity-90" />
      </motion.div>
      <div className="mx-auto mt-2 h-px w-3/4 bg-white/10" />
    </motion.div>
  )
}
