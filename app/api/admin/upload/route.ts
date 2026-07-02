import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Blob not configured' }, { status: 503 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder') ?? 'uploads'

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const { put } = await import('@vercel/blob')

    const blob = await put(`${folder}/${file.name}`, file, {
      access: 'public',
      addRandomSuffix: false,
    })

    return NextResponse.json({ url: blob.url })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
