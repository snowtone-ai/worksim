// PreToolUse hook — Codex 用
// 危険な Bash コマンドをブロックする
// stdin から JSON を読む（タイムアウト 3 秒）
const input = await Promise.race([
  new Promise(resolve => {
    const chunks = [];
    process.stdin.on('data', d => chunks.push(d));
    process.stdin.on('end', () => resolve(Buffer.concat(chunks).toString()));
  }),
  new Promise(resolve => setTimeout(() => resolve('{}'), 3000))
]);

let data = {};
try { data = JSON.parse(input); } catch { /* 無効な JSON はスキップ */ }

const cmd = data?.tool_input?.command ?? '';

const BLOCKED_PATTERNS = [
  'rm -rf',
  'sudo ',
  'git push --force',
  'git push -f',
  'git reset --hard',
  'git clean -fd',
  'Remove-Item -Recurse -Force',
  'format ',
  'del /f /s /q'
];

for (const pattern of BLOCKED_PATTERNS) {
  if (cmd.toLowerCase().includes(pattern.toLowerCase())) {
    // Codex ネイティブのブロック形式
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: `危険なコマンドパターンをブロック: "${pattern}"`
      }
    }));
    process.exit(0);
  }
}
// 問題なければ exit 0（何も出力しない）
