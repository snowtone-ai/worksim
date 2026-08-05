'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Scenario, Scene } from '@/lib/scenario/loader'
import { encodeAnswers } from '@/lib/scoring/calculator'
import { trackScenarioEvent } from '@/lib/analytics/events'
import { TaskEmail } from './task-email'
import { TaskMeeting } from './task-meeting'
import { TaskReview } from './task-review'
import { TaskDebug } from './task-debug'
import { GlossaryPanel } from './glossary-panel'
import { SceneFeedback } from './scene-feedback'
import { ScenarioIntro } from './scenario-intro'

type Props = {
  scenario: Scenario
  industry: string
  role: string
}

export function SceneManager({ scenario, industry, role }: Props) {
  const router = useRouter()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [answered, setAnswered] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [started, setStarted] = useState(scenario.id === 'it/web-engineer')

  const currentScene = scenario.scenes[sceneIndex]
  const totalScenes = scenario.scenes.length
  const progress = Math.round((sceneIndex / totalScenes) * 100)
  const currentSceneId = currentScene?.id ?? ''

  function handleAnswer(choiceId: string) {
    setAnswered(choiceId)
    setAnswers((prev) => ({ ...prev, [currentSceneId]: choiceId }))
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

  function handleNext() {
    setIsTransitioning(true)
    setTimeout(() => {
      const nextIndex = sceneIndex + 1
      const finalAnswers = answered ? { ...answers, [currentSceneId]: answered } : { ...answers }
      if (nextIndex >= totalScenes) {
        trackScenarioEvent({
          eventName: 'scenario_complete',
          scenarioId: scenario.id,
          industrySlug: industry,
          roleSlug: role,
          sceneId: currentSceneId,
          choiceId: answered ?? undefined,
          mode: 'immersive',
        })
        const encoded = encodeAnswers(finalAnswers)
        router.push(`/play/${industry}/${role}/result?a=${encoded}`)
      } else {
        setSceneIndex(nextIndex)
        setAnswered(null)
        setIsTransitioning(false)
      }
    }, 200)
  }

  const selectedChoice = currentScene?.choices.find((choice) => choice.id === answered)

  useEffect(() => {
    if (!started || !currentSceneId) return
    trackScenarioEvent({
      eventName: sceneIndex === 0 ? 'scenario_start' : 'scene_view',
      scenarioId: scenario.id,
      industrySlug: industry,
      roleSlug: role,
      sceneId: currentSceneId,
      mode: 'immersive',
    })
  }, [currentSceneId, industry, role, scenario.id, sceneIndex, started])

  useEffect(() => {
    if (!started || !selectedChoice || !currentSceneId) return
    trackScenarioEvent({
      eventName: 'feedback_view',
      scenarioId: scenario.id,
      industrySlug: industry,
      roleSlug: role,
      sceneId: currentSceneId,
      choiceId: selectedChoice.id,
      mode: 'immersive',
    })
  }, [currentSceneId, industry, role, scenario.id, selectedChoice, started])

  if (!started) {
    return <ScenarioIntro scenario={scenario} onStart={() => setStarted(true)} />
  }

  if (!currentScene) return null

  return (
    <div className={`flex flex-col gap-6 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{sceneIndex + 1} / {totalScenes}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-200">
          <div
            className="h-1.5 rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${((sceneIndex + (answered ? 1 : 0)) / totalScenes) * 100}%` }}
          />
        </div>
      </div>

      {/* Scene header */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">
          {sceneTypeLabel(currentScene)}
        </span>
        <h2 className="text-lg font-semibold text-gray-900">{currentScene.title}</h2>
        <p className="text-sm text-gray-500">{currentScene.context}</p>
      </div>

      {/* Task content */}
      <SceneContent scene={currentScene} answered={answered} onAnswer={handleAnswer} />

      {/* Glossary */}
      {scenario.glossary && scenario.glossary.length > 0 && (
        <GlossaryPanel glossary={scenario.glossary} />
      )}

      {selectedChoice && <SceneFeedback choice={selectedChoice} />}

      {/* Next button */}
      {answered && (
        <button
          onClick={handleNext}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          {sceneIndex + 1 >= totalScenes ? '結果を見る →' : '次へ →'}
        </button>
      )}
    </div>
  )
}

function sceneTypeLabel(scene: Scene): string {
  const labels: Record<string, string> = {
    email: 'メール対応',
    meeting: '会議',
    memo: 'メモ確認',
    debug: '問題調査',
    review: '資料確認',
  }
  return labels[scene.type] ?? scene.type
}

function SceneContent({ scene, answered, onAnswer }: {
  scene: Scene
  answered: string | null
  onAnswer: (id: string) => void
}) {
  switch (scene.type) {
    case 'email':
      return <TaskEmail scene={scene} answered={answered} onAnswer={onAnswer} />
    case 'meeting':
      return <TaskMeeting scene={scene} answered={answered} onAnswer={onAnswer} />
    case 'review':
      return <TaskReview scene={scene} answered={answered} onAnswer={onAnswer} />
    case 'debug':
      return <TaskDebug scene={scene} answered={answered} onAnswer={onAnswer} />
    default:
      return <TaskMeeting scene={scene} answered={answered} onAnswer={onAnswer} />
  }
}
