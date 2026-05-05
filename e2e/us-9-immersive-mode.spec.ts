import { test, expect, type Page } from '@playwright/test'

test.use({ viewport: { width: 1920, height: 911 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/play/it/web-engineer/immersive')
  await page.getByRole('button', { name: 'START' }).click()
  await expect(page.getByRole('button', { name: 'START' })).not.toBeVisible()
})

test('US-9: 没入モードの会議ブロックで選択後に次へ進める', async ({ page }) => {
  for (let i = 0; i < 3; i++) {
    await answerCurrentScene(page)
  }

  if ((await page.locator('button.text-left').count()) === 0) {
    await clickActiveObject(page)
  }
  await expect(page.getByRole('heading', { name: 'テストの赤い1件' }).first()).toBeVisible()

  await page.locator('button.text-left').first().click()
  const nextButton = page.getByRole('button', { name: /→$/ })
  await expect(nextButton).toBeVisible()
  await expectButtonInSafeArea(page, /→$/)
  await nextButton.click()
})

test('US-9: representative immersive scenarios start from task-pre screen', async ({ page }) => {
  const representativePaths = [
    '/play/it/web-engineer/immersive',
    '/play/finance/regional-bank-corporate-loan/immersive',
    '/play/manufacturing/product-planning/immersive',
    '/play/trading/corporate-trading-sales/immersive',
    '/play/marketing-media/web-marketer/immersive',
    '/play/consulting-bpo/operations-consultant/immersive',
    '/play/hr/career-advisor/immersive',
    '/play/public-infra/regional-policy-planning/immersive',
    '/play/retail-ec/md-buyer/immersive',
    '/play/tourism-transport/travel-product-planning/immersive',
  ]

  for (const path of representativePaths) {
    await page.goto(path)
    const startButton = page.getByRole('button', { name: 'START' })
    await expect(startButton).toBeVisible()
    await startButton.click()
    await expect(startButton).not.toBeVisible()
    await expect(page.getByText(/^0\/(5|20)$/)).toBeVisible()
  }
})

test('US-9: finance and manufacturing desk tasks can advance through coworker object', async ({ page }) => {
  const paths = [
    '/play/finance/regional-bank-corporate-loan/immersive',
    '/play/manufacturing/product-planning/immersive',
  ]

  for (const path of paths) {
    await page.goto(path)
    await page.getByRole('button', { name: 'START' }).click()

    for (let i = 0; i < 3; i++) {
      await answerCurrentScene(page)
    }

    await expect(page.getByText(/^3\/5$/)).toBeVisible()
  }
})

test('US-9: web marketer desk tasks can advance through coworker object', async ({ page }) => {
  await page.goto('/play/marketing-media/web-marketer/immersive')
  await page.getByRole('button', { name: 'START' }).click()

  for (let i = 0; i < 3; i++) {
    await answerCurrentScene(page)
  }

  await expect(page.getByText('3/5')).toBeVisible()
})

async function answerCurrentScene(page: Page): Promise<void> {
  if ((await page.locator('button.text-left').count()) === 0) {
    await clickActiveObject(page)
  }

  await page.locator('button.text-left').first().click()
  const nextButton = page.getByRole('button', { name: /→$/ })
  await expect(nextButton).toBeVisible()
  await nextButton.click()

  const transitionButton = page.getByRole('button', { name: 'START' })
  if (await transitionButton.isVisible().catch(() => false)) {
    await transitionButton.click()
    await expect(transitionButton).not.toBeVisible()
  }
}

async function clickActiveObject(page: Page): Promise<void> {
  for (const name of ['モニター', '付箋', '電話', '同僚']) {
    const button = page.getByRole('button', { name }).first()
    if ((await button.count()) > 0 && await button.isEnabled()) {
      await button.click({ force: true })
      return
    }
  }
  throw new Error('No active immersive object found')
}

async function expectButtonInSafeArea(page: Page, name: string | RegExp): Promise<void> {
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
