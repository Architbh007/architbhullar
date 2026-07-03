import { NextResponse } from 'next/server'
import { getContent } from '@/lib/content'
import { requireAdmin } from '@/lib/supabase/server'

export async function GET() {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const content = await getContent()
  return NextResponse.json(content)
}
