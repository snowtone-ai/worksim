import { notFound } from 'next/navigation'
import { loadScenario } from '@/lib/scenario/loader'
import { SceneManager } from '@/features/play/components/scene-manager'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ industry: string; role: string }>
}

export default async function PlayScenarioPage({ params }: Props) {
  const { industry, role } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  let scenario
  try {
    scenario = await loadScenario(`${industry}/${role}`)
  } catch {
    notFound()
  }

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-8">
      <div className="w-full max-w-xl flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-400">{scenario.meta.industry}</p>
          <h1 className="text-xl font-semibold text-gray-900">{scenario.meta.role}</h1>
          <p className="text-sm text-gray-500">{scenario.meta.description}</p>
        </div>
        <SceneManager scenario={scenario} industry={industry} role={role} />
      </div>
    </div>
  )
}
