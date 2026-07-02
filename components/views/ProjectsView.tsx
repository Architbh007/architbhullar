'use client'

import Image from 'next/image'
import type { Project } from '@/types'

interface Props {
  projects: Project[]
  onSelect: (id: string) => void
}

export function ProjectsView({ projects, onSelect }: Props) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-6">
        <span className="font-mono text-xs text-violet-500">&gt;</span>
        <span className="font-mono text-xs text-zinc-600">ls projects</span>
      </div>

      <div className="space-y-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelect(project.id)}
            className="group w-full rounded-md text-left overflow-hidden transition-all"
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            {project.banner && (
              <div
                className="relative w-full overflow-hidden"
                style={{ height: '90px', background: '#111116' }}
              >
                <Image
                  src={project.banner}
                  alt={`${project.name} banner`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="px-3 py-3">
              <div className="flex items-center justify-between gap-4 mb-1">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-medium text-zinc-200 text-sm flex-shrink-0 group-hover:text-zinc-100 transition-colors">
                    {project.name}
                  </span>
                  <span className="text-zinc-700 text-xs flex-shrink-0 hidden md:block">
                    {project.stack.slice(0, 3).join(' · ')}
                  </span>
                </div>
                <span className="text-zinc-700 text-xs flex-shrink-0 group-hover:text-zinc-400 transition-colors">
                  →
                </span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed pr-6">
                {project.tagline}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-zinc-700 text-xs">
          {projects.length} projects · click any to view details
        </p>
      </div>
    </div>
  )
}
