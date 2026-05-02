'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const profileSchema = z.object({
  university: z.string().max(100).optional(),
  faculty: z.string().max(100).optional(),
  target_industry: z.string().max(50).optional(),
})

type ProfileState = { error: string } | undefined

export async function saveProfile(
  _prevState: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  const parsed = profileSchema.safeParse({
    university: (formData.get('university') as string | null) ?? undefined,
    faculty: (formData.get('faculty') as string | null) ?? undefined,
    target_industry: (formData.get('target_industry') as string | null) ?? undefined,
  })

  if (!parsed.success) {
    return { error: '入力内容が正しくありません' }
  }

  const { error } = await supabase.from('profiles').upsert({
    user_id: user.id,
    ...parsed.data,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    return { error: '保存に失敗しました。もう一度お試しください' }
  }

  redirect('/play')
}
