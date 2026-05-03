'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Scenario } from '@/lib/scenario/loader'
import { encodeAnswers } from '@/lib/scoring/calculator'
import { DeskScene } from './desk-scene'
import { DialogueScene } from './dialogue-scene'
import { PhaseTransition } from './phase-transition'

type Props = {
  scenario: Scenario
  industry: string
  role: string
}

export function ImmersiveGame({ scenario, industry, role }: Props) {
  const router = useRouter()
  const [blockIndex, setBlockIndex] = useState(0)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showTransition, setShowTransition] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  const blocks = scenario.blocks
  if (!blocks || blocks.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900 text-white p-8">
        <div className="text-center max-w-md">
          <p className="text-2xl mb-3">🚧 没入モード準備中</p>
          <p className="text-sm text-slate-300">
            このシナリオの没入モードはまだ用意されていません。通常モードをお試しください。
          </p>
        </div>
      </div>
    )
  }

  const currentBlock = blocks[blockIndex]
  if (!currentBlock) return null
  const currentScene = currentBlock.scenes[sceneIndex]
  if (!currentScene) return null

  const isLastSceneInBlock = sceneIndex === currentBlock.scenes.length - 1
  const isLastBlock = blockIndex === blocks.length - 1
  const isAfternoon = currentBlock.id === 'afternoon'
  const totalAnswered = Object.keys(answers).length
  const totalScenes = blocks.reduce((sum, b) => sum + b.scenes.length, 0)
  const nextBlock = blocks[blockIndex + 1]
  const nextLabel = !isLastSceneInBlock
    ? '次へ →'
    : isLastBlock
    ? '結果を見る →'
    : `${nextBlock?.label ?? '次へ'} →`

  function handleBlockJump(i: number) {
    if (i < blockIndex) {
      setBlockIndex(i)
      setSceneIndex(0)
      setModalOpen(false)
      setSelectedChoice(null)
      setShowTransition(false)
    }
  }

  function handleObjectClick() {
    setModalOpen(true)
    setSelectedChoice(null)
  }

  function handleChoice(choiceId: string) {
    setSelectedChoice(choiceId)
  }

  function handleConfirm() {
    if (!selectedChoice || !currentScene) return
    const newAnswers = { ...answers, [currentScene.id]: selectedChoice }
    setAnswers(newAnswers)
    setSelectedChoice(null)
    setModalOpen(false)

    if (isLastSceneInBlock) {
      if (isLastBlock) {
        const encoded = encodeAnswers(newAnswers)
        router.push(`/play/${industry}/${role}/result?a=${encoded}&m=immersive`)
      } else {
        setBlockIndex(blockIndex + 1)
        setSceneIndex(0)
        setShowTransition(true)
      }
    } else {
      setSceneIndex(sceneIndex + 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-100 overflow-hidden flex flex-col">
      <div className="flex-none h-10 bg-slate-900 text-white flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-3">
          <Link href="/play" className="text-xs text-slate-400 hover:text-white transition-colors">← 選択画面</Link>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-medium">{scenario.meta.industry}</span>
          <span className="text-xs text-slate-400 hidden md:inline">/ {scenario.meta.role}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            {blocks.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleBlockJump(i)}
                disabled={i >= blockIndex}
                title={b.label}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i < blockIndex ? 'bg-indigo-400 cursor-pointer hover:bg-indigo-300'
                  : i === blockIndex ? 'bg-white cursor-default'
                  : 'bg-slate-600 cursor-default'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">{totalAnswered}/{totalScenes}</span>
          <span className="text-sm font-mono font-bold tabular-nums">🕐 {currentScene.time}</span>
        </div>
      </div>

      <div className="flex-1 relative">
        {currentBlock.location === 'desk' && (
          <DeskScene
            scene={currentScene}
            modalOpen={modalOpen}
            selectedChoice={selectedChoice}
            onObjectClick={handleObjectClick}
            onChoice={handleChoice}
            onConfirm={handleConfirm}
            nextLabel={nextLabel}
            isAfternoon={isAfternoon}
          />
        )}
        {(currentBlock.location === 'cafeteria' || currentBlock.location === 'conference_room') && (
          <DialogueScene
            scene={currentScene}
            selectedChoice={selectedChoice}
            onChoice={handleChoice}
            onConfirm={handleConfirm}
            nextLabel={nextLabel}
            phase={currentBlock.id}
          />
        )}

        {showTransition && (
          <PhaseTransition
            block={currentBlock}
            onComplete={() => setShowTransition(false)}
            isStart={blockIndex === 0}
          />
        )}
      </div>
    </div>
  )
}
