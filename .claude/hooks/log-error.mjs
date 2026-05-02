#!/usr/bin/env node
/**
 * PostToolUseFailure Hook: ツール実行失敗を docs/issues.md に追記
 *
 * Claude Code がツール（Bash, Edit, Write等）の実行失敗時に呼ぶ。
 * stdin から JSON 形式の hook input を受け取り、エラー情報を issues.md に追記。
 */

import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const issuesFile = join(process.cwd(), 'docs', 'issues.md');

// stdin タイムアウト 3秒
const STDIN_TIMEOUT_MS = 3000;

let stdinData = '';

const timeoutId = setTimeout(() => {
  // stdin 読み込みタイムアウト。何もせず終了
  process.exit(0);
}, STDIN_TIMEOUT_MS);

process.stdin.on('data', (chunk) => {
  stdinData += chunk.toString();
});

process.stdin.on('end', () => {
  clearTimeout(timeoutId);

  try {
    const input = JSON.parse(stdinData);
    const timestamp = new Date().toISOString();
    const toolName = input.tool_name ?? 'unknown';
    const errorMessage = input.error_message ?? input.tool_response?.error ?? 'no error message';

    const entry = [
      '',
      `## ${timestamp}`,
      `- **Tool**: ${toolName}`,
      `- **Error**: ${errorMessage}`,
      '',
    ].join('\n');

    // ディレクトリ作成（念のため）
    if (!existsSync(dirname(issuesFile))) {
      mkdirSync(dirname(issuesFile), { recursive: true });
    }

    // ファイルが存在しない時はヘッダーを作成
    if (!existsSync(issuesFile)) {
      appendFileSync(issuesFile, '# Issues Log\n\nツール実行失敗の自動記録。`/ev` 実行時に分析対象。\n', 'utf-8');
    }

    appendFileSync(issuesFile, entry, 'utf-8');
  } catch (err) {
    // パースエラーなどは黙って無視（Claude の動作を止めないため）
  }

  process.exit(0);
});
