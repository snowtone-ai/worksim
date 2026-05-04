# MODEL-ROUTING.md

## WorkSim の配分

- 通常実装: Codex CLI / GPT-5.5 / high。
- 軽量修正: GPT-5.4 系でも可。ただし最終検証は同じ。
- 難しい障害解析: GPT-5.5 high 以上。3回失敗したら `docs/escape.md` に記録して再開条件を明示する。
- Claude Code fallback: `CLAUDE.md` から `AGENTS.md` を参照し、同じ品質ゲートを使う。

## レビュー

- 通常差分: Codex CLI `/review` または `codex exec review`。
- 認証、DB、RLS、セキュリティ、外部API、300行超の差分: 別ベンダーのレビューを推奨。

## 禁止

- CLIやモデルの架空機能名を運用文書に書かない。
- 実行できないレビューコマンドを完了条件にしない。使えない場合は代替レビューと記録で補う。
