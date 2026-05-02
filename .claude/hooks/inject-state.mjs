#!/usr/bin/env node
/**
 * SessionStart Hook: docs/state.md と docs/decisions.md を context に注入
 *
 * Claude Code がセッション開始時（startup / resume / clear / compact）に実行。
 * 状態ファイルの内容を読み込み、stderr 経由で context として Claude に渡す。
 *
 * 公式仕様: SessionStart hook の stderr は additional context として注入される
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const stateFile = join(process.cwd(), 'docs', 'state.md');
const decisionsFile = join(process.cwd(), 'docs', 'decisions.md');

const messages = [];

if (existsSync(stateFile)) {
  const state = readFileSync(stateFile, 'utf-8');
  messages.push('=== Current Task State (docs/state.md) ===');
  messages.push(state);
  messages.push('');
}

if (existsSync(decisionsFile)) {
  const decisions = readFileSync(decisionsFile, 'utf-8');
  messages.push('=== Past Decisions (docs/decisions.md) ===');
  messages.push(decisions);
  messages.push('');
}

if (messages.length > 0) {
  // stderr 経由で Claude に context として渡る
  process.stderr.write(messages.join('\n'));
  // Exit 0 で正常終了。SessionStart の stderr は additional context として injected される
  process.exit(0);
} else {
  // ファイルがまだ存在しない（初回起動など）。何もしない
  process.exit(0);
}
