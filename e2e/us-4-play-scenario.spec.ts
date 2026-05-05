import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/play/it/web-engineer/immersive')
  await page.getByRole('button', { name: 'START' }).click()
})

test('US-4: シナリオの最初のシーンが表示される', async ({ page }) => {
  await expect(page.getByText('認証エラーの山')).toBeVisible()
  await expect(page.getByText('0/5')).toBeVisible()
})

test('US-4: 選択肢を選ぶと「次へ」ボタンが表示される', async ({ page }) => {
  await page.getByRole('button', { name: 'モニター' }).click()
  await page.locator('button.text-left').first().click()
  await expect(page.getByRole('button', { name: '次へ →' })).toBeVisible()
})

test('US-5: 全シーン回答すると結果ページに遷移する', async ({ page }) => {
  for (let i = 0; i < 5; i++) {
    if ((await page.locator('button.text-left').count()) === 0) {
      for (const name of ['モニター', '付箋', '電話', '同僚']) {
        const button = page.getByRole('button', { name }).first()
        if ((await button.count()) > 0 && await button.isEnabled()) {
          await button.click({ force: true })
          break
        }
      }
    }

    await page.locator('button.text-left').first().click()

    const nextBtn = page.getByRole('button', { name: /→$/ })
    await expect(nextBtn).toBeVisible()
    await nextBtn.click()

    const transitionButton = page.getByRole('button', { name: 'START' })
    if (await transitionButton.isVisible().catch(() => false)) {
      await transitionButton.click()
    }
  }
  await expect(page).toHaveURL(/\/result/)
})
