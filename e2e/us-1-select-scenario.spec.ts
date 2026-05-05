import { test, expect } from '@playwright/test'

test('US-1: ログイン後にシナリオ一覧が表示される', async ({ page }) => {
  await page.goto('/play')
  await expect(page.getByRole('heading', { name: '業界を選択' })).toBeVisible()
  await expect(page.getByText('IT・情報通信')).toBeVisible()
  await expect(page.getByText('Webエンジニア（バックエンド）')).not.toBeVisible()
})

test('US-1: シナリオカードをクリックするとプレイ画面に遷移する', async ({ page }) => {
  await page.goto('/play')
  await page.getByText('IT・情報通信').click()
  await expect(page).toHaveURL('/play/it')
  await expect(page.getByRole('heading', { name: '職種別シナリオ選択' })).toBeVisible()

  await page.getByText('Webエンジニア（バックエンド）').click()
  await expect(page).toHaveURL('/play/it/web-engineer/immersive')
  await expect(page.getByRole('button', { name: 'START' })).toBeVisible()
})
