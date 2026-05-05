'use client'

import type { ImmersiveScene, Phase } from '@/lib/scenario/loader'
import { getTaskBrief } from '@/lib/scenario/view-model'
import { ChoicePanel } from './choice-panel'

type Props = {
  scene: ImmersiveScene
  selectedChoice: string | null
  onChoice: (id: string) => void
  onConfirm: () => void
  nextLabel: string
  phase: Phase
  blockLabel: string
}

export function DialogueScene({ scene, selectedChoice, onChoice, onConfirm, nextLabel, phase, blockLabel }: Props) {
  const isLunch = phase === 'lunch'
  const bg = isLunch
    ? 'bg-gradient-to-br from-amber-50 via-white to-orange-100'
    : 'bg-gradient-to-br from-slate-100 via-white to-blue-100'
  const pageStyle = {
    paddingBottom: 'max(7rem, calc(5rem + env(safe-area-inset-bottom, 0px)))',
  } as const
  const brief = getTaskBrief(scene)

  return (
    <div className={`absolute inset-0 overflow-y-auto overscroll-contain ${bg}`}>
      <div className="relative z-10 mx-auto flex min-h-max w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:px-6 sm:py-5" style={pageStyle}>
        <section className="border border-slate-200 bg-white/95 shadow-xl">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
            <p className="text-xs font-semibold text-slate-500">
              {blockLabel}
            </p>
            <h2 className="mt-1 text-base font-semibold text-slate-900">{scene.title}</h2>
          </div>
          <div className="px-5 py-4">
            <div className="border-l-4 border-indigo-400 bg-slate-50 px-4 py-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs text-slate-500">{scene.context}</p>
                {scene.presenter && (
                  <p className="shrink-0 text-xs font-bold text-indigo-700">{scene.presenter}</p>
                )}
              </div>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-800">{scene.content}</pre>
            </div>
          </div>
        </section>

        <ChoicePanel
          title={brief.title}
          context={brief.context}
          prompt={brief.prompt}
          choices={scene.choices}
          selectedChoice={selectedChoice}
          nextLabel={nextLabel}
          onChoice={onChoice}
          onConfirm={onConfirm}
        />
      </div>
    </div>
  )
}
