import type { Scene, Choice } from '@/lib/scenario/loader'

type Props = {
  scene: Scene
  onAnswer: (choiceId: string) => void
  answered: string | null
}

export function TaskEmail({ scene, onAnswer, answered }: Props) {
  const lines = scene.content.split('\n')
  const headerLines: string[] = []
  const bodyLines: string[] = []
  let inBody = false
  for (const line of lines) {
    if (!inBody && (line.startsWith('From:') || line.startsWith('To:') || line.startsWith('Subject:'))) {
      headerLines.push(line)
    } else {
      inBody = true
      bodyLines.push(line)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 rounded-t-lg">
          {headerLines.map((line, i) => (
            <p key={i} className="text-xs text-gray-500 font-mono">{line}</p>
          ))}
        </div>
        <div className="px-4 py-4">
          {bodyLines.map((line, i) => (
            <p key={i} className={`text-sm text-gray-700 ${line === '' ? 'mt-3' : ''}`}>
              {line || ' '}
            </p>
          ))}
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
