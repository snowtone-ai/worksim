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

function toNullable(value: string | null | undefined): string | null {
  if (value === null || value === undefined || value === '') return null
  return value
}

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

  const raw = {
    university: toNullable(formData.get('university') as string | null) ?? undefined,
    faculty: toNullable(formData.get('faculty') as string | null) ?? undefined,
    target_industry: toNullable(formData.get('target_industry') as string | null) ?? undefined,
  }

  const parsed = profileSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: '入力内容が正しくありません' }
  }

  const { error } = await supabase.from('profiles').upsert(
    {
      user_id: user.id,
      university: parsed.data.university ?? null,
      faculty: parsed.data.faculty ?? null,
      target_industry: parsed.data.target_industry ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  )

  if (error) {
    return { error: `保存に失敗しました（${error.code}）。もう一度お試しください` }
  }

  redirect('/play')
}
