import type { Scene, Choice } from '@/lib/scenario/loader'

type Props = {
  scene: Scene
  onAnswer: (choiceId: string) => void
  answered: string | null
}

export function TaskDebug({ scene, onAnswer, answered }: Props) {
  const lines = scene.content.split('\n')

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-red-200 bg-gray-900 shadow-sm overflow-hidden">
        <div className="border-b border-red-900/50 bg-red-950/30 px-4 py-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono text-red-400">ALERT</span>
        </div>
        <div className="px-4 py-4 flex flex-col gap-1.5">
          {lines.map((line, i) => {
            if (line === '') return <div key={i} className="h-2" />
            const isError = line.includes('[ERROR]')
            const isWarn = line.includes('[WARN]')
            const isSlack = !line.startsWith('[') && !line.startsWith('🚨') && !line.startsWith('時刻') && !line.startsWith('エラー率') && !line.startsWith('Slack')
            return (
              <p
                key={i}
                className={`text-xs font-mono ${
                  isError
                    ? 'text-red-400'
                    : isWarn
                    ? 'text-yellow-400'
                    : line.startsWith('🚨')
                    ? 'text-red-300 font-bold text-sm font-sans'
                    : isSlack
                    ? 'text-gray-300 font-sans text-sm'
                    : 'text-gray-400'
                }`}
              >
                {line}
              </p>
            )
          })}
        </div>
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
      <p className="text-sm font-medium text-gray-700">あなたはどうする？</p>
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
