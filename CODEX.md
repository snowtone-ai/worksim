# WorkSim — Codex CLI Adapter

Codex は `AGENTS.md` を一次ソースとして読む。`CODEX.md` は実行時の補足だけを置く。

## 起動前提

- 推奨: `codex --sandbox danger-full-access --ask-for-approval never`
- repo-local 設定: `.codex/config.toml`
- hook 定義: `.codex/hooks.json`

## レビュー

- インタラクティブ CLI では `/review` を使う。
- この環境で slash command を直接実行できない場合は、公式 CLI の `codex exec review` を代替として使う。
- `codex-auto-review` のような独立コマンドは使わない。

## Windows

- PowerShell 前提。`&&`、`rm -rf`、Bash heredoc は使わない。
- バックグラウンド起動は `Start-Process -WindowStyle Hidden` を使う。
- `pnpm` を `Start-Process` する場合は `pnpm.cmd` を明示する。
