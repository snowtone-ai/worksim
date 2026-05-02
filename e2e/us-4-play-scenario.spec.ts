import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/play/it/web-engineer')
})

test('US-4: シナリオの最初のシーンが表示される', async ({ page }) => {
  await expect(page.getByText('朝会（スタンドアップ）')).toBeVisible()
  await expect(page.getByText('1 / 5')).toBeVisible()
})

test('US-4: 選択肢を選ぶと「次へ」ボタンが表示される', async ({ page }) => {
  const choices = page.getByRole('button').filter({ hasText: /フィードバック|一部修正|確認したところ/ })
  await choices.first().click()
  await expect(page.getByRole('button', { name: '次へ →' })).toBeVisible()
})

test('US-5: 全シーン回答すると結果ページに遷移する', async ({ page }) => {
  for (let i = 0; i < 5; i++) {
    // 最初の選択肢ボタンをクリック
    const allButtons = page.getByRole('button')
    const choiceButtons = allButtons.filter({ hasNotText: /次へ|結果を見る/ })
    await choiceButtons.first().click()

    const nextBtn = page.getByRole('button', { name: /次へ|結果を見る/ })
    await expect(nextBtn).toBeVisible()
    await nextBtn.click()

    if (i < 4) {
      await page.waitForTimeout(300)
    }
  }
  await expect(page).toHaveURL(/\/result/)
})
