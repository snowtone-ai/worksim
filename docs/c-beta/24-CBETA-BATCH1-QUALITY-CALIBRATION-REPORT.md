# Cβ Batch 1 Quality Calibration Report

## Scope

This calibration reviews the quality gate after Batch 0 + Batch 1 reached 7 canonical Cβ scenarios:

- Batch 0: `finance/regional-bank-corporate-loan`, `manufacturing/product-planning`
- Batch 1: `it/web-engineer`, `it/it-solution-sales`, `marketing-media/performance-marketing`, `hr/recruitment-consultant`, `public-infra/disaster-crisis-management`

## Gate Change

`scripts/c-beta/check-cbeta-scenario-quality.mjs` now checks all 7 canonical scenarios by default.

The gate still keeps the existing warning for cross-scenario drift readiness when fewer than 10 canonical scenarios exist. This is useful because 7 scenarios are enough for basic role-specificity checks but still too few for stable production thresholds.

## Calibration Findings

### Useful checks retained

- Hard fail for normal-mode residue.
- Hard fail for missing structured `roleWorkKernel`.
- Hard fail for missing `workMaterial`.
- Hard fail for missing `roleSpecificity.kernelConnection`.
- Hard fail for Cβ scene count not equal to 5.
- Warning for repeated generic decision primitives.
- Warning for materials/metrics not present in scene text.
- Warning for work materials without numeric signals.

### Overfitting avoided

- No exact Japanese phrase requirement was added.
- No external source dependency was added to the script.
- No single narrative pattern is required across roles.
- No hard fail was added for valid stakeholder pressure, as long as work materials and metrics lead the scene.

### Warning interpretation

Current warning:

- `cross-scenario drift check is warning-ready; current canonical set is too small for production thresholds`

Decision: keep as warning. It is not a scenario defect. It reminds future batches not to treat drift statistics as stable until the canonical set is larger.

## Coverage Result

After Batch 1:

- Cβ-ready: 7/50
- Not ready: 43/50

Expected ready roles:

- `it/web-engineer`
- `it/it-solution-sales`
- `finance/regional-bank-corporate-loan`
- `manufacturing/product-planning`
- `marketing-media/performance-marketing`
- `hr/recruitment-consultant`
- `public-infra/disaster-crisis-management`

## Recommendation For Batch 2

Proceed only if Batch 1 remains GREEN under the 7-file default gate. Batch 2 can add stronger cross-scenario drift reporting, but should not convert the current small-sample warning into a hard failure yet.
