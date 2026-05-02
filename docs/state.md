# State — 現在のタスク状態（SSOT）

このファイルは進行中タスクの **唯一の真実の源（Single Source of Truth）**。
Claude Code はセッション開始時に必ずこれを読み、完了済みタスクを再実行しない。

---

## 現在のフェーズ

**Phase 1：環境セットアップ**

---

## Phase 1 タスク（着手順）

- [ ] **T1.1**：`pnpm` を確認（なければインストール手順を案内）
- [ ] **T1.2**：Next.js 15 系プロジェクト初期化（`pnpx create-next-app@latest .` を WorkSim フォルダ内で実行、TypeScript・Tailwind・App Router 全部 Yes、`src/`ディレクトリは Yes、import alias デフォルト）
- [ ] **T1.3**：`tsconfig.json` を strict + noUncheckedIndexedAccess に設定
- [ ] **T1.4**：必要パッケージ追加（`@supabase/ssr`、`@supabase/supabase-js`、`zod`、`vitest`、`@playwright/test`、`@testing-library/react`、`@testing-library/jest-dom`）
- [ ] **T1.5**：`pnpm dev` で起動確認、http://localhost:3000 が表示されることを確認
- [ ] **T1.6**：Git 初期化、`main` ブランチ作成、初回コミット
- [ ] **T1.7**：GitHub リポジトリ作成案内（snowtone-ai/worksim、private 推奨）。**ユーザー操作が必要**
- [ ] **T1.8**：GitHub にプッシュ
- [ ] **T1.9**：Vercel アカウント作成・GitHub 連携の案内（**ユーザー操作が必要**）。Vercel に Import → デプロイ確認
- [ ] **T1.10**：Supabase アカウント作成・新規プロジェクト作成の案内（**ユーザー操作が必要**、リージョン Northeast Asia (Tokyo)）
- [ ] **T1.11**：Supabase の URL・anon key・service_role key を取得 → `.env.local` 作成
- [ ] **T1.12**：Vercel の Environment Variables に `.env.local` の内容を設定
- [ ] **T1.13**：Google Cloud Console で OAuth クライアント作成案内（**ユーザー操作が必要**）
- [ ] **T1.14**：Supabase Dashboard で Google プロバイダ有効化案内（**ユーザー操作が必要**）
- [ ] **T1.15**：GitHub Actions で Supabase keep-alive cron を作成（5日に1回 SELECT 1 を実行）

---

## Phase 2 以降（先行プレビュー、未着手）

### Phase 2：認証・プロフィール
- T2.1：Supabase クライアント実装（client / server 両方）
- T2.2：profiles テーブル作成（マイグレーション SQL）+ RLS
- T2.3：Google ログイン UI 実装（ログイン → callback → リダイレクト）
- T2.4：プロフィール任意入力フォーム実装
- T2.5：US-2、US-3 の E2E テスト追加

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
