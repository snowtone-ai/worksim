import { test as setup } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'

const AUTH_FILE = path.resolve(process.cwd(), 'e2e/.auth/user.json')

setup('create test session', async ({ page }) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
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
  const confirmUrl = `${supabaseUrl}/auth/v1/verify?token=${data.properties.hashed_token}&type=magiclink&redirect_to=${baseUrl}/auth/callback`
  await page.goto(confirmUrl)
  await page.waitForURL(/\/(play|profile)/, { timeout: 10_000 }).catch(() => null)

  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true })
  await page.context().storageState({ path: AUTH_FILE })
})
