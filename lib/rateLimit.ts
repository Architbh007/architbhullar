import { createAdminClient } from '@/lib/supabase/admin'

const WINDOW_MINUTES = 15
const MAX_ATTEMPTS = 5

export async function isRateLimited(identifier: string): Promise<boolean> {
  const supabase = createAdminClient()
  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString()

  const { count } = await supabase
    .from('login_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('identifier', identifier)
    .gte('created_at', windowStart)

  return (count ?? 0) >= MAX_ATTEMPTS
}

export async function recordFailedAttempt(identifier: string) {
  const supabase = createAdminClient()
  await supabase.from('login_attempts').insert({ identifier })

  // Opportunistic cleanup so the table never needs a cron job to stay small.
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  await supabase.from('login_attempts').delete().lt('created_at', cutoff)
}

export async function clearAttempts(identifier: string) {
  const supabase = createAdminClient()
  await supabase.from('login_attempts').delete().eq('identifier', identifier)
}
