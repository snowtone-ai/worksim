#!/usr/bin/env node
/**
 * UserPromptSubmit Hook: ユーザープロンプト送信時に state.md の状態を context に注入
 *
 * 「あれ続きだっけ？」「進捗どこまで？」のような曖昧な質問でも、
 * Claude が常に最新の state.md を参照できるようにする。
 *
 * stderr 出力は additional context として注入される（公式仕様）
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const stateFile = join(process.cwd(), 'docs', 'state.md');

if (existsSync(stateFile)) {
  const state = readFileSync(stateFile, 'utf-8');
  // 状態ファイルが大きすぎる場合は先頭2000文字に制限
  const truncated = state.length > 2000 ? state.slice(0, 2000) + '\n... (truncated)' : state;
  process.stderr.write(`[Current state (docs/state.md)]\n${truncated}`);
}

process.exit(0);
