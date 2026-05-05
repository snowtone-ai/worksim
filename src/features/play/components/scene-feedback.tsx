import type { Choice } from '@/lib/scenario/loader'

type Props = {
  choice: Choice
}

export function SceneFeedback({ choice }: Props) {
  if (!choice.studentFeedback) return null

  return (
    <section className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">フィードバック</p>
      <div className="mt-3 flex flex-col gap-3 text-sm text-emerald-900">
        <p><span className="font-semibold">良かった点:</span> {choice.studentFeedback.good}</p>
        <p><span className="font-semibold">残るリスク:</span> {choice.studentFeedback.risk}</p>
        <p><span className="font-semibold">次の展開:</span> {choice.studentFeedback.next}</p>
      </div>
    </section>
  )
}
