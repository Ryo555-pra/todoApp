# Contributing Guide

ご協力ありがとうございます！本プロジェクトへの貢献は、Issue 登録・議論・ドキュメント修正・コード変更など、あらゆる形を歓迎します。

## コミュニケーション

- 行動規範: [CODE_OF_CONDUCT](./.github/CODE_OF_CONDUCT.md)
- セキュリティ報告: 重大な脆弱性は **公開 Issue ではなく** メールで **<連絡先メール>** へ

## ブランチ運用

- 既定ブランチ: `develop`
- 派生ブランチ: `feature/<topic>` / `fix/<topic>` / `chore/<topic>`
- リリース: `main` にマージし、タグ `vX.Y.Z` を付与（SemVer）

## Issue

- 種別: `bug`, `feature`, `docs`, `security`, `refactor`, `test`
- 再現手順 / 期待結果 / 実結果 / 画面・ログ の添付を推奨

## コミット規約（Conventional Commits）

### type（種類）

- feat: 新機能
- fix: バグ修正
- docs: ドキュメントのみの変更
- style: フォーマットやセミコロンなど（コードの意味を変えない）
- refactor: リファクタリング
- perf: パフォーマンス改善
- test: テスト追加・修正
- build: ビルド関連の変更
- ci: CI 設定・スクリプトの変更
- chore: その他の雑多な変更

### scope（範囲）

- 変更対象のモジュールやコンポーネント名を記載（例: server, client, db, ui）

### subject（概要）

- 簡潔に変更内容を記述（終止符なし、命令形）

### 例

```
feat(server): add /tasks pagination
fix(client): correct task completion toggle
docs(readme): update setup instructions
```

## Pull Request

- PR テンプレート: `.github/pull_request_template.md` に従う
- 小さく、レビューしやすく
- CI（ビルド・Lint・テスト）を **Green** に
- スクリーンショット/動画（UI 変更時）
- 破壊的変更は **CHANGELOG.md** に追記

## セットアップ

- JDK 21 / Node 20+ / pnpm / Docker を想定
- ルート `.env.example` をコピーして `.env` を作成
- server 用の `application.yml` は Profile ごとに配置

### サーバ（Spring Boot）

```bash
# 依存取得・ビルド
./gradlew clean build

# 単体テスト
./gradlew test



# ローカル起動（dev profile）


./gradlew bootRun --args='--spring.profiles.active=dev'

```

### クライアント（React + Vite + TS）

```bash
pnpm install
pnpm run lint
pnpm run test
pnpm run dev
```

### コンテナ（開発）

```bash

docker compose -f deploy/docker-compose.yml up --build

```

## コード規約

- Java: Google Java Style 準拠（spotless/checkstyle で検査）

- TypeScript: ESLint + Prettier（警告ゼロを目標）

- 例外は PR で根拠と共に提案

## テスト方針

- サーバ: JUnit + SpringBootTest + Testcontainers(PostgreSQL)

  - 公開 API は Contract（OpenAPI）に準拠

- クライアント: Vitest + Testing Library
  - ユーザ操作のシナリオテストを重視

## ドキュメント

- 仕様は docs/ に配置。API は OpenAPI（自動生成）を原本とする

- ER 図・アーキテクチャ図は PR で更新

## ライセンス

- すべての貢献は Apache-2.0 の下で提供されます

### 置き場所のまとめ

- `LICENSE` … **リポジトリ直下**
- `CODE_OF_CONDUCT.md` … **`.github/` 配下推奨**（直下でも可）
- `CONTRIBUTING.md` … **リポジトリ直下**

### 次の一歩（任意）

- `CODEOWNERS` と `workflows/ci.yml` を続けて入れると、**PR レビュー体制と品質自動チェック**がすぐ回り始めます。必要なら雛形をお出しします。

### 差し替えが必要なプレースホルダ：

- `<連絡先メール>`：通報/問い合わせ窓口
- `Copyright [yyyy] [name of copyright owner]`
