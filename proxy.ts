import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname === '/admin/login') return NextResponse.next()
  if (pathname.startsWith('/api/admin/login')) return NextResponse.next()

  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return new NextResponse('Admin not configured. Set ADMIN_PASSWORD env var.', { status: 503 })
  }

  const sessionCookie = request.cookies.get('admin-session')?.value

  if (sessionCookie !== adminPassword) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
