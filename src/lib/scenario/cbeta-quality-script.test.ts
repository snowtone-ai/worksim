import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

const SCRIPT = join(process.cwd(), 'scripts/c-beta/check-cbeta-scenario-quality.mjs')

describe('Cβ scenario quality script', () => {
  it('passes canonical Cβ scenarios', () => {
    const result = spawnSync(process.execPath, [SCRIPT], {
      cwd: process.cwd(),
      encoding: 'utf8',
    })

    expect(result.status).toBe(0)
    expect(result.stdout).toContain('Cβ scenario quality check passed')
  })

  it('detects normal mode residue in target JSON', () => {
    const result = runCheck({ modes: ['normal', 'immersive'] })

    expect(result.status).not.toBe(0)
    expect(result.stderr).toContain('normal mode remains')
  })

  it('detects repeated scene titles and prompts', () => {
    const scenario = baseScenario()
    const scenes = scenario.blocks.flatMap((block) => block.scenes)
    scenes[1]!.title = scenes[0]!.title
    scenes[1]!.decisionPrompt = scenes[0]!.decisionPrompt

    const result = runCheck(scenario)

    expect(result.status).not.toBe(0)
    expect(result.stderr).toContain('scene title repeated')
    expect(result.stderr).toContain('decisionPrompt repeated')
  })

  it('detects missing scene and choice quality fields', () => {
    const scenario = baseScenario()
    const scene = scenario.blocks[0]!.scenes[0]!
    delete (scene as Partial<typeof scene>).openingHook
    delete (scene as Partial<typeof scene>).roleSpecificity
    delete (scene.choices[0] as Partial<(typeof scene.choices)[number]>).meterEffects
    delete (scene.choices[0] as Partial<(typeof scene.choices)[number]>).misconceptionEffect

    const result = runCheck(scenario)

    expect(result.status).not.toBe(0)
    expect(result.stderr).toContain('openingHook missing')
    expect(result.stderr).toContain('roleSpecificity missing')
    expect(result.stderr).toContain('meterEffects missing')
    expect(result.stderr).toContain('misconceptionEffect missing')
  })

  it('detects missing workMaterial', () => {
    const scenario = baseScenario()
    delete (scenario.blocks[0]!.scenes[0]! as Partial<ReturnType<typeof makeScene>>).workMaterial

    const result = runCheck(scenario)

    expect(result.status).not.toBe(0)
    expect(result.stderr).toContain('workMaterial missing')
  })

  it('detects missing structured role kernel', () => {
    const scenario = baseScenario()
    ;(scenario as Record<string, unknown>).roleWorkKernel = 'legacy string kernel'

    const result = runCheck(scenario)

    expect(result.status).not.toBe(0)
    expect(result.stderr).toContain('roleWorkKernel must be structured object')
  })

  it('detects insufficient roleSpecificity materials and metrics', () => {
    const scenario = baseScenario()
    const roleSpecificity = scenario.blocks[0]!.scenes[0]!.roleSpecificity
    roleSpecificity.roleSpecificMaterials = ['material a']
    roleSpecificity.roleSpecificMetrics = []

    const result = runCheck(scenario)

    expect(result.status).not.toBe(0)
    expect(result.stderr).toContain('roleSpecificMaterials must include at least 2 items')
    expect(result.stderr).toContain('roleSpecificMetrics must include at least 1 item')
  })

  it('detects missing kernelConnection', () => {
    const scenario = baseScenario()
    delete (scenario.blocks[0]!.scenes[0]!.roleSpecificity as Partial<ReturnType<typeof makeScene>['roleSpecificity']>).kernelConnection

    const result = runCheck(scenario)

    expect(result.status).not.toBe(0)
    expect(result.stderr).toContain('kernelConnection missing')
  })

  it('requires exactly five immersive scenes', () => {
    const scenario = baseScenario()
    scenario.blocks[3]!.scenes.push(makeScene(5))

    const result = runCheck(scenario)

    expect(result.status).not.toBe(0)
    expect(result.stderr).toContain('exactly 5 immersive scenes')
  })
})

function runCheck(scenarioOverride: Partial<ReturnType<typeof baseScenario>>) {
  const dir = mkdtempSync(join(tmpdir(), 'worksim-cbeta-'))
  const file = join(dir, 'scenario.json')
  const scenario = { ...baseScenario(), ...scenarioOverride }
  writeFileSync(file, `${JSON.stringify(scenario, null, 2)}\n`, 'utf8')

  try {
    return spawnSync(process.execPath, [SCRIPT, file], {
      cwd: process.cwd(),
      encoding: 'utf8',
    })
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

function baseScenario() {
  const scenes = Array.from({ length: 5 }, (_, index) => makeScene(index))

  return {
    id: 'test/scenario',
    modes: ['immersive'],
    roleCoreFriction: 'role friction',
    roleMisconception: 'misconception',
    roleRealityReveal: 'reality reveal',
    roleWorkKernel: {
      input: 'role-specific input',
      output: 'role-specific output',
      transformation: 'inputをoutputに変換する',
      constraints: ['constraint a', 'constraint b'],
      workArtifacts: ['material a', 'material b'],
      metrics: ['metric a', 'metric b'],
      failureModes: ['failure a', 'failure b'],
      evaluationCriteria: ['criteria a', 'criteria b'],
      nonGenericReason: 'specific artifacts and metrics make this scenario role-specific',
    },
    resultFeedback: {
      roleRealityReveal: 'reality',
      misconceptionCorrection: 'correction',
      careerReflectionPrompt: 'prompt',
      universityInsightTags: ['tag'],
    },
    resultTypes: [
      { id: 'a', title: 'A' },
      { id: 'b', title: 'B' },
      { id: 'c', title: 'C' },
    ],
    blocks: [
      { id: 'morning', scenes: scenes.slice(0, 2) },
      { id: 'lunch', scenes: scenes.slice(2, 3) },
      { id: 'meeting', scenes: scenes.slice(3, 4) },
      { id: 'afternoon', scenes: scenes.slice(4, 5) },
    ],
  }
}

function makeScene(index: number) {
  return {
    id: `s${index + 1}`,
    title: `Scene ${index + 1}`,
    openingHook: `09:0${index} hook`,
    workMaterial: 'material',
    roleSpecificity: {
      coreDecisionPrimitive: `primitive ${index + 1}`,
      roleSpecificMaterials: ['material a', 'material b'],
      roleSpecificMetrics: ['metric'],
      roleSpecificFailureRisk: 'failure risk',
      roleSpecificEvaluationCriteria: 'criteria',
      genericCoordinationRisk: 'generic risk',
      antiGenericDesignNote: 'design note',
      kernelConnection: 'connects to roleWorkKernel',
    },
    stakeholderPressure: 'stakeholder pressure',
    timePressure: 'time pressure',
    decisionTradeoff: 'decision tradeoff',
    roleCoreFriction: 'role friction',
    hiddenWorkReality: 'hidden reality',
    decisionPrompt: `prompt ${index + 1}`,
    choices: [
      {
        id: 'a',
        label: 'A',
        immediateFeedback: 'immediate',
        delayedConsequence: 'delayed',
        nextSceneEffect: 'next',
        resultSummaryEffect: 'result',
        misconceptionEffect: 'misconception',
        meterEffects: { trust: 1, risk: -1 },
        studentFeedback: { good: 'good', risk: 'risk', next: 'next' },
        universityInsightTags: ['tag'],
      },
      {
        id: 'b',
        label: 'B',
        immediateFeedback: 'immediate',
        delayedConsequence: 'delayed',
        nextSceneEffect: 'next',
        resultSummaryEffect: 'result',
        misconceptionEffect: 'misconception',
        meterEffects: { trust: -1, risk: 1 },
        studentFeedback: { good: 'good', risk: 'risk', next: 'next' },
        universityInsightTags: ['tag'],
      },
    ],
  }
}
