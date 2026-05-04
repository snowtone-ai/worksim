# WorkSim — Claude Code Adapter

このプロジェクトは pm-zero v9.0 ベースです。一次ソースは `AGENTS.md` です。

@AGENTS.md
@.claude/rules/karpathy.md
@.claude/rules/coding-standards.md
@.claude/rules/testing.md
@.claude/rules/security.md

<claude_specific>
- Claude Code でも `docs/state.md` と `docs/decisions.md` を必ず読む。
- 並列作業はファイル所有範囲を分け、他者の差分を戻さない。
- Hook は `.claude/settings.json` と `.claude/hooks/` を参照する。
- 完了報告は `HANDOFF-JA.md` の日本語形式に従う。
</claude_specific>
