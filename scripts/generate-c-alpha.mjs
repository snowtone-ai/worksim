import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { buildDocs } from './c-alpha/docs-builder.mjs'
import { createCatalogItems, createScenario, getAllRoles } from './c-alpha/scenario-builder.mjs'

async function ensureDir(filePath) {
  await mkdir(dirname(filePath), { recursive: true })
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`
}

function enrichExistingScenario(raw) {
  const scenario = JSON.parse(raw)
  scenario.scenarioVersion ??= '2'
  scenario.cType ??= 'C_ALPHA'
  scenario.industry ??= 'IT・通信'
  scenario.industrySlug ??= 'it'
  scenario.role ??= scenario.meta?.role ?? 'Webエンジニア/バックエンド'
  scenario.roleSlug ??= 'web-engineer'
  scenario.roleCategory ??= 'industry_specific'
  scenario.roleSpecificity ??= 'industry_specific'
  scenario.modes ??= ['immersive']
  scenario.durationMinutes ??= scenario.meta?.duration_minutes ?? 12
  scenario.difficulty ??= 'standard'
  scenario.tags ??= ['理系向け', '分析系', '高難易度']
  scenario.targetUsers ??= ['student', 'university']
  scenario.background ??= {
    imagePrompt: 'Create a high-quality realistic workplace background image for a career simulation game. Scene: IT・通信 industry, Webエンジニア/バックエンド role, morning engineering task.',
    negativePrompt: 'readable text, logo, brand name, watermark, celebrity, distorted hands, distorted face, low quality, blurry, stock photo advertisement, fantasy, cyberpunk, anime, manga, unrealistic office, fake letters',
    composition: '16:9 wide background with negative space for overlay',
    overlaySafeArea: 'left-center',
    mood: 'calm, focused, realistic',
    industryVisualTokens: ['backend', 'dashboard', 'meeting-room'],
  }
  scenario.future3d ??= {
    environmentType: 'workplace',
    spatialAnchors: ['desk', 'monitor', 'meeting-room'],
    interactableObjects: ['slack', 'code', 'documents'],
    npcPositions: ['front', 'left', 'background'],
    cameraHint: 'eye-level wide shot',
    soundscapeHint: 'quiet office ambience',
    interactionType: 'point_and_select',
  }
  scenario.timeline ??= [
    { time: '09:00', label: 'start' },
    { time: '12:00', label: 'lunch' },
    { time: '13:00', label: 'meeting' },
    { time: '18:00', label: 'result' },
  ]
  scenario.scoringDimensions ??= scenario.dimensions?.map((dimension) => dimension.key) ?? []
  scenario.resultTypes ??= [{ id: 'tech-lead', title: 'テックリード型', strengths: ['技術判断', '整理力'], cautionPoints: ['抱え込みすぎに注意'] }]
  scenario.analytics ??= { derivedMetrics: ['career_reality_gap', 'work_decision_style_vector'], privacy: 'aggregated_and_anonymized' }
  scenario.sources ??= scenario.meta?.sources ?? ['to_be_researched: 厚労省 job tag']
  scenario.designLog ??= {
    roleSelectionRationale: 'MVP 先行実装職種を Cα 互換へ維持する。',
    mainConflict: 'スピードと品質、個人判断とチーム連携の両立。',
    sceneRationale: '既存の体験価値を維持したまま additive metadata を加えた。',
    choiceRationale: '既存選択肢文言は保持し、補助メタデータのみ付与した。',
    scoringRationale: '既存 dimension と結果画面互換を優先した。',
    knownLimitations: 'Cα の source placeholders 追加検証は今後必要。',
  }

  for (const scene of scenario.scenes ?? []) {
    scene.npcDialogue ??= scene.content
    scene.workMaterial ??= scene.context
    scene.decisionPrompt ??= 'あなたならどう判断しますか？'
    scene.analytics ??= {
      decisionType: 'trade_off',
      frictionType: 'priority_conflict',
      workValueTags: scenario.tags,
      careerRealityTags: ['job_reality'],
      localCareerTags: [],
    }
    for (const choice of scene.choices ?? []) {
      choice.text ??= choice.label
      choice.studentFeedback ??= {
        good: '既存シナリオの判断軸として妥当な視点を含んでいる。',
        risk: '判断の副作用や調整コストが残る可能性がある。',
        next: '次のシーンで結果と余波が見えてくる。',
      }
      choice.behaviorTags ??= ['ownership_high']
      choice.universityInsightTags ??= ['career_reality_gap']
      choice.companyInsightTags ??= ['role_understanding_signal']
      choice.riskTags ??= ['ignores_long_term_quality']
    }
  }

  for (const block of scenario.blocks ?? []) {
    for (const scene of block.scenes ?? []) {
      scene.npcDialogue ??= scene.content
      scene.workMaterial ??= scene.context
      scene.decisionPrompt ??= 'あなたならどう判断しますか？'
      scene.analytics ??= {
        decisionType: 'trade_off',
        frictionType: 'time_pressure',
        workValueTags: scenario.tags,
        careerRealityTags: ['job_reality'],
        localCareerTags: [],
      }
      for (const choice of scene.choices ?? []) {
        choice.text ??= choice.label
        choice.studentFeedback ??= {
          good: '現場で取り得る現実的な判断になっている。',
          risk: '優先しなかった論点が次に残る。',
          next: 'この判断を前提に会話や作業が進む。',
        }
        choice.behaviorTags ??= ['ownership_high']
        choice.universityInsightTags ??= ['career_reality_gap']
        choice.companyInsightTags ??= ['role_understanding_signal']
        choice.riskTags ??= ['overprioritizes_speed']
      }
    }
  }

  return stableJson(scenario)
}

async function main() {
  const docs = buildDocs()
  for (const [relativePath, content] of Object.entries(docs)) {
    const filePath = join(process.cwd(), relativePath)
    await ensureDir(filePath)
    await writeFile(filePath, content)
  }

  const roles = getAllRoles()
  const catalog = createCatalogItems()
  await writeFile(join(process.cwd(), 'scenarios', '_catalog.c-alpha.json'), stableJson(catalog))

  const templateRole = roles.find((role) => role.roleSlug === 'regional-bank-corporate-loan')
  if (!templateRole) throw new Error('Template role not found')
  await writeFile(join(process.cwd(), 'scenarios', '_template.v2.json'), stableJson(createScenario(templateRole)))

  for (const role of roles) {
    const filePath = join(process.cwd(), 'scenarios', role.industrySlug, `${role.roleSlug}.json`)
    await ensureDir(filePath)
    if (role.roleSlug === 'web-engineer' && role.industrySlug === 'it') {
      const raw = await readFile(filePath, 'utf-8')
      await writeFile(filePath, enrichExistingScenario(raw))
      continue
    }
    await writeFile(filePath, stableJson(createScenario(role)))
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
