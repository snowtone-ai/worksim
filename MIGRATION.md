# MIGRATION.md

## 目的

pm-zero v8.0 で完成した WorkSim MVP を、pm-zero v9.0 の vendor-neutral Repository OS に移行する。

## 方針

- `AGENTS.md` を一次ソースにする。
- `CLAUDE.md` は薄い adapter にする。
- Codex-first、Claude Code fallback を維持する。
- External Memory を `MEMORY.md` で明文化する。
- `scripts/verify.mjs` を検証の統一入口にする。
- UI/API/DB の大変更は今回行わない。

## Rollback

- rollback tag: `pre-pm-zero-v9-migration`
- 詳細: `MIGRATION-ROLLBACK.md`

## 移行後確認

- `pnpm verify`
- `codex exec review` または interactive `/review`
- `docs/state.md` と `docs/decisions.md` の更新確認
