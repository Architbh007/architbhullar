import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getContent } from '@/lib/content'

export async function GET() {
  const content = await getContent()
  return NextResponse.json(content)
}

export async function PUT(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Blob not configured' }, { status: 503 })
  }

  try {
    const content = await request.json()
    const { put } = await import('@vercel/blob')

    await put('content/site-content.json', JSON.stringify(content), {
      access: 'public',
      addRandomSuffix: false,
    })

    // Revalidate all public routes
    const routes = ['/', '/projects', '/skills', '/experience', '/contact']
    routes.forEach((p) => revalidatePath(p))

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
