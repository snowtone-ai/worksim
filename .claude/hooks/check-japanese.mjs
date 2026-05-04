import { existsSync, readFileSync } from 'node:fs'

const chunks = []

process.stdin.on('data', (chunk) => chunks.push(chunk))
process.stdin.on('end', () => {
  const response = extractAssistantText(Buffer.concat(chunks).toString('utf8'))
  const asciiCount = (response.match(/[\x20-\x7E]/g) ?? []).length
  const asciiRatio = response.length > 0 ? asciiCount / response.length : 0

  if (response.length > 100 && asciiRatio > 0.8) {
    console.log(JSON.stringify({
      decision: 'block',
      reason: '完了報告は HANDOFF-JA.md に従い日本語で出力してください。',
    }))
    process.exit(2)
  }

  process.exit(0)
})

function extractAssistantText(input) {
  try {
    const hookPayload = JSON.parse(input)
    const directText = [
      hookPayload.response,
      hookPayload.final_response,
      hookPayload.assistant_response,
      hookPayload.message?.content,
    ].find((value) => typeof value === 'string') ?? ''
    if (directText) return directText
    return readLastAssistantText(hookPayload.transcript_path)
  } catch {
    return input
  }
}

function readLastAssistantText(transcriptPath) {
  if (typeof transcriptPath !== 'string' || !existsSync(transcriptPath)) return ''

  const lines = readFileSync(transcriptPath, 'utf8').trim().split(/\r?\n/)
  for (const line of lines.reverse()) {
    const text = extractTextFromTranscriptLine(line)
    if (text) return text
  }
  return ''
}

function extractTextFromTranscriptLine(line) {
  try {
    const entry = JSON.parse(line)
    const role = entry.message?.role ?? entry.role
    if (role !== 'assistant') return ''
    const content = entry.message?.content ?? entry.content
    if (typeof content === 'string') return content
    if (Array.isArray(content)) {
      return content.map((part) => part.text).filter((text) => typeof text === 'string').join('\n')
    }
  } catch {
    return ''
  }
  return ''
}
