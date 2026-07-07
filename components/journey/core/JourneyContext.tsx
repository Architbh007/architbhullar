'use client'

import { createContext, useContext, type ReactNode, type RefObject } from 'react'

export type Mood = 'still' | 'dawn' | 'cabin' | 'cold' | 'hum' | 'pulse' | 'rain'

export interface EggContent {
  title: string
  body: ReactNode
}

export interface SceneInfo {
  index: number
  title: string
  mood: Mood
}

interface JourneyCtx {
  container: RefObject<HTMLDivElement | null>
  reduced: boolean
  setScene: (info: SceneInfo) => void
  openEgg: (egg: EggContent) => void
}

const Ctx = createContext<JourneyCtx | null>(null)

export const JourneyProvider = Ctx.Provider

export function useJourney() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useJourney must be used inside JourneyProvider')
  return ctx
}

export const SCENE_COUNT = 14
