# WorkSim

日本の就活生のための、職場の1日を体験できる Web シミュレーションゲーム。

## 概要

説明会・適職診断では伝わらない「実際の業務イメージ」を就職前に提供し、入社後ミスマッチを減らすことを目的としたシミュレーションゲームです。

**MVP対象**：IT業界の6職種（Webエンジニア / ITコンサル / 法人営業 / PdM / インフラ運用 / UIデザイナー）

## 技術スタック

- **Framework**: Next.js 15 系 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Auth & DB**: Supabase (Google OAuth)
- **Deploy**: Vercel
- **Package Manager**: pnpm

## 開発

```bash
pnpm install
cp .env.example .env.local  # 値を埋める
pnpm dev
```

## ライセンス

未定（MVP段階）
