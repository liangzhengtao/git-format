[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

<div align="center">

<img src=".banner.svg" width="100%" alt="banner">

</div>


# git-format

<div align="center">

**Formate mensagens de commit do git de acordo com conventional commits. Sem necessidade de chave de API.**

[![npm](https://img.shields.io/npm/v/git-format.svg)](https://www.npmjs.com/package/git-format)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## Início Rápido

```bash
# Stage your changes
git add .

# Auto-format and commit
npx git-format

# Or just preview (dry run)
npx git-format --dry-run
```

## O que ele faz

1. Lê seus arquivos staged
2. Detecta o tipo de commit (feat/fix/docs/test/etc.)
3. Detecta o escopo a partir dos caminhos dos arquivos
4. Gera uma mensagem de commit convencional
5. Realiza o commit com a mensagem formatada

## Exemplos

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

## Opções

```
npx git-format [options]

Options:
  -d, --dry-run    Show message without committing
  -j, --json       Output as JSON
  -q, --quiet      Suppress output
  -h, --help       Display help
  -V, --version    Display version
```

## Detecção de Tipo

| Padrão | Tipo |
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

## Integração com CI

```yaml
# GitHub Actions
- name: Auto-format commits
  run: |
    git add .
    npx git-format
    git push
```

## Licença

[MIT](LICENSE)
