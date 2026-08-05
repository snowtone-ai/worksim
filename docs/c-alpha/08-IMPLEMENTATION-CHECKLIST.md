# WorkSim Cα Implementation Checklist

## Docs

- [x] docs/c-alpha core specs created
- [x] AGENTS.md updated with Cα rules
- [x] docs/state.md updated with Cα progress
- [x] docs/decisions.md updated with Cα decisions

## Scenario System

- [x] schema v2 documented
- [x] loader supports additive v2 fields
- [x] v1 compatibility test preserved

## Scenario Catalog

- [x] 50-role catalog generated
- [x] /play uses catalog grouping and status-aware actions

## Scenarios

- [x] 50 roles cataloged; normal mode removed
- [x] 10 representative immersive scenarios available
- [x] existing web-engineer scenario enriched without breaking behavior

## UI

- [x] task-pre screen uses background metadata
- [x] decision feedback shown after selection
- [x] result screen shows strengths/caution/recommendations

## Analytics

- [x] analytics event types added
- [x] non-blocking event helper added
- [x] API validation route added

## Verification

- [x] pnpm lint
- [x] pnpm typecheck
- [x] pnpm build
- [x] pnpm test
- [x] pnpm verify
- [x] e2e/browser checks

## Deferred Cβ/Bタイプ Items

- [ ] university aggregate dashboard
- [ ] company accounts and scenario editor
- [ ] company-safe aggregate exports with thresholds
- [ ] scenario research validation beyond AI draft placeholders

## Continuation Instructions

- Cβ/Bタイプ 向けの実地リサーチ、大学向け aggregate dashboard、企業向け export/threshold 設計は未着手。
- generated scenario の `to_be_researched:*` source placeholder は、Cβ で各ロールごとに実在調査へ置換する。
- analytics route は validation-only。保存先を追加する場合は `src/app/api/analytics/events/route.ts` と Supabase migration をセットで拡張する。
