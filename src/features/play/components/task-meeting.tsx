import type { Scene } from '@/lib/scenario/loader'
import { ChoiceList } from './choice-list'

type Props = {
  scene: Scene
  onAnswer: (choiceId: string) => void
  answered: string | null
}

export function TaskMeeting({ scene, onAnswer, answered }: Props) {
  const lines = scene.content.split('\n')

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-4 flex flex-col gap-3">
        {lines.map((line, i) => {
          if (line === '') return <div key={i} className="h-1" />
          const isDialogue = line.includes('：') || line.includes(':')
          const isSpeaker = isDialogue && !line.startsWith('（')
          return (
            <p
              key={i}
              className={`text-sm ${
                line.startsWith('（')
                  ? 'text-indigo-600 font-medium'
                  : isSpeaker
                  ? 'text-gray-800'
                  : 'text-gray-600'
              }`}
            >
              {line}
            </p>
          )
        })}
      </div>

      <ChoiceList
        choices={scene.choices}
        answered={answered}
        onAnswer={onAnswer}
        prompt={scene.decisionPrompt ?? 'あなたはどう答えますか？'}
      />
    </div>
  )
}
