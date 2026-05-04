import { test, expect, type Page } from '@playwright/test'

test.use({ viewport: { width: 1920, height: 911 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/play/it/web-engineer/immersive')
  await page.getByRole('button', { name: '一日を始める →' }).click()
})

test('US-9: 没入モードの会議ブロックで選択後に次へ進める', async ({ page }) => {
  for (let i = 0; i < 10; i++) {
    await answerCurrentScene(page)
  }

  await expect(page.getByText('Sprint Planning 開始')).toBeVisible()

  await page.locator('button.text-left').first().click()
  const nextButton = page.getByRole('button', { name: '次へ →' })
  await expect(nextButton).toBeVisible()
  await expectButtonInSafeArea(page, '次へ →')
  await nextButton.click()

  await expect(page.getByText('アーキテクチャの3案')).toBeVisible()
  await page.locator('button.text-left').nth(1).click()

  await expect(nextButton).toBeVisible()
  await expectButtonInSafeArea(page, '次へ →')
})

async function answerCurrentScene(page: Page): Promise<void> {
  if ((await page.locator('button.text-left').count()) === 0) {
    await clickActiveObject(page)
  }

  await page.locator('button.text-left').first().click()
  const nextButton = page.getByRole('button', { name: /^(次へ|ランチ休憩|Sprint Planning) →$/ })
  await expect(nextButton).toBeVisible()
  await nextButton.click()

  const transitionButton = page.getByRole('button', { name: 'はじめる →' })
  if (await transitionButton.isVisible().catch(() => false)) {
    await transitionButton.click()
  }
}

async function clickActiveObject(page: Page): Promise<void> {
  for (const name of ['モニター', '付箋', '電話', '同僚']) {
    const button = page.getByRole('button', { name }).first()
    if ((await button.count()) > 0 && await button.isEnabled()) {
      await button.click()
      return
    }
  }
  throw new Error('No active immersive object found')
}

async function expectButtonInSafeArea(page: Page, name: string): Promise<void> {
  const button = page.getByRole('button', { name })
  const box = await button.boundingBox()
  expect(box).not.toBeNull()
  if (!box) return

  const viewport = page.viewportSize()
  expect(viewport).not.toBeNull()
  if (!viewport) return

  expect(box.y).toBeGreaterThanOrEqual(0)
  expect(box.y + box.height).toBeLessThanOrEqual(viewport.height)
  expect(box.y + box.height).toBeLessThanOrEqual(viewport.height - 180)
}
