'use client'

import type { ImmersiveScene, Phase } from '@/lib/scenario/loader'

type Props = {
  scene: ImmersiveScene
  selectedChoice: string | null
  onChoice: (id: string) => void
  onConfirm: () => void
  nextLabel: string
  phase: Phase
}

export function DialogueScene({ scene, selectedChoice, onChoice, onConfirm, nextLabel, phase }: Props) {
  const isLunch = phase === 'lunch'
  const bg = isLunch
    ? 'bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-100'
    : 'bg-gradient-to-b from-slate-100 via-blue-50 to-indigo-100'

  return (
    <div className={`relative w-full h-full ${bg} overflow-hidden flex flex-col`}>
      {/* Background atmosphere */}
      {isLunch ? (
        <>
          <div className="absolute top-4 right-8 text-6xl opacity-50 select-none">🪴</div>
          <div className="absolute top-10 left-8 text-4xl opacity-40 select-none">🌿</div>
          <div className="absolute top-6 right-28 text-4xl opacity-30 select-none">🪟</div>
        </>
      ) : (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[560px] bg-white rounded-lg shadow-lg border-4 border-slate-300 p-3 z-10">
          <p className="text-xs font-semibold text-slate-700 border-b border-slate-200 pb-1 mb-1.5">
            📋 議題: カテゴリ別おすすめ商品レコメンド設計
          </p>
          <p className="text-sm text-slate-700 font-medium">{scene.title}</p>
        </div>
      )}

      {/* Scene visualization — fixed upper area (~1/3 of screen) */}
      <div className="h-[33%] flex-none relative">
        {isLunch ? <LunchTable presenter={scene.presenter} /> : <MeetingTable presenter={scene.presenter} />}
      </div>

      {/* Dialogue / choices panel — content scrolls, choices footer is fixed */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white/95 backdrop-blur shadow-2xl border-t-4 border-indigo-500">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 pt-4 pb-2">
            {scene.presenter && (
              <p className="text-xs font-bold text-indigo-700 mb-2 flex items-center gap-2">
                <span className="text-base">{isLunch ? '🍱' : '💼'}</span>
                {scene.presenter}
              </p>
            )}
            <div className="bg-gray-50 rounded-lg px-4 py-3 border-l-4 border-indigo-300">
              <p className="text-xs text-gray-500 mb-2">{scene.context}</p>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{scene.content}</pre>
            </div>
          </div>
        </div>

        {/* Choices footer — always visible */}
        <div className="flex-none border-t border-gray-200 bg-white px-6 py-3">
          <div className="max-w-3xl mx-auto flex flex-col gap-2">
            <p className="text-xs font-medium text-gray-600">あなたの返答：</p>
            {scene.choices.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onChoice(c.id)}
                className={`text-left px-4 py-2.5 rounded-lg border text-sm flex items-start gap-2 transition-colors ${
                  selectedChoice === c.id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                <span className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedChoice === c.id ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
                }`}>
                  {selectedChoice === c.id && (
                    <svg className="h-2 w-2 text-white" viewBox="0 0 8 8">
                      <path d="M1 4L3 6L7 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span>{c.label}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={onConfirm}
              disabled={!selectedChoice}
              className={`mt-2 w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors ${!selectedChoice ? 'invisible' : ''}`}
            >
              {nextLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LunchTable({ presenter }: { presenter?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-20">
          <div className="flex flex-col items-center">
            <div className="text-5xl">🧑‍💻</div>
            <p className="text-xs font-medium text-gray-700 bg-white/90 rounded-full px-2 py-0.5 mt-1 shadow">あなた</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl animate-pulse">👨‍💼</div>
            <p className="text-xs font-bold text-amber-900 bg-yellow-200 rounded-full px-2 py-0.5 mt-1 shadow">
              {presenter ?? '同僚'}
            </p>
          </div>
        </div>
        <div className="w-72 h-20 bg-amber-700 rounded-xl shadow-xl flex items-center justify-around px-8">
          <span className="text-3xl">🍱</span>
          <span className="text-3xl">🍔</span>
          <span className="text-3xl">☕</span>
        </div>
      </div>
    </div>
  )
}

function MeetingTable({ presenter }: { presenter?: string }) {
  const isYou = presenter === 'あなたの番'
  return (
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
      <div className="relative w-[320px] h-16 bg-slate-400 rounded-full shadow-xl flex items-center justify-center">
        <span className="text-2xl text-white/40">📊</span>
      </div>
      <div className="absolute -top-10 left-4">
        <Participant emoji="🧑‍💼" name="PM 田中" highlight={presenter === 'PM 田中'} />
      </div>
      <div className="absolute -top-10 right-4">
        <Participant emoji="🎨" name="デザイナー 佐藤" highlight={presenter === 'デザイナー 佐藤'} />
      </div>
      <div className="absolute -bottom-12 left-4">
        <Participant emoji="👨‍💻" name="鈴木" highlight={presenter === '鈴木'} />
      </div>
      <div className="absolute -bottom-12 right-4">
        <Participant emoji="🧑‍💻" name="あなた" highlight={isYou} />
      </div>
    </div>
  )
}

function Participant({ emoji, name, highlight }: { emoji: string; name: string; highlight: boolean }) {
  return (
    <div className={`flex flex-col items-center transition-all ${highlight ? 'scale-125' : 'opacity-60'}`}>
      <div className={`text-4xl ${highlight ? 'animate-pulse' : ''}`}>{emoji}</div>
      <p className={`text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 shadow whitespace-nowrap ${
        highlight ? 'bg-yellow-300 text-amber-900 font-bold' : 'bg-white/80 text-gray-600'
      }`}>{name}</p>
    </div>
  )
}
