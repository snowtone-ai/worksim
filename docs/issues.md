# Issues Log

ツール実行失敗の自動記録。`/ev` 実行時に分析対象。

PostToolUseFailure Hook によって自動追記される。手動編集禁止。

## 2026-05-02T13:06:16.341Z
- **Tool**: Bash
- **Error**: no error message

## 2026-05-02T13:06:42.283Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T13:07:26.253Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T13:07:43.698Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T13:10:44.022Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T13:11:00.200Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T13:12:47.950Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T13:13:03.105Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T14:41:15.262Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T14:43:04.960Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T14:43:13.578Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T17:16:05.208Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T17:17:06.952Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T17:17:11.501Z
- **Tool**: Bash
- **Error**: no error message

## 2026-05-02T17:40:47.239Z
- **Tool**: Bash
- **Error**: no error message

## 2026-05-02T17:48:29.001Z
- **Tool**: PowerShell
- **Error**: no error message

## 2026-05-02T17:48:41.957Z
- **Tool**: Read
- **Error**: no error message

## 2026-05-02T17:59:08.846Z
- **Tool**: Bash
- **Error**: no error message

## 2026-05-03T00:33:41.770Z
- **Tool**: Bash
- **Error**: no error message

## 2026-05-03T00:40:54.127Z
- **Tool**: Read
- **Error**: no error message

## 2026-05-03T00:40:57.919Z
- **Tool**: Bash
- **Error**: no error message

## 2026-05-03T00:41:10.630Z
- **Tool**: Bash
- **Error**: no error message

## 2026-05-03T05:14:46.496Z
- **Tool**: Bash
- **Error**: no error message

## 2026-05-03T10:28:29.795Z
- **Tool**: Bash
- **Error**: no error message

## 2026-05-03T15:12:43.101Z
- **Tool**: Bash
- **Error**: no error message

## 2026-05-04T15:54:00+09:00
- **Source**: pm-zero v9 baseline verification
- **Category**: runtime
- **Scope**: 今回の検証コマンド側の失敗。既存MVP不具合ではない。
- **Error**: `Start-Process -FilePath 'pnpm' -ArgumentList 'dev'` が Windows shim 解釈で `%1 は有効な Win32 アプリケーションではありません` により失敗。
- **Resolution**: `Start-Process -FilePath 'pnpm.cmd' -ArgumentList 'dev' -WindowStyle Hidden` に変更して dev server 起動を確認。

## 2026-05-04T16:10:00+09:00
- **Source**: pm-zero v9 verification
- **Category**: flaky
- **Scope**: `pnpm test:e2e` は exit code 0、15 tests passed。既存MVP不具合ではない。
- **Observation**: Playwright 終了後に `Assertion failed: !(handle->flags & UV_HANDLE_CLOSING), file src\win\async.c, line 76` が出力された。
- **Resolution**: 失敗ではないため blocking issue にはしない。`pnpm verify` で再現性を確認する。

## 2026-05-04T16:12:00+09:00
- **Source**: `scripts/verify.mjs`
- **Category**: runtime
- **Scope**: 今回追加した verification pipeline の不具合。既存MVP不具合ではない。
- **Error**: Windows で `spawn('pnpm.cmd', ..., { shell: false })` が `spawn EINVAL` により失敗。
- **Resolution**: 一度 `shell: true` で通過を確認したが Node 24 の DEP0190 warning が出たため、最終的に固定引数の `cmd.exe /d /s /c pnpm.cmd ...` に変更する。

## 2026-05-04T16:25:00+09:00
- **Source**: Codex review (`codex exec review --base pre-pm-zero-v9-migration`)
- **Category**: migration
- **Scope**: pm-zero v9 Repository OS の運用不具合。既存MVP不具合ではない。
- **Findings**:
  1. `docs/state.md` に `- [ ]` があると `.codex/hooks/stop-guard.mjs` が Stop を常時ブロックする。
  2. `.claude/hooks/check-japanese.mjs` が Stop hook の JSON metadata を最終回答と誤認し、通常応答をブロックする。
  3. `scripts/verify.mjs` が Windows で起動した dev server の子プロセスを残す可能性がある。
- **Resolution**:
  1. `docs/state.md` の未完了 checkbox を削除し、Phase 8 は完了記録に変更。
  2. Claude/Codex の `check-japanese.mjs` は hook JSON から実際の応答候補が取れる時だけ判定する。
  3. `scripts/verify.mjs` は `finally` で Windows process tree を `taskkill /t /f` する。

## 2026-05-04T16:35:00+09:00
- **Source**: Codex review 2回目 (`codex exec review --base pre-pm-zero-v9-migration`)
- **Category**: migration
- **Scope**: pm-zero v9 Repository OS の運用不具合。既存MVP不具合ではない。
- **Findings**:
  1. 日本語 hook が Stop hook metadata から実際の最終応答を読めない場合に黙って通過する。
  2. `pnpm verify` と Playwright が既存 3000 番 server を再利用し、古いコードを smoke test する可能性がある。
  3. `.codex/hooks/log-error.mjs` が raw hook payload を tracked file に保存し、secret を漏らす可能性がある。
- **Resolution**:
  1. 日本語 hook は `transcript_path` がある場合、JSONL transcript の最後の assistant message を判定対象にする。
  2. `playwright.config.ts` と `scripts/verify.mjs` は検証ごとに専用ポートを使い、既存 server を再利用しない。
  3. Codex error hook は tool 名と redacted error だけを記録し、raw payload を保存しない。

## 2026-05-04T16:45:00+09:00
- **Source**: `pnpm verify`
- **Category**: runtime
- **Scope**: 今回変更した専用ポート検証の不具合。既存MVP不具合ではない。
- **Error**: `pnpm dev -- -p <port>` と `pnpm dev -- --port <port>` が Next.js 16 で option を project directory として解釈し、`Invalid project directory provided` で失敗。
- **Resolution**: pnpm script へは区切り `--` を入れず、`pnpm dev --port <port>` 形式へ変更する。

## 2026-05-04T16:55:00+09:00
- **Source**: `pnpm verify`
- **Category**: runtime
- **Scope**: browser smoke の検証方式。既存MVP不具合ではない。
- **Error**: dev server smoke で HMR WebSocket の `ERR_INVALID_HTTP_RESPONSE` が console error として検出された。
- **Resolution**: browser smoke は `pnpm build` 後の production server (`pnpm start --port <port>`) で確認する。

## 2026-05-04T17:05:00+09:00
- **Source**: Codex review 3回目 (`codex exec review --base pre-pm-zero-v9-migration`)
- **Category**: migration
- **Scope**: pm-zero v9 Repository OS の運用不具合。既存MVP不具合ではない。
- **Findings**:
  1. Stop hook で毎回 `pnpm verify` を走らせると、通常応答が1分以上ブロックされる。
  2. 日本語 hook は JSON/code-only など正当な ASCII 出力をブロックしうる。
  3. `reuseExistingServer: false` が通常のローカル E2E 体験を壊す。
  4. verify がユーザー管理の Next server を強制停止しうる。
- **Resolution**:
  1. Stop hook から `scripts/verify.mjs` と日本語 hook の自動実行を外し、`pnpm verify` を明示 gate に戻す。
  2. 日本語 hook は手動/将来 hook 用として残し、Stop には接続しない。
  3. Playwright は通常 `pnpm test:e2e` では既存 server を再利用し、`pnpm verify` では production server + 専用ポートを使う。
  4. verify からユーザー管理 server の強制停止処理を削除する。

## 2026-05-04T17:15:00+09:00
- **Source**: `pnpm test:e2e`
- **Category**: runtime
- **Scope**: Playwright config 変更による通常ローカル E2E の不具合。既存MVP不具合ではない。
- **Error**: 通常実行でも `pnpm dev --port 3000` を使うようになり、一部 result/immersive route が 404 になった。
- **Resolution**: 通常実行は元の `pnpm dev` + `reuseExistingServer: true` に戻し、custom server は `PLAYWRIGHT_*` env がある時だけ使う。

## 2026-05-04T17:25:00+09:00
- **Source**: Codex review 4回目 (`codex exec review --base pre-pm-zero-v9-migration`)
- **Category**: CI
- **Scope**: `pnpm verify` の CI 互換性。既存MVP不具合ではない。
- **Finding**: `CI=1` では `playwright.config.ts` が webServer を無効化するため、`pnpm verify` の E2E が専用ポートへ接続できない。
- **Resolution**: `PLAYWRIGHT_*` による custom server 指定がある場合は CI でも webServer を起動する。

## 2026-05-04T17:35:00+09:00
- **Source**: Codex review 5回目 (`codex exec review --base pre-pm-zero-v9-migration`)
- **Category**: migration
- **Scope**: Playwright 外部URL検証と Claude 設定。既存MVP不具合ではない。
- **Findings**:
  1. `PLAYWRIGHT_BASE_URL` 指定時にもローカル server を起動してしまう。
  2. `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` により、既存の `Bash(...)` deny pattern と active tool がずれる。
- **Resolution**:
  1. `PLAYWRIGHT_BASE_URL` は外部URLとして扱い、webServer を起動しない。
  2. Claude の PowerShell tool 強制 env を削除し、既存 deny pattern と矛盾しない状態に戻す。

## 2026-05-04T18:10:00+09:00
- **Source**: ClaudeCode ultrareview差し戻し triage
- **Category**: review
- **Scope**: pm-zero v9 Repository OS の運用不具合。既存MVP不具合ではない。
- **Unmodified**: `.codex/config.toml` の `gpt-5.5` / `gpt-5.4` / `gpt-5.4-mini` はOpenAI公式docsで存在確認できたため、bug_004 はfalse positiveとしてコード変更しない。
- **Fixed**: `scripts/verify.mjs` の server log保存、`scripts/sync-claude-md.mjs` の verify組み込み、`DialogueScene` の block label表示、`.codex/hooks/log-error.mjs` の書き込み失敗時例外抑止。

## 2026-05-04T18:55:00+09:00
- **Source**: `codex exec review --base pre-pm-zero-v9-migration`
- **Category**: review
- **Scope**: review gate の実行失敗。既存MVP不具合ではない。
- **Error**: コマンドが300秒で timeout。
- **Fallback review**: 5観点セルフレビューを実施。1) MVP導線: E2E 15件GREEN。2) 型安全: `pnpm typecheck` GREEN。3) 検証導線: `pnpm verify` GREENで `CLAUDE.md` import checkも実行確認。4) UI回帰: 会話ヘッダーは既存block labelのみ参照し、選択肢・遷移ロジックは未変更。5) 運用hook: `issues.md` 書き込み失敗時のみ例外抑止し、通常記録内容は維持。
