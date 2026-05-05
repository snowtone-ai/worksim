import { readFile } from 'node:fs/promises'

const bannedPhrases = [
  '通常モード',
  '"normal"',
  'mode: normal',
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
  "scenarios/it/web-engineer.json",
  "scenarios/it/it-solution-sales.json",
  "scenarios/it/product-planning-assistant.json",
  "scenarios/it/cloud-operations.json",
  "scenarios/it/data-analyst-bi.json",
  "scenarios/finance/regional-bank-corporate-loan.json",
  "scenarios/finance/retail-asset-advisor.json",
  "scenarios/finance/credit-risk-management.json",
  "scenarios/finance/securities-market-advisory.json",
  "scenarios/finance/insurance-life-planning.json",
  "scenarios/manufacturing/product-planning.json",
  "scenarios/manufacturing/production-control.json",
  "scenarios/manufacturing/quality-assurance.json",
  "scenarios/manufacturing/procurement.json",
  "scenarios/manufacturing/technical-field-support.json",
  "scenarios/trading/corporate-trading-sales.json",
  "scenarios/trading/business-development.json",
  "scenarios/trading/trade-operations.json",
  "scenarios/trading/supply-chain-coordination.json",
  "scenarios/trading/overseas-market-development.json",
  "scenarios/marketing-media/web-marketer.json",
  "scenarios/marketing-media/ad-planner.json",
  "scenarios/marketing-media/performance-marketing.json",
  "scenarios/marketing-media/content-editor.json",
  "scenarios/marketing-media/pr-brand-communication.json",
  "scenarios/consulting-bpo/operations-consultant.json",
  "scenarios/consulting-bpo/it-dx-consultant.json",
  "scenarios/consulting-bpo/strategy-research-analyst.json",
  "scenarios/consulting-bpo/pmo-project-drive.json",
  "scenarios/consulting-bpo/hr-organization-consultant.json",
  "scenarios/hr/career-advisor.json",
  "scenarios/hr/recruiting-advisor.json",
  "scenarios/hr/recruitment-consultant.json",
  "scenarios/hr/training-organization-development.json",
  "scenarios/hr/job-media-planning.json",
  "scenarios/public-infra/regional-policy-planning.json",
  "scenarios/public-infra/tourism-promotion.json",
  "scenarios/public-infra/disaster-crisis-management.json",
  "scenarios/public-infra/urban-planning-coordination.json",
  "scenarios/public-infra/public-infrastructure-operations.json",
  "scenarios/retail-ec/store-operations.json",
  "scenarios/retail-ec/md-buyer.json",
  "scenarios/retail-ec/ec-operations.json",
  "scenarios/retail-ec/logistics-demand-planning.json",
  "scenarios/retail-ec/crm-promotion.json",
  "scenarios/tourism-transport/hotel-front-management.json",
  "scenarios/tourism-transport/travel-product-planning.json",
  "scenarios/tourism-transport/tourism-facility-operations.json",
  "scenarios/tourism-transport/inbound-marketing.json",
  "scenarios/tourism-transport/transport-operations-planning.json"
]

const files = process.argv.slice(2)
const targetFiles = files.length > 0 ? files : defaultFiles
let failures = 0
let warningCount = 0

const residueIssues = files.length > 0 ? [] : await checkNormalResidue()
if (residueIssues.length > 0) {
  failures += residueIssues.length
  console.error('\nnormal-mode residue')
  for (const issue of residueIssues) console.error(`- ${issue}`)
}

const terminologyIssues = files.length > 0 ? [] : await checkTerminologyResidue()
if (terminologyIssues.length > 0) {
  failures += terminologyIssues.length
  console.error('\nCβ terminology residue')
  for (const issue of terminologyIssues) console.error(`- ${issue}`)
}

for (const file of targetFiles) {
  const raw = await readFile(file, 'utf8')
  const scenario = JSON.parse(raw)
  const issues = checkScenario(scenario, raw)
  const warnings = checkScenarioWarnings(scenario, raw)

  if (issues.length > 0) {
    failures += issues.length
    console.error(`\n${file}`)
    for (const issue of issues) console.error(`- ${issue}`)
  }
  if (warnings.length > 0) {
    warningCount += warnings.length
    console.warn(`\n${file} warnings`)
    for (const warning of warnings) console.warn(`- ${warning}`)
  }
}

const coverageWarnings = checkCrossScenarioReadiness(
  await Promise.all(targetFiles.map(async (file) => JSON.parse(await readFile(file, 'utf8'))))
)
if (coverageWarnings.length > 0) {
  warningCount += coverageWarnings.length
  console.warn('\nCβ cross-scenario readiness warnings')
  for (const warning of coverageWarnings) console.warn(`- ${warning}`)
}

if (failures > 0) {
  console.error(`\nCβ scenario quality check failed: ${failures} issue(s)`)
  process.exit(1)
}

console.log(`Cβ scenario quality check passed: ${targetFiles.length} file(s), warnings: ${warningCount}`)

function checkScenario(scenario, raw) {
  const issues = []
  const scenes = scenario.blocks?.flatMap((block) => block.scenes ?? []) ?? []

  if (scenario.modes?.includes('normal')) issues.push('normal mode remains in scenario.modes')
  if (!scenario.modes?.includes('immersive')) issues.push('immersive mode missing')
  if (!scenario.roleCoreFriction) issues.push('roleCoreFriction missing')
  if (!scenario.roleMisconception) issues.push('roleMisconception missing')
  if (!scenario.roleRealityReveal) issues.push('roleRealityReveal missing')
  checkRoleWorkKernel(scenario.roleWorkKernel, issues)
  if (!scenario.resultFeedback) issues.push('resultFeedback missing')
  if (!scenario.resultTypes || scenario.resultTypes.length < 3) issues.push('resultTypes missing or too small')
  if (scenes.length !== 5) issues.push(`Cβ standard scenario must have exactly 5 immersive scenes, got ${scenes.length}`)
  if (raw.includes('concreteWorkArtifact')) issues.push('deprecated key remains: concreteWorkArtifact')

  for (const phrase of bannedPhrases) {
    if (raw.includes(phrase)) issues.push(`banned phrase/reference remains: ${phrase}`)
  }

  checkRepetition(scenes, issues)

  for (const scene of scenes) {
    checkScene(scene, issues)
    for (const choice of scene.choices ?? []) {
      checkChoice(scene, choice, issues)
    }
  }

  return issues
}

async function checkNormalResidue() {
  const issues = []
  const uiFiles = [
    'src/app/play/[industry]/page.tsx',
    'src/app/play/[industry]/[role]/page.tsx',
    'src/app/play/[industry]/[role]/result/page.tsx',
  ]

  for (const file of uiFiles) {
    const raw = await readFile(file, 'utf8')
    if (raw.includes('通常モード')) issues.push(`${file}: user-facing normal copy remains`)
    if (raw.includes('normalHref')) issues.push(`${file}: normalHref branch remains`)
    if (file.endsWith('[role]/page.tsx') && raw.includes('SceneManager')) {
      issues.push(`${file}: normal SceneManager route remains surfaced`)
    }
  }

  const catalog = JSON.parse(await readFile('scenarios/_catalog.c-alpha.json', 'utf8'))
  const normalItems = catalog.filter((item) => item.modes?.includes('normal'))
  if (normalItems.length > 0) issues.push(`catalog: ${normalItems.length} normal mode item(s) remain surfaced`)

  return issues
}

async function checkTerminologyResidue() {
  const issues = []
  const filesToScan = [
    'docs/c-beta/09-CBETA-NARRATIVE-SCENARIO-OS-v1.md',
    'docs/c-beta/10-CBETA-FINANCE-MANUFACTURING-IMMERSIVE-SCRIPTS.md',
    'docs/c-beta/11-CBETA-SCENARIO-QUALITY-GATE-v2.md',
    'docs/c-beta/12-CBETA-FINANCE-MANUFACTURING-REVISION-REPORT.md',
    'docs/c-beta/13-CBETA-ROLE-DIFFERENTIATION-GUARDRAILS.md',
    'scenarios/_schema.v2.md',
  ]

  for (const file of filesToScan) {
    try {
      const raw = await readFile(file, 'utf8')
      if (raw.includes('5〜7') || raw.includes('5-7') || raw.includes('5 to 7')) {
        issues.push(`${file}: old 5-7 scenes wording remains`)
      }
    } catch {
      // New review files may not exist before this task creates them.
    }
  }

  return issues
}

function checkRepetition(scenes, issues) {
  const titles = countBy(scenes.map((scene) => scene.title))
  const prompts = countBy(scenes.map((scene) => scene.decisionPrompt))

  for (const [title, count] of titles) {
    if (count > 1) issues.push(`scene title repeated: ${title}`)
  }
  for (const [prompt, count] of prompts) {
    if (prompt && count > 1) issues.push(`decisionPrompt repeated: ${prompt}`)
  }
}

function checkScene(scene, issues) {
  for (const key of [
    'openingHook',
    'workMaterial',
    'stakeholderPressure',
    'timePressure',
    'decisionTradeoff',
    'roleCoreFriction',
    'hiddenWorkReality',
  ]) {
    if (!scene[key]) issues.push(`${scene.id}: ${key} missing`)
  }
  if (!scene.workMaterial?.trim()) issues.push(`${scene.id}: workMaterial empty`)
  checkRoleSpecificity(scene, issues)
}

function checkRoleWorkKernel(roleWorkKernel, issues) {
  if (!roleWorkKernel) {
    issues.push('roleWorkKernel missing')
    return
  }
  if (typeof roleWorkKernel !== 'object' || Array.isArray(roleWorkKernel)) {
    issues.push('roleWorkKernel must be structured object')
    return
  }

  for (const key of ['input', 'output', 'transformation', 'nonGenericReason']) {
    if (!roleWorkKernel[key]) issues.push(`roleWorkKernel.${key} missing`)
  }
  for (const [key, min] of [
    ['constraints', 2],
    ['workArtifacts', 2],
    ['metrics', 2],
    ['failureModes', 2],
    ['evaluationCriteria', 2],
  ]) {
    if (!Array.isArray(roleWorkKernel[key]) || roleWorkKernel[key].length < min) {
      issues.push(`roleWorkKernel.${key} must include at least ${min} items`)
    } else if (roleWorkKernel[key].some((value) => typeof value !== 'string' || value.trim() === '')) {
      issues.push(`roleWorkKernel.${key} must include only non-empty strings`)
    }
  }
}

function checkRoleSpecificity(scene, issues) {
  const roleSpecificity = scene.roleSpecificity
  if (!roleSpecificity) {
    issues.push(`${scene.id}: roleSpecificity missing`)
    return
  }

  for (const key of [
    'coreDecisionPrimitive',
    'roleSpecificMaterials',
    'roleSpecificMetrics',
    'roleSpecificFailureRisk',
    'roleSpecificEvaluationCriteria',
    'genericCoordinationRisk',
    'antiGenericDesignNote',
    'kernelConnection',
  ]) {
    if (!roleSpecificity[key]) issues.push(`${scene.id}.roleSpecificity.${key} missing`)
  }

  if (!Array.isArray(roleSpecificity.roleSpecificMaterials) || roleSpecificity.roleSpecificMaterials.length < 2) {
    issues.push(`${scene.id}.roleSpecificity.roleSpecificMaterials must include at least 2 items`)
  }
  if (!Array.isArray(roleSpecificity.roleSpecificMetrics) || roleSpecificity.roleSpecificMetrics.length < 1) {
    issues.push(`${scene.id}.roleSpecificity.roleSpecificMetrics must include at least 1 item`)
  }
}

function checkChoice(scene, choice, issues) {
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
  if (!choice.studentFeedback?.next) issues.push(`${scene.id}/${choice.id}: next missing`)
  if (!choice.meterEffects || Object.keys(choice.meterEffects).length === 0) {
    issues.push(`${scene.id}/${choice.id}: meterEffects missing`)
  }
  if (!choice.universityInsightTags || choice.universityInsightTags.length === 0) {
    issues.push(`${scene.id}/${choice.id}: universityInsightTags missing`)
  }
}

function countBy(values) {
  const counts = new Map()
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
  return counts
}

function checkScenarioWarnings(scenario, raw) {
  const warnings = []
  const scenes = scenario.blocks?.flatMap((block) => block.scenes ?? []) ?? []
  const primitives = scenes
    .map((scene) => scene.roleSpecificity?.coreDecisionPrimitive)
    .filter(Boolean)
  const primitiveCounts = countBy(primitives)

  for (const [primitive, count] of primitiveCounts) {
    if (count > 1) warnings.push(`coreDecisionPrimitive repeated ${count} times: ${primitive}`)
  }
  checkKernelWarnings(scenario.roleWorkKernel, warnings)
  for (const scene of scenes) checkSceneWarnings(scene, warnings)

  if (raw.includes('共感') && raw.includes('バランス') && raw.includes('厳しく')) {
    warnings.push('choices may follow generic empathy/balance/strictness pattern')
  }

  return warnings
}

function checkKernelWarnings(roleWorkKernel, warnings) {
  if (!roleWorkKernel || typeof roleWorkKernel !== 'object' || Array.isArray(roleWorkKernel)) return
  const genericWords = ['調整', '関係者', 'バランス', '対応', '相談']
  const text = JSON.stringify(roleWorkKernel)
  const hasGenericWords = genericWords.some((word) => text.includes(word))
  const hasSpecificSignals =
    roleWorkKernel.workArtifacts?.join('').length > 12 &&
    roleWorkKernel.metrics?.join('').length > 12
  if (hasGenericWords && !hasSpecificSignals) {
    warnings.push('roleWorkKernel has generic wording without enough artifacts or metrics')
  }
  if (roleWorkKernel.nonGenericReason && roleWorkKernel.nonGenericReason.length < 24) {
    warnings.push('roleWorkKernel.nonGenericReason may be too weak')
  }
}

function checkSceneWarnings(scene, warnings) {
  const roleSpecificity = scene.roleSpecificity
  if (!roleSpecificity) return

  const genericPrimitives = [
    '調整',
    'バランス判断',
    '関係者対応',
    '顧客対応',
    '上司相談',
    'リスク管理',
  ]
  if (genericPrimitives.includes(roleSpecificity.coreDecisionPrimitive)) {
    warnings.push(`${scene.id}: coreDecisionPrimitive is too generic`)
  }

  const searchable = [
    scene.workMaterial,
    scene.context,
    scene.content,
    scene.npcDialogue,
    scene.decisionPrompt,
  ].join('\n')
  for (const material of roleSpecificity.roleSpecificMaterials ?? []) {
    if (!searchable.includes(material)) {
      warnings.push(`${scene.id}: roleSpecificMaterial not found in workMaterial or scene text: ${material}`)
    }
  }
  for (const metric of roleSpecificity.roleSpecificMetrics ?? []) {
    if (!searchable.includes(metric)) {
      warnings.push(`${scene.id}: roleSpecificMetric not found in workMaterial or scene text: ${metric}`)
    }
  }
  if (!/[0-9０-９]/.test(scene.workMaterial ?? '')) {
    warnings.push(`${scene.id}: workMaterial has no numeric signal`)
  }
  const choiceText = (scene.choices ?? []).map((choice) => `${choice.label} ${choice.text}`).join('\n')
  if (/寄り添|共感|バランス|厳しく|線を引く/.test(choiceText) && !/[0-9０-９]|原資|粗利|品質|保証|稟議|数量|原価|売掛|表示/.test(choiceText)) {
    warnings.push(`${scene.id}: choices may be generic empathy/balance/strictness pattern`)
  }
}

function checkCrossScenarioReadiness(scenarios) {
  const warnings = []
  const primitiveUse = new Map()
  const weakReasons = []

  for (const scenario of scenarios) {
    const scenes = scenario.blocks?.flatMap((block) => block.scenes ?? []) ?? []
    for (const scene of scenes) {
      const primitive = scene.roleSpecificity?.coreDecisionPrimitive
      if (!primitive) continue
      const ids = primitiveUse.get(primitive) ?? []
      ids.push(`${scenario.id}/${scene.id}`)
      primitiveUse.set(primitive, ids)
    }
    const reason = scenario.roleWorkKernel?.nonGenericReason
    if (typeof reason === 'string' && reason.length < 24) weakReasons.push(scenario.id)
  }

  for (const [primitive, ids] of primitiveUse) {
    if (ids.length >= 3) {
      warnings.push(`many scenarios/scenes share primitive "${primitive}": ${ids.join(', ')}`)
    }
  }
  if (weakReasons.length > 0) {
    warnings.push(`weak nonGenericReason candidates: ${weakReasons.join(', ')}`)
  }
  if (scenarios.length < 10) {
    warnings.push('cross-scenario drift check is warning-ready; current canonical set is too small for production thresholds')
  }

  return warnings
}
