import { describe, expect, it } from 'vitest'
import { listScenarioIds, loadCatalog, loadScenario, ScenarioSchema } from '@/lib/scenario/loader'
import { getCatalogCard, getScenarioDisplay, getTaskBrief } from '@/lib/scenario/view-model'

describe('scenario loader', () => {
  it('loads existing scenario with schema validation', async () => {
    const scenario = await loadScenario('it/web-engineer')
    const parsed = ScenarioSchema.safeParse(scenario)

    expect(parsed.success).toBe(true)
    expect(scenario.id).toBe('it/web-engineer')
    expect(scenario.scenes.length).toBeGreaterThan(0)
    expect(scenario.dimensions.length).toBeGreaterThanOrEqual(2)
    expect(scenario.blocks).toHaveLength(4)
  })

  it('loads additive v2 scenario with analytics metadata', async () => {
    const scenario = await loadScenario('finance/regional-bank-corporate-loan')

    expect(scenario.scenarioVersion).toBe('2')
    expect(scenario.tags).toContain('営業系')
    expect(scenario.scenes.length).toBeGreaterThanOrEqual(5)
    expect(scenario.scenes[0]?.choices[0]?.studentFeedback?.good).toBeTruthy()
    expect(scenario.blocks).toHaveLength(4)
  })

  it('loads Scenario Quality OS additive metadata when present', async () => {
    const scenario = await loadScenario('finance/regional-bank-corporate-loan')

    expect(scenario.roleSpecificMeters?.length).toBeGreaterThanOrEqual(5)
    expect(scenario.branchSummary?.trackedEffects.length).toBeGreaterThan(0)
    expect(typeof scenario.roleWorkKernel).toBe('object')
    expect(scenario.roleWorkKernel && typeof scenario.roleWorkKernel === 'object' && 'input' in scenario.roleWorkKernel).toBe(true)
    expect(scenario.scenes[0]?.workMaterial).toBeTruthy()
    expect(scenario.scenes[0]?.roleSpecificity?.coreDecisionPrimitive).toBeTruthy()
    expect(scenario.scenes[0]?.roleSpecificity?.kernelConnection).toBeTruthy()
    expect(scenario.scenes[0]?.choices[0]?.delayedConsequence).toBeTruthy()
  })

  it('keeps backward compatibility for legacy string roleWorkKernel', () => {
    const parsed = ScenarioSchema.safeParse({
      id: 'legacy/scenario',
      version: '1.0.0',
      roleWorkKernel: 'legacy kernel string',
      meta: {
        title: 'Legacy',
        industry: 'IT',
        role: 'Legacy role',
        duration_minutes: 10,
        description: 'Legacy scenario',
        sources: ['source'],
      },
      dimensions: [
        { key: 'a', label: 'A', description: 'A' },
        { key: 'b', label: 'B', description: 'B' },
      ],
      scenes: [
        {
          id: 's1',
          type: 'memo',
          title: 'Scene',
          context: 'Context',
          content: 'Content',
          choices: [
            { id: 'a', label: 'A', scores: { a: 1 } },
            { id: 'b', label: 'B', scores: { a: 0 } },
          ],
        },
      ],
    })

    expect(parsed.success).toBe(true)
  })

  it('rejects invalid scenario id format', async () => {
    await expect(loadScenario('../bad-id')).rejects.toThrow('Invalid scenario ID')
  })

  it('lists scenario ids under scenarios directory', async () => {
    const ids = await listScenarioIds()

    expect(ids).toContain('it/web-engineer')
    expect(ids).toContain('finance/regional-bank-corporate-loan')
    expect(ids.every((id) => /^[a-z0-9-]+\/[a-z0-9-]+$/.test(id))).toBe(true)
  })

  it('loads C-alpha catalog with 50 roles', async () => {
    const catalog = await loadCatalog()

    expect(catalog).toHaveLength(50)
    expect(catalog.filter((item) => item.modes.includes('immersive'))).toHaveLength(50)
    expect(catalog.filter((item) => item.modes.includes('normal'))).toHaveLength(0)
  })

  it('builds stable display view models with fallbacks', async () => {
    const scenario = await loadScenario('it/web-engineer')
    const catalog = await loadCatalog()
    const webEngineer = catalog.find((item) => item.industrySlug === 'it' && item.roleSlug === 'web-engineer')
    const firstScene = scenario.blocks?.[0]?.scenes[0]

    expect(webEngineer).toBeTruthy()
    expect(firstScene).toBeTruthy()
    if (!webEngineer || !firstScene) return

    const scenarioDisplay = getScenarioDisplay(scenario)
    const card = getCatalogCard(webEngineer)
    const brief = getTaskBrief(firstScene)

    expect(scenarioDisplay.industryName).toBe('IT・情報通信')
    expect(scenarioDisplay.roleName).toContain('Webエンジニア')
    expect(scenarioDisplay.summary.length).toBeGreaterThan(0)
    expect(card.href).toBe('/play/it/web-engineer/immersive')
    expect(card.isPlayable).toBe(true)
    expect(brief.title).toBe(firstScene.title)
    expect(brief.prompt.length).toBeGreaterThan(0)
  })
})
