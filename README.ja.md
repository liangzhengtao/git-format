[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md)

<div align="center">

<img src=".banner.svg" width="100%" alt="banner">

</div>


# git-format

<div align="center">

**Conventional Commits 準拠の git コミットメッセージを自動生成。API キーは不要です。**

[![npm](https://img.shields.io/npm/v/git-format.svg)](https://www.npmjs.com/package/git-format)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## クイックスタート

```bash
# 変更をステージング
git add .

# 自動フォーマット＆コミット
npx git-format

# プレビューのみ（dry run）
npx git-format --dry-run
```

## 仕組み

1. ステージングされたファイルを読み取る
2. コミットタイプを検出（feat/fix/docs/test など）
3. ファイルパスからスコープを判定
4. Conventional Commits 形式のメッセージを生成
5. フォーマット済みメッセージでコミット

## 使用例

```bash
# 新機能をステージング
git add src/auth/login.ts
npx git-format
# → feat(auth): add new feature in src/auth/login.ts

# バグ修正をステージング
git add src/api/users.ts
git commit -m "fix bug"
npx git-format
# → fix(api): fix issue in src/api/users.ts

# ドキュメントをステージング
git add README.md
npx git-format
# → docs: update documentation
```

## オプション

```
npx git-format [options]

Options:
  -d, --dry-run    コミットせずにメッセージを表示
  -j, --json       JSON 形式で出力
  -q, --quiet      出力を抑制
  -h, --help       ヘルプを表示
  -V, --version    バージョンを表示
```

## タイプ検出ルール

| パターン | タイプ |
|---------|------|
| `*.test.ts`, `*.spec.ts` | `test` |
| `*.md`, `*.txt` | `docs` |
| `*.css`, `*.scss` | `style` |
| `package.json` | `chore` |
| `.github/*` | `ci` |
| `Dockerfile` | `build` |
| diff に "fix", "bug" を含む | `fix` |
| diff に "add", "new" を含む | `feat` |
| デフォルト | `refactor` |

## CI 統合

```yaml
# GitHub Actions
- name: Auto-format commits
  run: |
    git add .
    npx git-format
    git push
```

## ライセンス

[MIT](LICENSE)
