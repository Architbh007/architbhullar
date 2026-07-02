import type { SiteContent } from '@/types'
import { profile } from '@/content/profile'
import { stack } from '@/content/stack'
import { story } from '@/content/story'
import { projects } from '@/content/projects'
import { skillGroups } from '@/content/skills'
import { experience } from '@/content/experience'
import { socials } from '@/content/socials'

const DEFAULT_CONTENT: SiteContent = {
  profile,
  stack,
  story,
  projects,
  skills: skillGroups,
  experience,
  socials,
}

export async function getContent(): Promise<SiteContent> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return DEFAULT_CONTENT
  }

  try {
    const { list } = await import('@vercel/blob')
    const { blobs } = await list({ prefix: 'content/' })
    const blob = blobs.find((b) => b.pathname === 'content/site-content.json')

    if (!blob) return DEFAULT_CONTENT

    const res = await fetch(blob.url, { next: { revalidate: 60 } })
    if (!res.ok) return DEFAULT_CONTENT

    return (await res.json()) as SiteContent
  } catch {
    return DEFAULT_CONTENT
  }
}
