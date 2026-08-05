# tasks.md -- pm-zero v9.4 Execution Ledger

## Goal Binding
- Vision source: docs/vision.md
- Active goal: Refactor WorkSim internals without changing product behavior or external interfaces.
- Planning owner: Codex CLI
- Implementation owner: Codex CLI
- Review owner: Codex CLI self-audit

## Status Vocabulary
- proposed: idea exists, not ready
- ready: owner, dependencies, write scope, acceptance, verification, and expected evidence are clear
- doing: one owner is actively working
- blocked: needs decision, dependency, credential, environment, or human action
- review: implementation complete, review pending
- done: accepted by reviewer
- verified: evidence recorded

## Parallelization Rules
- Coordinator owns tasks.md.
- Worker agents own only their assigned Write Scope.
- Parallel implementation requires disjoint Write Scopes or isolated worktrees.
- If two tasks need the same file, serialize them.
- Subagents return reports; coordinator updates tasks.md.

## Tasks
| ID | Status | Owner | Depends On | Write Scope | Acceptance | Verification | Evidence |
|---|---|---|---|---|---|---|---|
| T001 | verified | Codex CLI | none | AGENTS.md, CLAUDE.md, HANDOFF-JA.md, tasks.md, docs/state.md, docs/repo-map.md, docs/vision.md, docs/decisions.md, .claude/settings.json, .codex/config.toml, .gitignore | pm-zero v9.4 source-of-truth files are current, project-local configs are justified or removed, and product code is untouched | git diff --check; pnpm verify | 2026-05-17: node scripts/verify.mjs passed. Product E2E remains outside this metadata gate while WorkSim development is incomplete; see docs/issues.md. |
| T002 | verified | Codex CLI | none | src/lib/scenario/loader.ts, src/lib/scoring/calculator.ts, tasks.md | Scenario loading and scoring internals are clearer and more type-explicit without changing runtime behavior, schemas, routes, UI, or data contracts | pnpm lint; pnpm typecheck; pnpm test; pnpm build | 2026-05-17: lint passed; typecheck passed; vitest 4 files / 24 tests passed; next build passed. |

## Blockers
| ID | Task | Blocker | Needed decision | Owner |
|---|---|---|---|---|

## Review Notes
| Task | Reviewer | Result | Follow-up |
|---|---|---|---|
