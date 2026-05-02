---
globs: "**/*.{ts,tsx,js,jsx,mjs}"
description: TypeScript / React コーディング規約
---

# Coding Standards

## ファイル構成

- 1 ファイル 300 行以内。超えそうなら分割
- 1 関数 50 行以内が目安
- ディレクトリは機能単位（`features/auth/`、`features/scenario/` など）
- 共通UIは `components/ui/`、業務ロジックは `features/`

## TypeScript

- `tsconfig.json` で `strict: true`、`noUncheckedIndexedAccess: true`
- `any` 禁止。`unknown` を使い narrowing する
- 関数は引数と戻り値の型を必ず明示
- React コンポーネントは `function MyComponent({ ... }: Props)` 形式
- 型定義は同ファイル末尾、または `types.ts` に集約

## React / Next.js

- App Router（`app/` ディレクトリ）使用、Pages Router 禁止
- Server Component をデフォルト、`"use client"` は必要時のみ
- データ取得は Server Component で。useEffect での fetch を避ける
- Form は React Server Actions を優先

## Supabase 利用

- Service Role Key はサーバー側のみ。クライアントから絶対に参照しない
- RLS を全テーブルに設定。設定しないテーブルは作らない
- クライアント側 Supabase クライアントは `lib/supabase/client.ts` に集約
- サーバー側 Supabase クライアントは `lib/supabase/server.ts` に集約

## エラーハンドリング

- `try/catch` で例外を握りつぶさない。最低でもログを残す
- ユーザー向けエラーメッセージは日本語、開発ログは英語
- 致命的エラーは Error Boundary でキャッチして「再読み込み」を促す

## 命名規則

- ファイル名：kebab-case（`web-engineer.json`、`use-scenario.ts`）
- React コンポーネント：PascalCase（`ScenarioCard.tsx`）
- 関数・変数：camelCase
- 定数：UPPER_SNAKE_CASE
- 型・インターフェース：PascalCase

## コメント

- コメントは「なぜこうしたか」を書く。「何をしているか」はコードで表現
- TODO コメントには課題管理 ID を付ける（`// TODO(state.md#task-12): ...`）
- 日本語OK

## インポート順序

1. Node.js 標準ライブラリ
2. 外部パッケージ
3. 内部パッケージ（`@/...` パス）
4. 相対パス
5. 型のみのインポート（`import type`）

## 禁止事項

- `console.log` を本番コードに残さない（テスト用は OK、PR前に削除）
- `localStorage` / `sessionStorage` を直接触らない（カスタムフック経由）
- `dangerouslySetInnerHTML` 禁止（XSS リスク）
- 未使用の import / 変数を残さない
