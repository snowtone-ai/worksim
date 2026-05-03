import { z } from 'zod'

export const ChoiceSchema = z.object({
  id: z.string(),
  label: z.string(),
  scores: z.record(z.string(), z.number().int()),
})

export const SceneSchema = z.object({
  id: z.string(),
  type: z.enum(['email', 'meeting', 'memo', 'debug', 'review']),
  title: z.string(),
  context: z.string(),
  content: z.string(),
  choices: z.array(ChoiceSchema).min(2).max(4),
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
  context: z.string(),
  content: z.string(),
  choices: z.array(ChoiceSchema).min(2).max(4),
})

export const PhaseSchema = z.enum(['morning', 'lunch', 'meeting', 'afternoon'])

export const BlockSchema = z.object({
  id: PhaseSchema,
  label: z.string(),
  time_start: z.string().regex(/^\d{2}:\d{2}$/),
  time_end: z.string().regex(/^\d{2}:\d{2}$/),
  location: z.enum(['desk', 'cafeteria', 'conference_room']),
  intro: z.string(),
  scenes: z.array(ImmersiveSceneSchema).length(5),
})

export const ScenarioSchema = z.object({
  id: z.string(),
  version: z.string(),
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
})

export type Scenario = z.infer<typeof ScenarioSchema>
export type Scene = z.infer<typeof SceneSchema>
export type Choice = z.infer<typeof ChoiceSchema>
export type ImmersiveScene = z.infer<typeof ImmersiveSceneSchema>
export type Block = z.infer<typeof BlockSchema>
export type Phase = z.infer<typeof PhaseSchema>

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
