# MIGRATION ROLLBACK

このファイルは、pm-zero v9.0 移行作業から現在のMVP状態へ戻るための手順です。

## 保全済み地点

- タグ: `pre-pm-zero-v9-migration`
- 目的: pm-zero v9.0 移行前のMVP状態を復元できるようにする

## 現在のタグへ戻る方法

作業内容を確認してから、タグの状態を別ブランチで確認します。

```bash
git status
git switch -c restore/pre-pm-zero-v9-migration pre-pm-zero-v9-migration
```

既存ブランチ上で履歴を書き換えて戻す操作は危険です。`git reset --hard` は、ユーザーが明示承認した場合にのみ実行してください。

## ブランチを削除してやり直す方法

移行作業ブランチを削除して、タグから新しく作り直します。

```bash
git switch main
git branch -D chore/pm-zero-v9-repo-optimization
git switch -c chore/pm-zero-v9-repo-optimization pre-pm-zero-v9-migration
```

`git branch -D` は対象ブランチの未マージコミットを削除します。必要な差分が残っていないか、先に `git status` と `git log --oneline --decorate -5` で確認してください。

## 変更差分を見る方法

タグから現在の作業ブランチまでの差分を確認します。

```bash
git diff pre-pm-zero-v9-migration..HEAD
git log --oneline --decorate pre-pm-zero-v9-migration..HEAD
git status
```

ファイル単位で確認したい場合は、以下のように対象ファイルを指定します。

```bash
git diff pre-pm-zero-v9-migration..HEAD -- path/to/file
```

## 注意

- `git reset --hard` はユーザーの明示承認なしに実行しないでください。
- `git clean -fd` は実行しないでください。
- `git push --force` は実行しないでください。
- `.env.local` やローカル認証ファイルはコミットしないでください。
