# Cβ 50-Scenario Implementation Plan

## 1. Goal

Cαの50ロールカタログを土台に、Cβでは50本のimmersive-only職種シミュレーションを段階的に完成させる。

## 2. Why Not Blind Generation

50本を一括生成すると、どの職種も「顧客・上司・他部署・締切の調整」へ収束しやすい。Cβではステークホルダー圧力を使ってよいが、主役は職種固有の仕事材料、数字、成果物、判断単位、失敗リスク、評価基準でなければならない。

## 3. Required Sequence

1. Cα completion / stabilization
2. Cβ production
3. Cβ review
4. PoC preparation

## 4. Production Pipeline

1. Catalogから対象roleを選ぶ。
2. Role Differentiation Sheetを埋める。
3. 構造化 `roleWorkKernel` を作る。
4. Exactly 5 scenes / 5 tasks の連続業務日を設計する。
5. 各sceneで会話より先に `workMaterial` を決める。
6. 各sceneで `roleSpecificity` と `kernelConnection` を書く。
7. choiceに `good` / `risk` / `immediate` / `delayed` / `next` / `result` / `meterEffects` / `misconceptionEffect` を入れる。
8. Cβ quality script、unit tests、human reviewを通す。
9. Matrixを更新する。

## 5. Definition of Ready

- Catalog上のroleが確定している。
- Cα導線が安定している。
- 主要な一次情報源候補が3つ以上ある。
- Role Differentiation Sheetの草案がある。
- 汎用調整に寄る危険が明文化されている。

## 6. Definition of Done

- Scenarioはimmersive-only。
- Scenarioはexactly 5 scenes / 5 tasks。
- `roleWorkKernel` は構造化object。
- 全sceneに `workMaterial` と `roleSpecificity.kernelConnection` がある。
- Cβ quality scriptがGREEN。
- Human reviewで職種名置換テストを通る。
- Regression checksがGREEN。

## 7. Batch Strategy

- Batch 0: canonical 2 scenarios already implemented.
- Batch 1: 5 high-demand / high-differentiation roles.
- Batch 2: 10 additional roles.
- Batch 3: 15 additional roles.
- Batch 4: remaining roles.

Batch 1以降のrole名は `scenarios/_catalog.c-alpha.json` から選ぶ。カタログ外のroleを先に作らない。

## 8. Quality Gate Strategy

- Hard fail: schema, immersive-only, no normal mode, exactly 5 scenes, structured kernel, workMaterial, roleSpecificity, choice feedback.
- Warning: generic primitive, repeated primitive, material/metric linkage, generic choice pattern, weak `nonGenericReason`.
- Warningが増えたbatchは次batchへ進めない。

## 9. Human Review Strategy

- 1本ごとに職種名置換テストを行う。
- 仕事材料を外して選べるsceneは差し戻す。
- ステークホルダー圧力が主役になっているsceneは差し戻す。
- 学生に返す結果が点数だけなら差し戻す。

## 10. Regression Testing Strategy

- `node scripts/c-beta/check-cbeta-scenario-quality.mjs`
- `node scripts/c-beta/check-c-type-scenario-quality.mjs`
- `node scripts/c-beta/check-cbeta-coverage.mjs`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm test -- --run`
- `pnpm verify`

## 11. Stop Conditions

- Cα navigation or existing immersive flows break.
- Generic stakeholder coordination warnings increase across a batch.
- A scenario cannot explain why another role name cannot replace it.
- Quality gate failure remains after 3 attempts.
- Human review cannot validate materials, metrics, or failure risks.

## 12. Recommended Batch Order

- Batch 0: `finance/regional-bank-corporate-loan`, `manufacturing/product-planning`.
- Batch 1: choose 5 roles from implemented/playable or representative catalog rows with strong differentiation.
- Batch 2: choose 10 roles from remaining catalog rows after Batch 1 warnings are stable.
- Batch 3: choose 15 roles from remaining catalog rows.
- Batch 4: complete the rest.
