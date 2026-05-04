# MEMORY.md

## 目的

LLM の一時的な文脈に依存せず、プロジェクト状態をリポジトリ内の監査可能なファイルで管理する。

## ファイル責務

- `vision.md`: プロダクト仕様、Given/When/Then、MVP範囲。
- `docs/state.md`: 現在状態の SSOT。完了済み、進行中、未着手を管理する。
- `docs/decisions.md`: 永続判断。技術選定、設計判断、Reference Gate URLを保持する。
- `docs/issues.md`: 失敗ログ。既存エラーと今回発生エラーを分ける。
- `docs/escape.md`: 3回連続失敗時の停止、再開条件、エスカレーション履歴。
- `docs/xp-rules.md`: プロジェクト横断の教訓。最大10項目。
- `docs/design-notes.md`: 将来変更可能性、技術的負債、保留判断。

## 読み書き原則

- セッション開始時に `docs/state.md` と `docs/decisions.md` を読む。
- `docs/state.md` に完了済みとある作業は再実行しない。
- `docs/decisions.md` にある判断を覆す場合はユーザー確認を挟む。
- Reference Gate 未達の大きな UI/API/データモデル/アーキテクチャ変更に着手しない。
- 失敗は `docs/issues.md` に分類して残す。

## 更新タイミング

- 状態変化: `docs/state.md`
- 永続判断: `docs/decisions.md`
- 失敗: `docs/issues.md`
- 3回連続失敗: `docs/escape.md`
- 将来見直す判断: `docs/design-notes.md`
