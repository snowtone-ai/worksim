import { notFound } from 'next/navigation'
import Link from 'next/link'
import { loadScenario, type Scene } from '@/lib/scenario/loader'
import { calculateResult, decodeAnswers } from '@/lib/scoring/calculator'

type Props = {
  params: Promise<{ industry: string; role: string }>
  searchParams: Promise<{ a?: string; m?: string }>
}

const APTITUDE_ICONS: Record<string, string> = {
  'テックリード型': '⚙️',
  'リーダーシップ型': '🚀',
  'プランナー型': '📋',
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
  const isImmersive = m === 'immersive'

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
  const replayHref = isImmersive
    ? `/play/${industry}/${role}/immersive`
    : `/play/${industry}/${role}`

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-8">
      <div className="w-full max-w-xl flex flex-col gap-6">
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
          <p className="text-3xl font-bold text-indigo-700">{result.aptitudeLabel}</p>
          <p className="text-sm text-indigo-600 leading-relaxed">{result.aptitudeDescription}</p>
        </div>

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
