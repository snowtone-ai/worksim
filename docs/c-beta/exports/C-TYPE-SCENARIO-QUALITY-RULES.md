# Cタイプ Scenario Quality Rules

# Cタイプ Scenario Direction

## CタイプとBタイプの役割分担

Cタイプは、学生が業界・職種の代表的な葛藤を意思決定として体験するためのシナリオである。企業ごとの業務手順や採用広報を完全再現するものではない。

Bタイプは、企業オリジナルシナリオ、採用広報、企業理解、企業固有の仕事観を扱う。実在企業の制度、商品、顧客、選考メッセージに寄せる場合はBタイプで扱う。

## Cタイプの方針

Cタイプでは、職種ごとの本質的な仕事の濁りをゲームとして圧縮する。学生が「この仕事は思ったより複雑だ」と感じ、自分がその葛藤を面白いと思えるか判断できることを優先する。

重視するもの:

- role core friction: その職種でしか起きにくい中心葛藤
- misconception correction: 学生が持ちやすい誤解と、プレイ後に理解してほしい現実
- concrete work artifact: メール、数値表、審査コメント、原価表、広告レポートなどの仕事材料
- stakeholder pressure: 顧客、上司、他部門、審査、品質保証、営業などの圧
- time pressure: 今日中、会議前、入稿前、月末などの判断期限
- meter tradeoff: 職種固有メーターが一方的に良くならない選択設計
- delayed consequence: 次シーンまたは結果画面に残る余波
- result type: 点数ではなく職業理解タイプとして返す結果

## Cタイプで禁止するもの

- 汎用3択
- 抽象テンプレート
- 職種名だけ置換して成立するシーン
- 仕事材料のない説明文
- 一方的な正解選択肢
- 良い点とリスクがテンプレ文だけのchoice
- delayed consequenceが次シーンにも結果にもつながらないchoice
- 結果画面が単なる点数で終わること

## 結果画面で返すべきもの

結果画面は、学生の優劣判定ではなく職業理解の整理に使う。

表示または保持する情報:

- resultType
- dominantMeters
- sacrificedMeters
- roleRealityReveal
- misconceptionCorrection
- decisionPatternSummary
- careerReflectionPrompt
- universityInsightTags

大学向けには、個人選別ではなく匿名集計で「どの誤解が修正されたか」「どの葛藤に強い反応があったか」を見る。


# Cタイプ Scenario Quality Gate

## Pass Checks

- その職種でしか起きにくい中心葛藤がある
- 学生が誤解しやすい点を修正している
- 各sceneに具体的な仕事材料がある
- 各sceneに数字、資料、固有名詞、時間制約のうち2つ以上がある
- 各sceneに顧客、上司、他部門、法令、品質、数字矛盾のいずれかの圧がある
- 選択肢すべてに合理性と代償がある
- 各choiceにimmediate、delayed、next、result、good、risk、next-summaryがある
- 各choiceにmeterEffectsがあり、一方的に上がるだけではない
- 各choiceにmisconceptionEffectがある
- 次シーンまたは結果画面に余波が出る
- 結果画面が職業理解につながる
- プレイ後に「この仕事、思ったより複雑だ」と感じられる
- 大学PoCに出して浅く見えない

## Fail Conditions

- 職種名を置換しても成立する
- 汎用3択になっている
- 説明文だけで仕事材料がない
- 良い点、リスク、次展開がテンプレ文
- 選択肢に代償がない
- meterEffectsが全choiceで同じ、またはプラスだけ
- delayed consequenceが次シーンにも結果にも影響しない
- 結果が点数だけで終わる
- 学生の誤解修正がない

## Review Procedure

1. role core frictionを1文で言えるか確認する。
2. 各sceneのwork artifactを抜き出し、仕事材料として読めるか確認する。
3. 各choiceのgoodとriskを並べ、全部が合理的かつ代償つきか確認する。
4. meterEffectsを集計し、タイプ判定に接続できるか確認する。
5. resultFeedbackを読み、誤解修正とキャリア振り返りに接続しているか確認する。
6. 職種名だけを別職種に置換しても成立しないか確認する。
