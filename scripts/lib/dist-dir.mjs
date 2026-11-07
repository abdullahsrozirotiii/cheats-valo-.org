import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const distClient = path.join(dist, 'client');

/** @returns {string | null} */
function isStaticRoot(dir) {
  if (!fs.existsSync(dir)) return null;
  const markers = ['sitemap-0.xml', 'index.html', 'sitemap-index.xml'];
  if (markers.some((name) => fs.existsSync(path.join(dir, name)))) return dir;
  return null;
}

/**
 * Astro static → `dist/`. @astrojs/cloudflare adapter → `dist/client/`.
 * @returns {string}
 */
export function resolveDistDir() {
  return (
    isStaticRoot(dist) ??
    isStaticRoot(distClient) ??
    dist
  );
}

export function resolveImagesDir(distDir = resolveDistDir()) {
  return path.join(distDir, 'images');
}
