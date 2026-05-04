# ARCHITECTURE-RULES.md

## 依存方向

- `src/app`: ルーティング、Server Component、ページ単位の composition。
- `src/features`: 画面機能ごとの UI と軽い interaction。
- `src/lib`: domain logic、validation、server/client helper。
- `src/data`: 静的データ。
- `scenarios`: シナリオ JSON とスキーマ。

UI から直接 DB や外部 API を増やす場合は、Server Action または `src/lib` に境界を置く。

## 変更方針

- App Router の URL 構造は `src/app` に閉じる。
- scoring、scenario validation は UI から分離する。
- Supabase helper は `src/lib/supabase` に閉じる。
- シナリオ構造変更は `_schema.md`、loader、既存 JSON、テストを同時に更新する。

## 監査対象

- 循環依存。
- 巨大ファイルと巨大関数。
- UI/domain/data/state/validation の責務混在。
- エラー握り潰し。
- テストと docs の不一致。
