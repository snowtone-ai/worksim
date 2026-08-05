import { z } from 'zod'

export const AnalyticsEventNameSchema = z.enum([
  'scenario_start',
  'scene_view',
  'choice_select',
  'feedback_view',
  'scenario_complete',
  'result_view',
  'recommendation_click',
  'external_link_click',
  'optional_pre_survey',
  'optional_post_survey',
])

export const ScenarioAnalyticsEventSchema = z.object({
  eventName: AnalyticsEventNameSchema,
  scenarioId: z.string(),
  industrySlug: z.string(),
  roleSlug: z.string(),
  sceneId: z.string().optional(),
  choiceId: z.string().optional(),
  mode: z.enum(['immersive']).default('immersive'),
  occurredAt: z.string(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export type AnalyticsEventName = z.infer<typeof AnalyticsEventNameSchema>
export type ScenarioAnalyticsEvent = z.infer<typeof ScenarioAnalyticsEventSchema>
