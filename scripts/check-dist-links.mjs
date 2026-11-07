import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const broken = [];

function resolveHref(href) {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return null;
  if (href.startsWith('/go/')) return null;
  let p = href.split('?')[0].split('#')[0];
  if (!p.startsWith('/')) return null;
  if (!p.endsWith('/') && !/\.[a-z0-9]+$/i.test(p)) p = `${p}/`;
  const file = p === '/' ? path.join(dist, 'index.html') : path.join(dist, p, 'index.html');
  if (fs.existsSync(file)) return null;
  const alt = path.join(dist, p.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
  if (fs.existsSync(alt)) return null;
  return file;
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      const refs = [...html.matchAll(/href="(\/[^"]+)"/g)].map((m) => m[1]);
      for (const href of refs) {
        const miss = resolveHref(href);
        if (miss) broken.push({ page: path.relative(dist, full), href, expected: miss });
      }
    }
  }
}

walk(dist);
if (broken.length === 0) {
  console.log('OK: no broken internal root-relative links in dist HTML');
} else {
  console.log('BROKEN', broken.length);
  for (const b of broken.slice(0, 30)) console.log(b.page, '->', b.href);
  process.exit(1);
}
