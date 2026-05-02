import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LoginButton } from '@/features/auth/components/login-button'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/play')
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-10 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">WorkSim</h1>
        <p className="mt-3 text-lg text-gray-600">
          仕事体験シミュレーション
        </p>
        <p className="mt-1 text-sm text-gray-500">
          さまざまな職種の一日を体験して、自分に合う仕事を見つけよう
        </p>
      </div>
      <LoginButton />
    </div>
  )
}
