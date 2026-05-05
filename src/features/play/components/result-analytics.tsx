'use client'

import { useEffect } from 'react'
import { trackScenarioEvent } from '@/lib/analytics/events'

type Props = {
  scenarioId: string
  industrySlug: string
  roleSlug: string
  mode: 'immersive'
}

export function ResultAnalytics({ scenarioId, industrySlug, roleSlug, mode }: Props) {
  useEffect(() => {
    trackScenarioEvent({
      eventName: 'result_view',
      scenarioId,
      industrySlug,
      roleSlug,
      mode,
    })
  }, [industrySlug, mode, roleSlug, scenarioId])

  return null
}
