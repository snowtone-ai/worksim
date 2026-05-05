# Scenario Schema v2

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
- roleCoreFriction
- roleMisconception
- roleRealityReveal
- roleWorkKernel
- modes
- durationMinutes
- difficulty
- tags
- targetUsers
- background
- future3d
- characters
- timeline
- roleSpecificMeters
- scenes
- scoringDimensions
- resultTypes
- resultFeedback
- analytics
- sources
- branchSummary
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
- roleSpecificContext
- roleCoreFriction
- hiddenWorkReality
- stakeholderPressure
- timePressure
- missingInformation
- decisionTradeoff
- consequenceHook
- nextSceneEcho
- npcDialogue
- workMaterial
- roleSpecificity
- decisionPrompt
- choices
- analytics

## Cβ Role Specificity Fields

Cβ uses `workMaterial` as the canonical scene-level key for practical work materials. The former artifact key is deprecated and must not be used in Cβ canonical data.

Scenario-level:

- roleWorkKernel: what this role converts from input to professional output.

Canonical Cβ `roleWorkKernel` uses a structured object:

- input
- output
- transformation
- constraints
- workArtifacts
- metrics
- failureModes
- evaluationCriteria
- nonGenericReason

The loader remains backward-compatible with older string kernels, but future Cβ canonical data must use the structured object.

Scene-level `roleSpecificity`:

- coreDecisionPrimitive
- roleSpecificMaterials
- roleSpecificMetrics
- roleSpecificFailureRisk
- roleSpecificEvaluationCriteria
- genericCoordinationRisk
- antiGenericDesignNote
- kernelConnection

Cβ standard is exactly 5 scenes / 5 tasks. It is not a range. Stakeholder pressure is allowed, but role-specific work materials and decision primitives must be the protagonist.

## Choice Fields

- id
- text
- immediateFeedback
- delayedConsequence
- nextSceneEffect
- resultSummaryEffect
- studentFeedback.good
- studentFeedback.risk
- studentFeedback.next
- meterEffects
- misconceptionEffect
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

## Result Feedback Fields

- resultType
- dominantMeters
- sacrificedMeters
- roleRealityReveal
- misconceptionCorrection
- decisionPatternSummary
- careerReflectionPrompt
- universityInsightTags

## Compatibility

- v2 should be additive
- v1 scenarios must still load
- Existing routes should not break
- Current app compatibility fields: id, version, meta, dimensions, scenes, blocks
- Scenario Quality OS fields are optional metadata. Current UI can ignore them while scenario review tools inspect them.
