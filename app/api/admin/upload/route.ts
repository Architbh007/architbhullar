import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const MAX_SIZE = 15 * 1024 * 1024 // 15MB

const BUCKET_BY_FOLDER: Record<string, string> = {
  banners: 'projects',
  architecture: 'projects',
  screenshots: 'projects',
  videos: 'videos',
  profile: 'profile',
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']

export async function POST(request: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const folder = searchParams.get('folder') ?? 'profile'
  const bucket = BUCKET_BY_FOLDER[folder] ?? 'projects'

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const isVideo = folder === 'videos'
  const allowedTypes = isVideo ? ALLOWED_VIDEO_TYPES : ALLOWED_IMAGE_TYPES
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: `Unsupported file type: ${file.type || 'unknown'}` }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 15MB)' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const path = `${folder}/${Date.now()}-${safeName}`

  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, { contentType: file.type })
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path)
  return NextResponse.json({ url: publicUrl })
}
