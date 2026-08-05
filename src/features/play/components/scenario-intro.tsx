import type { Scenario } from '@/lib/scenario/loader'

type Props = {
  scenario: Scenario
  onStart: () => void
}

export function ScenarioIntro({ scenario, onStart }: Props) {
  const mission = scenario.scenes[0]?.decisionPrompt ?? '最初の判断に進む'
  const tone = scenario.background?.mood ?? 'calm, focused, realistic'
  const visualTokens = scenario.background?.industryVisualTokens?.slice(0, 3).join(' / ') ?? scenario.meta.industry

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900 text-white shadow-xl">
      <div className="bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.45),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.3),_transparent_32%),linear-gradient(135deg,_#0f172a,_#1e293b)] px-6 py-8">
        <div className="max-w-lg">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Task-Pre Screen</p>
          <h2 className="mt-3 text-2xl font-semibold">{scenario.meta.role}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-200">{scenario.meta.description}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <InfoCard label="現在時刻" value={scenario.timeline?.[0]?.time ?? '09:00'} />
          <InfoCard label="ミッション" value={mission} />
          <InfoCard label="ワークプレイス" value={tone} />
          <InfoCard label="Visual Cue" value={visualTokens} />
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-8 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-transform duration-150 hover:-translate-y-0.5"
        >
          開始する
        </button>
      </div>
    </section>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
      <p className="text-[11px] uppercase tracking-wide text-slate-300">{label}</p>
      <p className="mt-1 text-sm text-white">{value}</p>
    </div>
  )
}
