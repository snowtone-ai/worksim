# WorkSim — AGENTS.md (pm-zero v9.0)

<language_rule>
完了報告、エラー報告、手動確認依頼は日本語で出力する。
コードコメントは既存方針に合わせ、必要最小限にする。識別子とファイル名は英語を使う。
</language_rule>

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project runs Next.js 16.2.4 with App Router. Before changing Next.js API, routing,
Proxy, Server Components, Server Actions, or config, read the relevant guide in
`node_modules/next/dist/docs/`.
<!-- END:nextjs-agent-rules -->

<stack>
- Runtime: Node.js 24.x LTS, pnpm
- Language: TypeScript strict mode, `noUncheckedIndexedAccess: true`
- Framework: Next.js 16.2.4 App Router, React 19
- Styling: Tailwind CSS v4
- Database/Auth: Supabase SSR + Google OAuth
- Deploy: Vercel Hobby
</stack>

<commands>
- dev: `pnpm dev`
- lint: `pnpm lint`
- typecheck: `pnpm typecheck`
- build: `pnpm build`
- test: `pnpm test`
- e2e: `pnpm test:e2e`
- verify: `pnpm verify`
</commands>

<external_memory>
- `docs/state.md` is the SSOT. Read it at session start and do not redo completed tasks.
- Read `docs/decisions.md` before changing architecture, security, data, auth, or UX rules.
- Record failures in `docs/issues.md`; after 3 consecutive failures, stop and write `docs/escape.md`.
- Record durable design notes in `docs/design-notes.md`; keep `docs/xp-rules.md` to 10 lessons.
- `vision.md` is product scope. Do not silently contradict it.
</external_memory>

<rules>
- 1 file should stay under 300 lines; 1 function should stay under 50 lines where practical.
- Prefer small, reversible diffs. Do not delete core MVP behavior.
- New features and bug fixes need RED -> GREEN tests when practical.
- Reference Gate: before major UI/API/data/architecture change, record at least 3 real URLs in `docs/decisions.md`.
- Supabase RLS is required for every table; service role keys are server-only.
- `profiles` must not store names, emails, birth dates, addresses, phone numbers, or student IDs.
- Public MVP scenarios must not use real company, service, or personal names.
- University, faculty, and target industry are optional; blank profile must remain playable.
- Do not read or print `.env`, `.env.*`, secrets, tokens, or private keys.
- Never modify `.env.local` for routine work and never commit it.
- Do not run `git reset --hard`, `git clean -fd`, `git push --force`, or push without approval.
- Do not create files in paths containing non-ASCII characters.
</rules>

<quality_gate>
Before completion, run `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`,
`pnpm verify`, and E2E/browser checks unless a documented blocker exists.
Use Codex CLI `/review` when available; otherwise use `codex exec review` or record
a 5-view self review in `docs/issues.md`.
</quality_gate>

<imports>
@OS-KERNEL.md
@CODE-QUALITY.md
@ARCHITECTURE-RULES.md
@REVIEW-GATE.md
@REFERENCE-GUIDE.md
@VERIFICATION.md
@HANDOFF-JA.md
</imports>
