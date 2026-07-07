'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate } from '../core/Narration'
import { useJourney } from '../core/JourneyContext'

const FAILURES: Array<{ text: string; tone: 'rose' | 'amber' }> = [
  { text: 'error TS2345: argument of type…', tone: 'rose' },
  { text: '✗ deploy failed — exit code 1', tone: 'rose' },
  { text: 'FAILED tests/test_core.py — 7 failed', tone: 'rose' },
  { text: 'Re: Internship application — “…we regret to inform you…”', tone: 'amber' },
  { text: 'build broken on main. again.', tone: 'rose' },
  { text: 'Re: Graduate program — “…other candidates…”', tone: 'amber' },
  { text: 'segfault (core dumped)', tone: 'rose' },
  { text: 'Re: Application status — “…not moving forward…”', tone: 'amber' },
]

function NotLinear({ p }: { p: MotionValue<number> }) {
  const { reduced } = useJourney()
  const draw = useTransform(p, [0.78, 0.95], [0, 1])
  return (
    <svg viewBox="0 0 320 120" className="w-80 md:w-96" aria-hidden>
      <line x1="10" y1="110" x2="310" y2="110" stroke="rgba(226,232,240,0.15)" />
      <line x1="10" y1="110" x2="10" y2="10" stroke="rgba(226,232,240,0.15)" />
      <motion.path
        d="M 10 96 L 50 88 L 72 102 L 108 84 L 126 98 L 158 92 L 178 60 L 198 78 L 226 44 L 250 58 L 282 26 L 310 18"
        fill="none"
        stroke="#34d399"
        strokeWidth="1.6"
        strokeLinejoin="round"
        style={{ pathLength: reduced ? 1 : draw }}
      />
    </svg>
  )
}

export function S11Failures() {
  return (
    <Scene index={11} title="Failures" mood="still" height={460} className="bg-[#070708]">
      {(p) => (
        <>
          <CenterStage className="justify-start pt-[15vh]">
            <Slate p={p} at={[0.02, 0.06, 0.9, 0.96]}>
              Scene 11 · the part portfolios skip
            </Slate>
          </CenterStage>

          <CenterStage>
            <div className="w-full max-w-md space-y-2.5 px-4 text-left font-mono text-[11px] md:text-xs">
              {FAILURES.map((f, i) => {
                const start = 0.08 + i * 0.045
                return (
                  <Fade
                    key={f.text}
                    p={p}
                    at={[start, start + 0.03, 0.5, 0.56]}
                    y={8}
                    className={f.tone === 'rose' ? 'text-rose-400/75' : 'text-amber-400/70'}
                  >
                    <span style={{ marginLeft: `${(i * 13) % 40}px` }}>{f.text}</span>
                  </Fade>
                )
              })}
            </div>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.56, 0.6, 0.64, 0.68]} y={0} className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-700">
              silence
            </Fade>
          </CenterStage>

          <CenterStage>
            <div className="w-full max-w-md space-y-3 px-4 text-left font-mono text-xs md:text-sm">
              <Fade p={p} at={[0.68, 0.71, 0.92, 0.97]} y={10} className="text-emerald-400/90">
                ✓ deploy: production — success
              </Fade>
              <Fade p={p} at={[0.71, 0.74, 0.92, 0.97]} y={10} className="text-emerald-400/90">
                Re: Application — &ldquo;…we&rsquo;d love to move forward.&rdquo;
              </Fade>
              <Fade p={p} at={[0.74, 0.77, 0.92, 0.97]} y={10} className="text-zinc-400">
                One breakthrough. That&rsquo;s all it takes.
              </Fade>
            </div>
          </CenterStage>

          <CenterStage className="justify-end pb-[18vh]">
            <Fade p={p} at={[0.78, 0.83, 0.95, 1]} className="flex flex-col items-center gap-6">
              <NotLinear p={p} />
              <p className="text-2xl font-light text-zinc-100 md:text-4xl">Progress isn&rsquo;t linear.</p>
            </Fade>
          </CenterStage>
        </>
      )}
    </Scene>
  )
}
