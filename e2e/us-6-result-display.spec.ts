import { test, expect } from '@playwright/test'

// 結果ページは認証不要（データはURLに含まれる）
test.use({ storageState: { cookies: [], origins: [] } })

const BASE_ANSWERS = {
  'web-engineer-01': 'a',
  'web-engineer-02': 'a',
  'web-engineer-03': 'a',
  'web-engineer-04': 'a',
  'web-engineer-05': 'a',
}

function resultUrl(answers = BASE_ANSWERS) {
  return `/play/it/web-engineer/result?a=${encodeURIComponent(JSON.stringify(answers))}&m=immersive`
}

test('US-6: 結果ページに診断タイプとスコアが表示される', async ({ page }) => {
  await page.goto(resultUrl())

  await expect(page.getByText('診断結果')).toBeVisible()
  await expect(page.getByText('あなたのタイプ')).toBeVisible()
  // 型ラベル（テックリード型など）が表示されること
  await expect(page.getByText(/型$/)).toBeVisible()
  // スコア詳細
  await expect(page.getByText('スコア詳細')).toBeVisible()
  await expect(page.getByText('技術力', { exact: true })).toBeVisible()
  await expect(page.getByText('100%').first()).toBeVisible()
})

test('US-7: 「もう一度やり直す」リンクがプレイ画面を指している', async ({ page }) => {
  await page.goto(resultUrl())

  const link = page.getByRole('link', { name: 'もう一度やり直す' })
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('href', '/play/it/web-engineer/immersive')
})

test('US-8: 「他の職種を体験する」リンクがシナリオ一覧を指している', async ({ page }) => {
  await page.goto(resultUrl())

  const link = page.getByRole('link', { name: '他の職種を体験する' })
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('href', '/play')
})
