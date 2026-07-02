'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Profile, StackRow, StoryEntry, Socials } from '@/types'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons'
import type { View } from '@/components/Workspace'

interface Props {
  profile: Profile
  stack: StackRow[]
  story: StoryEntry[]
  socials: Socials
  onNavigate: (v: View) => void
  scrollRef: React.RefObject<HTMLElement>
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-widest mb-5">{text}</p>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '32px 0' }} />
}

function useWamCounter(target: number | undefined, duration = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (target == null) return
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((eased * target).toFixed(2)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return value
}

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
})

export function AboutView({ profile, stack, story, socials, onNavigate, scrollRef }: Props) {
  const displayWam = useWamCounter(profile.wam)
  const vp = { root: scrollRef, once: true, amount: 0.15 }

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-5">
        <span className="font-mono text-xs text-violet-500">&gt;</span>
        <span className="font-mono text-xs text-zinc-600">whoami</span>
      </div>

      <div className="flex items-start gap-5">
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{
            width: '88px', height: '88px', borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.08)', background: '#161620',
          }}
        >
          {profile.photo ? (
            <Image src={profile.photo} alt={profile.name} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xl text-zinc-500 select-none">
                {profile.firstName[0]}{profile.lastName[0]}
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h1 className="text-zinc-100 font-semibold text-base leading-tight">{profile.name}</h1>
          <p className="text-zinc-500 text-sm mt-0.5">{profile.title}</p>
          <p className="text-zinc-400 text-sm mt-3 leading-relaxed max-w-md">
            {profile.subtitle}. I care about building things that work, not just things that look impressive.
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-zinc-600 text-xs">{profile.location}</span>
            <span className="text-zinc-800 text-xs">·</span>
            <span className="text-zinc-600 text-xs">{profile.university}</span>
            {profile.wam != null && (
              <>
                <span className="text-zinc-800 text-xs">·</span>
                <span className="text-zinc-600 text-xs">
                  WAM{' '}
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                    {displayWam.toFixed(2)}
                  </motion.span>
                  {profile.wamTarget != null && (
                    <span className="text-zinc-700"> → {profile.wamTarget} target</span>
                  )}
                </span>
              </>
            )}
            <span className="text-zinc-800 text-xs">·</span>
            <span className="flex items-center gap-1 text-xs">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"
                style={{ boxShadow: '0 0 4px rgba(52,211,153,0.5)' }} />
              <span className="text-emerald-500">Open to internships</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <a href={socials.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              <GitHubIcon size={13} />GitHub
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              <LinkedInIcon size={13} />LinkedIn
            </a>
            <a href={socials.resume} download="Archit_Bhullar_Resume.pdf"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Resume ↓
            </a>
            <a href={`mailto:${socials.email}`}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              {socials.email}
            </a>
          </div>
        </div>
      </div>

      <Divider />

      <section>
        <SectionLabel text="About me" />
        <div className="space-y-4 max-w-2xl">
          {profile.bioExtended.map((para, i) => (
            <motion.p key={i} {...reveal(i * 0.05)} viewport={vp} className="text-zinc-400 text-sm leading-relaxed">
              {para}
            </motion.p>
          ))}
        </div>
      </section>

      <Divider />

      <section>
        <SectionLabel text="Tech stack" />
        <div className="space-y-2.5">
          {stack.map((row, i) => (
            <motion.div key={row.category} {...reveal(i * 0.04)} viewport={vp} className="flex gap-6 items-baseline">
              <span className="font-mono text-xs text-zinc-700 flex-shrink-0" style={{ width: '72px' }}>
                {row.category}
              </span>
              <span className="text-zinc-400 text-sm">{row.technologies.join(', ')}</span>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-xs">
          <button onClick={() => onNavigate('skills')} className="text-zinc-600 hover:text-zinc-400 transition-colors">
            See full skills breakdown →
          </button>
        </p>
      </section>

      <Divider />

      <section className="pb-2">
        <SectionLabel text="Story" />
        <div className="space-y-6">
          {story.map((entry, i) => (
            <motion.div key={entry.year} {...reveal()} viewport={vp} className="flex gap-6">
              <div className="flex-shrink-0 flex flex-col items-center" style={{ width: '40px' }}>
                <span className="font-mono text-xs text-zinc-600">{entry.year}</span>
                {i < story.length - 1 && (
                  <div className="flex-1 mt-3"
                    style={{ width: '1px', background: 'rgba(255,255,255,0.05)', minHeight: '24px' }} />
                )}
              </div>
              <ul className="space-y-1.5 pt-0.5 pb-4">
                {entry.events.map((event) => (
                  <li key={event} className="text-zinc-500 text-sm leading-relaxed">{event}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
