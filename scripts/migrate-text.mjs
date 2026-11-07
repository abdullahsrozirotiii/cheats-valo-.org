import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '_staging-images') continue;
      walk(full);
    } else if (/\.(ts|astro|mjs|txt|md|json)$/.test(entry.name) && !entry.name.includes('migrate-text')) {
      files.push(full);
    }
  }
}

walk(path.join(root, 'src'));
walk(path.join(root, 'scripts'));
walk(path.join(root, 'public'));
walk(path.join(root, 'docs'));
if (fs.existsSync(path.join(root, '.seo-baseline'))) walk(path.join(root, '.seo-baseline'));

const replacements = [
  [/dotacheats\.com/g, 'cheatsvalo.org'],
  [/DotaCheats/g, 'CheatsValo'],
  [/dota-2-cheats/g, 'valorant-cheats'],
  [/dota-2-lite-vs-pro/g, 'valorant-lite-vs-pro'],
  [/dota-2-cheat-codes-guide/g, 'valorant-practice-mode-guide'],
  [/dota-2-console-cheats-tips/g, 'valorant-crosshair-settings-tips'],
  [/how-to-use-dota-2-cheat-codes/g, 'how-to-use-valorant-practice-range'],
  [/dota-2-cheats-features-guide/g, 'valorant-cheats-features-guide'],
  [/dota-2-console-commands-cheats/g, 'valorant-settings-for-ranked'],
  [/dota-2-elite-tier-guide/g, 'valorant-elite-tier-guide'],
  [/dota-2-scripts-ranked-mmr/g, 'valorant-aimbot-ranked-guide'],
  [/dota-2-map-hack-setup/g, 'valorant-esp-setup'],
  [/dota-2-zoom-hack-guide/g, 'valorant-radar-hack-guide'],
  [/dota-2-skin-changer-guide/g, 'valorant-skin-changer-guide'],
  [/vac-patch-day-checklist/g, 'vanguard-patch-day-checklist'],
  [/dota-2-hwid-spoofer-after-ban/g, 'valorant-hwid-spoofer-after-ban'],
  [/how-to-buy-dota-2-cheats-2026/g, 'how-to-buy-valorant-cheats-2026'],
  [/dota-2-auto-combo-hero-scripts/g, 'valorant-triggerbot-config'],
  [/valve-anti-cheat-unable-to-verify/g, 'vanguard-anti-cheat-errors'],
  [/dota-2-external-cheat-guide/g, 'valorant-external-cheat-guide'],
  [/dota-2-stream-proof-setup/g, 'valorant-stream-proof-setup'],
  [/\/go\/dota-2\//g, '/go/valorant/'],
  [/checkoutPath\('dota2'\)/g, "checkoutPath('valorant')"],
  [/dota2:/g, 'valorant:'],
  [/dota-2-map-hack/g, 'valorant-esp-wallhack'],
  [/dota-2-scripts-combo/g, 'valorant-aimbot'],
  [/dota-2-zoom-hack/g, 'valorant-radar'],
  [/dota-2-skin-changer/g, 'valorant-skin-changer'],
  [/dota-2-auto-kill-steal/g, 'valorant-triggerbot'],
  [/dota-2-farm-bot/g, 'valorant-recoil-control'],
  [/dota-2-hero-esp/g, 'valorant-player-esp'],
  [/Dota 2/g, 'Valorant'],
  [/dota 2/g, 'valorant'],
  [/dota cheats/gi, 'valorant cheats'],
  [/Steam Dota 2/g, 'Riot Valorant'],
  [/via Steam/g, 'on PC'],
  [/Steam on/g, 'Riot Client on'],
  [/Steam /g, 'Riot Client '],
  [/VAC/g, 'Vanguard'],
  [/Valve /g, 'Riot '],
];

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  let next = text;
  for (const [re, rep] of replacements) {
    next = next.replace(re, rep);
  }
  if (next !== text) {
    fs.writeFileSync(file, next, 'utf8');
    console.log('Updated', path.relative(root, file));
  }
}

console.log('Text migration complete.');
