import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { profileSchema } from '@/lib/validation'
import { revalidateAll } from '@/lib/revalidate'

export async function PUT(request: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = profileSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }, { status: 400 })
  }
  const p = parsed.data

  const supabase = createAdminClient()
  const { error } = await supabase.from('profile').upsert({
    id: 1,
    name: p.name,
    first_name: p.firstName,
    last_name: p.lastName,
    title: p.title,
    subtitle: p.subtitle,
    bio: p.bio,
    bio_extended: p.bioExtended,
    photo_url: p.photo || null,
    availability: p.availability,
    location: p.location,
    university: p.university,
    email: p.email,
    wam: p.wam ?? null,
    wam_target: p.wamTarget ?? null,
    updated_at: new Date().toISOString(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  revalidateAll()
  return NextResponse.json({ ok: true })
}
