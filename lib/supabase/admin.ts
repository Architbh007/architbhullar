import { createClient } from '@supabase/supabase-js'

// Service-role client — bypasses RLS. Server-only, never import from a
// client component. Callers must independently verify the caller is the
// admin (see requireAdmin() in lib/supabase/server.ts) before using this.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
