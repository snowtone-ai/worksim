# Design Notes

将来変更可能性、保留判断、技術的負債を記録する。

## 2026-05-04: pm-zero v9.0 移行の範囲

- 今回は Repository OS、verification、handoff、quality gate を主対象にする。
- UI/API/DB schema の大変更は行わない。
- `.mcp.json` は空の `mcpServers` で作成し、未確認 MCP サーバー名は登録しない。
- `scripts/verify.mjs` は重いが、MVP 完了報告前の実効 gate として E2E と browser smoke まで実行する。

## 将来見直し候補

- `src/features/play/immersive` の state 管理分割。
- result page の UI component 化。
- dependency-cruiser または madge による依存方向の自動検査。
- MCP サーバーを導入する場合は公式ドキュメント確認後に `.mcp.json` を更新する。
