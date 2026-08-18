const assert = require('assert');

// Import functions from CLI
const { execSync } = require('child_process');

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
  const fileList = files.slice(0, 3).join(', ');
  const more = files.length > 3 ? ` and ${files.length - 3} more` : '';

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

// Tests
async function runTests() {
  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try { fn(); console.log(`  ✓ ${name}`); passed++; }
    catch (error) { console.log(`  ✗ ${name}\n    ${error.message}`); failed++; }
  }

  console.log('\n🧪 Running git-format tests...\n');

  // detectType tests
  console.log('📋 Type Detection:');
  test('detects test files', () => {
    assert.strictEqual(detectType(['src/app.test.ts'], ''), 'test');
  });
  test('detects docs files', () => {
    assert.strictEqual(detectType(['README.md'], ''), 'docs');
  });
  test('detects style files', () => {
    assert.strictEqual(detectType(['src/styles.css'], ''), 'style');
  });
  test('detects CI files', () => {
    assert.strictEqual(detectType(['.github/workflows/ci.yml'], ''), 'ci');
  });
  test('detects fix from diff', () => {
    assert.strictEqual(detectType(['src/app.ts'], 'fix: bug in login'), 'fix');
  });
  test('detects feat from diff', () => {
    assert.strictEqual(detectType(['src/app.ts'], 'add new feature'), 'feat');
  });
  test('defaults to refactor', () => {
    assert.strictEqual(detectType(['src/app.ts'], 'update code'), 'refactor');
  });

  // detectScope tests
  console.log('\n📋 Scope Detection:');
  test('detects common directory', () => {
    assert.strictEqual(detectScope(['src/app.ts', 'src/utils.ts']), 'src');
  });
  test('returns null for mixed directories', () => {
    assert.strictEqual(detectScope(['src/app.ts', 'lib/utils.ts']), null);
  });
  test('returns null for empty files', () => {
    assert.strictEqual(detectScope([]), null);
  });

  // generateMessage tests
  console.log('\n📋 Message Generation:');
  test('generates feat message', () => {
    const msg = generateMessage('feat', 'auth', ['src/login.ts']);
    assert.strictEqual(msg, 'feat(auth): add new feature in src/login.ts');
  });
  test('generates fix message without scope', () => {
    const msg = generateMessage('fix', null, ['src/app.ts']);
    assert.strictEqual(msg, 'fix: fix issue in src/app.ts');
  });
  test('generates docs message', () => {
    const msg = generateMessage('docs', null, ['README.md']);
    assert.strictEqual(msg, 'docs: update documentation');
  });
  test('generates message with multiple files', () => {
    const msg = generateMessage('feat', null, ['a.ts', 'b.ts', 'c.ts', 'd.ts', 'e.ts']);
    assert(msg.includes('more'));
  });

  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 Results: ${passed} passed, ${failed} failed`);
  console.log(`${'='.repeat(50)}\n`);

  if (failed > 0) process.exit(1);
}

runTests();
