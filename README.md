# git-format

<div align="center">

**Format git commit messages according to conventional commits. No API key needed.**

[![npm](https://img.shields.io/npm/v/git-format.svg)](https://www.npmjs.com/package/git-format)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## Quick Start

```bash
# Stage your changes
git add .

# Auto-format and commit
npx git-format

# Or just preview (dry run)
npx git-format --dry-run
```

## What It Does

1. Reads your staged files
2. Detects the commit type (feat/fix/docs/test/etc.)
3. Detects the scope from file paths
4. Generates a conventional commit message
5. Commits with the formatted message

## Examples

```bash
# Stage a new feature
git add src/auth/login.ts
npx git-format
# → feat(auth): add new feature in src/auth/login.ts

# Stage a bug fix
git add src/api/users.ts
git commit -m "fix bug"
npx git-format
# → fix(api): fix issue in src/api/users.ts

# Stage documentation
git add README.md
npx git-format
# → docs: update documentation
```

## Options

```
npx git-format [options]

Options:
  -d, --dry-run    Show message without committing
  -j, --json       Output as JSON
  -q, --quiet      Suppress output
  -h, --help       Display help
  -V, --version    Display version
```

## Type Detection

| Pattern | Type |
|---------|------|
| `*.test.ts`, `*.spec.ts` | `test` |
| `*.md`, `*.txt` | `docs` |
| `*.css`, `*.scss` | `style` |
| `package.json` | `chore` |
| `.github/*` | `ci` |
| `Dockerfile` | `build` |
| Diff contains "fix", "bug" | `fix` |
| Diff contains "add", "new" | `feat` |
| Default | `refactor` |

## CI Integration

```yaml
# GitHub Actions
- name: Auto-format commits
  run: |
    git add .
    npx git-format
    git push
```

---

## 中文版本

# git-format

**格式化 git commit message，遵循 conventional commits 规范。无需 API key。**

## 快速开始

```bash
# 暂存更改
git add .

# 自动格式化并提交
npx git-format

# 或者只预览（dry run）
npx git-format --dry-run
```

## 功能

1. 读取暂存的文件
2. 检测提交类型（feat/fix/docs/test 等）
3. 从文件路径检测作用域
4. 生成规范的 commit message
5. 使用格式化的消息提交

## 类型检测

| 文件模式 | 类型 |
|---------|------|
| `*.test.ts`, `*.spec.ts` | `test` |
| `*.md`, `*.txt` | `docs` |
| `*.css`, `*.scss` | `style` |
| `package.json` | `chore` |
| `.github/*` | `ci` |
| `Dockerfile` | `build` |
| diff 包含 "fix", "bug" | `fix` |
| diff 包含 "add", "new" | `feat` |
| 默认 | `refactor` |

## 许可证

[MIT](LICENSE)
