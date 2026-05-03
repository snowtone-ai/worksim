// PostToolUse hook — Codex 用
// ファイル編集後に docs/state.md の更新日時を記録する（非同期・ブロック不可）
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const statePath = join(root, 'docs', 'state.md');

try {
  let content = readFileSync(statePath, 'utf8');
  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
  // 既存の "# Last Updated:" 行を更新する（なければ先頭に追加）
  if (content.match(/^# Last Updated:/m)) {
    content = content.replace(/^# Last Updated:.*$/m, `# Last Updated: ${stamp}`);
  } else {
    content = `# Last Updated: ${stamp}\n\n${content}`;
  }
  writeFileSync(statePath, content, 'utf8');
} catch {
  // docs/state.md が存在しない場合はスキップ
}
