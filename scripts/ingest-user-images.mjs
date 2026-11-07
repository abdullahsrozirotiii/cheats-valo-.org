import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const staging = path.join(root, '_staging-images');

const gameplayMap = [
  ['valorant-esp-archway-showdown.webp', 'valorant-esp-wallhack.png'],
  ['snowy-industrial-alley-with-esp-overlays.webp', 'valorant-player-esp.png'],
  ['futuristic-valorant-corridor-battle-hud.webp', 'valorant-aimbot.png'],
  ['valorant-sci-fi-showdown-hud.webp', 'valorant-triggerbot.png'],
  ['valorant-jett-knives-at-a-belt-1.webp', 'valorant-skin-changer.png'],
  ['1-2-webp-309350f53434ceeb48bfb1837f8647ba.webp', 'valorant-radar.png'],
  ['2-webp-7f1f09ea0214f5ec9ccb296f8cf86329.webp', 'valorant-recoil-control.png'],
];

const blogSlugs = [
  'valorant-practice-mode-guide',
  'valorant-crosshair-settings-tips',
  'how-to-use-valorant-practice-range',
  'valorant-cheats-features-guide',
  'valorant-settings-for-ranked',
  'valorant-lite-vs-pro',
  'valorant-elite-tier-guide',
  'valorant-aimbot-ranked-guide',
  'valorant-esp-setup',
  'valorant-radar-hack-guide',
  'valorant-skin-changer-guide',
  'vanguard-patch-day-checklist',
  'valorant-hwid-spoofer-after-ban',
  'how-to-buy-valorant-cheats-2026',
  'valorant-triggerbot-config',
  'vanguard-anti-cheat-errors',
  'valorant-external-cheat-guide',
  'valorant-stream-proof-setup',
];

const blogSources = [
  '5-webp-464f6deb34dc1b8af2bf890f1fbf8367.webp',
  'whsatano-valorant-s1.webp',
  'whsatano-valorant-s2.webp',
  'whsatano-valorant-s2-e756aae18c6c.webp',
  'images.webp',
  'e2d04148-8891-4e0f-b125-4064685f572f.webp',
  'eefan-my-aim-got-me-banned-in-modern-warfare-4-b1kdllicky0-1112x626-5m57s.webp',
  'valorant-esp-archway-showdown.webp',
  'snowy-industrial-alley-with-esp-overlays.webp',
  'futuristic-valorant-corridor-battle-hud.webp',
  'valorant-sci-fi-showdown-hud.webp',
  'valorant-jett-knives-at-a-belt-1.webp',
  '1-2-webp-309350f53434ceeb48bfb1837f8647ba.webp',
  '2-webp-7f1f09ea0214f5ec9ccb296f8cf86329.webp',
  '5-webp-464f6deb34dc1b8af2bf890f1fbf8367.webp',
  'whsatano-valorant-s1.webp',
  'images.webp',
  'e2d04148-8891-4e0f-b125-4064685f572f.webp',
];

async function webpToPng(srcRel, destName, destDir) {
  const src = path.join(staging, srcRel);
  if (!fs.existsSync(src)) {
    console.warn(`Missing staging file: ${srcRel}`);
    return;
  }
  const dest = path.join(destDir, destName);
  await sharp(src).png({ compressionLevel: 8 }).toFile(dest);
  console.log(`Wrote ${path.relative(root, dest)}`);
}

const gameplayDir = path.join(root, 'public/images/gameplay');
const blogDir = path.join(root, 'public/images/blog');
fs.mkdirSync(gameplayDir, { recursive: true });
fs.mkdirSync(blogDir, { recursive: true });

for (const [src, dest] of gameplayMap) {
  await webpToPng(src, dest, gameplayDir);
}

for (let i = 0; i < blogSlugs.length; i++) {
  const slug = blogSlugs[i];
  const src = blogSources[i] ?? blogSources[i % blogSources.length];
  await webpToPng(src, `${slug}.png`, blogDir);
}

console.log('User image ingest complete.');
