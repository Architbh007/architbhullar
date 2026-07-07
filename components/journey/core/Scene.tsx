'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useMotionValue, useScroll, type MotionValue } from 'framer-motion'
import { useJourney, type Mood } from './JourneyContext'

interface SceneProps {
  index: number
  title: string
  mood: Mood
  height?: number
  className?: string
  children: (progress: MotionValue<number>) => ReactNode
}

export function Scene({ index, title, mood, height = 300, className = '', children }: SceneProps) {
  const { container, reduced, setScene } = useJourney()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    container,
    target: ref,
    offset: ['start start', 'end end'],
  })
  const still = useMotionValue(0.5)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setScene({ index, title, mood })
      },
      { root: container.current, rootMargin: '-50% 0px -50% 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [container, index, title, mood, setScene])

  if (reduced) {
    return (
      <section ref={ref} aria-label={title} className="relative">
        <div className={`relative min-h-screen overflow-hidden ${className}`}>{children(still)}</div>
      </section>
    )
  }

  return (
    <section ref={ref} aria-label={title} className="relative" style={{ height: `${height}vh` }}>
      <div className={`sticky top-0 h-screen overflow-hidden ${className}`}>
        {children(scrollYProgress)}
      </div>
    </section>
  )
}

export function useNearViewport(ref: React.RefObject<Element | null>, margin = '80%') {
  const { container } = useJourney()
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setNear(e.isIntersecting),
      { root: container.current, rootMargin: `${margin} 0px ${margin} 0px` },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, container, margin])

  return near
}
