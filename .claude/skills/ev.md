---
name: ev
description: 教訓抽出。プロジェクト完了時またはフェーズ完了時に実行。docs/issues.md から学びを抽出し、xp-rules.md 候補を提示する。
---

# /ev — 教訓抽出（Evaluate）

フェーズ完了時またはプロジェクト完了時に実行します。

## 実行手順

1. `docs/issues.md` を読み込む（失敗ログ）
2. `docs/decisions.md` を読み込む（設計判断）
3. 以下のフォーマットで教訓を3〜5件抽出する：

```
【/ev — 教訓候補】

1. 発生状況: <いつ・何で発生したか>
   根本原因: <なぜ起きたか>
   ルール案: <次回どうするか>

2. ...
```

4. 「xp-rules.md に追加しますか？」と確認する

5. 承認されたものを `xp-rules.md` に追記する（上限10件）

## xp-rules.md の場所

プロジェクトルートの `xp-rules.md`（Claude.ai Project Knowledge に再アップロードすると次プロジェクトに引き継がれる）
