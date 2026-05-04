# Last Updated: 2026-05-04 08:21

# State — 現在のタスク状態（SSOT）

このファイルは進行中タスクの **唯一の真実の源（Single Source of Truth）**。
Claude Code はセッション開始時に必ずこれを読み、完了済みタスクを再実行しない。

---

## 現在のフェーズ

**MVP v1 完成（Phase 5 完了） / pm-zero v9.0 Repository OS 移行完了（未push）**

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
