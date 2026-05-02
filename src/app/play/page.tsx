import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function PlayPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-semibold text-gray-900">シナリオ選択</h1>
      <p className="text-gray-500">Phase 3 で実装予定</p>
    </div>
  )
}
