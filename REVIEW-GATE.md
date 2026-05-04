# REVIEW-GATE.md

## 必須レビュー

以下に該当する変更は `/review` または `codex exec review` を実行する。

- 認証、RLS、DB schema、個人情報、環境変数に触る。
- 外部APIや外部依存を追加する。
- 300行以上の差分。
- アーキテクチャ境界を変える。
- 3回以上同じエラーを修正している。

## 自己レビュー観点

- architect: 依存方向と責務境界が崩れていないか。
- test: regression と negative path が足りているか。
- refactor: 既存挙動を変えず読みやすくなったか。
- security: secret、PII、RLS の事故がないか。
- migration: v8 由来の重複を v9 OS に統合できたか。

## 記録

レビューで見つかった問題は `docs/issues.md` に分類して記録し、修正後に再検証する。
