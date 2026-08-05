# WorkSim Repo Map for ChatGPT

## 1. Project Summary

WorkSim is a Next.js 16 App Router app for Japanese job-seeking students.
It simulates a day of work as an immersive scenario game, mainly with C-type/Cα/Cβ scenario data.

## 2. How To Read This Repo

Suggested reading order:

1. `AGENTS.md`
2. `docs/state.md`
3. `docs/decisions.md`
4. `vision.md`
5. `README.md`
6. `package.json`
7. `scenarios/_schema.v2.md`
8. `scenarios/_research-plan.md`
9. `docs/c-beta/09-CBETA-NARRATIVE-SCENARIO-OS-v1.md`
10. `docs/c-beta/11-CBETA-SCENARIO-QUALITY-GATE-v2.md`
11. `src/lib/scenario/loader.ts`
12. `scripts/c-beta/check-cbeta-scenario-quality.mjs`

## 3. Top-Level Layout

- `src/` - application code
- `scenarios/` - scenario JSON and schema docs
- `docs/` - product, OS, and operational documentation
- `scripts/` - verification and generation scripts
- `e2e/` - Playwright tests
- `supabase/` - database migrations
- `public/` - static assets
- `.github/` - GitHub workflows
- `.claude/`, `.codex/` - agent/tooling support

## 4. Core App Areas

### `src/app/`

Next.js routes and page composition.

- `src/app/page.tsx` - landing entry
- `src/app/play/page.tsx` - industry selection
- `src/app/play/[industry]/page.tsx` - role selection
- `src/app/play/[industry]/[role]/page.tsx` - immersive redirect / play entry
- `src/app/play/[industry]/[role]/immersive/page.tsx` - immersive experience
- `src/app/play/[industry]/[role]/result/page.tsx` - result screen
- `src/app/profile/page.tsx` - optional profile form
- `src/app/auth/callback/route.ts` - Supabase auth callback
- `src/app/api/analytics/events/route.ts` - analytics ingest route

### `src/features/`

Feature-level UI components.

- `src/features/auth/components/` - login and profile UI
- `src/features/play/components/` - scenario intro, scene manager, feedback, result analytics
- `src/features/play/immersive/` - immersive-mode scene UI and transitions

### `src/lib/`

Domain logic and shared helpers.

- `src/lib/scenario/loader.ts` - Zod schema, scenario loading, catalog loading
- `src/lib/scenario/*.test.ts` - loader and quality-script tests
- `src/lib/scoring/calculator.ts` - result calculation
- `src/lib/analytics/` - typed analytics helpers
- `src/lib/supabase/` - Supabase client/server helpers

## 5. Scenario System

### `scenarios/`

This is the main content layer.

- `scenarios/_schema.v2.md` - additive scenario schema reference
- `scenarios/_template.v2.json` - scenario template
- `scenarios/_catalog.c-alpha.json` - Cα catalog of 50 roles
- `scenarios/_research-plan.md` - how to research and build new scenarios
- `scenarios/finance/` - finance scenarios
- `scenarios/manufacturing/` - manufacturing scenarios
- `scenarios/it/` - IT scenarios
- `scenarios/consulting-bpo/` - consulting/BPO scenarios
- `scenarios/hr/` - HR scenarios
- `scenarios/marketing-media/` - marketing/media scenarios
- `scenarios/public-infra/` - public infrastructure scenarios
- `scenarios/retail-ec/` - retail / e-commerce scenarios
- `scenarios/tourism-transport/` - tourism / transport scenarios
- `scenarios/trading/` - trading scenarios

Important canonical files for Cβ:

- `scenarios/finance/regional-bank-corporate-loan.json`
- `scenarios/manufacturing/product-planning.json`

## 6. Docs System

### `docs/`

- `docs/state.md` - SSOT for current progress
- `docs/decisions.md` - durable architecture decisions
- `docs/issues.md` - failure log and review notes
- `docs/design-notes.md` - durable design notes
- `docs/escape.md` - stop/escape guidance when failures repeat
- `docs/xp-rules.md` - short learning rules

### `docs/c-alpha/`

Cα product and production OS documents.

- `00-GOAL.md` through `08-IMPLEMENTATION-CHECKLIST.md`

### `docs/c-beta/`

Cβ scenario OS, quality gate, revision notes, and review artifacts.

- `09-CBETA-NARRATIVE-SCENARIO-OS-v1.md`
- `10-CBETA-FINANCE-MANUFACTURING-IMMERSIVE-SCRIPTS.md`
- `11-CBETA-SCENARIO-QUALITY-GATE-v2.md`
- `12-CBETA-FINANCE-MANUFACTURING-REVISION-REPORT.md`
- `13-CBETA-ROLE-DIFFERENTIATION-GUARDRAILS.md`
- `14-CBETA-HUMAN-REVIEW-CHECKLIST.md`
- `15-CBETA-SCENARIO-OS-FINALIZATION-REPORT.md`

## 7. Scripts

- `scripts/verify.mjs` - main verification pipeline
- `scripts/sync-claude-md.mjs` - keeps Claude adapter docs in sync
- `scripts/generate-c-alpha.mjs` - generates Cα scenarios/docs
- `scripts/c-alpha/` - Cα generation helpers
- `scripts/c-beta/check-scenario-quality.mjs` - older Cβ/C-type quality check
- `scripts/c-beta/check-c-type-scenario-quality.mjs` - C-type quality gate
- `scripts/c-beta/check-cbeta-scenario-quality.mjs` - Cβ final quality gate

## 8. Tests

- `e2e/` - end-to-end tests for auth, play, result, immersive mode
- `src/lib/scenario/loader.test.ts` - scenario loader tests
- `src/lib/scenario/cbeta-quality-script.test.ts` - Cβ quality script tests
- `src/lib/scoring/calculator.test.ts` - scoring tests

## 9. Infrastructure

- `supabase/migrations/001_create_profiles.sql` - profile table migration
- `next.config.ts` - Next.js config
- `playwright.config.ts` - E2E config
- `tsconfig.json` - strict TypeScript config
- `eslint.config.mjs` - lint rules
- `package.json` - scripts and dependencies

## 10. Current Product Shape

- App Router app on Next.js 16.2.4
- TypeScript strict mode
- Tailwind CSS v4
- Supabase SSR auth with Google OAuth
- Cβ standard scenarios are immersive only and use exactly 5 scenes per scenario
- Canonical work-material key in Cβ is `workMaterial`

## 11. Notes For ChatGPT

- `docs/state.md` is the current SSOT for task status.
- `docs/decisions.md` contains stable architectural choices.
- The scenario schema is additive; loader and tests should be read together.
- Cβ quality rules are now centered on `roleWorkKernel`, `roleSpecificity`, and anti-generic stakeholder coordination checks.

