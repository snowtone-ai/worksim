# Cβ Scenario OS Finalization Report

## 1. 実施概要

Cβ Scenario OSを、workMaterial正規化、1シナリオ5タスク固定、Anti-Generic Stakeholder Coordination対策の3点で固定した。

金融・商品企画の本文は大きく作り直さず、roleWorkKernel、roleSpecificity、quality script、schema、docsを中心に更新した。

## 2. Task 1: workMaterial統一

### A. 完全リネーム型

- 成功率: 中
- 破壊リスク: 中
- 長期保守性: 高
- Cβ品質への影響: 高
- 判断: 未対応データまで巻き込むため今回は不採用

### B. 後方互換型

- 成功率: 高
- 破壊リスク: 低
- 長期保守性: 高
- Cβ品質への影響: 高
- 判断: 採用。正規キーはworkMaterial、loaderは旧データ保護のため互換を残す

### C. 二重保持型

- 成功率: 中
- 破壊リスク: 低
- 長期保守性: 低
- Cβ品質への影響: 低
- 判断: 名前ズレを固定化するため不採用

## 3. Task 2: 1シナリオ5タスク固定

### A. 厳格5 scenes固定型

- 大学PoCでの使いやすさ: 高
- 職種横展開のしやすさ: 高
- 品質管理のしやすさ: 高
- 既存シナリオへの影響: 低
- 判断: 採用

### B. 標準5 scenes + 将来拡張許容型

- 大学PoCでの使いやすさ: 中
- 職種横展開のしやすさ: 中
- 品質管理のしやすさ: 中
- 既存シナリオへの影響: 低
- 判断: 今回はdeep modeを実装しないため不採用

### C. 旧レンジ維持型

- 大学PoCでの使いやすさ: 低
- 職種横展開のしやすさ: 中
- 品質管理のしやすさ: 低
- 既存シナリオへの影響: 低
- 判断: 曖昧さが残るため不採用

## 4. Task 3: Anti-Generic Stakeholder Coordination

### A. Negative Gate型

- 成功率: 中
- 実装コスト: 低
- Cβでの即効性: 中
- 将来の職種量産への効き方: 中
- 過剰設計リスク: 低
- 判断: 補助的に採用

### B. Role Work Kernel型

- 成功率: 高
- 実装コスト: 中
- Cβでの即効性: 高
- 将来の職種量産への効き方: 高
- 過剰設計リスク: 中
- 判断: 採用

### C. Profession Ontology型

- 成功率: 中
- 実装コスト: 高
- Cβでの即効性: 低
- 将来の職種量産への効き方: 高
- 過剰設計リスク: 高
- 判断: 今回スコープでは不採用

## 5. ユーザー仮説への回答

ナラティブゲーム要素が似たシナリオを生みやすい可能性はある。選択が後に影響する設計は、汎用的な関係者調整に寄りやすい。

品質ゲート過多が似た構造を生む可能性もある。チェック項目だけを増やすと、全職種が同じ穴埋め形式へ収束する。

最終的な解決策は、ステークホルダーを消すことではなく、roleWorkKernelとscene-level roleSpecificityで職種固有の仕事材料・数字・判断基準・失敗リスクを主役に戻すこと。

## 6. 変更ファイル一覧

- scenarios/finance/regional-bank-corporate-loan.json
- scenarios/manufacturing/product-planning.json
- scenarios/_schema.v2.md
- src/lib/scenario/loader.ts
- src/lib/scenario/loader.test.ts
- src/lib/scenario/cbeta-quality-script.test.ts
- scripts/c-beta/check-cbeta-scenario-quality.mjs
- scripts/c-beta/check-c-type-scenario-quality.mjs
- scripts/c-beta/check-scenario-quality.mjs
- docs/c-beta/09-CBETA-NARRATIVE-SCENARIO-OS-v1.md
- docs/c-beta/11-CBETA-SCENARIO-QUALITY-GATE-v2.md
- docs/c-beta/10-CBETA-FINANCE-MANUFACTURING-IMMERSIVE-SCRIPTS.md
- docs/c-beta/12-CBETA-FINANCE-MANUFACTURING-REVISION-REPORT.md
- docs/c-beta/13-CBETA-ROLE-DIFFERENTIATION-GUARDRAILS.md
- docs/c-beta/14-CBETA-HUMAN-REVIEW-CHECKLIST.md
- docs/c-beta/15-CBETA-SCENARIO-OS-FINALIZATION-REPORT.md
- docs/decisions.md
- docs/issues.md
- docs/state.md
- scenarios/_research-plan.md

## 7. workMaterial統一結果

Cβ正規キーはworkMaterialに統一した。金融・商品企画の対象シナリオから旧artifactキーを削除し、quality scriptは対象JSONに旧キーが残る場合Failする。

## 8. 5タスク固定結果

Cβ標準をexactly 5 scenes / 5 tasksに固定した。quality scriptは5未満/6以上をFailする。

## 9. Anti-Generic Stakeholder Coordination対策

docsにAnti-Generic Stakeholder Coordination Rule、Role Work Kernel、Role Differentiation Sheet、Decision Primitive Diversityを追加した。

金融・商品企画の各sceneにroleSpecificityを追加し、coreDecisionPrimitive、資料、数値、失敗リスク、評価基準、汎用化リスク、回避設計を明示した。

## 10. Quality Gate script結果

`scripts/c-beta/check-cbeta-scenario-quality.mjs` は以下を確認する。

- immersive only
- exactly 5 scenes
- roleCoreFriction / roleMisconception / roleRealityReveal / roleWorkKernel
- resultFeedback
- openingHook / workMaterial / roleSpecificity
- roleSpecificityの必須7フィールド
- choice feedback / meterEffects / misconceptionEffect
- 対象JSON内の旧artifactキー残存

実行結果:

- `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN
- `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN
- `pnpm lint`: GREEN
- `pnpm typecheck`: GREEN
- `pnpm build`: GREEN
- `pnpm test -- --run`: GREEN（16 tests passed）
- `pnpm verify`: GREEN（18 E2E tests passed）

## 11. 残課題

- immersive未対応40 roleは準備中扱いのまま
- 金融・商品企画以外の大規模シナリオ本文改稿は今回スコープ外
- 現場レビューによる数字・資料の妥当性確認は未実施

## 12. 次にCβでやるべきこと

1. 次の代表職種を1本選び、Role Differentiation Sheetを先に埋める。
2. 5 scenes / 5 tasksでsceneごとのdecision primitiveを固定する。
3. quality scriptを通した後、人間レビューChecklistで職種名置換テストを行う。

## 13. 2026-05-05 追補: 50 Scenario Readiness

- `roleWorkKernel` は構造化objectをCβ canonical standardにした。
- `roleSpecificity.kernelConnection` を追加し、scene単位の判断がscenario-level kernelに接続することを明示した。
- Cβ quality gateは構造不足をhard fail、意味品質の懸念をwarningとして扱う。
- 50シナリオ展開はCα安定化後にbatch単位で進め、一括生成しない。
