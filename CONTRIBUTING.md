# 開発環境

このプロジェクトは pm-zero v9.0 の Repository OS に従い、Codex CLI を第一想定、Claude Code CLI を fallback として編集できます。

## Claude Code CLI で起動

```
claude --permission-mode bypassPermissions
```

## Codex CLI で起動

```
codex
```

## 共有ファイル(両 CLI 共通)

| ファイル | 役割 |
|---------|------|
| docs/state.md | タスク状態 SSOT(セッション開始時に必ず読む) |
| docs/decisions.md | 永続的な設計判断 |
| docs/issues.md | エラーログ |
| docs/vision.md | プロジェクト仕様書 |

## CLI 固有ファイル

| ファイル / ディレクトリ | 対象 CLI |
|----------------------|---------|
| AGENTS.md | 一次ソース(両 CLI 共通) |
| CLAUDE.md | Claude Code Adapter |
| .claude/ | Claude Code CLI |
| CODEX.md | Codex CLI Adapter |
| .codex/ | Codex CLI |
