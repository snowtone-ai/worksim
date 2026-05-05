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

  it('drops malformed answer payloads without throwing', () => {
    expect(decodeAnswers(encodeURIComponent(JSON.stringify(['a', 'b'])))).toEqual({})
    expect(decodeAnswers(encodeURIComponent(JSON.stringify(null)))).toEqual({})
    expect(decodeAnswers(encodeURIComponent(JSON.stringify({ s1: 1, s2: 'a' })))).toEqual({ s2: 'a' })
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

  it('supports C-alpha dimensions such as problem_solving and ethics', () => {
    const scenario: Scenario = {
      id: 'test/c-alpha',
      version: '2.0.0',
      meta: {
        title: 'Test',
        industry: '金融',
        role: '法人営業',
        duration_minutes: 5,
        description: 'test scenario',
        sources: ['test'],
      },
      dimensions: [
        { key: 'problem_solving', label: '問題解決力', description: '問題解決' },
        { key: 'logical', label: '論理的思考', description: '論理' },
        { key: 'ethics', label: '倫理観', description: '倫理' },
      ],
      scenes: [
        {
          id: 's1',
          type: 'meeting',
          title: 'S1',
          context: 'c',
          content: 'c',
          choices: [
            { id: 'a', label: 'A', scores: { problem_solving: 3, logical: 2, ethics: 1 } },
            { id: 'b', label: 'B', scores: { problem_solving: 1, logical: 3, ethics: 3 } },
          ],
        },
      ],
    }

    const result = calculateResult(scenario, { s1: 'a' })

    expect(result.topDimension.key).toBe('problem_solving')
    expect(result.aptitudeLabel).toBe('問題解決型')
  })

  it('derives role-specific result feedback from meter effects', () => {
    const scenario: Scenario = {
      id: 'test/meter',
      version: '2.0.0',
      meta: {
        title: 'Test',
        industry: '金融',
        role: '法人営業',
        duration_minutes: 5,
        description: 'test scenario',
        sources: ['test'],
      },
      dimensions: [
        { key: 'communication', label: '発信力', description: '発信' },
        { key: 'logical', label: '論理的思考', description: '論理' },
      ],
      roleSpecificMeters: [
        { key: 'customer_trust', label: '顧客信頼', description: '信頼' },
        { key: 'compliance_safety', label: '説明安全性', description: '安全' },
      ],
      resultFeedback: {
        roleRealityReveal: '現実',
        misconceptionCorrection: '誤解修正',
        careerReflectionPrompt: '振り返り',
        universityInsightTags: ['base_tag'],
      },
      resultTypes: [
        {
          id: 'trust',
          title: '地域伴走型',
          meterPriorities: ['customer_trust'],
          strengths: ['信頼'],
          cautionPoints: ['安全'],
        },
      ],
      scenes: [
        {
          id: 's1',
          type: 'meeting',
          title: 'S1',
          context: 'c',
          content: 'c',
          choices: [
            {
              id: 'a',
              label: 'A',
              scores: { communication: 3, logical: 1 },
              meterEffects: { customer_trust: 2, compliance_safety: -1 },
              universityInsightTags: ['choice_tag'],
            },
          ],
        },
      ],
    }

    const result = calculateResult(scenario, { s1: 'a' })

    expect(result.resultType).toBe('地域伴走型')
    expect(result.dominantMeters).toEqual(['customer_trust'])
    expect(result.sacrificedMeters).toEqual(['compliance_safety'])
    expect(result.misconceptionCorrection).toBe('誤解修正')
    expect(result.universityInsightTags).toEqual(['base_tag', 'choice_tag'])
    expect(result.nextRecommendedScenarios).toEqual([])
  })

  it('selects the best matching result type instead of the first partial meter match', () => {
    const scenario: Scenario = {
      id: 'test/overlap-meter',
      version: '2.0.0',
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
      ],
      resultTypes: [
        {
          id: 'first-partial',
          title: '先頭の部分一致型',
          meterPriorities: ['technical_confidence', 'release_safety'],
          valuedMeters: ['technical_confidence', 'release_safety'],
          sacrificedMeters: ['recovery_speed'],
          strengths: ['技術'],
          cautionPoints: ['速度'],
        },
        {
          id: 'best-match',
          title: '実測ベスト一致型',
          meterPriorities: ['recovery_speed', 'technical_confidence'],
          valuedMeters: ['recovery_speed', 'technical_confidence'],
          sacrificedMeters: ['release_safety'],
          strengths: ['速度'],
          cautionPoints: ['安全'],
        },
      ],
      scenes: [
        {
          id: 's1',
          type: 'meeting',
          title: 'S1',
          context: 'c',
          content: 'c',
          choices: [
            {
              id: 'a',
              label: 'A',
              scores: { technical: 3, logical: 1 },
              meterEffects: {
                technical_confidence: 2,
                recovery_speed: 3,
                release_safety: -2,
              },
            },
          ],
        },
      ],
    }

    const result = calculateResult(scenario, { s1: 'a' })

    expect(result.resultType).toBe('実測ベスト一致型')
  })
})
