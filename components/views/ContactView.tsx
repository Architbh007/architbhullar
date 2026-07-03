'use client'

import { useState } from 'react'
import type { Socials, ContactInformation } from '@/types'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface Props {
  socials: Socials
  contactInformation: ContactInformation
}

export function ContactView({ socials, contactInformation }: Props) {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(socials.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-6">
        <span className="font-mono text-xs text-violet-500">&gt;</span>
        <span className="font-mono text-xs text-zinc-600">contact</span>
      </div>

      <AnimatedSection>
        <div className="mb-8">
          <p className="font-mono text-[11px] text-zinc-700 uppercase tracking-widest mb-3">Email</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href={`mailto:${socials.email}`}
              className="link-underline text-zinc-200 text-sm hover:text-zinc-100 transition-colors">
              {socials.email}
            </a>
            <button onClick={copyEmail}
              className="font-mono text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              {copied ? '✓ copied' : 'copy'}
            </button>
          </div>
        </div>
      </AnimatedSection>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '28px' }} />

      <AnimatedSection delay={0.06}>
        <div>
          <p className="font-mono text-[11px] text-zinc-700 uppercase tracking-widest mb-4">Links</p>
          <div className="space-y-3">
            <a href={socials.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 group w-fit">
              <GitHubIcon className="text-zinc-600 group-hover:text-zinc-400 transition-colors" size={14} />
              <span className="link-underline text-zinc-400 text-sm group-hover:text-zinc-200 transition-colors">
                github.com/architbhullar
              </span>
              <span className="text-zinc-700 text-xs group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all">↗</span>
            </a>

            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 group w-fit">
              <LinkedInIcon className="text-zinc-600 group-hover:text-zinc-400 transition-colors" size={14} />
              <span className="link-underline text-zinc-400 text-sm group-hover:text-zinc-200 transition-colors">
                linkedin.com/in/architbhullar
              </span>
              <span className="text-zinc-700 text-xs group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all">↗</span>
            </a>

            <a href={socials.resume} download="Archit_Bhullar_Resume.pdf"
              className="flex items-center gap-3 group w-fit">
              <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors text-sm w-3.5 text-center leading-none">↓</span>
              <span className="link-underline text-zinc-400 text-sm group-hover:text-zinc-200 transition-colors">Resume PDF</span>
            </a>
          </div>
        </div>
      </AnimatedSection>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '32px 0' }} />

      {/* Book a call */}
      <AnimatedSection delay={0.12}>
        <div className="mb-8">
          <p className="font-mono text-[11px] text-zinc-700 uppercase tracking-widest mb-4">Book a call</p>
          <div
            className="glow-violet relative flex items-center justify-between gap-4 px-4 py-4 rounded-lg transition-all duration-300"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
          >
            <div>
              <p className="text-zinc-200 text-sm font-medium mb-0.5">Coffee Chat · 15 min</p>
              <p className="text-zinc-500 text-xs">Internship opportunities, collaborations, or just a chat</p>
            </div>
            <a
              href={contactInformation.calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-4 py-2 rounded-md text-xs font-medium transition-colors"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.25)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.15)' }}
            >
              Book →
            </a>
          </div>
        </div>
      </AnimatedSection>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '32px 0' }} />

      <AnimatedSection delay={0.18}>
        <div className="space-y-3 max-w-lg">
          <p className="text-zinc-500 text-sm leading-relaxed">
            {contactInformation.availabilityBlurb}
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            {contactInformation.extraBlurb}
          </p>
          <p className="text-zinc-600 text-xs">
            {contactInformation.responseNote}
          </p>
        </div>
      </AnimatedSection>
    </div>
  )
}
