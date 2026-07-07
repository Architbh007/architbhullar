'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'
import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate } from '../core/Narration'
import { Egg } from '../core/EasterEgg'
import { useJourney } from '../core/JourneyContext'

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className="flex h-[52vh] w-[60vw] flex-shrink-0 flex-col border border-white/8 bg-[#0b0d12]">
      <div className="flex flex-1 items-center justify-center p-6">{children}</div>
      <p className="border-t border-white/8 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
        {caption}
      </p>
    </div>
  )
}

function PhoneAlarm({ time = '04:30' }: { time?: string }) {
  return (
    <div className="relative h-44 w-24 rounded-xl border border-white/15 bg-black p-2">
      <div className="flex h-full flex-col items-center justify-center rounded-lg bg-[#0d0f16]">
        <p className="font-mono text-2xl text-zinc-100">{time}</p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-amber-400">alarm</p>
        <p className="mt-4 font-mono text-[9px] text-zinc-600">snooze · dismiss</p>
      </div>
      <div className="absolute -inset-3 -z-10 rounded-2xl bg-zinc-100/5 blur-xl" />
    </div>
  )
}

function Forklift() {
  return (
    <svg viewBox="0 0 120 80" className="h-32 w-auto" aria-hidden>
      <g fill="#151a22" stroke="rgba(226,232,240,0.3)" strokeWidth="1.5">
        <rect x="30" y="34" width="40" height="24" rx="3" />
        <path d="M 42 34 L 46 20 L 64 20 L 68 34 Z" />
        <circle cx="40" cy="64" r="8" />
        <circle cx="66" cy="64" r="8" />
        <line x1="80" y1="12" x2="80" y2="66" />
        <line x1="80" y1="60" x2="106" y2="60" />
        <line x1="80" y1="48" x2="102" y2="48" />
      </g>
      <rect x="84" y="38" width="16" height="10" fill="#1c2230" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
      <circle cx="52" cy="16" r="2.5" fill="#fbbf24">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

function ScannerVisual() {
  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 90 110" className="h-32 w-auto" aria-hidden>
        <g fill="#151a22" stroke="rgba(226,232,240,0.35)" strokeWidth="1.5">
          <rect x="25" y="10" width="40" height="34" rx="4" />
          <path d="M 32 44 L 36 96 Q 36 102 42 102 L 48 102 Q 54 102 54 96 L 58 44 Z" />
        </g>
        <rect x="31" y="16" width="28" height="14" fill="#0c1a12" stroke="rgba(52,211,153,0.5)" strokeWidth="1" />
        <text x="45" y="26" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#34d399">SCAN OK</text>
        <line x1="45" y1="6" x2="45" y2="10" stroke="#f87171" strokeWidth="2">
          <animate attributeName="opacity" values="1;0;1" dur="0.9s" repeatCount="indefinite" />
        </line>
      </svg>
      <p className="font-mono text-[10px] text-zinc-600">beep. beep. beep.</p>
    </div>
  )
}

function Pallets() {
  return (
    <svg viewBox="0 0 140 100" className="h-32 w-auto" aria-hidden>
      {[
        [10, 66], [46, 66], [82, 66],
        [28, 40], [64, 40],
        [46, 14],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="32" height="24" fill="#141821" stroke="rgba(226,232,240,0.25)" strokeWidth="1.2" />
          <line x1={x + 6} y1={y + 8} x2={x + 26} y2={y + 8} stroke="rgba(226,232,240,0.12)" />
          <text x={x + 16} y={y + 19} textAnchor="middle" fontSize="6" fontFamily="monospace" fill="rgba(148,163,184,0.5)">
            FRAGILE
          </text>
        </g>
      ))}
      <line x1="0" y1="92" x2="140" y2="92" stroke="rgba(226,232,240,0.2)" />
    </svg>
  )
}

function ClockJump() {
  return (
    <div className="flex items-center gap-5 font-mono">
      <span className="text-3xl text-zinc-500 line-through decoration-zinc-700">05:00</span>
      <span className="text-zinc-600">→</span>
      <span className="text-4xl text-zinc-100">13:07</span>
    </div>
  )
}

function TrainWindow() {
  return (
    <div className="relative h-36 w-64 overflow-hidden rounded-md border border-white/12 bg-[#0d1117]">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-zinc-500/40"
          style={{ top: `${12 + i * 10}%`, width: 30 + ((i * 23) % 50) }}
          animate={{ x: ['110%', '-160%'] }}
          transition={{ duration: 0.9 + (i % 4) * 0.25, repeat: Infinity, ease: 'linear', delay: i * 0.13 }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-[#0a0d12]" />
      <p className="absolute bottom-1.5 left-3 font-mono text-[9px] uppercase tracking-widest text-zinc-600">
        craigieburn line · to city
      </p>
    </div>
  )
}

function LectureHall() {
  return (
    <svg viewBox="0 0 160 90" className="h-32 w-auto" aria-hidden>
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <path
            d={`M ${20 - row * 5} ${28 + row * 16} Q 80 ${20 + row * 16} ${140 + row * 5} ${28 + row * 16}`}
            fill="none"
            stroke="rgba(226,232,240,0.22)"
            strokeWidth="1.5"
          />
          {Array.from({ length: 7 + row }).map((_, i) => {
            const n = 7 + row
            const x = 22 - row * 4 + (i * (116 + row * 8)) / (n - 1)
            return <circle key={i} cx={x} cy={24 + row * 16} r="2.4" fill="rgba(148,163,184,0.45)" />
          })}
        </g>
      ))}
      <rect x="55" y="78" width="50" height="6" fill="rgba(226,232,240,0.18)" />
    </svg>
  )
}

function LibraryNight() {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 120 80" className="h-28 w-auto" aria-hidden>
        <path d="M 30 22 L 50 10 L 52 14 L 34 25 Z" fill="#1a1f2a" stroke="rgba(226,232,240,0.3)" />
        <line x1="50" y1="12" x2="60" y2="34" stroke="rgba(226,232,240,0.3)" />
        <path d="M 44 34 Q 60 22 76 34 L 72 40 Q 60 32 48 40 Z" fill="rgba(251,191,36,0.14)" />
        <rect x="20" y="52" width="80" height="6" fill="#141821" stroke="rgba(226,232,240,0.25)" />
        {[26, 40, 54, 68, 82].map((x, i) => (
          <rect key={i} x={x} y={38 + (i % 2) * 3} width="9" height={14 - (i % 2) * 3} fill="#10141c" stroke="rgba(226,232,240,0.22)" />
        ))}
      </svg>
      <p className="font-mono text-[10px] text-zinc-600">level 3 · quiet zone · 23:40</p>
    </div>
  )
}

const LOOP = ['alarm', 'warehouse', 'train', 'lecture', 'library', 'sleep']

function SemesterRow({ p, label, window: w }: { p: MotionValue<number>; label: string; window: [number, number] }) {
  const { reduced } = useJourney()
  const x = useTransform(p, w, ['0%', '100%'])
  return (
    <div className="flex items-center gap-4">
      <span className="w-24 flex-shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        {label}
      </span>
      <div className="relative flex flex-1 justify-between overflow-hidden border border-white/8 bg-[#0b0d12] px-4 py-2.5">
        {!reduced && (
          <motion.div className="absolute inset-y-0 left-[-18%] w-[18%] bg-zinc-100/10" style={{ x }} />
        )}
        {LOOP.map((step) => (
          <span key={step} className="relative font-mono text-[9px] uppercase tracking-widest text-zinc-500 md:text-[10px]">
            {step}
          </span>
        ))}
      </div>
    </div>
  )
}

export function S05DailyGrind() {
  return (
    <Scene index={5} title="The Daily Grind" mood="hum" height={560} className="bg-[#08090c]">
      {(p) => <GrindInner p={p} />}
    </Scene>
  )
}

function GrindInner({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const x = useTransform(p, [0.08, 0.66], ['0%', '-87%'])
  const stripOpacity = useTransform(p, [0.02, 0.06, 0.64, 0.7], [0, 1, 1, 0])

  const frames = (
    <>
      <Frame caption="04:30 · the alarm">
        <PhoneAlarm />
      </Frame>
      <Frame caption="getting ready in the dark">
        <div className="relative h-36 w-56 bg-[#07080b]">
          <div className="absolute bottom-0 left-1/2 h-24 w-10 -translate-x-1/2 rounded-t-full bg-[#101319]" />
          <div className="absolute right-6 top-6 h-8 w-8 rounded-sm bg-amber-200/10 shadow-[0_0_30px_10px_rgba(251,191,36,0.08)]" />
        </div>
      </Frame>
      <Frame caption="warehouse doors · 04:58">
        <svg viewBox="0 0 140 90" className="h-32 w-auto" aria-hidden>
          <rect x="10" y="10" width="120" height="70" fill="#0c0f14" stroke="rgba(226,232,240,0.25)" />
          {[22, 34, 46].map((y) => (
            <line key={y} x1="14" y1={y} x2="126" y2={y} stroke="rgba(226,232,240,0.18)" />
          ))}
          <rect x="10" y="52" width="120" height="28" fill="#12161d" />
          <line x1="70" y1="52" x2="70" y2="80" stroke="rgba(251,191,36,0.4)" strokeDasharray="3 3" />
        </svg>
      </Frame>
      <Frame caption="forklifts">
        <Forklift />
      </Frame>
      <Frame caption="scanning boxes">
        <Egg
          label="A memory from the warehouse"
          egg={{
            title: 'Memory · first job',
            body: (
              <p className="text-sm leading-relaxed text-zinc-400">
                First job in Melbourne: warehouse associate, 4:30 AM starts. I learned inventory
                systems, throughput, and exactly how heavy &ldquo;lightweight packaging&rdquo; is.
                The scanner beeped roughly two thousand times a shift.
                <br />
                <br />
                I still hear it sometimes. It sounds like rent getting paid.
              </p>
            ),
          }}
        >
          <ScannerVisual />
        </Egg>
      </Frame>
      <Frame caption="stacking pallets">
        <Pallets />
      </Frame>
      <Frame caption="the clock jumps">
        <ClockJump />
      </Frame>
      <Frame caption="train to university">
        <TrainWindow />
      </Frame>
      <Frame caption="lecture theatre">
        <LectureHall />
      </Frame>
      <Frame caption="assignments · coding · library">
        <LibraryNight />
      </Frame>
      <Frame caption="home · sleep">
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-40 rounded-sm border border-white/10 bg-[#0b0d12]" />
          <p className="font-mono text-lg text-zinc-500">z z z</p>
        </div>
      </Frame>
      <Frame caption="04:30 · again">
        <PhoneAlarm />
      </Frame>
    </>
  )

  return (
    <>
      <CenterStage className="justify-start pt-[16vh]">
        <Slate p={p} at={[0.01, 0.04, 0.62, 0.68]}>
          Scene 05 · the loop · warehouse → university
        </Slate>
      </CenterStage>

      {reduced ? (
        <div className="absolute inset-x-0 top-[22vh] flex flex-wrap justify-center gap-4 px-6">
          {frames}
        </div>
      ) : (
        <motion.div className="absolute inset-x-0 top-1/2 -translate-y-1/2" style={{ opacity: stripOpacity }}>
          <motion.div className="flex w-max gap-[4vw] pl-[20vw]" style={{ x }}>
            {frames}
          </motion.div>
        </motion.div>
      )}

      <CenterStage>
        <Fade p={p} at={[0.72, 0.78, 0.88, 0.92]} className="w-full max-w-xl space-y-3 px-2">
          <p className="mb-6 text-center text-2xl font-light text-zinc-100 md:text-3xl">Repeat.</p>
          <SemesterRow p={p} label="Semester 1" window={[0.74, 0.9]} />
          <SemesterRow p={p} label="Semester 2" window={[0.78, 0.9]} />
          <SemesterRow p={p} label="Semester 3" window={[0.82, 0.9]} />
        </Fade>
      </CenterStage>

      <CenterStage>
        <Line p={p} at={[0.93, 0.96, 1, 1]} size="lg">
          The loop got faster.
          <br />
          <span className="text-zinc-400">So did I.</span>
        </Line>
      </CenterStage>
    </>
  )
}
