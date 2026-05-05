# Last Updated: 2026-05-05 13:42

# State — 現在のタスク状態（SSOT）

このファイルは進行中タスクの **唯一の真実の源（Single Source of Truth）**。
Claude Code はセッション開始時に必ずこれを読み、完了済みタスクを再実行しない。

---

## 現在のフェーズ

**Cβ complete / Cα buildout 完了 / MVP v1 完成 / pm-zero v9.0 Repository OS 移行完了（未push）**

---

## Cα buildout（2026-05-04）

- [x] docs/c-alpha/00-08 を作成
- [x] `scenarios/_schema.v2.md`、`scenarios/_template.v2.json`、`scenarios/_catalog.c-alpha.json` を作成
- [x] 50ロールの catalog を生成
- [x] 50 normal シナリオ JSON を生成
- [x] representative immersive 10ロールを生成
- [x] `scenarios/it/web-engineer.json` を additive v2 metadata 付きに更新
- [x] `/play` を catalog ベースの 50 ロール表示へ更新
- [x] 通常モードに task-pre screen と after-choice feedback を追加
- [x] 結果画面に caution / recommendation を追加
- [x] analytics event types / helper / API route を追加
- [x] loader / test / UI の最終整合確認
- [x] `pnpm lint`
- [x] `pnpm typecheck`
- [x] `pnpm build`
- [x] `pnpm test`
- [x] `pnpm verify`
- [x] `pnpm test:e2e`

### Cα ステータス要約

- docs: GREEN（初版生成済み）
- schema: GREEN（v2 additive 文書あり）
- catalog: GREEN（50 roles）
- scenarios: GREEN（50 normal / 10 immersive のファイル生成済み）
- UI: GREEN（catalog・intro・feedback・result recommendation 実装済み）
- analytics: GREEN（typed events / API route 実装、保存先は未接続）
- tests: GREEN（loader/scoring 更新、Vitest/E2E/verify 通過）
- verification: GREEN

### 手動テストフィードバック対応（2026-05-05）

- [x] 没入モードの全タスク前画面ボタンを `START` に統一
- [x] Webエンジニア没入モードで `START` 押下後に画面が進むことを E2E で確認
- [x] representative immersive 10シナリオで `START` 押下後に画面が進むことを E2E で確認
- [x] `/play` を業界選択画面へ変更
- [x] `/play/[industry]` を職種別シナリオ選択画面として追加
- [x] `pnpm verify`: GREEN（16 E2E tests passed）

### Cβ Scenario Quality OS v1（2026-05-05）

- [x] 代表10本の scenario quality diagnosis を作成
- [x] Scenario Quality OS v1.0 を作成
- [x] Scenario Quality Gate v1 を作成
- [x] Schema v2 / loader に quality metadata を optional 追加
- [x] 地方銀行 法人営業/融資担当を具体的な5sceneへ改善
- [x] 商品企画を具体的な5sceneへ改善
- [x] Webマーケターを具体的な5sceneへ改善
- [x] `scripts/c-beta/check-scenario-quality.mjs` を追加
- [x] 対象3本の quality check: GREEN
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN
- [x] `pnpm verify`: GREEN（16 E2E tests passed）

### Cタイプ Scenario Improvement v2（2026-05-05）

- [x] `docs/c-beta/04-C-TYPE-SCENARIO-DIRECTION.md` を作成
- [x] `docs/c-beta/05-C-TYPE-SCENARIO-QUALITY-GATE.md` を作成
- [x] `docs/c-beta/06-WEB-MARKETER-REVISION-NOTES.md` を作成
- [x] `docs/c-beta/07-C-TYPE-SCENARIO-IMPROVEMENT-REPORT.md` を作成
- [x] 地方銀行 法人営業/融資担当に `meterEffects` / `misconceptionEffect` / result feedback 接続情報を追加
- [x] 商品企画に `meterEffects` / `misconceptionEffect` / result feedback 接続情報を追加
- [x] 結果画面に職業理解フィードバックの簡易表示を追加
- [x] `scripts/c-beta/check-c-type-scenario-quality.mjs` を追加
- [x] 金融・メーカーの没入モードスクリプトと品質ルールを `docs/c-beta/exports/` と `Downloads` にMD出力
- [x] `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN（12 tests passed）
- [x] `pnpm verify`: GREEN（18 E2E tests passed）

残り7本の代表 immersive scenario は未修正。C案（実務ケース × ゲーム構造）を基準に、Cβ前に段階展開する。

### Cβ Finance / Manufacturing Immersive Revision（2026-05-05）

- [x] normal mode removal audit を作成
- [x] `/play` から通常モード導線を削除
- [x] role selection 後の導線を immersive mode へ一本化
- [x] `/play/[industry]/[role]` を immersive route へ redirect
- [x] catalog / template / scenario JSON から `normal` mode を削除
- [x] `blocks[*].scenes` はphase内1〜5件を許容し、Cβ標準シナリオ全体はexactly 5 sceneへ固定
- [x] 地方銀行 法人営業/融資担当を5 sceneの連続体験へ再構成
- [x] 商品企画を5 sceneの連続体験へ再構成
- [x] `docs/c-beta/09-CBETA-NARRATIVE-SCENARIO-OS-v1.md` を作成
- [x] `docs/c-beta/10-CBETA-FINANCE-MANUFACTURING-IMMERSIVE-SCRIPTS.md` を作成
- [x] `docs/c-beta/11-CBETA-SCENARIO-QUALITY-GATE-v2.md` を作成
- [x] `scripts/c-beta/check-cbeta-scenario-quality.mjs` を追加
- [x] `scripts/verify.mjs` に Cβ quality check を接続
- [x] Cβ quality script の synthetic violation unit test を追加
- [x] `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN
- [x] `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN（15 tests passed）
- [x] `pnpm verify`: GREEN（18 E2E tests passed）
- [x] 金融・メーカーのスクリプトとルールを `C:\Users\chidj\Downloads` に出力

残課題: immersive 未対応40 roleは準備中扱い。Cβ展開時に業界ごとにexactly 5 scene化する。

### Cβ Scenario OS Finalization（2026-05-05）

- [x] `concreteWorkArtifact` / `workMaterial` の名前ズレを解消し、Cβ正規キーを `workMaterial` に統一
- [x] Cβ標準を「1シナリオ = exactly 5 scenes / 5 tasks」に固定
- [x] Anti-Generic Stakeholder Coordination Rule を Scenario OS / Quality Gate に追加
- [x] `roleWorkKernel` を金融・商品企画に追加
- [x] 金融・商品企画の各sceneに `roleSpecificity` を追加
- [x] `scripts/c-beta/check-cbeta-scenario-quality.mjs` に role specificity / exactly 5 scenes チェックを追加
- [x] `docs/c-beta/13-CBETA-ROLE-DIFFERENTIATION-GUARDRAILS.md` を作成
- [x] `docs/c-beta/14-CBETA-HUMAN-REVIEW-CHECKLIST.md` を作成
- [x] `docs/c-beta/15-CBETA-SCENARIO-OS-FINALIZATION-REPORT.md` を作成
- [x] `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN
- [x] `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN（16 tests passed）
- [x] `pnpm verify`: GREEN（18 E2E tests passed）

### Cβ 50-Scenario Readiness Finalization（2026-05-05）

- [x] Cβ readiness auditを作成
- [x] Cβ canonical `roleWorkKernel` を構造化objectへ更新
- [x] loaderはstructured objectとlegacy stringの両方を許容
- [x] 金融・商品企画の全canonical sceneに `roleSpecificity.kernelConnection` を追加
- [x] Cβ quality scriptをhard fail + warning checksへ強化
- [x] cross-scenario drift warning-ready checkを追加
- [x] Cβ coverage readiness scriptを追加
- [x] 50-scenario implementation planを作成
- [x] 50-role role work kernel matrixをcatalogから作成
- [x] scenario production checklistを作成
- [x] final reportを作成
- [x] `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN（warning 1）
- [x] `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN
- [x] `node scripts/c-beta/check-cbeta-coverage.mjs`: GREEN（non-failing readiness count）
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN（22 tests passed）
- [x] `pnpm verify`: GREEN（18 E2E tests passed）
- [x] ChatGPT引き継ぎ用プロセス資料を `C:\Users\chidj\Downloads\worksim-cbeta-scenario-production-process-for-chatgpt.md` に出力

Cβ 50本の一括生成は未実施。次はCα completion / stabilization後に、matrixを更新しながらBatch 1へ進む。

### Cα Completion / Cβ Batch 1 Readiness（2026-05-05）

- [x] `CBETA_MASTER_CODEX_PROMPT.md` の 00-02 を実行
- [x] Cα catalog integrity auditを実施（50 roles / 10 industries / duplicatesなし）
- [x] Cα navigation auditを実施
- [x] 結果画面recommendationが準備中roleへ直接リンクしないよう修正
- [x] `docs/c-alpha/09-CALPHA-COMPLETION-AUDIT.md` を作成
- [x] `docs/c-alpha/10-CALPHA-COMPLETION-FINAL-REPORT.md` を作成
- [x] Batch 1として5 roleを選定
  - `it/web-engineer`
  - `marketing-media/performance-marketing`
  - `it/it-solution-sales`
  - `hr/recruitment-consultant`
  - `public-infra/disaster-crisis-management`
- [x] `docs/c-beta/21-CBETA-BATCH1-ROLE-DIFFERENTIATION-SHEETS.md` を作成
- [x] `docs/c-beta/22-CBETA-BATCH1-READINESS-REPORT.md` を作成
- [x] `docs/c-beta/18-CBETA-ROLE-WORK-KERNEL-MATRIX.md` にBatch 1 selected statusを反映
- [x] `docs/c-beta/workflow-handoff/checkpoint-a.md` を作成
- [x] `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN（warning 1）
- [x] `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN
- [x] `node scripts/c-beta/check-cbeta-coverage.mjs`: GREEN（2/50 ready）
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN（22 tests passed）
- [x] `pnpm verify`: GREEN（18 E2E tests passed）

CαはCβ production foundationとして完了。Cβ coverageは引き続き2/50 readyで、次は `03-CBETA-BATCH1-PRODUCTION-CALIBRATION.md` に進む。

### Cβ Batch 1 Production & Quality Calibration（2026-05-05）

- [x] `03-CBETA-BATCH1-PRODUCTION-CALIBRATION.md` を実行
- [x] Production skeleton A（Sequential one-by-one production）を採用
- [x] Batch 1 Cβ canonical scenarioを5本実装
  - `it/web-engineer`
  - `marketing-media/performance-marketing`
  - `it/it-solution-sales`
  - `hr/recruitment-consultant`
  - `public-infra/disaster-crisis-management`
- [x] 全5本を immersive-only / exactly 5 scenes / structured `roleWorkKernel` / scene-level `workMaterial` / `roleSpecificity.kernelConnection` へ更新
- [x] `scenarios/_catalog.c-alpha.json` でBatch 1 roleを immersive playable として反映
- [x] `docs/c-beta/18-CBETA-ROLE-WORK-KERNEL-MATRIX.md` をBatch 1 canonical implementedへ更新
- [x] `scripts/c-beta/check-cbeta-scenario-quality.mjs` の既定対象をBatch 0 + Batch 1の7本へ拡張
- [x] `docs/c-beta/23-CBETA-BATCH1-HUMAN-REVIEW.md` を作成
- [x] `docs/c-beta/24-CBETA-BATCH1-QUALITY-CALIBRATION-REPORT.md` を作成
- [x] `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN（7 files / warning 1）
- [x] `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN
- [x] `node scripts/c-beta/check-cbeta-coverage.mjs`: GREEN（7/50 ready）
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN（22 tests passed）
- [x] `pnpm exec playwright test e2e/us-4-play-scenario.spec.ts e2e/us-9-immersive-mode.spec.ts`: GREEN（8 tests passed）
- [x] `pnpm verify`: GREEN（18 E2E tests passed）

Cβ coverageは7/50 ready。残43 roleは未対応。現在のwarningは「canonical setが10本未満でcross-scenario drift統計がまだ安定しない」という既存の小標本warningで、Batch 1固有のgeneric drift増加は確認されていない。次は `04-CBETA-BATCH2-PRODUCTION.md` に進む。

### Cβ Batch 2 Production（2026-05-05）

- [x] `04-CBETA-BATCH2-PRODUCTION.md` を実行
- [x] Selection skeleton C（decision-primitive diversity）を採用
- [x] Batch 2 role differentiation sheetsを作成: `docs/c-beta/25-CBETA-BATCH2-ROLE-DIFFERENTIATION-SHEETS.md`
- [x] Batch 2 readiness reportを作成: `docs/c-beta/26-CBETA-BATCH2-READINESS-REPORT.md`
- [x] Batch 2 Cβ canonical scenarioを10本実装
  - `it/cloud-operations`
  - `it/data-analyst-bi`
  - `finance/credit-risk-management`
  - `manufacturing/quality-assurance`
  - `manufacturing/procurement`
  - `trading/trade-operations`
  - `trading/supply-chain-coordination`
  - `consulting-bpo/operations-consultant`
  - `retail-ec/md-buyer`
  - `tourism-transport/travel-product-planning`
- [x] `docs/c-beta/27-CBETA-BATCH2-DRIFT-REVIEW.md` を作成
- [x] `docs/c-beta/18-CBETA-ROLE-WORK-KERNEL-MATRIX.md` をBatch 2 canonical implementedへ更新
- [x] `scenarios/_catalog.c-alpha.json` でBatch 2 roleを immersive playable として反映
- [x] `scripts/c-beta/check-cbeta-scenario-quality.mjs` の既定対象を17本へ拡張
- [x] `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN（17 files / warnings 0）
- [x] `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN
- [x] `node scripts/c-beta/check-cbeta-coverage.mjs`: GREEN（17/50 ready）
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN（22 tests passed）
- [x] `pnpm verify`: GREEN（18 E2E tests passed）

Cβ coverageは17/50 ready。残33 roleは未対応。Batch 2 drift reviewではgeneric stakeholder-coordination drift増加なし。次は `05-CBETA-BATCH3-PRODUCTION.md` に進む。

### Cβ Batch 3 Production（2026-05-05）

- [x] `05-CBETA-BATCH3-PRODUCTION.md` を実行
- [x] Selection skeleton C（missing decision primitive families）を採用し、学生有用性と業界不足をfilterにした
- [x] Batch 3 role differentiation sheetsを作成: `docs/c-beta/28-CBETA-BATCH3-ROLE-DIFFERENTIATION-SHEETS.md`
- [x] Batch 3 readiness reportを作成: `docs/c-beta/29-CBETA-BATCH3-READINESS-REPORT.md`
- [x] Batch 3 Cβ canonical scenarioを15本実装
  - `it/product-planning-assistant`
  - `finance/retail-asset-advisor`
  - `finance/securities-market-advisory`
  - `finance/insurance-life-planning`
  - `manufacturing/production-control`
  - `manufacturing/technical-field-support`
  - `trading/corporate-trading-sales`
  - `trading/business-development`
  - `marketing-media/web-marketer`
  - `marketing-media/ad-planner`
  - `marketing-media/content-editor`
  - `consulting-bpo/it-dx-consultant`
  - `consulting-bpo/pmo-project-drive`
  - `hr/career-advisor`
  - `public-infra/regional-policy-planning`
- [x] Chunk 1 validation: Cβ quality GREEN / C-type quality GREEN / coverage 22/50
- [x] Chunk 2 validation: Cβ quality GREEN / C-type quality GREEN / coverage 27/50
- [x] Chunk 3 validation: Cβ quality GREEN / C-type quality GREEN / coverage 32/50
- [x] `docs/c-beta/30-CBETA-BATCH3-DRIFT-REVIEW.md` を作成
- [x] `docs/c-beta/18-CBETA-ROLE-WORK-KERNEL-MATRIX.md` をBatch 3 canonical implementedへ更新
- [x] `scenarios/_catalog.c-alpha.json` でBatch 3 roleを immersive playable として反映
- [x] `scripts/c-beta/check-cbeta-scenario-quality.mjs` の既定対象を32本へ拡張
- [x] `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN（32 files / warnings 0）
- [x] `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN
- [x] `node scripts/c-beta/check-cbeta-coverage.mjs`: GREEN（32/50 ready）
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN（22 tests passed）
- [x] `pnpm verify`: GREEN（18 E2E tests passed）
- [x] `docs/c-beta/workflow-handoff/checkpoint-b.md` を作成

Cβ coverageは32/50 ready。残18 roleは未対応。ユーザー指示により、05以降は1 prompt file完了ごとに `/compact` を依頼して停止する。

### Cβ Batch 4 Production（2026-05-05）

- [x] `06-CBETA-BATCH4-PRODUCTION.md` を実行
- [x] Selection skeleton B（decision primitive gaps）を採用
- [x] Batch 4 Cβ canonical scenarioを18本実装
  - `trading/overseas-market-development`
  - `marketing-media/pr-brand-communication`
  - `consulting-bpo/strategy-research-analyst`
  - `consulting-bpo/hr-organization-consultant`
  - `hr/recruiting-advisor`
  - `hr/training-organization-development`
  - `hr/job-media-planning`
  - `public-infra/tourism-promotion`
  - `public-infra/urban-planning-coordination`
  - `public-infra/public-infrastructure-operations`
  - `retail-ec/store-operations`
  - `retail-ec/ec-operations`
  - `retail-ec/logistics-demand-planning`
  - `retail-ec/crm-promotion`
  - `tourism-transport/hotel-front-management`
  - `tourism-transport/tourism-facility-operations`
  - `tourism-transport/inbound-marketing`
  - `tourism-transport/transport-operations-planning`
- [x] Chunk 1 validation: Cβ quality GREEN / C-type quality GREEN / coverage 38/50
- [x] Chunk 2 validation: Cβ quality GREEN / C-type quality GREEN / coverage 44/50
- [x] Chunk 3 validation: Cβ quality GREEN / C-type quality GREEN / coverage 50/50
- [x] `docs/c-beta/31-CBETA-50-SCENARIO-DRIFT-REVIEW.md` を作成
- [x] `docs/c-beta/18-CBETA-ROLE-WORK-KERNEL-MATRIX.md` をBatch 4 canonical implementedへ更新
- [x] `scenarios/_catalog.c-alpha.json` で全50 roleを immersive playable として反映
- [x] `scripts/c-beta/check-cbeta-scenario-quality.mjs` の既定対象を50本へ拡張
- [x] `src/lib/scenario/loader.test.ts` のcatalog期待値を50 immersiveへ更新
- [x] `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN（50 files / warnings 0）
- [x] `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN
- [x] `node scripts/c-beta/check-cbeta-coverage.mjs`: GREEN（50/50 ready）
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN（22 tests passed）
- [x] `pnpm verify`: GREEN（18 E2E tests passed）

Cβ coverageは50/50 ready。ユーザー指示により、06完了後は手動 `/compact` を依頼して停止する。

### Cβ Final Completion Audit（2026-05-05）

- [x] `07-CBETA-FINAL-COMPLETION-AUDIT.md` を実行
- [x] Final audit skeleton B（script + targeted human review）を採用
- [x] structural audit: 50 catalog roles / 50 scenarios / 250 scenes / immersive-only / exactly 5 scenes を確認
- [x] anti-generic audit: 250 unique decision primitives / repeated primitive 3+なし / weak candidates 0 を確認
- [x] result feedback audit: 50/50でrole reality / misconception correction / reflection promptを確認
- [x] `docs/c-beta/32-CBETA-FINAL-HUMAN-REVIEW.md` を作成
- [x] `docs/c-beta/33-CBETA-COMPLETION-FINAL-REPORT.md` を作成
- [x] `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN（50 files / warnings 0）
- [x] `node scripts/c-beta/check-c-type-scenario-quality.mjs`: GREEN
- [x] `node scripts/c-beta/check-cbeta-coverage.mjs`: GREEN（50/50 ready / not ready 0）
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN（22 tests passed）
- [x] `pnpm verify`: GREEN（18 E2E tests passed）
- [x] Cβ completion statusを「current student/university PoC scope complete」と判定

Cβは50/50 readyかつ最終監査GREEN。今後はCβ scenario productionではなく、大学PoC前のstabilization / manual browser pass / student feedback collectionへ進む。

### C-Type Product Completion（2026-05-05）

- [x] `worksim-c-type-product-completion-directive.md` を実行
- [x] シナリオ選択画面をPoC/to B向けの業界・職種カード形式へ整理
- [x] 既存schemaを壊さず `src/lib/scenario/view-model.ts` で表示用fallbackを集約
- [x] タスク前画面に背景画像枠、fallback gradient、dark overlay、業界名、職種名、概要、START CTA を接続
- [x] 光るオブジェクト画面のTODOメモと共通ラベルを汎用文言へ修正
- [x] 選択肢画面を共通の task title / context / prompt / 3 choice cards へ統一
- [x] HR向けシナリオ作成ガイド、テンプレート、記入例、検証チェックリストを `docs/c-type/` に作成
- [x] 代表10ロールPoCブラウザ確認リストを作成
- [x] ウルトラレビュー前資料を作成
- [x] `pnpm lint`: GREEN
- [x] `pnpm typecheck`: GREEN
- [x] `pnpm build`: GREEN
- [x] `pnpm test -- --run`: GREEN（23 tests passed）
- [x] `pnpm verify`: GREEN（18 E2E tests passed）

C-Type product completionは背景画像生成を除き完了。次は `docs/c-type/05-POC-BROWSER-REVIEW-CHECKLIST.md` に沿った手動ブラウザ確認とウルトラレビュー。

---

## pm-zero v9.0 移行（2026-05-04）

- [x] Phase 0：現状把握完了
  - branch: `chore/pm-zero-v9-repo-optimization`
  - rollback tag: `pre-pm-zero-v9-migration`
  - Codex CLI: `codex-cli 0.128.0`
  - Node.js: `v24.14.0`
  - pnpm: `10.33.0`
- [x] Phase 1：ベースライン検証完了
  - `pnpm install --frozen-lockfile`: GREEN
  - `pnpm lint`: GREEN
  - `pnpm typecheck`: GREEN
  - `pnpm build`: GREEN
  - `pnpm test -- --run`: 5 tests passed
  - `pnpm test:e2e`: 15 tests passed
  - dev server: `http://localhost:3000` HTTP 200
  - browser smoke: `test-results/baseline-home.png` 取得、console error 0
- [x] Phase 2：Repository OS 設計を追加
- [x] Phase 3：Reference Gate を `docs/decisions.md` に記録
- [x] Phase 4：`ARCHITECTURE-AUDIT.md` 作成
- [x] Phase 5：小差分実装完了
- [x] Phase 6：コード品質改善完了
  - `decodeAnswers` の内部命名をドメイン名に変更
  - malformed answer payload の negative path test を追加
- [x] Phase 7：再検証完了
  - `pnpm lint`: GREEN
  - `pnpm typecheck`: GREEN
  - `pnpm build`: GREEN
  - `pnpm test -- --run`: 6 tests passed
  - `pnpm test:e2e`: 15 tests passed
  - `pnpm verify`: GREEN
  - browser smoke: `test-results/verify-home.png` 取得、console error 0
- [x] Phase 8：Codex review 実行
  - `codex exec review --base pre-pm-zero-v9-migration` を複数回実行
  - review 指摘は `docs/issues.md` に記録し、修正後に再検証
  - 最終 review: 優先度付きの actionable correctness issue なし
- [x] Phase 9：Final audit 完了
  - AGENTS.md が一次ソース
  - CLAUDE.md / CODEX.md は adapter
  - `pnpm verify`: GREEN
  - `pnpm test:e2e`: 15 tests passed
  - push 未実行

---

## Phase 1 タスク（着手順）

- [x] **T1.1**：`pnpm` を確認（pnpm 10.33.0 確認済み）
- [x] **T1.2**：Next.js プロジェクト初期化（TypeScript・Tailwind v4・App Router・src/ディレクトリ・@/* エイリアス）
- [x] **T1.3**：`tsconfig.json` を strict + noUncheckedIndexedAccess に設定済み
- [x] **T1.4**：依存パッケージインストール済み
- [x] **T1.5**：`pnpm dev` → HTTP 200 確認済み
- [x] **T1.6**：Git 初期化、`main` ブランチ作成、初回コミット完了
- [x] **T1.7**：GitHub リポジトリ作成済み（snowtone-ai/worksim）
- [x] **T1.8**：GitHub にプッシュ済み
- [x] **T1.9**：Vercel デプロイ確認済み
- [x] **T1.10**：Supabase プロジェクト作成済み（Northeast Asia / Tokyo）
- [x] **T1.11**：`.env.local` 作成済み
- [x] **T1.12**：Vercel 環境変数設定済み
- [x] **T1.13**：Google OAuth クライアント作成済み
- [x] **T1.14**：Supabase Google プロバイダ有効化済み
- [x] **T1.15**：GitHub Actions keep-alive cron 作成・プッシュ済み

---

## Phase 2：認証・プロフィール

- [x] T2.1：Supabase クライアント実装（client / server 両方）
- [x] T2.2：profiles テーブル作成（マイグレーション SQL）+ RLS + GRANT
- [x] T2.3：Google ログイン UI 実装（ログイン → callback → リダイレクト）
- [x] T2.4：プロフィール任意入力フォーム実装（大学名コンボボックス・学部自動補完）
- [x] T2.5：US-2、US-3 の E2E テスト（T4.7 と合わせて実施、2026-05-04 GREEN）

---

## Phase 3：シナリオ基盤

- [x] T3.1：scenarios/_schema.md 確定
- [x] T3.2：scenarios/_research-plan.md 確定
- [x] T3.3：シナリオローダー（lib/scenario/loader.ts）+ Zod バリデーション
- [x] T3.4：シーンマネージャー（features/play/components/scene-manager.tsx）
- [x] T3.5：共通タスク UI（task-email / task-meeting / task-review / task-debug）

---

## Phase 4：Webエンジニア職完全実装

- [x] T4.1：リサーチ実行（厚労省 jobtag、IPA DX白書2023 を参照）
- [x] T4.2：scenarios/it/web-engineer.json 生成（出典つき、5シーン）
- [x] T4.3：全タスクUI 実装（email / meeting / review / debug）
- [x] T4.4：適性スコア計算ロジック（lib/scoring/calculator.ts）
- [x] T4.5：結果画面（app/play/[industry]/[role]/result/page.tsx）
- [x] T4.6：play_sessions テーブル作成 + RLS + GRANT（ユーザーが Supabase SQL Editor で実行）
- [x] T4.7：E2E テスト GREEN（US-1〜US-10、15 tests passed）

---

## Phase 5：ワークフロー文書化

- [x] T5.1：scenarios/_research-plan.md を実体験に基づき更新
- [x] T5.2：「次の職種を作る手順」セクションを書く

---

## 未解決バグ

なし

---

## 品質ゲート対応（2026-05-04）

- `src/middleware.ts` を `src/proxy.ts` へ移行（Next.js 16 の deprecated 警告対応）
- Vitest テストを追加（`calculator` / `loader`）
- lint warning 2件を解消（`.codex/hooks` は未使用 import 削除、`.claude/hooks` は保護方針に従い ESLint 側で対象限定除外）

---

## 解決済みバグ

### BUG-001：DialogueScene の confirm ボタンが非表示・選択肢画面の下端崩れ（会議/ランチ/午後の複数フェーズ）

**解決日**：2026-05-04

**原因**  
没入モードの会話系画面で、本文・選択肢・確認ボタンを固定高さの箱に押し込む前提になっていた。  
その結果、以下が同時に起きた。

- 本文が長いシーンで選択肢全体が下へ押し出される
- `overflow: hidden` の影響で確認ボタンや選択肢下端がクリップされる
- Windows タスクバーやブラウザ下端付近に CTA を置く設計が実機で破綻する
- 「会話だけスクロール」「選択肢だけ固定」のような中間案では、読了感と操作感が分離して違和感が残る

**対応**  
段階的な試行の末、最終的に以下へ整理した。

- `DialogueScene` から左右の雰囲気オブジェクトを撤去
- 会話系画面を `absolute inset-0` の独立スクロール面に変更
- 会話パネルと選択肢パネルを同一の縦フローに戻し、画面全体を自然に縦スクロールする方式へ変更
- `sticky` 固定の選択肢パネルは撤去
- 下端 UI との干渉を避けるため、ページ末尾に `env(safe-area-inset-bottom)` を含む余白を確保
- フェーズ遷移画面の CTA は最下段レイアウトから外し、常時見える固定位置へ移動

**検証**  
`e2e/us-9-immersive-mode.spec.ts` で没入モードの会議ブロック遷移を継続確認。  
加えて Playwright と実機スクリーンショットで以下を確認済み。

- `?block=lunch&scene=0`
- `?block=meeting&scene=0`
- `?block=meeting&scene=1`
- `?block=afternoon&scene=0`

確認内容:

- フェーズ開始ボタンが Windows タスクバーに隠れない
- 会話系画面でページ全体がスクロールする
- 会話全文と選択肢が同じ読書フローで見える
- Sprint Planning 以降の最終結果画面まで通し到達できる

---

## MVP 完成時の学び

### 1. 下端 CTA を置く時は「見た目」ではなく「実機の安全領域」で設計する

- ブラウザ下端・OS タスクバー・将来のモバイル下端 UI は常に変動要因
- `bottom: 0` や固定フッタ前提は壊れやすい
- `env(safe-area-inset-bottom)` を前提に余白を持たせる

### 2. 長文 UI は「1画面に押し込む」より「ページ全体を素直にスクロール」させた方が壊れにくい

- 本文と操作を別スクロールにすると、読了感と操作位置が分離しやすい
- シナリオ読む体験では、会話本文と選択肢を同じ縦フローに置く方が自然

### 3. 雰囲気演出は、主要操作を圧迫し始めたら削る

- 左右オブジェクトや上部演出は、余白が十分な時だけ有効
- 体験品質の優先順位は「読める」「押せる」「進める」が先

### 4. Playwright の成功だけでは足りない

- viewport 上の bounding box 確認は有効だが、Windows 実機スクリーンショットでの確認が必要
- 特に「タスクバー」「ブラウザ UI」「表示倍率」は自動テストだけでは取りこぼす

### 5. 没入モードは段階的に直すより、レイアウト原則を決め直した方が早い

- 局所 CSS 修正を重ねると、別フェーズで再発しやすい
- 今回は最終的に「独立スクロール面」「同一縦フロー」「safe area 余白」の3原則へ整理して安定した

---

## 開発メモ

- ユーザー（souma さん）は非エンジニア。ブラウザ操作が必要な箇所では明確に「ここで止まって」と伝える
- PostgreSQL 42501 対策：テーブル作成時は必ず `GRANT ... TO authenticated` を実行する（RLS だけでは不足）
- `noUncheckedIndexedAccess: true` のため、配列アクセス後の narrowing はクロージャ内で効かない → 変数に一度代入してから使う
- E2E では Google OAuth を本物で使わず、テスト用フィクスチャでセッション偽装
