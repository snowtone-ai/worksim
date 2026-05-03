// SessionStart hook — Codex 用
// docs/state.md と docs/decisions.md をセッション開始時にコンテキストに注入する
import { readFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
let context = '';

for (const file of ['docs/state.md', 'docs/decisions.md']) {
  try {
    const content = readFileSync(join(root, file), 'utf8').trim();
    if (content) {
      context += `\n\n---\n# ${file}\n${content}`;
    }
  } catch {
    // ファイルが存在しない場合はスキップ
  }
}

if (context) {
  // Codex ネイティブの additionalContext 形式で出力
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: context.trim()
    }
  }));
}
