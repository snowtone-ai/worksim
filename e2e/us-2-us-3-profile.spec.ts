import { test, expect } from '@playwright/test'

test('US-2: ログイン済みユーザーはプロフィールをスキップして始められる', async ({ page }) => {
  await page.goto('/profile')
  await expect(page.getByRole('heading', { name: 'ようこそ' })).toBeVisible()

  await page.getByRole('link', { name: 'スキップして始める' }).click()

  await expect(page).toHaveURL('/play')
  await expect(page.getByRole('heading', { name: '業界を選択' })).toBeVisible()
})

test('US-3: 任意プロフィールを保存してシナリオ一覧へ進める', async ({ page }) => {
  await page.goto('/profile')

  await page.getByPlaceholder('大学名を入力して検索（例：早稲田、東京）').fill('大分')
  await page.getByRole('option', { name: /大分大学/ }).click()
  await page.getByLabel('学部・学科').selectOption('理工学部')
  await page.getByLabel('志望業界').selectOption('IT・情報通信')
  await page.getByRole('button', { name: '保存してはじめる' }).click()

  await expect(page).toHaveURL('/play')
  await expect(page.getByText('IT・情報通信')).toBeVisible()
  await expect(page.getByText('Webエンジニア（バックエンド）')).not.toBeVisible()
})
