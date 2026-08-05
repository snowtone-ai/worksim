'use client'

import type { AnalyticsEventName, ScenarioAnalyticsEvent } from './types'

type EventInput = Omit<ScenarioAnalyticsEvent, 'eventName' | 'occurredAt'> & {
  eventName: AnalyticsEventName
}

export function trackScenarioEvent(input: EventInput): void {
  if (typeof window === 'undefined') return

  const payload: ScenarioAnalyticsEvent = {
    ...input,
    occurredAt: new Date().toISOString(),
  }

  const body = JSON.stringify(payload)

  try {
    if ('sendBeacon' in navigator) {
      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon('/api/analytics/events', blob)
      return
    }
  } catch {
    // Fall through to fetch.
  }

  void fetch('/api/analytics/events', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => undefined)
}
