import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { loadCatalog } from '@/lib/scenario/loader'
import { displayIndustry, getCatalogCard } from '@/lib/scenario/view-model'
import { createClient } from '@/lib/supabase/server'

type Props = {
  params: Promise<{ industry: string }>
}

export default async function IndustryScenarioPage({ params }: Props) {
  const { industry } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const catalog = await loadCatalog()
  const items = catalog.filter((item) => item.industrySlug === industry)
  if (items.length === 0) notFound()

  const industryName = displayIndustry(industry, items[0]?.industry ?? '')

  return (
    <div className="flex flex-1 flex-col px-4 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <Link href="/play" className="text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600">
            ← 業界選択へ戻る
          </Link>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-indigo-600">{industryName}</p>
            <h1 className="text-2xl font-semibold text-gray-900">職種別シナリオ選択</h1>
            <p className="max-w-2xl text-sm leading-6 text-gray-500">
              1カード1職種です。概要、判断タグ、所要時間を見比べて、気になる仕事の体験を開始してください。
            </p>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const card = getCatalogCard(item)

            return (
              <article
                key={`${item.industrySlug}/${item.roleSlug}`}
                className={`flex h-full min-h-72 flex-col gap-4 rounded-lg border bg-white p-5 shadow-sm ${
                  card.isRepresentative ? 'border-indigo-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">{card.durationLabel}</span>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-xs font-medium text-gray-400">{card.industryName}</p>
                  <Link
                    href={card.isPlayable ? card.href : '#'}
                    aria-disabled={!card.isPlayable}
                    className={`text-base font-semibold leading-6 transition-colors ${
                      card.isPlayable
                        ? 'text-gray-900 hover:text-indigo-600'
                        : 'pointer-events-none text-gray-500'
                    }`}
                  >
                    {card.roleName}
                  </Link>
                  <p className="text-sm leading-6 text-gray-500">{card.description}</p>
                </div>

                <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
                  <span>{card.difficultyLabel}</span>
                  <span className={card.isRepresentative ? 'font-medium text-indigo-600' : ''}>{card.statusLabel}</span>
                </div>

                <div>
                  {card.isPlayable ? (
                    <Link
                      href={card.href}
                      className="block rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                    >
                      体験する
                    </Link>
                  ) : (
                    <span className="block rounded-lg border border-dashed border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-400">
                      没入準備中
                    </span>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
