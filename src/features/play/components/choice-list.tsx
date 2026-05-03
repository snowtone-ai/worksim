import type { Choice } from '@/lib/scenario/loader'

type Props = {
  choices: Choice[]
  answered: string | null
  onAnswer: (id: string) => void
  prompt?: string
}

export function ChoiceList({ choices, answered, onAnswer, prompt = 'あなたはどうする？' }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-gray-700">{prompt}</p>
      {choices.map((choice) => (
        <button
          key={choice.id}
          type="button"
          onClick={() => !answered && onAnswer(choice.id)}
          disabled={!!answered}
          className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors flex items-start gap-3 ${
            answered === choice.id
              ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
              : answered
              ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
          }`}
        >
          <span
            className={`mt-0.5 flex-shrink-0 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
              answered === choice.id
                ? 'border-indigo-500 bg-indigo-500'
                : 'border-gray-300 bg-white'
            }`}
          >
            {answered === choice.id && (
              <svg className="h-2 w-2 text-white" viewBox="0 0 8 8" fill="none">
                <path
                  d="M1 4L3 6L7 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span className="flex-1">{choice.label}</span>
        </button>
      ))}
    </div>
  )
}
