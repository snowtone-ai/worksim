# Cβ Batch 1 Role Differentiation Sheets

## Selection Skeletons

### A. Student-demand-first batch

- Success probability: high
- Student appeal: high
- Role differentiation: medium
- Research feasibility: medium
- Production risk: medium
- Decision primitive coverage: medium
- Note: high appeal alone risks over-selecting familiar sales/marketing roles.

### B. Role-differentiation-first batch

- Success probability: medium-high
- Student appeal: medium-high
- Role differentiation: high
- Research feasibility: medium
- Production risk: medium
- Decision primitive coverage: high
- Note: best fit for Cβ calibration because it stresses anti-generic guardrails.

### C. Production-ease-first batch

- Success probability: high
- Student appeal: medium
- Role differentiation: medium
- Research feasibility: high
- Production risk: low
- Decision primitive coverage: medium
- Note: easier, but may under-test the quality gate.

## Adopted Strategy

Hybrid: role-differentiation first, with student-demand and research feasibility as filters. The selected 5 roles cover technical debugging, solution qualification, hiring-process diagnosis, marketing metric interpretation, and public-sector emergency preparedness.

## Webエンジニア/バックエンド

### Catalog Reference

- Industry slug: `it`
- Role slug: `web-engineer`
- Scenario path: `scenarios/it/web-engineer.json`

### Student Misconception

コードを書く時間だけが仕事の中心で、障害対応・ログ読み・仕様影響の確認は副次的だと思いやすい。

### Structured roleWorkKernel Draft

- input: エラーログ、API仕様、再現条件、既存コード、ユーザー影響範囲
- output: 原因仮説、修正方針、テスト観点、リリース判断
- transformation: 観測された不具合を再現可能な技術原因と安全な修正単位へ変換する
- constraints: 本番影響を広げない、既存仕様を壊さない、限られた調査時間で判断する
- workArtifacts: ログ抜粋、Pull Request、テストケース、障害メモ
- metrics: エラー率、再現率、レスポンスタイム、影響ユーザー数
- failureModes: 表面的な修正で再発する、別機能を壊す、原因未特定のままリリースする
- evaluationCriteria: 原因と修正範囲が説明できる、テストで再発を防げる、影響範囲が限定されている
- nonGenericReason: バックエンド固有のログ、仕様、コード、テストを読まないと判断できず、一般的な調整役へ置換できない。

### Main Materials

ログ、API仕様、テスト結果、差分コード、障害チケット。

### Main Variables

影響範囲、再現性、修正範囲、テスト網羅、リリース緊急度。

### Role-Specific Failure Modes

原因を取り違える、既存契約を壊す、監視を追加せず再発に気づけない。

### Role-Specific Evaluation Criteria

修正の説明可能性、再現テスト、影響限定、レビュー容易性。

### What This Role Uniquely Decides

ログとコード差分から、どの仮説を検証し、どの修正を今日出すか。

### Generic Stakeholder-Coordination Risk

ユーザー・PM・上司の板挟みだけにすると、技術判断が消える。

### Anti-Generic Strategy

各sceneの判断をログ数値、API契約、テスト結果、PR差分に必ず接続する。

### Source/Research Candidates

厚労省 job tag、IPA DX白書、一般公開されているWebサービス障害報告の書き方。

## ITソリューション営業

### Catalog Reference

- Industry slug: `it`
- Role slug: `it-solution-sales`
- Scenario path: `scenarios/it/it-solution-sales.json`

### Student Misconception

営業は話術で商品を売る仕事で、業務課題・導入制約・費用対効果の見立ては後工程だと思いやすい。

### Structured roleWorkKernel Draft

- input: 顧客ヒアリング、業務フロー、既存システム制約、予算感、導入期限
- output: 課題仮説、提案範囲、見積前提、次回確認項目
- transformation: 曖昧な要望を、導入可能なIT提案の要件と優先順位へ変換する
- constraints: 過剰提案を避ける、実装難度を見落とさない、決裁者と利用者の差を読む
- workArtifacts: ヒアリングメモ、課題整理表、提案骨子、導入効果メモ
- metrics: 想定削減工数、導入費用、利用部門数、決裁確度
- failureModes: 顧客要望をそのまま売る、導入後の運用負荷を見落とす、決裁条件を外す
- evaluationCriteria: 課題と提案範囲が対応している、費用対効果が説明できる、次アクションが明確
- nonGenericReason: 顧客業務をIT要件と導入制約へ翻訳する仕事であり、単なる関係構築や価格交渉では成立しない。

### Main Materials

業務フロー、ヒアリングメモ、既存システム一覧、提案骨子。

### Main Variables

業務課題の深さ、決裁者、現場利用者、導入期限、費用対効果。

### Role-Specific Failure Modes

要望追従、技術制約の見落とし、決裁者不在の提案。

### Role-Specific Evaluation Criteria

課題解像度、提案範囲の妥当性、導入後運用の現実性。

### What This Role Uniquely Decides

どの顧客要望を提案要件にし、どれを確認待ちにするか。

### Generic Stakeholder-Coordination Risk

顧客対応の丁寧さだけに寄ると、ITソリューション営業固有の要件化が消える。

### Anti-Generic Strategy

会話より先に業務フロー、導入制約、費用対効果をscene材料に置く。

### Source/Research Candidates

厚労省 job tag、ITコーディネータ協会の公開情報、SaaS導入事例の公開資料。

## 採用コンサルタント

### Catalog Reference

- Industry slug: `hr`
- Role slug: `recruitment-consultant`
- Scenario path: `scenarios/hr/recruitment-consultant.json`

### Student Misconception

採用は応募者を増やす広報や面接の印象判断が中心で、要件定義・選考データ・公平性設計は見えにくい。

### Structured roleWorkKernel Draft

- input: 求人要件、応募者ファネル、選考通過率、面接評価メモ、辞退理由
- output: 採用課題仮説、選考改善案、求人要件修正案、評価観点
- transformation: 採用の停滞を、要件・母集団・選考・訴求のどこに問題があるかへ分解する
- constraints: 公平性を損なわない、現場要望をそのまま採用条件にしない、短期充足と長期定着を両立する
- workArtifacts: 採用ファネル表、求人票、評価シート、辞退理由集計
- metrics: 応募数、書類通過率、面接通過率、辞退率、内定承諾率
- failureModes: 要件過多で母集団が狭まる、評価基準が曖昧になる、短期採用だけでミスマッチが増える
- evaluationCriteria: ボトルネックが特定されている、評価基準が説明可能、公平性と採用成果が両立している
- nonGenericReason: 採用ファネルと評価基準を読み、要件・訴求・選考設計を変える仕事であり、一般的な相談対応では代替できない。

### Main Materials

求人票、採用ファネル、評価シート、辞退理由、面接官コメント。

### Main Variables

要件の厳しさ、応募者母集団、通過率、評価のばらつき、辞退理由。

### Role-Specific Failure Modes

不公平な評価、母集団不足、要件の肥大化、採用後ミスマッチ。

### Role-Specific Evaluation Criteria

ボトルネック特定、評価基準の明確性、公平性、定着可能性。

### What This Role Uniquely Decides

採用停滞の原因を、要件・母集団・選考・訴求のどこに置くか。

### Generic Stakeholder-Coordination Risk

企業と候補者の間に立つ調整役だけになると、採用設計の判断が消える。

### Anti-Generic Strategy

各sceneをファネル数値、評価観点、求人条件、辞退理由に接続する。

### Source/Research Candidates

厚労省 job tag、公正な採用選考に関する厚労省公開資料、一般公開の採用ファネル解説。

## 運用型広告担当

### Catalog Reference

- Industry slug: `marketing-media`
- Role slug: `performance-marketing`
- Scenario path: `scenarios/marketing-media/performance-marketing.json`

### Student Misconception

広告運用はクリエイティブな文章や画像を考える仕事で、日次の数値検証と配信設計の制約は軽く見られやすい。

### Structured roleWorkKernel Draft

- input: 広告配信結果、予算消化、クリック率、CVR、CPA、ターゲット設定
- output: 改善仮説、配信調整案、予算配分、検証計画
- transformation: 配信データを、どこを変えると成果が改善するかの仮説と実験単位へ変換する
- constraints: 学習期間を壊さない、短期CPAだけで判断しない、予算上限を守る
- workArtifacts: 日次レポート、キャンペーン構成表、改善仮説メモ、検証設計
- metrics: CTR、CVR、CPA、ROAS、予算消化率
- failureModes: 数値の揺れに過剰反応する、悪い指標だけを見る、検証条件を混ぜて学習不能にする
- evaluationCriteria: 仮説と指標が対応している、検証単位が分離されている、予算と成果の説明ができる
- nonGenericReason: 広告配信指標と検証設計を読まなければ判断できず、汎用的な企画会議や顧客対応へ置換できない。

### Main Materials

日次広告レポート、キャンペーン構成、予算消化表、検証メモ。

### Main Variables

CTR、CVR、CPA、ROAS、配信学習、ターゲット粒度。

### Role-Specific Failure Modes

短期数値への過剰反応、検証条件の混在、予算消化の偏り。

### Role-Specific Evaluation Criteria

仮説の明確性、指標対応、検証設計、予算管理。

### What This Role Uniquely Decides

どの指標変化をノイズではなく改善対象として扱うか。

### Generic Stakeholder-Coordination Risk

広告主の希望と制作側の都合の調整だけに寄ると、運用型広告の数値判断が消える。

### Anti-Generic Strategy

sceneごとにCTR/CVR/CPA/ROASと検証単位を必ず置く。

### Source/Research Candidates

Google広告ヘルプ、Meta Businessヘルプ、総務省/経産省のデジタル広告関連公開資料。

## 防災/危機管理担当

### Catalog Reference

- Industry slug: `public-infra`
- Role slug: `disaster-crisis-management`
- Scenario path: `scenarios/public-infra/disaster-crisis-management.json`

### Student Misconception

災害時に現場で素早く動く仕事という印象が強く、平時のリスク想定、避難計画、情報伝達設計、訓練改善が見えにくい。

### Structured roleWorkKernel Draft

- input: ハザードマップ、避難所収容数、要支援者情報、訓練結果、気象警戒情報
- output: 初動判断、避難情報案、資源配分案、訓練改善メモ
- transformation: 災害リスク情報を、住民へ出す判断と限られた行政資源の配分へ変換する
- constraints: 空振り批判を恐れすぎない、避難弱者を見落とさない、情報の不確実性を扱う
- workArtifacts: ハザードマップ、避難所一覧、タイムライン、防災訓練記録
- metrics: 避難対象世帯数、避難所収容率、連絡完了率、初動時間
- failureModes: 判断遅れ、避難所容量不足、要支援者見落とし、情報伝達の混乱
- evaluationCriteria: 不確実性下で説明可能、弱者配慮がある、資源配分が現実的、初動が遅れない
- nonGenericReason: ハザード、避難容量、警戒情報、行政資源を同時に読む仕事であり、一般的な関係者調整だけでは成立しない。

### Main Materials

ハザードマップ、避難所台帳、タイムライン、訓練結果、警戒情報。

### Main Variables

危険度、避難対象、収容率、連絡完了率、初動時間、不確実性。

### Role-Specific Failure Modes

避難判断の遅れ、収容超過、要支援者の取りこぼし、情報混乱。

### Role-Specific Evaluation Criteria

説明可能な初動判断、弱者配慮、容量計算、情報伝達の実効性。

### What This Role Uniquely Decides

不確実な警戒情報の中で、いつ、誰に、どの避難行動を促すか。

### Generic Stakeholder-Coordination Risk

住民・上司・関係機関の調整だけにすると、防災計画固有のリスク判断が消える。

### Anti-Generic Strategy

各sceneをハザード、避難所容量、要支援者、初動時間のいずれかに必ず接続する。

### Source/Research Candidates

内閣府防災情報、気象庁防災情報、自治体の地域防災計画公開資料。
