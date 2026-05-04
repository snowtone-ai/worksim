import { describe, expect, it } from 'vitest'
import { listScenarioIds, loadScenario, ScenarioSchema } from '@/lib/scenario/loader'

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

  it('rejects invalid scenario id format', async () => {
    await expect(loadScenario('../bad-id')).rejects.toThrow('Invalid scenario ID')
  })

  it('lists scenario ids under scenarios directory', async () => {
    const ids = await listScenarioIds()

    expect(ids).toContain('it/web-engineer')
    expect(ids.every((id) => /^[a-z0-9-]+\/[a-z0-9-]+$/.test(id))).toBe(true)
  })
})
