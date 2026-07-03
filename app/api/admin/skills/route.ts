import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { skillsSchema } from '@/lib/validation'
import { revalidateAll } from '@/lib/revalidate'

export async function PUT(request: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = skillsSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // skill_categories cascade-deletes skills — full replace keeps this simple
  // since neither entity carries a stable id through the admin UI's local state.
  const { error: deleteError } = await supabase.from('skill_categories').delete().not('id', 'is', null)
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 })

  for (let i = 0; i < parsed.data.length; i++) {
    const group = parsed.data[i]
    const { data: catRow, error: catError } = await supabase
      .from('skill_categories')
      .insert({ category: group.category, sort_order: i })
      .select()
      .single()

    if (catError) return NextResponse.json({ error: catError.message }, { status: 500 })

    if (group.skills.length > 0) {
      const skillRows = group.skills.map((s, si) => ({
        category_id: catRow.id,
        name: s.name,
        proficiency: s.proficiency || null,
        sort_order: si,
      }))
      const { error: skillError } = await supabase.from('skills').insert(skillRows)
      if (skillError) return NextResponse.json({ error: skillError.message }, { status: 500 })
    }
  }

  revalidateAll()
  return NextResponse.json({ ok: true })
}
