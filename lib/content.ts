import type {
  SiteContent, Profile, StoryEntry, Project, SkillGroup, ExperienceItem, Socials, ContactInformation,
} from '@/types'
import { createPublicClient } from '@/lib/supabase/public'
import { stack } from '@/content/stack'

const EMPTY_PROFILE: Profile = {
  name: '', firstName: '', lastName: '', title: '', subtitle: '', bio: '', bioExtended: [],
  photo: '', availability: '', location: '', university: '', email: '',
}

type ProjectMediaRow = {
  project_id: string
  kind: 'cover' | 'architecture' | 'screenshot' | 'video'
  url: string
}

export async function getContent(): Promise<SiteContent> {
  const supabase = createPublicClient()

  const [
    { data: profileRow },
    { data: timelineRows },
    { data: experienceRows },
    { data: categoryRows },
    { data: skillRows },
    { data: projectRows },
    { data: mediaRows },
    { data: socialRow },
    { data: resumeRow },
    { data: contactRow },
  ] = await Promise.all([
    supabase.from('profile').select('*').eq('id', 1).maybeSingle(),
    supabase.from('timeline_entries').select('*').order('sort_order'),
    supabase.from('experience_items').select('*').order('sort_order'),
    supabase.from('skill_categories').select('*').order('sort_order'),
    supabase.from('skills').select('*').order('sort_order'),
    supabase.from('projects').select('*').order('sort_order'),
    supabase.from('project_media').select('*').order('sort_order'),
    supabase.from('social_links').select('*').eq('id', 1).maybeSingle(),
    supabase.from('resume').select('*').eq('id', 1).maybeSingle(),
    supabase.from('contact_information').select('*').eq('id', 1).maybeSingle(),
  ])

  const profile: Profile = profileRow ? {
    name: profileRow.name,
    firstName: profileRow.first_name,
    lastName: profileRow.last_name,
    title: profileRow.title,
    subtitle: profileRow.subtitle,
    bio: profileRow.bio,
    bioExtended: profileRow.bio_extended ?? [],
    photo: profileRow.photo_url ?? '',
    availability: profileRow.availability,
    location: profileRow.location,
    university: profileRow.university,
    email: profileRow.email,
    wam: profileRow.wam ?? undefined,
    wamTarget: profileRow.wam_target ?? undefined,
  } : EMPTY_PROFILE

  const story: StoryEntry[] = (timelineRows ?? []).map((r) => ({
    year: r.year,
    events: r.events ?? [],
  }))

  const experience: ExperienceItem[] = (experienceRows ?? []).map((r) => ({
    organization: r.organization,
    role: r.role,
    duration: r.duration,
    description: r.description,
    highlights: r.highlights ?? [],
    type: r.type,
    location: r.location,
  }))

  const skills: SkillGroup[] = (categoryRows ?? []).map((cat) => ({
    category: cat.category,
    skills: (skillRows ?? [])
      .filter((s) => s.category_id === cat.id)
      .map((s) => ({ name: s.name, proficiency: s.proficiency ?? undefined })),
  }))

  const mediaByProject = new Map<string, ProjectMediaRow[]>()
  ;(mediaRows ?? []).forEach((m: ProjectMediaRow) => {
    const list = mediaByProject.get(m.project_id) ?? []
    list.push(m)
    mediaByProject.set(m.project_id, list)
  })

  const projects: Project[] = (projectRows ?? []).map((r) => {
    const media = mediaByProject.get(r.id) ?? []
    const cover = media.find((m) => m.kind === 'cover')
    const video = media.find((m) => m.kind === 'video')
    return {
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      tagline: r.tagline,
      problem: r.problem,
      architecture: r.architecture,
      challenges: r.challenges ?? [],
      solution: r.solution,
      stack: r.stack ?? [],
      github: r.github ?? undefined,
      demo: r.demo ?? undefined,
      banner: cover?.url,
      video: video?.url,
      status: r.status,
      timeline: r.timeline,
      role: r.role,
      impact: r.impact,
      learnings: r.learnings ?? [],
      futureImprovements: r.future_improvements ?? [],
      featured: r.featured ?? undefined,
    }
  })

  const socials: Socials = {
    github: socialRow?.github ?? '',
    linkedin: socialRow?.linkedin ?? '',
    email: socialRow?.email ?? '',
    resume: resumeRow?.url ?? '',
  }

  const contactInformation: ContactInformation = {
    availabilityBlurb: contactRow?.availability_blurb ?? '',
    extraBlurb: contactRow?.extra_blurb ?? '',
    responseNote: contactRow?.response_note ?? '',
    calLink: contactRow?.cal_link ?? '',
  }

  return { profile, stack, story, projects, skills, experience, socials, contactInformation }
}
