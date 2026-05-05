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

const genericChoicePatterns = [
  /まず動かす/,
  /前提をそろえる/,
  /中長期の影響/,
  /優先して進めますか/,
]

const defaultFiles = [
  'scenarios/finance/regional-bank-corporate-loan.json',
  'scenarios/manufacturing/product-planning.json',
]

const files = process.argv.slice(2)
const targetFiles = files.length > 0 ? files : defaultFiles
let failures = 0

for (const file of targetFiles) {
  const scenario = JSON.parse(await readFile(file, 'utf8'))
  const issues = checkScenario(scenario)

  if (issues.length > 0) {
    failures += issues.length
    console.error(`\n${file}`)
    for (const issue of issues) console.error(`- ${issue}`)
  }
}

if (failures > 0) {
  console.error(`\nC-type scenario quality check failed: ${failures} issue(s)`)
  process.exit(1)
}

console.log(`C-type scenario quality check passed: ${targetFiles.length} file(s)`)

function checkScenario(scenario) {
  const issues = []
  const scenarioText = JSON.stringify(scenario)
  const seenChoiceText = new Map()

  for (const phrase of bannedPhrases) {
    if (scenarioText.includes(phrase)) issues.push(`禁止フレーズ: ${phrase}`)
  }

  for (const scene of scenario.scenes ?? []) {
    checkScene(scene, issues)
    for (const choice of scene.choices ?? []) {
      checkChoice(scene, choice, seenChoiceText, issues)
    }
  }

  if (!scenario.roleSpecificMeters || scenario.roleSpecificMeters.length < 5) {
    issues.push('roleSpecificMeters missing or too small')
  }
  if (!scenario.resultFeedback) issues.push('resultFeedback missing')
  if (!scenario.resultTypes || scenario.resultTypes.length < 3) {
    issues.push('resultTypes missing or too small')
  }

  for (const key of [
    'roleRealityReveal',
    'misconceptionCorrection',
    'careerReflectionPrompt',
    'universityInsightTags',
  ]) {
    if (!scenario.resultFeedback?.[key]) issues.push(`resultFeedback.${key} missing`)
  }

  return issues
}

function checkScene(scene, issues) {
  for (const key of [
    'roleCoreFriction',
    'workMaterial',
    'hiddenWorkReality',
    'stakeholderPressure',
    'timePressure',
  ]) {
    if (!scene[key]) issues.push(`${scene.id}: ${key} missing`)
  }
}

function checkChoice(scene, choice, seenChoiceText, issues) {
  const text = choice.text ?? choice.label ?? ''
  const prior = seenChoiceText.get(text)
  if (prior) issues.push(`${scene.id}: choice text reused from ${prior}`)
  seenChoiceText.set(text, scene.id)

  if (genericChoicePatterns.some((pattern) => pattern.test(text))) {
    issues.push(`${scene.id}/${choice.id}: generic choice text`)
  }

  for (const key of [
    'immediateFeedback',
    'delayedConsequence',
    'nextSceneEffect',
    'resultSummaryEffect',
    'misconceptionEffect',
  ]) {
    if (!choice[key]) issues.push(`${scene.id}/${choice.id}: ${key} missing`)
  }

  if (!choice.studentFeedback?.good) issues.push(`${scene.id}/${choice.id}: good missing`)
  if (!choice.studentFeedback?.risk) issues.push(`${scene.id}/${choice.id}: risk missing`)
  if (!choice.studentFeedback?.next) issues.push(`${scene.id}/${choice.id}: next-summary missing`)
  checkMeterEffects(scene.id, choice, issues)
}

function checkMeterEffects(sceneId, choice, issues) {
  const effects = Object.values(choice.meterEffects ?? {})
  if (effects.length === 0) {
    issues.push(`${sceneId}/${choice.id}: meterEffects missing`)
    return
  }
  if (!effects.some((value) => value > 0) || !effects.some((value) => value < 0)) {
    issues.push(`${sceneId}/${choice.id}: meterEffects must include gain and cost`)
  }
}
