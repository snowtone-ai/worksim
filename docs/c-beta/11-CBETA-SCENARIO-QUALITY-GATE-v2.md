# Cβ Scenario Quality Gate v2

## 前提

- immersive only
- normal mode禁止
- 同一シーン反復禁止
- 1日の連続体験
- 1シナリオ = exactly 5 scenes / 5 tasks

## Required Checks

- openingHook必須
- workMaterial必須
- roleWorkKernel必須
- structured roleWorkKernel必須
- roleWorkKernel.input / output / transformation / nonGenericReason 必須
- roleWorkKernel.constraints / workArtifacts / metrics / failureModes / evaluationCriteria は各2件以上
- roleCoreFriction必須
- roleMisconception必須
- roleRealityReveal必須
- roleSpecificity必須
- meterEffects必須
- misconceptionEffect必須
- resultFeedback必須
- exactly 5 scenesの連続体験
- 各シーンに stakeholderPressure / timePressure / decisionTradeoff がある
- 各 choice に good / risk / immediate / delayed / next / result がある

## Cβ標準構成

- 1職種 = 5 scenes / 5 tasks
- 1 scene = 1つの実務判断単位
- 選択回数を増やすより、仕事材料・数字・判断基準・職種固有の失敗リスクの密度を優先する
- deep modeは将来拡張であり、Cβ標準には含めない
- Cβでは5 scenesを超える分割を行わない

## Anti-Generic Stakeholder Coordination Rule

WorkSimのCβシナリオでは、ステークホルダー調整そのものを職業体験の主役にしてはならない。

各シーンの主役は、必ずその職種固有の仕事材料・数字・成果物・判断基準・失敗リスクであること。

顧客、上司、他部署、締切は、職種固有の判断を浮かび上がらせるための圧力装置として使う。

職種名だけを置換して成立する「汎用調整シーン」はFailとする。

## Role Specificity Checks

各シーンは以下を満たすこと。

- その職種固有の資料・成果物・数値が最低2つ以上ある
- その職種固有の失敗リスクがある
- その職種固有の評価基準がある
- 選択肢が単なる「寄り添う / バランスを取る / 厳しくする」になっていない
- ステークホルダー会話だけで判断が成立する場合はFail
- 職種名を別職種に置換しても成立する場合はFail
- 仕事材料を外しても成立するシーンはFail

必須metadata:

- roleSpecificity.coreDecisionPrimitive
- roleSpecificity.roleSpecificMaterials
- roleSpecificity.roleSpecificMetrics
- roleSpecificity.roleSpecificFailureRisk
- roleSpecificity.roleSpecificEvaluationCriteria
- roleSpecificity.genericCoordinationRisk
- roleSpecificity.antiGenericDesignNote
- roleSpecificity.kernelConnection

Warning checks:

- coreDecisionPrimitiveが汎用語だけになっている
- 同一scenario内でcoreDecisionPrimitiveが反復している
- roleSpecificMaterials / roleSpecificMetrics がworkMaterialやscene textに接続していない
- workMaterialに数字がない
- choiceが寄り添う/バランス/厳しくするだけに見える
- roleWorkKernelのnonGenericReasonが弱い

## Decision Primitive Diversity

Cβシナリオでは、全職種を「ステークホルダー調整」で統一してはならない。

各sceneは、職種固有のdecision primitiveを持つ。

同じ「調整」でも、銀行では返済原資・保全・稟議に関する判断であり、商品企画では原価・品質表示・初回数量に関する判断である。

例:

- 金融: 返済原資評価、保証条件設計、期待値管理、稟議説明補強、条件付き最終回答
- 商品企画: 顧客不満の仕様化、原価制約下の仕様削減、根拠ある売り文句設計、品質表示リスク判定、初回数量と発売条件判断

## 職種名置換テスト

職種名だけを別職種に置換しても成立するシーンは Fail。仕事材料、数字、登場部門、意思決定の圧がその職種固有であることを確認する。

## 文章品質チェック

- 書き出しがメール、通知、顧客発言、数字の異常、締切直前のいずれか
- 状況説明より仕事材料と会話が先にある
- 1文が長すぎない
- 数字、時刻、期限、資料名が入っている
- NPCが利害を持っている
- 小説化しすぎず、実務資料が残っている

## 大学PoCチェック

- 学生の優劣判定ではなく職業理解を返す
- 誤解修正が結果に出る
- 匿名集計できる universityInsightTags がある
- 個人選別に使うデータ設計になっていない

## Fail Conditions

- 通常モードが残っている
- 5 scenes以外になっている
- 同じ5 scenesが時間帯だけ変えて繰り返されている
- 仕事材料がない
- roleWorkKernelがない
- roleSpecificityがない
- 仕事材料を外しても判断が成立する
- 汎用3択
- 抽象テンプレート
- 結果が点数だけ
- 誤解修正がない
- 文章が説明文だけ
- 小説化しすぎて実務資料が消えている
