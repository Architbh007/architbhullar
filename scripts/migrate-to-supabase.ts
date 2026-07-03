import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { profile } from '../content/profile'
import { story } from '../content/story'
import { projects } from '../content/projects'
import { skillGroups } from '../content/skills'
import { experience } from '../content/experience'
import { socials } from '../content/socials'

// Exact strings that were hardcoded in components/views/ContactView.tsx before
// this migration — preserved verbatim so the public page is unchanged.
const CONTACT_INFO = {
  availability_blurb:
    'Currently seeking Software Engineering and AI Engineering internship opportunities for the Australian Summer (November 2026 – February 2027). I hold a Student Visa (Subclass 500) with full working rights during the summer break, as I am not enrolled in Trimester 3. Upon graduating in November 2027, I will be eligible to apply for the Temporary Graduate Visa (Subclass 485).',
  extra_blurb:
    "I'm always open to discussing engineering opportunities, technical projects, and how I can contribute to building impactful products.",
  response_note: 'Fastest response via email — I typically reply within 24 hours.',
  cal_link: 'https://cal.com/architbh007/coffee-chat',
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')

  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })

  console.log('Uploading profile photo...')
  const photoBuffer = readFileSync('public/images/profile.jpg')
  const photoPath = 'profile.jpg'
  const { error: photoUploadError } = await supabase.storage
    .from('profile')
    .upload(photoPath, photoBuffer, { contentType: 'image/jpeg', upsert: true })
  if (photoUploadError) throw photoUploadError
  const { data: { publicUrl: photoUrl } } = supabase.storage.from('profile').getPublicUrl(photoPath)

  console.log('Inserting profile...')
  const { error: profileError } = await supabase.from('profile').upsert({
    id: 1,
    name: profile.name,
    first_name: profile.firstName,
    last_name: profile.lastName,
    title: profile.title,
    subtitle: profile.subtitle,
    bio: profile.bio,
    bio_extended: profile.bioExtended,
    photo_url: photoUrl,
    availability: profile.availability,
    location: profile.location,
    university: profile.university,
    email: profile.email,
    wam: profile.wam ?? null,
    wam_target: profile.wamTarget ?? null,
  })
  if (profileError) throw profileError

  console.log('Inserting timeline...')
  const { error: timelineError } = await supabase.from('timeline_entries').insert(
    story.map((entry, i) => ({ year: entry.year, events: entry.events, sort_order: i }))
  )
  if (timelineError) throw timelineError

  console.log('Inserting experience...')
  const { error: experienceError } = await supabase.from('experience_items').insert(
    experience.map((item, i) => ({
      organization: item.organization,
      role: item.role,
      duration: item.duration,
      description: item.description,
      highlights: item.highlights,
      type: item.type,
      location: item.location,
      sort_order: i,
    }))
  )
  if (experienceError) throw experienceError

  console.log('Inserting skills...')
  for (let i = 0; i < skillGroups.length; i++) {
    const group = skillGroups[i]
    const { data: catRow, error: catError } = await supabase
      .from('skill_categories')
      .insert({ category: group.category, sort_order: i })
      .select()
      .single()
    if (catError) throw catError

    if (group.skills.length > 0) {
      const { error: skillError } = await supabase.from('skills').insert(
        group.skills.map((s, si) => ({
          category_id: catRow.id,
          name: s.name,
          proficiency: s.proficiency ?? null,
          sort_order: si,
        }))
      )
      if (skillError) throw skillError
    }
  }

  console.log('Inserting projects...')
  const { error: projectsError } = await supabase.from('projects').insert(
    projects.map((p, i) => ({
      id: p.id,
      name: p.name,
      full_name: p.fullName,
      tagline: p.tagline,
      problem: p.problem,
      architecture: p.architecture,
      challenges: p.challenges,
      solution: p.solution,
      stack: p.stack,
      github: p.github ?? null,
      demo: p.demo ?? null,
      status: p.status,
      timeline: p.timeline,
      role: p.role,
      impact: p.impact,
      learnings: p.learnings,
      future_improvements: p.futureImprovements,
      featured: p.featured ?? false,
      sort_order: i,
    }))
  )
  if (projectsError) throw projectsError

  console.log('Inserting project media (banner/video URLs copied as-is)...')
  for (const p of projects) {
    const mediaRows: { project_id: string; kind: string; url: string; sort_order: number }[] = []
    if (p.banner) mediaRows.push({ project_id: p.id, kind: 'cover', url: p.banner, sort_order: 0 })
    if (p.video) mediaRows.push({ project_id: p.id, kind: 'video', url: p.video, sort_order: 0 })
    if (mediaRows.length > 0) {
      const { error } = await supabase.from('project_media').insert(mediaRows)
      if (error) throw error
    }
  }

  console.log('Inserting social links...')
  const { error: socialError } = await supabase.from('social_links').upsert({
    id: 1,
    github: socials.github,
    linkedin: socials.linkedin,
    email: socials.email,
  })
  if (socialError) throw socialError

  // No public/resume.pdf exists yet — leave empty, admin uploads it fresh via /admin.
  console.log('Seeding empty resume row...')
  const { error: resumeError } = await supabase
    .from('resume')
    .upsert({ id: 1, url: null, storage_path: null, filename: null })
  if (resumeError) throw resumeError

  console.log('Inserting contact information...')
  const { error: contactError } = await supabase.from('contact_information').upsert({ id: 1, ...CONTACT_INFO })
  if (contactError) throw contactError

  console.log('Migration complete.')
}

main().catch((err) => {
  console.error('Migration FAILED:', err)
  process.exitCode = 1
})
