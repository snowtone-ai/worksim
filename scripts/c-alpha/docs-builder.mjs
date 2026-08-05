import { ROLE_MAP } from './role-map.mjs'

const REPRESENTATIVE_ROLES = new Set([
  'web-engineer',
  'regional-bank-corporate-loan',
  'product-planning',
  'corporate-trading-sales',
  'web-marketer',
  'operations-consultant',
  'career-advisor',
  'regional-policy-planning',
  'md-buyer',
  'travel-product-planning',
])

function roleLines() {
  return ROLE_MAP.flatMap((industryDef, index) => [
    `${index + 1}. ${industryDef.industry}`,
    ...industryDef.roles.map((role) => `- ${role.role}${REPRESENTATIVE_ROLES.has(role.roleSlug) ? '（representative immersive）' : ''}`),
    '',
  ]).join('\n').trim()
}

export function buildDocs() {
  return {
    'docs/c-alpha/00-GOAL.md': `# WorkSim Cα Goal

## Definitions

- Cタイプ: 学生向け・大学向けの WorkSim 本体。幅広い業界・職種の就業疑似体験を提供する。
- Cα: Cタイプの広く遊べる alpha。50 ロールと基盤スキーマ/分析土台を備える。
- Cβ: 大学営業・PoC 提案に耐える改良版。大学向けレポートや品質改善を進める。
- Bタイプ: 企業向け版。企業アカウント、独自シナリオ、採用導線、企業分析を扱う。

## Scope

- 10 industries
- 5 roles per industry
- 50 catalog scenarios; playable experience is immersive only
- 10 representative immersive scenarios
- reusable scenario production OS
- scenario schema v2
- lightweight gamification
- 2D background-image task-pre screen
- analytics foundation for university value

## Non-goals

- full 3D/metaverse implementation
- company account system
- enterprise scenario editor
- heavy university dashboard
- individual student screening by companies

## Completion Criteria

- all roles visible and playable if feasible
- result page reachable
- v1 scenario compatibility preserved
- schema supports future3d metadata
- analytics tags exist at scene/choice level
- lint/build/test pass
`,
    'docs/c-alpha/01-INDUSTRY-ROLE-MAP.md': `# WorkSim Cα Industry Role Map

## Role Category Rule

- industry_specific
- industry_specific_sales
- business_horizontal_future

## Status Values

- implemented
- playable
- catalog_only
- deferred

## Cross-industry Rule

Cα は業界固有性の強いロールを優先する。HR、経理、法務、総務、汎用営業のような横断ロールは Cβ/Bタイプ 以降の business-horizontal role layer で扱う。

## Full Map

${roleLines()}
`,
    'docs/c-alpha/02-SCENARIO-PRODUCTION-OS.md': `# WorkSim Cα Scenario Production OS

## Step 1. Define the role

Capture:
- industry
- role
- new graduate 1-3 year responsibilities
- common tasks
- tools
- stakeholders
- success metrics
- common failures
- student misconceptions

## Step 2. Build occupation model

Include:
- essence of the job
- what makes it interesting
- what makes it difficult
- early-career friction
- fit profile
- struggle profile
- main professional conflict

## Step 3. Build day structure

Default:
- 09:00 start / meeting
- 10:00 initial task
- 11:00 research / preparation
- 12:00 lunch conversation
- 13:30 meeting / client / internal coordination
- 15:00 conflict or trouble
- 16:30 final decision
- 18:00 result / reflection

## Step 4. Extract decision points

Every scene must include a real trade-off:
- speed vs accuracy
- customer/user value vs company risk
- autonomy vs consultation
- short-term result vs long-term quality
- creativity vs operational consistency
- empathy vs compliance
- local/social value vs business sustainability

## Step 5. Create choices

Use 3 choices by default.

Avoid:
- correct answer
- wrong answer
- joke answer

Prefer:
- fast but risky
- careful but slow
- collaborative but costly

## Step 6. Score

Common dimensions:
- problem_solving
- logical
- communication
- ownership
- agility
- ethics
- creativity

Each scenario should use 5 main dimensions.

## Step 7. Add analytics tags

Every choice must include:
- behaviorTags
- universityInsightTags
- companyInsightTags
- riskTags

## Step 8. Add student feedback

Every choice must include:
- good
- risk
- next

## Step 9. Record design log

Include:
- role selection rationale
- main conflict
- scene rationale
- choice rationale
- scoring rationale
- known limitations
`,
    'docs/c-alpha/03-SCENARIO-ANALYTICS-SPEC.md': `# WorkSim Cα Scenario Analytics Spec

WorkSim analytics must not merely copy job-board data such as PV, favorites, and industry popularity. WorkSim's unique value is simulation-native behavioral insight.

## Events

- scenario_start
- scene_view
- choice_select
- feedback_view
- scenario_complete
- result_view
- recommendation_click
- external_link_click
- optional_pre_survey
- optional_post_survey

## Derived Metrics

1. Career Reality Gap
2. Job Misconception Correction
3. Work Decision Style Vector
4. Job Friction Heatmap
5. Industry Discovery Map
6. Local Career Relevance
7. Employer Message Resonance
8. Work Value Preference Clusters
9. Scenario Realism Score
10. Career Readiness Gap

## Privacy

- aggregated and anonymized by default
- no individual student data to companies for screening by default
- minimum aggregation thresholds where practical
- event payloads should avoid unnecessary PII
`,
    'docs/c-alpha/04-SCREEN-FORMAT-SPEC.md': `# WorkSim Cα Screen Format Spec

## Scenario Selection

- industry
- role
- description
- estimated duration
- difficulty
- tags
- immersive play button
- non-immersive roles shown as preparing

Tags:
- 文系向け
- 理系向け
- 地方就職
- 企画系
- 営業系
- 分析系
- 人と関わる
- 社会貢献
- 高難易度

## Task-pre Screen

- one high-quality background image
- overlay text
- current time
- scene title
- workplace description
- player role
- mission
- start button
- do not depend on manually arranged 2D objects for each scenario

## Decision Screen

- scene title
- context panel
- NPC dialogue or work material
- decision prompt
- 3 choices
- after-choice feedback

## Feedback

- your decision
- what went well
- remaining risk
- next development

## Result

- title/type
- strengths
- caution points
- score bars
- recommended next scenarios
- future aggregate university result support
`,
    'docs/c-alpha/05-GAMIFICATION-SPEC.md': `# WorkSim Cα Gamification Spec

WorkSim is not a job information website. WorkSim is a career simulation game useful for job hunting.

## Initial Gamification

- soft button press animation
- hover/selection animation
- scene transition
- time progress
- progress bar
- result title animation
- completion badges if simple

## Sound

- optional
- muted by default or easy to mute
- short soft pop for button
- light transition sound
- small result sound

## Avoid

- gacha
- excessive social-game feel
- anxiety-based copy
- deterministic rejection language
- company access to individual student score
`,
    'docs/c-alpha/06-IMAGE-GENERATION-GUIDE.md': `# WorkSim Cα Image Generation Guide

Purpose: Generate consistent high-quality task-pre background images for WorkSim.

## Global Rules

- 16:9
- realistic but slightly game-like
- Japanese workplace context
- clean and professional
- no readable text
- no real logos
- no brand names
- no watermark
- no famous people
- no close-up faces
- enough empty area for UI overlay
- not a stock-photo advertisement

## Base Prompt

Create a high-quality realistic workplace background image for a career simulation game.

Scene:
[INDUSTRY] industry, [ROLE] role, [SITUATION] situation.

Style:
realistic but slightly game-like, clean, modern, immersive, professional, cinematic lighting, high detail, Japanese workplace context, natural atmosphere.

Composition:
16:9 wide background, enough empty space for UI text overlay, no readable text, no logos, no brand names, no watermark, no close-up faces.

Mood:
calm, focused, realistic, slightly aspirational but not fantasy.

Camera:
wide-angle, eye-level, workplace environment, depth of field, natural lighting.

Important:
Do not include any text inside the image.
Do not include real company logos.
Do not include famous people.
Do not make it look like a stock photo advertisement.

Negative prompt:
readable text, logo, brand name, watermark, celebrity, distorted hands, distorted face, low quality, blurry, stock photo advertisement, fantasy, cyberpunk, anime, manga, unrealistic office, fake letters

Metadata fields:
- imagePrompt
- negativePrompt
- composition
- overlaySafeArea
- mood
- industryVisualTokens

Future 3D fields:
- environmentType
- spatialAnchors
- interactableObjects
- cameraHint
- soundscapeHint
`,
    'docs/c-alpha/07-QUALITY-GATE.md': `# WorkSim Cα Quality Gate

## Scenario Quality

- playable from selection to result
- realistic workplace context
- at least 5 decision scenes
- every scene contains a trade-off
- every choice has feedback
- every choice has score dimensions
- every choice has behavior and analytics tags
- not a quiz
- avoids deterministic career judgment
- source limitations are honest

## UI Quality

- selection does not break with 50 cards
- normal mode is deprecated; immersive mode is required for playable scenarios
- non-immersive roles must not expose a play CTA
- task-pre supports background image metadata
- result works for v1 and v2

## Data Quality

- events can represent choice behavior
- analytics tags are present
- individual data not exposed to companies by default

## Technical Quality

- pnpm lint
- pnpm build
- pnpm test
`,
    'docs/c-alpha/08-IMPLEMENTATION-CHECKLIST.md': `# WorkSim Cα Implementation Checklist

## Docs

- [x] docs/c-alpha core specs created
- [ ] AGENTS.md updated with Cα rules
- [ ] docs/state.md updated with Cα progress
- [ ] docs/decisions.md updated with Cα decisions

## Scenario System

- [ ] schema v2 documented
- [ ] loader supports additive v2 fields
- [ ] v1 compatibility test preserved

## Scenario Catalog

- [ ] 50-role catalog generated
- [ ] /play uses catalog grouping and status-aware actions

## Scenarios

- [ ] 50 roles cataloged; normal mode removed
- [ ] 10 representative immersive scenarios available
- [ ] existing web-engineer scenario enriched without breaking behavior

## UI

- [ ] task-pre screen uses background metadata
- [ ] decision feedback shown after selection
- [ ] result screen shows strengths/caution/recommendations

## Analytics

- [ ] analytics event types added
- [ ] non-blocking event helper added
- [ ] API validation route added

## Verification

- [ ] pnpm lint
- [ ] pnpm typecheck
- [ ] pnpm build
- [ ] pnpm test
- [ ] pnpm verify
- [ ] e2e/browser checks

## Deferred Cβ/Bタイプ Items

- [ ] university aggregate dashboard
- [ ] company accounts and scenario editor
- [ ] company-safe aggregate exports with thresholds
- [ ] scenario research validation beyond AI draft placeholders

## Continuation Instructions

- Remaining work must be recorded here with exact file names and failing commands if the session stops before full completion.
`,
    'scenarios/_schema.v2.md': `# Scenario Schema v2

v2 is additive. Existing routes continue to consume compatibility fields such as meta, dimensions, scenes, and blocks while new root metadata enables future Cα/Cβ/Bタイプ expansion.

## Root Fields

- scenarioVersion
- cType
- industry
- industrySlug
- role
- roleSlug
- roleCategory
- roleSpecificity
- modes
- durationMinutes
- difficulty
- tags
- targetUsers
- background
- future3d
- characters
- timeline
- scenes
- scoringDimensions
- resultTypes
- analytics
- sources
- designLog

## Background Fields

- imagePrompt
- negativePrompt
- composition
- overlaySafeArea
- mood
- industryVisualTokens

## Future3D Fields

- environmentType
- spatialAnchors
- interactableObjects
- npcPositions
- cameraHint
- soundscapeHint
- interactionType

## Scene Fields

- id
- blockId
- time
- title
- context
- npcDialogue
- workMaterial
- decisionPrompt
- choices
- analytics

## Choice Fields

- id
- text
- studentFeedback.good
- studentFeedback.risk
- studentFeedback.next
- scores
- behaviorTags
- universityInsightTags
- companyInsightTags
- riskTags

## Analytics Fields

- decisionType
- frictionType
- workValueTags
- careerRealityTags
- localCareerTags

## Compatibility

- v2 should be additive
- v1 scenarios must still load
- Existing routes should not break
- Current app compatibility fields: id, version, meta, dimensions, scenes, blocks
`,
  }
}
