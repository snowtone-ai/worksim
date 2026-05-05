'use client'

import type { ImmersiveScene } from '@/lib/scenario/loader'
import { getTaskBrief } from '@/lib/scenario/view-model'
import { ChoicePanel } from './choice-panel'

type Props = {
  scene: ImmersiveScene
  modalOpen: boolean
  selectedChoice: string | null
  onObjectClick: () => void
  onChoice: (id: string) => void
  onConfirm: () => void
  nextLabel: string
  isAfternoon: boolean
}

const MONITOR_INTERACTABLES = new Set([
  'monitor_mail', 'monitor_slack', 'monitor_code',
  'monitor_terminal', 'monitor_calendar', 'monitor_browser',
])

const MODAL_THEME: Record<string, { bg: string; icon: string; appName: string }> = {
  monitor_mail:     { bg: 'bg-blue-600',    icon: '✉️',  appName: 'Mail' },
  monitor_slack:    { bg: 'bg-purple-600',  icon: '💬',  appName: 'Slack' },
  monitor_code:     { bg: 'bg-emerald-700', icon: '⌨️',  appName: '作業資料' },
  monitor_terminal: { bg: 'bg-gray-900',    icon: '⚫',  appName: '確認ログ' },
  monitor_calendar: { bg: 'bg-orange-500',  icon: '📅',  appName: 'Calendar' },
  monitor_browser:  { bg: 'bg-cyan-600',    icon: '🌐',  appName: '情報確認' },
  sticky_notes:     { bg: 'bg-amber-600',   icon: '📝',  appName: '付箋' },
  phone:            { bg: 'bg-rose-600',    icon: '📞',  appName: '内線電話' },
  coworker_visit:   { bg: 'bg-indigo-600',  icon: '🧑‍💼', appName: '対面会話' },
  npc_dialogue:     { bg: 'bg-indigo-600',  icon: '🧑‍💼', appName: '対面会話' },
  meeting_speaker:  { bg: 'bg-indigo-600',  icon: '🧑‍💼', appName: '対面会話' },
}

export function DeskScene({ scene, modalOpen, selectedChoice, onObjectClick, onChoice, onConfirm, nextLabel, isAfternoon }: Props) {
  const isMonitor = MONITOR_INTERACTABLES.has(scene.interactable)
  const isSticky = scene.interactable === 'sticky_notes'
  const isPhone = scene.interactable === 'phone'
  const isCoworker = scene.interactable === 'coworker_visit'
    || scene.interactable === 'npc_dialogue'
    || scene.interactable === 'meeting_speaker'
  const bg = isAfternoon
    ? 'bg-gradient-to-b from-orange-100 via-amber-50 to-amber-100'
    : 'bg-gradient-to-b from-sky-100 via-blue-50 to-amber-50'

  return (
    <div className={`relative w-full h-full ${bg} overflow-hidden`}>
      {/* Window with skyline */}
      <div className="absolute top-6 left-6 w-56 h-36 rounded-lg bg-gradient-to-b from-sky-300 to-sky-100 border-[6px] border-amber-900/40 shadow-inner overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-slate-700/50 flex items-end gap-1 px-2">
          <div className="w-3 h-9 bg-slate-700/70" />
          <div className="w-4 h-12 bg-slate-700/70" />
          <div className="w-3 h-7 bg-slate-700/70" />
          <div className="w-5 h-14 bg-slate-700/70" />
          <div className="w-3 h-10 bg-slate-700/70" />
          <div className={`absolute ${isAfternoon ? 'bottom-2 right-3 w-4 h-4 bg-orange-400' : 'top-3 right-3 w-4 h-4 bg-yellow-300'} rounded-full`} />
        </div>
      </div>

      {/* Plant */}
      <div className="absolute top-4 right-8 text-6xl select-none">🪴</div>

      {/* Sticky notes */}
      <button
        type="button"
        onClick={isSticky ? onObjectClick : undefined}
        disabled={!isSticky || modalOpen}
        className={`absolute top-48 left-12 transition-all ${isSticky && !modalOpen ? 'cursor-pointer hover:scale-110' : 'cursor-default opacity-90'}`}
        aria-label="付箋"
      >
        <div className="relative">
          <div className={`w-36 h-36 bg-yellow-300 shadow-xl rotate-[-4deg] rounded-sm p-3 text-xs text-amber-900 ${isSticky ? 'animate-pulse ring-4 ring-yellow-400' : ''}`}>
            <p className="border-b border-amber-700/30 pb-1 mb-1.5 font-bold">📝 TODO</p>
            <p className="leading-relaxed">□ 依頼内容を確認</p>
            <p className="leading-relaxed">□ 必要な情報を整理</p>
            <p className="leading-relaxed">□ 選択肢を比較</p>
            <p className="leading-relaxed mt-1 text-rose-700">+ 次の対応方針を判断</p>
          </div>
          <div className="absolute -top-1 right-6 w-3 h-3 bg-red-500 rounded-full shadow" />
        </div>
      </button>

      {/* Monitor */}
      <button
        type="button"
        onClick={isMonitor ? onObjectClick : undefined}
        disabled={!isMonitor || modalOpen}
        className={`absolute top-16 left-1/2 -translate-x-1/2 transition-all ${isMonitor && !modalOpen ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'}`}
        aria-label="モニター"
      >
        <div className="relative">
          <div className={`w-[520px] h-[330px] bg-slate-800 rounded-xl border-[6px] border-slate-900 shadow-2xl overflow-hidden ${isMonitor ? 'ring-4 ring-blue-400 ring-opacity-80 animate-pulse' : ''}`}>
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 relative">
              <div className="grid grid-cols-3 gap-3">
                <AppIcon emoji="✉️" label="Mail" active={scene.interactable === 'monitor_mail'} />
                <AppIcon emoji="💬" label="Slack" active={scene.interactable === 'monitor_slack'} />
                <AppIcon emoji="⌨️" label="資料" active={scene.interactable === 'monitor_code'} />
                <AppIcon emoji="⚫" label="記録" active={scene.interactable === 'monitor_terminal'} />
                <AppIcon emoji="📅" label="Calendar" active={scene.interactable === 'monitor_calendar'} />
                <AppIcon emoji="🌐" label="確認" active={scene.interactable === 'monitor_browser'} />
              </div>
              {isMonitor && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 rounded-lg p-3 shadow-xl border-l-4 border-blue-500">
                  <p className="text-xs font-semibold text-gray-900">🔔 {scene.title}</p>
                  <p className="text-xs text-gray-600 mt-1">クリックして開く →</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-32 h-3 bg-slate-700 mx-auto" />
          <div className="w-56 h-2 bg-slate-600 mx-auto rounded-b" />
        </div>
      </button>

      {/* Phone */}
      <button
        type="button"
        onClick={isPhone ? onObjectClick : undefined}
        disabled={!isPhone || modalOpen}
        className={`absolute top-60 right-16 transition-all ${isPhone && !modalOpen ? 'cursor-pointer hover:scale-110' : 'cursor-default opacity-80'}`}
        aria-label="電話"
      >
        <div className="relative flex flex-col items-center">
          <div className={`text-7xl ${isPhone ? 'animate-bounce' : ''}`}>📞</div>
          {isPhone && (
            <>
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-ping" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full" />
              <p className="text-xs font-bold text-red-600 animate-pulse mt-1 bg-white/90 rounded-full px-2 py-0.5">着信中</p>
            </>
          )}
        </div>
      </button>

      {/* Coffee mug */}
      <div className="absolute bottom-40 right-44 text-5xl select-none opacity-90">☕</div>

      {/* Keyboard */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[440px] h-14 bg-slate-300 rounded-lg shadow-md p-2 flex flex-col gap-0.5">
        {[14, 13, 11].map((cols, row) => (
          <div key={row} className="flex gap-0.5 flex-1">
            {Array.from({ length: cols }).map((_, i) => (
              <div key={i} className="flex-1 bg-slate-100 rounded-sm" />
            ))}
          </div>
        ))}
      </div>

      {/* Coworker */}
      {isCoworker && (
        <button
          type="button"
          onClick={!modalOpen ? onObjectClick : undefined}
          disabled={modalOpen}
          className="absolute bottom-20 left-20 cursor-pointer hover:scale-105 transition-transform"
          aria-label="同僚"
        >
          <div className="flex flex-col items-center">
            <div className="text-7xl animate-pulse">🧑‍💼</div>
            <div className="bg-white rounded-lg shadow-lg px-3 py-1.5 mt-1 text-xs font-medium border-2 border-indigo-400 animate-pulse">
              {scene.presenter ?? '同僚'} がやってきた
            </div>
          </div>
        </button>
      )}

      {/* Hint */}
      {!modalOpen && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/75 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 z-10">
          <span className="animate-pulse">💡</span>
          <span>光っているオブジェクトをクリック</span>
        </div>
      )}

      {/* Modal */}
      {modalOpen && <SceneModal scene={scene} selectedChoice={selectedChoice} onChoice={onChoice} onConfirm={onConfirm} nextLabel={nextLabel} />}
    </div>
  )
}

function AppIcon({ emoji, label, active }: { emoji: string; label: string; active: boolean }) {
  return (
    <div className={`relative flex flex-col items-center gap-1 p-3 rounded-lg transition-all ${active ? 'bg-white/20 ring-2 ring-blue-400 scale-110' : ''}`}>
      <span className="text-3xl">{emoji}</span>
      <span className="text-[10px] text-white/80">{label}</span>
      {active && <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-pulse" />}
    </div>
  )
}

function SceneModal({ scene, selectedChoice, onChoice, onConfirm, nextLabel }: {
  scene: ImmersiveScene; selectedChoice: string | null; onChoice: (id: string) => void; onConfirm: () => void; nextLabel: string
}) {
  const theme = MODAL_THEME[scene.interactable] ?? { bg: 'bg-slate-700', icon: '💼', appName: 'Work' }
  const brief = getTaskBrief(scene)
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden">
        <div className={`${theme.bg} text-white px-4 py-3 flex items-center gap-3 flex-none`}>
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
          </div>
          <span className="text-sm font-medium ml-2">{theme.icon} {theme.appName} — {scene.title}</span>
          {scene.presenter && <span className="ml-auto text-xs opacity-80">{scene.presenter}</span>}
        </div>
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex-none">
          <p className="text-xs text-gray-600">{brief.workMaterial}</p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{scene.content}</pre>
        </div>
        <div className="border-t border-gray-200 bg-white flex-none">
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
    </div>
  )
}
