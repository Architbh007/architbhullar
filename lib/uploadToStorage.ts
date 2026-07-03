import { createClient } from '@/lib/supabase/browser'

const BUCKET_BY_FOLDER: Record<string, string> = {
  banners: 'projects',
  architecture: 'projects',
  screenshots: 'projects',
  videos: 'videos',
  profile: 'profile',
}

// Uploads straight from the browser to Supabase Storage — bypassing our own
// API routes entirely, since Vercel Serverless Functions hard-cap request
// bodies at ~4.5MB (a platform limit, not something Next.js config can raise),
// which any real video and some images would exceed. RLS on the bucket
// already restricts writes to the logged-in admin.
export async function uploadToStorage(file: File, folder: string): Promise<string> {
  const bucket = BUCKET_BY_FOLDER[folder] ?? 'projects'
  const supabase = createClient()

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const path = `${folder}/${Date.now()}-${safeName}`

  const { error } = await supabase.storage.from(bucket).upload(path, file, { contentType: file.type })
  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
