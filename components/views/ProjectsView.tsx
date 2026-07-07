'use client'

import Image from 'next/image'
import type { Project } from '@/types'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

interface Props {
  projects: Project[]
  onSelect: (id: string) => void
}

const STATUS_DOT: Record<Project['status'], string> = {
  active: 'bg-emerald-500',
  completed: 'bg-zinc-500',
  archived: 'bg-zinc-700',
}

const STATUS_TEXT: Record<Project['status'], string> = {
  active: 'text-emerald-400',
  completed: 'text-zinc-400',
  archived: 'text-zinc-500',
}

export function ProjectsView({ projects, onSelect }: Props) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-6">
        <span className="font-mono text-xs text-violet-500">&gt;</span>
        <span className="font-mono text-xs text-zinc-300">ls projects</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <AnimatedSection key={project.id} delay={i * 0.06}>
            <button
              onClick={() => onSelect(project.id)}
              className="group w-full h-full rounded-lg text-left overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(139,92,246,0.03)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ height: '120px', background: 'linear-gradient(135deg, #1a1a24, #111116)' }}
              >
                {project.banner ? (
                  <Image
                    src={project.banner}
                    alt={`${project.name} banner`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-2xl text-zinc-700 select-none">
                      {project.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(13,13,16,0.9), transparent 65%)' }}
                />
                <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
                  <span className={`font-mono text-[10px] ${STATUS_TEXT[project.status]} uppercase tracking-wide`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="font-medium text-zinc-200 text-sm group-hover:text-zinc-100 transition-colors">
                    {project.name}
                  </span>
                  <span className="text-zinc-700 text-xs flex-shrink-0 transition-all group-hover:text-violet-400 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed mb-3 line-clamp-2">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" size="sm">{tech}</Badge>
                  ))}
                </div>
              </div>
            </button>
          </AnimatedSection>
        ))}
      </div>

      <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-zinc-500 text-xs">
          {projects.length} projects · click any to view details
        </p>
      </div>
    </div>
  )
}
