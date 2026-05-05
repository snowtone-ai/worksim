import { readFile } from 'node:fs/promises'

const bannedPhrases = [
  '関係者からの期待が重なる',
  'スピード・正確性・関係者調整のバランス',
  'この判断で次の動きが変わる',
  '状況把握を急ぎ、まず動かす',
  '関係者に確認し、前提をそろえる',
  '中長期の影響まで見て設計する',
  '見切り発車になる恐れがある',
  '過剰設計になる恐れがある',
]

const defaultFiles = [
  'scenarios/finance/regional-bank-corporate-loan.json',
  'scenarios/manufacturing/product-planning.json',
  'scenarios/marketing-media/web-marketer.json',
]

const files = process.argv.slice(2)
const targetFiles = files.length > 0 ? files : defaultFiles
let failures = 0

for (const file of targetFiles) {
  const scenario = JSON.parse(await readFile(file, 'utf8'))
  const issues = []
  const scenarioText = JSON.stringify(scenario)

  for (const phrase of bannedPhrases) {
    if (scenarioText.includes(phrase)) issues.push(`禁止フレーズ: ${phrase}`)
  }

  const seenChoiceText = new Map()
  for (const scene of scenario.scenes ?? []) {
    if (!scene.workMaterial) issues.push(`${scene.id}: workMaterial missing`)
    if (!scene.delayedConsequence && !scene.consequenceHook) {
      issues.push(`${scene.id}: consequenceHook missing`)
    }
    if (!scene.roleSpecificContext || !scene.stakeholderPressure || !scene.timePressure) {
      issues.push(`${scene.id}: Scene Anatomy metadata incomplete`)
    }

    const choices = scene.choices ?? []
    for (const choice of choices) {
      const text = choice.text ?? choice.label
      const prior = seenChoiceText.get(text)
      if (prior) issues.push(`${scene.id}: choice text reused from ${prior}`)
      seenChoiceText.set(text, scene.id)

      for (const key of ['immediateFeedback', 'delayedConsequence', 'nextSceneEffect', 'resultSummaryEffect']) {
        if (!choice[key]) issues.push(`${scene.id}/${choice.id}: ${key} missing`)
      }
    }
  }

  if (!scenario.roleSpecificMeters || scenario.roleSpecificMeters.length < 5) {
    issues.push('roleSpecificMeters missing or too small')
  }
  if (!scenario.branchSummary?.trackedEffects?.length) issues.push('branchSummary missing')

  if (issues.length > 0) {
    failures += issues.length
    console.error(`\n${file}`)
    for (const issue of issues) console.error(`- ${issue}`)
  }
}

if (failures > 0) {
  console.error(`\nScenario quality check failed: ${failures} issue(s)`)
  process.exit(1)
}

console.log(`Scenario quality check passed: ${targetFiles.length} file(s)`)
