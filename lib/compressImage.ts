// Downscales + re-encodes an image client-side before upload. Skipped for
// GIFs (canvas re-encode would kill animation) and files already small.
export async function compressImage(file: File, maxDimension = 1600, quality = 0.82): Promise<File> {
  if (file.type === 'image/gif' || file.size < 300 * 1024) return file

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return file

  ctx.drawImage(bitmap, 0, 0, width, height)

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/webp', quality)
  )
  if (!blob || blob.size >= file.size) return file

  const newName = file.name.replace(/\.\w+$/, '.webp')
  return new File([blob], newName, { type: 'image/webp' })
}
