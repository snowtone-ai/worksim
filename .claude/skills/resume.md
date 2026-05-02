---
name: resume
description: セッション再開。docs/state.md と docs/decisions.md を読み込み、続きから再開する。
---

# /resume — セッション再開

以下の順で実行してください：

1. `docs/state.md` を読み込む
2. `docs/decisions.md` を読み込む
3. `docs/issues.md` を読み込む（直近のエラーを把握）
4. 現在のフェーズと未完了タスクをユーザーに要約して報告する
5. 最後に「どこから続けますか？」と聞く前に、未完了の先頭タスクを提案する

## 報告フォーマット

```
【WorkSim セッション再開】
現在フェーズ: Phase X — <フェーズ名>
未完了タスク: T-XX <タスク名>（全X件中X件完了）

次に着手するタスク: T-XX <タスク名>
このまま進めますか？
```
