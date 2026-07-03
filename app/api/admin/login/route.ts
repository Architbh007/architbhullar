import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isRateLimited, recordFailedAttempt, clearAttempts } from '@/lib/rateLimit'

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || 'unknown'
}

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const ip = getClientIp(request)

  if (await isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again in a few minutes.' },
      { status: 429 }
    )
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    await recordFailedAttempt(ip)
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  await clearAttempts(ip)
  return NextResponse.json({ ok: true })
}
