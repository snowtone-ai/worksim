# CODE-QUALITY.md

## Code Gate

- TypeScript strict を維持する。
- `any` を使わず、`unknown` は narrowing する。
- 汎用名だけの `data`, `result`, `temp`, `foo` を新規に増やさない。
- 1ファイル300行、1関数50行を目安に分割する。
- 空の `catch`、ログだけの握り潰しを避ける。

## Test Gate

- 新機能は対応テストを先に書く。
- バグ修正は再現テストを追加する。
- happy path だけでなく negative path を最低1件検討する。
- Supabase と Google OAuth はテストで実サービスを叩かない。

## Review Gate

- diff は論理単位で説明可能にする。
- 変更理由は `docs/decisions.md` または `docs/design-notes.md` に残す。
- 重大領域は `/review` または `codex exec review` を実行する。
