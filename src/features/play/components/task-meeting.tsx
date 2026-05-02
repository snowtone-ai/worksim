import type { Scene, Choice } from '@/lib/scenario/loader'

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

      <ChoiceList choices={scene.choices} answered={answered} onAnswer={onAnswer} />
    </div>
  )
}

function ChoiceList({ choices, answered, onAnswer }: {
  choices: Choice[]
  answered: string | null
  onAnswer: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-gray-700">あなたはどう答えますか？</p>
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => !answered && onAnswer(choice.id)}
          disabled={!!answered}
          className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
            answered === choice.id
              ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
              : answered
              ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
          }`}
        >
          {choice.label}
        </button>
      ))}
    </div>
  )
}
