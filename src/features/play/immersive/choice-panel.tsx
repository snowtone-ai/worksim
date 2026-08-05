'use client'

import type { Choice } from '@/lib/scenario/loader'

type Props = {
  title: string
  context: string
  prompt: string
  choices: Choice[]
  selectedChoice: string | null
  nextLabel: string
  onChoice: (id: string) => void
  onConfirm: () => void
}

const CHOICE_LABELS = ['A', 'B', 'C', 'D']

export function ChoicePanel({ title, context, prompt, choices, selectedChoice, nextLabel, onChoice, onConfirm }: Props) {
  return (
    <section className="border border-slate-200 bg-white shadow-xl">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="text-xs font-semibold text-indigo-700">判断するタスク</p>
        <h3 className="mt-1 text-base font-semibold text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{context}</p>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-900">{prompt}</p>
      </div>

      <div className="grid gap-3 px-5 py-4 md:grid-cols-3">
        {choices.map((choice, index) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => onChoice(choice.id)}
            aria-pressed={selectedChoice === choice.id}
            className={`flex min-h-32 flex-col gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              selectedChoice === choice.id
                ? 'border-indigo-500 bg-indigo-50 text-indigo-950'
                : 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300 hover:bg-indigo-50'
            }`}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-500">選択肢 {CHOICE_LABELS[index] ?? index + 1}</span>
              <span className={`h-4 w-4 rounded-full border-2 ${
                selectedChoice === choice.id ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
              }`} />
            </span>
            <span className="leading-6">{choice.text ?? choice.label}</span>
          </button>
        ))}
      </div>

      <div className="border-t border-slate-200 px-5 py-4">
        <button
          type="button"
          onClick={onConfirm}
          disabled={!selectedChoice}
          className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:pointer-events-none disabled:bg-slate-300"
        >
          {selectedChoice ? nextLabel : '選択肢を選んでください'}
        </button>
      </div>
    </section>
  )
}
