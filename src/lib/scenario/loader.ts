import { z } from 'zod'

export const ChoiceSchema = z.object({
  id: z.string(),
  label: z.string(),
  text: z.string().optional(),
  immediateFeedback: z.string().optional(),
  delayedConsequence: z.string().optional(),
  nextSceneEffect: z.string().optional(),
  resultSummaryEffect: z.string().optional(),
  meterEffects: z.record(z.string(), z.number().int()).optional(),
  misconceptionEffect: z.string().optional(),
  studentFeedback: z.object({
    good: z.string(),
    risk: z.string(),
    next: z.string(),
  }).optional(),
  scores: z.record(z.string(), z.number().int()),
  behaviorTags: z.array(z.string()).optional(),
  universityInsightTags: z.array(z.string()).optional(),
  companyInsightTags: z.array(z.string()).optional(),
  riskTags: z.array(z.string()).optional(),
})

export const SceneRoleSpecificitySchema = z.object({
  coreDecisionPrimitive: z.string(),
  roleSpecificMaterials: z.array(z.string()).min(1),
  roleSpecificMetrics: z.array(z.string()).min(1),
  roleSpecificFailureRisk: z.string(),
  roleSpecificEvaluationCriteria: z.string(),
  genericCoordinationRisk: z.string(),
  antiGenericDesignNote: z.string(),
  kernelConnection: z.string().optional(),
})

export const RoleWorkKernelSchema = z.union([
  z.string(),
  z.object({
    input: z.string(),
    output: z.string(),
    transformation: z.string(),
    constraints: z.array(z.string()).min(1),
    workArtifacts: z.array(z.string()).min(1),
    metrics: z.array(z.string()).min(1),
    failureModes: z.array(z.string()).min(1),
    evaluationCriteria: z.array(z.string()).min(1),
    nonGenericReason: z.string(),
  }),
])

export const SceneSchema = z.object({
  id: z.string(),
  type: z.enum(['email', 'meeting', 'memo', 'debug', 'review']),
  title: z.string(),
  openingHook: z.string().optional(),
  context: z.string(),
  content: z.string(),
  roleSpecificContext: z.string().optional(),
  roleSpecificity: SceneRoleSpecificitySchema.optional(),
  roleCoreFriction: z.string().optional(),
  concreteWorkArtifact: z.string().optional(),
  hiddenWorkReality: z.string().optional(),
  stakeholderPressure: z.string().optional(),
  timePressure: z.string().optional(),
  missingInformation: z.string().optional(),
  decisionTradeoff: z.string().optional(),
  consequenceHook: z.string().optional(),
  nextSceneEcho: z.string().optional(),
  npcDialogue: z.string().optional(),
  workMaterial: z.string().optional(),
  decisionPrompt: z.string().optional(),
  choices: z.array(ChoiceSchema).min(2).max(4),
  analytics: z.object({
    decisionType: z.string(),
    frictionType: z.string(),
    workValueTags: z.array(z.string()),
    careerRealityTags: z.array(z.string()),
    localCareerTags: z.array(z.string()),
  }).optional(),
})

export const ImmersiveSceneSchema = z.object({
  id: z.string(),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  interactable: z.enum([
    'monitor_mail', 'monitor_slack', 'monitor_code', 'monitor_terminal',
    'monitor_calendar', 'monitor_browser',
    'sticky_notes', 'phone', 'coworker_visit',
    'npc_dialogue', 'meeting_speaker',
  ]),
  presenter: z.string().optional(),
  title: z.string(),
  openingHook: z.string().optional(),
  context: z.string(),
  content: z.string(),
  roleSpecificContext: z.string().optional(),
  roleSpecificity: SceneRoleSpecificitySchema.optional(),
  roleCoreFriction: z.string().optional(),
  concreteWorkArtifact: z.string().optional(),
  hiddenWorkReality: z.string().optional(),
  stakeholderPressure: z.string().optional(),
  timePressure: z.string().optional(),
  missingInformation: z.string().optional(),
  decisionTradeoff: z.string().optional(),
  consequenceHook: z.string().optional(),
  nextSceneEcho: z.string().optional(),
  npcDialogue: z.string().optional(),
  workMaterial: z.string().optional(),
  decisionPrompt: z.string().optional(),
  choices: z.array(ChoiceSchema).min(2).max(4),
  analytics: z.object({
    decisionType: z.string(),
    frictionType: z.string(),
    workValueTags: z.array(z.string()),
    careerRealityTags: z.array(z.string()),
    localCareerTags: z.array(z.string()),
  }).optional(),
})

export const PhaseSchema = z.enum(['morning', 'lunch', 'meeting', 'afternoon'])

export const BlockSchema = z.object({
  id: PhaseSchema,
  label: z.string(),
  time_start: z.string().regex(/^\d{2}:\d{2}$/),
  time_end: z.string().regex(/^\d{2}:\d{2}$/),
  location: z.enum(['desk', 'cafeteria', 'conference_room']),
  intro: z.string(),
  scenes: z.array(ImmersiveSceneSchema).min(1).max(5),
})

export const ScenarioSchema = z.object({
  id: z.string(),
  version: z.string(),
  scenarioVersion: z.string().optional(),
  cType: z.string().optional(),
  industry: z.string().optional(),
  industrySlug: z.string().optional(),
  role: z.string().optional(),
  roleSlug: z.string().optional(),
  roleCategory: z.string().optional(),
  roleSpecificity: z.string().optional(),
  roleCoreFriction: z.string().optional(),
  roleMisconception: z.string().optional(),
  roleRealityReveal: z.string().optional(),
  roleWorkKernel: RoleWorkKernelSchema.optional(),
  centralQuestion: z.string().optional(),
  dayTimeline: z.array(z.object({
    time: z.string(),
    label: z.string(),
  })).optional(),
  sceneList: z.array(z.string()).optional(),
  modes: z.array(z.string()).optional(),
  durationMinutes: z.number().int().positive().optional(),
  difficulty: z.string().optional(),
  tags: z.array(z.string()).optional(),
  targetUsers: z.array(z.string()).optional(),
  backgroundImage: z.string().optional(),
  background: z.object({
    imagePath: z.string().optional(),
    imagePrompt: z.string(),
    negativePrompt: z.string(),
    composition: z.string(),
    overlaySafeArea: z.string(),
    mood: z.string(),
    industryVisualTokens: z.array(z.string()),
  }).optional(),
  future3d: z.object({
    environmentType: z.string(),
    spatialAnchors: z.array(z.string()),
    interactableObjects: z.array(z.string()),
    npcPositions: z.array(z.string()).optional(),
    cameraHint: z.string(),
    soundscapeHint: z.string(),
    interactionType: z.string().optional(),
  }).optional(),
  characters: z.array(z.object({
    id: z.string(),
    role: z.string(),
    summary: z.string(),
  })).optional(),
  timeline: z.array(z.object({
    time: z.string(),
    label: z.string(),
  })).optional(),
  roleSpecificMeters: z.array(z.object({
    key: z.string(),
    label: z.string(),
    description: z.string(),
  })).optional(),
  branchSummary: z.object({
    overview: z.string(),
    trackedEffects: z.array(z.string()),
  }).optional(),
  meta: z.object({
    title: z.string(),
    industry: z.string(),
    role: z.string(),
    duration_minutes: z.number().int().positive(),
    description: z.string(),
    sources: z.array(z.string()),
    company_model: z.string().optional(),
  }),
  dimensions: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
      description: z.string(),
    })
  ).min(2).max(6),
  scenes: z.array(SceneSchema).min(1).max(10),
  glossary: z.array(z.object({ term: z.string(), description: z.string() })).optional(),
  blocks: z.array(BlockSchema).length(4).optional(),
  scoringDimensions: z.array(z.string()).optional(),
  resultTypes: z.array(z.object({
    id: z.string(),
    title: z.string(),
    strengths: z.array(z.string()),
    cautionPoints: z.array(z.string()),
    meterPriorities: z.array(z.string()).optional(),
    valuedMeters: z.array(z.string()).optional(),
    sacrificedMeters: z.array(z.string()).optional(),
    roleRealityReveal: z.string().optional(),
    misconceptionCorrection: z.string().optional(),
    decisionPatternSummary: z.string().optional(),
    careerReflectionPrompt: z.string().optional(),
    universityInsightTags: z.array(z.string()).optional(),
  })).optional(),
  resultFeedback: z.object({
    roleRealityReveal: z.string(),
    misconceptionCorrection: z.string(),
    careerReflectionPrompt: z.string(),
    universityInsightTags: z.array(z.string()),
    nextRecommendedScenarios: z.array(z.string()).optional(),
  }).optional(),
  analytics: z.object({
    decisionStyleAxes: z.array(z.string()).optional(),
    derivedMetrics: z.array(z.string()),
    privacy: z.string(),
  }).optional(),
  sources: z.array(z.string()).optional(),
  designLog: z.object({
    roleSelectionRationale: z.string(),
    mainConflict: z.string(),
    sceneRationale: z.string(),
    choiceRationale: z.string(),
    scoringRationale: z.string(),
    knownLimitations: z.string(),
  }).optional(),
})

export const CatalogItemSchema = z.object({
  industry: z.string(),
  industrySlug: z.string(),
  role: z.string(),
  roleSlug: z.string(),
  representative: z.boolean(),
  modes: z.array(z.string()),
  tags: z.array(z.string()),
  durationMinutes: z.number().int().positive(),
  difficulty: z.string(),
  shortDescription: z.string(),
  scenarioPath: z.string().optional(),
  plannedScenarioPath: z.string().optional(),
  status: z.enum(['implemented', 'playable', 'catalog_only', 'deferred']),
  roleCategory: z.string().optional(),
})

export type Scenario = z.infer<typeof ScenarioSchema>
export type Scene = z.infer<typeof SceneSchema>
export type Choice = z.infer<typeof ChoiceSchema>
export type ImmersiveScene = z.infer<typeof ImmersiveSceneSchema>
export type Block = z.infer<typeof BlockSchema>
export type Phase = z.infer<typeof PhaseSchema>
export type CatalogItem = z.infer<typeof CatalogItemSchema>

const ID_PATTERN = /^[a-z0-9-]+\/[a-z0-9-]+$/

export async function loadScenario(id: string): Promise<Scenario> {
  if (!ID_PATTERN.test(id)) {
    throw new Error(`Invalid scenario ID: ${id}`)
  }
  const { readFile } = await import('node:fs/promises')
  const { join } = await import('node:path')
  const filePath = join(process.cwd(), 'scenarios', `${id}.json`)
  const content = await readFile(filePath, 'utf-8')
  return ScenarioSchema.parse(JSON.parse(content))
}

export async function listScenarioIds(): Promise<string[]> {
  const { readdir } = await import('node:fs/promises')
  const { join } = await import('node:path')
  const base = join(process.cwd(), 'scenarios')
  const industries = await readdir(base)
  const ids: string[] = []
  for (const industry of industries) {
    if (industry.startsWith('_')) continue
    const roles = await readdir(join(base, industry))
    for (const role of roles) {
      if (role.endsWith('.json')) {
        ids.push(`${industry}/${role.slice(0, -5)}`)
      }
    }
  }
  return ids
}

export async function loadCatalog(): Promise<CatalogItem[]> {
  const { readFile } = await import('node:fs/promises')
  const { join } = await import('node:path')
  const filePath = join(process.cwd(), 'scenarios', '_catalog.c-alpha.json')
  const content = await readFile(filePath, 'utf-8')
  return z.array(CatalogItemSchema).parse(JSON.parse(content))
}
