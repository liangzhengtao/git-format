#!/usr/bin/env node

'use strict';

const { execSync } = require('child_process');
let chalk;
try { chalk = require('chalk'); } catch { chalk = { green: s => s, red: s => s, yellow: s => s, gray: s => s, bold: s => s, cyan: s => s }; }

const TYPES = {
  feat: { emoji: '✨', label: 'Feature' },
  fix: { emoji: '🐛', label: 'Fix' },
  docs: { emoji: '📝', label: 'Docs' },
  style: { emoji: '💄', label: 'Style' },
  refactor: { emoji: '♻️', label: 'Refactor' },
  perf: { emoji: '⚡', label: 'Perf' },
  test: { emoji: '✅', label: 'Test' },
  chore: { emoji: '🔧', label: 'Chore' },
  ci: { emoji: '👷', label: 'CI' },
  build: { emoji: '📦', label: 'Build' },
};

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
    return output.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

function getStagedDiff() {
  try {
    return execSync('git diff --cached', { encoding: 'utf-8' });
  } catch {
    return '';
  }
}

function detectType(files, diff) {
  const fileNames = files.join(' ').toLowerCase();
  const diffLower = diff.toLowerCase();

  if (fileNames.match(/\.(test|spec)\./)) return 'test';
  if (fileNames.match(/\.(md|txt|rst)$/)) return 'docs';
  if (fileNames.match(/\.(css|scss|less|styl)$/)) return 'style';
  if (fileNames.match(/package\.json/) && !fileNames.match(/\.(ts|js|tsx|jsx)$/)) return 'chore';
  if (fileNames.match(/\.github\//)) return 'ci';
  if (fileNames.match(/dockerfile|docker-compose/)) return 'build';
  if (diffLower.match(/fix|bug|error|issue|resolve/)) return 'fix';
  if (diffLower.match(/add|new|create|implement/)) return 'feat';
  if (diffLower.match(/refactor|restructure|reorganize/)) return 'refactor';
  if (diffLower.match(/optimize|performance|speed|fast/)) return 'perf';

  return 'refactor';
}

function detectScope(files) {
  if (files.length === 0) return null;

  const dirs = files.map(f => {
    const parts = f.split('/');
    return parts.length > 1 ? parts[0] : null;
  }).filter(Boolean);

  if (dirs.length === 0) return null;

  const unique = [...new Set(dirs)];
  if (unique.length === 1) return unique[0];

  return null;
}

function generateMessage(type, scope, files) {
  const typeInfo = TYPES[type] || TYPES.refactor;
  const fileCount = files.length;
  const fileList = files.slice(0, 3).join(', ');
  const more = fileCount > 3 ? ` and ${fileCount - 3} more` : '';

  let description = '';
  if (type === 'feat') description = `add new feature in ${fileList}${more}`;
  else if (type === 'fix') description = `fix issue in ${fileList}${more}`;
  else if (type === 'docs') description = `update documentation`;
  else if (type === 'test') description = `update tests`;
  else if (type === 'style') description = `update styles`;
  else if (type === 'chore') description = `update dependencies`;
  else if (type === 'ci') description = `update CI configuration`;
  else if (type === 'build') description = `update build configuration`;
  else description = `update ${fileList}${more}`;

  let message = type;
  if (scope) message += `(${scope})`;
  message += `: ${description}`;

  return message;
}

function formatOutput(message, files, type) {
  const typeInfo = TYPES[type] || TYPES.refactor;

  console.log('');
  console.log(chalk.bold('  📝 Suggested Commit Message'));
  console.log(chalk.gray('  ─────────────────────────────────'));
  console.log('');
  console.log(chalk.green(`  ${typeInfo.emoji} ${message}`));
  console.log('');
  console.log(chalk.gray('  Files changed:'));
  files.forEach(f => console.log(chalk.gray(`    ~ ${f}`)));
  console.log('');
}

// Main
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || args.includes('-d');
const isJson = args.includes('--json') || args.includes('-j');
const isQuiet = args.includes('--quiet') || args.includes('-q');

const files = getStagedFiles();
if (files.length === 0) {
  if (!isQuiet) console.log(chalk.yellow('  No staged changes found.'));
  process.exit(0);
}

const diff = getStagedDiff();
const type = args.find(a => TYPES[a]) || detectType(files, diff);
const scope = detectScope(files);
const message = generateMessage(type, scope, files);

if (isJson) {
  console.log(JSON.stringify({ type, scope, message, files }, null, 2));
} else if (!isQuiet) {
  formatOutput(message, files, type);
}

if (isDryRun) {
  if (!isQuiet) console.log(chalk.gray('  (dry run — not committed)'));
  process.exit(0);
}

// Auto-commit
try {
  execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
} catch (err) {
  console.error(chalk.red('  Commit failed'));
  process.exit(1);
}
