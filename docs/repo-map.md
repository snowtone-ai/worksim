# repo-map.md -- pm-zero v9.4 Repository Map

## Read Policy
- Session start: read Summary only.
- Before editing: read the section for the target area when target files are unclear.
- When navigation is unclear: read Entry Points and Directory Map.
- After structural changes: update only the affected section.

## Summary
- App type: Next.js work-simulation game/PWA.
- Main runtime: Next.js 16, React 19, TypeScript, Supabase.
- Package manager: pnpm.
- Primary source directory: src/.
- Primary test directories: src/**/*.test.ts, e2e/.
- Main entry points: src/app/page.tsx, src/app/layout.tsx.
- Verification command: pnpm verify.

## Directory Map
| Path | Purpose | Edit Frequency | Notes |
|---|---|---|---|
| src/app/ | App Router pages, routes, layout | high | Keep server/client boundaries explicit. |
| src/components/ | UI and gameplay components | high | Keep scenario rendering separate from data loading. |
| src/lib/ | Domain, Supabase, and shared utilities | high | Add tests for behavior changes. |
| src/hooks/ | React hooks and hook tests | medium | Includes tooling hook redaction test. |
| scenarios/ | Scenario content and schema | high | Follow docs/c-alpha production rules. |
| e2e/ | Playwright tests | medium | Use for user-flow regressions. |
| docs/ | pm-zero memory and scenario production docs | medium | State, decisions, issues, repo map, scenario docs. |
| scripts/ | Verification and scenario automation | medium | Tooling only. |
| supabase/ | Supabase local/project assets | medium | RLS changes require explicit review. |

## Entry Points
| Area | File | Purpose |
|---|---|---|
| App | src/app/page.tsx | Main user experience. |
| Layout | src/app/layout.tsx | Root shell and metadata. |
| Verification | scripts/verify.mjs | Unified verification and browser smoke. |
| Scenario rules | docs/c-alpha/02-SCENARIO-PRODUCTION-OS.md | Scenario production guardrails. |

## Common Workflows
| Workflow | Read First | Edit Usually | Verify |
|---|---|---|---|
| Scenario content | docs/c-alpha/, scenarios/_schema.v2.md | scenarios/, docs/c-alpha/ | pnpm verify |
| UI/gameplay change | docs/vision.md, docs/repo-map.md | src/components/, src/app/, src/lib/ | pnpm lint; pnpm typecheck; pnpm build; pnpm test |
| Auth/data change | docs/decisions.md, supabase/ | src/lib/, supabase/ | pnpm lint; pnpm typecheck; pnpm test |
| pm-zero docs | AGENTS.md | tasks.md, docs/, .claude/settings.json | git diff --check |

## Generated / External Files
| Path | Rule |
|---|---|
| node_modules/, .next/, out/, build/ | Ignore. |
| coverage/, playwright-report/, test-results/ | Ignore generated verification output. |
| logs/ | Ignore generated logs. |
| .env, .env.local, .env.*.local | Ignore secrets. |
| *.tsbuildinfo, next-env.d.ts | Ignore generated TypeScript files. |

## Update Rules
- Keep Summary under 20 lines.
- Keep each directory note concrete.
- Move rationale to docs/decisions.md.
