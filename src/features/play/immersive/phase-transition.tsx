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
  morning: 'from-sky-950 via-slate-900 to-stone-900',
  lunch: 'from-amber-950 via-stone-900 to-emerald-950',
  meeting: 'from-slate-950 via-zinc-900 to-blue-950',
  afternoon: 'from-stone-950 via-rose-950 to-slate-950',
}

export function PhaseTransition({ block, onComplete, isStart }: Props) {
  const icon = PHASE_ICONS[block.id] ?? '⏰'
  const bg = PHASE_BGS[block.id] ?? 'from-slate-900 to-black'
  const scene = getSceneDetail(block.id)

  return (
    <div className={`absolute inset-0 z-50 overflow-hidden bg-gradient-to-br ${bg} text-white`}>
      <TransitionBackdrop blockId={block.id} icons={scene.icons} />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

      <div className="relative h-full px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <div className="absolute right-6 top-6 z-10 w-64 border border-white/15 bg-black/35 p-4 backdrop-blur sm:right-8 sm:top-8 sm:w-72 lg:right-12 lg:top-10">
          <p className="mb-3 text-right text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
            {scene.location}
          </p>
          <button
            type="button"
            onClick={onComplete}
            className="w-full rounded-sm bg-white px-8 py-4 text-sm font-bold text-slate-950 shadow-2xl transition-transform hover:scale-[1.02] hover:bg-amber-100"
          >
            {isStart ? '一日を始める →' : 'はじめる →'}
          </button>
        </div>

        <div className="flex h-full max-w-3xl flex-col justify-start pt-14 pr-72 sm:pt-16 sm:pr-80 lg:pt-20">
          <div className="inline-flex items-center gap-3 border border-white/15 bg-black/20 px-4 py-2 backdrop-blur">
            <span className="text-3xl">{icon}</span>
            <p className="font-mono text-xs tracking-[0.32em] text-white/70">
              {block.time_start} / {block.time_end}
            </p>
          </div>
          <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{block.label}</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg sm:leading-8">{block.intro}</p>

          <div className="mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {scene.cues.map((cue) => (
              <div key={cue} className="border border-white/15 bg-black/25 px-4 py-3 backdrop-blur">
                <p className="text-sm text-white/82">{cue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TransitionBackdrop({ blockId, icons }: { blockId: string; icons: string[] }) {
  if (blockId === 'meeting') {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-12 mx-auto h-36 w-[680px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-sm" />
        <div className="absolute inset-x-0 top-16 mx-auto h-1 w-[620px] bg-white/40" />
        <div className="absolute left-1/2 top-[240px] h-28 w-[520px] -translate-x-1/2 rounded-full bg-slate-300/35 shadow-2xl" />
        <div className="absolute left-[27%] top-[250px] text-8xl">{icons[0]}</div>
        <div className="absolute left-[41%] top-[215px] text-8xl">{icons[1]}</div>
        <div className="absolute left-[58%] top-[250px] text-8xl">{icons[2]}</div>
        <div className="absolute left-[19%] top-[360px] h-20 w-28 border border-white/15 bg-white/10 backdrop-blur-sm" />
        <div className="absolute right-[19%] top-[360px] h-20 w-28 border border-white/15 bg-white/10 backdrop-blur-sm" />
      </div>
    )
  }

  if (blockId === 'lunch') {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 bottom-24 mx-auto h-24 w-[620px] rounded-2xl bg-amber-700/45 shadow-2xl" />
        <div className="absolute left-[34%] bottom-[190px] text-8xl">{icons[0]}</div>
        <div className="absolute left-[46%] bottom-[200px] text-8xl">{icons[1]}</div>
        <div className="absolute left-[58%] bottom-[190px] text-8xl">{icons[2]}</div>
        <div className="absolute left-20 top-20 h-40 w-32 border border-white/15 bg-white/10 backdrop-blur-sm" />
        <div className="absolute right-24 top-16 h-44 w-36 border border-white/15 bg-white/10 backdrop-blur-sm" />
      </div>
    )
  }

  if (blockId === 'afternoon') {
    return (
      <div className="absolute inset-0">
        <div className="absolute left-20 top-24 h-40 w-60 border-[8px] border-white/10 bg-orange-200/10 shadow-2xl" />
        <div className="absolute left-1/2 top-40 h-56 w-[640px] -translate-x-1/2 border border-white/10 bg-slate-900/30 shadow-2xl backdrop-blur-sm" />
        <div className="absolute left-[38%] top-[230px] text-8xl">{icons[0]}</div>
        <div className="absolute left-[50%] top-[215px] text-8xl">{icons[1]}</div>
        <div className="absolute left-[61%] top-[235px] text-8xl">{icons[2]}</div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-x-0 bottom-28 mx-auto h-48 w-[760px] border border-white/10 bg-slate-900/25 shadow-2xl backdrop-blur-sm" />
      <div className="absolute left-[38%] bottom-[210px] text-8xl">{icons[0]}</div>
      <div className="absolute left-[50%] bottom-[225px] text-8xl">{icons[1]}</div>
      <div className="absolute left-[61%] bottom-[210px] text-8xl">{icons[2]}</div>
    </div>
  )
}

function getSceneDetail(blockId: string): { location: string; icons: string[]; cues: string[] } {
  const details: Record<string, { location: string; icons: string[]; cues: string[] }> = {
    morning: {
      location: 'Office Desk',
      icons: ['🖥️', '☕', '📝'],
      cues: ['通知を確認', '優先度を決める', '朝会へ向かう'],
    },
    lunch: {
      location: 'Cafeteria',
      icons: ['🍱', '🪴', '☕'],
      cues: ['同僚と雑談', 'キャリア相談', '午後へ備える'],
    },
    meeting: {
      location: 'Conference Room',
      icons: ['📋', '📊', '🧑‍💻'],
      cues: ['要件を聞く', '設計案を比べる', '合意形成する'],
    },
    afternoon: {
      location: 'Late Desk Work',
      icons: ['💬', '⚠️', '🌇'],
      cues: ['会議を共有', '障害に対応', '一日を締める'],
    },
  }

  return details[blockId] ?? {
    location: 'Work Scene',
    icons: ['⏰', '📌', '💬'],
    cues: ['状況を読む', '判断する', '次へ進む'],
  }
}
