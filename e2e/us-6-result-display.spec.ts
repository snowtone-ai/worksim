import { test, expect } from '@playwright/test'

test('US-6: 結果ページに診断タイプとスコアが表示される', async ({ page }) => {
  // 全選択肢Aで回答したスコアをエンコードして直接アクセス
  const answers = {
    standup: 'a',
    'bug-email': 'a',
    'code-review': 'a',
    'feature-design': 'a',
    'incident-debug': 'a',
  }
  const encoded = encodeURIComponent(JSON.stringify(answers))
  await page.goto(`/play/it/web-engineer/result?a=${encoded}`)

  await expect(page.getByText('診断結果')).toBeVisible()
  await expect(page.getByText('あなたのタイプ')).toBeVisible()
  // 型ラベル（テックリード型など）が表示されること
  await expect(page.getByText(/型$/)).toBeVisible()
  // スコア詳細
  await expect(page.getByText('スコア詳細')).toBeVisible()
  await expect(page.getByText('技術力')).toBeVisible()
})

test('US-7: 「もう一度やり直す」でプレイ画面に戻れる', async ({ page }) => {
  const answers = { standup: 'a', 'bug-email': 'a', 'code-review': 'a', 'feature-design': 'a', 'incident-debug': 'a' }
  const encoded = encodeURIComponent(JSON.stringify(answers))
  await page.goto(`/play/it/web-engineer/result?a=${encoded}`)

  await page.getByRole('link', { name: 'もう一度やり直す' }).click()
  await expect(page).toHaveURL('/play/it/web-engineer')
})

test('US-8: 「他の職種を体験する」でシナリオ一覧に戻れる', async ({ page }) => {
  const answers = { standup: 'a', 'bug-email': 'a', 'code-review': 'a', 'feature-design': 'a', 'incident-debug': 'a' }
  const encoded = encodeURIComponent(JSON.stringify(answers))
  await page.goto(`/play/it/web-engineer/result?a=${encoded}`)

  await page.getByRole('link', { name: '他の職種を体験する' }).click()
  await expect(page).toHaveURL('/play')
})
