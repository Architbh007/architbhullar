'use client'

import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate } from '../core/Narration'

const ROWS = 5
const COLS = 9

function Hall({ you, caption }: { you: [number, number]; caption: string }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <svg viewBox="0 0 200 110" className="w-64 md:w-80" aria-hidden>
        <rect x="70" y="6" width="60" height="5" fill="rgba(226,232,240,0.2)" />
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => {
            const isYou = you[0] === r && you[1] === c
            const x = 24 + c * 19
            const y = 30 + r * 16
            return (
              <circle
                key={`${r}-${c}`}
                cx={x}
                cy={y}
                r={isYou ? 4 : 2.6}
                fill={isYou ? '#fbbf24' : 'rgba(148,163,184,0.35)'}
              >
                {isYou && <animate attributeName="opacity" values="1;0.6;1" dur="2.4s" repeatCount="indefinite" />}
              </circle>
            )
          }),
        )}
      </svg>
      <p className="text-xl font-light text-zinc-100 md:text-2xl">{caption}</p>
    </div>
  )
}

function Presenting() {
  return (
    <div className="flex flex-col items-center gap-5">
      <svg viewBox="0 0 200 110" className="w-64 md:w-80" aria-hidden>
        <circle cx="100" cy="18" r="5" fill="#fbbf24" />
        <rect x="60" y="30" width="80" height="2" fill="rgba(251,191,36,0.25)" />
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={30 + c * 20} cy={52 + r * 15} r="2.6" fill="rgba(148,163,184,0.35)" />
          )),
        )}
      </svg>
      <p className="text-xl font-light text-zinc-100 md:text-2xl">Then presenting.</p>
    </div>
  )
}

function Mentoring() {
  return (
    <div className="flex flex-col items-center gap-5">
      <svg viewBox="0 0 200 110" className="w-64 md:w-80" aria-hidden>
        <circle cx="100" cy="55" r="5" fill="#fbbf24" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return (
            <g key={i}>
              <circle cx={100 + Math.cos(a) * 34} cy={55 + Math.sin(a) * 26} r="3" fill="rgba(203,213,225,0.6)" />
              <line
                x1={100 + Math.cos(a) * 10}
                y1={55 + Math.sin(a) * 8}
                x2={100 + Math.cos(a) * 27}
                y2={55 + Math.sin(a) * 20}
                stroke="rgba(251,191,36,0.2)"
              />
            </g>
          )
        })}
      </svg>
      <p className="text-xl font-light text-zinc-100 md:text-2xl">Eventually, mentoring others.</p>
    </div>
  )
}

export function S06Growth() {
  return (
    <Scene index={6} title="University Growth" mood="still" height={380} className="bg-[#0a0b0f]">
      {(p) => (
        <>
          <CenterStage className="justify-start pt-[16vh]">
            <Slate p={p} at={[0.02, 0.06, 0.9, 0.96]}>
              Scene 06 · not grades · confidence
            </Slate>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.06, 0.12, 0.22, 0.28]}>
              <Hall you={[4, 0]} caption="At first, sitting quietly." />
            </Fade>
          </CenterStage>
          <CenterStage>
            <Fade p={p} at={[0.28, 0.34, 0.42, 0.48]}>
              <Hall you={[2, 4]} caption="Then asking questions." />
            </Fade>
          </CenterStage>
          <CenterStage>
            <Fade p={p} at={[0.48, 0.54, 0.62, 0.68]}>
              <Presenting />
            </Fade>
          </CenterStage>
          <CenterStage>
            <Fade p={p} at={[0.68, 0.74, 0.82, 0.87]}>
              <Mentoring />
            </Fade>
          </CenterStage>

          <CenterStage>
            <Line p={p} at={[0.89, 0.94, 1, 1]} size="lg">
              The room stayed the same.
              <br />
              <span className="text-zinc-400">The seat changed.</span>
            </Line>
          </CenterStage>
        </>
      )}
    </Scene>
  )
}
