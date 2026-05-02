import { test as setup, expect } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'node:fs'
import * as path from 'node:path'

const AUTH_FILE = path.join(import.meta.dirname, '.auth/user.json')

setup('create test session', async ({ page }) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for E2E tests')
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const testEmail = process.env.E2E_TEST_EMAIL ?? 'e2e-test@worksim.test'

  // サービスロールでテストユーザーセッションを発行
  const { data, error } = await admin.auth.admin.generateLink({
    type: 'magiclink',
    email: testEmail,
  })
  if (error || !data.properties?.hashed_token) {
    throw new Error(`Failed to generate test session: ${error?.message}`)
  }

  // マジックリンクでサインイン
  const confirmUrl = `${supabaseUrl}/auth/v1/verify?token=${data.properties.hashed_token}&type=magiclink&redirect_to=${process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'}/auth/callback`
  await page.goto(confirmUrl)
  await page.waitForURL(/\/(play|profile)/)

  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true })
  await page.context().storageState({ path: AUTH_FILE })
})
