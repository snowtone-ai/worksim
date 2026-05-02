---
globs: "**/*.{test,spec}.{ts,tsx}"
description: テスト規約
---

# Testing Standards

## テストフレームワーク

- **Vitest**：ユニットテスト・統合テスト
- **Playwright**：E2E テスト
- **Testing Library (React)**：コンポーネントテスト

## RED → GREEN → REFACTOR

1. **RED**：先にテストを書く。最初は失敗する状態
2. **GREEN**：テストを通す最小限のコードを書く
3. **REFACTOR**：テストが通ったままリファクタリング

## テストの種類と粒度

| 層 | ツール | カバレッジ目標 |
|----|--------|--------------|
| ロジック（純粋関数） | Vitest | 90% |
| カスタムフック | Vitest + Testing Library | 80% |
| コンポーネント | Testing Library | 主要なユーザーインタラクションのみ |
| API Route | Vitest（モック Supabase） | 主要パスのみ |
| E2E（ユーザーストーリー） | Playwright | vision.md の全 US-X を網羅 |

## E2E テスト

`vision.md` の Given/When/Then ユーザーストーリー（US-1 〜 US-10）に対応する Playwright テストを書く。

```
e2e/
├── us-1-select-industry.spec.ts
├── us-2-google-login.spec.ts
├── us-3-skip-profile.spec.ts
├── us-4-play-scenario.spec.ts
├── us-5-choice-scoring.spec.ts
├── us-6-result-display.spec.ts
├── us-7-replay.spec.ts
├── us-8-multi-role.spec.ts
├── us-9-resume-after-error.spec.ts
└── us-10-deploy-smoke.spec.ts
```

## モックの方針

- Supabase はテストでモックする（実 API は叩かない）
- 例外：E2E は実 Supabase（テスト用プロジェクト）を使う
- Google OAuth は E2E でも本物を使わず、テスト用フィクスチャでセッション偽装

## テスト命名

```typescript
describe('ScenarioLoader', () => {
  it('schemaに準拠したJSONをロードできる', () => { ... })
  it('schema違反のJSONを拒否する', () => { ... })
  it('存在しないシナリオIDでエラーを投げる', () => { ... })
})
```

日本語OK、何をテストしているかが明確であることが重要。
