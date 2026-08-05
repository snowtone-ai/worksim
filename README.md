# WorkSim

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-RLS-green?logo=supabase)
![Playwright](https://img.shields.io/badge/Playwright-E2E-green?logo=playwright)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

> 就活生が職場の1日をブラウザで体験できる業務シミュレーションゲーム

Status: 開発中止

想定した品質に届かないと判断し、開発を中止しました。設計と検証の記録として公開しています。

説明会や適職診断では伝わりにくい「実際の業務イメージ」を就職前に提供し、入社後のミスマッチを減らすことを目的としています。IT・金融・製造・マーケティング・コンサル・人事・公共インフラ・小売EC・観光交通・商社の10業界、業界ごと5職種の業務シナリオに対応しています。

---

## 主な機能

- 10業界・50職種の業務シナリオをブラウザ上でシミュレーション体験できる
- Googleアカウントでログインして進行状況を保存できる
- 大学・学部・志望業界はオプション入力で、未入力のままでもプレイできる
- シナリオには行動タグ・大学向け分析タグ・企業向け分析タグが付与されており、集計・分析に利用できる

---

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フロントエンド | Next.js 16, TypeScript, Tailwind CSS v4 |
| データベース | Supabase(PostgreSQL + RLS + Google OAuth) |
| インフラ | Vercel, GitHub Actions |
| テスト | Vitest, Playwright |

---

## 設計の工夫

- Supabaseの行レベルセキュリティ(RLS)を全テーブルに必須適用し、ユーザー間のデータ分離を保証
- プロフィールに氏名・メールアドレス・生年月日・住所・電話番号・学籍番号を保存しないプライバシー設計
- 公開MVPシナリオには実在の企業名・サービス名・個人名を使用しない

---

## セットアップ

必要なツール:Node.js 24.x、pnpm、Supabaseアカウント

```bash
pnpm install
cp .env.example .env.local  # 値を記入
pnpm dev
```

| コマンド | 内容 |
|---|---|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm lint` | コード品質チェック |
| `pnpm typecheck` | 型チェック |
| `pnpm build` | 本番ビルド |
| `pnpm test` | ユニットテスト |
| `pnpm test:e2e` | E2Eテスト(Playwright) |
| `pnpm verify` | 全チェック一括実行 |

開発時の内部運用手順(CLI設定など)は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照。

---

## ライセンス

MIT
