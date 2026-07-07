'use client'

import type { ReactNode } from 'react'
import { useJourney, type EggContent } from './JourneyContext'

interface EggProps {
  label: string
  egg: EggContent
  children: ReactNode
  className?: string
}

export function Egg({ label, egg, children, className = '' }: EggProps) {
  const { openEgg } = useJourney()
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => openEgg(egg)}
      className={`group pointer-events-auto relative block cursor-pointer text-left ${className}`}
    >
      {children}
      <span aria-hidden className="j-egg-dot" />
    </button>
  )
}
