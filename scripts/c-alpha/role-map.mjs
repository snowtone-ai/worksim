export const DIMENSION_LIBRARY = {
  problem_solving: {
    key: 'problem_solving',
    label: '問題解決力',
    description: '状況を整理し、現実的な打ち手を組み立てる力',
  },
  technical: {
    key: 'technical',
    label: '技術力',
    description: '技術や専門知識を使って実務を前に進める力',
  },
  logical: {
    key: 'logical',
    label: '論理的思考',
    description: '情報を比較し、筋道立てて判断する力',
  },
  communication: {
    key: 'communication',
    label: 'コミュニケーション',
    description: '相手に応じて伝え、合意形成する力',
  },
  ownership: {
    key: 'ownership',
    label: 'オーナーシップ',
    description: '自分事として責任を持ち、やり切る姿勢',
  },
  agility: {
    key: 'agility',
    label: '対応力',
    description: '変化やトラブルに素早く向き合う力',
  },
  ethics: {
    key: 'ethics',
    label: '倫理観',
    description: 'ルールや社会的影響を踏まえて判断する力',
  },
  creativity: {
    key: 'creativity',
    label: '発想力',
    description: '制約の中で新しい切り口を見つける力',
  },
}

export const ROLE_MAP = [
  {
    industry: 'IT・通信',
    industrySlug: 'it',
    roles: [
      { role: 'Webエンジニア/バックエンド', roleSlug: 'web-engineer', roleCategory: 'industry_specific', representative: true, difficulty: 'standard', tags: ['理系向け', '分析系', '高難易度'], archetype: 'technical_build', shortDescription: 'Webサービスの安定運用と改善を担うバックエンド職。' },
      { role: 'ITソリューション営業', roleSlug: 'it-solution-sales', roleCategory: 'industry_specific_sales', representative: false, difficulty: 'standard', tags: ['文系向け', '営業系', '人と関わる'], archetype: 'solution_sales', shortDescription: '顧客課題をIT提案に落とし込む法人営業。' },
      { role: 'PdM/プロダクト企画補佐', roleSlug: 'product-planning-assistant', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['企画系', '分析系', '人と関わる'], archetype: 'product_planning', shortDescription: 'プロダクト企画の補佐として要件整理と優先順位づけを担う。' },
      { role: 'インフラ/クラウド運用', roleSlug: 'cloud-operations', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['理系向け', '分析系', '高難易度'], archetype: 'operations_reliability', shortDescription: 'クラウド基盤の安定稼働と障害予防を支える。' },
      { role: 'データアナリスト/BI担当', roleSlug: 'data-analyst-bi', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['理系向け', '分析系', '企画系'], archetype: 'analytics_insight', shortDescription: '業務データを意思決定に変える分析担当。' },
    ],
  },
  {
    industry: '金融',
    industrySlug: 'finance',
    roles: [
      { role: '地方銀行 法人営業/融資担当', roleSlug: 'regional-bank-corporate-loan', roleCategory: 'industry_specific_sales', representative: true, difficulty: 'high', tags: ['営業系', '地方就職', '人と関わる'], archetype: 'finance_relationship', shortDescription: '地域企業の資金相談と融資提案を担う銀行法人担当。' },
      { role: '個人資産相談/リテール営業', roleSlug: 'retail-asset-advisor', roleCategory: 'industry_specific_sales', representative: false, difficulty: 'standard', tags: ['営業系', '人と関わる', '社会貢献'], archetype: 'finance_relationship', shortDescription: '個人顧客の資産形成を支える相談営業。' },
      { role: '与信審査/リスク管理', roleSlug: 'credit-risk-management', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['分析系', '高難易度', '社会貢献'], archetype: 'risk_control', shortDescription: '融資判断やリスク水準の見極めを担う。' },
      { role: '証券営業/マーケット提案', roleSlug: 'securities-market-advisory', roleCategory: 'industry_specific_sales', representative: false, difficulty: 'high', tags: ['営業系', '分析系', '高難易度'], archetype: 'finance_relationship', shortDescription: '市況を踏まえて投資提案を行う証券営業。' },
      { role: '保険営業/ライフプラン提案', roleSlug: 'insurance-life-planning', roleCategory: 'industry_specific_sales', representative: false, difficulty: 'standard', tags: ['営業系', '人と関わる', '社会貢献'], archetype: 'finance_relationship', shortDescription: 'ライフイベントに沿った保障設計を提案する。' },
    ],
  },
  {
    industry: 'メーカー/ものづくり',
    industrySlug: 'manufacturing',
    roles: [
      { role: '商品企画', roleSlug: 'product-planning', roleCategory: 'industry_specific', representative: true, difficulty: 'standard', tags: ['企画系', '分析系', '人と関わる'], archetype: 'product_planning', shortDescription: '市場ニーズを商品コンセプトに変える企画職。' },
      { role: '生産管理', roleSlug: 'production-control', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['分析系', '地方就職', '高難易度'], archetype: 'operations_reliability', shortDescription: '生産計画と納期調整を最適化する。' },
      { role: '品質保証', roleSlug: 'quality-assurance', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['理系向け', '分析系', '社会貢献'], archetype: 'risk_control', shortDescription: '不具合を未然に防ぎ品質基準を守る。' },
      { role: '購買/調達', roleSlug: 'procurement', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['分析系', '営業系', '人と関わる'], archetype: 'supply_coordination', shortDescription: '必要な部材を適切な条件で確保する調達担当。' },
      { role: '技術営業/フィールドサポート', roleSlug: 'technical-field-support', roleCategory: 'industry_specific_sales', representative: false, difficulty: 'standard', tags: ['営業系', '理系向け', '人と関わる'], archetype: 'solution_sales', shortDescription: '技術理解を活かして導入支援まで伴走する。' },
    ],
  },
  {
    industry: '商社/卸',
    industrySlug: 'trading',
    roles: [
      { role: '法人営業/トレーディング', roleSlug: 'corporate-trading-sales', roleCategory: 'industry_specific_sales', representative: true, difficulty: 'high', tags: ['営業系', '人と関わる', '高難易度'], archetype: 'solution_sales', shortDescription: '需給と採算を読みながら商流を動かす法人営業。' },
      { role: '事業開発/新規取引開拓', roleSlug: 'business-development', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['企画系', '営業系', '高難易度'], archetype: 'product_planning', shortDescription: '新たな取引機会や事業テーマを探索する。' },
      { role: '貿易実務/輸出入調整', roleSlug: 'trade-operations', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['分析系', '人と関わる', '高難易度'], archetype: 'supply_coordination', shortDescription: '輸出入書類と日程調整を正確に回す。' },
      { role: 'サプライチェーン調整', roleSlug: 'supply-chain-coordination', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['分析系', '地方就職', '高難易度'], archetype: 'supply_coordination', shortDescription: '需給変動に応じて物流と在庫を整える。' },
      { role: '海外営業/市場開拓', roleSlug: 'overseas-market-development', roleCategory: 'industry_specific_sales', representative: false, difficulty: 'high', tags: ['営業系', '人と関わる', '企画系'], archetype: 'solution_sales', shortDescription: '海外顧客との関係づくりと市場調査を担う。' },
    ],
  },
  {
    industry: '広告・マーケティング/メディア',
    industrySlug: 'marketing-media',
    roles: [
      { role: 'Webマーケター', roleSlug: 'web-marketer', roleCategory: 'industry_specific', representative: true, difficulty: 'standard', tags: ['分析系', '企画系', '理系向け'], archetype: 'analytics_insight', shortDescription: '集客施策を設計し数字で改善するマーケター。' },
      { role: '広告プランナー', roleSlug: 'ad-planner', roleCategory: 'industry_specific_sales', representative: false, difficulty: 'standard', tags: ['企画系', '営業系', '人と関わる'], archetype: 'campaign_planning', shortDescription: '課題に合わせた広告企画を組み立てる。' },
      { role: '運用型広告担当', roleSlug: 'performance-marketing', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['分析系', '高難易度', '理系向け'], archetype: 'analytics_insight', shortDescription: '広告運用を日次で改善する実行担当。' },
      { role: 'コンテンツ企画/編集', roleSlug: 'content-editor', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['企画系', '人と関わる', '社会貢献'], archetype: 'campaign_planning', shortDescription: '読み手視点でコンテンツの企画と編集を行う。' },
      { role: 'PR/ブランドコミュニケーション', roleSlug: 'pr-brand-communication', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['企画系', '人と関わる', '社会貢献'], archetype: 'campaign_planning', shortDescription: 'ブランドの見え方を社内外で整える。' },
    ],
  },
  {
    industry: 'コンサル/BPO/業務支援',
    industrySlug: 'consulting-bpo',
    roles: [
      { role: '業務改善コンサル', roleSlug: 'operations-consultant', roleCategory: 'industry_specific', representative: true, difficulty: 'high', tags: ['企画系', '分析系', '人と関わる'], archetype: 'consulting_facilitation', shortDescription: '現場課題を整理し改善案を実装までつなぐ。' },
      { role: 'IT/DXコンサル', roleSlug: 'it-dx-consultant', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['企画系', '理系向け', '人と関わる'], archetype: 'consulting_facilitation', shortDescription: '業務変革をIT導入計画に落とし込む。' },
      { role: '戦略リサーチアナリスト', roleSlug: 'strategy-research-analyst', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['分析系', '高難易度', '企画系'], archetype: 'analytics_insight', shortDescription: '情報を構造化して経営判断の材料にする。' },
      { role: 'PMO/プロジェクト推進', roleSlug: 'pmo-project-drive', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['企画系', '人と関わる', '分析系'], archetype: 'consulting_facilitation', shortDescription: 'プロジェクトの進行管理と課題整理を担う。' },
      { role: '人事組織コンサル', roleSlug: 'hr-organization-consultant', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['人と関わる', '企画系', '社会貢献'], archetype: 'consulting_facilitation', shortDescription: '制度設計と現場浸透を支援する組織コンサル。' },
    ],
  },
  {
    industry: '人材/HR',
    industrySlug: 'hr',
    roles: [
      { role: 'キャリアアドバイザー', roleSlug: 'career-advisor', roleCategory: 'industry_specific', representative: true, difficulty: 'standard', tags: ['人と関わる', '社会貢献', '営業系'], archetype: 'people_support', shortDescription: '学生や求職者の進路整理を支える相談役。' },
      { role: 'リクルーティングアドバイザー', roleSlug: 'recruiting-advisor', roleCategory: 'industry_specific_sales', representative: false, difficulty: 'standard', tags: ['営業系', '人と関わる', '分析系'], archetype: 'solution_sales', shortDescription: '企業の採用課題に向き合う法人側アドバイザー。' },
      { role: '採用コンサルタント', roleSlug: 'recruitment-consultant', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['企画系', '人と関わる', '分析系'], archetype: 'consulting_facilitation', shortDescription: '採用プロセス全体の改善を提案する。' },
      { role: '研修/組織開発企画', roleSlug: 'training-organization-development', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['企画系', '社会貢献', '人と関わる'], archetype: 'people_support', shortDescription: '研修設計を通じて組織成長を支える。' },
      { role: '求人メディア企画', roleSlug: 'job-media-planning', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['企画系', '分析系', '人と関わる'], archetype: 'campaign_planning', shortDescription: '求人メディアの商品改善と企画運営を行う。' },
    ],
  },
  {
    industry: '自治体/公共/インフラ',
    industrySlug: 'public-infra',
    roles: [
      { role: '地域政策担当', roleSlug: 'regional-policy-planning', roleCategory: 'industry_specific', representative: true, difficulty: 'standard', tags: ['地方就職', '社会貢献', '企画系'], archetype: 'public_policy', shortDescription: '地域課題を施策案にまとめて関係者調整を行う。' },
      { role: '観光振興担当', roleSlug: 'tourism-promotion', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['地方就職', '企画系', '社会貢献'], archetype: 'public_policy', shortDescription: '地域観光の魅力づくりと事業調整を担う。' },
      { role: '防災/危機管理担当', roleSlug: 'disaster-crisis-management', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['社会貢献', '高難易度', '分析系'], archetype: 'risk_control', shortDescription: '平時の備えと緊急時対応計画を整える。' },
      { role: '都市計画/公共事業調整', roleSlug: 'urban-planning-coordination', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['企画系', '地方就職', '人と関わる'], archetype: 'public_policy', shortDescription: '公共事業の調整と合意形成を進める。' },
      { role: '公営インフラ運営企画', roleSlug: 'public-infrastructure-operations', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['社会貢献', '分析系', '地方就職'], archetype: 'operations_reliability', shortDescription: '公共インフラの運営改善と継続性を守る。' },
    ],
  },
  {
    industry: '小売/流通/EC',
    industrySlug: 'retail-ec',
    roles: [
      { role: '店舗運営/店長候補', roleSlug: 'store-operations', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['人と関わる', '地方就職', '営業系'], archetype: 'operations_reliability', shortDescription: '店舗現場を回し売上と体験を両立する。' },
      { role: 'MD/バイヤー', roleSlug: 'md-buyer', roleCategory: 'industry_specific', representative: true, difficulty: 'standard', tags: ['企画系', '分析系', '人と関わる'], archetype: 'product_planning', shortDescription: '商品構成と仕入れを決めるマーチャンダイザー。' },
      { role: 'EC運営', roleSlug: 'ec-operations', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['分析系', '企画系', '理系向け'], archetype: 'analytics_insight', shortDescription: 'ECサイトの売場改善と運営を担う。' },
      { role: '物流/需給管理', roleSlug: 'logistics-demand-planning', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['分析系', '高難易度', '地方就職'], archetype: 'supply_coordination', shortDescription: '欠品と過剰在庫を避ける需給調整担当。' },
      { role: '販売促進/CRM', roleSlug: 'crm-promotion', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['企画系', '分析系', '人と関わる'], archetype: 'campaign_planning', shortDescription: '既存顧客の継続利用を促す販促企画担当。' },
    ],
  },
  {
    industry: '観光/ホテル/交通',
    industrySlug: 'tourism-transport',
    roles: [
      { role: 'ホテル運営/フロントマネジメント', roleSlug: 'hotel-front-management', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['人と関わる', '地方就職', '社会貢献'], archetype: 'people_support', shortDescription: '宿泊体験と現場運営を両立するホテル運営職。' },
      { role: '旅行商品企画', roleSlug: 'travel-product-planning', roleCategory: 'industry_specific', representative: true, difficulty: 'standard', tags: ['企画系', '地方就職', '人と関わる'], archetype: 'product_planning', shortDescription: '旅行商品の造成と販売計画をつくる。' },
      { role: '観光施設運営', roleSlug: 'tourism-facility-operations', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['社会貢献', '人と関わる', '地方就職'], archetype: 'operations_reliability', shortDescription: '観光施設の満足度と安全運営を両立する。' },
      { role: 'インバウンドマーケティング', roleSlug: 'inbound-marketing', roleCategory: 'industry_specific', representative: false, difficulty: 'standard', tags: ['企画系', '分析系', '人と関わる'], archetype: 'campaign_planning', shortDescription: '訪日客向け施策を企画し発信する。' },
      { role: '交通オペレーション企画', roleSlug: 'transport-operations-planning', roleCategory: 'industry_specific', representative: false, difficulty: 'high', tags: ['社会貢献', '分析系', '高難易度'], archetype: 'operations_reliability', shortDescription: '安全性と定時性を踏まえて運行企画を立てる。' },
    ],
  },
]
