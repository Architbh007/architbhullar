'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'none'
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })

  const initial =
    direction === 'up'
      ? { opacity: 0, y: 28 }
      : direction === 'left'
        ? { opacity: 0, x: -24 }
        : { opacity: 0 }

  const animate = direction === 'up'
    ? { opacity: 1, y: 0 }
    : direction === 'left'
      ? { opacity: 1, x: 0 }
      : { opacity: 1 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration: 0.6,
        ease: [0.21, 1.11, 0.81, 0.99],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
