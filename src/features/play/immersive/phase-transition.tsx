'use client'

import type { Block } from '@/lib/scenario/loader'

type Props = {
  block: Block
  onComplete: () => void
  isStart: boolean
}

const PHASE_ICONS: Record<string, string> = {
  morning: '☀️',
  lunch: '🍱',
  meeting: '📋',
  afternoon: '🌇',
}

const PHASE_BGS: Record<string, string> = {
  morning: 'from-sky-900 via-indigo-900 to-slate-900',
  lunch: 'from-amber-900 via-orange-900 to-yellow-900',
  meeting: 'from-slate-900 via-blue-900 to-indigo-900',
  afternoon: 'from-orange-900 via-rose-900 to-purple-900',
}

export function PhaseTransition({ block, onComplete, isStart }: Props) {
  const icon = PHASE_ICONS[block.id] ?? '⏰'
  const bg = PHASE_BGS[block.id] ?? 'from-slate-900 to-black'

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${bg} flex flex-col items-center justify-center text-white z-50 px-8`}>
      <div className="text-center max-w-2xl">
        <div className="text-8xl mb-6 animate-pulse">{icon}</div>
        <p className="text-sm text-white/60 font-mono mb-3 tracking-widest">
          {block.time_start} — {block.time_end}
        </p>
        <h2 className="text-5xl font-bold mb-6">{block.label}</h2>
        <p className="text-base text-white/85 leading-relaxed mb-10">{block.intro}</p>
        <button
          type="button"
          onClick={onComplete}
          className="px-10 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-amber-100 hover:scale-105 transition-all shadow-2xl"
        >
          {isStart ? '一日を始める →' : 'はじめる →'}
        </button>
      </div>
    </div>
  )
}
