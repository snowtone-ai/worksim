import { notFound, redirect } from 'next/navigation'
import { loadScenario } from '@/lib/scenario/loader'
import { ImmersiveGame } from '@/features/play/immersive/immersive-game'
import { createClient } from '@/lib/supabase/server'

type Props = {
  params: Promise<{ industry: string; role: string }>
}

export default async function ImmersivePage({ params }: Props) {
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

  return <ImmersiveGame scenario={scenario} industry={industry} role={role} />
}
