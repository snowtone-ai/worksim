import type { Block, CatalogItem, ImmersiveScene, Scenario } from './loader'

export type ScenarioDisplay = {
  industryName: string
  roleName: string
  durationLabel: string
  summary: string
  backgroundImage?: string
  fallbackTone: string
}

export type CatalogCard = {
  href: string
  industryName: string
  roleName: string
  description: string
  tags: string[]
  durationLabel: string
  difficultyLabel: string
  statusLabel: string
  isPlayable: boolean
  isRepresentative: boolean
}

export type TaskBrief = {
  title: string
  context: string
  prompt: string
  workMaterial: string
}

export function getScenarioDisplay(scenario: Scenario): ScenarioDisplay {
  return {
    industryName: displayIndustry(scenario.industrySlug ?? '', scenario.meta.industry),
    roleName: displayRole(scenario.roleSlug ?? '', scenario.meta.role),
    durationLabel: `約${scenario.durationMinutes ?? scenario.meta.duration_minutes}分`,
    summary: scenario.meta.description || scenario.centralQuestion || '職場の一日を通じて、実務で必要な判断を体験します。',
    backgroundImage: getBackgroundImage(scenario),
    fallbackTone: getFallbackTone(scenario.industrySlug ?? scenario.id.split('/')[0] ?? ''),
  }
}

export function getCatalogCard(item: CatalogItem): CatalogCard {
  const isPlayable = item.modes.includes('immersive')
  return {
    href: `/play/${item.industrySlug}/${item.roleSlug}/immersive`,
    industryName: displayIndustry(item.industrySlug, item.industry),
    roleName: displayRole(item.roleSlug, item.role),
    description: item.shortDescription || '職場の一日を通じて、実務で必要な判断を体験します。',
    tags: item.tags.slice(0, 3),
    durationLabel: `約${item.durationMinutes}分`,
    difficultyLabel: item.difficulty === 'high' ? '高難易度' : '標準',
    statusLabel: item.representative ? 'PoC確認対象' : item.status === 'implemented' ? '実装済み' : 'Playable',
    isPlayable,
    isRepresentative: item.representative,
  }
}

export function getTaskBrief(scene: ImmersiveScene): TaskBrief {
  return {
    title: scene.title,
    context: scene.context,
    prompt: scene.decisionPrompt ?? '状況を読み、次の対応方針を選んでください。',
    workMaterial: scene.workMaterial ?? scene.concreteWorkArtifact ?? '業務資料と関係者からの情報',
  }
}

export function getBlockSummary(block: Block): string {
  return block.intro.length > 120 ? `${block.intro.slice(0, 118)}...` : block.intro
}

export function displayIndustry(industrySlug: string, industry: string): string {
  return industrySlug === 'it' ? 'IT・情報通信' : industry
}

export function displayRole(roleSlug: string, role: string): string {
  return roleSlug === 'web-engineer' ? 'Webエンジニア（バックエンド）' : role
}

function getBackgroundImage(scenario: Scenario): string | undefined {
  if (scenario.backgroundImage) return scenario.backgroundImage
  return scenario.background?.imagePath
}

function getFallbackTone(industrySlug: string): string {
  const tones: Record<string, string> = {
    it: 'from-slate-950 via-indigo-950 to-sky-950',
    finance: 'from-slate-950 via-emerald-950 to-stone-950',
    manufacturing: 'from-slate-950 via-zinc-900 to-amber-950',
    trading: 'from-slate-950 via-blue-950 to-cyan-950',
    'marketing-media': 'from-slate-950 via-rose-950 to-zinc-950',
    'consulting-bpo': 'from-slate-950 via-violet-950 to-zinc-950',
    hr: 'from-slate-950 via-teal-950 to-zinc-950',
    'public-infra': 'from-slate-950 via-stone-900 to-green-950',
    'retail-ec': 'from-slate-950 via-orange-950 to-zinc-950',
    'tourism-transport': 'from-slate-950 via-sky-950 to-stone-950',
  }
  return tones[industrySlug] ?? 'from-slate-950 via-zinc-900 to-slate-950'
}
