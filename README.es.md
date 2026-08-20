[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md)

<div align="center">

<img src=".banner.svg" width="100%" alt="banner">

</div>


# git-format

<div align="center">

**Formatea los mensajes de commit según Conventional Commits. Sin necesidad de clave API.**

[![npm](https://img.shields.io/npm/v/git-format.svg)](https://www.npmjs.com/package/git-format)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## Inicio rápido

```bash
# Añade tus cambios al área de preparación
git add .

# Formateo y commit automáticos
npx git-format

# Solo previsualizar (dry run)
npx git-format --dry-run
```

## Cómo funciona

1. Lee los archivos preparados
2. Detecta el tipo de commit (feat/fix/docs/test, etc.)
3. Determina el alcance a partir de las rutas de archivo
4. Genera un mensaje conforme a Conventional Commits
5. Realiza el commit con el mensaje formateado

## Ejemplos

```bash
# Preparar una nueva funcionalidad
git add src/auth/login.ts
npx git-format
# → feat(auth): add new feature in src/auth/login.ts

# Preparar una corrección de bug
git add src/api/users.ts
git commit -m "fix bug"
npx git-format
# → fix(api): fix issue in src/api/users.ts

# Preparar documentación
git add README.md
npx git-format
# → docs: update documentation
```

## Opciones

```
npx git-format [options]

Options:
  -d, --dry-run    Mostrar mensaje sin hacer commit
  -j, --json       Salida en formato JSON
  -q, --quiet      Suprimir salida
  -h, --help       Mostrar ayuda
  -V, --version    Mostrar versión
```

## Detección de tipo

| Patrón | Tipo |
|---------|------|
| `*.test.ts`, `*.spec.ts` | `test` |
| `*.md`, `*.txt` | `docs` |
| `*.css`, `*.scss` | `style` |
| `package.json` | `chore` |
| `.github/*` | `ci` |
| `Dockerfile` | `build` |
| El diff contiene "fix", "bug" | `fix` |
| El diff contiene "add", "new" | `feat` |
| Por defecto | `refactor` |

## Integración CI

```yaml
# GitHub Actions
- name: Auto-format commits
  run: |
    git add .
    npx git-format
    git push
```

## Licencia

[MIT](LICENSE)
