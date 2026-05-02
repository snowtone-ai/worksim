# WorkSim — CLAUDE.md

<stack>
- Runtime: Node.js 24.x LTS, pnpm
- Language: TypeScript strict mode
- Framework: Next.js 15 系 (App Router)
- Styling: Tailwind CSS v4
- Database & Auth: Supabase (Free tier, Google OAuth)
- Deploy: Vercel (Hobby tier)
- 使用モデル: Sonnet 4.6 をデフォルト、解決困難なエラーのみ Opus 4.7
</stack>

<commands>
- dev: pnpm dev
- test: pnpm test
- lint: pnpm lint
- typecheck: pnpm typecheck
- build: pnpm build
- deploy: vercel --prod
</commands>

<rules>
- 1 ファイル 300 行以内、超えたら分割
- 新機能は対応テストを先に書く（RED→GREEN）
- docs/state.md が SSOT（Single Source of Truth）。完了済みタスクを再実行しない
- エラー 3 回連続で /escape
- Supabase の RLS（Row Level Security）を全テーブルに必ず設定
- profiles テーブルに個人名・メールアドレスを保存しない（auth.users にのみ存在）
- シナリオJSON は scenarios/_schema.md のスキーマに準拠
- 1職種完成 → ワークフロー検証 → 残職種に展開、の順を厳守
- 大学・学部・志望業界は任意入力。未入力でもプレイ可能
- ASCII 以外を含むパスにファイル作成しない
- .env.local は絶対にGitコミットしない
</rules>

<imports>
@.claude/rules/karpathy.md
@.claude/rules/coding-standards.md
@.claude/rules/testing.md
@.claude/rules/security.md
</imports>

<workflow>
新規タスク開始時:
1. docs/state.md を読み、未完了タスクから着手
2. docs/decisions.md を読み、過去の判断と矛盾しないか確認
3. テスト先行（test-writer）→ 実装（implementer）→ レビュー（pr-reviewer）

シナリオ生成時:
1. scenarios/_research-plan.md のリサーチ手順を実行
2. 一次情報源（厚労省 job tag、企業公式キャリアページ等）を優先
3. scenarios/_schema.md に準拠した JSON 生成
4. 出典をシナリオ JSON 内 sources フィールドに明記

ユーザー操作が必要な箇所:
- 「ここで止まって」と明示
- 必要なブラウザ操作・APIキー取得手順を箇条書きで案内
- 完了後の確認方法を提示
</workflow>
