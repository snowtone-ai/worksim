# Cβ 50-Scenario Drift Review

## Scope

Reviewed all 50 Cβ canonical scenarios after Batch 4 production.

## Role Coverage Table

| status | count | roles |
|---|---:|---|
| canonical implemented | 50 | all catalog roles |
| not ready | 0 | none |

Industry coverage:

| industry | ready |
|---|---:|
| IT・通信 | 5/5 |
| 金融 | 5/5 |
| メーカー/ものづくり | 5/5 |
| 商社/卸 | 5/5 |
| 広告・マーケティング/メディア | 5/5 |
| コンサル/BPO/業務支援 | 5/5 |
| 人材/HR | 5/5 |
| 自治体/公共/インフラ | 5/5 |
| 小売/流通/EC | 5/5 |
| 観光/ホテル/交通 | 5/5 |

## Decision Primitive Distribution

The 50 scenarios use artifact-led primitives tied to role-specific materials:

- IT: code, incident, BI, cloud, requirement, and product backlog decisions.
- Finance: cash flow, suitability, credit, market, and coverage decisions.
- Manufacturing: concept, production, quality, procurement, and field support decisions.
- Trading: margin, market entry, trade document, supply, and deal condition decisions.
- Marketing/media: LP, ad, PR reaction, content, and daily operation decisions.
- Consulting/BPO: process map, DX roadmap, research hypothesis, PMO dependency, and organization adoption decisions.
- HR: candidate preference, client hiring requirement, recruitment funnel, training behavior, and job media conversion decisions.
- Public/infra: policy budget, tourism capacity, disaster capacity, urban planning, and infrastructure uptime decisions.
- Retail/EC: store sales, MD assortment, EC behavior, demand planning, and CRM segment decisions.
- Tourism/transport: hotel occupancy, travel product, facility safety, inbound conversion, and transport operation decisions.

No primitive is shared across 3 or more scenarios in the default Cβ quality gate.

## Repeated Stakeholder Pattern Risks

Risk: many scenarios include time pressure and surrounding requests. This is acceptable because the protagonist remains work materials such as traffic counts, booking tables, market memos, candidate funnels, equipment reports, and conversion data.

Mitigation applied in Batch 4:

- Every scene includes `workMaterial` with at least two concrete numeric signals.
- Every scene includes `roleSpecificity.kernelConnection`.
- Choices explicitly reference the role-specific metrics rather than only tone or communication posture.

## Repeated Result Archetype Risks

Risk: result types still commonly divide into material-reader, constraint-designer, and execution-planner patterns.

Decision: acceptable for Cβ completion because the reflection text is grounded in each role's kernel and metrics. Future revision can diversify result titles and prose without changing the core scenario structure.

## Scenarios That Need Future Revision

- `retail-ec/md-buyer`: older generated prose includes less polished wording than Batch 4 examples, though it passes the quality gate.
- `hr/career-advisor`: should continue to avoid becoming supportive conversation only.
- `consulting-bpo/pmo-project-drive`: should continue to emphasize issue/dependency artifacts over meeting facilitation.
- `public-infra/regional-policy-planning`: should continue to emphasize statistics and budget tables over broad policy discussion.

## Strongest Examples

- `tourism-transport/transport-operations-planning`: demand, crew, vehicle, and safety margin constraints are tightly coupled.
- `consulting-bpo/strategy-research-analyst`: shows information compression into hypothesis and executive decision material.
- `retail-ec/logistics-demand-planning`: uses forecast, stock, capacity, shortage, and cost signals clearly.
- `public-infra/urban-planning-coordination`: combines traffic, resident opinion, cost, and construction sequence.

## Weakest But Acceptable

- `marketing-media/pr-brand-communication`: still has communication-heavy surface language, but reaction logs, expression checks, FAQ gaps, and release windows keep it role-specific.
- `hr/training-organization-development`: human-development language can drift generic, but behavior indicators, segment tables, practice sheets, and effect measurement keep it Cβ-ready.
- `tourism-transport/hotel-front-management`: guest-facing scenes can look like service work, but reservation, room assignment, staffing, and recovery metrics keep it operational.

## Warnings To Keep For Future Work

- Keep `roleWorkKernel` array validation as hard fail. Batch 3 proved `null` values can break loader readiness.
- Keep cross-scenario primitive drift as warning for now. It is useful for review, but current 50-role set passes without warning.
- Future Cγ work should improve prose variety and result feedback richness, not add normal mode or B-type scope.

## Validation

- Chunk 1: Cβ quality GREEN for 6 files; integrated 38-file quality GREEN warnings 0; coverage 38/50.
- Chunk 2: Cβ quality GREEN for 6 files; integrated 44-file quality GREEN warnings 0; coverage 44/50.
- Chunk 3: Cβ quality GREEN for 6 files; integrated 50-file quality GREEN warnings 0; coverage 50/50.
- Default `node scripts/c-beta/check-cbeta-scenario-quality.mjs`: GREEN for 50 files, warnings 0.
