[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

# git-format

<div align="center">

**格式化 git commit message，遵循 conventional commits 规范。无需 API key。**

[![npm](https://img.shields.io/npm/v/git-format.svg)](https://www.npmjs.com/package/git-format)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

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

## 示例

```bash
# 暂存新功能
git add src/auth/login.ts
npx git-format
# → feat(auth): add new feature in src/auth/login.ts

# 暂存 bug 修复
git add src/api/users.ts
git commit -m "fix bug"
npx git-format
# → fix(api): fix issue in src/api/users.ts

# 暂存文档
git add README.md
npx git-format
# → docs: update documentation
```

## 选项

```
npx git-format [options]

Options:
  -d, --dry-run    显示消息但不提交
  -j, --json       输出为 JSON 格式
  -q, --quiet      静默模式
  -h, --help       显示帮助
  -V, --version    显示版本
```

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

## CI 集成

```yaml
# GitHub Actions
- name: Auto-format commits
  run: |
    git add .
    npx git-format
    git push
```

## 许可证

[MIT](LICENSE)
