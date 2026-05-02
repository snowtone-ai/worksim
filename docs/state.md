# State — 現在のタスク状態（SSOT）

このファイルは進行中タスクの **唯一の真実の源（Single Source of Truth）**。
Claude Code はセッション開始時に必ずこれを読み、完了済みタスクを再実行しない。

---

## 現在のフェーズ

**Phase 2：認証・プロフィール**

---

## Phase 1 タスク（着手順）

- [x] **T1.1**：`pnpm` を確認（pnpm 10.33.0 確認済み）
- [x] **T1.2**：Next.js 16.2.4（最新）プロジェクト初期化（TypeScript・Tailwind v4・App Router・src/ディレクトリ・@/* エイリアス）
- [x] **T1.3**：`tsconfig.json` を strict + noUncheckedIndexedAccess に設定済み
- [x] **T1.4**：`@supabase/ssr`、`@supabase/supabase-js`、`zod`、`vitest`、`@playwright/test`、`@testing-library/react`、`@testing-library/jest-dom` インストール済み
- [x] **T1.5**：`pnpm dev` → HTTP 200 確認済み
- [x] **T1.6**：Git 初期化、`main` ブランチ作成、初回コミット完了（42 files）
- [x] **T1.7**：GitHub リポジトリ作成済み（snowtone-ai/worksim）**ユーザーが事前に実施**
- [x] **T1.8**：GitHub にプッシュ済み（origin/main）
- [x] **T1.9**：Vercel デプロイ確認済み、URL メモ済み
- [x] **T1.10**：Supabase プロジェクト作成済み（Northeast Asia / Tokyo）
- [x] **T1.11**：`.env.local` 作成済み（URL・anon key・service_role key）
- [x] **T1.12**：Vercel 環境変数設定済み
- [x] **T1.13**：Google OAuth クライアント作成済み、`.env.local` に追記済み
- [x] **T1.14**：Supabase Google プロバイダ有効化済み
- [x] **T1.15**：GitHub Actions keep-alive cron 作成・プッシュ済み、GitHub Secrets 設定済み

---

## Phase 2 以降（先行プレビュー、未着手）

### Phase 2：認証・プロフィール
- [x] T2.1：Supabase クライアント実装（client / server 両方）
- [x] T2.2：profiles テーブル作成（マイグレーション SQL）+ RLS（supabase/migrations/001_create_profiles.sql）
- [x] T2.3：Google ログイン UI 実装（ログイン → callback → リダイレクト）
- [x] T2.4：プロフィール任意入力フォーム実装
- [ ] T2.5：US-2、US-3 の E2E テスト追加（Phase 2 完了後に実施）

### Phase 3：シナリオ基盤
- T3.1：scenarios/_schema.md 確定（JSON Schema 形式で）
- T3.2：scenarios/_research-plan.md 確定
- T3.3：シナリオローダー（lib/scenario/loader.ts）+ Zod バリデーション
- T3.4：シーンマネージャー（features/play/scene-manager.tsx）
- T3.5：共通タスク UI（メール / 会議 / メモ）の骨格

### Phase 4：Webエンジニア職完全実装
- T4.1：リサーチ実行（厚労省 job tag、業界記事を web_search で）
- T4.2：scenarios/it/web-engineer.json 生成（出典つき）
- T4.3：全タスクUI 実装（5〜8 タスク想定）
- T4.4：適性スコア計算ロジック（lib/scoring/calculator.ts）
- T4.5：結果画面 + SNS シェア（html2canvas で画像生成）
- T4.6：play_sessions テーブル作成 + RLS
- T4.7：US-1〜US-10 の E2E テスト全部 GREEN

### Phase 5：ワークフロー文書化
- T5.1：`scenarios/_research-plan.md` を実体験に基づき更新
- T5.2：「次の職種を作る手順」セクションを Claude Code 自身が書く

### Phase 6 以降は Phase 5 完了後に詳細化

---

## 完了済みタスク

（まだなし）

---

## 開発メモ

- ユーザー（souma さん）は非エンジニア。ブラウザ操作が必要な箇所では明確に「ここで止まって」と伝える
- ユーザー操作が必要なタスクは `**ユーザー操作が必要**` を必ず付ける
- エラー 3 回連続で `/escape` を発動
