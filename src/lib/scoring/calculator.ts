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
}

const APTITUDE_LABELS: Array<{
  condition: (dims: DimensionResult[]) => boolean
  label: string
  description: string
}> = [
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
  const choicesByScene = new Map<string, Choice>()
  for (const scene of scenario.scenes) {
    const choiceId = answers[scene.id]
    if (!choiceId) continue
    const choice = scene.choices.find((c) => c.id === choiceId)
    if (choice) choicesByScene.set(scene.id, choice)
  }

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

  return {
    dimensions,
    topDimension,
    aptitudeLabel: aptitude.label,
    aptitudeDescription: aptitude.description,
  }
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
