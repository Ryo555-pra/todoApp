# 開発ルール（ドラフト）

## 1) 環境・バージョン

- Node: **LTS**（18 or 20 のどちらかを固定）
- パッケージマネージャ: **pnpm**
- Java: **21**
- Spring Boot: **3.4.4**
- DB: **PostgreSQL 15+**
- これらは `.tool-versions`（asdf）または `.nvmrc`/`.java-version` 等で固定
- OS 差異回避のため **.editorconfig** を採用（改行コード/インデント/末尾改行を統一）

## 2) リポジトリ構成

```
/client  … React(TypeScript)
/server  … Spring Boot(Java 21)
/docs    … 設計・API仕様・ER 図など
```

- 「設計や決定事項」は `/docs` に集約（README は入口）

## 3) ブランチ戦略（軽量 Git-Flow）

- `main`: 常にデプロイ可能のモジュールのみを反映させる
- `develop`: 次リリース候補（ローカル/WSL 動作の基準、**デフォルトブランチに設定を main から変更済み**）
- `feature/*`: 機能開発（例：`feature/calendar-view`）
- `hotfix/*`: 本番障害の緊急修正
- **PR は `feature/*` → `develop`**、リリース時に `develop` → `main` をマージ
- リリースタグ: `vYYYY.MM.DD`（例：`v2025.09.16`）

## 4) コミットメッセージ（Conventional Commits）

- 書式: `type(scope): 要約`
  例:

  - `feat(client): カレンダーに月/週/日切替を追加`
  - `fix(server): CORS 設定の誤りを修正`
  - `chore: 依存関係を更新`

- 主な `type`: `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `chore`
- **英語**。要約は 50 文字程度、本文で背景や影響範囲を簡潔に。

## 5) コードスタイル＆静的解析

### client（React/TS）

- **ESLint** + **Prettier** を必須化
- import 並び順と未使用変数を CI で検出・失敗にする
- TypeScript は **strict** 有効

### server（Spring Boot）

- **Spotless + Google Java Format** or **Checkstyle** を適用
- Null 取り扱い方針（`@Nullable` / `Optional`）を統一

**推奨スクリプト**

- client: `pnpm format`, `pnpm lint`, `pnpm test`
- server: `./mvnw spotless:apply`, `./mvnw verify`

## 6) テスト方針

- 最低ライン：**ユニットテスト必須（新規コードは 60% 以上目安）**
- client: **Vitest + React Testing Library**
- server: **JUnit5 + Spring Test + Testcontainers(PostgreSQL)**
  （DB 結合は Testcontainers を基本に、H2 置換は使わない）
- バグ修正時は **再発防止テスト** を 1 本追加

## 7) DB マイグレーション

- **Flyway** を必須化（`/server/src/main/resources/db/migration`）
- ファイル命名: `V<連番>__<スネークケース説明>.sql`
  例: `V2__add_task_status.sql`
- スキーマ変更は PR 上で ER 図（簡易で可）とセットで提示

## 8) API 設計・バージョニング

- REST ベース、`/api/v1/...` を採用（将来の破壊的変更に備える）
- レスポンスは **DTO** を返す（Entity 直返し禁止）
- ページング・検索のクエリ規約を統一（例：`?page=0&size=20&sort=createdAt,desc`）
- エラーは統一フォーマット：

  ```json
  {
    "timestamp": "...",
    "path": "/api/v1/...",
    "status": 400,
    "code": "VALIDATION_ERROR",
    "message": "..."
  }
  ```

## 9) セキュリティ・秘密情報

- `.env*` / `application-*.yml` の **機微値はコミット禁止**
  （GitHub Secrets / OS 環境変数で供給）
- CORS は **明示許可制**（`http://localhost:5173` など）
- 認証が必要な API は **Spring Security** 前提（JWT なら `/auth` で発行）

## 10) 例外処理・ロギング

- server は `@ControllerAdvice` で例外を集約
- 機微情報をログに出さない（トークン/パスワード/メール等）
- 重要イベントは **構造化ログ**（JSON）に対応できる形で

## 11) CI（GitHub Actions 想定）

- ジョブ構成（最低限）

  1. **Lint & Format**（client/server 両方）
  2. **Test**（client/server）
  3. **Build**（成果物生成）

- main/develop への PR は **CI Green でなければマージ不可**

## 12) PR/レビュー規約

- PR は **小さく早く**（\~400 行目安）。大きい場合は分割
- PR テンプレ（要約 / 変更点 / 動作確認方法 / スクショ / 影響範囲 / リスク）
- レビュー観点：

  - 仕様満たすか・副作用はないか
  - 命名の一貫性・責務の分離（層をまたがない）
  - テスト有無・観点の妥当性

- **セルフレビュー必須**（diff への自己コメント歓迎）

### ※プルリクエストを作成する際は、以下のテンプレートを利用してください。

👉 [Pull Request Template](../.github/pull_request_template.md)

## 13) タスクの完了条件（DoD）

- 動作確認済み（ローカル/WSL）
- Lint/Format/Unit Test パス
- マイグレーション適用/ロールバック手順明記
- ドキュメント（API/README/画面キャプチャ）反映

## 14) 命名・ディレクトリ（抜粋）

- client: `components/`, `pages/`, `hooks/`, `features/`, `lib/`, `types/`
- server: `presentation`(controller), `application`(service/usecase), `domain`(model), `infrastructure`(repository) の **3 層＋ α**
  DTO は `presentation.dto`、Repository は `infrastructure.*`

## 15) スクリプト統一（例）

- client（`package.json`）

  ```json
  {
    "scripts": {
      "dev": "vite",
      "build": "tsc -b && vite build",
      "lint": "eslint . --ext .ts,.tsx",
      "format": "prettier -w .",
      "test": "vitest run"
    }
  }
  ```

- server（`pom.xml` 例の方針）

  - `spotless-plugin` / `maven-surefire-plugin` / `maven-failsafe-plugin` / `flyway-maven-plugin` を導入

## 16) ドキュメント運用

- **決定事項は ADR（Architecture Decision Record）** を `/docs/adr` に 1 枚 1 決定で残す
- API は **OpenAPI(Swagger)** を `/docs/openapi.yaml` に追従
- 画面仕様は **スクショ＋箇条書き** で簡潔に

---

## 付け足すべきか？（結論）

- **付け足すべきです。** 特に短期開発では「環境固定」「コーディング規約」「テスト/CI」「DB マイグレーション」「PR ルール」「DoD」の 6 点が効きます。
- いまの README には「目的/ゴール/技術選定」は十分あります。**上記の「開発ルール」章をそのまま下に追加**すれば、実務上の迷いがほぼ消えます。

必要でしたら、`/.editorconfig`、`client/.eslintrc.json`、`server/pom.xml`（Spotless/Flyway 設定入り）の**雛形ファイル一式**もすぐ用意します。
