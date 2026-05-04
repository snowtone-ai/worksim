import { appendFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const chunks = []
process.stdin.on('data', (chunk) => chunks.push(chunk))
process.stdin.on('end', () => {
  const payload = parseHookPayload(Buffer.concat(chunks).toString('utf8'))
  const timestamp = new Date().toISOString()
  const entry = [
    '',
    `## ${timestamp}`,
    '- **Source**: Codex hook',
    '- **Category**: runtime',
    `- **Tool**: ${payload.toolName}`,
    `- **Error**: ${payload.errorMessage}`,
    '',
  ].join('\n')

  try {
    mkdirSync(join(process.cwd(), 'docs'), { recursive: true })
    appendFileSync(join(process.cwd(), 'docs', 'issues.md'), entry, 'utf8')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error'
    console.error(`[codex-hook] failed to write issues.md: ${message}`)
  }
})

function parseHookPayload(rawInput) {
  try {
    const input = JSON.parse(rawInput)
    return {
      toolName: redact(String(input.tool_name ?? input.toolName ?? 'unknown')),
      errorMessage: redact(String(input.error_message ?? input.error ?? input.tool_response?.error ?? 'no error message')),
    }
  } catch {
    return { toolName: 'unknown', errorMessage: 'unparseable hook payload' }
  }
}

function redact(value) {
  return value
    .replace(/(\bauthorization\b["']?\s*[:=]\s*["'])[^"'\r\n]+(["'])/gi, '$1[REDACTED]$2')
    .replace(/(\bauthorization\b\s*[:=]\s*)[^\r\n,}]+/gi, '$1[REDACTED]')
    .replace(/[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/g, '[REDACTED_JWT]')
    .replace(/(token|secret|password|key)(["'=:\s]+)([^"',\s}]+)/gi, '$1$2[REDACTED]')
    .slice(0, 300)
}
