'use client'

import { useState, useRef, useEffect, useId, useMemo } from 'react'
import { searchUniversities, type University } from '@/data/universities'

type Props = {
  onSelect: (university: University | null) => void
  initialValue?: string
}

const TYPE_BADGE: Record<string, string> = {
  '国立': 'bg-blue-100 text-blue-700',
  '公立': 'bg-green-100 text-green-700',
  '私立': 'bg-orange-100 text-orange-700',
}

export function UniversityCombobox({ onSelect, initialValue = '' }: Props) {
  const [query, setQuery] = useState(initialValue)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const listId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => searchUniversities(query), [query])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value)
    setActiveIndex(-1)
    setIsOpen(value.trim().length > 0)
  }

  function handleSelect(university: University) {
    setQuery(university.name)
    setIsOpen(false)
    setActiveIndex(-1)
    onSelect(university)
  }

  function handleClear() {
    setQuery('')
    setIsOpen(false)
    setActiveIndex(-1)
    onSelect(null)
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      const selected = results[activeIndex]
      if (selected) handleSelect(selected)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const showDropdown = isOpen && results.length > 0
  const showEmpty = isOpen && results.length === 0 && query.trim().length > 0

  return (
    <div ref={containerRef} className="relative">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
          onKeyDown={handleKeyDown}
          placeholder="大学名を入力して検索（例：早稲田、東京）"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-8 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          aria-autocomplete="list"
          aria-controls={showDropdown ? listId : undefined}
          aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="クリア"
          >
            ✕
          </button>
        )}
      </div>

      {showDropdown && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          {results.map((univ, i) => (
            <li
              key={univ.name}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={() => handleSelect(univ)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer ${
                i === activeIndex ? 'bg-indigo-50' : 'hover:bg-gray-50'
              }`}
            >
              <span className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${TYPE_BADGE[univ.type] ?? ''}`}>
                {univ.type}
              </span>
              <span>{univ.name}</span>
            </li>
          ))}
        </ul>
      )}

      {showEmpty && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-lg">
          見つかりませんでした
        </div>
      )}
    </div>
  )
}
