import { notFound } from 'next/navigation'
import Link from 'next/link'
import { loadCatalog, loadScenario, type Scene } from '@/lib/scenario/loader'
import { calculateResult, decodeAnswers } from '@/lib/scoring/calculator'
import { ResultAnalytics } from '@/features/play/components/result-analytics'

type Props = {
  params: Promise<{ industry: string; role: string }>
  searchParams: Promise<{ a?: string; m?: string }>
}

const APTITUDE_ICONS: Record<string, string> = {
  '問題解決型': '🧩',
  'テックリード型': '⚙️',
  'リーダーシップ型': '🚀',
  'プランナー型': '📋',
  'リスクガード型': '🛡️',
  '企画発想型': '💡',
  'アジャイル型': '⚡',
  'オーナーシップ型': '🎯',
  'バランス型': '⚖️',
}

function barColor(pct: number): string {
  if (pct >= 70) return 'bg-indigo-500'
  if (pct >= 50) return 'bg-indigo-400'
  return 'bg-indigo-300'
}

export default async function ResultPage({ params, searchParams }: Props) {
  const { industry, role } = await params
  const { a, m } = await searchParams

  if (!a) notFound()

  let scenario
  try {
    scenario = await loadScenario(`${industry}/${role}`)
  } catch {
    notFound()
  }

  const answers = decodeAnswers(a)
  const isImmersive = m !== 'normal'

  // Build scoring scenes: for immersive mode, flatten blocks into Scene-compatible array
  const scoringScenes: Scene[] = isImmersive && scenario.blocks
    ? scenario.blocks.flatMap((block) =>
        block.scenes.map((s) => ({
          id: s.id,
          type: 'meeting' as const,
          title: s.title,
          context: s.context,
          content: s.content,
          choices: s.choices,
        }))
      )
    : scenario.scenes

  const result = calculateResult({ ...scenario, scenes: scoringScenes }, answers)
  const aptitudeIcon = APTITUDE_ICONS[result.aptitudeLabel] ?? '✨'
  const replayHref = `/play/${industry}/${role}/immersive`
  const lowDimensions = [...result.dimensions].sort((a, b) => a.percentage - b.percentage).slice(0, 2)
  const catalog = await loadCatalog()
  const recommendations = catalog
    .filter((item) => item.industrySlug === industry && item.roleSlug !== role && item.modes.includes('immersive'))
    .slice(0, 3)
  const hasCareerFeedback = Boolean(
    result.resultType ||
    result.roleRealityReveal ||
    result.misconceptionCorrection ||
    result.dominantMeters.length > 0 ||
    result.sacrificedMeters.length > 0
  )

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-8">
      <div className="w-full max-w-xl flex flex-col gap-6">
        <ResultAnalytics
          scenarioId={scenario.id}
          industrySlug={industry}
          roleSlug={role}
          mode="immersive"
        />
        <div className="flex flex-col gap-1 text-center">
          <p className="text-xs text-gray-400">
            {scenario.meta.industry} / {scenario.meta.role}
            {isImmersive && <span className="ml-2 text-indigo-500">✨ 没入モード</span>}
          </p>
          <h1 className="text-2xl font-bold text-gray-900">診断結果</h1>
        </div>

        <div className="rounded-xl bg-gradient-to-b from-indigo-50 to-white border border-indigo-100 px-6 py-6 text-center flex flex-col gap-3">
          <p className="text-5xl">{aptitudeIcon}</p>
          <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest">あなたのタイプ</p>
          <p className="text-3xl font-bold text-indigo-700">{result.resultType ?? result.aptitudeLabel}</p>
          <p className="text-sm text-indigo-600 leading-relaxed">{result.aptitudeDescription}</p>
        </div>

        {hasCareerFeedback && (
          <section className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-4">
            <h2 className="text-sm font-semibold text-sky-900">職業理解フィードバック</h2>
            <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-sky-950">
              {result.dominantMeters.length > 0 && (
                <p>
                  <span className="font-semibold">重視した価値:</span>{' '}
                  {result.dominantMeters.map((key) => meterLabel(scenario, key)).join(' / ')}
                </p>
              )}
              {result.sacrificedMeters.length > 0 && (
                <p>
                  <span className="font-semibold">犠牲にした価値:</span>{' '}
                  {result.sacrificedMeters.map((key) => meterLabel(scenario, key)).join(' / ')}
                </p>
              )}
              {result.roleRealityReveal && (
                <p><span className="font-semibold">この職種の現実:</span> {result.roleRealityReveal}</p>
              )}
              {result.misconceptionCorrection && (
                <p><span className="font-semibold">誤解の修正:</span> {result.misconceptionCorrection}</p>
              )}
              {result.decisionPatternSummary && (
                <p><span className="font-semibold">判断パターン:</span> {result.decisionPatternSummary}</p>
              )}
              {result.careerReflectionPrompt && (
                <p><span className="font-semibold">振り返り:</span> {result.careerReflectionPrompt}</p>
              )}
            </div>
          </section>
        )}

        <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-start gap-3">
          <span className="text-emerald-500 text-lg mt-0.5">★</span>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-medium text-emerald-700">最も強いチカラ</p>
            <p className="text-sm font-semibold text-emerald-800">
              {result.topDimension.label}
              <span className="font-normal text-emerald-600"> — {result.topDimension.description}</span>
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs font-medium text-amber-700">注意して見たい点</p>
          <div className="mt-2 flex flex-col gap-1 text-sm text-amber-900">
            {lowDimensions.map((dim) => (
              <p key={dim.key}>{dim.label}: {dim.description}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-700">スコア詳細</h2>
          {result.dimensions.map((dim) => (
            <div key={dim.key} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">{dim.label}</span>
                  {dim.key === result.topDimension.key && (
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full font-medium">
                      TOP
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400 font-mono tabular-nums">{dim.percentage}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className={`h-2 rounded-full transition-all ${barColor(dim.percentage)}`}
                  style={{ width: `${dim.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">{dim.description}</p>
            </div>
          ))}
        </div>

        {recommendations.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-gray-700">次に試すと比較しやすい職種</h2>
            <div className="grid gap-3">
              {recommendations.map((item) => (
                <Link
                  key={item.roleSlug}
                  href={`/play/${item.industrySlug}/${item.roleSlug}/immersive`}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <p className="text-sm font-medium text-gray-900">{item.role}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href={replayHref}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            もう一度やり直す
          </Link>
          <Link
            href="/play"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            他の職種を体験する
          </Link>
        </div>
      </div>
    </div>
  )
}

function meterLabel(
  scenario: Awaited<ReturnType<typeof loadScenario>>,
  key: string
): string {
  return scenario.roleSpecificMeters?.find((meter) => meter.key === key)?.label ?? key
}
