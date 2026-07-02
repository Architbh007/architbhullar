'use client'

import { useState } from 'react'
import type { Socials } from '@/types'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons'

interface Props {
  socials: Socials
}

export function ContactView({ socials }: Props) {
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

      <div className="mb-8">
        <p className="font-mono text-[11px] text-zinc-700 uppercase tracking-widest mb-3">Email</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href={`mailto:${socials.email}`}
            className="text-zinc-200 text-sm hover:text-zinc-100 transition-colors">
            {socials.email}
          </a>
          <button onClick={copyEmail}
            className="font-mono text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            {copied ? '✓ copied' : 'copy'}
          </button>
        </div>
      </div>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '28px' }} />

      <div>
        <p className="font-mono text-[11px] text-zinc-700 uppercase tracking-widest mb-4">Links</p>
        <div className="space-y-3">
          <a href={socials.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 group">
            <GitHubIcon className="text-zinc-600 group-hover:text-zinc-400 transition-colors" size={14} />
            <span className="text-zinc-400 text-sm group-hover:text-zinc-200 transition-colors">
              github.com/architbhullar
            </span>
            <span className="text-zinc-700 text-xs group-hover:text-zinc-500 transition-colors">↗</span>
          </a>

          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 group">
            <LinkedInIcon className="text-zinc-600 group-hover:text-zinc-400 transition-colors" size={14} />
            <span className="text-zinc-400 text-sm group-hover:text-zinc-200 transition-colors">
              linkedin.com/in/architbhullar
            </span>
            <span className="text-zinc-700 text-xs group-hover:text-zinc-500 transition-colors">↗</span>
          </a>

          <a href={socials.resume} download="Archit_Bhullar_Resume.pdf"
            className="flex items-center gap-3 group">
            <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors text-sm w-3.5 text-center leading-none">↓</span>
            <span className="text-zinc-400 text-sm group-hover:text-zinc-200 transition-colors">Resume PDF</span>
          </a>
        </div>
      </div>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '32px 0' }} />

      <div className="space-y-3 max-w-lg">
        <p className="text-zinc-500 text-sm leading-relaxed">
          Currently seeking Software Engineering and AI Engineering internship opportunities for the Australian Summer (November 2026 – February 2027). I hold a Student Visa (Subclass 500) with full working rights during the summer break, as I am not enrolled in Trimester 3. Upon graduating in November 2027, I will be eligible to apply for the Temporary Graduate Visa (Subclass 485).
        </p>
        <p className="text-zinc-500 text-sm leading-relaxed">
          I'm always open to discussing engineering opportunities, technical projects, and how I can contribute to building impactful products.
        </p>
        <p className="text-zinc-600 text-xs">
          Fastest response via email — I typically reply within 24 hours.
        </p>
      </div>
    </div>
  )
}
