/**
 * Fails the build on unbalanced braces in any stylesheet.
 *
 * A stray `{` does not stop the CSS bundling — the parser simply nests every
 * following rule inside the unterminated block. When that block is a media
 * query, the whole site silently loses its styling outside that breakpoint,
 * while looking perfectly fine inside it. That shipped once; this stops it
 * happening again.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src';

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : full.endsWith('.css') ? [full] : [];
  });
}

/** Counts braces, ignoring any inside comments or quoted strings. */
function balance(css) {
  let depth = 0;
  let min = 0;
  let inComment = false;
  let quote = null;

  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    const next = css[i + 1];

    if (inComment) {
      if (c === '*' && next === '/') {
        inComment = false;
        i++;
      }
      continue;
    }
    if (quote) {
      if (c === '\\') i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '/' && next === '*') {
      inComment = true;
      i++;
      continue;
    }
    if (c === '"' || c === "'") {
      quote = c;
      continue;
    }
    if (c === '{') depth++;
    if (c === '}') {
      depth--;
      min = Math.min(min, depth);
    }
  }
  return { depth, min };
}

const problems = [];
for (const file of walk(ROOT)) {
  const { depth, min } = balance(readFileSync(file, 'utf8'));
  if (depth !== 0) problems.push(`${file}: ${depth > 0 ? `${depth} unclosed "{"` : `${-depth} extra "}"`}`);
  else if (min < 0) problems.push(`${file}: a "}" appears before its "{"`);
}

if (problems.length) {
  console.error('\nUnbalanced CSS — this would silently nest later rules:\n');
  problems.forEach((p) => console.error('  ' + p));
  console.error('');
  process.exit(1);
}

console.log('css: braces balanced');
