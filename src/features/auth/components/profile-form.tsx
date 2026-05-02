'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { saveProfile } from '@/app/profile/actions'

const INDUSTRIES = [
  'IT・情報通信',
  '金融・保険',
  'コンサルティング',
  'メーカー（製造業）',
  '商社',
  '小売・流通',
  'マスコミ・広告',
  '医療・製薬',
  '建設・不動産',
  '公務員・教育',
  'その他',
]

type State = { error: string } | undefined

export function ProfileForm() {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    saveProfile,
    undefined
  )

  return (
    <form action={formAction} className="flex flex-col gap-5 w-full max-w-sm">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="university" className="text-sm font-medium text-gray-700">
          大学名
        </label>
        <input
          id="university"
          name="university"
          type="text"
          placeholder="例：○○大学"
          maxLength={100}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="faculty" className="text-sm font-medium text-gray-700">
          学部・学科
        </label>
        <input
          id="faculty"
          name="faculty"
          type="text"
          placeholder="例：経済学部"
          maxLength={100}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="target_industry" className="text-sm font-medium text-gray-700">
          志望業界
        </label>
        <select
          id="target_industry"
          name="target_industry"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">選択してください（任意）</option>
          {INDUSTRIES.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <div className="flex flex-col gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending ? '保存中…' : '保存してはじめる'}
        </button>
        <Link
          href="/play"
          className="text-center text-sm text-gray-500 hover:text-gray-700 underline"
        >
          スキップして始める
        </Link>
      </div>
    </form>
  )
}
