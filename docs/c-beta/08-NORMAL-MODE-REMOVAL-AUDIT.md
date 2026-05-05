# Normal Mode Removal Audit

## 目的

Cタイプのプレイ体験を immersive mode に一本化するため、normal mode の使用箇所と削除・無効化方針を整理する。

## normal mode の使用箇所

- scenario JSON: `modes` に `normal` が入り、root `scenes` が通常プレイ互換データとして使われていた。
- schema: `modes` は任意配列、`scenes` は互換フィールドとして必須。immersive は `blocks` に保持されていた。
- loader: `ScenarioSchema` と `CatalogItemSchema` が `modes` を文字列配列として読み込む。
- catalog: `scenarios/_catalog.c-alpha.json` で 50 role が normal playable として扱われていた。
- play routes: `/play/[industry]/[role]` が `SceneManager` を使う通常プレイルート。
- UI components: `SceneManager`, `ScenarioIntro`, `TaskEmail`, `TaskMeeting`, `TaskReview`, `TaskDebug`, `SceneFeedback` が通常プレイに紐づく。
- result page: query `m=immersive` がない場合に normal として扱い、replay URL も normal route を指していた。
- analytics: event mode が `normal | immersive` で、default が normal。
- tests/e2e: `us-1`, `us-4`, `us-6` が `/play/it/web-engineer` 通常プレイを前提にしていた。
- scripts/docs: Cα builder/docs に normal mode 前提の記述が残っていた。

## immersive mode 一本化の変更箇所

- catalog と Cβ対象scenario JSONの user-facing `modes` から `normal` を削除する。`modes` フィールド自体は互換のため残す。
- `/play/[industry]` の職種カードは immersive 対応 role のみ「体験する」導線を出す。
- role 名クリックと CTA は `/play/[industry]/[role]/immersive` へ向ける。
- `/play/[industry]/[role]` は互換入口として immersive route へ redirect する。
- result page は replay/recommendation を immersive route に向け、表示上の normal 文言を出さない。
- analytics は UI 体験では immersive を標準とする。
- loader は `blocks[*].scenes` の固定5件制約を緩め、5シーン連続体験を許容する。

## 削除または無効化するもの

- UI上の「通常モード」ボタン。
- catalog 上の normal playable 扱い。
- role selection 後の normal route 遷移。
- normal mode 前提の E2E 期待値。

## 残すもの

- root `scenes`: result scoring と既存 schema 互換のため残す。体験導線では使わない。
- `SceneManager` と task components: 互換コードとして残すが、新規導線からは到達させない。
- normal route: 既存URLの破断を避けるため redirect として残す。
- `modes` フィールド: 既存JSON/loader互換のため残す。ただしUIに `normal` を出さない。

## 互換性リスク

- immersive 未対応 role は normal では遊べなくなるため、catalog 上は準備中扱いにする。
- `blocks[*].scenes` の件数制約を緩めるため、E2E は総シーン数固定ではなく進行可能性を見る。
- root `scenes` は互換用に残るため、review script は `modes` と UI 導線を normal 禁止の主対象にする。

## テスト影響

- シナリオ選択 E2E は role click 後に immersive URL へ遷移する期待へ更新する。
- 通常プレイ E2E は immersive start/progress/result 到達に置き換える。
- result replay link は `/immersive` を期待する。
- loader test は catalog の immersive 件数と normal 不在を確認する。
