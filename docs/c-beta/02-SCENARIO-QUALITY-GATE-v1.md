# Scenario Quality Gate v1

## Scene Checklist

各sceneで確認する。

- 職種固有の具体物があるか
- 数字・資料・固有名詞・制約のうち最低2つがあるか
- その職種でしか起きにくい問題か
- 選択肢3つすべてに合理性があるか
- 選択肢3つすべてに代償があるか
- 直後のフィードバックが汎用文ではないか
- 後続シーンへの余波があるか
- 学生の誤解を修正する学びがあるか
- プレイしていて少し緊張感があるか
- 大学PoCで見せても浅くないか

## Fail Conditions

以下に該当する場合はFail。

- この職種名を別職種に置換しても成立する
- 「スピード・正確性・関係者調整」だけで説明できる
- 「まず動く / 確認する / 中長期で考える」の3択になっている
- 「良い点」「リスク」「次の展開」がテンプレ文になっている
- 実務資料がないscene
- ステークホルダーが「先輩」だけで、顧客・上司・他部門・審査・営業・住民などの職種固有圧力がない
- 数字がなく、判断の緊張感が作れていない
- 選択後の余波が次sceneまたはresult summaryに接続していない

## Minimum Review Script

`scripts/c-beta/check-scenario-quality.mjs` で最低限の機械検査を行う。

検出対象:

- 禁止フレーズ
- 同一選択肢文の使い回し
- `workMaterial` の欠落
- `consequenceHook` の欠落
- choice側の `immediateFeedback` / `delayedConsequence` / `nextSceneEffect` / `resultSummaryEffect` 欠落
- `roleSpecificMeters` の欠落
- `branchSummary` の欠落

自然言語の完全判定はしない。明らかなテンプレ劣化を止めるための下限ゲートとして使う。

実行例:

```bash
node scripts/c-beta/check-scenario-quality.mjs
```

対象を明示する場合:

```bash
node scripts/c-beta/check-scenario-quality.mjs scenarios/finance/regional-bank-corporate-loan.json
```
