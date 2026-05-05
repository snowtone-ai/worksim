import { DIMENSION_LIBRARY, ROLE_MAP } from './role-map.mjs'

const DIMENSION_SETS = {
  technical_build: ['problem_solving', 'logical', 'communication', 'ownership', 'agility'],
  solution_sales: ['communication', 'logical', 'ownership', 'agility', 'ethics'],
  product_planning: ['problem_solving', 'logical', 'communication', 'creativity', 'ownership'],
  operations_reliability: ['problem_solving', 'logical', 'ownership', 'agility', 'ethics'],
  analytics_insight: ['problem_solving', 'logical', 'communication', 'agility', 'creativity'],
  finance_relationship: ['communication', 'logical', 'ownership', 'ethics', 'agility'],
  risk_control: ['logical', 'ethics', 'problem_solving', 'ownership', 'communication'],
  supply_coordination: ['logical', 'communication', 'ownership', 'agility', 'problem_solving'],
  campaign_planning: ['creativity', 'communication', 'logical', 'ownership', 'agility'],
  consulting_facilitation: ['logical', 'communication', 'ownership', 'problem_solving', 'agility'],
  people_support: ['communication', 'ethics', 'ownership', 'agility', 'problem_solving'],
  public_policy: ['communication', 'logical', 'ethics', 'ownership', 'creativity'],
}

const SCENE_TYPES = ['email', 'meeting', 'memo', 'review', 'debug']
const DECISION_TYPES = ['speed_vs_accuracy', 'risk_vs_value', 'autonomy_vs_consultation', 'creativity_vs_consistency', 'short_vs_long_term']
const FRICTION_TYPES = ['ambiguity', 'stakeholder_alignment', 'time_pressure', 'quality_risk', 'priority_conflict']

const BLOCK_IDS = ['morning', 'lunch', 'meeting', 'afternoon']
const BLOCK_LABELS = ['午前のタスク', 'ランチ', '午後の会議', '終業前']
const BLOCK_LOCATIONS = ['desk', 'cafeteria', 'conference_room', 'desk']

function dimsFor(archetype) {
  return (DIMENSION_SETS[archetype] ?? DIMENSION_SETS.product_planning).map((key) => DIMENSION_LIBRARY[key])
}

function slugLabel(value) {
  return value.replace(/-/g, ' ')
}

function buildChoice(roleDef, sceneIndex, optionIndex, dims) {
  const tone = [
    ['状況把握を急ぎ、まず動かす', ['speed_first', 'ownership_high'], ['career_reality_gap', 'job_friction'], ['application_intent_driver', 'job_attraction_factor'], ['overprioritizes_speed']],
    ['関係者に確認し、前提をそろえる', ['consultation_first', 'risk_control'], ['misconception_correction', 'readiness_gap'], ['role_understanding_signal', 'candidate_expectation_gap'], ['avoids_stakeholder_alignment']],
    ['中長期の影響まで見て設計する', ['accuracy_first', 'structure_first'], ['work_value_preference', 'interest_expansion'], ['employer_message_resonance', 'anxiety_point'], ['ignores_long_term_quality']],
  ][optionIndex]

  const scores = Object.fromEntries(
    dims.map((dim, dimIndex) => {
      const base = optionIndex === 0 ? (dimIndex < 2 ? 3 : 2) : optionIndex === 1 ? (dimIndex === 2 ? 3 : 2) : (dimIndex === 1 || dim.key === 'creativity' || dim.key === 'ethics' ? 3 : 2)
      return [dim.key, base - (sceneIndex % 2 === 0 && optionIndex === 0 && dimIndex === dims.length - 1 ? 1 : 0)]
    }),
  )

  const [textStart, behaviorTags, universityInsightTags, companyInsightTags, riskTags] = tone
  const text = `${textStart}。${roleDef.role}として、${['短期の進行', '周囲との合意', '将来の運用'][optionIndex]}を優先する。`

  return {
    id: String.fromCharCode(97 + optionIndex),
    label: text,
    text,
    studentFeedback: {
      good: `${roleDef.role}で求められる判断軸の一つを押さえている。`,
      risk: ['見切り発車になる恐れがある。', '調整負荷でスピードが落ちる。', '過剰設計になる恐れがある。'][optionIndex],
      next: `${sceneIndex + 1}つ目の論点に進む前提が整理される。`,
    },
    scores,
    behaviorTags,
    universityInsightTags,
    companyInsightTags,
    riskTags,
  }
}

function buildScene(roleDef, sceneIndex, dims) {
  const sceneThemes = [
    ['朝の依頼整理', '朝一番で届いた依頼の優先順位を決める。', '関係者からの期待が重なり、何を先に動かすか迷う。'],
    ['材料集め', '必要な情報やデータを集めて仮説を立てる。', '情報不足のまま進めるか、追加確認を待つかが論点になる。'],
    ['ランチ前の相談', '現場感を持つ同僚との会話から論点を補強する。', '相手の感情も踏まえて伝え方を選ぶ必要がある。'],
    ['午後のトラブル', '予定外の問題が起き、短期対応と恒久対応の両立が問われる。', 'その場しのぎと再発防止のどちらを優先するかが分かれ目になる。'],
    ['終業前の最終判断', '今日の学びを踏まえ、次に進める方針を決める。', '明日に持ち越す宿題と今日決め切る範囲を見極める。'],
  ]
  const [title, context, content] = sceneThemes[sceneIndex]
  const choices = [0, 1, 2].map((optionIndex) => buildChoice(roleDef, sceneIndex, optionIndex, dims))

  return {
    id: `${roleDef.roleSlug}-scene-${sceneIndex + 1}`,
    type: SCENE_TYPES[sceneIndex],
    title,
    context: `${roleDef.industry}の${roleDef.role}として、${context}`,
    content: `${roleDef.shortDescription}\n\n${content}\n\nこの場面では、スピード・正確性・関係者調整のバランスが試される。`,
    npcDialogue: `${roleDef.role}の先輩: 「この判断で次の動きが変わる。理由も含めて考えよう」`,
    workMaterial: `${roleDef.role}に関するメモ: 現場要望、期限、運用上の制約、社内ルールが同時に存在する。`,
    decisionPrompt: 'あなたなら、何を優先して進めますか？',
    choices,
    analytics: {
      decisionType: DECISION_TYPES[sceneIndex],
      frictionType: FRICTION_TYPES[sceneIndex],
      workValueTags: roleDef.tags,
      careerRealityTags: ['job_reality', 'trade_off'],
      localCareerTags: roleDef.tags.includes('地方就職') ? ['regional_relevance'] : [],
    },
  }
}

function buildTimeline() {
  return [
    { time: '09:00', label: 'start' },
    { time: '10:00', label: 'initial_task' },
    { time: '11:00', label: 'research' },
    { time: '12:00', label: 'lunch' },
    { time: '13:30', label: 'meeting' },
    { time: '15:00', label: 'trouble' },
    { time: '16:30', label: 'final_decision' },
    { time: '18:00', label: 'result' },
  ]
}

function buildBlocks(roleDef, dims) {
  return BLOCK_IDS.map((blockId, blockIndex) => ({
    id: blockId,
    label: BLOCK_LABELS[blockIndex],
    time_start: buildTimeline()[blockIndex]?.time ?? '09:00',
    time_end: buildTimeline()[blockIndex + 1]?.time ?? '18:00',
    location: BLOCK_LOCATIONS[blockIndex],
    intro: `${roleDef.role}としての一日を、${BLOCK_LABELS[blockIndex]}から進める。`,
    scenes: Array.from({ length: 5 }, (_, sceneOffset) => {
      const baseIndex = sceneOffset % 5
      const baseScene = buildScene(roleDef, baseIndex, dims)
      return {
        id: `${blockId}-${sceneOffset + 1}`,
        time: `${String(9 + blockIndex * 2 + Math.floor(sceneOffset / 2)).padStart(2, '0')}:${sceneOffset % 2 === 0 ? '05' : '35'}`,
        interactable: blockIndex === 0 || blockIndex === 3 ? 'monitor_slack' : blockIndex === 1 ? 'npc_dialogue' : 'meeting_speaker',
        presenter: blockIndex === 2 ? 'ファシリテーター' : '同僚',
        title: baseScene.title,
        context: baseScene.context,
        content: baseScene.content,
        npcDialogue: baseScene.npcDialogue,
        workMaterial: baseScene.workMaterial,
        decisionPrompt: baseScene.decisionPrompt,
        choices: baseScene.choices,
        analytics: baseScene.analytics,
      }
    }),
  }))
}

function buildResultTypes(roleDef) {
  return [
    {
      id: 'balanced-driver',
      title: `${roleDef.role}の推進型`,
      strengths: ['前提整理', '関係者調整', '実行への落とし込み'],
      cautionPoints: ['優先順位が散ると処理が重くなる', '慎重さが過剰だと機会損失になる'],
    },
  ]
}

export function createScenario(roleDef) {
  const dims = dimsFor(roleDef.archetype)
  const scenes = Array.from({ length: 5 }, (_, index) => buildScene(roleDef, index, dims))
  const modes = roleDef.representative ? ['immersive'] : []

  return {
    id: `${roleDef.industrySlug}/${roleDef.roleSlug}`,
    version: '2.0.0',
    scenarioVersion: '2',
    cType: 'C_ALPHA',
    industry: roleDef.industry,
    industrySlug: roleDef.industrySlug,
    role: roleDef.role,
    roleSlug: roleDef.roleSlug,
    roleCategory: roleDef.roleCategory,
    roleSpecificity: 'industry_specific',
    modes,
    durationMinutes: roleDef.representative ? 12 : 10,
    difficulty: roleDef.difficulty,
    tags: roleDef.tags,
    targetUsers: ['student', 'university'],
    background: {
      imagePrompt: `Create a high-quality realistic workplace background image for a career simulation game. Scene: ${roleDef.industry} industry, ${roleDef.role} role, decision point before a key task.`,
      negativePrompt: 'readable text, logo, brand name, watermark, celebrity, distorted hands, distorted face, low quality, blurry, stock photo advertisement, fantasy, cyberpunk, anime, manga, unrealistic office, fake letters',
      composition: '16:9 wide background with negative space for overlay',
      overlaySafeArea: 'left-center',
      mood: 'calm, focused, realistic',
      industryVisualTokens: [slugLabel(roleDef.industrySlug), slugLabel(roleDef.roleSlug)],
    },
    future3d: {
      environmentType: 'workplace',
      spatialAnchors: ['desk', 'meeting-space', 'presentation-area'],
      interactableObjects: ['documents', 'chat', 'dashboard'],
      npcPositions: ['front', 'left', 'background'],
      cameraHint: 'eye-level wide shot',
      soundscapeHint: 'quiet office ambience',
      interactionType: 'point_and_select',
    },
    characters: [{ id: 'mentor', role: '先輩', summary: '判断の背景を問い返す伴走役。' }],
    timeline: buildTimeline(),
    meta: {
      title: roleDef.role,
      industry: roleDef.industry,
      role: roleDef.role,
      duration_minutes: roleDef.representative ? 12 : 10,
      description: roleDef.shortDescription,
      sources: ['to_be_researched: 厚労省 job tag', 'to_be_researched: 企業公式採用ページ', 'to_be_researched: 社員インタビュー/現場発信'],
      company_model: '架空の事業者を前提にしたCαドラフト',
    },
    dimensions: dims,
    scenes,
    blocks: roleDef.representative ? buildBlocks(roleDef, dims) : undefined,
    scoringDimensions: dims.map((dim) => dim.key),
    resultTypes: buildResultTypes(roleDef),
    analytics: {
      decisionStyleAxes: ['speed_vs_accuracy', 'customer_empathy_vs_risk_control', 'autonomy_vs_consultation'],
      derivedMetrics: ['career_reality_gap', 'work_decision_style_vector', 'job_friction_heatmap'],
      privacy: 'aggregated_and_anonymized',
    },
    sources: ['to_be_researched: 厚労省 job tag', 'to_be_researched: 企業公式採用ページ', 'to_be_researched: 大手就活サイト'],
    designLog: {
      roleSelectionRationale: `${roleDef.industry}の業界固有性が高く、Cα の軸に適している。`,
      mainConflict: '短期成果と長期品質、個別最適と全体最適の両立。',
      sceneRationale: '1日の流れに沿って、情報収集・調整・トラブル対応・最終判断を配置した。',
      choiceRationale: '正解不正解ではなく、現実にあり得るトレードオフを3択化した。',
      scoringRationale: '新卒1-3年目で顕在化しやすい判断特性に寄せて次元を選定した。',
      knownLimitations: 'Cα 段階の AI 草案であり、Cβ で実地リサーチ検証が必要。',
    },
  }
}

export function createCatalogItems() {
  return ROLE_MAP.flatMap((industryDef) =>
    industryDef.roles.map((role) => ({
      industry: industryDef.industry,
      industrySlug: industryDef.industrySlug,
      role: role.role,
      roleSlug: role.roleSlug,
      representative: role.representative,
      modes: role.representative ? ['immersive'] : [],
      tags: role.tags,
      durationMinutes: role.representative ? 12 : 10,
      difficulty: role.difficulty,
      shortDescription: role.shortDescription,
      scenarioPath: `scenarios/${industryDef.industrySlug}/${role.roleSlug}.json`,
      plannedScenarioPath: `scenarios/${industryDef.industrySlug}/${role.roleSlug}.json`,
      status: role.roleSlug === 'web-engineer' ? 'implemented' : 'playable',
      roleCategory: role.roleCategory,
    })),
  )
}

export function getAllRoles() {
  return ROLE_MAP.flatMap((industryDef) =>
    industryDef.roles.map((role) => ({
      ...role,
      industry: industryDef.industry,
      industrySlug: industryDef.industrySlug,
    })),
  )
}
