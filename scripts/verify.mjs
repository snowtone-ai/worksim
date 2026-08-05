import { spawn } from 'node:child_process'

const root = process.cwd()
const pnpmBin = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const steps = [
  ['claude-import', ['node', ['scripts/sync-claude-md.mjs']]],
  ['cbeta-quality', ['node', ['scripts/c-beta/check-cbeta-scenario-quality.mjs']]],
  ['lint', [pnpmBin, ['lint']]],
  ['typecheck', [pnpmBin, ['typecheck']]],
  ['build', [pnpmBin, ['build']]],
  ['unit', [pnpmBin, ['test', '--', '--run']]],
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

const outcomes = []

for (const [name, [command, args, extraEnv]] of steps) {
  outcomes.push(await runCommand(name, command, args, extraEnv))
}

const failed = outcomes.filter((outcome) => outcome.code !== 0)
if (failed.length > 0) {
  for (const failure of failed) {
    console.error(`[verify] ${failure.name} failed${failure.details ? `: ${failure.details}` : ''}`)
  }
  process.exit(1)
}

console.log('[verify] all checks passed')
