'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function LoginButton() {
  const supabase = createClient()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setErrorMsg(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleLogin}
        disabled={loading}
        className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" />
          <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" />
          <path fill="#FBBC05" d="M4.5 10.48A4.8 4.8 0 0 1 4.25 9a4.8 4.8 0 0 1 .25-1.48V5.45H1.83A8 8 0 0 0 .98 9c0 1.29.31 2.51.85 3.55z" />
          <path fill="#EA4335" d="M8.98 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A8 8 0 0 0 .98 9a8 8 0 0 0 .85 3.55l2.67-2.07A4.8 4.8 0 0 1 8.98 3.58z" />
        </svg>
        {loading ? '接続中...' : 'Google でログイン'}
      </button>
      {errorMsg && (
        <p className="text-xs text-red-600 text-center max-w-xs">
          エラー: {errorMsg}
        </p>
      )}
    </div>
  )
}
