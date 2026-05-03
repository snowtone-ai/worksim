import type { Scene } from '@/lib/scenario/loader'
import { ChoiceList } from './choice-list'

type Props = {
  scene: Scene
  onAnswer: (choiceId: string) => void
  answered: string | null
}

export function TaskReview({ scene, onAnswer, answered }: Props) {
  const lines = scene.content.split('\n')

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500">Pull Request</span>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Open</span>
        </div>
        <div className="px-4 py-4 flex flex-col gap-2">
          {lines.map((line, i) => {
            if (line === '') return <div key={i} className="h-1" />
            const isBullet = line.startsWith('・')
            const isComment = line.startsWith('「') || line.startsWith('"')
            return (
              <p
                key={i}
                className={`text-sm ${
                  isBullet
                    ? 'text-gray-600 pl-2 border-l-2 border-gray-200'
                    : isComment
                    ? 'text-gray-500 italic'
                    : 'text-gray-800 font-medium'
                }`}
              >
                {line}
              </p>
            )
          })}
        </div>
      </div>

      <ChoiceList
        choices={scene.choices}
        answered={answered}
        onAnswer={onAnswer}
        prompt="どうレビューしますか？"
      />
    </div>
  )
}
