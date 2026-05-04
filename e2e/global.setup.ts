import { test as setup } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import fs from 'node:fs'
import path from 'node:path'

const AUTH_FILE = path.resolve(process.cwd(), 'e2e/.auth/user.json')

loadLocalEnv()

type AuthCookie = {
  name: string
  value: string
  options?: {
    domain?: string
    path?: string
    httpOnly?: boolean
    secure?: boolean
    sameSite?: boolean | 'lax' | 'strict' | 'none'
    maxAge?: number
  }
}

setup('create test session', async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    // 環境変数がなければ空のセッションファイルを作成してスキップ
    fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true })
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ cookies: [], origins: [] }))
    return
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const testEmail = process.env.E2E_TEST_EMAIL ?? 'e2e-test@worksim.test'

  const { data, error } = await admin.auth.admin.generateLink({
    type: 'magiclink',
    email: testEmail,
  })

  if (error ?? !data.properties?.hashed_token) {
    fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true })
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ cookies: [], origins: [] }))
    return
  }

  const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'
  const authCookies: AuthCookie[] = []
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return authCookies
      },
      setAll(cookiesToSet) {
        authCookies.splice(0, authCookies.length, ...cookiesToSet)
      },
    },
  })

  const { error: verifyError } = await supabase.auth.verifyOtp({
    token_hash: data.properties.hashed_token,
    type: 'magiclink',
  })

  if (verifyError) {
    fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true })
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ cookies: [], origins: [] }))
    return
  }

  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true })
  fs.writeFileSync(
    AUTH_FILE,
    JSON.stringify({
      cookies: authCookies.map((cookie) => toPlaywrightCookie(cookie, baseUrl)),
      origins: [],
    })
  )
})

function toPlaywrightCookie(cookie: AuthCookie, baseUrl: string) {
  const url = new URL(baseUrl)
  const sameSite = cookie.options?.sameSite
  const maxAge = cookie.options?.maxAge

  return {
    name: cookie.name,
    value: cookie.value,
    domain: cookie.options?.domain ?? url.hostname,
    path: cookie.options?.path ?? '/',
    expires: maxAge ? Math.floor(Date.now() / 1000) + maxAge : -1,
    httpOnly: cookie.options?.httpOnly ?? false,
    secure: cookie.options?.secure ?? url.protocol === 'https:',
    sameSite: sameSite === 'strict' ? 'Strict' : sameSite === 'none' ? 'None' : 'Lax',
  }
}

function loadLocalEnv(): void {
  const envPath = path.resolve(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) return

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex <= 0) continue

    const key = trimmed.slice(0, separatorIndex)
    const rawValue = trimmed.slice(separatorIndex + 1)
    if (process.env[key] !== undefined) continue

    process.env[key] = unquoteEnvValue(rawValue)
  }
}

function unquoteEnvValue(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }

  return value
}
