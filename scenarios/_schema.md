# Scenario JSON Schema

シナリオ JSON はこのスキーマに準拠する。バリデーションは Zod で実装（`lib/scenario/schema.ts`）。

## 階層構造

```
シナリオ
  └─ タスク[]（時系列順）
       ├─ シーン背景指定
       ├─ 作業案内テキスト
       ├─ NPC台詞（任意）
       ├─ 選択肢[]
       │    └─ aptitude_delta + traits[]
       └─ 完了条件
```

## 完全なスキーマ例

```json
{
  "id": "it/web-engineer",
  "version": 1,
  "industry": "IT",
  "role": "Webエンジニア",
  "role_seniority": "新卒3年目",
  "duration_minutes": 20,
  "company_size_assumption": "中堅IT企業（従業員300〜500名規模）",
  "summary": "Webエンジニアの1日。コードレビュー、機能実装、ペアプロ、定例MTG等を体験する。",
  "sources": [
    {
      "title": "厚生労働省 job tag - Webエンジニア",
      "url": "https://shigoto.mhlw.go.jp/...",
      "accessed_at": "2026-05-XX"
    },
    {
      "title": "Wantedly Story: ◯◯社のWebエンジニア新卒3年目",
      "url": "https://...",
      "accessed_at": "2026-05-XX"
    }
  ],
  "tasks": [
    {
      "id": "task-001",
      "order": 1,
      "time_label": "9:00",
      "title": "出社・メールチェック",
      "scene": "office-desk",
      "instructions": "メールを確認し、必要なものに返信してください。",
      "ui_component": "EmailInbox",
      "ui_props": {
        "emails": [
          {
            "id": "m1",
            "from": "リーダー田中",
            "subject": "今日のペアプロ予定",
            "body": "10時から会議室Aでペアプロ予定。準備お願いします。",
            "requires_reply": false
          },
          {
            "id": "m2",
            "from": "PdM 佐藤",
            "subject": "機能Xの仕様確認",
            "body": "...",
            "requires_reply": true,
            "reply_choices": [
              {
                "id": "c1",
                "text": "承知しました。本日中に確認します。",
                "aptitude_delta": { "engineer": 3 },
                "traits": ["責任感"]
              },
              {
                "id": "c2",
                "text": "確認してから具体的に回答します。質問項目を整理させてください。",
                "aptitude_delta": { "engineer": 5, "consultant": 3 },
                "traits": ["論理思考"]
              }
            ]
          }
        ]
      },
      "completion_condition": "all_emails_handled"
    },
    {
      "id": "task-002",
      "order": 2,
      "time_label": "10:00",
      "title": "ペアプログラミング",
      "scene": "meeting-room",
      "instructions": "リーダーと一緒にバグの原因を調査します。",
      "ui_component": "PairProgramming",
      "ui_props": {
        "scenario": "ログイン処理が稀に失敗するバグ。スタックトレースは ...",
        "decision_points": [
          {
            "id": "dp1",
            "question": "どこから調査しますか？",
            "choices": [
              {
                "id": "c1",
                "text": "先輩に質問する",
                "aptitude_delta": { "engineer": 2, "consultant": 4 },
                "traits": ["協調型"]
              },
              {
                "id": "c2",
                "text": "ログから自分で調査する",
                "aptitude_delta": { "engineer": 5, "infra": 4 },
                "traits": ["自己解決型", "コツコツ型"]
              },
              {
                "id": "c3",
                "text": "再現条件をまず確認する",
                "aptitude_delta": { "engineer": 6, "pdm": 3 },
                "traits": ["論理思考", "根本原因思考"]
              }
            ]
          }
        ]
      },
      "completion_condition": "all_decisions_made"
    }
    // ... 5〜8タスク程度を想定
  ],
  "scoring": {
    "max_score_per_role": 100,
    "primary_role": "engineer",
    "trait_aggregation": "frequency_top_3"
  }
}
```

## 必須フィールド

- `id`：`<industry>/<role-slug>` 形式
- `version`：スキーマバージョン（1 から開始）
- `industry`、`role`、`role_seniority`
- `duration_minutes`：目安。実際のプレイ時間は選択肢の長さで前後
- `summary`：体験開始前にユーザーに見せる説明
- `sources[]`：**必須**。最低3つの出典を含める。出典なしのシナリオは PR レビューで弾く
- `tasks[]`：時系列順、最低5個・最大10個
- `scoring`：スコア計算ルール

## タスク定義

### `scene`
- `office-desk`：自分のデスク
- `meeting-room`：会議室
- `client-office`：クライアント先（営業向け）
- `outdoor`：移動・外出
- `lounge`：休憩室・ラウンジ
- `whiteboard`：ホワイトボード前

新規シーンを追加する場合は `public/backgrounds/` に背景画像を配置し、ここにエントリを追加する。

### `ui_component`
- `EmailInbox`：メール一覧 + 返信
- `PairProgramming`：コードレビュー・ペアプロ画面
- `MeetingRoom`：会議参加（NPC発言 + 選択肢）
- `Spreadsheet`：データ入力・確認
- `Document`：資料作成・閲覧
- `Slideshow`：プレゼン・スライド操作
- `PhoneCall`：電話応対
- `Memo`：メモ・日報

新規 UI コンポーネントを追加する場合は `features/play/tasks/` に React コンポーネントを実装する。

### `aptitude_delta`
キーは職種スラグ。`engineer`、`consultant`、`sales`、`pdm`、`infra`、`designer`。
値は -10 〜 +10 の整数（負値も許容、非適性表現用）。

### `traits`
特性タグの文字列配列。重複しないユニークな日本語タグ。
代表例：`コツコツ型`、`論理思考`、`協調型`、`自己解決型`、`責任感`、`根本原因思考`、`スピード重視`、`品質重視`、`対人重視`、`数値重視`

タグの追加は `lib/scoring/traits.ts` のマスターリストに登録してから使う。

## バリデーションエラー時の挙動

- 起動時：全シナリオを Zod バリデーション → エラーがあれば起動失敗（fail fast）
- ランタイム：個別シナリオロード時に再バリデーション
- ユーザーには「シナリオファイルが壊れています」と表示し、トップに戻す

## バージョニング

`version` フィールドの整数を上げる時：
- 既存シナリオの破壊的変更は禁止
- 旧 version のシナリオは loader でアダプターを通して新形式に変換、または併存
