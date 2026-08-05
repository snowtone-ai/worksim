# Cβ Scenario Production Checklist

## One-Scenario Checklist

- [ ] Read role from `scenarios/_catalog.c-alpha.json`.
- [ ] Fill Role Differentiation Sheet.
- [ ] Define structured `roleWorkKernel`.
- [ ] Define exactly 5 scene skeletons.
- [ ] For each scene, define `workMaterial` before dialogue.
- [ ] Define `coreDecisionPrimitive`.
- [ ] Define `roleSpecificMaterials`, `roleSpecificMetrics`, failure risk, and evaluation criteria.
- [ ] Define `genericCoordinationRisk`, `antiGenericDesignNote`, and `kernelConnection`.
- [ ] Write choices with `good`, `risk`, `immediate`, `delayed`, `next`, and `result`.
- [ ] Add `meterEffects` and `misconceptionEffect`.
- [ ] Add `resultTypes` and `resultFeedback`.
- [ ] Run `node scripts/c-beta/check-cbeta-scenario-quality.mjs`.
- [ ] Run `node scripts/c-beta/check-cbeta-coverage.mjs`.
- [ ] Run `pnpm lint`.
- [ ] Run `pnpm typecheck`.
- [ ] Run `pnpm build`.
- [ ] Run `pnpm test -- --run`.
- [ ] Run `pnpm verify`.
- [ ] Complete human review.
- [ ] Mark status in `docs/c-beta/18-CBETA-ROLE-WORK-KERNEL-MATRIX.md`.

## Human Review Questions

- Is the scene still meaningful if the role name is replaced?
- Can the player choose without reading the work material?
- Are the materials and metrics specific to this role?
- Does each choice have a realistic benefit and cost?
- Does the result correct a job misconception?

## Batch Rule

Do not proceed to the next batch if current-batch warnings show generic primitives, repeated stakeholder structures, or weak `nonGenericReason`.
