import { defineConfig, devices } from '@playwright/test'

const port = process.env.PLAYWRIGHT_PORT ?? '3000'
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${port}`
const serverCommand = process.env.PLAYWRIGHT_SERVER_COMMAND === 'start' ? 'start' : 'dev'
const hasExternalBaseURL = Boolean(process.env.PLAYWRIGHT_BASE_URL)
const hasManagedServer = !hasExternalBaseURL && Boolean(process.env.PLAYWRIGHT_PORT || process.env.PLAYWRIGHT_SERVER_COMMAND)

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
  webServer: hasExternalBaseURL || (process.env.CI && !hasManagedServer)
    ? undefined
    : {
        command: hasManagedServer ? `pnpm ${serverCommand} --port ${port}` : 'pnpm dev',
        url: baseURL,
        reuseExistingServer: !hasManagedServer,
        timeout: 30_000,
      },
})
