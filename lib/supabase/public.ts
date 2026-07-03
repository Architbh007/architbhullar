import { createClient } from '@supabase/supabase-js'

// No cookies, no session — safe to call from statically-rendered / ISR server
// components (getContent()) without opting them into dynamic rendering.
// RLS "public_read" policies allow anon SELECT on every table.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )
}
