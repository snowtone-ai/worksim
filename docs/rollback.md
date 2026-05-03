# Rollback 手順

## Codex 移行前の状態に戻す

コミットハッシュ: `cc79ff0`  
タグ: `pre-codex-migration`

### 手順

```bash
# 1. 現在のブランチ・変更を確認
git status
git log --oneline -5

# 2. feature/codex-migration ブランチを削除（必要な場合）
git branch -d feature/codex-migration

# 3. main ブランチで pre-codex-migration タグに戻す
git checkout main
git reset --hard pre-codex-migration

# 4. 追加された Codex 関連ファイルを削除（必要な場合）
# AGENTS.md、.codex/ ディレクトリは git reset --hard で自動削除される
```

### 移行で追加されたファイル一覧

追加のみ（削除・変更なし）のため、rollback は git reset --hard で完結する。

| ファイル | 説明 |
|---------|------|
| `AGENTS.md` | Codex CLI 用指示ファイル |
| `.codex/hooks.json` | Codex フック設定 |
| `.codex/hooks/inject-state.mjs` | SessionStart フック |
| `.codex/hooks/block-dangerous.mjs` | PreToolUse フック |
| `.codex/hooks/update-state.mjs` | PostToolUse フック |
| `.codex/hooks/stop-guard.mjs` | Stop フック |
| `.codex/config.toml` | Codex 最小設定 |

### 変更されていないファイル（移行後も保持）

- `CLAUDE.md` — 変更なし
- `.claude/` 以下 — 変更なし
- `docs/state.md` — 変更なし
- `docs/decisions.md` — 変更なし
- `docs/issues.md` — 変更なし
- `vision.md` — 変更なし
