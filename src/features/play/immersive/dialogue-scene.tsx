'use client'

import type { ImmersiveScene, Phase } from '@/lib/scenario/loader'

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

        <section className="border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3">
            <p className="text-sm font-semibold text-slate-900">あなたの返答</p>
            <button
              type="button"
              onClick={onConfirm}
              disabled={!selectedChoice}
              className={`shrink-0 rounded-lg bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:pointer-events-none ${!selectedChoice ? 'invisible' : ''}`}
            >
              {nextLabel}
            </button>
          </div>
          <div className="px-5 py-3">
            <div className="flex flex-col gap-2">
              {scene.choices.map((c) => (
                <ChoiceButton
                  key={c.id}
                  id={c.id}
                  label={c.label}
                  selected={selectedChoice === c.id}
                  onChoice={onChoice}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function ChoiceButton({ id, label, selected, onChoice }: {
  id: string
  label: string
  selected: boolean
  onChoice: (id: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChoice(id)}
      className={`text-left px-4 py-2.5 rounded-lg border text-sm flex items-start gap-2 transition-colors ${
        selected
          ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
          : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
      }`}
    >
      <span className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        selected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
      }`}>
        {selected && (
          <svg className="h-2 w-2 text-white" viewBox="0 0 8 8">
            <path d="M1 4L3 6L7 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span>{label}</span>
    </button>
  )
}
