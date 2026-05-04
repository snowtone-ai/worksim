# Decisions — 設計判断の永続記録

このファイルは確定した設計判断のログ。覆さない決定だけを書く。
Claude Code はこれを参照し、過去の判断と矛盾する実装をしない。

---

## D-001：技術スタック

**判断**：Next.js 15 系（App Router）+ TypeScript strict + Tailwind v4 + Supabase + Vercel + pnpm

**理由**：
- Vercel デプロイで Next.js が最も最適化されている
- Supabase は無料枠で 50K MAU まで使える
- 全部無料で同時接続100まで対応可能
- 非エンジニアの可読性確保のため、エコシステムが大きい技術を選択

**代替案と却下理由**：
- Phaser：ゲームエンジンの学習コストが追加で発生。React 単体で実現可能
- Three.js：3D モデリング工数が予算に合わない
- Firebase：Postgres ベースで馴染みのある SQL を選びたかった

---

## D-002：認証方式

**判断**：Google OAuth のみ（Supabase Auth 経由）

**理由**：
- 就活生は Google アカウントを必ず持っている
- パスワード管理を実装しないことでセキュリティリスク低減
- Supabase が SSR 対応の OAuth フローを公式提供

**却下した代替案**：
- メール+パスワード：実装コスト・セキュリティ責任が増える
- 大学メール限定：大学ごとの設定が必要、初期摩擦が大きい
- Magic Link：MVP では不要

---

## D-003：個人情報の扱い

**判断**：profiles テーブルに大学・学部・志望業界のみ。個人名・メールは保存しない

**理由**：
- 大学への営業時に「個人を特定しない設計です」と説明できる
- Google から提供される名前は auth.users にだけ存在し、アプリで参照しない
- 個人情報削除リクエストへの対応コストを最小化
- 万が一漏洩しても被害を最小化

**実装制約**：
- profiles テーブルに `name`、`email` カラムを作らない
- UI で「ようこそ◯◯さん」のような表示をしない

---

## D-004：プロダクト形式

**判断**：2D シーンベース + Pure React UI（Phaser 不使用）

**理由**：
- 非エンジニア + Claude Code で実装可能な複雑度
- React 単一スタックで保守性が高い
- 「オブジェクトをクリックしてタスク開始」は React で完全に実現可能
- A → B（Phaser）への将来移行も、コアロジックを React で書いておけば可能

---

## D-005：開発戦略

**判断**：1職種完全版 → ワークフロー確立 → 残5職種展開

**理由**：
- バイブコーディングで最も多い失敗が「全機能を並行で薄く実装→修正不能」
- 1職種で完成基準を確立すれば、残りは同じ手順を繰り返すだけ
- リサーチ → JSON 生成 → 実装 のワークフローを `_research-plan.md` に文書化

**1職種目**：Webエンジニア（Claude Code とユーザー双方が業務イメージしやすいため）

---

## D-006：シナリオ構造

**判断**：シナリオ＞タスク＞NPC台詞＆作業案内テキストの3階層

**理由**：
- ユーザー提案
- JSON で表現しやすい
- 企業向けカスタムフォーマット時に同じ構造を流用できる

---

## D-007：シナリオ分岐

**判断**：MVP では分岐なし。選択肢は適性スコアと特性タグにのみ影響

**理由**：
- 分岐ロジックは複雑性を爆発させる
- MVP 検証時点では「業務イメージが湧くか」が重要で、分岐は副次的
- ユーザーが MVP 体験後に分岐の必要性を判断する

---

## D-008：適性スコア表示

**判断**：A（職種別スコア）+ C（特性タグ）の組み合わせ

**理由**：
- スコアだけだと味気ない
- タグだけだと比較できない
- B（複数職種比較）は MVP 外（プレイ複数回が前提のため）

---

## D-009：対応端末

**判断**：MVP は PC Web のみ

**理由**：
- 体験品質を最優先
- スマホ対応で工数が2〜3倍になる
- 大学キャリアセンター・PC室での利用を想定

**将来計画**：MVP 検証後、必要ならレスポンシブ追加

---

## D-010：同時接続

**判断**：MVP 100、将来 1000

**理由**：
- 大分大学1校テスト時は100で十分
- Supabase Free + Vercel Hobby で月$0
- 1000は Supabase Pro + Vercel Pro で月約$45 → 大学導入後の収益化と同時に移行

---

## D-011：Supabase 自動停止対策

**判断**：GitHub Actions で5日に1回 keep-alive クエリを実行

**理由**：
- Supabase Free は7日無アクティブで自動停止
- MVP 段階の使用頻度低下に備えて pre-emptive に対策

---

## D-012：プロダクト名

**判断**：WorkSim（ワークシム）

**理由**：
- ユーザー選択
- シミュレーション感が出る
- ドメインも取得可能性が高い

---

## D-013：Claude Code モデル選択

**判断**：実装は Sonnet 4.6 デフォルト、解決困難なエラーのみ Opus 4.7

**理由**：
- Sonnet 4.6 がコーディングのデフォルトとして公式推奨
- Opus はトークン消費が大きい、用途を絞ってトークン経済を最適化
- pm-zero v8.0 のサブエージェント設計と一致

---

## D-014：没入モードの会話系画面レイアウト

**判断**：会話本文と選択肢は同一の縦フローに置き、画面全体を自然にスクロールさせる。選択肢パネルの固定フッタ化はしない。

**理由**：
- 長文シーンで本文・選択肢・確認ボタンを固定高さに押し込むと、下端クリップやタスクバー干渉が起きやすい
- 「本文だけスクロール」「選択肢だけ固定」は、読書フローと操作フローが分離して違和感が出る
- シナリオ体験では、会話を読み切ってそのまま選択肢へ降りる流れの方が自然
- Windows タスクバーや将来のモバイル safe area に対しても、ページ末尾余白で吸収する方が単純で壊れにくい

**実装制約**：
- `DialogueScene` は独立したスクロール面として実装する
- 会話パネルと選択肢パネルを同一縦フローに置く
- 下端には `env(safe-area-inset-bottom)` を考慮した余白を確保する
- 主要 CTA を viewport の最下端に直接貼り付ける設計は避ける

**却下した代替案**：
- 選択肢パネルのみ sticky 固定：本文との分断感が強く、読み終わり位置との関係が不自然
- 会話パネル内だけをスクロール：実機によっては選択肢が押し出され、画面全体の把握もしにくい
- 演出オブジェクトを左右常設：余白を圧迫してレイアウト不安定要因になる

---

## D-015：品質ゲートの維持方針（2026-05-04）

**判断**：
- Next.js 16 では request guard のファイル規約を `middleware.ts` ではなく `proxy.ts` に統一する
- Vitest は重い UI テストより先に、スコア計算・シナリオローダーの純粋ロジックを常時検証対象にする

**理由**：
- deprecated 警告を放置すると将来のフレームワーク更新時に破壊的変更へ直結する
- MVP の品質ゲートでは、認証導線を壊さず最小コストで回帰検知できるテストが優先

---

## D-016：pm-zero v9.0 Repository OS への移行

**日時**：2026-05-04

**判断**：`AGENTS.md` を一次ソースにし、`CLAUDE.md` と `CODEX.md` は adapter として薄く保つ。検証は `pnpm verify` を統一入口にする。

**理由**：
- Codex-first と Claude Code fallback を両立しつつ、ルール重複を減らすため。
- MVP の UI/API/DB 挙動を維持したまま、Reference Gate、Verification Pipeline、Quality Gate を実効化するため。
- package 実態は Next.js 16.2.4 であり、旧ドキュメントの Next.js 15 表記をそのまま一次ソースにしないため。

**参照した実在例**：
- https://nextjs.org/docs/app/getting-started/project-structure
  - 採用する要素：App Router の `app`、`src`、top-level config の責務整理。
  - 避ける要素：Pages Router との混在。
  - WorkSimへの適用判断：既存 `src/app` 構成を維持し、OS docs で責務を明文化する。
  - 将来変更可能性：Next.js の file convention 更新時に `AGENTS.md` と `ARCHITECTURE-RULES.md` を更新する。
- https://nextjs.org/docs/app/api-reference/file-conventions/proxy
  - 採用する要素：Next.js 16 の `proxy.ts` convention。
  - 避ける要素：deprecated `middleware.ts` への逆戻り。
  - WorkSimへの適用判断：既存 `src/proxy.ts` を維持し、認証 guard の主要導線を壊さない。
  - 将来変更可能性：Proxy API 変更時に `src/proxy.ts` と E2E を同時更新する。
- https://supabase.com/docs/guides/auth/server-side
  - 採用する要素：SSR では session を cookies に保存する Supabase Auth 方針。
  - 避ける要素：client localStorage 前提の auth 実装。
  - WorkSimへの適用判断：既存 `src/lib/supabase/server.ts` / `client.ts` の境界を維持する。
  - 将来変更可能性：Supabase SSR helper 更新時に auth callback と proxy を再検証する。
- https://playwright.dev/docs/ci
  - 採用する要素：CI/ローカルで browser install、test 実行、report/trace を確認する検証導線。
  - 避ける要素：手動ブラウザ確認だけを完了条件にする運用。
  - WorkSimへの適用判断：`scripts/verify.mjs` に E2E と browser smoke を組み込む。
  - 将来変更可能性：CI 化時に `.github/workflows` へ同じコマンドを移す。
- https://developers.openai.com/codex/cli/features
  - 採用する要素：interactive `/review` が Codex CLI の review 導線として存在する点。
  - 避ける要素：未確認の `codex-auto-review` 独立コマンド。
  - WorkSimへの適用判断：Phase 8 で `/review` が直接使えない場合は公式 CLI の `codex exec review` を代替する。
  - 将来変更可能性：Codex CLI の review UI 変更時に `CODEX.md` と `REVIEW-GATE.md` を更新する。

**将来の変更可能性**：`docs/design-notes.md#2026-05-04-pm-zero-v90-移行の範囲`

---

## D-017：ultrareview差し戻し修正の範囲

**日時**：2026-05-04

**判断**：pm-zero v9.0差し戻しでは、検証導線と将来シナリオ拡張に影響する小さな不具合だけを修正する。

**理由**：
- `scripts/sync-claude-md.mjs` は `CLAUDE.md` が `AGENTS.md` を参照し続けるための adapter gate なので、`pnpm verify` に含める。
- `scripts/verify.mjs` の browser smoke は production server を起動するため、起動失敗時の調査に使えるよう `logs/verify-app-server.log` に標準出力と標準エラーを保存する。
- 没入モードの会話ヘッダーは現在の block label を表示し、他職種・他会議シナリオ追加時に `Sprint Planning` 固定表示へ戻らないようにする。
- Codex error hook は運用ログ用途のため、`docs/issues.md` に書けない状態でも hook 例外で本処理を落とさない。

**未修正判断**：`.codex/config.toml` の `gpt-5.5` / `gpt-5.4` / `gpt-5.4-mini` はOpenAI公式docsで存在を確認したため、モデル指定は変更しない。

**参照した実在例**：
- https://developers.openai.com/api/docs/models
- https://developers.openai.com/api/docs/models/gpt-5.4
- https://developers.openai.com/api/docs/models/gpt-5.4-mini
