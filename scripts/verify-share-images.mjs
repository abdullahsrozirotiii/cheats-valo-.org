import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveDistDir } from './lib/dist-dir.mjs';

const dist = resolveDistDir();
const missing = [];
const seen = new Set();

function collectUrls(html) {
  const urls = [];
  for (const m of html.matchAll(/property="og:image"\s+content="([^"]+)"/g)) urls.push(m[1]);
  for (const m of html.matchAll(/name="twitter:image"\s+content="([^"]+)"/g)) urls.push(m[1]);
  for (const m of html.matchAll(/"image"\s*:\s*"([^"]+)"/g)) urls.push(m[1]);
  return urls;
}

function distPathFromUrl(url) {
  let pathname;
  try {
    pathname = new URL(url).pathname;
  } catch {
    pathname = url.startsWith('/') ? url : `/${url}`;
  }
  return path.join(dist, pathname.replace(/^\//, '').split('/').join(path.sep));
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      for (const url of collectUrls(html)) {
        if (seen.has(url)) continue;
        seen.add(url);
        if (/\.png(\?|$)/i.test(url)) {
          missing.push({ url, reason: 'bare PNG in social metadata', page: path.relative(dist, full) });
          continue;
        }
        const file = distPathFromUrl(url);
        if (!fs.existsSync(file)) {
          missing.push({ url, reason: 'file missing in dist', page: path.relative(dist, full), file });
        }
      }
    }
  }
}

walk(dist);

if (missing.length === 0) {
  console.log(`OK: ${seen.size} share image URL(s) verified in ${dist}`);
} else {
  console.error(`FAIL: ${missing.length} share image issue(s)`);
  for (const item of missing.slice(0, 40)) console.error(item);
  process.exit(1);
}
