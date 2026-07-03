import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { experienceSchema } from '@/lib/validation'
import { revalidateAll } from '@/lib/revalidate'

export async function PUT(request: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = experienceSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { error: deleteError } = await supabase.from('experience_items').delete().not('id', 'is', null)
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 })

  if (parsed.data.length > 0) {
    const rows = parsed.data.map((item, i) => ({
      organization: item.organization,
      role: item.role,
      duration: item.duration,
      description: item.description,
      highlights: item.highlights,
      type: item.type,
      location: item.location,
      sort_order: i,
    }))
    const { error: insertError } = await supabase.from('experience_items').insert(rows)
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  revalidateAll()
  return NextResponse.json({ ok: true })
}
