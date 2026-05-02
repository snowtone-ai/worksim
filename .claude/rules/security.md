---
globs: "**/{supabase,lib,app/api}/**/*.{ts,tsx,sql}"
description: セキュリティ規約（Supabase RLS、個人情報、APIキー管理）
---

# Security Rules

## 個人情報の最小化

### 収集してよい情報（任意）
- 大学名（自由入力）
- 学部（自由入力）
- 志望業界（選択肢）

### 絶対に収集しない情報
- 氏名（実名・ニックネーム問わず）
- 生年月日
- 住所
- 電話番号
- メールアドレス（auth.users にのみ存在、アプリは参照しない）
- 学籍番号

### 設計原則
- profiles テーブルに名前カラムを作らない
- Google OAuth から取得した名前情報をアプリに保存・表示しない
- 「ようこそ◯◯さん」のような名前表示をしない（「ようこそ」のみ）

## Supabase RLS（Row Level Security）

### 必須設定

すべての public スキーマのテーブルに RLS を有効化する。RLS なしのテーブルは作成禁止。

```sql
-- 例：profiles テーブル
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### scenarios テーブル（読み取り専用）

```sql
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read scenarios"
  ON public.scenarios FOR SELECT
  USING (true);

-- INSERT/UPDATE/DELETE はポリシー作らない（service_role のみ可能）
```

## API キー管理

### NEVER公開
- `SUPABASE_SERVICE_ROLE_KEY`：サーバーのみ
- `.env.local`：Git コミット禁止（.gitignore で除外済み）
- Vercel Environment Variables：Production / Preview / Development を分ける

### 公開してよい
- `NEXT_PUBLIC_SUPABASE_URL`：プロジェクト URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`：anon key（RLS で守られる前提）

### コード例

```typescript
// ✅ クライアント側（lib/supabase/client.ts）
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ✅ サーバー側（lib/supabase/server.ts）
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: ... } }
  )
}

// ❌ 絶対NG
// export const supabaseAdmin = createClient(URL, SERVICE_ROLE_KEY) // クライアントから見える
```

## 入力検証

- Zod でクライアント・サーバー両方でバリデーション
- API Route Handler で必ずスキーマ検証
- SQL インジェクションは Supabase が防ぐが、生 SQL を書く時は parameterized query

## CORS / CSP

- Next.js デフォルトの CSP を有効化
- Supabase の Storage を画像配信に使う場合、CSP の img-src に Supabase URL を追加

## 認証

- パスワード認証を実装しない（Google OAuth のみ）
- Magic Link も MVP では使わない
- セッショントークンは Cookie（httpOnly、secure、sameSite=lax）で管理。Supabase SSR が自動処理

## セキュリティチェックリスト（PR レビュー時）

- [ ] RLS が新テーブルに設定されている
- [ ] 環境変数で `NEXT_PUBLIC_` プレフィックスが正しい（公開してよい変数のみ付与）
- [ ] `service_role` キーがクライアントコードで参照されていない
- [ ] 個人情報を新たに収集していない
- [ ] `.env.local` がコミットに含まれていない
- [ ] `console.log` で機密情報をログ出力していない
