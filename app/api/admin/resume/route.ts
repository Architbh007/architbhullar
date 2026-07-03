import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidateAll } from '@/lib/revalidate'

const MAX_SIZE = 10 * 1024 * 1024 // 10MB
const STORAGE_PATH = 'resume.pdf'

export async function POST(request: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Resume must be a PDF file' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Always the same storage path — a new upload replaces the previous file,
  // so there is never more than one active resume in the bucket.
  const { error: uploadError } = await supabase.storage
    .from('resumes')
    .upload(STORAGE_PATH, file, { upsert: true, contentType: file.type })
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(STORAGE_PATH)
  const url = `${publicUrl}?v=${Date.now()}` // cache-bust — same path every time

  const { error: dbError } = await supabase.from('resume').upsert({
    id: 1,
    url,
    storage_path: STORAGE_PATH,
    filename: file.name,
    uploaded_at: new Date().toISOString(),
  })
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  revalidateAll()
  return NextResponse.json({ url })
}
