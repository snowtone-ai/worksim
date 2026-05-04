import { closeSync, mkdirSync, openSync } from 'node:fs'
import { createServer } from 'node:net'
import { join } from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { chromium } from '@playwright/test'

const root = process.cwd()
const pnpmBin = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const e2ePort = String(await getFreePort())
const steps = [
  ['claude-import', ['node', ['scripts/sync-claude-md.mjs']]],
  ['lint', [pnpmBin, ['lint']]],
  ['typecheck', [pnpmBin, ['typecheck']]],
  ['build', [pnpmBin, ['build']]],
  ['unit', [pnpmBin, ['test', '--', '--run']]],
  ['e2e', [pnpmBin, ['test:e2e'], { PLAYWRIGHT_PORT: e2ePort, PLAYWRIGHT_SERVER_COMMAND: 'start' }]],
]

function runCommand(name, command, args, extraEnv = {}) {
  return new Promise((resolve) => {
    const processSpec = createProcessSpec(command, args)
    const child = spawn(processSpec.command, processSpec.args, {
      cwd: root,
      env: { ...process.env, ...extraEnv },
      stdio: 'inherit',
      shell: false,
    })
    child.on('close', (code) => resolve({ name, code: code ?? 1 }))
    child.on('error', () => resolve({ name, code: 1 }))
  })
}

function createProcessSpec(command, args) {
  if (process.platform !== 'win32') return { command, args }
  return { command: 'cmd.exe', args: ['/d', '/s', '/c', command, ...args] }
}

async function waitForServer(url, timeoutMs) {
  const startedAt = Date.now()
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url)
      if (response.ok) return true
    } catch {
      // Server is not ready yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  return false
}

function startAppServer(port) {
  mkdirSync(join(root, 'logs'), { recursive: true })
  const logPath = join(root, 'logs', 'verify-app-server.log')
  const logFd = openSync(logPath, 'w')
  const processSpec = createProcessSpec(pnpmBin, ['start', '--port', String(port)])
  const child = spawn(processSpec.command, processSpec.args, {
    cwd: root,
    detached: false,
    stdio: ['ignore', logFd, logFd],
    shell: false,
    windowsHide: true,
  })
  child.on('close', () => closeSync(logFd))
  return child
}

async function runBrowserSmoke() {
  const port = await getFreePort()
  const url = `http://127.0.0.1:${port}`
  let appServer = null
  try {
    appServer = startAppServer(port)
    const ready = await waitForServer(url, 30_000)

    if (!ready) {
      return { name: 'browser', code: 1, details: 'app server did not become ready' }
    }

    const browser = await chromium.launch()
    const page = await browser.newPage({ viewport: { width: 1366, height: 768 } })
    const consoleErrors = []
    const pageErrors = []

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    page.on('pageerror', (error) => pageErrors.push(error.message))

    await page.goto(url, { waitUntil: 'networkidle' })
    mkdirSync(join(root, 'test-results'), { recursive: true })
    await page.screenshot({ path: join(root, 'test-results', 'verify-home.png'), fullPage: true })
    await browser.close()

    const failures = [...consoleErrors, ...pageErrors]
    return {
      name: 'browser',
      code: failures.length === 0 ? 0 : 1,
      details: failures.join('\n'),
    }
  } finally {
    if (appServer?.pid) stopProcessTree(appServer.pid)
  }
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      server.close(() => {
        if (typeof address === 'object' && address) resolve(address.port)
        else reject(new Error('Unable to allocate a free port'))
      })
    })
    server.on('error', reject)
  })
}

function stopProcessTree(pid) {
  if (process.platform === 'win32') {
    spawnSync('taskkill.exe', ['/pid', String(pid), '/t', '/f'], { stdio: 'ignore' })
    return
  }

  try {
    process.kill(pid, 'SIGTERM')
  } catch {
    // The process may have already exited.
  }
}

const outcomes = []

for (const [name, [command, args, extraEnv]] of steps) {
  outcomes.push(await runCommand(name, command, args, extraEnv))
}

outcomes.push(await runBrowserSmoke())

const failed = outcomes.filter((outcome) => outcome.code !== 0)
if (failed.length > 0) {
  for (const failure of failed) {
    console.error(`[verify] ${failure.name} failed${failure.details ? `: ${failure.details}` : ''}`)
  }
  process.exit(1)
}

console.log('[verify] all checks passed')
