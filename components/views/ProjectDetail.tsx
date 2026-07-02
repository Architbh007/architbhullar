'use client'

import Image from 'next/image'
import type { Project } from '@/types'

interface Props {
  projects: Project[]
  projectId: string
  onBack: () => void
}

function Label({ text }: { text: string }) {
  return (
    <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-widest mb-3">{text}</p>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '28px 0' }} />
}

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  return match?.[1] ?? null
}

function getVimeoId(url: string) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match?.[1] ?? null
}

function VideoEmbed({ url }: { url: string }) {
  const ytId = getYouTubeId(url)
  if (ytId) {
    return (
      <div className="w-full rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.07)' }}>
        <iframe
          src={`https://www.youtube.com/embed/${ytId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    )
  }

  const vimeoId = getVimeoId(url)
  if (vimeoId) {
    return (
      <div className="w-full rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.07)' }}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    )
  }

  return (
    <video
      src={url}
      controls
      className="w-full rounded-lg"
      style={{ border: '1px solid rgba(255,255,255,0.07)', maxHeight: '420px' }}
    />
  )
}

export function ProjectDetail({ projects, projectId, onBack }: Props) {
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return (
      <div>
        <button onClick={onBack} className="font-mono text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-8">
          ← projects
        </button>
        <p className="text-zinc-600 text-sm">Project not found.</p>
      </div>
    )
  }

  return (
    <div>
      <button onClick={onBack} className="font-mono text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-6">
        ← projects
      </button>

      {/* Banner image */}
      {project.banner && (
        <div
          className="relative w-full rounded-lg overflow-hidden mb-6"
          style={{ aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.07)', background: '#111116' }}
        >
          <Image
            src={project.banner}
            alt={`${project.name} banner`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-1">
          <h1 className="text-zinc-100 font-semibold text-lg leading-tight">{project.name}</h1>
          <div className="flex items-center gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors">
                GitHub ↗
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors">
                Demo ↗
              </a>
            )}
          </div>
        </div>
        <p className="text-zinc-500 text-xs">{project.fullName}</p>
        <p className="text-zinc-400 text-sm mt-3 max-w-xl leading-relaxed">{project.tagline}</p>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-1 mb-2">
        <span className="font-mono text-xs text-zinc-700">{project.timeline}</span>
        <span className="font-mono text-xs text-zinc-700">{project.role}</span>
        <span className={`font-mono text-xs ${
          project.status === 'active' ? 'text-emerald-600'
          : project.status === 'archived' ? 'text-zinc-700'
          : 'text-zinc-600'
        }`}>
          {project.status}
        </span>
      </div>

      <Divider />

      <section>
        <Label text="Problem" />
        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">{project.problem}</p>
      </section>

      <Divider />

      <section>
        <Label text="Architecture" />
        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">{project.architecture}</p>
      </section>

      <Divider />

      <section>
        <Label text="Technical challenges" />
        <ul className="space-y-3 max-w-2xl">
          {project.challenges.map((c) => (
            <li key={c} className="flex gap-3">
              <span className="text-zinc-700 text-sm flex-shrink-0 mt-0.5">—</span>
              <span className="text-zinc-400 text-sm leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      <section>
        <Label text="Tech stack" />
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-xs text-zinc-400 px-2 py-1 rounded"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Video demo */}
      {project.video && (
        <>
          <Divider />
          <section>
            <Label text="Demo" />
            <VideoEmbed url={project.video} />
          </section>
        </>
      )}

      <Divider />

      <section>
        <Label text="Key learnings" />
        <ul className="space-y-3 max-w-2xl">
          {project.learnings.map((l) => (
            <li key={l} className="flex gap-3">
              <span className="text-zinc-700 text-sm flex-shrink-0 mt-0.5">—</span>
              <span className="text-zinc-400 text-sm leading-relaxed">{l}</span>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      <section>
        <Label text="Impact" />
        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">{project.impact}</p>
      </section>

      <Divider />

      <section className="pb-4">
        <Label text="Future improvements" />
        <ul className="space-y-2 max-w-2xl">
          {project.futureImprovements.map((f) => (
            <li key={f} className="flex gap-3">
              <span className="text-zinc-700 text-sm flex-shrink-0 mt-0.5">—</span>
              <span className="text-zinc-500 text-sm leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
