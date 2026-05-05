# Cβ Finance / Manufacturing Revision Report

## Audit Summary

実装前監査で参照したSSOT:

- `docs/c-beta/10-CBETA-FINANCE-MANUFACTURING-IMMERSIVE-SCRIPTS.md`
  - 引用: `roleCoreFriction: 顧客を助けたい気持ちと、返済原資・保全・説明責任を同時に満たす融資設計の葛藤。`
  - 引用: `openingHook: 09:05。支店の電話が鳴った。「今月の給与、8日だけ足りません」`
  - 引用: `roleCoreFriction: 顧客価値を高めたい企画意図と、原価・製造・営業・品質保証・ブランドに通る仕様へ落とす葛藤。`
  - 引用: `openingHook: 09:10。顧客アンケートの自由記述だけ、赤い付箋が12枚ついていた。`
- `docs/c-beta/11-CBETA-SCENARIO-QUALITY-GATE-v2.md`
  - 引用: `immersive only`
  - 引用: `同一シーン反復禁止`
  - 引用: `各シーンに stakeholderPressure / timePressure / decisionTradeoff がある`
  - 引用: `結果が点数だけ`

normal mode 参照箇所:

- UI: `/play/[industry]` の職種カード、`/play/[industry]/[role]` の通常プレイルート、結果ページの replay/recommendation URL。
- code compatibility: `SceneManager` と task components は残存するが、新規UI導線からは到達しない。
- data: `modes` フィールドは schema 互換として残す。Cβ対象2本と catalog の user-facing modes は `immersive` のみ。
- docs/scripts: Cα generator/docs には過去の normal 前提文言があったため、生成時も immersive-first になるよう更新。
- tests: `/play/it/web-engineer` 通常プレイ前提のE2Eを `/immersive` 前提に更新。

finance/manufacturing JSON とSSOTの差分:

- exactly 5 scene構造、openingHook、workMaterial、roleWorkKernel、roleSpecificity、npcDialogue、choice label、meterEffects、misconceptionEffect、resultTypes、resultFeedback はSSOT内容を保持。
- JSONにはUI/scoring互換のため `context`、`content`、`text`、`scores`、`analytics`、`blocks`、root `scenes` を追加保持している。
- SSOT Markdownに不足していた `resultFeedback.careerReflectionPrompt` と `resultFeedback.universityInsightTags` は、canonical JSONに合わせて追記した。

schema/loader/UI の不足確認:

- `openingHook`, `workMaterial`, `roleWorkKernel`, `roleSpecificity`, `stakeholderPressure`, `timePressure`, `decisionTradeoff`, `roleCoreFriction`, `roleMisconception`, `roleRealityReveal`, `roleSpecificMeters`, `meterEffects`, `misconceptionEffect`, `resultTypes`, `resultFeedback`, `universityInsightTags` は Zod schema / JSON / scoring に接続済み。
- `nextRecommendedScenarios` は `resultFeedback.nextRecommendedScenarios` と `ScenarioResult.nextRecommendedScenarios` として optional に追加。現UIの推薦は catalog から継続生成する。

Test/build impact map:

- loader: optional field 追加のため既存scenarioは読み込み継続。
- scoring: meterEffects集計、resultTypes選択、universityInsightTags集約、nextRecommendedScenarios保持を確認。
- result page: 既存スコア表示に職業理解フィードバックを最小追加。
- E2E: role選択後は immersive URL、replay link も `/immersive`。
- verify: Cβ quality script を `scripts/verify.mjs` に追加。

## Normal Mode

Removed normal entry points:

- `/play/[industry]` の「通常モード」ボタン。
- role name / CTA から `/play/[industry]/[role]` へ直接進む導線。
- `/play/[industry]/[role]` の `SceneManager` 表示。現在は `/immersive` へ redirect。
- result page の replay/recommendation が normal route を指す挙動。
- Cα generator/catalog の normal-first 出力。

Retained normal compatibility items:

- `modes` フィールド自体は schema 互換のため保持。
- root `scenes` は result scoring と旧データ互換のため保持。ただしUI導線では使わない。
- `SceneManager` と task components は削除せず、互換コードとして残す。
- 過去URL `/play/[industry]/[role]` は破断させず immersive へ redirect。

## Finance Scenario

対象: `scenarios/finance/regional-bank-corporate-loan.json`

Additive fields filled:

- scenario root: `roleCoreFriction`, `roleMisconception`, `roleRealityReveal`, `dayTimeline`, `sceneList`, `roleSpecificMeters`, `resultTypes`, `resultFeedback`
- scenario root: `roleWorkKernel`
- scene: `openingHook`, `workMaterial`, `roleSpecificity`, `stakeholderPressure`, `timePressure`, `decisionTradeoff`, `hiddenWorkReality`, `missingInformation`, `consequenceHook`, `nextSceneEcho`
- choice: `immediateFeedback`, `delayedConsequence`, `nextSceneEffect`, `resultSummaryEffect`, `meterEffects`, `misconceptionEffect`, `universityInsightTags`

Per-scene changes:

- exactly 5 scene構造は維持。
- 給与資金、売掛入金、保証協会、審査部、支店長、社長、返済原資、条件付き支援などの具体内容は変更しない。
- 変更は schema/UI/scoring で使う構造フィールドの追加に限定。

Quality Gate v2:

- `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN
- `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN

## Manufacturing Scenario

対象: `scenarios/manufacturing/product-planning.json`

Additive fields filled:

- scenario root: `roleCoreFriction`, `roleMisconception`, `roleRealityReveal`, `dayTimeline`, `sceneList`, `roleSpecificMeters`, `resultTypes`, `resultFeedback`
- scenario root: `roleWorkKernel`
- scene: `openingHook`, `workMaterial`, `roleSpecificity`, `stakeholderPressure`, `timePressure`, `decisionTradeoff`, `hiddenWorkReality`, `missingInformation`, `consequenceHook`, `nextSceneEcho`
- choice: `immediateFeedback`, `delayedConsequence`, `nextSceneEffect`, `resultSummaryEffect`, `meterEffects`, `misconceptionEffect`, `universityInsightTags`

Per-scene changes:

- exactly 5 scene構造は維持。
- 顧客アンケート、競合比較、原価表、粗利、営業圧、製造制約、品質保証の表示リスク、ブランド適合、発売判定の具体内容は変更しない。
- 変更は schema/UI/scoring で使う構造フィールドの追加に限定。

Quality Gate v2:

- `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN
- `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN

## Schema / Loader

- Zod schema に Cβ narrative fields を optional で追加。
- `blocks[*].scenes` は phase内の1〜5件を許容。Cβ対象シナリオ全体では exactly 5 scenes をquality scriptで要求する。
- root `scenes` は max 10 のまま維持し、既存 result scoring 互換を保つ。
- breaking schema change は行っていない。

## Result Feedback

Data layer:

- `calculateResult` が `resultType`, `dominantMeters`, `sacrificedMeters`, `roleRealityReveal`, `misconceptionCorrection`, `decisionPatternSummary`, `careerReflectionPrompt`, `universityInsightTags`, `nextRecommendedScenarios` を返す。
- `resultTypes[*].meterPriorities` と選択済み `meterEffects` で職業理解タイプを選ぶ。
- `universityInsightTags` は scenario resultFeedback と choice tags を重複排除して集約する。

UI scope:

- 結果画面に「職業理解フィードバック」を最小表示。
- 学生の優劣判定ではなく、重視した価値、犠牲にした価値、職種の現実、誤解の修正、判断パターン、振り返りを表示する。

Deferred:

- 大学向け集計ダッシュボード。
- recommendation の高度化。現状は catalog の同業界別role推薦を継続。

## Review Script

`scripts/c-beta/check-cbeta-scenario-quality.mjs` は standalone runnable。

検出内容:

- target JSON の normal mode residue
- UI entry point residue: `通常モード`, `normalHref`, normal route の `SceneManager`
- catalog の normal mode surfaced item
- repeated scene title / repeated decisionPrompt
- forbidden phrases
- missing scenario fields: `roleWorkKernel`
- missing scene fields: `openingHook`, `workMaterial`, `roleSpecificity`, `stakeholderPressure`, `timePressure`, `decisionTradeoff`, `roleCoreFriction`, `hiddenWorkReality`
- missing choice fields: `immediateFeedback`, `delayedConsequence`, `nextSceneEffect`, `resultSummaryEffect`, `meterEffects`, `misconceptionEffect`, `studentFeedback`, `universityInsightTags`
- missing scenario fields: `roleCoreFriction`, `roleMisconception`, `roleRealityReveal`, `resultTypes`, `resultFeedback`

`scripts/verify.mjs` に `cbeta-quality` step として接続済み。

## Test Results

- `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN
- `pnpm lint`: GREEN
- `pnpm typecheck`: GREEN
- `pnpm build`: GREEN
- `pnpm test -- --run`: GREEN（4 files / 15 tests）
- `pnpm verify`: GREEN
- `pnpm test:e2e`: `pnpm verify` 内で実行、18 passed

## Remaining Issues

- immersive 未対応40 roleは catalog 上準備中扱い。Cβ展開時に順次 exactly 5 scene 化が必要。
- Webエンジニアなど既存 representative immersive は今回の Narrative OS v1 品質までは全面改稿していない。
- analytics保存先と大学向け匿名集計UIは未実装。

## Scope Statement

finance/manufacturing 以外のシナリオ本文は改稿していない。対象外シナリオへの変更は、normal-mode removal side effects としての `modes` / catalog / generator 整理に限定した。

## Next Rollout

1. roleCoreFriction / roleMisconception / roleRealityReveal を1文で定義する。
2. 1日のexactly 5 scene timeline を作る。
3. 各sceneに仕事材料、関係者の圧、時間制限、欠けた情報を置く。
4. 各choiceに合理性、代償、meterEffects、misconceptionEffectを入れる。
5. resultTypes と resultFeedback を先に決め、結果画面へ接続する。
6. `check-cbeta-scenario-quality.mjs`、unit tests、E2Eで確認する。
