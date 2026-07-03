import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidateAll } from '@/lib/revalidate'

const STORAGE_PATH = 'resume.pdf'

// The file itself is uploaded directly from the browser to Supabase Storage
// (see lib/uploadToStorage.ts) — Vercel Serverless Functions cap request
// bodies at ~4.5MB, which some resume PDFs could exceed. This route only
// records the resulting filename/timestamp once the upload has completed.
export async function POST(request: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { filename } = await request.json()
  if (!filename) return NextResponse.json({ error: 'Filename is required' }, { status: 400 })

  const supabase = createAdminClient()
  const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(STORAGE_PATH)
  const url = `${publicUrl}?v=${Date.now()}` // cache-bust — same path every time

  const { error: dbError } = await supabase.from('resume').upsert({
    id: 1,
    url,
    storage_path: STORAGE_PATH,
    filename,
    uploaded_at: new Date().toISOString(),
  })
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  revalidateAll()
  return NextResponse.json({ url })
}
