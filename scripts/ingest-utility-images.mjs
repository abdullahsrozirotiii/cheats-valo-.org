import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();

const jobs = [
  {
    zip: path.join(process.env.USERPROFILE ?? '', 'Downloads', 'SPOOFER.zip'),
    outDir: 'public/images/products/hwid-spoofer',
    files: [
      { zipPath: 'SPOOFER/hwid-spoofer-1-960.webp', name: 'hwid-spoofer-1.png' },
      { zipPath: 'SPOOFER/hwid-spoofer-3-960.webp', name: 'hwid-spoofer-3.png' },
    ],
  },
  {
    zip: path.join(process.env.USERPROFILE ?? '', 'Downloads', 'UGC.zip'),
    outDir: 'public/images/products/ugc',
    files: [{ zipPath: 'UGC/ugc-gallery-1-960.webp', name: 'ugc-gallery-1.png' }],
  },
  {
    zip: path.join(process.env.USERPROFILE ?? '', 'Downloads', 'Skin Changer.zip'),
    outDir: 'public/images/products/unlock-all',
    files: [{ zipPath: 'Skin Changer/dayz-skin-changer-product-960.webp', name: 'skin-changer-product.png' }],
  },
];

async function runJob(job) {
  if (!fs.existsSync(job.zip)) {
    console.error('Zip not found:', job.zip);
    return;
  }
  fs.mkdirSync(path.join(root, job.outDir), { recursive: true });
  const staging = path.join(root, '_staging-utility', path.basename(job.zip, '.zip'));
  fs.mkdirSync(staging, { recursive: true });
  const { execSync } = await import('node:child_process');
  execSync(`powershell -NoProfile -Command "Expand-Archive -Path '${job.zip.replace(/'/g, "''")}' -DestinationPath '${staging.replace(/'/g, "''")}' -Force"`, {
    stdio: 'inherit',
  });
  for (const file of job.files) {
    const leaf = file.zipPath.split('/').pop();
    const src = path.join(staging, ...file.zipPath.split('/'));
    const alt = path.join(staging, leaf);
    const input = fs.existsSync(src) ? src : alt;
    const dest = path.join(root, job.outDir, file.name);
    await sharp(input).png({ compressionLevel: 8 }).toFile(dest);
    console.log('Wrote', path.relative(root, dest));
  }
}

for (const job of jobs) {
  await runJob(job);
}

console.log('Utility image ingest complete.');
