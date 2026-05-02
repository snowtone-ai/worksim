import { test, expect } from '@playwright/test'

test('US-1: ログイン後にシナリオ一覧が表示される', async ({ page }) => {
  await page.goto('/play')
  await expect(page.getByRole('heading', { name: 'シナリオ選択' })).toBeVisible()
  await expect(page.getByText('Webエンジニア（バックエンド）')).toBeVisible()
  await expect(page.getByText('IT・情報通信')).toBeVisible()
})

test('US-1: シナリオカードをクリックするとプレイ画面に遷移する', async ({ page }) => {
  await page.goto('/play')
  await page.getByText('Webエンジニア（バックエンド）').click()
  await expect(page).toHaveURL('/play/it/web-engineer')
  await expect(page.getByText('朝会（スタンドアップ）')).toBeVisible()
})
