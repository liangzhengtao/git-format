[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

<div align="center">

<img src=".banner.svg" width="100%" alt="banner">

</div>


# git-format

<div align="center">

**Formatez vos messages de commit selon les Conventional Commits. Aucune clé API requise.**

[![npm](https://img.shields.io/npm/v/git-format.svg)](https://www.npmjs.com/package/git-format)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## Démarrage rapide

```bash
# Indexez vos modifications
git add .

# Formatage et commit automatiques
npx git-format

# Aperçu uniquement (dry run)
npx git-format --dry-run
```

## Fonctionnement

1. Lit les fichiers indexés
2. Détecte le type de commit (feat/fix/docs/test, etc.)
3. Détermine le périmètre à partir des chemins de fichiers
4. Génère un message conforme aux Conventional Commits
5. Effectue le commit avec le message formaté

## Exemples

```bash
# Indexer une nouvelle fonctionnalité
git add src/auth/login.ts
npx git-format
# → feat(auth): add new feature in src/auth/login.ts

# Indexer une correction de bug
git add src/api/users.ts
git commit -m "fix bug"
npx git-format
# → fix(api): fix issue in src/api/users.ts

# Indexer de la documentation
git add README.md
npx git-format
# → docs: update documentation
```

## Options

```
npx git-format [options]

Options:
  -d, --dry-run    Afficher le message sans effectuer de commit
  -j, --json       Sortie au format JSON
  -q, --quiet      Supprimer la sortie
  -h, --help       Afficher l'aide
  -V, --version    Afficher la version
```

## Détection de type

| Motif | Type |
|---------|------|
| `*.test.ts`, `*.spec.ts` | `test` |
| `*.md`, `*.txt` | `docs` |
| `*.css`, `*.scss` | `style` |
| `package.json` | `chore` |
| `.github/*` | `ci` |
| `Dockerfile` | `build` |
| Le diff contient "fix", "bug" | `fix` |
| Le diff contient "add", "new" | `feat` |
| Par défaut | `refactor` |

## Intégration CI

```yaml
# GitHub Actions
- name: Auto-format commits
  run: |
    git add .
    npx git-format
    git push
```

## Licence

[MIT](LICENSE)
