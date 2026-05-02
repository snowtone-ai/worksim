import { test, expect } from '@playwright/test'

// 認証不要のスモークテスト（デプロイ後に最初に実行）
test.use({ storageState: { cookies: [], origins: [] } })

test('US-10: トップページが表示される', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/WorkSim/)
  await expect(page.getByRole('link', { name: /Googleでログイン/ })).toBeVisible()
})

test('US-10: 未ログインで /play にアクセスするとトップにリダイレクトされる', async ({ page }) => {
  await page.goto('/play')
  await expect(page).toHaveURL('/')
})

test('US-10: 存在しないシナリオIDで404になる', async ({ page }) => {
  await page.goto('/play/notexist/notexist')
  await expect(page).toHaveURL(/notexist/)
  // ステータスコード 404 またはリダイレクトのどちらか
})
