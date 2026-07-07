'use client'

import { useEffect, useRef } from 'react'
import { useJourney } from './JourneyContext'

type ParticleMode = 'rain' | 'snow' | 'dust' | 'stars' | 'embers'

interface ParticlesProps {
  mode: ParticleMode
  count?: number
  color?: string
  className?: string
}

interface P {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
  tw: number
}

export function Particles({ mode, count = 90, color = '255,255,255', className = '' }: ParticlesProps) {
  const { container, reduced } = useJourney()
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduced) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let visible = false
    let ps: P[] = []

    const spawn = (i: number): P => {
      const x = Math.random() * w
      const y = Math.random() * h
      switch (mode) {
        case 'rain':
          return { x, y, vx: -1.2, vy: 11 + Math.random() * 6, r: 0.7, a: 0.25 + Math.random() * 0.3, tw: 0 }
        case 'snow':
          return { x, y, vx: 0.2 + Math.random() * 0.4, vy: 0.5 + Math.random() * 0.9, r: 0.8 + Math.random() * 1.4, a: 0.25 + Math.random() * 0.4, tw: Math.random() * Math.PI * 2 }
        case 'dust':
          return { x, y, vx: (Math.random() - 0.5) * 0.25, vy: -0.1 - Math.random() * 0.2, r: 0.6 + Math.random() * 1, a: 0.08 + Math.random() * 0.22, tw: Math.random() * Math.PI * 2 }
        case 'stars':
          return { x, y: (y * 0.8) | 0, vx: 0, vy: 0, r: 0.4 + Math.random() * 0.9, a: 0.2 + Math.random() * 0.6, tw: Math.random() * Math.PI * 2 }
        case 'embers':
          return { x, y: h - Math.random() * (h * 0.4) - (i % 3), vx: (Math.random() - 0.5) * 0.4, vy: -0.6 - Math.random() * 1.2, r: 0.6 + Math.random() * 1, a: 0.3 + Math.random() * 0.4, tw: Math.random() * Math.PI * 2 }
      }
    }

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ps = Array.from({ length: count }, (_, i) => spawn(i))
    }

    let t = 0
    const step = () => {
      if (!running) return
      t += 0.016
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        p.x += p.vx
        p.y += p.vy
        if (mode === 'snow' || mode === 'dust') p.x += Math.sin(t + p.tw) * 0.3
        if (p.y > h + 4) { p.y = -4; p.x = Math.random() * w }
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w }
        if (p.x > w + 4) p.x = -4
        if (p.x < -4) p.x = w + 4

        const alpha = mode === 'stars' || mode === 'embers' || mode === 'dust'
          ? p.a * (0.55 + 0.45 * Math.sin(t * 1.6 + p.tw))
          : p.a

        if (mode === 'rain') {
          ctx.strokeStyle = `rgba(${color},${alpha})`
          ctx.lineWidth = p.r
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x + p.vx * 1.6, p.y + p.vy * 1.6)
          ctx.stroke()
        } else {
          ctx.fillStyle = `rgba(${color},${alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(step)
    }

    const setRunning = (next: boolean) => {
      if (next === running) return
      running = next
      if (running) raf = requestAnimationFrame(step)
      else cancelAnimationFrame(raf)
    }

    const onVisibility = () => setRunning(visible && !document.hidden)

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; onVisibility() },
      { root: container.current, rootMargin: '20% 0px 20% 0px' },
    )
    io.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      setRunning(false)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [mode, count, color, reduced, container])

  if (reduced) return null
  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
