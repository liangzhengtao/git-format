[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,100:6e40c9&height=200&text=git-format&fontColor=00d4ff&fontSize=55&fontAlignY=35&desc=Conventional%20Commits%2C%20Auto-Formatted&descSize=15&descAlignY=55&descAlign=50&animation=fadeIn" width="100%" />

</div>

<div align="center">

# 🔖 git-format

### `npx git-format` — Conventional commits, zero effort.

**Format git commit messages according to conventional commits. No API key needed.**

[![npm version](https://img.shields.io/npm/v/git-format.svg?style=for-the-badge&logo=npm&color=00d4ff)](https://www.npmjs.com/package/git-format)
[![Downloads](https://img.shields.io/npm/dm/git-format.svg?style=for-the-badge&logo=npm&color=00d4ff)](https://www.npmjs.com/package/git-format)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&color=6e40c9)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/liangzhengtao/git-format?style=for-the-badge&logo=github&color=00d4ff)](https://github.com/liangzhengtao/git-format)

</div>

---

## 📑 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [🔍 What It Does](#-what-it-does)
- [💡 Examples](#-examples)
- [⚙️ Options](#️-options)
- [📊 Type Detection](#-type-detection)
- [🔧 CI Integration](#-ci-integration)
- [🔗 See Also](#-see-also)
- [📄 License](#-license)

---

## 🚀 Quick Start

```bash
# Stage your changes
git add .

# Auto-format and commit
npx git-format

# Or just preview (dry run)
npx git-format --dry-run
```

## 🔍 What It Does

1. Reads your staged files
2. Detects the commit type (feat/fix/docs/test/etc.)
3. Detects the scope from file paths
4. Generates a conventional commit message
5. Commits with the formatted message

## 💡 Examples

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

## ⚙️ Options

```
npx git-format [options]

Options:
  -d, --dry-run   Show message without committing
  -j, --json      Output as JSON
  -q, --quiet     Suppress output
  -h, --help      Display help
  -V, --version   Display version
```

## 📊 Type Detection

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

## 🔧 CI Integration

```yaml
# GitHub Actions
- name: Auto-format commits
  run: |
    git add .
    npx git-format
    git push
```

---

## 🔗 See Also

| Project | Description |
|---------|-------------|
| [**agent-trace**](https://github.com/liangzhengtao/agent-trace) | Visualize and debug AI agent execution traces |
| [**ai-commit**](https://github.com/liangzhengtao/ai-commit) | `npx ai-commit` — AI writes your commit messages |
| [**vibe-check**](https://github.com/liangzhengtao/vibe-check) | `npx vibe-check` — Is your project AI-ready? |
| [**awesome-ai-rules**](https://github.com/liangzhengtao/awesome-ai-rules) | 20 production AI coding rules |

---

## 📄 License

[MIT](LICENSE)

---

<div align="center">

**Found this useful? Give it a ⭐**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,100:6e40c9&height=120&section=footer" width="100%" />

</div>
