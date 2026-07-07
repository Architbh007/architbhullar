'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { Scene, useNearViewport } from '../core/Scene'
import { CenterStage, Fade, Line, Slate } from '../core/Narration'
import { useJourney } from '../core/JourneyContext'

const CityScene = dynamic(() => import('./CityScene'), { ssr: false })

export function S08NodeMap() {
  const pr = useRef({ v: 0 })
  const stageRef = useRef<HTMLDivElement>(null)
  const near = useNearViewport(stageRef)

  return (
    <Scene index={8} title="First Big Project" mood="pulse" height={480} className="bg-[#06070c]">
      {(p) => <NodeMapInner p={p} pr={pr} stageRef={stageRef} near={near} />}
    </Scene>
  )
}

function NodeMapInner({
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
    pr.current.v = Math.min(1, Math.max(0, (v - 0.12) / 0.6))
  })
  const canvasOpacity = useTransform(p, [0.06, 0.14, 0.94, 1], [0, 1, 1, 0.4])

  return (
    <div ref={stageRef} className="absolute inset-0">
      <motion.div className="absolute inset-0" style={{ opacity: reduced ? 1 : canvasOpacity }}>
        {(near || reduced) && <CityScene pr={pr.current} />}
      </motion.div>

      <CenterStage className="justify-start pt-[16vh]">
        <Slate p={p} at={[0.02, 0.06, 0.9, 0.96]}>
          Scene 08 · first big project
        </Slate>
        <div className="mt-5">
          <Line p={p} at={[0.05, 0.1, 0.3, 0.36]} size="xl">
            NodeMap.
          </Line>
        </div>
        <div className="mt-3">
          <Fade p={p} at={[0.09, 0.14, 0.3, 0.36]} y={12} className="text-sm text-zinc-400 md:text-base">
            A repository, rendered as a city.
          </Fade>
        </div>
      </CenterStage>

      <CenterStage className="justify-end pb-[16vh]">
        <Fade p={p} at={[0.4, 0.46, 0.62, 0.68]} y={14}>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            <span className="text-violet-300/90">imports → highways</span>
            <span className="text-zinc-400">functions → buildings</span>
            <span className="text-rose-400/90">circular deps → red</span>
          </div>
        </Fade>
      </CenterStage>

      <CenterStage>
        <Line p={p} at={[0.74, 0.8, 0.94, 1]} size="lg" className="[text-shadow:0_2px_30px_rgba(0,0,0,0.9)]">
          I wanted developers to
          <br />
          understand software <span className="text-violet-300">faster</span>.
        </Line>
      </CenterStage>
    </div>
  )
}
