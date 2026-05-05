# Scenario Revision Report

## 診断したこと

代表 immersive 10本、schema v2、template、catalog、Cα production OS、quality gate、loader、関連テストを確認した。

Webエンジニアは業務材料、数字、ログ、PR差分、障害報告があり、意思決定体験として成立していた。一方で他9本は、職種名だけを差し替えた抽象テンプレートに近かった。

## 低品質の原因

大量生成時に、職種固有の業務材料よりも共通構造を優先したことが主因。特に以下が品質を下げていた。

- 汎用contextの反復
- 汎用NPC台詞の反復
- 「短期進行 / 合意 / 中長期」の3択化
- 数字、資料、制約、固有名詞の不足
- 選択の余波が後続シーンへ接続していない

## 取り入れた設計思想

- Forage型: 実務資料を読ませる
- HBS Case Method型: 不完全情報と対立目標の中で判断させる
- Papers, Please型: 書類、数字、ルール、時間圧で緊張を作る
- Reigns型: role-specific metersで複数指標のトレードオフを持たせる
- 80 Days型: 1日の時間制約を明示する
- Life is Strange / Detroit型: delayed consequence と next scene echo を持たせる
- This War of Mine型: 時間、信頼、予算、法令、社内制約を資源として扱う

## Scenario Quality OS v1.0 の要点

各sceneに以下を必須化した。

- `roleSpecificContext`
- `workMaterial`
- `stakeholderPressure`
- `timePressure`
- `missingInformation`
- `decisionTradeoff`
- `consequenceHook`
- `nextSceneEcho`

各choiceに以下を追加した。

- `immediateFeedback`
- `delayedConsequence`
- `nextSceneEffect`
- `resultSummaryEffect`

schema/loaderは optional fields として additive 拡張した。UI、DB、Bタイプ機能は変更していない。

## 代表3本の修正内容

### 地方銀行 法人営業/融資担当

抽象的な依頼整理から、地場食品メーカーの資金繰り相談へ変更した。決算書、資金繰り表、在庫増加、保証協会、プロパー、担保余力、審査部コメント、社長感情、地域雇用を入れた。

主な葛藤:

- 顧客信頼 vs 与信リスク
- 地域支援 vs 銀行の説明責任
- 早い安心材料 vs 確約表現の危険

### 商品企画

抽象的な企画判断から、軽量保温ランチボックスの商品化判断へ変更した。顧客アンケート、競合比較、原価表、粗利、営業部門、製造部門、品質保証、発売スケジュールを入れた。

主な葛藤:

- 顧客価値 vs 製造可能性
- ブランドFit vs 店頭訴求
- 発売速度 vs 品質表示リスク

### Webマーケター

抽象的な優先順位判断から、BtoB SaaS広告のCPA改善と商談化率低下のケースへ変更した。広告費、CTR、CVR、CPA、商談化率、LPフォーム、広告文、ブランドNG、残予算、週次報告を入れた。

主な葛藤:

- CV数 vs リード品質
- CTR/CPA vs ブランド安全性
- 短期報告成果 vs 仮説検証と透明性

## 残り7本への展開

次は以下の順で展開する。

1. 法人営業/トレーディング: 商談メモ、粗利、在庫、供給遅延、契約条件
2. 業務改善コンサル: 業務フロー、ヒアリングログ、KPI、スコープ変更
3. キャリアアドバイザー: 面談記録、求人票、候補者不安、営業圧力
4. 地域政策担当: 住民意見、予算、条例、議会、実施制約
5. MD/バイヤー: 仕入条件、売上表、在庫、返品率、トレンド
6. 旅行商品企画: 催行人数、仕入枠、安全リスク、季節性、粗利
7. Webエンジニア: 大幅修正せず、OS metadata の付与だけ検討

## 50本全体に展開する前の注意点

50本へ広げる前に、代表10本で以下を確認する。

- role-specific meters が結果画面や大学PoC説明で使えるか
- 実務数字が不自然でないか
- 大学関係者に見せて浅く見えないか
- シナリオ作成コストが非エンジニア1人で回るか
- quality check script が過検知・漏れ検知しすぎないか

## 実行したコマンドと結果

- 代表3本のJSON構造化更新: GREEN
- `node scripts/c-beta/check-scenario-quality.mjs`: GREEN
- `pnpm lint`: GREEN
- `pnpm typecheck`: GREEN
- `pnpm build`: GREEN
- `pnpm test -- --run`: GREEN（3 files / 11 tests）
- `pnpm verify`: GREEN（E2E 16 passed）
- `codex exec review --base pre-pm-zero-v9-migration`: timeout

review timeout のため、`docs/issues.md` に5観点セルフレビューを記録した。

## まだ残る課題

- 今回の3本は実務リサーチ済みではなく、Cβ前の品質改善ドラフト。公開情報と現場レビューで数字・制度・表現の妥当性確認が必要。
- 残り7本の代表 immersive はまだ抽象テンプレートが残る。
- UIはまだ `delayedConsequence` や `branchSummary` を明示表示していない。今回は互換性優先でJSON metadataに留めた。
- 50 normal scenarios 全体への展開は未着手。
