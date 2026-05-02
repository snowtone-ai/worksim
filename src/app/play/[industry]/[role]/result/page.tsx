import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { loadScenario } from '@/lib/scenario/loader'
import { calculateResult, decodeAnswers } from '@/lib/scoring/calculator'
import { createClient } from '@/lib/supabase/server'

type Props = {
  params: Promise<{ industry: string; role: string }>
  searchParams: Promise<{ a?: string }>
}

export default async function ResultPage({ params, searchParams }: Props) {
  const { industry, role } = await params
  const { a } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  if (!a) notFound()

  let scenario
  try {
    scenario = await loadScenario(`${industry}/${role}`)
  } catch {
    notFound()
  }

  const answers = decodeAnswers(a)
  const result = calculateResult(scenario, answers)

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-8">
      <div className="w-full max-w-xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <p className="text-xs text-gray-400">{scenario.meta.industry} / {scenario.meta.role}</p>
          <h1 className="text-2xl font-bold text-gray-900">診断結果</h1>
        </div>

        {/* Aptitude label */}
        <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-6 py-5 text-center flex flex-col gap-2">
          <p className="text-xs font-medium text-indigo-400 uppercase tracking-wide">あなたのタイプ</p>
          <p className="text-3xl font-bold text-indigo-700">{result.aptitudeLabel}</p>
          <p className="text-sm text-indigo-600">{result.aptitudeDescription}</p>
        </div>

        {/* Dimension bars */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-700">スコア詳細</h2>
          {result.dimensions.map((dim) => (
            <div key={dim.key} className="flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{dim.label}</span>
                <span className="text-gray-500">{dim.percentage}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-indigo-500 transition-all"
                  style={{ width: `${dim.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">{dim.description}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href={`/play/${industry}/${role}`}
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
