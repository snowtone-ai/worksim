'use client'

import { useState } from 'react'

type GlossaryEntry = { term: string; description: string }

type Props = { glossary: GlossaryEntry[] }

export function GlossaryPanel({ glossary }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-amber-100 transition-colors"
      >
        <span className="text-xs font-medium text-amber-800">
          📖 用語集 — わからない言葉はここで確認
        </span>
        <span className="text-amber-600 text-xs ml-2">{open ? '▲ 閉じる' : '▼ 開く'}</span>
      </button>
      {open && (
        <div className="border-t border-amber-200 px-4 py-3 flex flex-col gap-3">
          {glossary.map((entry) => (
            <div key={entry.term} className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold text-amber-900">{entry.term}</p>
              <p className="text-xs text-amber-700 leading-relaxed">{entry.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
