# AGENTS.md — WorkSim（Codex CLI 専用）
# Claude Code を使う場合は CLAUDE.md を参照すること。このファイルは Codex CLI 専用。

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Stack

- Runtime: Node.js 24.x LTS, pnpm
- Language: TypeScript strict mode
- Framework: Next.js 15 系 (App Router)
- Styling: Tailwind CSS v4
- Database & Auth: Supabase (Free tier, Google OAuth)
- Deploy: Vercel (Hobby tier)
- 使用モデル: Sonnet 4.6 をデフォルト、解決困難なエラーのみ Opus 4.7

---

## Commands

- dev: pnpm dev
- test: pnpm test
- lint: pnpm lint
- typecheck: pnpm typecheck
- build: pnpm build
- deploy: vercel --prod

---

## Rules

- 1 ファイル 300 行以内、超えたら分割
- 新機能は対応テストを先に書く（RED→GREEN）
- docs/state.md が SSOT（Single Source of Truth）。完了済みタスクを再実行しない
- エラー 3 回連続で作業を中断し、docs/issues.md に記録してユーザーに報告する
- Supabase の RLS（Row Level Security）を全テーブルに必ず設定
- profiles テーブルに個人名・メールアドレスを保存しない（auth.users にのみ存在）
- シナリオJSON は scenarios/_schema.md のスキーマに準拠
- 公開向け・MVP向けのシナリオJSONに実在する企業名・サービス名・人名を使用しない。実在企業をモデルにする場合も固有名詞は架空の名前に置き換えること
- 企業向けカスタムシナリオでは、契約・許諾・提供素材の範囲で実在の企業名・サービス名を使用してよい。ただし個人名や公開不要の識別情報は最小化し、シナリオJSONとUIの両方で利用範囲を明示すること
- 1職種完成 → ワークフロー検証 → 残職種に展開、の順を厳守
- 大学・学部・志望業界は任意入力。未入力でもプレイ可能
- ASCII 以外を含むパスにファイル作成しない
- .env.local は絶対にGitコミットしない

---

## External Memory（状態管理）

- docs/state.md が SSOT（Single Source of Truth）。セッション開始時に必ず読む。
- docs/state.md に「進行中」とあるタスクが存在する場合、新しい作業を始める前にユーザーに確認する。
- 完了済みタスクを再実行しない。
- エラーが 3 回連続した場合は docs/issues.md に記録し、ユーザーに報告する。
- docs/decisions.md に記録された設計判断を覆す前にユーザーに確認する。

---

## Karpathy 4 Principles

1. Think Before Coding — 曖昧な点があれば実装の前に選択肢を提示する。前提を置かない。
2. Simplicity First — 必要最小限のコードを書く。投機的な機能追加はしない。
3. Surgical Changes — 変更対象を最小限にする。既存スタイルに合わせる。
4. Goal-Driven Execution — 達成条件を明示してから実行し、結果を検証する。

### WorkSim 固有の適用

**Confusion を表面化する例**
- 悪い例：「実装したのでテストもしておきました」
- 良い例：「〜で実装しましたが、vision.md に明示されていないため〜で実装しました。これでよいか確認してください」

**Surgical Changes の例**
- シナリオJSONのスキーマを更新する時、既存の web-engineer.json は破壊しない

**Goal-Driven の例**
- 悪い例：「ログイン画面に Google ボタンを置く」
- 良い例：「US-2（Given/When/Then）が成立する。未ログイン → ボタン押下 → Google承認 → プロフィール画面遷移、までエラーなく動作する」

---

## Coding Standards

**TypeScript**
- `tsconfig.json` で `strict: true`、`noUncheckedIndexedAccess: true`
- `any` 禁止。`unknown` を使い narrowing する
- 関数は引数と戻り値の型を必ず明示
- React コンポーネントは `function MyComponent({ ... }: Props)` 形式

**React / Next.js**
- App Router（`app/` ディレクトリ）使用、Pages Router 禁止
- Server Component をデフォルト、`"use client"` は必要時のみ

**Supabase**
- Service Role Key はサーバー側のみ
- RLS を全テーブルに設定

**命名規則**
- ファイル名：kebab-case
- React コンポーネント：PascalCase
- 関数・変数：camelCase
- 定数：UPPER_SNAKE_CASE

---

## Testing Standards

- **Vitest**：ユニットテスト・統合テスト
- **Playwright**：E2E テスト
- RED → GREEN → REFACTOR の順を厳守
- Supabase はテストでモックする（実 API は叩かない）
- Google OAuth は E2E でも本物を使わず、テスト用フィクスチャでセッション偽装

---

## Security Rules

**収集してよい情報（任意）**：大学名、学部、志望業界

**絶対に収集しない情報**：氏名、生年月日、住所、電話番号、メールアドレス、学籍番号

**API キー管理**
- `SUPABASE_SERVICE_ROLE_KEY`：サーバーのみ
- `.env.local`：Git コミット禁止

---

## File Roles

| ファイル | 役割 |
|---------|------|
| docs/state.md | 現在のタスク状態（SSOT） |
| docs/decisions.md | 永続的な設計判断 |
| docs/issues.md | エラーログ（自動追記） |
| docs/vision.md | プロジェクト仕様書（変更禁止） |
| docs/escape.md | エスカレーション履歴 |

---

## Workflow

**新規タスク開始時:**
1. docs/state.md を読み、未完了タスクから着手
2. docs/decisions.md を読み、過去の判断と矛盾しないか確認
3. テスト先行 → 実装 → レビュー

**シナリオ生成時:**
1. scenarios/_research-plan.md のリサーチ手順を実行
2. 一次情報源（厚労省 job tag、企業公式キャリアページ等）を優先
3. scenarios/_schema.md に準拠した JSON 生成
4. 出典をシナリオ JSON 内 sources フィールドに明記

---

## Note for Codex

This project also has Claude Code configuration in `.claude/`. Do not modify anything under `.claude/`.
The hooks in `.codex/hooks/` implement equivalent behaviors to `.claude/hooks/` using Codex-native output format.
