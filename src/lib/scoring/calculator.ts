import type { Scenario, Choice } from '@/lib/scenario/loader'

export type DimensionResult = {
  key: string
  label: string
  description: string
  score: number
  maxScore: number
  percentage: number
}

export type ScenarioResult = {
  dimensions: DimensionResult[]
  topDimension: DimensionResult
  aptitudeLabel: string
  aptitudeDescription: string
  resultType?: string
  dominantMeters: string[]
  sacrificedMeters: string[]
  roleRealityReveal?: string
  misconceptionCorrection?: string
  decisionPatternSummary?: string
  careerReflectionPrompt?: string
  universityInsightTags: string[]
  nextRecommendedScenarios: string[]
}

const APTITUDE_LABELS: Array<{
  condition: (dims: DimensionResult[]) => boolean
  label: string
  description: string
}> = [
  {
    condition: (dims) => topKey(dims) === 'problem_solving' && secondKey(dims) === 'logical',
    label: '問題解決型',
    description: '論点を整理し、実務で動く解決策へ落とし込む力が目立ちます。',
  },
  {
    condition: (dims) => topKey(dims) === 'technical' && secondKey(dims) === 'logical',
    label: 'テックリード型',
    description: '深い技術力と論理的な判断力が光ります。複雑な問題を体系的に解決する力があります。',
  },
  {
    condition: (dims) => topKey(dims) === 'communication' && secondKey(dims) === 'ownership',
    label: 'リーダーシップ型',
    description: '発信力と当事者意識が高く、チームをまとめながら課題を前に進める力があります。',
  },
  {
    condition: (dims) => topKey(dims) === 'logical' && secondKey(dims) === 'communication',
    label: 'プランナー型',
    description: '情報を整理して的確に伝える力があります。設計や要件定義の工程で力を発揮します。',
  },
  {
    condition: (dims) => topKey(dims) === 'ethics',
    label: 'リスクガード型',
    description: 'ルールや影響範囲を丁寧に捉え、無理のない進め方を選べます。',
  },
  {
    condition: (dims) => topKey(dims) === 'creativity',
    label: '企画発想型',
    description: '制約の中でも新しい切り口を探し、形にする発想力があります。',
  },
  {
    condition: (dims) => topKey(dims) === 'agility',
    label: 'アジャイル型',
    description: '変化への素早い対応力が際立ちます。不確実な状況でも行動できるエンジニアです。',
  },
  {
    condition: (dims) => topKey(dims) === 'ownership',
    label: 'オーナーシップ型',
    description: '強い当事者意識で問題を自分事として捉えます。チームから信頼されるエンジニアです。',
  },
  {
    condition: () => true,
    label: 'バランス型',
    description: '複数の力をバランスよく持っています。どんな状況にも対応できる柔軟さがあります。',
  },
]

function topKey(dims: DimensionResult[]): string {
  return dims.reduce((a, b) => (a.percentage >= b.percentage ? a : b)).key
}

function secondKey(dims: DimensionResult[]): string {
  const sorted = [...dims].sort((a, b) => b.percentage - a.percentage)
  return sorted[1]?.key ?? sorted[0]?.key ?? ''
}

export function calculateResult(
  scenario: Scenario,
  answers: Record<string, string>
): ScenarioResult {
  const choicesByScene = collectSelectedChoices(scenario, answers)

  const dimensions: DimensionResult[] = scenario.dimensions.map((dim) => {
    let score = 0
    let maxScore = 0
    for (const scene of scenario.scenes) {
      const choice = choicesByScene.get(scene.id)
      const dimScore = choice?.scores[dim.key] ?? 0
      score += dimScore
      const sceneMax = Math.max(...scene.choices.map((c) => c.scores[dim.key] ?? 0))
      maxScore += sceneMax
    }
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
    return { key: dim.key, label: dim.label, description: dim.description, score, maxScore, percentage }
  })

  const topDimension = dimensions.reduce((a, b) => (a.percentage >= b.percentage ? a : b))
  const aptitude = APTITUDE_LABELS.find((a) => a.condition(dimensions)) ?? APTITUDE_LABELS[APTITUDE_LABELS.length - 1]!
  const meterResult = calculateMeterResult(scenario, choicesByScene)

  return {
    dimensions,
    topDimension,
    aptitudeLabel: aptitude.label,
    aptitudeDescription: aptitude.description,
    ...meterResult,
  }
}

function collectSelectedChoices(
  scenario: Scenario,
  answers: Record<string, string>
): Map<string, Choice> {
  const choicesByScene = new Map<string, Choice>()
  for (const scene of scenario.scenes) {
    const choiceId = answers[scene.id]
    if (!choiceId) continue
    const choice = scene.choices.find((c) => c.id === choiceId)
    if (choice) choicesByScene.set(scene.id, choice)
  }
  return choicesByScene
}

function calculateMeterResult(
  scenario: Scenario,
  choicesByScene: Map<string, Choice>
): Omit<ScenarioResult, 'dimensions' | 'topDimension' | 'aptitudeLabel' | 'aptitudeDescription'> {
  const meterTotals = new Map<string, number>()
  const insightTags = new Set<string>(scenario.resultFeedback?.universityInsightTags ?? [])
  const choiceSummaries: string[] = []

  for (const choice of choicesByScene.values()) {
    for (const [key, value] of Object.entries(choice.meterEffects ?? {})) {
      meterTotals.set(key, (meterTotals.get(key) ?? 0) + value)
    }
    for (const tag of choice.universityInsightTags ?? []) insightTags.add(tag)
    if (choice.resultSummaryEffect) choiceSummaries.push(choice.resultSummaryEffect)
  }

  const sortedMeters = [...meterTotals.entries()].sort((a, b) => b[1] - a[1])
  const dominantMeters = sortedMeters.filter(([, v]) => v > 0).slice(0, 3).map(([k]) => k)
  const sacrificedMeters = [...sortedMeters].reverse().filter(([, v]) => v < 0).slice(0, 3).map(([k]) => k)
  const matchedType = selectResultType(scenario, meterTotals, dominantMeters)

  return {
    resultType: matchedType?.title,
    dominantMeters,
    sacrificedMeters,
    roleRealityReveal: matchedType?.roleRealityReveal ?? scenario.resultFeedback?.roleRealityReveal,
    misconceptionCorrection: matchedType?.misconceptionCorrection ?? scenario.resultFeedback?.misconceptionCorrection,
    decisionPatternSummary: matchedType?.decisionPatternSummary ?? summarizeDecisionPattern(choiceSummaries),
    careerReflectionPrompt: matchedType?.careerReflectionPrompt ?? scenario.resultFeedback?.careerReflectionPrompt,
    universityInsightTags: [
      ...new Set([...(matchedType?.universityInsightTags ?? []), ...insightTags]),
    ],
    nextRecommendedScenarios: scenario.resultFeedback?.nextRecommendedScenarios ?? [],
  }
}

function selectResultType(
  scenario: Scenario,
  meterTotals: Map<string, number>,
  dominantMeters: string[]
) {
  const resultTypes = scenario.resultTypes
  if (!resultTypes || resultTypes.length === 0) return undefined

  const rankedTypes = resultTypes.map((type, index) => {
    const valuedMeters = type.valuedMeters ?? type.meterPriorities ?? []
    const sacrificedMeters = type.sacrificedMeters ?? []
    const priorityMeters = type.meterPriorities ?? []
    const priorityScore = priorityMeters.reduce((score, meter, meterIndex) => {
      const dominantIndex = dominantMeters.indexOf(meter)
      if (dominantIndex === -1) return score
      return score + (dominantMeters.length - dominantIndex) * (priorityMeters.length - meterIndex)
    }, 0)
    const valuedScore = valuedMeters.reduce((score, meter) => {
      return score + Math.max(meterTotals.get(meter) ?? 0, 0)
    }, 0)
    const sacrificedScore = sacrificedMeters.reduce((score, meter) => {
      return score + Math.max(-(meterTotals.get(meter) ?? 0), 0)
    }, 0)
    return { type, index, score: valuedScore * 10 + sacrificedScore * 5 + priorityScore }
  })

  return rankedTypes.sort((a, b) => b.score - a.score || a.index - b.index)[0]?.type
}

function summarizeDecisionPattern(choiceSummaries: string[]): string | undefined {
  if (choiceSummaries.length === 0) return undefined
  return choiceSummaries.slice(0, 2).join(' / ')
}

export function encodeAnswers(answers: Record<string, string>): string {
  return encodeURIComponent(JSON.stringify(answers))
}

export function decodeAnswers(encoded: string): Record<string, string> {
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(encoded))
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {}
    const decodedAnswers: Record<string, string> = {}
    for (const [sceneId, choiceId] of Object.entries(parsed)) {
      if (typeof choiceId === 'string') decodedAnswers[sceneId] = choiceId
    }
    return decodedAnswers
  } catch {
    return {}
  }
}
