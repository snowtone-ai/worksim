import { NextResponse } from 'next/server'
import { ScenarioAnalyticsEventSchema } from '@/lib/analytics/types'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = ScenarioAnalyticsEventSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 })
  }

  return NextResponse.json({ ok: true, accepted: true }, { status: 202 })
}
