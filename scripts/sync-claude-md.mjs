import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const claudePath = join(process.cwd(), 'CLAUDE.md')
const content = readFileSync(claudePath, 'utf8')

if (!content.includes('@AGENTS.md')) {
  console.error('CLAUDE.md must import @AGENTS.md')
  process.exit(1)
}

console.log('CLAUDE.md imports AGENTS.md')
