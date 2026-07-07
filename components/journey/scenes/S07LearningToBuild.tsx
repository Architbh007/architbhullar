'use client'

import { useState } from 'react'
import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import type { Socials } from '@/types'
import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate } from '../core/Narration'
import { Egg } from '../core/EasterEgg'
import { useJourney } from '../core/JourneyContext'

const CODE: Array<[string, string]> = [
  ['1', 'def main():'],
  ['2', '    print("hello world")'],
  ['3', ''],
  ['4', 'main()'],
  ['5', ''],
  ['6', '# TypeError: NoneType is not callable'],
  ['7', '# ...why'],
  ['8', ''],
  ['9', 'def main() -> None:'],
  ['10', '    run(app)   # attempt 14'],
  ['11', ''],
  ['12', '# it works. don’t touch anything.'],
]

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function ContributionGraph({ github }: { github: string }) {
  const rand = mulberry32(2022)
  const weeks = 26
  return (
    <div>
      <div className="flex gap-[3px]">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, d) => {
              const ramp = w / weeks
              const v = rand()
              const active = v < 0.15 + ramp * 0.75
              const strong = v < ramp * 0.5
              return (
                <span
                  key={d}
                  className="h-2.5 w-2.5 rounded-[2px]"
                  style={{
                    background: strong
                      ? 'rgba(52,211,153,0.85)'
                      : active
                        ? 'rgba(52,211,153,0.35)'
                        : 'rgba(255,255,255,0.06)',
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-[11px] text-zinc-500">
        The graph filled in from the left.{' '}
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400/90 underline decoration-emerald-400/30 underline-offset-4"
        >
          it&rsquo;s still filling →
        </a>
      </p>
    </div>
  )
}

function Editor({ p, socials }: { p: MotionValue<number>; socials: Socials }) {
  const { reduced } = useJourney()
  const [count, setCount] = useState(reduced ? CODE.length : 0)
  useMotionValueEvent(p, 'change', (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.22) / 0.3))
    const next = Math.round(t * CODE.length)
    setCount((prev) => (prev === next ? prev : next))
  })

  return (
    <Egg
      label="Open the contribution graph"
      egg={{ title: 'Memory · the graph', body: <ContributionGraph github={socials.github} /> }}
      className="w-full max-w-lg"
    >
      <div className="w-full border border-white/10 bg-[#0b0d12] text-left shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="ml-2 font-mono text-[10px] text-zinc-600">first_project.py — editor</span>
        </div>
        <div className="min-h-[220px] p-4 font-mono text-[11px] leading-relaxed md:text-xs">
          {CODE.slice(0, count).map(([n, line], i) => {
            const isError = line.startsWith('# TypeError') || line.startsWith('# ...')
            const isWin = line.includes('it works')
            return (
              <div key={n} className="flex gap-4">
                <span className="w-4 flex-shrink-0 text-right text-zinc-700">{n}</span>
                <span className={`whitespace-pre ${isError ? 'text-rose-400/90' : isWin ? 'text-emerald-400/90' : 'text-zinc-300'}`}>
                  {line || ' '}
                  {i === count - 1 && !reduced && <span className="j-cursor ml-0.5 opacity-70" />}
                </span>
              </div>
            )
          })}
          {count === 0 && (
            <div className="flex gap-4">
              <span className="w-4 text-right text-zinc-700">1</span>
              <span className="j-cursor text-zinc-300" />
            </div>
          )}
        </div>
      </div>
    </Egg>
  )
}

const TABS = [
  'stackoverflow — why is my function undefined',
  'stackoverflow — python NoneType is not callable',
  'stackoverflow — git undo last commit (17M views)',
  'docs — flask quickstart',
]

export function S07LearningToBuild({ socials }: { socials: Socials }) {
  return (
    <Scene index={7} title="Learning to Build" mood="still" height={460} className="bg-[#0a0b0e]">
      {(p) => (
        <>
          <CenterStage className="justify-start pt-[16vh]">
            <Slate p={p} at={[0.02, 0.06, 0.9, 0.96]}>
              Scene 07 · a desk · any hour
            </Slate>
          </CenterStage>

          <CenterStage>
            <Line p={p} at={[0.05, 0.1, 0.16, 0.21]} size="lg">
              An empty editor.
              <br />
              <span className="text-zinc-400">A blinking cursor.</span>
            </Line>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.22, 0.28, 0.56, 0.62]} className="flex w-full flex-col items-center gap-4 px-4">
              <Editor p={p} socials={socials} />
              <div className="flex max-w-lg flex-wrap justify-center gap-1.5">
                {TABS.map((t) => (
                  <span key={t} className="border border-white/8 bg-[#0d0f14] px-2 py-1 font-mono text-[9px] text-zinc-600">
                    {t}
                  </span>
                ))}
              </div>
            </Fade>
          </CenterStage>

          <CenterStage>
            <Fade p={p} at={[0.64, 0.7, 0.8, 0.85]} className="w-full max-w-md px-4">
              <div className="space-y-2 border border-white/8 bg-[#0b0d12] p-4 font-mono text-[11px]">
                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">git log --oneline</p>
                <p className="text-zinc-500"><span className="text-amber-400/80">a1f09b2</span> initial commit</p>
                <p className="text-zinc-500"><span className="text-amber-400/80">4c2e881</span> fix bug</p>
                <p className="text-zinc-500"><span className="text-amber-400/80">9d17f3a</span> fix bug (actually)</p>
                <p className="text-zinc-500"><span className="text-amber-400/80">b8802ce</span> add tests, feel powerful</p>
                <p className="text-zinc-400"><span className="text-amber-400/80">e3d94aa</span> refactor: this is a real project now</p>
              </div>
            </Fade>
          </CenterStage>

          <CenterStage>
            <Line p={p} at={[0.87, 0.92, 0.98, 1]} size="lg">
              One project.
              <br />
              <span className="text-zinc-400">Then another.</span>
            </Line>
          </CenterStage>
        </>
      )}
    </Scene>
  )
}
