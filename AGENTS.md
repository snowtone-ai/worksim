# WorkSim AGENTS.md -- pm-zero v9.4

## Language
- Completion reports, error reports, and manual confirmation requests: Japanese.
- Code identifiers and command names: English.
- When 3+ HIGH assumptions accumulate, ask immediately.

## Source of Truth
- Product intent: docs/vision.md, which points to the retained root vision.md product spec.
- Execution tasks: tasks.md
- Current state: docs/state.md
- Decisions: docs/decisions.md
- Failures: docs/issues.md
- Repository map: docs/repo-map.md
- Report: HANDOFF-JA.md

## Startup Read
- Read this file.
- Read docs/state.md.
- Read docs/decisions.md.
- Read docs/repo-map.md Summary.

## Repository Navigation
- Read detailed repo-map sections only when target files are unclear.
- Update docs/repo-map.md after structural changes.
- Use rg before broad manual browsing.

## Stack
- Runtime: Node.js 24.x LTS, pnpm.
- Language: TypeScript strict mode, noUncheckedIndexedAccess.
- Framework: Next.js 16.2.4 App Router, React 19.
- Styling: Tailwind CSS v4.
- Database/Auth: Supabase SSR + Google OAuth.
- Deploy: Vercel Hobby.

## Next.js Rule
- Before changing Next.js API, routing, Proxy, Server Components, Server Actions, or config, read the relevant guide in node_modules/next/dist/docs/ when available.

## Task Ledger Rule
- Planning output goes to tasks.md.
- Implementation starts from tasks marked ready.
- Each ready task includes owner, dependencies, write scope, acceptance, verification, and evidence.
- Coordinator updates tasks.md.
- Worker agents report results to the coordinator.

## Scope Lock Rule
- One coordinator owns tasks.md and docs/state.md.
- Workers edit only their assigned write scope.
- Parallel work requires disjoint Write Scopes or isolated worktrees.
- Tasks touching the same file are serialized.

## Quality Standards
- Keep files and functions small enough to review.
- New features and bug fixes need RED -> GREEN tests when practical.
- Supabase RLS is required for every table.
- Service role keys are server-only.
- Profiles must not store names, emails, birth dates, addresses, phone numbers, or student IDs.
- Public MVP scenarios must not use real company, service, or personal names.
- University, faculty, and target industry are optional; a blank profile must remain playable.
- Generated, build, cache, dependency, and secret files must stay ignored.
- Auth, billing, DB schema, RLS/permissions, deploy, security, 300+ line diff, and new external API require cross-vendor review.

## Commands
- install: pnpm install
- lint: pnpm lint
- typecheck: pnpm typecheck
- test: pnpm test
- e2e: pnpm test:e2e
- build: pnpm build
- verify: pnpm verify

Use only commands that exist in this repository.

## Execution Boundaries
- Use PowerShell.
- Use standard push with branch tracking.
- Keep safe values only in output.
- Use .env.example as template; runtime reads actual env values.
- Authentication, billing, production deploy final approval, and personal data handling are human tasks.
- Product code changes require an explicit task in tasks.md.

## WorkSim Scenario Production Rules
- Read docs/c-alpha/* before scenario, analytics, C-type, C-beta, or B-type work.
- Scenario generation must use scenarios/_schema.v2.md and docs/c-alpha/02-SCENARIO-PRODUCTION-OS.md.
- C-alpha scenario data must include behaviorTags, universityInsightTags, companyInsightTags, and riskTags.
- C-alpha is currently 2D background-image based, but metadata must preserve future 3D/metaverse extensibility.
- University/company analytics must be anonymized and aggregated by default.
- Companies must not receive individual student choice data for selection screening by default.
- If future scenario work cannot complete all scenarios, update docs/c-alpha/08-IMPLEMENTATION-CHECKLIST.md with exact remaining work.
