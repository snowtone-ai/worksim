import Link from 'next/link'
import { redirect } from 'next/navigation'
import { loadCatalog } from '@/lib/scenario/loader'
import { displayIndustry } from '@/lib/scenario/view-model'
import { createClient } from '@/lib/supabase/server'

export default async function PlayPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const catalog = await loadCatalog()
  const industries = Object.values(
    catalog.reduce<Record<string, {
      industry: string
      industrySlug: string
      roleCount: number
      tags: Set<string>
    }>>((acc, item) => {
      const current = acc[item.industrySlug] ?? {
        industry: item.industry,
        industrySlug: item.industrySlug,
        roleCount: 0,
        tags: new Set<string>(),
      }
      current.roleCount += 1
      for (const tag of item.tags) current.tags.add(tag)
      acc[item.industrySlug] = current
      return acc
    }, {}),
  )

  return (
    <div className="flex flex-1 flex-col px-4 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium text-indigo-600">50職種の職場体験カタログ</p>
          <h1 className="text-2xl font-semibold text-gray-900">業界を選択</h1>
          <p className="max-w-2xl text-sm leading-6 text-gray-500">
            興味のある業界から、職種別の1日体験を選べます。大学PoCでは全業界を同じカード形式で確認できます。
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.industrySlug}
              href={`/play/${industry.industrySlug}`}
              className="group flex min-h-56 flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-700">
                    {displayIndustry(industry.industrySlug, industry.industry)}
                  </h2>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    {industry.roleCount}職種
                  </span>
                </div>

                <p className="text-sm leading-6 text-gray-500">
                  この業界の職種カードから、役割・判断内容・所要時間を確認して体験を開始します。
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {[...industry.tags].slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-indigo-600">職種カードを見る →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
