// Stop hook — Codex 用
// 完了前に docs/state.md を確認し、未完了タスクがあれば警告する
import { readFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();

try {
  const state = readFileSync(join(root, 'docs', 'state.md'), 'utf8');
  // 未完了タスク（チェックボックス未完了）があるか確認
  if (state.includes('- [ ]')) {
    process.stderr.write(
      '[stop-guard] docs/state.md に未完了タスクがあります。完了を確認してから終了してください。\n'
    );
    // Codex の Stop hook: exit 2 でターン完了をブロック
    process.exit(2);
  }
} catch {
  // docs/state.md が存在しない場合はスキップ
}
