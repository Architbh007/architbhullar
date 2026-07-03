'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/browser'

type Status = 'checking' | 'ready' | 'invalid' | 'saving' | 'done'

export default function SetPassword() {
  const [status, setStatus] = useState<Status>('checking')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setStatus(session ? 'ready' : 'invalid')
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setStatus('saving')
    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
      setStatus('ready')
      return
    }

    setStatus('done')
    setTimeout(() => {
      router.push('/admin')
      router.refresh()
    }, 1200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0d0d10' }}>
      <div className="w-full max-w-xs">
        <p className="font-mono text-xs text-zinc-600 mb-6">~/archit &gt; set admin password</p>

        {status === 'checking' && (
          <p className="font-mono text-xs text-zinc-600">Verifying invite link...</p>
        )}

        {status === 'invalid' && (
          <p className="font-mono text-xs text-red-500">
            This invite link is invalid or has expired. Ask for a new one to be sent.
          </p>
        )}

        {status === 'done' && (
          <p className="font-mono text-xs text-emerald-400">Password set — redirecting...</p>
        )}

        {(status === 'ready' || status === 'saving') && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-[11px] text-zinc-600 uppercase tracking-widest block mb-2">
                New password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                autoComplete="new-password"
                className="w-full bg-transparent border text-zinc-200 text-sm px-3 py-2 rounded-md outline-none font-mono"
                style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
            </div>

            <div>
              <label className="font-mono text-[11px] text-zinc-600 uppercase tracking-widest block mb-2">
                Confirm password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                className="w-full bg-transparent border text-zinc-200 text-sm px-3 py-2 rounded-md outline-none font-mono"
                style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
            </div>

            {error && <p className="font-mono text-xs text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={status === 'saving' || !password || !confirm}
              className="w-full py-2 text-sm font-mono rounded-md transition-colors disabled:opacity-40"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }}
            >
              {status === 'saving' ? 'Saving...' : 'Set password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
