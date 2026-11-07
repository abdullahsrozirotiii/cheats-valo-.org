import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const source = path.join(publicDir, 'LOGO-cropped.webp');

/** Match BrandLogo.astro img: object-fit cover + scale(1.22). */
const NAVBAR_ZOOM = 1.22;

async function navbarSquarePng(size) {
  const inner = Math.round(size * NAVBAR_ZOOM);
  const resized = await sharp(source)
    .resize(inner, inner, { fit: 'cover', position: 'centre' })
    .toBuffer();
  const left = Math.max(0, Math.floor((inner - size) / 2));
  const top = Math.max(0, Math.floor((inner - size) / 2));
  return sharp(resized)
    .extract({ left, top, width: size, height: size })
    .png()
    .toBuffer();
}

if (!fs.existsSync(source)) {
  console.error('Missing', source);
  process.exit(1);
}

const png180 = await navbarSquarePng(180);
const png32 = await navbarSquarePng(32);
const png16 = await navbarSquarePng(16);

await sharp(png180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
await sharp(png32).toFile(path.join(publicDir, 'favicon-32.png'));
await sharp(png16).toFile(path.join(publicDir, 'favicon-16.png'));
await sharp(png32).toFile(path.join(publicDir, 'favicon.ico'));

console.log('Brand icons generated from LOGO-cropped.webp (navbar match)');
