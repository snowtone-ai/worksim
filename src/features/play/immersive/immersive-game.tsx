'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Block, Scenario } from '@/lib/scenario/loader'
import { trackScenarioEvent } from '@/lib/analytics/events'
import { encodeAnswers } from '@/lib/scoring/calculator'
import { getScenarioDisplay } from '@/lib/scenario/view-model'
import { DeskScene } from './desk-scene'
import { DialogueScene } from './dialogue-scene'
import { PhaseTransition } from './phase-transition'

type Props = {
  scenario: Scenario
  industry: string
  role: string
  initialBlockId?: string
  initialSceneIndex?: string
}

export function ImmersiveGame({ scenario, industry, role, initialBlockId, initialSceneIndex }: Props) {
  const router = useRouter()
  const blocks = scenario.blocks ?? []
  const resolvedBlockIndex = getInitialBlockIndex(blocks, initialBlockId)
  const resolvedSceneIndex = getInitialSceneIndex(blocks, resolvedBlockIndex, initialSceneIndex)

  const [blockIndex, setBlockIndex] = useState(resolvedBlockIndex)
  const [sceneIndex, setSceneIndex] = useState(resolvedSceneIndex)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showTransition, setShowTransition] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  const currentBlock = blocks[blockIndex]
  const currentScene = currentBlock?.scenes[sceneIndex]
  const currentSceneId = currentScene?.id ?? ''
  const scenarioDisplay = getScenarioDisplay(scenario)

  const isLastSceneInBlock = sceneIndex === ((currentBlock?.scenes.length ?? 1) - 1)
  const isLastBlock = blockIndex === blocks.length - 1
  const isAfternoon = currentBlock?.id === 'afternoon'
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
    trackScenarioEvent({
      eventName: 'choice_select',
      scenarioId: scenario.id,
      industrySlug: industry,
      roleSlug: role,
      sceneId: currentSceneId,
      choiceId,
      mode: 'immersive',
    })
  }

  function handleConfirm() {
    if (!selectedChoice || !currentScene) return
    const newAnswers = { ...answers, [currentSceneId]: selectedChoice }
    setAnswers(newAnswers)
    setSelectedChoice(null)
    setModalOpen(false)

    if (isLastSceneInBlock) {
      if (isLastBlock) {
        trackScenarioEvent({
          eventName: 'scenario_complete',
          scenarioId: scenario.id,
          industrySlug: industry,
          roleSlug: role,
          sceneId: currentSceneId,
          choiceId: selectedChoice,
          mode: 'immersive',
        })
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

  useEffect(() => {
    if (showTransition || !currentSceneId) return
    trackScenarioEvent({
      eventName: blockIndex === 0 && sceneIndex === 0 ? 'scenario_start' : 'scene_view',
      scenarioId: scenario.id,
      industrySlug: industry,
      roleSlug: role,
      sceneId: currentSceneId,
      mode: 'immersive',
    })
  }, [blockIndex, currentSceneId, industry, role, scenario.id, sceneIndex, showTransition])

  if (blocks.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900 text-white p-8">
        <div className="text-center max-w-md">
          <p className="text-2xl mb-3">🚧 没入モード準備中</p>
          <p className="text-sm text-slate-300">
            このシナリオの体験はまだ用意されていません。
          </p>
        </div>
      </div>
    )
  }

  if (!currentBlock || !currentScene) return null

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
            blockLabel={currentBlock.label}
          />
        )}

        {showTransition && (
          <PhaseTransition
            block={currentBlock}
            scenarioDisplay={scenarioDisplay}
            onComplete={() => setShowTransition(false)}
          />
        )}
      </div>
    </div>
  )
}

function getInitialBlockIndex(blocks: Block[], initialBlockId?: string): number {
  if (!initialBlockId) return 0
  const index = blocks.findIndex((block) => block.id === initialBlockId)
  return index >= 0 ? index : 0
}

function getInitialSceneIndex(blocks: Block[], blockIndex: number, initialSceneIndex?: string): number {
  const block = blocks[blockIndex]
  if (!block || !initialSceneIndex) return 0

  const parsed = Number.parseInt(initialSceneIndex, 10)
  if (Number.isNaN(parsed)) return 0
  if (parsed < 0) return 0
  if (parsed >= block.scenes.length) return block.scenes.length - 1
  return parsed
}
