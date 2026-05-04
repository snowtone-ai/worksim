# OS-KERNEL.md

WorkSim の Repository OS は、AI の短期文脈ではなく、リポジトリ上の文書と検証コマンドを一次ソースにする。

## 原則

- `AGENTS.md` が共通 OS Kernel。CLI 固有差分は adapter に閉じ込める。
- External Memory は `docs/` と `vision.md` に置く。判断、状態、失敗を会話だけに残さない。
- 仕様変更は Reference Gate と decisions 記録を通してから実装する。
- 既存MVPの主要導線を壊さない。削る場合はユーザー承認を得る。
- コードは将来の人間がレビュー、変更、削除できる単位に保つ。

## MVP で壊してはいけない導線

- Google OAuth 経由の認証導線。
- 任意プロフィールを空でスキップできる導線。
- Webエンジニア通常モードのプレイ開始から結果表示。
- 没入モードの会話系スクロールと結果表示。
- Supabase RLS と個人情報最小化方針。
- シナリオ JSON の `scenarios/_schema.md` 準拠。
