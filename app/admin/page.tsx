'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { SiteContent, StoryEntry, Project, SkillGroup, ExperienceItem } from '@/types'

type Tab = 'profile' | 'story' | 'projects' | 'skills' | 'experience' | 'socials'

const TAB_LABELS: { id: Tab; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'story', label: 'Story' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'socials', label: 'Socials & Resume' },
]

// ── Shared UI primitives ──────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', fontSize: '11px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', fontFamily: 'monospace' }}>
      {children}
    </label>
  )
}

function Input({ value, onChange, placeholder, type = 'text' }: {
  value: string | number; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px', padding: '7px 10px', color: '#e2e2e8', fontSize: '13px',
        outline: 'none', boxSizing: 'border-box',
      }}
    />
  )
}

function Textarea({ value, onChange, rows = 3, placeholder }: {
  value: string; onChange: (v: string) => void; rows?: number; placeholder?: string
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      style={{
        width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px', padding: '7px 10px', color: '#e2e2e8', fontSize: '13px',
        outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit',
      }}
    />
  )
}

function Btn({ onClick, children, variant = 'default', disabled }: {
  onClick?: () => void; children: React.ReactNode; variant?: 'default' | 'danger' | 'primary'; disabled?: boolean
}) {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa' },
    danger: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' },
    primary: { background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' },
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant], padding: '5px 12px', borderRadius: '5px', fontSize: '12px',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '11px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

// ── Tab editors ──────────────────────────────────────────────

function ProfileTab({ content, onChange }: { content: SiteContent; onChange: (c: SiteContent) => void }) {
  const p = content.profile
  const set = (key: string, val: string | number) => onChange({ ...content, profile: { ...p, [key]: val } })
  const setBioLine = (i: number, val: string) => {
    const next = [...p.bioExtended]
    next[i] = val
    onChange({ ...content, profile: { ...p, bioExtended: next } })
  }

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div>
        <Label>Name</Label>
        <Input value={p.name} onChange={(v) => set('name', v)} />
      </div>
      <div>
        <Label>Title (one-liner under name)</Label>
        <Input value={p.title} onChange={(v) => set('title', v)} />
      </div>
      <div>
        <Label>Subtitle (meta description)</Label>
        <Input value={p.subtitle} onChange={(v) => set('subtitle', v)} />
      </div>
      <div>
        <Label>Location</Label>
        <Input value={p.location} onChange={(v) => set('location', v)} />
      </div>
      <div>
        <Label>University</Label>
        <Input value={p.university} onChange={(v) => set('university', v)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <Label>WAM</Label>
          <Input type="number" value={p.wam ?? ''} onChange={(v) => set('wam', parseFloat(v))} placeholder="79.65" />
        </div>
        <div>
          <Label>WAM Target</Label>
          <Input type="number" value={p.wamTarget ?? ''} onChange={(v) => set('wamTarget', parseFloat(v))} placeholder="85" />
        </div>
      </div>
      <div>
        <Label>Availability status</Label>
        <Input value={p.availability} onChange={(v) => set('availability', v)} />
      </div>
      <Section title="About me paragraphs">
        {p.bioExtended.map((para, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <Label>Paragraph {i + 1}</Label>
            <Textarea value={para} onChange={(v) => setBioLine(i, v)} rows={4} />
          </div>
        ))}
      </Section>
    </div>
  )
}

function StoryTab({ content, onChange }: { content: SiteContent; onChange: (c: SiteContent) => void }) {
  const story = content.story

  const setYear = (i: number, val: string) => {
    const next = story.map((e, idx) => idx === i ? { ...e, year: val } : e)
    onChange({ ...content, story: next })
  }

  const setEvent = (si: number, ei: number, val: string) => {
    const next = story.map((e, idx) => {
      if (idx !== si) return e
      const events = e.events.map((ev, eidx) => eidx === ei ? val : ev)
      return { ...e, events }
    })
    onChange({ ...content, story: next })
  }

  const addEvent = (si: number) => {
    const next = story.map((e, idx) => idx === si ? { ...e, events: [...e.events, ''] } : e)
    onChange({ ...content, story: next })
  }

  const removeEvent = (si: number, ei: number) => {
    const next = story.map((e, idx) => {
      if (idx !== si) return e
      return { ...e, events: e.events.filter((_, eidx) => eidx !== ei) }
    })
    onChange({ ...content, story: next })
  }

  const addYear = () => {
    onChange({ ...content, story: [...story, { year: String(new Date().getFullYear()), events: [''] }] })
  }

  const removeYear = (i: number) => {
    onChange({ ...content, story: story.filter((_, idx) => idx !== i) })
  }

  return (
    <div>
      {story.map((entry, si) => (
        <div key={si} style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ width: '80px' }}>
              <Label>Year</Label>
              <Input value={entry.year} onChange={(v) => setYear(si, v)} />
            </div>
            <Btn variant="danger" onClick={() => removeYear(si)}>Remove year</Btn>
          </div>
          <Label>Events</Label>
          {entry.events.map((ev, ei) => (
            <div key={ei} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <Input value={ev} onChange={(v) => setEvent(si, ei, v)} placeholder="Event description..." />
              </div>
              <Btn variant="danger" onClick={() => removeEvent(si, ei)}>×</Btn>
            </div>
          ))}
          <div style={{ marginTop: '8px' }}>
            <Btn onClick={() => addEvent(si)}>+ Add event</Btn>
          </div>
        </div>
      ))}
      <Btn variant="primary" onClick={addYear}>+ Add year</Btn>
    </div>
  )
}

function ImageUpload({ onUrl, label = '↑ Upload image' }: { onUrl: (url: string) => void; label?: string }) {
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setStatus(null)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/admin/upload?folder=banners', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok) {
        onUrl(data.url)
        setStatus('✓ uploaded')
      } else {
        setStatus(`Error: ${data.error}`)
      }
    } catch {
      setStatus('Upload failed')
    }
    setUploading(false)
    e.target.value = ''
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label style={{
        display: 'inline-block', padding: '5px 12px', borderRadius: '5px', fontSize: '12px',
        background: uploading ? 'rgba(255,255,255,0.03)' : 'rgba(139,92,246,0.15)',
        border: '1px solid rgba(139,92,246,0.3)', color: uploading ? '#52525b' : '#a78bfa',
        cursor: uploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
      }}>
        {uploading ? 'Uploading...' : label}
        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} style={{ display: 'none' }} />
      </label>
      {status && <span style={{ fontSize: '11px', color: status.startsWith('✓') ? '#34d399' : '#f87171', fontFamily: 'monospace' }}>{status}</span>}
    </div>
  )
}

function VideoUpload({ onUrl }: { onUrl: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setStatus(null)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/admin/upload?folder=videos', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok) {
        onUrl(data.url)
        setStatus('✓ uploaded')
      } else {
        setStatus(`Error: ${data.error}`)
      }
    } catch {
      setStatus('Upload failed')
    }
    setUploading(false)
    e.target.value = ''
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label style={{
        display: 'inline-block', padding: '5px 12px', borderRadius: '5px', fontSize: '12px',
        background: uploading ? 'rgba(255,255,255,0.03)' : 'rgba(139,92,246,0.15)',
        border: '1px solid rgba(139,92,246,0.3)', color: uploading ? '#52525b' : '#a78bfa',
        cursor: uploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
      }}>
        {uploading ? 'Uploading...' : '↑ Upload video'}
        <input type="file" accept="video/*" onChange={handleUpload} disabled={uploading} style={{ display: 'none' }} />
      </label>
      {status && <span style={{ fontSize: '11px', color: status.startsWith('✓') ? '#34d399' : '#f87171', fontFamily: 'monospace' }}>{status}</span>}
    </div>
  )
}

function ProjectsTab({ content, onChange }: { content: SiteContent; onChange: (c: SiteContent) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const projects = content.projects

  const setField = (id: string, key: string, val: string | string[]) => {
    onChange({
      ...content,
      projects: projects.map((p) => p.id === id ? { ...p, [key]: val } : p),
    })
  }

  const setArrayField = (id: string, key: string, index: number, val: string) => {
    const project = projects.find((p) => p.id === id)!
    const arr = [...(project[key as keyof Project] as string[])]
    arr[index] = val
    setField(id, key, arr)
  }

  const addToArray = (id: string, key: string) => {
    const project = projects.find((p) => p.id === id)!
    setField(id, key, [...(project[key as keyof Project] as string[]), ''])
  }

  const removeFromArray = (id: string, key: string, index: number) => {
    const project = projects.find((p) => p.id === id)!
    setField(id, key, (project[key as keyof Project] as string[]).filter((_, i) => i !== index))
  }

  const removeProject = (id: string) => {
    onChange({ ...content, projects: projects.filter((p) => p.id !== id) })
  }

  const addProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`, name: 'New Project', fullName: '', tagline: '',
      problem: '', architecture: '', challenges: [], solution: '', stack: [],
      status: 'completed', timeline: '', role: '', impact: '', learnings: [], futureImprovements: [],
    }
    onChange({ ...content, projects: [...projects, newProject] })
    setExpanded(newProject.id)
  }

  const renderArrayEditor = (projectId: string, key: string, label: string) => {
    const project = projects.find((p) => p.id === projectId)!
    const arr = project[key as keyof Project] as string[]
    return (
      <div style={{ marginBottom: '16px' }}>
        <Label>{label}</Label>
        {arr.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
            <div style={{ flex: 1 }}>
              <Input value={item} onChange={(v) => setArrayField(projectId, key, i, v)} />
            </div>
            <Btn variant="danger" onClick={() => removeFromArray(projectId, key, i)}>×</Btn>
          </div>
        ))}
        <Btn onClick={() => addToArray(projectId, key)}>+ Add</Btn>
      </div>
    )
  }

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id} style={{ marginBottom: '8px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
          <div
            style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}
            onClick={() => setExpanded(expanded === project.id ? null : project.id)}
          >
            <span style={{ color: '#e2e2e8', fontSize: '13px' }}>{project.name || '(unnamed)'}</span>
            <span style={{ color: '#52525b', fontSize: '12px' }}>{expanded === project.id ? '▲' : '▼'}</span>
          </div>

          {expanded === project.id && (
            <div style={{ padding: '16px', display: 'grid', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><Label>ID (url slug)</Label><Input value={project.id} onChange={(v) => setField(project.id, 'id', v)} /></div>
                <div><Label>Name</Label><Input value={project.name} onChange={(v) => setField(project.id, 'name', v)} /></div>
              </div>
              <div><Label>Full Name</Label><Input value={project.fullName} onChange={(v) => setField(project.id, 'fullName', v)} /></div>
              <div><Label>Tagline</Label><Input value={project.tagline} onChange={(v) => setField(project.id, 'tagline', v)} /></div>
              <div><Label>Timeline</Label><Input value={project.timeline} onChange={(v) => setField(project.id, 'timeline', v)} /></div>
              <div><Label>Role</Label><Input value={project.role} onChange={(v) => setField(project.id, 'role', v)} /></div>
              <div><Label>Status</Label>
                <select value={project.status} onChange={(e) => setField(project.id, 'status', e.target.value as Project['status'])}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '7px 10px', color: '#e2e2e8', fontSize: '13px', width: '100%' }}>
                  <option value="active">active</option>
                  <option value="completed">completed</option>
                  <option value="archived">archived</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><Label>GitHub URL</Label><Input value={project.github ?? ''} onChange={(v) => setField(project.id, 'github', v)} /></div>
                <div><Label>Demo URL</Label><Input value={project.demo ?? ''} onChange={(v) => setField(project.id, 'demo', v)} /></div>
              </div>
              <div>
                <Label>Banner image</Label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                  <ImageUpload onUrl={(url) => setField(project.id, 'banner', url)} />
                  {project.banner && (
                    <span style={{ fontSize: '11px', color: '#52525b', fontFamily: 'monospace' }}>✓ banner set</span>
                  )}
                </div>
                <Input value={project.banner ?? ''} onChange={(v) => setField(project.id, 'banner', v)} placeholder="or paste image URL" />
              </div>
              <div>
                <Label>Video (upload or paste URL)</Label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                  <VideoUpload onUrl={(url) => setField(project.id, 'video', url)} />
                  {project.video && <span style={{ fontSize: '11px', color: '#52525b', fontFamily: 'monospace' }}>✓ video set</span>}
                </div>
                <Input value={project.video ?? ''} onChange={(v) => setField(project.id, 'video', v)} placeholder="or paste YouTube / Vimeo / .mp4 URL" />
              </div>
              <div><Label>Problem</Label><Textarea value={project.problem} onChange={(v) => setField(project.id, 'problem', v)} rows={4} /></div>
              <div><Label>Architecture</Label><Textarea value={project.architecture} onChange={(v) => setField(project.id, 'architecture', v)} rows={4} /></div>
              <div><Label>Impact</Label><Textarea value={project.impact} onChange={(v) => setField(project.id, 'impact', v)} rows={3} /></div>
              {renderArrayEditor(project.id, 'stack', 'Tech Stack (one per row)')}
              {renderArrayEditor(project.id, 'challenges', 'Technical Challenges')}
              {renderArrayEditor(project.id, 'learnings', 'Key Learnings')}
              {renderArrayEditor(project.id, 'futureImprovements', 'Future Improvements')}
              <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Btn variant="danger" onClick={() => removeProject(project.id)}>Remove this project</Btn>
              </div>
            </div>
          )}
        </div>
      ))}
      <div style={{ marginTop: '12px' }}>
        <Btn variant="primary" onClick={addProject}>+ Add project</Btn>
      </div>
    </div>
  )
}

function SkillsTab({ content, onChange }: { content: SiteContent; onChange: (c: SiteContent) => void }) {
  const skills = content.skills

  const setCategory = (i: number, val: string) => {
    const next = skills.map((g, idx) => idx === i ? { ...g, category: val } : g)
    onChange({ ...content, skills: next })
  }

  const addSkill = (gi: number) => {
    const next = skills.map((g, idx) => idx === gi ? { ...g, skills: [...g.skills, { name: '', proficiency: '' }] } : g)
    onChange({ ...content, skills: next })
  }

  const setSkillField = (gi: number, si: number, key: 'name' | 'proficiency', val: string) => {
    const next = skills.map((g, idx) => {
      if (idx !== gi) return g
      return { ...g, skills: g.skills.map((s, sidx) => sidx === si ? { ...s, [key]: val } : s) }
    })
    onChange({ ...content, skills: next })
  }

  const removeSkill = (gi: number, si: number) => {
    const next = skills.map((g, idx) => {
      if (idx !== gi) return g
      return { ...g, skills: g.skills.filter((_, sidx) => sidx !== si) }
    })
    onChange({ ...content, skills: next })
  }

  const removeCategory = (i: number) => {
    onChange({ ...content, skills: skills.filter((_, idx) => idx !== i) })
  }

  const addCategory = () => {
    onChange({ ...content, skills: [...skills, { category: 'New Category', skills: [] }] })
  }

  return (
    <div>
      {skills.map((group, gi) => (
        <div key={gi} style={{ marginBottom: '20px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <Label>Category</Label>
              <Input value={group.category} onChange={(v) => setCategory(gi, v)} />
            </div>
            <Btn variant="danger" onClick={() => removeCategory(gi)}>Remove</Btn>
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            {group.skills.map((skill, si) => (
              <div key={si} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <Label>Skill name</Label>
                    <Input value={skill.name} onChange={(v) => setSkillField(gi, si, 'name', v)} placeholder="e.g. TypeScript" />
                  </div>
                  <div style={{ paddingTop: '18px' }}>
                    <Btn variant="danger" onClick={() => removeSkill(gi, si)}>×</Btn>
                  </div>
                </div>
                <Label>Proficiency (what you know + what you&apos;re still learning — one paragraph)</Label>
                <Textarea
                  value={skill.proficiency ?? ''}
                  onChange={(v) => setSkillField(gi, si, 'proficiency', v)}
                  rows={3}
                  placeholder="Describe what you know well and what you're still exploring or need to test..."
                />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '10px' }}>
            <Btn onClick={() => addSkill(gi)}>+ Add skill</Btn>
          </div>
        </div>
      ))}
      <Btn variant="primary" onClick={addCategory}>+ Add category</Btn>
    </div>
  )
}

function ExperienceTab({ content, onChange }: { content: SiteContent; onChange: (c: SiteContent) => void }) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const experience = content.experience

  const setField = (i: number, key: string, val: string | string[]) => {
    onChange({
      ...content,
      experience: experience.map((e, idx) => idx === i ? { ...e, [key]: val } : e),
    })
  }

  const setHighlight = (ei: number, hi: number, val: string) => {
    const highlights = [...experience[ei].highlights]
    highlights[hi] = val
    setField(ei, 'highlights', highlights)
  }

  const addHighlight = (ei: number) => {
    setField(ei, 'highlights', [...experience[ei].highlights, ''])
  }

  const removeHighlight = (ei: number, hi: number) => {
    setField(ei, 'highlights', experience[ei].highlights.filter((_, i) => i !== hi))
  }

  const removeItem = (i: number) => {
    onChange({ ...content, experience: experience.filter((_, idx) => idx !== i) })
  }

  const addItem = () => {
    const newItem: ExperienceItem = {
      organization: '', role: '', duration: '', description: '',
      highlights: [], type: 'work', location: 'Melbourne, Australia',
    }
    onChange({ ...content, experience: [...experience, newItem] })
    setExpanded(experience.length)
  }

  return (
    <div>
      {experience.map((item, i) => (
        <div key={i} style={{ marginBottom: '8px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
          <div
            style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <span style={{ color: '#e2e2e8', fontSize: '13px' }}>
              {item.role || '(unnamed)'}{item.organization ? ` · ${item.organization}` : ''}
            </span>
            <span style={{ color: '#52525b', fontSize: '12px' }}>{expanded === i ? '▲' : '▼'}</span>
          </div>

          {expanded === i && (
            <div style={{ padding: '16px', display: 'grid', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><Label>Role</Label><Input value={item.role} onChange={(v) => setField(i, 'role', v)} /></div>
                <div><Label>Organization</Label><Input value={item.organization} onChange={(v) => setField(i, 'organization', v)} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><Label>Duration</Label><Input value={item.duration} onChange={(v) => setField(i, 'duration', v)} placeholder="2023 – Present" /></div>
                <div><Label>Type</Label>
                  <select value={item.type} onChange={(e) => setField(i, 'type', e.target.value as ExperienceItem['type'])}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '7px 10px', color: '#e2e2e8', fontSize: '13px', width: '100%' }}>
                    <option value="education">education</option>
                    <option value="work">work</option>
                    <option value="achievement">achievement</option>
                    <option value="project">project</option>
                  </select>
                </div>
              </div>
              <div><Label>Location</Label><Input value={item.location} onChange={(v) => setField(i, 'location', v)} /></div>
              <div><Label>Description</Label><Textarea value={item.description} onChange={(v) => setField(i, 'description', v)} rows={3} /></div>
              <div>
                <Label>Highlights</Label>
                {item.highlights.map((h, hi) => (
                  <div key={hi} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <div style={{ flex: 1 }}><Input value={h} onChange={(v) => setHighlight(i, hi, v)} /></div>
                    <Btn variant="danger" onClick={() => removeHighlight(i, hi)}>×</Btn>
                  </div>
                ))}
                <Btn onClick={() => addHighlight(i)}>+ Add highlight</Btn>
              </div>
              <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Btn variant="danger" onClick={() => removeItem(i)}>Remove this item</Btn>
              </div>
            </div>
          )}
        </div>
      ))}
      <div style={{ marginTop: '12px' }}>
        <Btn variant="primary" onClick={addItem}>+ Add item</Btn>
      </div>
    </div>
  )
}

// ── Socials tab ──────────────────────────────────────────────

function SocialsTab({ content, onChange }: { content: SiteContent; onChange: (c: SiteContent) => void }) {
  const s = content.socials
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)

  const set = (key: string, val: string) => onChange({ ...content, socials: { ...s, [key]: val } })

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadStatus(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()

      if (res.ok) {
        set('resume', data.url)
        setUploadStatus(`✓ Uploaded: ${file.name}`)
      } else {
        setUploadStatus(`Error: ${data.error}`)
      }
    } catch {
      setUploadStatus('Upload failed — network error')
    }

    setUploading(false)
    e.target.value = ''
  }

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div>
        <Label>GitHub URL</Label>
        <Input value={s.github} onChange={(v) => set('github', v)} placeholder="https://github.com/username" />
      </div>
      <div>
        <Label>LinkedIn URL</Label>
        <Input value={s.linkedin} onChange={(v) => set('linkedin', v)} placeholder="https://linkedin.com/in/username" />
      </div>
      <div>
        <Label>Email</Label>
        <Input value={s.email} onChange={(v) => set('email', v)} placeholder="you@email.com" />
      </div>

      <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Label>Resume</Label>

        {/* Current URL */}
        <div style={{ marginBottom: '12px', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '11px', color: '#52525b', fontFamily: 'monospace', marginBottom: '4px' }}>Current URL</p>
          <p style={{ fontSize: '12px', color: '#a1a1aa', wordBreak: 'break-all' }}>{s.resume || '(not set)'}</p>
        </div>

        {/* Upload new PDF */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{
            display: 'inline-block', padding: '7px 14px', borderRadius: '6px', fontSize: '12px',
            background: uploading ? 'rgba(255,255,255,0.03)' : 'rgba(139,92,246,0.15)',
            border: '1px solid rgba(139,92,246,0.3)', color: uploading ? '#52525b' : '#a78bfa',
            cursor: uploading ? 'not-allowed' : 'pointer',
          }}>
            {uploading ? 'Uploading...' : '↑ Upload new PDF'}
            <input type="file" accept=".pdf" onChange={handleResumeUpload} disabled={uploading} style={{ display: 'none' }} />
          </label>
          {uploadStatus && (
            <span style={{ marginLeft: '12px', fontSize: '12px', color: uploadStatus.startsWith('✓') ? '#34d399' : '#f87171', fontFamily: 'monospace' }}>
              {uploadStatus}
            </span>
          )}
        </div>

        {/* Or paste URL manually */}
        <div>
          <p style={{ fontSize: '11px', color: '#3f3f46', fontFamily: 'monospace', marginBottom: '6px' }}>or paste a URL directly</p>
          <Input value={s.resume} onChange={(v) => set('resume', v)} placeholder="https://... or /resume.pdf" />
        </div>

        <p style={{ marginTop: '10px', fontSize: '11px', color: '#3f3f46', fontFamily: 'monospace' }}>
          After uploading, click "Save &amp; Publish" above to make it live.
        </p>
      </div>
    </div>
  )
}

// ── Main admin page ──────────────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data) => { setContent(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const save = async () => {
    if (!content) return
    setSaving(true)
    setStatus(null)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Saved — live site updated.' })
      } else {
        const err = await res.json()
        setStatus({ type: 'error', msg: err.error || 'Save failed.' })
      }
    } catch {
      setStatus({ type: 'error', msg: 'Network error.' })
    }
    setSaving(false)
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#52525b' }}>Loading content...</span>
      </div>
    )
  }

  if (!content) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#ef4444' }}>Failed to load content.</span>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d10' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0d0d10', position: 'sticky', top: 0, zIndex: 10 }}>
        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#52525b' }}>
          ~/archit &gt; <span style={{ color: '#a78bfa' }}>admin</span>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {status && (
            <span style={{ fontSize: '12px', color: status.type === 'success' ? '#34d399' : '#f87171', fontFamily: 'monospace' }}>
              {status.msg}
            </span>
          )}
          <Btn variant="primary" onClick={save} disabled={saving}>
            {saving ? 'Saving...' : 'Save & Publish'}
          </Btn>
          <button onClick={logout} style={{ background: 'none', border: 'none', color: '#52525b', fontSize: '12px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 44px)' }}>
        {/* Sidebar */}
        <div style={{ width: '160px', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)', padding: '16px 12px' }}>
          {TAB_LABELS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px',
                background: activeTab === t.id ? 'rgba(139,92,246,0.1)' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: activeTab === t.id ? '#a78bfa' : '#71717a',
                fontSize: '13px', cursor: 'pointer', marginBottom: '2px',
              }}
            >
              {t.label}
            </button>
          ))}
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <a href="/" target="_blank" style={{ display: 'block', fontSize: '11px', color: '#3f3f46', fontFamily: 'monospace', textDecoration: 'none' }}>
              View site ↗
            </a>
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          {activeTab === 'profile' && <ProfileTab content={content} onChange={setContent} />}
          {activeTab === 'story' && <StoryTab content={content} onChange={setContent} />}
          {activeTab === 'projects' && <ProjectsTab content={content} onChange={setContent} />}
          {activeTab === 'skills' && <SkillsTab content={content} onChange={setContent} />}
          {activeTab === 'experience' && <ExperienceTab content={content} onChange={setContent} />}
          {activeTab === 'socials' && <SocialsTab content={content} onChange={setContent} />}
        </div>
      </div>
    </div>
  )
}
