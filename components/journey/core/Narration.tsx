'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'
import { useJourney } from './JourneyContext'

type Window4 = [number, number, number, number]

interface FadeProps {
  p: MotionValue<number>
  at: Window4
  children: ReactNode
  className?: string
  y?: number
  scale?: [number, number]
  enter?: boolean
}

export function Fade({ p, at, children, className, y = 28, scale, enter = true }: FadeProps) {
  const { reduced } = useJourney()
  const range: Window4 = enter ? at : [at[2], at[3], Math.min(at[3] + 0.01, 1), 1]
  const opacity = useTransform(p, range, enter ? [0, 1, 1, 0] : [1, 0, 0, 0])
  const yv = useTransform(p, range, enter ? [y, 0, 0, -y * 0.6] : [0, 0, 0, 0])
  const sv = useTransform(p, range, enter && scale ? [scale[0], 1, 1, scale[1]] : [1, 1, 1, 1])

  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div style={{ opacity, y: yv, scale: sv }} className={className}>
      {children}
    </motion.div>
  )
}

export function Slate({ p, at, children, enter = true }: { p: MotionValue<number>; at: Window4; children: ReactNode; enter?: boolean }) {
  return (
    <Fade p={p} at={at} y={10} enter={enter} className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
      {children}
    </Fade>
  )
}

interface LineProps {
  p: MotionValue<number>
  at: Window4
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  enter?: boolean
}

const SIZES = {
  sm: 'text-lg md:text-2xl',
  md: 'text-2xl md:text-4xl',
  lg: 'text-3xl md:text-5xl',
  xl: 'text-4xl md:text-6xl',
}

export function Line({ p, at, children, className = '', size = 'lg', enter = true }: LineProps) {
  return (
    <Fade
      p={p}
      at={at}
      enter={enter}
      className={`${SIZES[size]} font-light leading-tight tracking-tight text-zinc-100 [text-wrap:balance] [text-shadow:0_2px_28px_rgba(0,0,0,0.7)] ${className}`}
    >
      {children}
    </Fade>
  )
}

export function Sub({ p, at, children, className = '' }: { p: MotionValue<number>; at: Window4; children: ReactNode; className?: string }) {
  return (
    <Fade p={p} at={at} y={16} className={`text-sm md:text-base text-zinc-400 [text-shadow:0_1px_18px_rgba(0,0,0,0.8)] ${className}`}>
      {children}
    </Fade>
  )
}

export function Stage({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`absolute inset-0 ${className}`}>{children}</div>
}

export function CenterStage({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { reduced } = useJourney()
  if (reduced) {
    return (
      <div className="relative flex flex-col items-center justify-center px-6 py-14 text-center">
        {children}
      </div>
    )
  }
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center ${className}`}>
      {children}
    </div>
  )
}
