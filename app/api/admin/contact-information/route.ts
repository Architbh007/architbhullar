import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { contactInformationSchema } from '@/lib/validation'
import { revalidateAll } from '@/lib/revalidate'

export async function PUT(request: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = contactInformationSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }, { status: 400 })
  }
  const c = parsed.data

  const supabase = createAdminClient()
  const { error } = await supabase.from('contact_information').upsert({
    id: 1,
    availability_blurb: c.availabilityBlurb,
    extra_blurb: c.extraBlurb,
    response_note: c.responseNote,
    cal_link: c.calLink,
    updated_at: new Date().toISOString(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  revalidateAll()
  return NextResponse.json({ ok: true })
}
