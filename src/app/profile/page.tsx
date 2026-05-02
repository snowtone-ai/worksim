import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/features/auth/components/profile-form'

export const metadata = { title: 'プロフィール設定 | WorkSim' }

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-8 px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">ようこそ</h1>
        <p className="mt-2 text-gray-600">
          プロフィールを入力すると、より適切なシナリオを提案できます。
          <br />
          すべて任意です。スキップしてすぐに始めることもできます。
        </p>
      </div>
      <ProfileForm />
    </div>
  )
}
