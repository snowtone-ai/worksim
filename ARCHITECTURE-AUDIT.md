# ARCHITECTURE-AUDIT.md

## 監査日

2026-05-04

## 現状要約

WorkSim MVP は Next.js App Router、Supabase SSR、scenario JSON、React UI、Vitest、Playwright で構成されている。
主要導線は baseline 検証で GREEN。今回の v9 移行では UI/API/DB の大変更は行わず、Repository OS、検証、レビュー、記録の運用性を上げる。

| 領域 | 主要ディレクトリ | 役割 | 現在の問題 | 改善方針 | 影響範囲 | 優先度 | 変更可否 | MVP破壊リスク |
|---|---|---|---|---|---|---|---|---|
| routing | `src/app` | App Router pages, auth callback | page が UI composition と auth redirect を持つ | Server Component 既定を維持し、auth helper は `src/lib` に閉じる | 中 | 中 | 小変更可 | 中 |
| UI | `src/features` | play/auth components | 一部 immersive UI が大きめ | 300行超過なし。次の職種展開時に細分化 | 中 | 中 | 小変更可 | 中 |
| domain | `src/lib/scoring` | スコア計算 | negative path が少なめ | decode/invalid answers の回帰テスト追加 | 小 | 高 | 可 | 低 |
| validation | `src/lib/scenario` | Zod schema, loader | JSON schema と loader の同期が重要 | schema変更時は JSON と test を同時更新 | 中 | 高 | 慎重に可 | 高 |
| data | `src/data`, `scenarios` | 静的データ、シナリオ | 残5職種未作成 | 1職種完成ワークフローを維持 | 中 | 中 | 可 | 中 |
| auth/db | `src/lib/supabase`, `src/proxy.ts` | Supabase SSR, request guard | RLS と GRANT が運用依存 | migration と SECURITY に明文化 | 中 | 高 | 慎重に可 | 高 |
| verification | `e2e`, `vitest`, `scripts` | regression gate | 統一入口がなかった | `pnpm verify` を追加 | 小 | 高 | 可 | 低 |
| docs/os | root docs, `docs/*` | Repository OS | v8 と v9 の重複 | `AGENTS.md` を一次ソース化 | 小 | 高 | 可 | 低 |

## 重点チェック

- UI/domain/data/state/validation の責務混在: 重大な混在なし。`src/app` は page composition と redirect を持つが許容範囲。
- 依存方向: `src/features` から `src/lib` への一方向。逆依存は見つからない。
- 循環依存: 手動確認では兆候なし。将来は dependency-cruiser 導入候補。
- 巨大ファイル: 300行超なし。最大は `src/data/universities.ts` 262行。
- 巨大関数: 明確な50行超の高リスク関数はなし。immersive UI は将来分割候補。
- 曖昧命名: テスト内の `result` は許容。新規実装ではドメイン名を優先する。
- エラー握り潰し: `decodeAnswers` はユーザー入力防御として `{}` fallback。テストで仕様化する。
- happy path偏重: E2E は主要導線を網羅。unit negative path を追加する。
- docs/実装不一致: README と旧AGENTSが Next.js 15 表記だったが、実装は 16.2.4。v9移行で修正対象。
- v8.0残骸: `AGENTS.md` が Codex専用、`CLAUDE.md` が重複。v9で primary/adapter に整理。
- v9.0形骸化リスク: `pnpm verify` と Reference Gate を完了条件に入れて抑制する。

## 次の改善候補

- `src/features/play/immersive/*` を block navigation、answer state、presentation に分ける。
- `src/app/play/[industry]/[role]/result/page.tsx` の結果表示 UI を component 化する。
- scenario fixture を増やし、schema の failure case を厚くする。
