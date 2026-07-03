import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { socialLinksSchema } from '@/lib/validation'
import { revalidateAll } from '@/lib/revalidate'

export async function PUT(request: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = socialLinksSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }, { status: 400 })
  }
  const s = parsed.data

  const supabase = createAdminClient()

  const { error: socialError } = await supabase.from('social_links').upsert({
    id: 1,
    github: s.github,
    linkedin: s.linkedin,
    email: s.email,
    updated_at: new Date().toISOString(),
  })
  if (socialError) return NextResponse.json({ error: socialError.message }, { status: 500 })

  // A manually-pasted resume URL (as opposed to a real upload via POST /api/admin/resume)
  // only touches the url column — omitted columns are left untouched by upsert.
  const { error: resumeError } = await supabase
    .from('resume')
    .upsert({ id: 1, url: s.resume || null })
  if (resumeError) return NextResponse.json({ error: resumeError.message }, { status: 500 })

  revalidateAll()
  return NextResponse.json({ ok: true })
}
