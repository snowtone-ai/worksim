import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { listScenarioIds, loadScenario } from '@/lib/scenario/loader'

export default async function PlayPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const ids = await listScenarioIds()
  const scenarios = await Promise.all(ids.map((id) => loadScenario(id)))

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-8">
      <div className="w-full max-w-xl flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900">シナリオ選択</h1>
          <p className="text-sm text-gray-500">体験したい職種を選んでください</p>
        </div>

        <div className="flex flex-col gap-4">
          {scenarios.map((scenario) => {
            const [industry, role] = scenario.id.split('/')
            return (
              <div
                key={scenario.id}
                className="rounded-xl border border-gray-200 bg-white px-5 py-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-indigo-600">{scenario.meta.industry}</span>
                  <span className="text-xs text-gray-400">約{scenario.meta.duration_minutes}分</span>
                </div>
                <p className="font-semibold text-gray-900">{scenario.meta.role}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{scenario.meta.description}</p>
                <div className="flex gap-2 pt-1">
                  <Link
                    href={`/play/${industry}/${role}`}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    通常モード
                  </Link>
                  <Link
                    href={`/play/${industry}/${role}/immersive`}
                    className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                  >
                    没入モード ✨
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
