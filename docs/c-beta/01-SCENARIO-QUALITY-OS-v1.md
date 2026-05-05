# Scenario Quality OS v1.0

## 3つの改善スケルトン

### A. 実務リサーチ主導型

概要: 職種ごとに求人、職業情報、社員インタビュー、業務資料を集め、現実のタスクを再現する。

成功率: 中。実務の表層リアリティは上がるが、ゲームとしての葛藤設計が弱くなる可能性がある。

メリット: 職種理解の正確性が上がる。大学PoCで「それらしい」説明がしやすい。

デメリット: 調査時間がかかる。非エンジニア1人では50本展開が重い。資料を集めても選択体験が面白くなるとは限らない。

WorkSimへの適合性: 必須だが単独では不十分。

低コストPoC妥当性: 代表職種の深掘りには妥当。全職種で先にやると速度が落ちる。

### B. ゲーム構造主導型

概要: 時間、資源、ステークホルダーメーター、遅延結果、分岐サマリーを先に設計する。

成功率: 中。体験は締まるが、実務材料が薄いと職種説明ゲームになる。

メリット: Papers, Please、Reigns、80 Days 型の緊張感を作りやすい。判断の余波も設計しやすい。

デメリット: 職種固有性が弱いと、全職種が同じゲーム構造になる。

WorkSimへの適合性: 体験価値には強く合うが、実務リアリティの土台が必要。

低コストPoC妥当性: ルール化しやすいので運用向き。ただしリサーチなしでは浅く見える。

### C. 実務ケース × ゲーム構造のハイブリッド型

概要: 先に職種固有の業務材料を置き、その材料に時間圧、欠落情報、ステークホルダー圧、選択の代償、後続シーンへの余波を接続する。

成功率: 高。Forage型の実務タスクと、HBS Case Method型の不完全情報判断を両立できる。

メリット: 学生が実務資料を読み、職種固有の葛藤を疑似体験できる。非エンジニア1人でも、Scene Anatomy と Quality Gate に沿えば横展開しやすい。

デメリット: 1本あたりの作成時間はテンプレート生成より増える。数字や資料の妥当性をCβで現場レビューする必要がある。

WorkSimへの適合性: 最も高い。WorkSimの価値は職種説明ではなく意思決定体験であり、この案が最も近い。

低コストPoC妥当性: 代表10本に適用する前提なら妥当。最初は3本で型を検証し、残り7本へ展開する。

採用方針: C案を採用する。

## Scene Anatomy

各シーンは必ず以下を持つ。

- `roleSpecificContext`: その職種でしか起きにくい文脈
- `workMaterial`: 実務材料
- `stakeholderPressure`: 誰が何を求めているか
- `timePressure`: いつまでに判断が必要か
- `missingInformation`: 足りない情報
- `decisionTradeoff`: 意思決定の衝突
- `consequenceHook`: 選択の余波
- `nextSceneEcho`: 次シーンで何が戻ってくるか

## Work Artifact Rules

各シーンに最低1つ、実務材料を入れる。

- email
- Slack
- 商談メモ
- 売上表
- 顧客アンケート
- 稟議メモ
- 審査コメント
- PR差分
- エラーログ
- 競合比較表
- 原価表
- 会議議事録
- 上司の短い指示
- 顧客の不満
- 社内反対意見

実務材料なしのシーンは原則Fail。

## Choice Design Rules

選択肢は必ず3つ。全て合理性と代償を持たせる。

- Choice A: 短期成果を取るが、長期リスクが残る
- Choice B: 安全・正確に進めるが、スピードや機会を失う
- Choice C: 関係者を巻き込むが、摩擦や調整コストが増える

ただし文面は職種ごとに具体化する。「早く動く」「確認する」「中長期で考える」のような汎用文は禁止。

## Consequence Rules

各選択肢は以下を持つ。

- `immediateFeedback`
- `delayedConsequence`
- `nextSceneEffect`
- `resultSummaryEffect`

現行UIは `studentFeedback` を表示する。上記は当面 optional metadata としてJSONに保持し、将来の結果画面やbranch summaryへ接続する。

## Role-Specific Meters

### Webエンジニア

- `system_reliability`
- `delivery_speed`
- `code_quality`
- `team_trust`
- `user_impact`
- `incident_risk`

### 地方銀行 法人営業/融資担当

- `customer_trust`
- `credit_risk`
- `branch_profit`
- `compliance_safety`
- `regional_impact`
- `internal_workload`

### 商品企画

- `customer_value`
- `brand_fit`
- `manufacturing_feasibility`
- `gross_margin`
- `sales_team_buy_in`
- `launch_speed`

### 法人営業/トレーディング

- `customer_margin`
- `supplier_reliability`
- `inventory_risk`
- `deal_speed`
- `compliance_safety`
- `relationship_depth`

### Webマーケター

- `lead_quality`
- `conversion_volume`
- `cpa_efficiency`
- `brand_safety`
- `hypothesis_learning`
- `client_trust`

### 業務改善コンサル

- `client_trust`
- `process_accuracy`
- `change_adoption`
- `scope_control`
- `analysis_depth`
- `delivery_speed`

### キャリアアドバイザー

- `candidate_trust`
- `company_fit`
- `ethical_guidance`
- `matching_speed`
- `long_term_career_value`
- `sales_pressure_control`

### 地域政策担当

- `resident_trust`
- `budget_feasibility`
- `policy_impact`
- `political_alignment`
- `legal_safety`
- `implementation_speed`

### MD/バイヤー

- `sell_through_rate`
- `gross_margin`
- `inventory_risk`
- `brand_fit`
- `supplier_relationship`
- `trend_timing`

### 旅行商品企画

- `customer_experience`
- `supplier_capacity`
- `profit_margin`
- `safety_risk`
- `seasonality_fit`
- `booking_speed`

## Schema Compatibility

既存schema v2は additive 方針なので、OS項目は optional fields として追加する。既存UIは `context`、`content`、`workMaterial`、`choices`、`studentFeedback`、`scores` を読み続ける。

追加したoptional fields:

- `workMaterial`
- `timePressure`
- `stakeholderPressure`
- `roleSpecificContext`
- `missingInformation`
- `decisionTradeoff`
- `consequenceHook`
- `nextSceneEcho`
- `immediateFeedback`
- `delayedConsequence`
- `nextSceneEffect`
- `resultSummaryEffect`
- `roleSpecificMeters`
- `branchSummary`

DB設計、UI大改修、Bタイプ機能は入れない。
