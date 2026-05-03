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

---

## Dual-CLI 対応

このプロジェクトは Claude Code CLI と Codex CLI の両方で編集できます。

### Claude Code CLI で起動

```
claude --permission-mode bypassPermissions
```

### Codex CLI で起動

```
codex
```

### 共有ファイル（両 CLI 共通）

| ファイル | 役割 |
|---------|------|
| docs/state.md | タスク状態 SSOT（セッション開始時に必ず読む） |
| docs/decisions.md | 永続的な設計判断 |
| docs/issues.md | エラーログ |
| docs/vision.md | プロジェクト仕様書 |

### CLI 固有ファイル

| ファイル / ディレクトリ | 対象 CLI |
|----------------------|---------|
| CLAUDE.md | Claude Code CLI |
| .claude/ | Claude Code CLI |
| AGENTS.md | Codex CLI |
| .codex/ | Codex CLI |
