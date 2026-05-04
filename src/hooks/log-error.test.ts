import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

import { describe, expect, it } from 'vitest'

describe('Codex error hook redaction', () => {
  it('redacts the full Authorization bearer value before writing issues', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'worksim-hook-'))
    const hookPath = resolve(process.cwd(), '.codex/hooks/log-error.mjs')
    const payload = {
      tool_name: 'web.fetch',
      error_message: 'request failed\nauthorization: Bearer sk-test-secret-value\nstatus: 401',
    }

    try {
      const result = spawnSync(process.execPath, [hookPath], {
        cwd,
        input: JSON.stringify(payload),
        encoding: 'utf8',
      })

      expect(result.status).toBe(0)

      const issues = readFileSync(join(cwd, 'docs/issues.md'), 'utf8')
      expect(issues).toContain('authorization: [REDACTED]')
      expect(issues).not.toContain('Bearer')
      expect(issues).not.toContain('sk-test-secret-value')
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})
