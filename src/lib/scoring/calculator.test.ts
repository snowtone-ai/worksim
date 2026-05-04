import { describe, expect, it } from 'vitest'
import { calculateResult, decodeAnswers, encodeAnswers } from '@/lib/scoring/calculator'
import type { Scenario } from '@/lib/scenario/loader'

describe('calculator', () => {
  it('encodes and decodes answers safely', () => {
    const answers = { standup: 'b', 'bug-email': 'c' }
    const encoded = encodeAnswers(answers)
    expect(decodeAnswers(encoded)).toEqual(answers)
    expect(decodeAnswers('not-json')).toEqual({})
  })

  it('calculates dimension percentages and aptitude deterministically', () => {
    const scenario: Scenario = {
      id: 'test/sample',
      version: '1.0.0',
      meta: {
        title: 'Test',
        industry: 'IT',
        role: 'Web',
        duration_minutes: 5,
        description: 'test scenario',
        sources: ['test'],
      },
      dimensions: [
        { key: 'technical', label: '技術力', description: '技術' },
        { key: 'logical', label: '論理的思考', description: '論理' },
        { key: 'communication', label: '発信力', description: '発信' },
      ],
      scenes: [
        {
          id: 's1',
          type: 'meeting',
          title: 'S1',
          context: 'c',
          content: 'c',
          choices: [
            { id: 'a', label: 'A', scores: { technical: 3, logical: 1, communication: 0 } },
            { id: 'b', label: 'B', scores: { technical: 0, logical: 3, communication: 2 } },
          ],
        },
        {
          id: 's2',
          type: 'review',
          title: 'S2',
          context: 'c',
          content: 'c',
          choices: [
            { id: 'a', label: 'A', scores: { technical: 2, logical: 2, communication: 1 } },
            { id: 'b', label: 'B', scores: { technical: 0, logical: 3, communication: 3 } },
          ],
        },
      ],
    }
    const answers = { s1: 'a', s2: 'a' }
    const result = calculateResult(scenario, answers)

    expect(result.dimensions).toHaveLength(scenario.dimensions.length)
    expect(result.topDimension.key).toBe('technical')
    expect(result.aptitudeLabel).toBe('テックリード型')
    expect(result.topDimension.percentage).toBe(100)
    for (const dim of result.dimensions) {
      expect(dim.percentage).toBeGreaterThanOrEqual(0)
      expect(dim.percentage).toBeLessThanOrEqual(100)
    }
  })
})
