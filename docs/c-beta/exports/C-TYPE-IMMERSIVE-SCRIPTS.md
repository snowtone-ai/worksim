# Cタイプ Immersive Scenario Scripts

地方銀行 法人営業/融資担当と商品企画の改善後没入モードスクリプト抜粋。

## Finance: Regional Bank Corporate Loan

Scenario: 金融 / 地方銀行 法人営業/融資担当

### 午前 (09:00-11:45)

#### 09:05 朝一番の資金繰りSOS

- Presenter: 先輩
- Core friction: 地域企業を支えたい気持ちと、返済原資・保証枠・審査規律を守る責任の衝突。
- Hidden work reality: 法人担当の初動は「貸せるか」ではなく、顧客の資金使途を資金繰り表・売掛・保証枠に分解して支店内で説明できる形にすること。
- NPC dialogue: 支店長: 「地域の雇用先だ。ただし前期から赤字だ。社長の顔だけ見て走るな、返済の出口も同時に見ろ」
- Work material: 資金繰り表断片: 5/31現預金420万円、給与900万円、仕入1,800万円、6/10売掛入金4,200万円。
- Prompt: 初期方針として何を先に動かしますか？

- a. 保証協会付き短期融資3,000万円を前提に、支店長へ即日相談する
  - good: 顧客の資金ショートに素早く向き合える。
  - risk: 返済原資と保証枠の確認が薄いまま進む。
  - next: 審査資料の不足が次の決算書確認で焦点になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":1,"compliance_safety":-2,"regional_impact":1,"internal_workload":-1}
  - misconceptionEffect: 「早く貸すことが支援」という理解に寄るが、審査材料不足の重さが残る。
- b. 直近試算表・売掛明細・保証協会残枠をそろえてから方針を決める
  - good: 銀行員としての説明責任を守れる。
  - risk: 社長の不安が増え、他行相談の余地が生まれる。
  - next: 資料は精密になるが、顧客への安心材料が必要になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":-1}
  - misconceptionEffect: 融資営業は資料確認が顧客支援の前提だと学ぶが、待たせる代償も出る。
- c. 社長へ30分訪問し、売掛入金の確度と給与遅配の影響を聞き取る
  - good: 数字だけでなく地域影響と社長の温度感を取れる。
  - risk: 稟議資料作成の時間が圧迫される。
  - next: ヒアリング内容が審査部との交渉材料になる。
  - meterEffects: {"customer_trust":2,"credit_risk":1,"branch_profit":0,"compliance_safety":1,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 銀行員は数字だけでなく地域雇用や社長の温度感も審査材料に変えると理解する。

#### 09:35 決算書にある在庫の違和感

- Presenter: データ
- Core friction: 顧客の説明を信じて早く進める圧と、数字の違和感を疑って貸倒を防ぐ責任の衝突。
- Hidden work reality: 決算書は過去の成績表ではなく、審査部に説明する論点メモの材料になる。
- NPC dialogue: 先輩: 「在庫が増えた理由を商品別に言えるか。そこを濁した稟議は、審査部でだいたい止まる」
- Work material: 論点メモ候補: 返済原資=6/10売掛入金、保全=保証協会/担保余力、懸念=在庫滞留と赤字継続。
- Prompt: 支店長に出す論点メモでは、何を中心に置きますか？

- a. 6/10の売掛入金4,200万円を返済原資として短期つなぎ融資を前面に出す
  - good: 短期融資の形に落とし込みやすい。
  - risk: 売掛入金の確度が弱いと説明が崩れる。
  - next: 審査部から売掛先の支払実績を求められる。
  - meterEffects: {"customer_trust":1,"credit_risk":-2,"branch_profit":1,"compliance_safety":-1,"regional_impact":0,"internal_workload":1}
  - misconceptionEffect: 売掛があれば貸せるという単純理解に寄り、入金確度確認の重要性が残る。
- b. 在庫増加と赤字の理由を主論点にし、融資額2,000万円案も併記する
  - good: 与信リスクを正面から扱える。
  - risk: 社長の希望額に届かず、関係が冷える。
  - next: 顧客へ減額可能性を伝える会話が発生する。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":0}
  - misconceptionEffect: 法人営業は顧客の説明をそのまま通す仕事ではなく、数字の違和感を扱う仕事だと理解する。
- c. 在庫年齢表・販売先発注書を取り、保証協会付き段階融資を検討する
  - good: 顧客事情と審査要件を接続できる。
  - risk: 資料依頼が多く本日回答が難しくなる。
  - next: 保証協会の実務上の詰まりを確認する流れになる。
  - meterEffects: {"customer_trust":1,"credit_risk":2,"branch_profit":1,"compliance_safety":1,"regional_impact":1,"internal_workload":-2}
  - misconceptionEffect: 融資判断は顧客事情と審査要件を接続する資料設計だと理解する。

#### 10:05 社長の焦りと保証協会の現実

- Presenter: 同僚
- Core friction: 顧客の焦りを受け止めたい気持ちと、審査前に確約できない銀行員としての責任の衝突。
- Hidden work reality: 銀行員の言葉は、雑談でも顧客には約束に聞こえる。期待値管理は融資実務の一部。
- NPC dialogue: 同僚: 「“たぶん大丈夫”は、社長には“銀行が約束した”に変換されるよ」
- Work material: 選択肢メモ: 満額保証協会付き、給与分先行、改善計画付き段階融資。
- Prompt: 社長への折り返し電話で、どこまで伝えますか？

- a. 「満額で動きます」と伝え、安心を優先して必要資料を後追いで依頼する
  - good: 社長の不安を即座に下げられる。
  - risk: 審査前に期待値を上げすぎる。
  - next: 審査部説明で表現の軽さが問題になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":0,"compliance_safety":-3,"regional_impact":1,"internal_workload":0}
  - misconceptionEffect: 顧客を安心させる言葉が金融では約束リスクになると学ぶ余地が残る。
- b. 確約は避け、給与分900万円の先行可否を検討すると伝える
  - good: 期待値を管理しながら切迫した資金使途に焦点を当てる。
  - risk: 社長には冷たく聞こえる可能性がある。
  - next: 審査部には説明しやすいが顧客フォローが必要になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":3,"regional_impact":0,"internal_workload":1}
  - misconceptionEffect: 冷たく見える確約回避も、顧客と銀行を守る実務だと理解する。
- c. 満額・給与分・段階融資の3案を提示し、改善計画の提出を求める
  - good: 銀行と企業が一緒に通す材料を作れる。
  - risk: 社長に宿題を増やし、今日の安心感は弱くなる。
  - next: 改善計画が午後の稟議説得材料になる。
  - meterEffects: {"customer_trust":1,"credit_risk":1,"branch_profit":1,"compliance_safety":1,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 銀行は顧客に宿題を出しながら一緒に通る材料を作る仕事だと理解する。

#### 10:40 審査部からの差し戻し

- Presenter: 上司
- Core friction: 地域支援をしたい支店の温度感と、審査部が求める返済出口・保全・説明責任の衝突。
- Hidden work reality: 審査部は敵ではなく、貸した後に顧客と銀行が壊れない条件を一緒に詰める相手。
- NPC dialogue: 審査部: 「地域性は分かります。ただ、赤字先に追加で出すなら、返済の出口を数字で言い切ってください」
- Work material: 売掛先入金実績: 過去12か月で遅延2回。最大遅延12日。直近3か月は期日通り。
- Prompt: 再提出する稟議案をどう組み直しますか？

- a. 保証協会付き3,000万円で再提出し、売掛入金実績と地域雇用20名を補足する
  - good: 顧客の必要額と地域影響を強く押し出せる。
  - risk: 保証協会判断に依存し、否決時の代替案が弱い。
  - next: 満額回答の条件をどう伝えるかが焦点になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":1,"compliance_safety":-1,"regional_impact":2,"internal_workload":-1}
  - misconceptionEffect: 地域支援を押し出す価値はあるが、保証依存の危うさも残る。
- b. 給与資金900万円のみプロパー短期で出し、仕入分は保証協会回答後に分ける
  - good: 給与遅配を防ぎつつ銀行の保全不足を抑えられる。
  - risk: 仕入が遅れ、売上回復機会を逃す可能性がある。
  - next: 社長の落胆をどう受け止めるかが問題になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":1}
  - misconceptionEffect: 必要資金を分けることで、支援と保全を両立する現実を理解する。
- c. 1,500万円を保証協会付き、残りは改善計画と売掛通知取得後に追加審査とする
  - good: 満額と否決の中間で、事業継続と返済確認を両立しやすい。
  - risk: 条件が複雑で、社長には半分しか助けないと聞こえる。
  - next: 条件説明と宿題設定が中心になる。
  - meterEffects: {"customer_trust":1,"credit_risk":2,"branch_profit":1,"compliance_safety":2,"regional_impact":1,"internal_workload":-2}
  - misconceptionEffect: 満額か否決かではなく、条件付き段階支援を組む仕事だと理解する。

#### 11:20 社長へ条件を伝える最終判断

- Presenter: 顧客
- Core friction: 顧客を安心させる言葉と、条件付き支援を誤解なく伝える説明責任の衝突。
- Hidden work reality: 融資の最後は金額決定ではなく、顧客が明日何をすれば前に進むかを具体化する説明設計。
- NPC dialogue: 支店長: 「相手が明日何をすればいいか分からない説明はするな。優しい言葉だけでも、条件の羅列だけでも足りない」
- Work material: 顧客説明メモ: 条件付き支援、追加資料、保証協会照会、次回審査日、給与支払い優先。
- Prompt: 社長への最終説明をどう組み立てますか？

- a. 条件付き1,500万円を前面に出し、「まず給与は守る方向です」と安心材料から伝える
  - good: 顧客が今日必要としている安心を先に渡せる。
  - risk: 条件付きである点が後回しになり期待値が上がる。
  - next: 結果では顧客信頼が高く、約束管理リスクも残る。
  - meterEffects: {"customer_trust":2,"credit_risk":-1,"branch_profit":0,"compliance_safety":-1,"regional_impact":1,"internal_workload":0}
  - misconceptionEffect: 安心を先に渡す価値と、条件付きである点を後回しにする危うさを体験する。
- b. 条件・未確定事項・追加資料を先に明示し、最後に支店として支援する意思を伝える
  - good: 銀行として誤解の少ない説明になる。
  - risk: 社長には事務的に聞こえ、支援意思が弱く伝わる。
  - next: 結果では法令安全性が高く、顧客感情面が課題になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":3,"regional_impact":-1,"internal_workload":1}
  - misconceptionEffect: 説明安全性を守るほど、支援意思が弱く伝わる現実を理解する。
- c. 支援意思、条件、社長が出す資料、次回判断日を順番に伝え、明朝の再面談を約束する
  - good: 安心と条件管理を両立し、顧客が次に動ける状態を作れる。
  - risk: 明朝面談の負荷が増え、他案件の時間を圧迫する。
  - next: 結果では総合的な伴走力として評価される。
  - meterEffects: {"customer_trust":2,"credit_risk":1,"branch_profit":1,"compliance_safety":2,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 法人担当は条件と安心を並べ、顧客の次行動まで設計する仕事だと理解する。

### 昼 (12:00-13:00)

#### 12:05 朝一番の資金繰りSOS

- Presenter: 先輩
- Core friction: 地域企業を支えたい気持ちと、返済原資・保証枠・審査規律を守る責任の衝突。
- Hidden work reality: 法人担当の初動は「貸せるか」ではなく、顧客の資金使途を資金繰り表・売掛・保証枠に分解して支店内で説明できる形にすること。
- NPC dialogue: 支店長: 「地域の雇用先だ。ただし前期から赤字だ。社長の顔だけ見て走るな、返済の出口も同時に見ろ」
- Work material: 資金繰り表断片: 5/31現預金420万円、給与900万円、仕入1,800万円、6/10売掛入金4,200万円。
- Prompt: 初期方針として何を先に動かしますか？

- a. 保証協会付き短期融資3,000万円を前提に、支店長へ即日相談する
  - good: 顧客の資金ショートに素早く向き合える。
  - risk: 返済原資と保証枠の確認が薄いまま進む。
  - next: 審査資料の不足が次の決算書確認で焦点になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":1,"compliance_safety":-2,"regional_impact":1,"internal_workload":-1}
  - misconceptionEffect: 「早く貸すことが支援」という理解に寄るが、審査材料不足の重さが残る。
- b. 直近試算表・売掛明細・保証協会残枠をそろえてから方針を決める
  - good: 銀行員としての説明責任を守れる。
  - risk: 社長の不安が増え、他行相談の余地が生まれる。
  - next: 資料は精密になるが、顧客への安心材料が必要になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":-1}
  - misconceptionEffect: 融資営業は資料確認が顧客支援の前提だと学ぶが、待たせる代償も出る。
- c. 社長へ30分訪問し、売掛入金の確度と給与遅配の影響を聞き取る
  - good: 数字だけでなく地域影響と社長の温度感を取れる。
  - risk: 稟議資料作成の時間が圧迫される。
  - next: ヒアリング内容が審査部との交渉材料になる。
  - meterEffects: {"customer_trust":2,"credit_risk":1,"branch_profit":0,"compliance_safety":1,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 銀行員は数字だけでなく地域雇用や社長の温度感も審査材料に変えると理解する。

#### 12:15 決算書にある在庫の違和感

- Presenter: データ
- Core friction: 顧客の説明を信じて早く進める圧と、数字の違和感を疑って貸倒を防ぐ責任の衝突。
- Hidden work reality: 決算書は過去の成績表ではなく、審査部に説明する論点メモの材料になる。
- NPC dialogue: 先輩: 「在庫が増えた理由を商品別に言えるか。そこを濁した稟議は、審査部でだいたい止まる」
- Work material: 論点メモ候補: 返済原資=6/10売掛入金、保全=保証協会/担保余力、懸念=在庫滞留と赤字継続。
- Prompt: 支店長に出す論点メモでは、何を中心に置きますか？

- a. 6/10の売掛入金4,200万円を返済原資として短期つなぎ融資を前面に出す
  - good: 短期融資の形に落とし込みやすい。
  - risk: 売掛入金の確度が弱いと説明が崩れる。
  - next: 審査部から売掛先の支払実績を求められる。
  - meterEffects: {"customer_trust":1,"credit_risk":-2,"branch_profit":1,"compliance_safety":-1,"regional_impact":0,"internal_workload":1}
  - misconceptionEffect: 売掛があれば貸せるという単純理解に寄り、入金確度確認の重要性が残る。
- b. 在庫増加と赤字の理由を主論点にし、融資額2,000万円案も併記する
  - good: 与信リスクを正面から扱える。
  - risk: 社長の希望額に届かず、関係が冷える。
  - next: 顧客へ減額可能性を伝える会話が発生する。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":0}
  - misconceptionEffect: 法人営業は顧客の説明をそのまま通す仕事ではなく、数字の違和感を扱う仕事だと理解する。
- c. 在庫年齢表・販売先発注書を取り、保証協会付き段階融資を検討する
  - good: 顧客事情と審査要件を接続できる。
  - risk: 資料依頼が多く本日回答が難しくなる。
  - next: 保証協会の実務上の詰まりを確認する流れになる。
  - meterEffects: {"customer_trust":1,"credit_risk":2,"branch_profit":1,"compliance_safety":1,"regional_impact":1,"internal_workload":-2}
  - misconceptionEffect: 融資判断は顧客事情と審査要件を接続する資料設計だと理解する。

#### 12:25 社長の焦りと保証協会の現実

- Presenter: 同僚
- Core friction: 顧客の焦りを受け止めたい気持ちと、審査前に確約できない銀行員としての責任の衝突。
- Hidden work reality: 銀行員の言葉は、雑談でも顧客には約束に聞こえる。期待値管理は融資実務の一部。
- NPC dialogue: 同僚: 「“たぶん大丈夫”は、社長には“銀行が約束した”に変換されるよ」
- Work material: 選択肢メモ: 満額保証協会付き、給与分先行、改善計画付き段階融資。
- Prompt: 社長への折り返し電話で、どこまで伝えますか？

- a. 「満額で動きます」と伝え、安心を優先して必要資料を後追いで依頼する
  - good: 社長の不安を即座に下げられる。
  - risk: 審査前に期待値を上げすぎる。
  - next: 審査部説明で表現の軽さが問題になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":0,"compliance_safety":-3,"regional_impact":1,"internal_workload":0}
  - misconceptionEffect: 顧客を安心させる言葉が金融では約束リスクになると学ぶ余地が残る。
- b. 確約は避け、給与分900万円の先行可否を検討すると伝える
  - good: 期待値を管理しながら切迫した資金使途に焦点を当てる。
  - risk: 社長には冷たく聞こえる可能性がある。
  - next: 審査部には説明しやすいが顧客フォローが必要になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":3,"regional_impact":0,"internal_workload":1}
  - misconceptionEffect: 冷たく見える確約回避も、顧客と銀行を守る実務だと理解する。
- c. 満額・給与分・段階融資の3案を提示し、改善計画の提出を求める
  - good: 銀行と企業が一緒に通す材料を作れる。
  - risk: 社長に宿題を増やし、今日の安心感は弱くなる。
  - next: 改善計画が午後の稟議説得材料になる。
  - meterEffects: {"customer_trust":1,"credit_risk":1,"branch_profit":1,"compliance_safety":1,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 銀行は顧客に宿題を出しながら一緒に通る材料を作る仕事だと理解する。

#### 12:35 審査部からの差し戻し

- Presenter: 上司
- Core friction: 地域支援をしたい支店の温度感と、審査部が求める返済出口・保全・説明責任の衝突。
- Hidden work reality: 審査部は敵ではなく、貸した後に顧客と銀行が壊れない条件を一緒に詰める相手。
- NPC dialogue: 審査部: 「地域性は分かります。ただ、赤字先に追加で出すなら、返済の出口を数字で言い切ってください」
- Work material: 売掛先入金実績: 過去12か月で遅延2回。最大遅延12日。直近3か月は期日通り。
- Prompt: 再提出する稟議案をどう組み直しますか？

- a. 保証協会付き3,000万円で再提出し、売掛入金実績と地域雇用20名を補足する
  - good: 顧客の必要額と地域影響を強く押し出せる。
  - risk: 保証協会判断に依存し、否決時の代替案が弱い。
  - next: 満額回答の条件をどう伝えるかが焦点になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":1,"compliance_safety":-1,"regional_impact":2,"internal_workload":-1}
  - misconceptionEffect: 地域支援を押し出す価値はあるが、保証依存の危うさも残る。
- b. 給与資金900万円のみプロパー短期で出し、仕入分は保証協会回答後に分ける
  - good: 給与遅配を防ぎつつ銀行の保全不足を抑えられる。
  - risk: 仕入が遅れ、売上回復機会を逃す可能性がある。
  - next: 社長の落胆をどう受け止めるかが問題になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":1}
  - misconceptionEffect: 必要資金を分けることで、支援と保全を両立する現実を理解する。
- c. 1,500万円を保証協会付き、残りは改善計画と売掛通知取得後に追加審査とする
  - good: 満額と否決の中間で、事業継続と返済確認を両立しやすい。
  - risk: 条件が複雑で、社長には半分しか助けないと聞こえる。
  - next: 条件説明と宿題設定が中心になる。
  - meterEffects: {"customer_trust":1,"credit_risk":2,"branch_profit":1,"compliance_safety":2,"regional_impact":1,"internal_workload":-2}
  - misconceptionEffect: 満額か否決かではなく、条件付き段階支援を組む仕事だと理解する。

#### 12:50 社長へ条件を伝える最終判断

- Presenter: 顧客
- Core friction: 顧客を安心させる言葉と、条件付き支援を誤解なく伝える説明責任の衝突。
- Hidden work reality: 融資の最後は金額決定ではなく、顧客が明日何をすれば前に進むかを具体化する説明設計。
- NPC dialogue: 支店長: 「相手が明日何をすればいいか分からない説明はするな。優しい言葉だけでも、条件の羅列だけでも足りない」
- Work material: 顧客説明メモ: 条件付き支援、追加資料、保証協会照会、次回審査日、給与支払い優先。
- Prompt: 社長への最終説明をどう組み立てますか？

- a. 条件付き1,500万円を前面に出し、「まず給与は守る方向です」と安心材料から伝える
  - good: 顧客が今日必要としている安心を先に渡せる。
  - risk: 条件付きである点が後回しになり期待値が上がる。
  - next: 結果では顧客信頼が高く、約束管理リスクも残る。
  - meterEffects: {"customer_trust":2,"credit_risk":-1,"branch_profit":0,"compliance_safety":-1,"regional_impact":1,"internal_workload":0}
  - misconceptionEffect: 安心を先に渡す価値と、条件付きである点を後回しにする危うさを体験する。
- b. 条件・未確定事項・追加資料を先に明示し、最後に支店として支援する意思を伝える
  - good: 銀行として誤解の少ない説明になる。
  - risk: 社長には事務的に聞こえ、支援意思が弱く伝わる。
  - next: 結果では法令安全性が高く、顧客感情面が課題になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":3,"regional_impact":-1,"internal_workload":1}
  - misconceptionEffect: 説明安全性を守るほど、支援意思が弱く伝わる現実を理解する。
- c. 支援意思、条件、社長が出す資料、次回判断日を順番に伝え、明朝の再面談を約束する
  - good: 安心と条件管理を両立し、顧客が次に動ける状態を作れる。
  - risk: 明朝面談の負荷が増え、他案件の時間を圧迫する。
  - next: 結果では総合的な伴走力として評価される。
  - meterEffects: {"customer_trust":2,"credit_risk":1,"branch_profit":1,"compliance_safety":2,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 法人担当は条件と安心を並べ、顧客の次行動まで設計する仕事だと理解する。

### 午後会議 (13:30-15:00)

#### 13:35 朝一番の資金繰りSOS

- Presenter: 先輩
- Core friction: 地域企業を支えたい気持ちと、返済原資・保証枠・審査規律を守る責任の衝突。
- Hidden work reality: 法人担当の初動は「貸せるか」ではなく、顧客の資金使途を資金繰り表・売掛・保証枠に分解して支店内で説明できる形にすること。
- NPC dialogue: 支店長: 「地域の雇用先だ。ただし前期から赤字だ。社長の顔だけ見て走るな、返済の出口も同時に見ろ」
- Work material: 資金繰り表断片: 5/31現預金420万円、給与900万円、仕入1,800万円、6/10売掛入金4,200万円。
- Prompt: 初期方針として何を先に動かしますか？

- a. 保証協会付き短期融資3,000万円を前提に、支店長へ即日相談する
  - good: 顧客の資金ショートに素早く向き合える。
  - risk: 返済原資と保証枠の確認が薄いまま進む。
  - next: 審査資料の不足が次の決算書確認で焦点になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":1,"compliance_safety":-2,"regional_impact":1,"internal_workload":-1}
  - misconceptionEffect: 「早く貸すことが支援」という理解に寄るが、審査材料不足の重さが残る。
- b. 直近試算表・売掛明細・保証協会残枠をそろえてから方針を決める
  - good: 銀行員としての説明責任を守れる。
  - risk: 社長の不安が増え、他行相談の余地が生まれる。
  - next: 資料は精密になるが、顧客への安心材料が必要になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":-1}
  - misconceptionEffect: 融資営業は資料確認が顧客支援の前提だと学ぶが、待たせる代償も出る。
- c. 社長へ30分訪問し、売掛入金の確度と給与遅配の影響を聞き取る
  - good: 数字だけでなく地域影響と社長の温度感を取れる。
  - risk: 稟議資料作成の時間が圧迫される。
  - next: ヒアリング内容が審査部との交渉材料になる。
  - meterEffects: {"customer_trust":2,"credit_risk":1,"branch_profit":0,"compliance_safety":1,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 銀行員は数字だけでなく地域雇用や社長の温度感も審査材料に変えると理解する。

#### 13:50 決算書にある在庫の違和感

- Presenter: データ
- Core friction: 顧客の説明を信じて早く進める圧と、数字の違和感を疑って貸倒を防ぐ責任の衝突。
- Hidden work reality: 決算書は過去の成績表ではなく、審査部に説明する論点メモの材料になる。
- NPC dialogue: 先輩: 「在庫が増えた理由を商品別に言えるか。そこを濁した稟議は、審査部でだいたい止まる」
- Work material: 論点メモ候補: 返済原資=6/10売掛入金、保全=保証協会/担保余力、懸念=在庫滞留と赤字継続。
- Prompt: 支店長に出す論点メモでは、何を中心に置きますか？

- a. 6/10の売掛入金4,200万円を返済原資として短期つなぎ融資を前面に出す
  - good: 短期融資の形に落とし込みやすい。
  - risk: 売掛入金の確度が弱いと説明が崩れる。
  - next: 審査部から売掛先の支払実績を求められる。
  - meterEffects: {"customer_trust":1,"credit_risk":-2,"branch_profit":1,"compliance_safety":-1,"regional_impact":0,"internal_workload":1}
  - misconceptionEffect: 売掛があれば貸せるという単純理解に寄り、入金確度確認の重要性が残る。
- b. 在庫増加と赤字の理由を主論点にし、融資額2,000万円案も併記する
  - good: 与信リスクを正面から扱える。
  - risk: 社長の希望額に届かず、関係が冷える。
  - next: 顧客へ減額可能性を伝える会話が発生する。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":0}
  - misconceptionEffect: 法人営業は顧客の説明をそのまま通す仕事ではなく、数字の違和感を扱う仕事だと理解する。
- c. 在庫年齢表・販売先発注書を取り、保証協会付き段階融資を検討する
  - good: 顧客事情と審査要件を接続できる。
  - risk: 資料依頼が多く本日回答が難しくなる。
  - next: 保証協会の実務上の詰まりを確認する流れになる。
  - meterEffects: {"customer_trust":1,"credit_risk":2,"branch_profit":1,"compliance_safety":1,"regional_impact":1,"internal_workload":-2}
  - misconceptionEffect: 融資判断は顧客事情と審査要件を接続する資料設計だと理解する。

#### 14:05 社長の焦りと保証協会の現実

- Presenter: 同僚
- Core friction: 顧客の焦りを受け止めたい気持ちと、審査前に確約できない銀行員としての責任の衝突。
- Hidden work reality: 銀行員の言葉は、雑談でも顧客には約束に聞こえる。期待値管理は融資実務の一部。
- NPC dialogue: 同僚: 「“たぶん大丈夫”は、社長には“銀行が約束した”に変換されるよ」
- Work material: 選択肢メモ: 満額保証協会付き、給与分先行、改善計画付き段階融資。
- Prompt: 社長への折り返し電話で、どこまで伝えますか？

- a. 「満額で動きます」と伝え、安心を優先して必要資料を後追いで依頼する
  - good: 社長の不安を即座に下げられる。
  - risk: 審査前に期待値を上げすぎる。
  - next: 審査部説明で表現の軽さが問題になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":0,"compliance_safety":-3,"regional_impact":1,"internal_workload":0}
  - misconceptionEffect: 顧客を安心させる言葉が金融では約束リスクになると学ぶ余地が残る。
- b. 確約は避け、給与分900万円の先行可否を検討すると伝える
  - good: 期待値を管理しながら切迫した資金使途に焦点を当てる。
  - risk: 社長には冷たく聞こえる可能性がある。
  - next: 審査部には説明しやすいが顧客フォローが必要になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":3,"regional_impact":0,"internal_workload":1}
  - misconceptionEffect: 冷たく見える確約回避も、顧客と銀行を守る実務だと理解する。
- c. 満額・給与分・段階融資の3案を提示し、改善計画の提出を求める
  - good: 銀行と企業が一緒に通す材料を作れる。
  - risk: 社長に宿題を増やし、今日の安心感は弱くなる。
  - next: 改善計画が午後の稟議説得材料になる。
  - meterEffects: {"customer_trust":1,"credit_risk":1,"branch_profit":1,"compliance_safety":1,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 銀行は顧客に宿題を出しながら一緒に通る材料を作る仕事だと理解する。

#### 14:25 審査部からの差し戻し

- Presenter: 上司
- Core friction: 地域支援をしたい支店の温度感と、審査部が求める返済出口・保全・説明責任の衝突。
- Hidden work reality: 審査部は敵ではなく、貸した後に顧客と銀行が壊れない条件を一緒に詰める相手。
- NPC dialogue: 審査部: 「地域性は分かります。ただ、赤字先に追加で出すなら、返済の出口を数字で言い切ってください」
- Work material: 売掛先入金実績: 過去12か月で遅延2回。最大遅延12日。直近3か月は期日通り。
- Prompt: 再提出する稟議案をどう組み直しますか？

- a. 保証協会付き3,000万円で再提出し、売掛入金実績と地域雇用20名を補足する
  - good: 顧客の必要額と地域影響を強く押し出せる。
  - risk: 保証協会判断に依存し、否決時の代替案が弱い。
  - next: 満額回答の条件をどう伝えるかが焦点になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":1,"compliance_safety":-1,"regional_impact":2,"internal_workload":-1}
  - misconceptionEffect: 地域支援を押し出す価値はあるが、保証依存の危うさも残る。
- b. 給与資金900万円のみプロパー短期で出し、仕入分は保証協会回答後に分ける
  - good: 給与遅配を防ぎつつ銀行の保全不足を抑えられる。
  - risk: 仕入が遅れ、売上回復機会を逃す可能性がある。
  - next: 社長の落胆をどう受け止めるかが問題になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":1}
  - misconceptionEffect: 必要資金を分けることで、支援と保全を両立する現実を理解する。
- c. 1,500万円を保証協会付き、残りは改善計画と売掛通知取得後に追加審査とする
  - good: 満額と否決の中間で、事業継続と返済確認を両立しやすい。
  - risk: 条件が複雑で、社長には半分しか助けないと聞こえる。
  - next: 条件説明と宿題設定が中心になる。
  - meterEffects: {"customer_trust":1,"credit_risk":2,"branch_profit":1,"compliance_safety":2,"regional_impact":1,"internal_workload":-2}
  - misconceptionEffect: 満額か否決かではなく、条件付き段階支援を組む仕事だと理解する。

#### 14:45 社長へ条件を伝える最終判断

- Presenter: 顧客
- Core friction: 顧客を安心させる言葉と、条件付き支援を誤解なく伝える説明責任の衝突。
- Hidden work reality: 融資の最後は金額決定ではなく、顧客が明日何をすれば前に進むかを具体化する説明設計。
- NPC dialogue: 支店長: 「相手が明日何をすればいいか分からない説明はするな。優しい言葉だけでも、条件の羅列だけでも足りない」
- Work material: 顧客説明メモ: 条件付き支援、追加資料、保証協会照会、次回審査日、給与支払い優先。
- Prompt: 社長への最終説明をどう組み立てますか？

- a. 条件付き1,500万円を前面に出し、「まず給与は守る方向です」と安心材料から伝える
  - good: 顧客が今日必要としている安心を先に渡せる。
  - risk: 条件付きである点が後回しになり期待値が上がる。
  - next: 結果では顧客信頼が高く、約束管理リスクも残る。
  - meterEffects: {"customer_trust":2,"credit_risk":-1,"branch_profit":0,"compliance_safety":-1,"regional_impact":1,"internal_workload":0}
  - misconceptionEffect: 安心を先に渡す価値と、条件付きである点を後回しにする危うさを体験する。
- b. 条件・未確定事項・追加資料を先に明示し、最後に支店として支援する意思を伝える
  - good: 銀行として誤解の少ない説明になる。
  - risk: 社長には事務的に聞こえ、支援意思が弱く伝わる。
  - next: 結果では法令安全性が高く、顧客感情面が課題になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":3,"regional_impact":-1,"internal_workload":1}
  - misconceptionEffect: 説明安全性を守るほど、支援意思が弱く伝わる現実を理解する。
- c. 支援意思、条件、社長が出す資料、次回判断日を順番に伝え、明朝の再面談を約束する
  - good: 安心と条件管理を両立し、顧客が次に動ける状態を作れる。
  - risk: 明朝面談の負荷が増え、他案件の時間を圧迫する。
  - next: 結果では総合的な伴走力として評価される。
  - meterEffects: {"customer_trust":2,"credit_risk":1,"branch_profit":1,"compliance_safety":2,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 法人担当は条件と安心を並べ、顧客の次行動まで設計する仕事だと理解する。

### 夕方 (15:10-18:00)

#### 15:15 朝一番の資金繰りSOS

- Presenter: 先輩
- Core friction: 地域企業を支えたい気持ちと、返済原資・保証枠・審査規律を守る責任の衝突。
- Hidden work reality: 法人担当の初動は「貸せるか」ではなく、顧客の資金使途を資金繰り表・売掛・保証枠に分解して支店内で説明できる形にすること。
- NPC dialogue: 支店長: 「地域の雇用先だ。ただし前期から赤字だ。社長の顔だけ見て走るな、返済の出口も同時に見ろ」
- Work material: 資金繰り表断片: 5/31現預金420万円、給与900万円、仕入1,800万円、6/10売掛入金4,200万円。
- Prompt: 初期方針として何を先に動かしますか？

- a. 保証協会付き短期融資3,000万円を前提に、支店長へ即日相談する
  - good: 顧客の資金ショートに素早く向き合える。
  - risk: 返済原資と保証枠の確認が薄いまま進む。
  - next: 審査資料の不足が次の決算書確認で焦点になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":1,"compliance_safety":-2,"regional_impact":1,"internal_workload":-1}
  - misconceptionEffect: 「早く貸すことが支援」という理解に寄るが、審査材料不足の重さが残る。
- b. 直近試算表・売掛明細・保証協会残枠をそろえてから方針を決める
  - good: 銀行員としての説明責任を守れる。
  - risk: 社長の不安が増え、他行相談の余地が生まれる。
  - next: 資料は精密になるが、顧客への安心材料が必要になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":-1}
  - misconceptionEffect: 融資営業は資料確認が顧客支援の前提だと学ぶが、待たせる代償も出る。
- c. 社長へ30分訪問し、売掛入金の確度と給与遅配の影響を聞き取る
  - good: 数字だけでなく地域影響と社長の温度感を取れる。
  - risk: 稟議資料作成の時間が圧迫される。
  - next: ヒアリング内容が審査部との交渉材料になる。
  - meterEffects: {"customer_trust":2,"credit_risk":1,"branch_profit":0,"compliance_safety":1,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 銀行員は数字だけでなく地域雇用や社長の温度感も審査材料に変えると理解する。

#### 15:45 決算書にある在庫の違和感

- Presenter: データ
- Core friction: 顧客の説明を信じて早く進める圧と、数字の違和感を疑って貸倒を防ぐ責任の衝突。
- Hidden work reality: 決算書は過去の成績表ではなく、審査部に説明する論点メモの材料になる。
- NPC dialogue: 先輩: 「在庫が増えた理由を商品別に言えるか。そこを濁した稟議は、審査部でだいたい止まる」
- Work material: 論点メモ候補: 返済原資=6/10売掛入金、保全=保証協会/担保余力、懸念=在庫滞留と赤字継続。
- Prompt: 支店長に出す論点メモでは、何を中心に置きますか？

- a. 6/10の売掛入金4,200万円を返済原資として短期つなぎ融資を前面に出す
  - good: 短期融資の形に落とし込みやすい。
  - risk: 売掛入金の確度が弱いと説明が崩れる。
  - next: 審査部から売掛先の支払実績を求められる。
  - meterEffects: {"customer_trust":1,"credit_risk":-2,"branch_profit":1,"compliance_safety":-1,"regional_impact":0,"internal_workload":1}
  - misconceptionEffect: 売掛があれば貸せるという単純理解に寄り、入金確度確認の重要性が残る。
- b. 在庫増加と赤字の理由を主論点にし、融資額2,000万円案も併記する
  - good: 与信リスクを正面から扱える。
  - risk: 社長の希望額に届かず、関係が冷える。
  - next: 顧客へ減額可能性を伝える会話が発生する。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":0}
  - misconceptionEffect: 法人営業は顧客の説明をそのまま通す仕事ではなく、数字の違和感を扱う仕事だと理解する。
- c. 在庫年齢表・販売先発注書を取り、保証協会付き段階融資を検討する
  - good: 顧客事情と審査要件を接続できる。
  - risk: 資料依頼が多く本日回答が難しくなる。
  - next: 保証協会の実務上の詰まりを確認する流れになる。
  - meterEffects: {"customer_trust":1,"credit_risk":2,"branch_profit":1,"compliance_safety":1,"regional_impact":1,"internal_workload":-2}
  - misconceptionEffect: 融資判断は顧客事情と審査要件を接続する資料設計だと理解する。

#### 16:15 社長の焦りと保証協会の現実

- Presenter: 同僚
- Core friction: 顧客の焦りを受け止めたい気持ちと、審査前に確約できない銀行員としての責任の衝突。
- Hidden work reality: 銀行員の言葉は、雑談でも顧客には約束に聞こえる。期待値管理は融資実務の一部。
- NPC dialogue: 同僚: 「“たぶん大丈夫”は、社長には“銀行が約束した”に変換されるよ」
- Work material: 選択肢メモ: 満額保証協会付き、給与分先行、改善計画付き段階融資。
- Prompt: 社長への折り返し電話で、どこまで伝えますか？

- a. 「満額で動きます」と伝え、安心を優先して必要資料を後追いで依頼する
  - good: 社長の不安を即座に下げられる。
  - risk: 審査前に期待値を上げすぎる。
  - next: 審査部説明で表現の軽さが問題になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":0,"compliance_safety":-3,"regional_impact":1,"internal_workload":0}
  - misconceptionEffect: 顧客を安心させる言葉が金融では約束リスクになると学ぶ余地が残る。
- b. 確約は避け、給与分900万円の先行可否を検討すると伝える
  - good: 期待値を管理しながら切迫した資金使途に焦点を当てる。
  - risk: 社長には冷たく聞こえる可能性がある。
  - next: 審査部には説明しやすいが顧客フォローが必要になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":3,"regional_impact":0,"internal_workload":1}
  - misconceptionEffect: 冷たく見える確約回避も、顧客と銀行を守る実務だと理解する。
- c. 満額・給与分・段階融資の3案を提示し、改善計画の提出を求める
  - good: 銀行と企業が一緒に通す材料を作れる。
  - risk: 社長に宿題を増やし、今日の安心感は弱くなる。
  - next: 改善計画が午後の稟議説得材料になる。
  - meterEffects: {"customer_trust":1,"credit_risk":1,"branch_profit":1,"compliance_safety":1,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 銀行は顧客に宿題を出しながら一緒に通る材料を作る仕事だと理解する。

#### 16:50 審査部からの差し戻し

- Presenter: 上司
- Core friction: 地域支援をしたい支店の温度感と、審査部が求める返済出口・保全・説明責任の衝突。
- Hidden work reality: 審査部は敵ではなく、貸した後に顧客と銀行が壊れない条件を一緒に詰める相手。
- NPC dialogue: 審査部: 「地域性は分かります。ただ、赤字先に追加で出すなら、返済の出口を数字で言い切ってください」
- Work material: 売掛先入金実績: 過去12か月で遅延2回。最大遅延12日。直近3か月は期日通り。
- Prompt: 再提出する稟議案をどう組み直しますか？

- a. 保証協会付き3,000万円で再提出し、売掛入金実績と地域雇用20名を補足する
  - good: 顧客の必要額と地域影響を強く押し出せる。
  - risk: 保証協会判断に依存し、否決時の代替案が弱い。
  - next: 満額回答の条件をどう伝えるかが焦点になる。
  - meterEffects: {"customer_trust":2,"credit_risk":-2,"branch_profit":1,"compliance_safety":-1,"regional_impact":2,"internal_workload":-1}
  - misconceptionEffect: 地域支援を押し出す価値はあるが、保証依存の危うさも残る。
- b. 給与資金900万円のみプロパー短期で出し、仕入分は保証協会回答後に分ける
  - good: 給与遅配を防ぎつつ銀行の保全不足を抑えられる。
  - risk: 仕入が遅れ、売上回復機会を逃す可能性がある。
  - next: 社長の落胆をどう受け止めるかが問題になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":2,"regional_impact":-1,"internal_workload":1}
  - misconceptionEffect: 必要資金を分けることで、支援と保全を両立する現実を理解する。
- c. 1,500万円を保証協会付き、残りは改善計画と売掛通知取得後に追加審査とする
  - good: 満額と否決の中間で、事業継続と返済確認を両立しやすい。
  - risk: 条件が複雑で、社長には半分しか助けないと聞こえる。
  - next: 条件説明と宿題設定が中心になる。
  - meterEffects: {"customer_trust":1,"credit_risk":2,"branch_profit":1,"compliance_safety":2,"regional_impact":1,"internal_workload":-2}
  - misconceptionEffect: 満額か否決かではなく、条件付き段階支援を組む仕事だと理解する。

#### 17:30 社長へ条件を伝える最終判断

- Presenter: 顧客
- Core friction: 顧客を安心させる言葉と、条件付き支援を誤解なく伝える説明責任の衝突。
- Hidden work reality: 融資の最後は金額決定ではなく、顧客が明日何をすれば前に進むかを具体化する説明設計。
- NPC dialogue: 支店長: 「相手が明日何をすればいいか分からない説明はするな。優しい言葉だけでも、条件の羅列だけでも足りない」
- Work material: 顧客説明メモ: 条件付き支援、追加資料、保証協会照会、次回審査日、給与支払い優先。
- Prompt: 社長への最終説明をどう組み立てますか？

- a. 条件付き1,500万円を前面に出し、「まず給与は守る方向です」と安心材料から伝える
  - good: 顧客が今日必要としている安心を先に渡せる。
  - risk: 条件付きである点が後回しになり期待値が上がる。
  - next: 結果では顧客信頼が高く、約束管理リスクも残る。
  - meterEffects: {"customer_trust":2,"credit_risk":-1,"branch_profit":0,"compliance_safety":-1,"regional_impact":1,"internal_workload":0}
  - misconceptionEffect: 安心を先に渡す価値と、条件付きである点を後回しにする危うさを体験する。
- b. 条件・未確定事項・追加資料を先に明示し、最後に支店として支援する意思を伝える
  - good: 銀行として誤解の少ない説明になる。
  - risk: 社長には事務的に聞こえ、支援意思が弱く伝わる。
  - next: 結果では法令安全性が高く、顧客感情面が課題になる。
  - meterEffects: {"customer_trust":-1,"credit_risk":2,"branch_profit":0,"compliance_safety":3,"regional_impact":-1,"internal_workload":1}
  - misconceptionEffect: 説明安全性を守るほど、支援意思が弱く伝わる現実を理解する。
- c. 支援意思、条件、社長が出す資料、次回判断日を順番に伝え、明朝の再面談を約束する
  - good: 安心と条件管理を両立し、顧客が次に動ける状態を作れる。
  - risk: 明朝面談の負荷が増え、他案件の時間を圧迫する。
  - next: 結果では総合的な伴走力として評価される。
  - meterEffects: {"customer_trust":2,"credit_risk":1,"branch_profit":1,"compliance_safety":2,"regional_impact":2,"internal_workload":-2}
  - misconceptionEffect: 法人担当は条件と安心を並べ、顧客の次行動まで設計する仕事だと理解する。

## Manufacturing: Product Planning

Scenario: メーカー/ものづくり / 商品企画

### 午前 (09:00-11:45)

#### 09:05 市場調査で見えた不満

- Presenter: 先輩
- Core friction: 顧客が欲しい価値と、価格・ブランド・製造難度を同時に満たす必要の衝突。
- Hidden work reality: 市場調査はアイデアの種ではなく、原価表や棚条件とぶつける優先順位表になる。
- NPC dialogue: ブランド担当: 「便利だけど安っぽい、はうちでは出したくない。価格だけで勝つなら別ブランドでやる話です」
- Work material: 企画メモ: 洗いやすさ、漏れにくさ、保温、価格、ブランド整合性を同時に満たす必要がある。
- Prompt: 定例に出す企画方向をどう置きますか？

- a. 2,980円以下を守り、洗いやすい簡易パッキンを主価値にする
  - good: 価格と最大不満の洗いやすさに直球で応えられる。
  - risk: 保温力や高級感が弱く競合Aとの差が薄い。
  - next: 原価表では価格を守るための仕様削減が焦点になる。
  - meterEffects: {"customer_value":1,"brand_fit":-1,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":1,"launch_speed":2}
  - misconceptionEffect: 商品企画は価格と最大不満を絞る引き算も多いと理解する。
- b. 3,480円でも、食洗機対応と漏れにくさを両立する上位モデルにする
  - good: 顧客の深い不満に応え、ブランドらしい品質訴求ができる。
  - risk: 価格許容を超え、春棚で販売数量が伸びない可能性がある。
  - next: 原価表で粗利と製造難度の厳しさが見える。
  - meterEffects: {"customer_value":2,"brand_fit":2,"manufacturing_feasibility":-2,"gross_margin":-1,"sales_team_buy_in":-1,"launch_speed":-2}
  - misconceptionEffect: 良いアイデアほど製造・原価・数量の壁に当たると理解する。
- c. 標準2,980円と上位3,480円の2SKUで、棚とブランドの両方を取りに行く
  - good: 営業の数量要求とブランド訴求を分けて設計できる。
  - risk: SKU増で製造・在庫・販促が複雑になる。
  - next: 原価表では2SKU運用の負荷が問題になる。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":-2,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":-2}
  - misconceptionEffect: 複数SKUは便利な解決策に見えて、製造・在庫・販促の負荷を増やすと理解する。

#### 09:35 原価表が企画を削ってくる

- Presenter: データ
- Core friction: 粗利を守るために仕様を削る圧と、顧客不満を解く価値を残す責任の衝突。
- Hidden work reality: 商品企画では、足した機能よりも削った理由を営業・製造・ブランドへ説明する力が問われる。
- NPC dialogue: 製造担当: 「新パッキンと食洗機対応を両方入れるなら、春発売はかなり厳しい。金型を急がせるなら不良率も見てください」
- Work material: 発売スケジュール: 6月金型FIX、8月量産試作、10月初回生産、2月店頭。
- Prompt: 仕様削減案をどう返しますか？

- a. 食洗機対応を外し、手洗いしやすい形状と漏れにくさに絞る
  - good: 最大不満の洗いやすさを残しながら原価と発売時期を守れる。
  - risk: 食洗機対応を期待する層には弱い。
  - next: 営業レビューでは訴求文句の弱さを突かれる。
  - meterEffects: {"customer_value":1,"brand_fit":0,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":-1,"launch_speed":2}
  - misconceptionEffect: 仕様を削る判断も商品価値を守るための企画業務だと理解する。
- b. 売価を3,480円に上げ、食洗機対応と漏れにくさを残して粗利を守る
  - good: 価値の核を削らず、ブランドらしい品質を守れる。
  - risk: 営業の初回導入ハードルが上がる。
  - next: 価格の根拠を営業へ説明する必要がある。
  - meterEffects: {"customer_value":2,"brand_fit":2,"manufacturing_feasibility":-1,"gross_margin":1,"sales_team_buy_in":-2,"launch_speed":-1}
  - misconceptionEffect: 価値を残すには価格と数量の代償を引き受ける必要があると理解する。
- c. 初回は手洗いモデルで春発売し、食洗機対応版を秋追加のロードマップにする
  - good: 発売時期を守りつつ上位価値を次弾へ残せる。
  - risk: 初回商品の魅力が中途半端になる。
  - next: 営業には2段階展開の棚作りを依頼する必要がある。
  - meterEffects: {"customer_value":1,"brand_fit":1,"manufacturing_feasibility":1,"gross_margin":1,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: ロードマップ化は妥協ではなく、価値を段階的に実装する企画判断だと理解する。

#### 10:05 営業部の「売れる理由」要求

- Presenter: 同僚
- Core friction: 店頭で刺さる強い言葉と、性能根拠・ブランド表現の安全性の衝突。
- Hidden work reality: 営業に渡す一言はコピー案ではなく、量販店の棚・初回数量・返品率を左右する販売材料。
- NPC dialogue: 営業担当: 「棚の前でお客さんが手を止める理由を一言でください。良い商品です、では量販店Xは動きません」
- Work material: 棚割り条件: 初回数量、価格帯、POP訴求、返品率想定。
- Prompt: 営業向け訴求をどう作りますか？

- a. 「汁漏れしにくい」を前面に出し、バッグ内トラブル不安を店頭POPで強く訴求する
  - good: 顧客の具体的な不安に刺さり、店頭で伝わりやすい。
  - risk: 試験基準が弱いと品質保証から表現を止められる。
  - next: 漏れ試験データの扱いが焦点になる。
  - meterEffects: {"customer_value":2,"brand_fit":-1,"manufacturing_feasibility":-1,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":1}
  - misconceptionEffect: 強い売り文句は魅力的だが、根拠不足なら後工程で止まると理解する。
- b. 「洗いやすさ」を中心にし、パッキン形状の写真で清潔感を訴求する
  - good: アンケート1位の不満に沿い、ブランドの清潔感とも合う。
  - risk: 競合との差が地味で店頭の瞬発力は弱い。
  - next: 品質保証は通りやすいが最終数量で揉める。
  - meterEffects: {"customer_value":1,"brand_fit":2,"manufacturing_feasibility":1,"gross_margin":0,"sales_team_buy_in":-1,"launch_speed":1}
  - misconceptionEffect: 地味な訴求でも、ブランドと品質根拠に沿う判断があると理解する。
- c. POPは洗いやすさ主軸、Web販促で漏れ試験動画を出す二段訴求にする
  - good: 店頭とWebで訴求を分け、表現リスクと販売力を両立できる。
  - risk: 販促素材の制作が増え、発売準備を圧迫する。
  - next: 品質保証と販促制作の両方を巻き込む必要が出る。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":0,"gross_margin":-1,"sales_team_buy_in":2,"launch_speed":-2}
  - misconceptionEffect: 店頭とWebで訴求を分けるには制作・品質確認の追加負荷が伴うと理解する。

#### 10:40 品質保証が止めた表現

- Presenter: 上司
- Core friction: 販促力を残したい営業の圧と、品質保証・表示リスク・ブランド信頼を守る責任の衝突。
- Hidden work reality: パッケージの一語は発売後のクレーム対応、返品率、ブランド毀損に直結する。
- NPC dialogue: 品質保証: 「売れる表現は大事です。ただ、クレーム窓口に来るのは“注記を読まなかった人”です」
- Work material: POP修正案: A「汁漏れしにくい」 B「汁漏れしにくい構造」 C「持ち運びに配慮した密閉構造」。
- Prompt: パッケージ表現をどう修正しますか？

- a. 「汁漏れしにくい」を残し、注記で使用条件を書く
  - good: 営業が求める強い訴求を残せる。
  - risk: 注記を読まない顧客からクレームが出る可能性がある。
  - next: 最終判断で返品リスクをどう受け止めるかが問われる。
  - meterEffects: {"customer_value":2,"brand_fit":-2,"manufacturing_feasibility":-1,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":1}
  - misconceptionEffect: 売れる表現を残すほど、発売後クレームとブランド毀損リスクが増えると理解する。
- b. 「汁漏れしにくい構造」に弱め、試験条件をWebで公開する
  - good: 根拠と訴求のバランスが取れ、品質保証も通しやすい。
  - risk: 店頭の一言訴求は少し弱くなる。
  - next: 発売スケジュールを守れる可能性が高まる。
  - meterEffects: {"customer_value":1,"brand_fit":2,"manufacturing_feasibility":1,"gross_margin":0,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: 表現を少し弱めて根拠を公開することも、企画の現実的な勝ち筋だと理解する。
- c. 漏れ訴求を外し、「洗いやすさ」と「清潔感」へ全面変更する
  - good: 品質リスクを大きく下げ、ブランド毀損を避けられる。
  - risk: 営業が期待した差別化が弱まり初回数量が下がる。
  - next: 営業部の納得形成が課題になる。
  - meterEffects: {"customer_value":-1,"brand_fit":2,"manufacturing_feasibility":2,"gross_margin":0,"sales_team_buy_in":-2,"launch_speed":1}
  - misconceptionEffect: 品質を守る判断は正しいが、売場で選ばれる理由を失う代償があると理解する。

#### 11:20 発売判定の最後の10分

- Presenter: 顧客
- Core friction: 発売速度、顧客価値、製造可能性、粗利、営業納得、ブランド信頼を同時に配分する最終葛藤。
- Hidden work reality: 発売判定は多数決ではなく、企画が「どのリスクを会社が持つか」を言語化する場。
- NPC dialogue: 商品企画部長: 「全員が100点の案はない。売れなかった時、漏れた時、遅れた時、どれを会社として持つのか言って」
- Work material: 残り時間: 10分。今日の結論が金型発注と初回数量に直結する。
- Prompt: 最終方針として何を提案しますか？

- a. 2,980円・初回3万個で春発売を取り、訴求は洗いやすさ中心にする
  - good: 春棚と数量を取り、販売機会を最大化できる。
  - risk: 粗利と差別化が弱く、売れても利益が薄い可能性がある。
  - next: 結果では発売速度と営業納得が高く、粗利が課題になる。
  - meterEffects: {"customer_value":0,"brand_fit":-1,"manufacturing_feasibility":-1,"gross_margin":-2,"sales_team_buy_in":3,"launch_speed":3}
  - misconceptionEffect: 発売速度と数量を取る判断は華やかだが、売れても利益が薄い現実を理解する。
- b. 3,480円・初回1.2万個で、品質とブランド訴求を守って発売する
  - good: 粗利とブランド価値を守り、長く売れる商品にしやすい。
  - risk: 春棚での面積が小さく初速が鈍る可能性がある。
  - next: 結果ではブランドFitが高く、販売現場の巻き込みが課題になる。
  - meterEffects: {"customer_value":1,"brand_fit":3,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":-2,"launch_speed":-1}
  - misconceptionEffect: ブランド品質を守るほど、初速と棚面積を犠牲にする現実を理解する。
- c. 春は2,980円を1.5万個に絞り、秋に食洗機対応上位版を追加する段階発売にする
  - good: 発売機会を逃さず、上位価値もロードマップに残せる。
  - risk: 2回分の開発・販促・在庫管理が必要になる。
  - next: 結果では総合バランスが高く、実行管理の重さが残る。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":1,"gross_margin":1,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: 段階発売は万能ではなく、2回分の開発・販促・在庫管理を背負うと理解する。

### 昼 (12:00-13:00)

#### 12:05 市場調査で見えた不満

- Presenter: 先輩
- Core friction: 顧客が欲しい価値と、価格・ブランド・製造難度を同時に満たす必要の衝突。
- Hidden work reality: 市場調査はアイデアの種ではなく、原価表や棚条件とぶつける優先順位表になる。
- NPC dialogue: ブランド担当: 「便利だけど安っぽい、はうちでは出したくない。価格だけで勝つなら別ブランドでやる話です」
- Work material: 企画メモ: 洗いやすさ、漏れにくさ、保温、価格、ブランド整合性を同時に満たす必要がある。
- Prompt: 定例に出す企画方向をどう置きますか？

- a. 2,980円以下を守り、洗いやすい簡易パッキンを主価値にする
  - good: 価格と最大不満の洗いやすさに直球で応えられる。
  - risk: 保温力や高級感が弱く競合Aとの差が薄い。
  - next: 原価表では価格を守るための仕様削減が焦点になる。
  - meterEffects: {"customer_value":1,"brand_fit":-1,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":1,"launch_speed":2}
  - misconceptionEffect: 商品企画は価格と最大不満を絞る引き算も多いと理解する。
- b. 3,480円でも、食洗機対応と漏れにくさを両立する上位モデルにする
  - good: 顧客の深い不満に応え、ブランドらしい品質訴求ができる。
  - risk: 価格許容を超え、春棚で販売数量が伸びない可能性がある。
  - next: 原価表で粗利と製造難度の厳しさが見える。
  - meterEffects: {"customer_value":2,"brand_fit":2,"manufacturing_feasibility":-2,"gross_margin":-1,"sales_team_buy_in":-1,"launch_speed":-2}
  - misconceptionEffect: 良いアイデアほど製造・原価・数量の壁に当たると理解する。
- c. 標準2,980円と上位3,480円の2SKUで、棚とブランドの両方を取りに行く
  - good: 営業の数量要求とブランド訴求を分けて設計できる。
  - risk: SKU増で製造・在庫・販促が複雑になる。
  - next: 原価表では2SKU運用の負荷が問題になる。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":-2,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":-2}
  - misconceptionEffect: 複数SKUは便利な解決策に見えて、製造・在庫・販促の負荷を増やすと理解する。

#### 12:15 原価表が企画を削ってくる

- Presenter: データ
- Core friction: 粗利を守るために仕様を削る圧と、顧客不満を解く価値を残す責任の衝突。
- Hidden work reality: 商品企画では、足した機能よりも削った理由を営業・製造・ブランドへ説明する力が問われる。
- NPC dialogue: 製造担当: 「新パッキンと食洗機対応を両方入れるなら、春発売はかなり厳しい。金型を急がせるなら不良率も見てください」
- Work material: 発売スケジュール: 6月金型FIX、8月量産試作、10月初回生産、2月店頭。
- Prompt: 仕様削減案をどう返しますか？

- a. 食洗機対応を外し、手洗いしやすい形状と漏れにくさに絞る
  - good: 最大不満の洗いやすさを残しながら原価と発売時期を守れる。
  - risk: 食洗機対応を期待する層には弱い。
  - next: 営業レビューでは訴求文句の弱さを突かれる。
  - meterEffects: {"customer_value":1,"brand_fit":0,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":-1,"launch_speed":2}
  - misconceptionEffect: 仕様を削る判断も商品価値を守るための企画業務だと理解する。
- b. 売価を3,480円に上げ、食洗機対応と漏れにくさを残して粗利を守る
  - good: 価値の核を削らず、ブランドらしい品質を守れる。
  - risk: 営業の初回導入ハードルが上がる。
  - next: 価格の根拠を営業へ説明する必要がある。
  - meterEffects: {"customer_value":2,"brand_fit":2,"manufacturing_feasibility":-1,"gross_margin":1,"sales_team_buy_in":-2,"launch_speed":-1}
  - misconceptionEffect: 価値を残すには価格と数量の代償を引き受ける必要があると理解する。
- c. 初回は手洗いモデルで春発売し、食洗機対応版を秋追加のロードマップにする
  - good: 発売時期を守りつつ上位価値を次弾へ残せる。
  - risk: 初回商品の魅力が中途半端になる。
  - next: 営業には2段階展開の棚作りを依頼する必要がある。
  - meterEffects: {"customer_value":1,"brand_fit":1,"manufacturing_feasibility":1,"gross_margin":1,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: ロードマップ化は妥協ではなく、価値を段階的に実装する企画判断だと理解する。

#### 12:25 営業部の「売れる理由」要求

- Presenter: 同僚
- Core friction: 店頭で刺さる強い言葉と、性能根拠・ブランド表現の安全性の衝突。
- Hidden work reality: 営業に渡す一言はコピー案ではなく、量販店の棚・初回数量・返品率を左右する販売材料。
- NPC dialogue: 営業担当: 「棚の前でお客さんが手を止める理由を一言でください。良い商品です、では量販店Xは動きません」
- Work material: 棚割り条件: 初回数量、価格帯、POP訴求、返品率想定。
- Prompt: 営業向け訴求をどう作りますか？

- a. 「汁漏れしにくい」を前面に出し、バッグ内トラブル不安を店頭POPで強く訴求する
  - good: 顧客の具体的な不安に刺さり、店頭で伝わりやすい。
  - risk: 試験基準が弱いと品質保証から表現を止められる。
  - next: 漏れ試験データの扱いが焦点になる。
  - meterEffects: {"customer_value":2,"brand_fit":-1,"manufacturing_feasibility":-1,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":1}
  - misconceptionEffect: 強い売り文句は魅力的だが、根拠不足なら後工程で止まると理解する。
- b. 「洗いやすさ」を中心にし、パッキン形状の写真で清潔感を訴求する
  - good: アンケート1位の不満に沿い、ブランドの清潔感とも合う。
  - risk: 競合との差が地味で店頭の瞬発力は弱い。
  - next: 品質保証は通りやすいが最終数量で揉める。
  - meterEffects: {"customer_value":1,"brand_fit":2,"manufacturing_feasibility":1,"gross_margin":0,"sales_team_buy_in":-1,"launch_speed":1}
  - misconceptionEffect: 地味な訴求でも、ブランドと品質根拠に沿う判断があると理解する。
- c. POPは洗いやすさ主軸、Web販促で漏れ試験動画を出す二段訴求にする
  - good: 店頭とWebで訴求を分け、表現リスクと販売力を両立できる。
  - risk: 販促素材の制作が増え、発売準備を圧迫する。
  - next: 品質保証と販促制作の両方を巻き込む必要が出る。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":0,"gross_margin":-1,"sales_team_buy_in":2,"launch_speed":-2}
  - misconceptionEffect: 店頭とWebで訴求を分けるには制作・品質確認の追加負荷が伴うと理解する。

#### 12:35 品質保証が止めた表現

- Presenter: 上司
- Core friction: 販促力を残したい営業の圧と、品質保証・表示リスク・ブランド信頼を守る責任の衝突。
- Hidden work reality: パッケージの一語は発売後のクレーム対応、返品率、ブランド毀損に直結する。
- NPC dialogue: 品質保証: 「売れる表現は大事です。ただ、クレーム窓口に来るのは“注記を読まなかった人”です」
- Work material: POP修正案: A「汁漏れしにくい」 B「汁漏れしにくい構造」 C「持ち運びに配慮した密閉構造」。
- Prompt: パッケージ表現をどう修正しますか？

- a. 「汁漏れしにくい」を残し、注記で使用条件を書く
  - good: 営業が求める強い訴求を残せる。
  - risk: 注記を読まない顧客からクレームが出る可能性がある。
  - next: 最終判断で返品リスクをどう受け止めるかが問われる。
  - meterEffects: {"customer_value":2,"brand_fit":-2,"manufacturing_feasibility":-1,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":1}
  - misconceptionEffect: 売れる表現を残すほど、発売後クレームとブランド毀損リスクが増えると理解する。
- b. 「汁漏れしにくい構造」に弱め、試験条件をWebで公開する
  - good: 根拠と訴求のバランスが取れ、品質保証も通しやすい。
  - risk: 店頭の一言訴求は少し弱くなる。
  - next: 発売スケジュールを守れる可能性が高まる。
  - meterEffects: {"customer_value":1,"brand_fit":2,"manufacturing_feasibility":1,"gross_margin":0,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: 表現を少し弱めて根拠を公開することも、企画の現実的な勝ち筋だと理解する。
- c. 漏れ訴求を外し、「洗いやすさ」と「清潔感」へ全面変更する
  - good: 品質リスクを大きく下げ、ブランド毀損を避けられる。
  - risk: 営業が期待した差別化が弱まり初回数量が下がる。
  - next: 営業部の納得形成が課題になる。
  - meterEffects: {"customer_value":-1,"brand_fit":2,"manufacturing_feasibility":2,"gross_margin":0,"sales_team_buy_in":-2,"launch_speed":1}
  - misconceptionEffect: 品質を守る判断は正しいが、売場で選ばれる理由を失う代償があると理解する。

#### 12:50 発売判定の最後の10分

- Presenter: 顧客
- Core friction: 発売速度、顧客価値、製造可能性、粗利、営業納得、ブランド信頼を同時に配分する最終葛藤。
- Hidden work reality: 発売判定は多数決ではなく、企画が「どのリスクを会社が持つか」を言語化する場。
- NPC dialogue: 商品企画部長: 「全員が100点の案はない。売れなかった時、漏れた時、遅れた時、どれを会社として持つのか言って」
- Work material: 残り時間: 10分。今日の結論が金型発注と初回数量に直結する。
- Prompt: 最終方針として何を提案しますか？

- a. 2,980円・初回3万個で春発売を取り、訴求は洗いやすさ中心にする
  - good: 春棚と数量を取り、販売機会を最大化できる。
  - risk: 粗利と差別化が弱く、売れても利益が薄い可能性がある。
  - next: 結果では発売速度と営業納得が高く、粗利が課題になる。
  - meterEffects: {"customer_value":0,"brand_fit":-1,"manufacturing_feasibility":-1,"gross_margin":-2,"sales_team_buy_in":3,"launch_speed":3}
  - misconceptionEffect: 発売速度と数量を取る判断は華やかだが、売れても利益が薄い現実を理解する。
- b. 3,480円・初回1.2万個で、品質とブランド訴求を守って発売する
  - good: 粗利とブランド価値を守り、長く売れる商品にしやすい。
  - risk: 春棚での面積が小さく初速が鈍る可能性がある。
  - next: 結果ではブランドFitが高く、販売現場の巻き込みが課題になる。
  - meterEffects: {"customer_value":1,"brand_fit":3,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":-2,"launch_speed":-1}
  - misconceptionEffect: ブランド品質を守るほど、初速と棚面積を犠牲にする現実を理解する。
- c. 春は2,980円を1.5万個に絞り、秋に食洗機対応上位版を追加する段階発売にする
  - good: 発売機会を逃さず、上位価値もロードマップに残せる。
  - risk: 2回分の開発・販促・在庫管理が必要になる。
  - next: 結果では総合バランスが高く、実行管理の重さが残る。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":1,"gross_margin":1,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: 段階発売は万能ではなく、2回分の開発・販促・在庫管理を背負うと理解する。

### 午後会議 (13:30-15:00)

#### 13:35 市場調査で見えた不満

- Presenter: 先輩
- Core friction: 顧客が欲しい価値と、価格・ブランド・製造難度を同時に満たす必要の衝突。
- Hidden work reality: 市場調査はアイデアの種ではなく、原価表や棚条件とぶつける優先順位表になる。
- NPC dialogue: ブランド担当: 「便利だけど安っぽい、はうちでは出したくない。価格だけで勝つなら別ブランドでやる話です」
- Work material: 企画メモ: 洗いやすさ、漏れにくさ、保温、価格、ブランド整合性を同時に満たす必要がある。
- Prompt: 定例に出す企画方向をどう置きますか？

- a. 2,980円以下を守り、洗いやすい簡易パッキンを主価値にする
  - good: 価格と最大不満の洗いやすさに直球で応えられる。
  - risk: 保温力や高級感が弱く競合Aとの差が薄い。
  - next: 原価表では価格を守るための仕様削減が焦点になる。
  - meterEffects: {"customer_value":1,"brand_fit":-1,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":1,"launch_speed":2}
  - misconceptionEffect: 商品企画は価格と最大不満を絞る引き算も多いと理解する。
- b. 3,480円でも、食洗機対応と漏れにくさを両立する上位モデルにする
  - good: 顧客の深い不満に応え、ブランドらしい品質訴求ができる。
  - risk: 価格許容を超え、春棚で販売数量が伸びない可能性がある。
  - next: 原価表で粗利と製造難度の厳しさが見える。
  - meterEffects: {"customer_value":2,"brand_fit":2,"manufacturing_feasibility":-2,"gross_margin":-1,"sales_team_buy_in":-1,"launch_speed":-2}
  - misconceptionEffect: 良いアイデアほど製造・原価・数量の壁に当たると理解する。
- c. 標準2,980円と上位3,480円の2SKUで、棚とブランドの両方を取りに行く
  - good: 営業の数量要求とブランド訴求を分けて設計できる。
  - risk: SKU増で製造・在庫・販促が複雑になる。
  - next: 原価表では2SKU運用の負荷が問題になる。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":-2,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":-2}
  - misconceptionEffect: 複数SKUは便利な解決策に見えて、製造・在庫・販促の負荷を増やすと理解する。

#### 13:50 原価表が企画を削ってくる

- Presenter: データ
- Core friction: 粗利を守るために仕様を削る圧と、顧客不満を解く価値を残す責任の衝突。
- Hidden work reality: 商品企画では、足した機能よりも削った理由を営業・製造・ブランドへ説明する力が問われる。
- NPC dialogue: 製造担当: 「新パッキンと食洗機対応を両方入れるなら、春発売はかなり厳しい。金型を急がせるなら不良率も見てください」
- Work material: 発売スケジュール: 6月金型FIX、8月量産試作、10月初回生産、2月店頭。
- Prompt: 仕様削減案をどう返しますか？

- a. 食洗機対応を外し、手洗いしやすい形状と漏れにくさに絞る
  - good: 最大不満の洗いやすさを残しながら原価と発売時期を守れる。
  - risk: 食洗機対応を期待する層には弱い。
  - next: 営業レビューでは訴求文句の弱さを突かれる。
  - meterEffects: {"customer_value":1,"brand_fit":0,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":-1,"launch_speed":2}
  - misconceptionEffect: 仕様を削る判断も商品価値を守るための企画業務だと理解する。
- b. 売価を3,480円に上げ、食洗機対応と漏れにくさを残して粗利を守る
  - good: 価値の核を削らず、ブランドらしい品質を守れる。
  - risk: 営業の初回導入ハードルが上がる。
  - next: 価格の根拠を営業へ説明する必要がある。
  - meterEffects: {"customer_value":2,"brand_fit":2,"manufacturing_feasibility":-1,"gross_margin":1,"sales_team_buy_in":-2,"launch_speed":-1}
  - misconceptionEffect: 価値を残すには価格と数量の代償を引き受ける必要があると理解する。
- c. 初回は手洗いモデルで春発売し、食洗機対応版を秋追加のロードマップにする
  - good: 発売時期を守りつつ上位価値を次弾へ残せる。
  - risk: 初回商品の魅力が中途半端になる。
  - next: 営業には2段階展開の棚作りを依頼する必要がある。
  - meterEffects: {"customer_value":1,"brand_fit":1,"manufacturing_feasibility":1,"gross_margin":1,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: ロードマップ化は妥協ではなく、価値を段階的に実装する企画判断だと理解する。

#### 14:05 営業部の「売れる理由」要求

- Presenter: 同僚
- Core friction: 店頭で刺さる強い言葉と、性能根拠・ブランド表現の安全性の衝突。
- Hidden work reality: 営業に渡す一言はコピー案ではなく、量販店の棚・初回数量・返品率を左右する販売材料。
- NPC dialogue: 営業担当: 「棚の前でお客さんが手を止める理由を一言でください。良い商品です、では量販店Xは動きません」
- Work material: 棚割り条件: 初回数量、価格帯、POP訴求、返品率想定。
- Prompt: 営業向け訴求をどう作りますか？

- a. 「汁漏れしにくい」を前面に出し、バッグ内トラブル不安を店頭POPで強く訴求する
  - good: 顧客の具体的な不安に刺さり、店頭で伝わりやすい。
  - risk: 試験基準が弱いと品質保証から表現を止められる。
  - next: 漏れ試験データの扱いが焦点になる。
  - meterEffects: {"customer_value":2,"brand_fit":-1,"manufacturing_feasibility":-1,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":1}
  - misconceptionEffect: 強い売り文句は魅力的だが、根拠不足なら後工程で止まると理解する。
- b. 「洗いやすさ」を中心にし、パッキン形状の写真で清潔感を訴求する
  - good: アンケート1位の不満に沿い、ブランドの清潔感とも合う。
  - risk: 競合との差が地味で店頭の瞬発力は弱い。
  - next: 品質保証は通りやすいが最終数量で揉める。
  - meterEffects: {"customer_value":1,"brand_fit":2,"manufacturing_feasibility":1,"gross_margin":0,"sales_team_buy_in":-1,"launch_speed":1}
  - misconceptionEffect: 地味な訴求でも、ブランドと品質根拠に沿う判断があると理解する。
- c. POPは洗いやすさ主軸、Web販促で漏れ試験動画を出す二段訴求にする
  - good: 店頭とWebで訴求を分け、表現リスクと販売力を両立できる。
  - risk: 販促素材の制作が増え、発売準備を圧迫する。
  - next: 品質保証と販促制作の両方を巻き込む必要が出る。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":0,"gross_margin":-1,"sales_team_buy_in":2,"launch_speed":-2}
  - misconceptionEffect: 店頭とWebで訴求を分けるには制作・品質確認の追加負荷が伴うと理解する。

#### 14:25 品質保証が止めた表現

- Presenter: 上司
- Core friction: 販促力を残したい営業の圧と、品質保証・表示リスク・ブランド信頼を守る責任の衝突。
- Hidden work reality: パッケージの一語は発売後のクレーム対応、返品率、ブランド毀損に直結する。
- NPC dialogue: 品質保証: 「売れる表現は大事です。ただ、クレーム窓口に来るのは“注記を読まなかった人”です」
- Work material: POP修正案: A「汁漏れしにくい」 B「汁漏れしにくい構造」 C「持ち運びに配慮した密閉構造」。
- Prompt: パッケージ表現をどう修正しますか？

- a. 「汁漏れしにくい」を残し、注記で使用条件を書く
  - good: 営業が求める強い訴求を残せる。
  - risk: 注記を読まない顧客からクレームが出る可能性がある。
  - next: 最終判断で返品リスクをどう受け止めるかが問われる。
  - meterEffects: {"customer_value":2,"brand_fit":-2,"manufacturing_feasibility":-1,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":1}
  - misconceptionEffect: 売れる表現を残すほど、発売後クレームとブランド毀損リスクが増えると理解する。
- b. 「汁漏れしにくい構造」に弱め、試験条件をWebで公開する
  - good: 根拠と訴求のバランスが取れ、品質保証も通しやすい。
  - risk: 店頭の一言訴求は少し弱くなる。
  - next: 発売スケジュールを守れる可能性が高まる。
  - meterEffects: {"customer_value":1,"brand_fit":2,"manufacturing_feasibility":1,"gross_margin":0,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: 表現を少し弱めて根拠を公開することも、企画の現実的な勝ち筋だと理解する。
- c. 漏れ訴求を外し、「洗いやすさ」と「清潔感」へ全面変更する
  - good: 品質リスクを大きく下げ、ブランド毀損を避けられる。
  - risk: 営業が期待した差別化が弱まり初回数量が下がる。
  - next: 営業部の納得形成が課題になる。
  - meterEffects: {"customer_value":-1,"brand_fit":2,"manufacturing_feasibility":2,"gross_margin":0,"sales_team_buy_in":-2,"launch_speed":1}
  - misconceptionEffect: 品質を守る判断は正しいが、売場で選ばれる理由を失う代償があると理解する。

#### 14:45 発売判定の最後の10分

- Presenter: 顧客
- Core friction: 発売速度、顧客価値、製造可能性、粗利、営業納得、ブランド信頼を同時に配分する最終葛藤。
- Hidden work reality: 発売判定は多数決ではなく、企画が「どのリスクを会社が持つか」を言語化する場。
- NPC dialogue: 商品企画部長: 「全員が100点の案はない。売れなかった時、漏れた時、遅れた時、どれを会社として持つのか言って」
- Work material: 残り時間: 10分。今日の結論が金型発注と初回数量に直結する。
- Prompt: 最終方針として何を提案しますか？

- a. 2,980円・初回3万個で春発売を取り、訴求は洗いやすさ中心にする
  - good: 春棚と数量を取り、販売機会を最大化できる。
  - risk: 粗利と差別化が弱く、売れても利益が薄い可能性がある。
  - next: 結果では発売速度と営業納得が高く、粗利が課題になる。
  - meterEffects: {"customer_value":0,"brand_fit":-1,"manufacturing_feasibility":-1,"gross_margin":-2,"sales_team_buy_in":3,"launch_speed":3}
  - misconceptionEffect: 発売速度と数量を取る判断は華やかだが、売れても利益が薄い現実を理解する。
- b. 3,480円・初回1.2万個で、品質とブランド訴求を守って発売する
  - good: 粗利とブランド価値を守り、長く売れる商品にしやすい。
  - risk: 春棚での面積が小さく初速が鈍る可能性がある。
  - next: 結果ではブランドFitが高く、販売現場の巻き込みが課題になる。
  - meterEffects: {"customer_value":1,"brand_fit":3,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":-2,"launch_speed":-1}
  - misconceptionEffect: ブランド品質を守るほど、初速と棚面積を犠牲にする現実を理解する。
- c. 春は2,980円を1.5万個に絞り、秋に食洗機対応上位版を追加する段階発売にする
  - good: 発売機会を逃さず、上位価値もロードマップに残せる。
  - risk: 2回分の開発・販促・在庫管理が必要になる。
  - next: 結果では総合バランスが高く、実行管理の重さが残る。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":1,"gross_margin":1,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: 段階発売は万能ではなく、2回分の開発・販促・在庫管理を背負うと理解する。

### 夕方 (15:10-18:00)

#### 15:15 市場調査で見えた不満

- Presenter: 先輩
- Core friction: 顧客が欲しい価値と、価格・ブランド・製造難度を同時に満たす必要の衝突。
- Hidden work reality: 市場調査はアイデアの種ではなく、原価表や棚条件とぶつける優先順位表になる。
- NPC dialogue: ブランド担当: 「便利だけど安っぽい、はうちでは出したくない。価格だけで勝つなら別ブランドでやる話です」
- Work material: 企画メモ: 洗いやすさ、漏れにくさ、保温、価格、ブランド整合性を同時に満たす必要がある。
- Prompt: 定例に出す企画方向をどう置きますか？

- a. 2,980円以下を守り、洗いやすい簡易パッキンを主価値にする
  - good: 価格と最大不満の洗いやすさに直球で応えられる。
  - risk: 保温力や高級感が弱く競合Aとの差が薄い。
  - next: 原価表では価格を守るための仕様削減が焦点になる。
  - meterEffects: {"customer_value":1,"brand_fit":-1,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":1,"launch_speed":2}
  - misconceptionEffect: 商品企画は価格と最大不満を絞る引き算も多いと理解する。
- b. 3,480円でも、食洗機対応と漏れにくさを両立する上位モデルにする
  - good: 顧客の深い不満に応え、ブランドらしい品質訴求ができる。
  - risk: 価格許容を超え、春棚で販売数量が伸びない可能性がある。
  - next: 原価表で粗利と製造難度の厳しさが見える。
  - meterEffects: {"customer_value":2,"brand_fit":2,"manufacturing_feasibility":-2,"gross_margin":-1,"sales_team_buy_in":-1,"launch_speed":-2}
  - misconceptionEffect: 良いアイデアほど製造・原価・数量の壁に当たると理解する。
- c. 標準2,980円と上位3,480円の2SKUで、棚とブランドの両方を取りに行く
  - good: 営業の数量要求とブランド訴求を分けて設計できる。
  - risk: SKU増で製造・在庫・販促が複雑になる。
  - next: 原価表では2SKU運用の負荷が問題になる。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":-2,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":-2}
  - misconceptionEffect: 複数SKUは便利な解決策に見えて、製造・在庫・販促の負荷を増やすと理解する。

#### 15:45 原価表が企画を削ってくる

- Presenter: データ
- Core friction: 粗利を守るために仕様を削る圧と、顧客不満を解く価値を残す責任の衝突。
- Hidden work reality: 商品企画では、足した機能よりも削った理由を営業・製造・ブランドへ説明する力が問われる。
- NPC dialogue: 製造担当: 「新パッキンと食洗機対応を両方入れるなら、春発売はかなり厳しい。金型を急がせるなら不良率も見てください」
- Work material: 発売スケジュール: 6月金型FIX、8月量産試作、10月初回生産、2月店頭。
- Prompt: 仕様削減案をどう返しますか？

- a. 食洗機対応を外し、手洗いしやすい形状と漏れにくさに絞る
  - good: 最大不満の洗いやすさを残しながら原価と発売時期を守れる。
  - risk: 食洗機対応を期待する層には弱い。
  - next: 営業レビューでは訴求文句の弱さを突かれる。
  - meterEffects: {"customer_value":1,"brand_fit":0,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":-1,"launch_speed":2}
  - misconceptionEffect: 仕様を削る判断も商品価値を守るための企画業務だと理解する。
- b. 売価を3,480円に上げ、食洗機対応と漏れにくさを残して粗利を守る
  - good: 価値の核を削らず、ブランドらしい品質を守れる。
  - risk: 営業の初回導入ハードルが上がる。
  - next: 価格の根拠を営業へ説明する必要がある。
  - meterEffects: {"customer_value":2,"brand_fit":2,"manufacturing_feasibility":-1,"gross_margin":1,"sales_team_buy_in":-2,"launch_speed":-1}
  - misconceptionEffect: 価値を残すには価格と数量の代償を引き受ける必要があると理解する。
- c. 初回は手洗いモデルで春発売し、食洗機対応版を秋追加のロードマップにする
  - good: 発売時期を守りつつ上位価値を次弾へ残せる。
  - risk: 初回商品の魅力が中途半端になる。
  - next: 営業には2段階展開の棚作りを依頼する必要がある。
  - meterEffects: {"customer_value":1,"brand_fit":1,"manufacturing_feasibility":1,"gross_margin":1,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: ロードマップ化は妥協ではなく、価値を段階的に実装する企画判断だと理解する。

#### 16:15 営業部の「売れる理由」要求

- Presenter: 同僚
- Core friction: 店頭で刺さる強い言葉と、性能根拠・ブランド表現の安全性の衝突。
- Hidden work reality: 営業に渡す一言はコピー案ではなく、量販店の棚・初回数量・返品率を左右する販売材料。
- NPC dialogue: 営業担当: 「棚の前でお客さんが手を止める理由を一言でください。良い商品です、では量販店Xは動きません」
- Work material: 棚割り条件: 初回数量、価格帯、POP訴求、返品率想定。
- Prompt: 営業向け訴求をどう作りますか？

- a. 「汁漏れしにくい」を前面に出し、バッグ内トラブル不安を店頭POPで強く訴求する
  - good: 顧客の具体的な不安に刺さり、店頭で伝わりやすい。
  - risk: 試験基準が弱いと品質保証から表現を止められる。
  - next: 漏れ試験データの扱いが焦点になる。
  - meterEffects: {"customer_value":2,"brand_fit":-1,"manufacturing_feasibility":-1,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":1}
  - misconceptionEffect: 強い売り文句は魅力的だが、根拠不足なら後工程で止まると理解する。
- b. 「洗いやすさ」を中心にし、パッキン形状の写真で清潔感を訴求する
  - good: アンケート1位の不満に沿い、ブランドの清潔感とも合う。
  - risk: 競合との差が地味で店頭の瞬発力は弱い。
  - next: 品質保証は通りやすいが最終数量で揉める。
  - meterEffects: {"customer_value":1,"brand_fit":2,"manufacturing_feasibility":1,"gross_margin":0,"sales_team_buy_in":-1,"launch_speed":1}
  - misconceptionEffect: 地味な訴求でも、ブランドと品質根拠に沿う判断があると理解する。
- c. POPは洗いやすさ主軸、Web販促で漏れ試験動画を出す二段訴求にする
  - good: 店頭とWebで訴求を分け、表現リスクと販売力を両立できる。
  - risk: 販促素材の制作が増え、発売準備を圧迫する。
  - next: 品質保証と販促制作の両方を巻き込む必要が出る。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":0,"gross_margin":-1,"sales_team_buy_in":2,"launch_speed":-2}
  - misconceptionEffect: 店頭とWebで訴求を分けるには制作・品質確認の追加負荷が伴うと理解する。

#### 16:50 品質保証が止めた表現

- Presenter: 上司
- Core friction: 販促力を残したい営業の圧と、品質保証・表示リスク・ブランド信頼を守る責任の衝突。
- Hidden work reality: パッケージの一語は発売後のクレーム対応、返品率、ブランド毀損に直結する。
- NPC dialogue: 品質保証: 「売れる表現は大事です。ただ、クレーム窓口に来るのは“注記を読まなかった人”です」
- Work material: POP修正案: A「汁漏れしにくい」 B「汁漏れしにくい構造」 C「持ち運びに配慮した密閉構造」。
- Prompt: パッケージ表現をどう修正しますか？

- a. 「汁漏れしにくい」を残し、注記で使用条件を書く
  - good: 営業が求める強い訴求を残せる。
  - risk: 注記を読まない顧客からクレームが出る可能性がある。
  - next: 最終判断で返品リスクをどう受け止めるかが問われる。
  - meterEffects: {"customer_value":2,"brand_fit":-2,"manufacturing_feasibility":-1,"gross_margin":0,"sales_team_buy_in":2,"launch_speed":1}
  - misconceptionEffect: 売れる表現を残すほど、発売後クレームとブランド毀損リスクが増えると理解する。
- b. 「汁漏れしにくい構造」に弱め、試験条件をWebで公開する
  - good: 根拠と訴求のバランスが取れ、品質保証も通しやすい。
  - risk: 店頭の一言訴求は少し弱くなる。
  - next: 発売スケジュールを守れる可能性が高まる。
  - meterEffects: {"customer_value":1,"brand_fit":2,"manufacturing_feasibility":1,"gross_margin":0,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: 表現を少し弱めて根拠を公開することも、企画の現実的な勝ち筋だと理解する。
- c. 漏れ訴求を外し、「洗いやすさ」と「清潔感」へ全面変更する
  - good: 品質リスクを大きく下げ、ブランド毀損を避けられる。
  - risk: 営業が期待した差別化が弱まり初回数量が下がる。
  - next: 営業部の納得形成が課題になる。
  - meterEffects: {"customer_value":-1,"brand_fit":2,"manufacturing_feasibility":2,"gross_margin":0,"sales_team_buy_in":-2,"launch_speed":1}
  - misconceptionEffect: 品質を守る判断は正しいが、売場で選ばれる理由を失う代償があると理解する。

#### 17:30 発売判定の最後の10分

- Presenter: 顧客
- Core friction: 発売速度、顧客価値、製造可能性、粗利、営業納得、ブランド信頼を同時に配分する最終葛藤。
- Hidden work reality: 発売判定は多数決ではなく、企画が「どのリスクを会社が持つか」を言語化する場。
- NPC dialogue: 商品企画部長: 「全員が100点の案はない。売れなかった時、漏れた時、遅れた時、どれを会社として持つのか言って」
- Work material: 残り時間: 10分。今日の結論が金型発注と初回数量に直結する。
- Prompt: 最終方針として何を提案しますか？

- a. 2,980円・初回3万個で春発売を取り、訴求は洗いやすさ中心にする
  - good: 春棚と数量を取り、販売機会を最大化できる。
  - risk: 粗利と差別化が弱く、売れても利益が薄い可能性がある。
  - next: 結果では発売速度と営業納得が高く、粗利が課題になる。
  - meterEffects: {"customer_value":0,"brand_fit":-1,"manufacturing_feasibility":-1,"gross_margin":-2,"sales_team_buy_in":3,"launch_speed":3}
  - misconceptionEffect: 発売速度と数量を取る判断は華やかだが、売れても利益が薄い現実を理解する。
- b. 3,480円・初回1.2万個で、品質とブランド訴求を守って発売する
  - good: 粗利とブランド価値を守り、長く売れる商品にしやすい。
  - risk: 春棚での面積が小さく初速が鈍る可能性がある。
  - next: 結果ではブランドFitが高く、販売現場の巻き込みが課題になる。
  - meterEffects: {"customer_value":1,"brand_fit":3,"manufacturing_feasibility":2,"gross_margin":2,"sales_team_buy_in":-2,"launch_speed":-1}
  - misconceptionEffect: ブランド品質を守るほど、初速と棚面積を犠牲にする現実を理解する。
- c. 春は2,980円を1.5万個に絞り、秋に食洗機対応上位版を追加する段階発売にする
  - good: 発売機会を逃さず、上位価値もロードマップに残せる。
  - risk: 2回分の開発・販促・在庫管理が必要になる。
  - next: 結果では総合バランスが高く、実行管理の重さが残る。
  - meterEffects: {"customer_value":2,"brand_fit":1,"manufacturing_feasibility":1,"gross_margin":1,"sales_team_buy_in":1,"launch_speed":-1}
  - misconceptionEffect: 段階発売は万能ではなく、2回分の開発・販促・在庫管理を背負うと理解する。
