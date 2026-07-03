import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { projectsSchema } from '@/lib/validation'
import { revalidateAll } from '@/lib/revalidate'

export async function PUT(request: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = projectsSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }, { status: 400 })
  }
  const projects = parsed.data

  const supabase = createAdminClient()

  const { data: existingRows, error: fetchError } = await supabase.from('projects').select('id')
  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 })

  const existingIds = new Set((existingRows ?? []).map((r) => r.id))
  const nextIds = new Set(projects.map((p) => p.id))
  const toDelete = [...existingIds].filter((id) => !nextIds.has(id))

  if (toDelete.length > 0) {
    const { error } = await supabase.from('projects').delete().in('id', toDelete)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const rows = projects.map((p, i) => ({
    id: p.id,
    name: p.name,
    full_name: p.fullName,
    tagline: p.tagline,
    problem: p.problem,
    architecture: p.architecture,
    challenges: p.challenges,
    solution: p.solution,
    stack: p.stack,
    github: p.github || null,
    demo: p.demo || null,
    status: p.status,
    timeline: p.timeline,
    role: p.role,
    impact: p.impact,
    learnings: p.learnings,
    future_improvements: p.futureImprovements,
    featured: p.featured ?? false,
    sort_order: i,
    updated_at: new Date().toISOString(),
  }))

  const { error: upsertError } = await supabase.from('projects').upsert(rows)
  if (upsertError) return NextResponse.json({ error: upsertError.message }, { status: 500 })

  // banner/video map 1:1 onto project_media rows with kind='cover'/'video'
  for (const p of projects) {
    for (const kind of ['cover', 'video'] as const) {
      const url = kind === 'cover' ? p.banner : p.video

      const { data: existingMedia } = await supabase
        .from('project_media')
        .select('id')
        .eq('project_id', p.id)
        .eq('kind', kind)
        .maybeSingle()

      if (!url) {
        if (existingMedia) await supabase.from('project_media').delete().eq('id', existingMedia.id)
        continue
      }

      if (existingMedia) {
        await supabase.from('project_media').update({ url }).eq('id', existingMedia.id)
      } else {
        await supabase.from('project_media').insert({ project_id: p.id, kind, url, sort_order: 0 })
      }
    }
  }

  revalidateAll()
  return NextResponse.json({ ok: true })
}
