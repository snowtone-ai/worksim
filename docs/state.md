# State — 現在のタスク状態（SSOT）

このファイルは進行中タスクの **唯一の真実の源（Single Source of Truth）**。
Claude Code はセッション開始時に必ずこれを読み、完了済みタスクを再実行しない。

---

## 現在のフェーズ

**Phase 4：Webエンジニア職完全実装（T4.7 実施中）**

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
- [ ] T2.5：US-2、US-3 の E2E テスト（T4.7 と合わせて実施）

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
- [ ] T4.7：E2E テスト GREEN（US-1〜US-10）

---

## Phase 5：ワークフロー文書化

- [ ] T5.1：scenarios/_research-plan.md を実体験に基づき更新
- [ ] T5.2：「次の職種を作る手順」セクションを書く

---

## 未解決バグ

### BUG-001：DialogueScene の confirm ボタンが非表示（会議ブロック11〜15フェーズ）

**症状**  
会議室ブロック（phases 11–15）で選択肢を選んでも「次へ →」ボタンが表示されない。ランチブロック（phases 6–10）は正常。

**確定している事実**  
- `selectedChoice` は truthy（選択肢のハイライトが動作している）  
- ボタンは DOM に存在する（invisible 方式に変更後も確認）  
- ボタンは親コンテナの `overflow: hidden` によってクリップされている（visible area の外）  

**試した CSS 修正（いずれも解決せず）**  
1. 選択肢・ボタンを `flex-1 overflow-y-auto` から `flex-none` フッターへ移動  
2. `{selectedChoice && <button>}` を常時レンダリング＋`invisible` クラスで切り替え  

**未試行の仮説**  
- `flex-1 overflow-y-auto` コンテンツ領域に `min-h-0` を追加すれば縮小できる可能性  
- DialogueScene の構造を DeskScene の SceneModal（`max-h-[88vh]` モーダル方式）と同様に全面リライトする  
- CSS Flexbox をやめて CSS Grid で再設計する  

**関連ファイル**  
`src/features/play/immersive/dialogue-scene.tsx`（lines 43–99）

---

## 開発メモ

- ユーザー（souma さん）は非エンジニア。ブラウザ操作が必要な箇所では明確に「ここで止まって」と伝える
- PostgreSQL 42501 対策：テーブル作成時は必ず `GRANT ... TO authenticated` を実行する（RLS だけでは不足）
- `noUncheckedIndexedAccess: true` のため、配列アクセス後の narrowing はクロージャ内で効かない → 変数に一度代入してから使う
- E2E では Google OAuth を本物で使わず、テスト用フィクスチャでセッション偽装
