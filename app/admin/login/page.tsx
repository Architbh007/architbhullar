'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      const data = await res.json().catch(() => null)
      setError(data?.error || 'Incorrect email or password.')
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#0d0d10' }}
    >
      <div className="w-full max-w-xs">
        <p className="font-mono text-xs text-zinc-600 mb-6">~/archit &gt; admin login</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-[11px] text-zinc-600 uppercase tracking-widest block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              autoComplete="username"
              className="w-full bg-transparent border text-zinc-200 text-sm px-3 py-2 rounded-md outline-none font-mono"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
          </div>

          <div>
            <label className="font-mono text-[11px] text-zinc-600 uppercase tracking-widest block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full bg-transparent border text-zinc-200 text-sm px-3 py-2 rounded-md outline-none font-mono"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
          </div>

          {error && (
            <p className="font-mono text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full py-2 text-sm font-mono rounded-md transition-colors disabled:opacity-40"
            style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }}
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
