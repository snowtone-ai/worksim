# VERIFICATION.md

## 統一入口

`pnpm verify` は `scripts/verify.mjs` を実行し、以下を順に確認する。

1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm build`
4. `pnpm test -- --run`
5. `pnpm test:e2e`
6. dev server HTTP 200
7. Playwright browser smoke
8. console error 0 件
9. screenshot 取得
10. 失敗分類の表示
11. 終了コードによる gate 判定

## 個別実行

- lint: `pnpm lint`
- typecheck: `pnpm typecheck`
- build: `pnpm build`
- unit: `pnpm test -- --run`
- e2e: `pnpm test:e2e`

## 失敗時

`dependency / type / lint / runtime / UI / API / auth / flaky` に分類し、`docs/issues.md` に記録する。
同じ問題を3回直せない場合は `docs/escape.md` に移す。
