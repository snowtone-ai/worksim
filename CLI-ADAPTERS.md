# CLI-ADAPTERS.md

## 共通

- 一次指示: `AGENTS.md`
- 状態: `docs/state.md`
- 判断: `docs/decisions.md`
- 検証: `pnpm verify`
- 完了報告: `HANDOFF-JA.md`

## Codex CLI

- 設定: `.codex/config.toml`
- Hook: `.codex/hooks.json` と `.codex/hooks/*.mjs`
- Review: interactive `/review`。この環境で直接使えない場合は `codex exec review`。
- PowerShell では `Start-Process pnpm.cmd` を使う。

## Claude Code

- Adapter: `CLAUDE.md`
- 設定: `.claude/settings.json`
- 既存 `.claude/rules/*` は fallback 用に残す。
- `AGENTS.md` と重複したルールは `AGENTS.md` を優先する。

## MCP

`.mcp.json` は存在させるが、未検証サーバー名は登録しない。必要になった時点で公式ドキュメントを確認して追加する。
