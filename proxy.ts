import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionUser } from '@/lib/supabase/middleware'

const ADMIN_EMAIL = 'bhullararchit@gmail.com'
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/set-password']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next()
  }
  if (PUBLIC_ADMIN_PATHS.includes(pathname)) return NextResponse.next()
  if (pathname.startsWith('/api/admin/login')) return NextResponse.next()

  const { user, response } = await getSessionUser(request)

  if (!user || user.email !== ADMIN_EMAIL) {
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
