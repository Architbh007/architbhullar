import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

const ADMIN_EMAIL = 'bhullararchit@gmail.com'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // called from a Server Component render — safe to ignore, proxy refreshes the session
          }
        },
      },
    }
  )
}

// Every /api/admin/* route handler must call this before touching data —
// proxy.ts's matcher gates the route, but per Next.js's own guidance
// (see proxy.ts file convention docs) a route must not rely on proxy alone.
export async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== ADMIN_EMAIL) {
    return null
  }

  return user
}
