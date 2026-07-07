'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import type { Socials } from '@/types'
import { JourneyProvider, SCENE_COUNT, type EggContent, type SceneInfo } from './core/JourneyContext'
import { JourneyAudio } from './core/audio'
import { S01Prologue } from './scenes/S01Prologue'
import { S02LeavingHome } from './scenes/S02LeavingHome'
import { S03Flight } from './scenes/S03Flight'
import { S04FirstDays } from './scenes/S04FirstDays'
import { S05DailyGrind } from './scenes/S05DailyGrind'
import { S06Growth } from './scenes/S06Growth'
import { S07LearningToBuild } from './scenes/S07LearningToBuild'
import { S08NodeMap } from './scenes/S08NodeMap'
import { S09Hackathons } from './scenes/S09Hackathons'
import { S10Leadership } from './scenes/S10Leadership'
import { S11Failures } from './scenes/S11Failures'
import { S12LateNight } from './scenes/S12LateNight'
import { S13Bigger } from './scenes/S13Bigger'
import { S14Ending } from './scenes/S14Ending'

export function JourneyExperience({ socials }: { socials: Socials }) {
  const container = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion() ?? false
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const reduced = mounted && prefersReduced
  const [scene, setSceneState] = useState<SceneInfo>({ index: 1, title: 'Prologue', mood: 'still' })
  const [egg, setEgg] = useState<EggContent | null>(null)
  const [sound, setSound] = useState(false)
  const audioRef = useRef<JourneyAudio | null>(null)

  const { scrollYProgress } = useScroll({ container })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  const setScene = useCallback((info: SceneInfo) => {
    setSceneState((prev) => (prev.index === info.index ? prev : info))
  }, [])

  const openEgg = useCallback((next: EggContent) => setEgg(next), [])

  useEffect(() => {
    audioRef.current?.setMood(scene.mood)
  }, [scene.mood])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEgg(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      audioRef.current?.destroy()
    }
  }, [])

  const toggleSound = () => {
    if (!audioRef.current) audioRef.current = new JourneyAudio()
    const audio = audioRef.current
    if (sound) {
      audio.disable()
      setSound(false)
    } else {
      audio.setMood(scene.mood)
      void audio.enable()
      setSound(true)
    }
  }

  const ctx = useMemo(
    () => ({ container, reduced, setScene, openEgg }),
    [reduced, setScene, openEgg],
  )

  return (
    <JourneyProvider value={ctx}>
      <div
        ref={container}
        className="j-scroll fixed inset-0 z-10 overflow-y-auto overflow-x-hidden bg-black text-zinc-200"
      >
        <S01Prologue />
        <S02LeavingHome />
        <S03Flight />
        <S04FirstDays />
        <S05DailyGrind />
        <S06Growth />
        <S07LearningToBuild socials={socials} />
        <S08NodeMap />
        <S09Hackathons />
        <S10Leadership />
        <S11Failures />
        <S12LateNight />
        <S13Bigger />
        <S14Ending socials={socials} />
      </div>

      <div className="j-grain" aria-hidden />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex h-10 items-center justify-between bg-black px-4 md:h-12 md:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
          Archit Bhullar <span className="text-zinc-800">·</span> The Journey
        </p>
        <div className="pointer-events-auto flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em]">
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={sound}
            className="text-zinc-600 transition-colors hover:text-zinc-300"
          >
            sound: {sound ? <span className="text-violet-400">on</span> : 'off'}
          </button>
          <Link href="/" className="text-zinc-600 transition-colors hover:text-zinc-300">
            exit ✕
          </Link>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex h-10 items-center justify-between bg-black px-4 md:h-12 md:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
          <span className="text-zinc-400">{String(scene.index).padStart(2, '0')}</span>
          <span className="text-zinc-800"> / {SCENE_COUNT} </span>
          <span className="hidden sm:inline"> · {scene.title}</span>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-700">scroll</p>
        <motion.div
          className="absolute inset-x-0 top-0 h-px origin-left bg-violet-400/80"
          style={{ scaleX: reduced ? scrollYProgress : progress }}
        />
      </div>

      <AnimatePresence>
        {egg && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={egg.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setEgg(null)}
          >
            <motion.div
              className="w-full max-w-lg border border-white/10 bg-[#0d0d10] p-6"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-violet-400">
                  {egg.title}
                </p>
                <button
                  type="button"
                  onClick={() => setEgg(null)}
                  aria-label="Close"
                  className="font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-300"
                >
                  esc ✕
                </button>
              </div>
              {egg.body}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </JourneyProvider>
  )
}
