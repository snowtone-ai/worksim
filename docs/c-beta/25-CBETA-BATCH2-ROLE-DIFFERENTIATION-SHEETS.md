# Cβ Batch 2 Role Differentiation Sheets

## Selection Skeletons

### A. Fill high-demand student roles first

- Success probability: high
- Implementation cost: medium
- Product-quality impact: medium
- Scope creep risk: medium
- Existing behavior risk: low
- Decision: rejected as primary strategy because it would over-select familiar sales/marketing roles.

### B. Maximize cross-industry diversity

- Success probability: high
- Implementation cost: medium
- Product-quality impact: medium-high
- Scope creep risk: low
- Existing behavior risk: low
- Decision: useful filter, but not enough by itself because different industries can still collapse into the same coordination pattern.

### C. Maximize decision-primitive diversity

- Success probability: medium-high
- Implementation cost: medium
- Product-quality impact: high
- Scope creep risk: low
- Existing behavior risk: low
- Decision: adopted. Batch 2 should stress the quality gate across different work materials and decision primitives.

## Adopted Batch 2 Roles

| order | industry | roleSlug | role | primary work kernel | main materials | main metrics |
|---:|---|---|---|---|---|---|
| 1 | `it` | `cloud-operations` | インフラ/クラウド運用 | monitoring data to operation action | alerts, config change, cost report, vulnerability notice | CPU, error rate, VM count, rollback time, monthly cost |
| 2 | `it` | `data-analyst-bi` | データアナリスト/BI担当 | business data to decision indicators | dashboard, SQL condition, KPI table, hypothesis memo | CVR, churn, gross margin, sample size, expected uplift |
| 3 | `finance` | `credit-risk-management` | 与信審査/リスク管理 | financial evidence to credit risk decision | financial statements, cashflow table, collateral memo | operating margin, debt, shortage amount, collateral value |
| 4 | `manufacturing` | `quality-assurance` | 品質保証 | defect evidence to shipment decision | inspection record, defect photo log, process checklist | defect rate, lot count, process temperature, held inventory |
| 5 | `manufacturing` | `procurement` | 購買/調達 | supplier conditions to purchase terms | quote comparison, delivery reply, substitute material table | unit price, delivery days, fit rate, exchange impact |
| 6 | `trading` | `trade-operations` | 貿易実務/輸出入調整 | shipping and customs documents to delivery risk | shipping schedule, invoice, customs documents | ETD/ETA, box count, tariff rate, delay days |
| 7 | `trading` | `supply-chain-coordination` | サプライチェーン調整 | demand, inventory, and transport limits to supply plan | demand forecast, inventory list, transport capacity | forecast quantity, stock days, required routes, gross margin |
| 8 | `consulting-bpo` | `operations-consultant` | 業務改善コンサル | operation logs to bottleneck and improvement plan | process map, operation logs, interviews, improvement comparison | processing volume, backlog rate, rework points, saved hours |
| 9 | `retail-ec` | `md-buyer` | MD/バイヤー | sales, inventory, and margin to buying decision | weekly sales, aged inventory, buying terms, shelf plan | sales units, gross margin, stock age, turnover |
| 10 | `tourism-transport` | `travel-product-planning` | 旅行商品企画 | itinerary, cost, and capacity to travel product condition | itinerary, cost table, booking trend, operator conditions | stay time, cost, price, booking count, minimum participants |

## Anti-Generic Strategy

- Each role uses a different artifact family.
- Each scene includes numeric signals in `workMaterial`.
- Each `coreDecisionPrimitive` includes the role slug and material type to prevent accidental cross-role repetition.
- Stakeholder pressure appears only as a constraint; the protagonist remains the role-specific artifact and metric.
