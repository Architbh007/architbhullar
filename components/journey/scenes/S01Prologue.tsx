'use client'

import { Scene } from '../core/Scene'
import { CenterStage, Fade, Line, Slate } from '../core/Narration'
import { Particles } from '../core/Particles'

export function S01Prologue() {
  return (
    <Scene index={1} title="Prologue" mood="still" height={220} className="bg-black">
      {(p) => (
        <>
          <Particles mode="dust" count={50} className="opacity-60" />
          <CenterStage>
            <Slate p={p} at={[0, 0.1, 0.62, 0.78]} enter={false}>
              A story in fourteen scenes
            </Slate>
            <div className="mt-8">
              <Line p={p} at={[0, 0.1, 0.62, 0.8]} size="xl" enter={false}>
                Every journey
                <br />
                begins somewhere.
              </Line>
            </div>
            <div className="mt-10">
              <Fade p={p} at={[0, 0.1, 0.6, 0.78]} y={12} enter={false} className="font-mono text-xs tracking-[0.2em] text-zinc-500">
                AMRITSAR 31.63°N&ensp;→&ensp;MELBOURNE 37.81°S
              </Fade>
            </div>
          </CenterStage>
          <Fade
            p={p}
            at={[0, 0.02, 0.3, 0.45]}
            y={0}
            className="absolute inset-x-0 bottom-16 flex justify-center md:bottom-20"
          >
            <span className="j-scroll-cue font-mono text-xs text-zinc-600">↓</span>
          </Fade>
        </>
      )}
    </Scene>
  )
}
