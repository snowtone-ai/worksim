# XP Rules

プロジェクト横断の学びを最大10項目で管理する。

1. 下端 CTA は viewport ではなく実機 safe area を前提に置く。
2. 長文シナリオ UI は本文と選択肢を同じ縦フローに置く。
3. Playwright の bounding box 成功だけでなく、実ブラウザ screenshot と console error も確認する。
4. Windows で background process を起動する時は `pnpm.cmd` を明示する。
