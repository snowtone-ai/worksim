# Cβ Narrative Scenario OS v1

## 1. Cタイプ定義

Cタイプは、業界・職種の代表的な実務葛藤を、1日の意思決定ゲームとして体験させるもの。

## 2. Bタイプとの差分

Bタイプは企業固有シナリオ、採用広報、企業理解に使う。Cタイプは企業固有の正確性より、職種理解に効く代表的葛藤を重視する。

## 3. Narrative Game Structure

各シナリオは以下を持つ。

- roleCoreFriction
- roleMisconception
- roleRealityReveal
- roleWorkKernel
- centralQuestion
- dayTimeline
- sceneList
- roleSpecificMeters
- resultTypes
- universityInsightTags

## 4. Scene Anatomy

各シーンは以下を持つ。

- time
- sceneTitle
- openingHook
- presenter
- roleSpecificContext
- hiddenWorkReality
- workMaterial
- roleSpecificity
- stakeholderPressure
- timePressure
- missingInformation
- decisionTradeoff
- npcDialogue
- decisionPrompt
- choices
- consequenceHook
- nextSceneEcho

## 5. Choice Anatomy

各choiceは以下を持つ。

- label
- actionText
- rationale
- good
- risk
- immediate
- delayed
- next
- result
- meterEffects
- misconceptionEffect
- universityInsightTags

## 6. Editorial Style

- まず仕事材料で引き込む
- 状況説明より会話と資料
- 1シーン1葛藤
- 1シーン1圧力
- 1シーン1誤解修正
- 1シーン1つの「学生が知らない仕事の裏側」
- 全選択肢に合理性と代償
- 抽象語禁止
- 読ませるが、小説化しすぎない

## 7. Result Feedback

結果画面では以下を返す。

- resultType
- dominantMeters
- sacrificedMeters
- roleRealityReveal
- misconceptionCorrection
- decisionPatternSummary
- careerReflectionPrompt
- universityInsightTags
- nextRecommendedScenarios

## 8. Cβ標準構成

Cβ標準構成:

- 1職種 = 5 scenes / 5 tasks
- 1 scene = 1つの実務判断単位
- 選択回数を増やすより、仕事材料・数字・判断基準・職種固有の失敗リスクの密度を優先する
- deep modeは将来拡張であり、Cβ標準には含めない
- Cβでは5 scenesを超える分割を行わない

## 9. Anti-Generic Stakeholder Coordination Rule

WorkSimのCβシナリオでは、ステークホルダー調整そのものを職業体験の主役にしてはならない。

各シーンの主役は、必ずその職種固有の仕事材料・数字・成果物・判断基準・失敗リスクであること。

顧客、上司、他部署、締切は、職種固有の判断を浮かび上がらせるための圧力装置として使う。

職種名だけを置換して成立する「汎用調整シーン」はFailとする。

## 10. Role Work Kernel

`roleWorkKernel` は「この職種は、何を何に変換する仕事か？」を構造化objectで定義する。

Canonical Cβ fields:

- input
- output
- transformation
- constraints
- workArtifacts
- metrics
- failureModes
- evaluationCriteria
- nonGenericReason

例:

- 地方銀行 法人営業/融資担当: 顧客の資金不安を、返済原資・保全・保証・条件・記録を備えた融資案に変換する仕事。
- 商品企画: 顧客の不満と市場機会を、原価・製造・品質保証・営業・ブランドに通る発売仕様と発売条件に変換する仕事。

## 11. Role Specificity

各sceneは `roleSpecificity` を持つ。

- `coreDecisionPrimitive`: そのシーンの本質的な判断操作
- `roleSpecificMaterials`: その職種固有の資料・成果物
- `roleSpecificMetrics`: その職種固有の数字・評価指標
- `roleSpecificFailureRisk`: その職種固有の失敗
- `roleSpecificEvaluationCriteria`: その職種で良い判断とされる基準
- `genericCoordinationRisk`: 汎用調整ゲームに見える危険
- `antiGenericDesignNote`: その危険をどう避けたか
- `kernelConnection`: sceneの仕事材料がscenario-level `roleWorkKernel` のどの変換工程に接続するか

Cβシナリオでは、全職種を「ステークホルダー調整」で統一してはならない。

各sceneは、職種固有のdecision primitiveを持つ。

同じ「調整」でも、銀行では返済原資・保全・稟議に関する判断であり、商品企画では原価・品質表示・初回数量に関する判断である。

## 12. Role Differentiation Sheet

### 職種名

### roleWorkKernel
この職種は、何を何に変換する仕事か？

### 主に見る資料
- 
- 
- 

### 主に動かす変数
- 
- 
- 

### 恐れる失敗
- 
- 
- 

### 職種固有の評価基準
- 
- 
- 

### 職種固有の葛藤
- 

### この職種でしか成立しない選択
- 
- 
- 

### 汎用調整に見える危険
- 

### それを避ける方法
- 

## 13. 記入例

### 地方銀行 法人営業/融資担当

- roleWorkKernel: 顧客の資金不安を、返済原資・保全・保証・条件・記録を備えた融資案に変換する仕事。
- 主に見る資料: 資金繰り表、売掛入金メモ、保証協会メモ、稟議コメント
- 主に動かす変数: 実行額、返済原資、保全、提出条件、モニタリング頻度
- 恐れる失敗: 希望額を先に約束し、審査説明や返済根拠が崩れる
- 職種固有の評価基準: 顧客安心と銀行の説明責任を両立できるか
- この職種でしか成立しない選択: 返済原資から実行額を逆算する、保証協会条件を支援案に組み込む、稟議コメントを補強する

### 商品企画

- roleWorkKernel: 顧客の不満と市場機会を、原価・製造・品質保証・営業・ブランドに通る発売仕様と発売条件に変換する仕事。
- 主に見る資料: 顧客アンケート、競合比較表、原価表、品質保証コメント、発売判定シート
- 主に動かす変数: 売価、粗利率、初回数量、訴求文言、試験日数
- 恐れる失敗: 顧客価値を足し続けて、粗利・品質根拠・発売条件が崩れる
- 職種固有の評価基準: 顧客価値を発売可能な仕様と条件に翻訳できるか
- この職種でしか成立しない選択: 原価制約下で仕様を削る、根拠ある売り文句を選ぶ、初回数量と発売条件を統合する
