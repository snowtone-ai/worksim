# Cタイプ Scenario Improvement Report

## 変更目的

Cタイプの業界・職種別シナリオを、企業固有の完全再現ではなく、職種ごとの代表的葛藤をゲーム化する品質へ引き上げた。今回は50本全修正ではなく、地方銀行 法人営業/融資担当と商品企画をCβ/大学PoC基準の先行モデルとして改善した。

## Cタイプの方向性

Cタイプは、学生が「情報として読む」のではなく、意思決定で職業理解を深める体験にする。Bタイプは企業オリジナルシナリオや採用広報に寄せるため、Cタイプでは職種の本質的な葛藤、誤解修正、メーターの代償、結果タイプを重視する。

## 地方銀行の改善点

- roleCoreFrictionを各sceneへ追加し、地域企業支援と与信・審査・説明責任の衝突を明示した。
- hiddenWorkRealityを追加し、資金繰り表、売掛、保証協会、審査部、期待値管理の裏側を補強した。
- NPC台詞を現場寄りに調整し、支店長、同僚、審査部の圧を強めた。
- 各choiceにmeterEffectsとmisconceptionEffectを追加した。
- 結果タイプを5種類へ拡張した: 地域伴走型、審査安全型、スピード支援型、収益・保全バランス型、期待値管理リスク型。

## 商品企画の改善点

- roleCoreFrictionを各sceneへ追加し、顧客価値と原価・製造・品質保証・営業・ブランド制約の衝突を明示した。
- hiddenWorkRealityを追加し、原価表、棚条件、POP表現、品質保証、発売判定の裏側を補強した。
- NPC台詞を、ブランド担当、製造、営業、品質保証、部長の圧が見えるように調整した。
- 各choiceにmeterEffectsとmisconceptionEffectを追加した。
- 結果タイプを5種類へ拡張した: 顧客価値追求型、ブランド品質重視型、発売速度重視型、粗利・製造現実型、部門調整バランス型。

## Result Feedback強化

- loaderにadditive optional fieldを追加した。
- calculateResultでdominantMeters、sacrificedMeters、resultType、roleRealityReveal、misconceptionCorrection、decisionPatternSummary、careerReflectionPrompt、universityInsightTagsを返せるようにした。
- 結果画面に「職業理解フィードバック」を簡易表示した。
- 既存Webエンジニアなど、追加フィールドがないシナリオは従来表示のまま動く。

## Quality Gate

docs/c-beta/04-C-TYPE-SCENARIO-DIRECTION.md と docs/c-beta/05-C-TYPE-SCENARIO-QUALITY-GATE.md を追加した。Cタイプ/Bタイプの境界、禁止事項、Pass/Fail条件、review手順を固定した。

## Webマーケター診断

Webマーケター本体は修正せず、docs/c-beta/06-WEB-MARKETER-REVISION-NOTES.md に次回修正点を整理した。広告費、CVR/CPA/CTR/ROAS、短期CVとブランド毀損、リード質、LP/クリエイティブ、クライアント圧、予算配分、A/Bテスト、結果タイプ判定を次回改修観点にした。

## Review Script

scripts/c-beta/check-c-type-scenario-quality.mjs を追加した。禁止フレーズ、汎用choice、workMaterial、meterEffects、misconceptionEffect、roleCoreFriction、resultFeedback、同一choice文の使い回しを検出する。今回は単独実行のみで、verifyには未組み込み。理由は、残り代表7本やWebマーケターがまだ新基準未対応であり、全体verifyへ入れると意図しない既存未修正シナリオで落ちるため。

## 実行コマンドと結果

- node scripts/c-beta/check-c-type-scenario-quality.mjs: GREEN
- pnpm lint: GREEN
- pnpm typecheck: GREEN
- pnpm build: GREEN
- pnpm test -- --run: GREEN、3 files / 12 tests passed
- pnpm verify: GREEN、E2E 18 passed、browser smoke passed

## 追加MD出力

- docs/c-beta/exports/C-TYPE-IMMERSIVE-SCRIPTS.md
- docs/c-beta/exports/C-TYPE-SCENARIO-QUALITY-RULES.md
- C:/Users/chidj/Downloads/C-TYPE-IMMERSIVE-SCRIPTS.md
- C:/Users/chidj/Downloads/C-TYPE-SCENARIO-QUALITY-RULES.md

## 残り7本へ展開する手順

1. 代表10本のうち未修正7本について、role core frictionを1文で固定する。
2. 各sceneにworkMaterial、hiddenWorkReality、stakeholderPressure、timePressureを追加する。
3. 各choiceにmeterEffectsとmisconceptionEffectを追加する。
4. resultTypesを5種類程度に増やし、meterPrioritiesでタイプ判定へ接続する。
5. check-c-type-scenario-quality.mjsを対象ファイル指定で通す。
6. 代表10本すべてが新基準GREENになった時点でverify組み込みを検討する。

## 50本へ広げる前の注意点

- 50本に一括適用する前に、代表10本で職種別メーターと結果タイプの粒度をそろえる。
- 企業名、実在サービス名、個人情報に寄せすぎない。
- Cタイプは企業ごとの完全再現ではなく、学生の職業理解に効く代表葛藤を優先する。
- 一方的な正解choiceを作らず、必ず上がる価値と下がる価値を混在させる。
- 大学向けには個人選別ではなく、匿名集計で誤解修正と葛藤反応を扱う。
