import { test, expect } from '@playwright/test'

// 認証不要のスモークテスト（デプロイ後に最初に実行）
test.use({ storageState: { cookies: [], origins: [] } })

test('US-10: トップページが表示される', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/WorkSim/)
  // ボタンテキストは "Google でログイン"（スペースあり）
  await expect(page.getByRole('button', { name: 'Google でログイン' })).toBeVisible()
})

test('US-10: 未ログインで /play にアクセスするとトップにリダイレクトされる', async ({ page }) => {
  await page.goto('/play')
  await expect(page).toHaveURL('/')
})

test('US-10: 結果ページは認証なしでもアクセスできる', async ({ page }) => {
  const answers = { standup: 'a', 'bug-email': 'a', 'code-review': 'a', 'feature-design': 'a', 'incident-debug': 'a' }
  const encoded = encodeURIComponent(JSON.stringify(answers))
  await page.goto(`/play/it/web-engineer/result?a=${encoded}`)
  await expect(page.getByText('診断結果')).toBeVisible()
})
