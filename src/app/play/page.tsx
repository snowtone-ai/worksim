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
              <Link
                key={scenario.id}
                href={`/play/${industry}/${role}`}
                className="rounded-xl border border-gray-200 bg-white px-5 py-4 hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-indigo-600">{scenario.meta.industry}</span>
                  <span className="text-xs text-gray-400">約{scenario.meta.duration_minutes}分</span>
                </div>
                <p className="font-semibold text-gray-900">{scenario.meta.role}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{scenario.meta.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
