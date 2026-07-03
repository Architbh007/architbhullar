'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { AboutView } from './views/AboutView'
import { ProjectsView } from './views/ProjectsView'
import { ProjectDetail } from './views/ProjectDetail'
import { SkillsView } from './views/SkillsView'
import { ExperienceView } from './views/ExperienceView'
import { ContactView } from './views/ContactView'
import type { SiteContent } from '@/types'

export type View = 'about' | 'projects' | 'skills' | 'experience' | 'contact'

const VIEWS: View[] = ['about', 'projects', 'skills', 'experience', 'contact']

const NAV: { id: View; label: string }[] = [
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
]

function useTypewriter(text: string, speed = 35) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    if (!text) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text])
  return displayed
}

interface Props {
  content: SiteContent
}

export function Workspace({ content }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const pathSegment = pathname.replace(/^\//, '') as View
  const view: View = VIEWS.includes(pathSegment) ? pathSegment : 'about'

  const navigate = (next: View) => {
    router.push(next === 'about' ? '/' : `/${next}`)
    setSelectedProject(null)
    setMobileOpen(false)
  }

  const promptLabel = selectedProject ? `projects / ${selectedProject}` : view
  const typedPrompt = useTypewriter(promptLabel)

  return (
    <div className="flex flex-col" style={{ height: '100dvh', minHeight: '100dvh' }}>
      {/* ── Nav bar ── */}
      <nav
        className="flex-shrink-0 flex items-center justify-between px-5 md:px-8"
        style={{
          height: '40px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: '#0d0d10',
        }}
      >
        {/* Left: breadcrumb */}
        <div className="font-mono text-xs flex items-center gap-1 min-w-0">
          <button
            onClick={() => navigate('about')}
            className="text-zinc-600 hover:text-zinc-400 transition-colors shrink-0"
          >
            ~/archit
          </button>
          <span className="text-zinc-700 shrink-0"> &gt; </span>
          <span className="text-violet-400 truncate" style={{ maxWidth: '180px' }}>
            {typedPrompt}
          </span>
          <motion.span
            className="text-violet-500 ml-px"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear', times: [0, 0.49, 0.5, 1] }}
          >
            |
          </motion.span>
        </div>

        {/* Center: nav — desktop */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`text-xs transition-colors ${
                view === item.id && !selectedProject
                  ? 'text-zinc-100'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: resume + mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href={content.socials.resume}
            download="Archit_Bhullar_Resume.pdf"
            className="hidden md:block text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            resume ↗
          </a>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden text-zinc-500 hover:text-zinc-300 transition-colors text-base leading-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? '×' : '≡'}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          className="md:hidden overflow-hidden"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0d0d10' }}
        >
          <div className="px-5 py-3 space-y-0.5">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`block w-full text-left py-2 text-sm ${
                  view === item.id ? 'text-zinc-100' : 'text-zinc-500'
                }`}
              >
                {view === item.id ? `> ${item.label}` : item.label}
              </button>
            ))}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '8px 0' }} />
            <a
              href={content.socials.resume}
              download="Archit_Bhullar_Resume.pdf"
              className="block py-2 text-sm text-zinc-500"
            >
              resume ↗
            </a>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 md:px-10 py-8 md:py-10">
          {view === 'about' && (
            <AboutView
              profile={content.profile}
              stack={content.stack}
              story={content.story}
              socials={content.socials}
              onNavigate={navigate}
            />
          )}

          {view === 'projects' && !selectedProject && (
            <ProjectsView projects={content.projects} onSelect={setSelectedProject} />
          )}
          {view === 'projects' && selectedProject && (
            <ProjectDetail
              projects={content.projects}
              projectId={selectedProject}
              onBack={() => setSelectedProject(null)}
            />
          )}

          {view === 'skills' && <SkillsView skills={content.skills} />}
          {view === 'experience' && <ExperienceView experience={content.experience} />}
          {view === 'contact' && <ContactView socials={content.socials} contactInformation={content.contactInformation} />}
        </div>
      </main>
    </div>
  )
}
