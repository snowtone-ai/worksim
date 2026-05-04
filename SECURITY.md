# SECURITY.md

## 秘密情報

- `.env`, `.env.*`, secret, token, private key を読まない、表示しない、コミットしない。
- `SUPABASE_SERVICE_ROLE_KEY` はサーバー側だけで使う。
- `NEXT_PUBLIC_` 付き値だけがブラウザ公開可能。

## 個人情報

WorkSim が収集してよい情報は任意の大学名、学部、志望業界のみ。
氏名、メールアドレス、生年月日、住所、電話番号、学籍番号は保存しない。

## Supabase

- 全テーブルで RLS を有効化する。
- `authenticated` への `GRANT` を忘れない。
- profiles には auth.users の名前やメールを複製しない。

## Git

- `git reset --hard`, `git clean -fd`, `git push --force` は禁止。
- push はユーザー承認後のみ。
