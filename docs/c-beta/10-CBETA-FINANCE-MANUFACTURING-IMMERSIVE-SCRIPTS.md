# Cβ Finance / Manufacturing Immersive Scripts

## 地方銀行 法人営業/融資担当

roleCoreFriction: 顧客を助けたい気持ちと、返済原資・保全・説明責任を同時に満たす融資設計の葛藤。

roleMisconception: 銀行の法人営業は、困っている企業にお金を貸す仕事だと思われやすい。

roleRealityReveal: 実際は、顧客の不安を受け止めながら、返せる根拠・保証・条件・記録を組み合わせ、銀行内外で通る安心を設計する仕事。



### Scenes

#### 09:05 8日後の給与資金

openingHook: 09:05。支店の電話が鳴った。「今月の給与、8日だけ足りません」

workMaterial:
相談メモ
- 希望額: 1,200万円
- 当座残高: 180万円
- 8日後給与: 910万円
- 月末入金予定: A社 760万円、B社 430万円
- 既存借入: 残高4,800万円、前回実行4か月前

npcDialogue:
社長:「満額とは言いません。ただ、給料だけは遅らせたくない」
支店長:「気持ちは分かる。だが返済原資を見ずに希望だけ持たせるな」

choices:

- 給与資金を最優先に、満額支援の可能性を前向きに伝える
  - good: 給与遅配という地域雇用リスクに即応できている。
  - risk: 返済原資を確認する前に期待値を作っている。
  - immediate: 社長は一息つき、資料提出に協力的になる。
  - delayed: 審査で減額になった場合、期待値を上げた分だけ失望が大きい。
  - next: 資金繰り表の穴を埋める資料回収は早まるが、支店長への説明は重くなる。
  - result: 顧客の安心を先に作る判断が多い。
  - meterEffects: {"customer_trust":2,"regional_impact":2,"credit_risk":-2,"compliance_safety":-1}
  - misconceptionEffect: 銀行は顧客の希望額を約束する仕事ではなく、希望を審査に通る条件へ翻訳する仕事だと気づきにくい。

- 可能性は否定せず、返済原資と保証協会の確認を先に置く
  - good: 顧客を突き放さず、銀行として説明できる順番を守っている。
  - risk: 即答を求める社長には、冷たく聞こえる可能性がある。
  - immediate: 社長は少し不安を残すが、必要資料の意味を理解する。
  - delayed: 午前の確認量は増えるが、審査部への説明の芯ができる。
  - next: 資金繰り表の数字確認に自然につながる。
  - result: 安心と条件を同時に設計する判断が多い。
  - meterEffects: {"customer_trust":1,"compliance_safety":2,"credit_risk":1,"internal_workload":-1}
  - misconceptionEffect: 「貸す/断る」の二択ではなく、条件を組み立てる仕事だと理解が進む。

- 現時点では満額回答を避け、追加資料なしでは進めないと線を引く
  - good: コンプライアンスと審査説明を守っている。
  - risk: 資金繰り危機の感情を受け止めず、信頼を失う恐れがある。
  - immediate: 銀行としての不用意な発言は避けられる。
  - delayed: 社長が他行や取引先に走り、相談の主導権を失う可能性がある。
  - next: 数字確認は厳密になるが、顧客の本音が出にくくなる。
  - result: 説明責任と保全を優先する判断が多い。
  - meterEffects: {"compliance_safety":3,"credit_risk":2,"customer_trust":-2,"regional_impact":-1}
  - misconceptionEffect: 銀行員は冷静に断るだけでなく、顧客が話し続けられる余地も設計する必要がある。

#### 10:20 売掛入金のずれ

openingHook: 10:20。資金繰り表のA社入金欄だけ、鉛筆で「70%」と書き足されていた。

workMaterial:
資金繰り表抜粋
- 7/25 給与: -910万円
- 7/31 A社売掛: +760万円（検収待ち、社長見込み70%）
- 7/31 B社売掛: +430万円（請求書発行済み）
- 8/10 材料費: -520万円
決算書断片: 棚卸資産 2,900万円（前年比132%）、営業利益率2.1%

npcDialogue:
融資事務:「A社、前も検収が月をまたぎましたよね」
社長:「今回の品物はもう納めています。入金は大丈夫なはずです」

choices:

- A社入金を保守的に半額で置き、800万円の短期支援案に下げる
  - good: 入金確度を反映し、返済原資の説明が通りやすい。
  - risk: 顧客には銀行が助けてくれない印象を与えやすい。
  - immediate: 審査説明は堅くなるが、社長の希望額とは離れる。
  - delayed: 給与は守れる可能性が高いが、材料費支払いは再調整が必要になる。
  - next: 昼の社長説明では、減額理由を感情面も含めて伝える必要が出る。
  - result: 不確実な入金を厳しく見る判断が多い。
  - meterEffects: {"credit_risk":2,"compliance_safety":2,"customer_trust":-1,"regional_impact":-1}
  - misconceptionEffect: 融資判断は「困っている額」ではなく「返せる見込み額」から逆算する。

- A社検収の証跡を取りに行き、保証協会には条件付きで相談する
  - good: 顧客支援と審査説明を同時に進めている。
  - risk: 関係者全員の反応待ちになり、時間が詰まる。
  - immediate: 確認作業は増えるが、満額と減額の間に説明可能な案ができる。
  - delayed: 証跡が取れれば審査部の懸念を一部抑えられる。
  - next: 昼の社長説明で、条件付き支援として話せる。
  - result: 条件を集めながら支援幅を残す判断が多い。
  - meterEffects: {"customer_trust":1,"credit_risk":1,"compliance_safety":2,"internal_workload":-2}
  - misconceptionEffect: 銀行員は資料を要求するだけでなく、通る資料の形を一緒に作る。

- 社長見込みを尊重し、1,200万円案で保証協会に先行相談する
  - good: 資金繰りの時間制約に素早く反応している。
  - risk: 不確実な売掛をそのまま返済原資にしている。
  - immediate: 社長の期待には沿える。保証協会との会話も早い。
  - delayed: 検収遅れが出た場合、返済原資の説明が崩れる。
  - next: 審査部からA社入金の証跡を強く求められる。
  - result: 顧客の事業継続を広く支える判断が多い。
  - meterEffects: {"customer_trust":2,"regional_impact":1,"credit_risk":-2,"compliance_safety":-1}
  - misconceptionEffect: 地域金融は情だけでは進まず、見込みを証拠に変える力が必要。

#### 12:15 昼休みの社長来店

openingHook: 12:15。社長が窓口に現れた。「満額いけそうですか。工場のみんな、昼飯も喉を通らないって」

workMaterial:
保証協会メモ
- 保証付き短期運転資金は検討可
- A社検収予定メール、B社請求書、8月返済予定表が必要
- 既存保証残枠は限定的
来店メモ: 社長は満額支援を期待。給与遅配回避を最優先。

npcDialogue:
社長:「従業員には絶対に遅らせたくないんです」
支店長:「言葉を選べ。約束ではなく、通すための条件を伝えるんだ」

choices:

- 「満額を目指します」と言い、社長の協力を引き出す
  - good: 社長の不安を受け止め、行動につなげている。
  - risk: 審査前の期待値管理としては強すぎる。
  - immediate: 社長は前向きになり、資料提出を急いでくれる。
  - delayed: 満額不可のとき、銀行が約束を破ったように受け取られる。
  - next: 審査部への持ち込みでは、発言の強さを支店長に説明する必要がある。
  - result: 相手の感情を先に支える判断が多い。
  - meterEffects: {"customer_trust":2,"regional_impact":1,"compliance_safety":-2,"credit_risk":-1}
  - misconceptionEffect: 顧客を安心させる言葉ほど、銀行では記録と責任が重くなる。

- 「給与を守る案を優先して組みます」と目的と条件を分けて伝える
  - good: 感情を受け止めながら、約束の線を越えていない。
  - risk: 社長には歯切れが悪く感じられる可能性がある。
  - immediate: 社長は満額でない可能性を理解しつつ、何を出せばよいか分かる。
  - delayed: 夕方に減額案になっても、説明の筋が残る。
  - next: 審査部に、顧客説明済みの条件付き案として持ち込める。
  - result: 顧客の安心と銀行の条件を切り分ける判断が多い。
  - meterEffects: {"customer_trust":1,"compliance_safety":2,"regional_impact":1,"credit_risk":1,"internal_workload":-1}
  - misconceptionEffect: 法人営業は明るく売る仕事ではなく、相手が動ける条件に翻訳する仕事。

- 審査結果が出るまで金額に触れず、資料提出だけを依頼する
  - good: 審査前の約束を避けている。
  - risk: 顧客感情と地域雇用への配慮が薄く見える。
  - immediate: 記録上のリスクは抑えられる。
  - delayed: 社長は不安なまま戻り、資料提出が遅れる恐れがある。
  - next: 審査部説明は堅いが、顧客協力の弱さを補う必要が出る。
  - result: 審査安全性を優先する判断が多い。
  - meterEffects: {"compliance_safety":3,"credit_risk":1,"customer_trust":-2,"regional_impact":-1}
  - misconceptionEffect: 正確な説明だけでは、顧客が次に動けないことがある。

#### 14:05 審査部の赤字コメント

openingHook: 14:05。稟議下書きに赤字が入った。「返済原資の記述が希望的。保全の説明も不足」

workMaterial:
稟議コメント
- 資金使途: 給与資金910万円、材料費一部
- 返済原資: A社・B社売掛入金。ただしA社は検収待ち
- 保全: 保証協会付き、代表者保証、月次資金繰り表提出
- 審査部意見: 満額1,200万円は根拠弱い。800〜1,000万円の段階支援なら検討余地

npcDialogue:
審査部:「地域雇用は分かります。ただ、返済原資はA社検収待ちですよね」
支店長:「満額にこだわるな。給与を守る着地点を探せ」

choices:

- 地域雇用を理由に1,200万円満額を強く主張する
  - good: 地域雇用への責任を引き受けている。
  - risk: 審査部の論点に正面から答えきれていない。
  - immediate: 支店の熱意は伝わる。
  - delayed: 審査部には返済原資の弱さを感情で埋めたように見える。
  - next: 夕方、満額不可になった場合の説明が苦しくなる。
  - result: 地域支援を前面に出す判断が多い。
  - meterEffects: {"regional_impact":2,"customer_trust":1,"credit_risk":-2,"compliance_safety":-1,"branch_profit":1}
  - misconceptionEffect: 地域貢献は重要だが、銀行内では数字と条件に変換しないと通らない。

- 1,000万円を上限に、保証協会と月次管理を条件にする
  - good: 返済原資、保全、顧客目的を1つの案にまとめている。
  - risk: 条件が増え、顧客側の事務負担は重くなる。
  - immediate: 審査部は検討可能な案として受け止める。
  - delayed: 社長には満額ではない理由と条件を丁寧に説明する必要がある。
  - next: 夕方、段階支援として着地できる。
  - result: 通る条件に翻訳する判断が多い。
  - meterEffects: {"compliance_safety":2,"credit_risk":2,"customer_trust":1,"regional_impact":1,"internal_workload":-1}
  - misconceptionEffect: 銀行の法人営業は顧客要望をそのまま社内に通す仕事ではない。

- 800万円に減額し、材料費は取引先支払猶予を前提にする
  - good: 返済原資の弱さに合わせて支援額を現実化している。
  - risk: 資金繰り全体では火種を残す。
  - immediate: 審査部のリスク懸念はかなり下がる。
  - delayed: 仕入先との関係悪化や生産遅れの火種が残る。
  - next: 夕方、社長には厳しい現実を伝える必要がある。
  - result: 銀行リスクを先に絞る判断が多い。
  - meterEffects: {"credit_risk":3,"compliance_safety":2,"customer_trust":-1,"regional_impact":-1,"branch_profit":-1}
  - misconceptionEffect: リスクを下げれば終わりではなく、顧客の事業継続への副作用も残る。

#### 16:40 最終回答の10分前

openingHook: 16:40。保証協会から折り返し。「1,000万円、条件付きなら前向きです」

workMaterial:
最終条件案
- 実行額: 1,000万円
- 使途: 給与資金910万円、残額は当座余裕
- 条件: A社検収メール、B社請求書、月次資金繰り表3か月提出
- 返済原資: 7月末・8月末売掛入金
- 次回確認: 2週間後に入金状況確認

npcDialogue:
支店長:「満額ではない。でも給与は守れる。ここからが担当者の仕事だ」
社長:「条件付きでも、今日方向が見えるなら助かります」

choices:

- 「給与は守れます」と先に伝え、条件は後半で説明する
  - good: 顧客が明日動ける心理状態を作っている。
  - risk: 条件の重要性が弱く伝わる可能性がある。
  - immediate: 社長は落ち着き、従業員への説明がしやすくなる。
  - delayed: 条件の重さが後から効き、提出漏れが出る恐れがある。
  - next: 結果では、顧客安心を優先したタイプとして表れる。
  - result: 顧客の不安を先にほどく判断が多い。
  - meterEffects: {"customer_trust":2,"regional_impact":2,"compliance_safety":-1,"credit_risk":-1}
  - misconceptionEffect: 安心を作る言葉にも、条件を守らせる設計が必要。

- 金額、条件、次回確認日を1枚の約束として伝える
  - good: 顧客信頼、返済原資、説明責任を同じ文脈で扱っている。
  - risk: 説明量が多く、社長が一度で飲み込めない可能性がある。
  - immediate: 社長は満額でない理由と、銀行が支援する条件を理解する。
  - delayed: 次回確認まで関係を保ちながら、銀行内の説明も残る。
  - next: 結果では、条件と安心を同時に設計するタイプとして表れる。
  - result: 支援を通る条件へ翻訳する判断が多い。
  - meterEffects: {"customer_trust":1,"compliance_safety":2,"credit_risk":2,"regional_impact":1,"internal_workload":-1}
  - misconceptionEffect: 銀行は貸す仕事ではなく、条件と安心を同時に設計する仕事だと理解できる。

- 条件不履行時のリスクを先に伝え、銀行の線引きを明確にする
  - good: 条件不履行リスクを曖昧にしていない。
  - risk: 支援の意図より制約が強く伝わる。
  - immediate: 銀行としての線引きは明確になる。
  - delayed: 社長は助かったよりも監視される印象を持つ可能性がある。
  - next: 結果では、説明安全性を優先したタイプとして表れる。
  - result: 銀行信用と記録を守る判断が多い。
  - meterEffects: {"compliance_safety":3,"credit_risk":2,"customer_trust":-2,"regional_impact":-1}
  - misconceptionEffect: 正確さだけでは、顧客が銀行を相談相手と感じにくくなる。



### Result Types

#### 条件設計型バンカー
- roleRealityReveal: 法人融資は、希望額を通す仕事ではなく、顧客が返せる形と銀行が説明できる形を同時に作る仕事です。
- misconceptionCorrection: 「銀行は貸す仕事」という見方から、「条件と安心を同時に設計する仕事」へ理解が進んでいます。
- decisionPatternSummary: 感情を受け止めながら、資料・保証・次回確認で判断を支える傾向があります。
- careerReflectionPrompt: 相手を助けたい気持ちと、数字で線を引く責任の両方を面白いと思えるか振り返ってください。

#### 地域伴走型バンカー
- roleRealityReveal: 地域企業に寄り添うほど、銀行内で説明できる条件設計が必要になります。
- misconceptionCorrection: 優しさだけでは融資は通らず、優しさを条件に翻訳する力が求められます。
- decisionPatternSummary: 顧客の不安を先にほどき、資料協力を引き出す傾向があります。
- careerReflectionPrompt: 顧客の感情に近づいたまま、どこで銀行として線を引けるか考えてください。

#### 信用管理型バンカー
- roleRealityReveal: 銀行の信用は、貸す判断だけでなく、貸さない線引きや条件説明でも守られます。
- misconceptionCorrection: 正確さは大切ですが、顧客が次に動ける言葉にすることも法人担当の仕事です。
- decisionPatternSummary: 不確実な売掛や保証条件を厳密に扱う傾向があります。
- careerReflectionPrompt: リスクを抑える判断が、顧客の事業継続にどんな副作用を残すか考えてください。



resultFeedback.roleRealityReveal: 地方銀行の法人担当は、貸す/断るだけでなく、返済原資・保証・条件・説明を組み合わせて顧客が前に進める形を作る。

resultFeedback.misconceptionCorrection: 「銀行は貸す仕事」ではなく、「条件と安心を同時に設計する仕事」として理解する。

resultFeedback.careerReflectionPrompt: 顧客を助けたい気持ちと、銀行として説明できる線引きの両方を扱うことに興味が持てるか。

resultFeedback.universityInsightTags: misconception_correction / regional_employment_sensitivity / credit_evidence_focus

## 商品企画

roleCoreFriction: 顧客価値を高めたい企画意図と、原価・製造・営業・品質保証・ブランドに通る仕様へ落とす葛藤。

roleMisconception: 商品企画は、自由にアイデアを出して新商品を考える仕事だと思われやすい。

roleRealityReveal: 実際は、顧客価値を原価・製造・営業・品質保証・ブランドに通る仕様と発売条件へ翻訳する仕事。



### Scenes

#### 09:10 アンケートの温度差

openingHook: 09:10。顧客アンケートの自由記述だけ、赤い付箋が12枚ついていた。

workMaterial:
顧客アンケート n=412
- 保存しやすい: 68%
- 開け閉めしやすい: 41%
- 冷蔵庫で場所を取らない: 36%
自由記述: 「片手で開けたい」34件、「重ねると取り出しにくい」28件
競合A: 薄型2,780円、競合B: 密閉強化3,480円

npcDialogue:
営業:「量販店X、2,980円なら春棚3万個いけます。ただ、今日中に売り文句が必要です」
ブランド担当:「便利だけで押すと、うちの価格帯では弱いです」

choices:

- 「片手で開けやすい」を主軸にし、売り文句を先に作る
  - good: 顧客の具体的な不満から価値を作っている。
  - risk: 製造可能性を確認する前に売り文句が先行する。
  - immediate: 営業は提案を進めやすくなる。
  - delayed: 機構変更が必要なら原価と品質試験が重くなる。
  - next: 原価レビューで、開閉機構の追加費用が論点になる。
  - result: 顧客の不満を強い価値に変える判断が多い。
  - meterEffects: {"customer_value":2,"sales_team_buy_in":2,"manufacturing_feasibility":-1,"gross_margin":-1}
  - misconceptionEffect: 商品企画はアイデアを出せば終わりではなく、そのアイデアが作れるかまで追う必要がある。

- 「薄型で重ねやすい」を主軸にし、競合差分を取りに行く
  - good: 顧客不満と競合比較をつないでいる。
  - risk: ブランドらしさが弱いと価格競争に巻き込まれる。
  - immediate: 営業とブランドの両方に説明しやすい。
  - delayed: 競合追随に見え、独自性が弱くなる可能性がある。
  - next: 原価レビューでは金型費と初回数量の回収が論点になる。
  - result: 市場差分を仕様に翻訳する判断が多い。
  - meterEffects: {"customer_value":1,"sales_team_buy_in":1,"brand_fit":1,"manufacturing_feasibility":-1}
  - misconceptionEffect: 企画は斬新さだけでなく、比較棚で選ばれる理由を作る仕事。

- 密閉品質を守り、既存構造の小改良に絞る
  - good: ブランド品質と製造安定を守っている。
  - risk: 顧客の痛みを商品価値に変えきれていない。
  - immediate: 製造と品質保証には通しやすい。
  - delayed: 顧客の不満に対する変化が弱く、営業の棚提案が鈍る。
  - next: 原価表では堅いが、営業から売れる理由を問われる。
  - result: 品質と製造安定を先に守る判断が多い。
  - meterEffects: {"brand_fit":2,"manufacturing_feasibility":2,"gross_margin":1,"customer_value":-2,"sales_team_buy_in":-1}
  - misconceptionEffect: 作りやすいだけでは商品企画の価値にならず、顧客が選ぶ理由も必要。

#### 10:55 原価表の赤字

openingHook: 10:55。原価表の粗利欄が赤くなった。2,980円では、目標粗利を3.8ポイント下回る。

workMaterial:
原価表
- 予定売価: 2,980円
- 目標粗利率: 35%
- 現行案粗利率: 31.2%
- 開閉機構追加: +42円/個
- 薄型金型費: 680万円
- 初回数量: 営業希望30,000個、保守試算15,000個

npcDialogue:
原価担当:「このままだと粗利31.2%。目標35%に届きません」
製造:「新しいヒンジは試験2週間。春発売に間に合うか怪しいです」

choices:

- 開けやすさ機構を残し、外装色と同梱物を削って粗利を戻す
  - good: 顧客が感じる価値を守っている。
  - risk: ブランド体験と製造試験にしわ寄せが出る。
  - immediate: 顧客価値は残るが、ブランドの見え方は弱くなる。
  - delayed: 品質試験が遅れると発売スケジュールに影響する。
  - next: 営業には分かりやすい売り文句を渡せる。
  - result: 価値の芯を残して周辺を削る判断が多い。
  - meterEffects: {"customer_value":2,"gross_margin":1,"brand_fit":-1,"manufacturing_feasibility":-1}
  - misconceptionEffect: 企画は足し算ではなく、何を削って価値を残すかの仕事でもある。

- 薄型化を残し、初回数量3万個の確約を営業条件にする
  - good: 競合差分と粗利回収をつないでいる。
  - risk: 営業見込みに依存しすぎる。
  - immediate: 粗利の説明は立つが、営業の数量責任が重くなる。
  - delayed: 初回数量が下振れると在庫と粗利の両方が悪化する。
  - next: 午後、営業部門から強い売り文句の要求が来る。
  - result: 数量と仕様をセットで設計する判断が多い。
  - meterEffects: {"sales_team_buy_in":1,"gross_margin":2,"customer_value":1,"manufacturing_feasibility":-1}
  - misconceptionEffect: 売れる予感は、数量・粗利・在庫リスクまで見て初めて企画になる。

- 新規機構をやめ、既存金型で価格と粗利を守る
  - good: 粗利と製造リスクを明確に守っている。
  - risk: 企画としての変化が弱い。
  - immediate: 原価と製造は安定する。
  - delayed: 顧客アンケートの不満に答えられず、棚で埋もれる恐れがある。
  - next: 営業から「何が新しいのか」と詰められる。
  - result: 事業採算と製造安定を優先する判断が多い。
  - meterEffects: {"gross_margin":3,"manufacturing_feasibility":2,"customer_value":-2,"sales_team_buy_in":-1}
  - misconceptionEffect: 数字を守るだけでは、顧客が選ぶ理由を作れない。

#### 12:40 営業の棚提案締切

openingHook: 12:40。営業チャットが光った。「量販店Xの商談、15時に前倒し。売れる一文ください」

workMaterial:
営業メモ
- 量販店X 商談15:00
- 希望売価 2,980円
- 初回数量 30,000個希望
表現候補
A: 片手でラクに開け閉め
B: 冷蔵庫で重ねてすっきり
C: 密閉長持ちで作り置きに安心
根拠状況: Aは社内試作評価のみ、Bは寸法比較あり、Cは密閉試験未完了

npcDialogue:
営業:「棚は今日決まります。ぼんやりした表現だと競合に負けます」
品質保証:「比較表現を出すなら、測定条件をそろえてください」

choices:

- 「片手でラク」を前面に出し、試作評価を根拠として添える
  - good: 顧客の言葉に近い売り文句を作っている。
  - risk: 根拠が弱く、表示修正の可能性がある。
  - immediate: 営業は商談で話しやすい。
  - delayed: 社内評価だけでは、品質保証から表現修正を求められる。
  - next: 品質保証レビューで「ラク」の根拠が問われる。
  - result: 売れる表現を先に作る判断が多い。
  - meterEffects: {"sales_team_buy_in":2,"customer_value":2,"brand_fit":1,"manufacturing_feasibility":-1,"gross_margin":-1}
  - misconceptionEffect: 企画の言葉はコピーではなく、根拠付きの仕様説明である。

- 寸法根拠のある「重ねてすっきり」に絞る
  - good: 競合比較と根拠をセットにしている。
  - risk: 顧客の強い不満である開けやすさからは少し離れる。
  - immediate: 営業の勢いは少し落ちるが、品質保証に通しやすい。
  - delayed: 派手さは弱いが、表示リスクを抑えて商談に出せる。
  - next: 品質保証レビューでは測定条件の明記が中心になる。
  - result: 売れる言葉と根拠の両方を残す判断が多い。
  - meterEffects: {"sales_team_buy_in":1,"customer_value":1,"brand_fit":1,"manufacturing_feasibility":1,"gross_margin":1,"launch_speed":-1}
  - misconceptionEffect: 商品企画は目立つ言葉を作るより、通せる言葉を設計する仕事。

- 表現を弱め、「使いやすさに配慮」に留める
  - good: 表示リスクを避けている。
  - risk: 売れる理由を営業に渡せていない。
  - immediate: 品質保証リスクは低い。
  - delayed: 営業の商談資料が弱くなり、初回数量が下がる可能性がある。
  - next: 営業から商品企画の価値を問われる。
  - result: ブランドと表示安全性を守る判断が多い。
  - meterEffects: {"manufacturing_feasibility":1,"brand_fit":2,"sales_team_buy_in":-2,"customer_value":-1}
  - misconceptionEffect: 守りの表現だけでは、棚で選ばれる理由を作れない。

#### 14:20 品質保証の差し止め

openingHook: 14:20。品質保証のコメントは一行だった。「この表現では、店頭POPに出せません」

workMaterial:
品質保証コメント
- 「片手でラク」: 評価者5名の試作コメントのみ。客観データ不足
- 「密閉長持ち」: 密閉試験未完了。使用不可
- 「重ねてすっきり」: 寸法比較あり。条件明記なら可
試験計画: 開閉耐久 2週間、密閉試験 10日

npcDialogue:
品質保証:「比較条件なしの“ラク”は危ないです」
営業:「今止めたら棚が消えます」
ブランド担当:「短期で売れても、信頼を削る表現は避けたい」

choices:

- 「片手でラク」を残し、店頭POPではなく営業トーク限定にする
  - good: 商談機会を守りながら表現リスクを一部下げている。
  - risk: 現場で表現が膨らむ可能性がある。
  - immediate: 営業は商談で価値を語れる。
  - delayed: 口頭説明でも過度な表現が残ると、期待値と実物の差が出る。
  - next: 最終判定で、営業トーク管理が条件になる。
  - result: 営業現場の自由度を残す判断が多い。
  - meterEffects: {"sales_team_buy_in":2,"customer_value":1,"brand_fit":-2,"manufacturing_feasibility":-1}
  - misconceptionEffect: 表示しなければ安全ではなく、営業トークも商品価値の一部として管理が必要。

- 「重ねてすっきり」に統一し、寸法比較の注記を入れる
  - good: 品質保証、営業、ブランドの通る接点を作っている。
  - risk: 顧客価値の尖りは弱くなる。
  - immediate: 品質保証は通しやすく、営業も最低限の売り文句を持てる。
  - delayed: 開けやすさの強い不満には直接答えにくい。
  - next: 最終判定では、発売スケジュールと初回数量を現実的に決められる。
  - result: 根拠のある価値に絞る判断が多い。
  - meterEffects: {"brand_fit":2,"manufacturing_feasibility":1,"sales_team_buy_in":1,"customer_value":1,"gross_margin":1,"launch_speed":-1}
  - misconceptionEffect: 商品企画は「言いたいこと」より「言えること」を選ぶ場面が多い。

- 商談資料から機能訴求を外し、ブランドの安心感だけで出す
  - good: 表示リスクとブランド毀損を抑えている。
  - risk: 顧客が選ぶ理由を削りすぎている。
  - immediate: 品質保証とブランドは安心する。
  - delayed: 営業は競合比較で弱くなり、初回数量が下がる可能性がある。
  - next: 最終判定で、発売しても売れる根拠が弱いと指摘される。
  - result: ブランド保全を優先する判断が多い。
  - meterEffects: {"brand_fit":3,"manufacturing_feasibility":2,"sales_team_buy_in":-2,"customer_value":-2,"launch_speed":1}
  - misconceptionEffect: ブランドを守るだけでは新商品の役割を果たせない。

#### 16:35 発売判定の15分前

openingHook: 16:35。発売判定シートの未決欄は3つ残った。初回数量、表示文言、試験完了日。

workMaterial:
発売判定シート
- 売価: 2,980円
- 初回数量案: 15,000個 / 30,000個
- 粗利率: 15,000個 33.1%、30,000個 35.4%
- 表示: 「重ねてすっきり」条件付き可
- 試験: 開閉耐久と密閉は発売後訴求更新候補
- 発売予定: 春棚、回答期限17:00

npcDialogue:
営業:「3万個で棚を取りに行きたいです」
製造:「初回は1.5万個なら歩留まりを見ながら回せます」
品質保証:「表示は“重ねてすっきり”まで。試験後に更新なら可です」

choices:

- 3万個で発売し、営業機会を取りに行く
  - good: 市場機会を逃さず、粗利回収の筋もある。
  - risk: 製造と品質保証の条件が未消化のまま大きく出る。
  - immediate: 営業は量販店Xに強く出られる。
  - delayed: 製造歩留まりや表示修正が遅れると、在庫とクレームリスクが増える。
  - next: 結果では市場機会を優先するタイプとして表れる。
  - result: 売場と初回数量を取りに行く判断が多い。
  - meterEffects: {"sales_team_buy_in":3,"gross_margin":1,"launch_speed":2,"manufacturing_feasibility":-2,"brand_fit":-1}
  - misconceptionEffect: 商品企画は攻めるほど、製造と品質の未確定を背負う。

- 1.5万個で段階発売し、試験後に訴求を強める
  - good: 製造、品質保証、営業の条件を現実的に束ねている。
  - risk: 初回の市場インパクトと粗利率は弱くなる。
  - immediate: 営業の勢いは抑えるが、発売後の責任を持ちやすい。
  - delayed: 売場獲得は小さくなるが、試験結果で訴求を強める余地が残る。
  - next: 結果では顧客価値を通る仕様に翻訳するタイプとして表れる。
  - result: 段階発売で価値と実行可能性を両立する判断が多い。
  - meterEffects: {"manufacturing_feasibility":2,"brand_fit":2,"customer_value":1,"gross_margin":-1,"sales_team_buy_in":-1}
  - misconceptionEffect: 商品企画はアイデアを出す仕事ではなく、通る仕様と発売条件を設計する仕事だと理解できる。

- 発売を2週間延期し、開閉・密閉試験を完了してから出す
  - good: 根拠のない訴求を避け、ブランド信頼を守っている。
  - risk: 発売スケジュールと営業機会を大きく犠牲にする。
  - immediate: 品質保証とブランドの不安は解消しやすい。
  - delayed: 量販店Xの春棚を失い、初回数量が下がる可能性がある。
  - next: 結果では品質根拠を優先するタイプとして表れる。
  - result: 発売後の信頼を守る判断が多い。
  - meterEffects: {"brand_fit":3,"manufacturing_feasibility":2,"customer_value":1,"launch_speed":-3,"sales_team_buy_in":-2}
  - misconceptionEffect: 完璧にしてから出す判断にも、売場機会を失う代償がある。



### Result Types

#### 仕様翻訳型プランナー
- roleRealityReveal: 商品企画は、顧客価値を原価・製造・営業・品質保証・ブランドに通る仕様へ翻訳する仕事です。
- misconceptionCorrection: 「アイデアを出す仕事」から、「価値を通る条件に変える仕事」へ理解が進んでいます。
- decisionPatternSummary: 根拠のある表現と段階的な発売条件で、関係者の衝突を調整する傾向があります。
- careerReflectionPrompt: 良いアイデアを削ってでも発売後に責任を持てる条件を作ることに興味が持てるか振り返ってください。

#### 顧客価値突破型プランナー
- roleRealityReveal: 顧客価値を強く出すほど、製造・原価・品質保証への翻訳責任が重くなります。
- misconceptionCorrection: 面白いアイデアほど、作れる仕様と根拠ある表現に直す必要があります。
- decisionPatternSummary: 顧客の痛みと営業機会を先に捉える傾向があります。
- careerReflectionPrompt: 顧客価値を守りながら、どの制約なら削れるか考えてください。

#### ブランド品質保全型プランナー
- roleRealityReveal: 品質とブランドを守る判断も商品企画の重要な仕事ですが、市場タイミングとの代償が残ります。
- misconceptionCorrection: 慎重に整えれば必ず良いわけではなく、売場と数量の機会損失も企画責任に含まれます。
- decisionPatternSummary: 根拠が揃うまで強い表現や大量発売を避ける傾向があります。
- careerReflectionPrompt: ブランド信頼と市場機会がぶつかったとき、自分はどちらのリスクを重く見るか振り返ってください。



resultFeedback.roleRealityReveal: 商品企画はアイデアを出すだけではなく、顧客価値を原価・製造・営業・品質保証・ブランドに通る仕様へ翻訳する仕事。

resultFeedback.misconceptionCorrection: 「商品企画はアイデア職」という誤解から、「制約の中で価値を発売条件に変える職種」へ理解する。

resultFeedback.careerReflectionPrompt: 顧客が欲しい価値、会社が守る粗利、製造できる仕様、言い切れる表示の間で判断することに興味が持てるか。

resultFeedback.universityInsightTags: misconception_correction / quality_claim_literacy / margin_literacy

## Cβ Finalization Metadata

### 地方銀行 法人営業/融資担当

roleWorkKernel: 顧客の資金不安を、返済原資・保全・保証・条件・記録を備えた融資案に変換する仕事。

decision primitives:

- 資金不足の初期切り分け
- 返済原資評価
- 保証条件設計
- 稟議説明補強
- 条件付き最終回答

### 商品企画

roleWorkKernel: 顧客の不満と市場機会を、原価・製造・品質保証・営業・ブランドに通る発売仕様と発売条件に変換する仕事。

decision primitives:

- 顧客不満の仕様化
- 原価制約下の仕様削減
- 根拠ある売り文句設計
- 品質表示リスク判定
- 初回数量と発売条件判断
