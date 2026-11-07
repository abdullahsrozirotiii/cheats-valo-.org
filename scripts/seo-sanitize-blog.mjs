/**
 * DEPRECATED one-off sanitizer — do not re-run on a clean posts.ts.
 * Aggressive regex (e.g. Invoker…, -gold) can corrupt slugs and break tables.
 * Prefer manual edits + scripts/blog-dedupe-footers.mjs for footer cleanup.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const file = path.join(root, 'src/data/blog/posts.ts');
let text = fs.readFileSync(file, 'utf8');

const replacements = [
  [/\/products\/valorant-cheats\/elite\//g, '/products/valorant-cheats/valo-cheats/'],
  [/\bdota cheat tiers\b/gi, 'valorant cheat tiers'],
  [/\bRiot Client PC ranked and Turbo\b/g, 'Riot Client PC Competitive and Deathmatch'],
  [/\branked and Turbo\b/g, 'Competitive and Deathmatch'],
  [/\bTurbo\b/g, 'Deathmatch'],
  [/\bSteam\b/g, 'Riot Client'],
  [/\bValve-sanctioned\b/g, 'Riot-sanctioned'],
  [/\bValve\b/g, 'Riot'],
  [/\bhero ESP\b/gi, 'player ESP'],
  [/\bHero boxes\b/g, 'Agent boxes'],
  [/\bwards?\b/gi, (m) => (m[0] === m[0].toUpperCase() ? 'Spike info' : 'spike info')],
  [/\brunes?\b/gi, (m) => (m[0] === m[0].toUpperCase() ? 'Ability timers' : 'ability timers')],
  [/\bAuto Combo\b/g, 'Aimbot profiles'],
  [/\bOrbwalker\b/g, 'Recoil control'],
  [/\bSmart Cast\b/g, 'Triggerbot'],
  [/\bActivator for BKB[^.]*\./g, 'Recoil and spray control presets.'],
  [/\bAuto Farm Bot\b/g, 'Advanced macro presets'],
  [/\bAuto Kill Steal\b/g, 'Priority target switching'],
  [/\bAuto Dagon\b/g, 'Elite combat macros'],
  [/\bmap hack\b/gi, (m) => (m[0] === m[0].toUpperCase() ? 'ESP' : 'ESP')],
];

for (const [pattern, repl] of replacements) {
  text = text.replace(pattern, repl);
}

const boilerplate =
  /      \{ type: 'p', text: "CheatsValo at cheatsvalo\.org maintains private valorant cheats[^}]+\},\n/g;
let seen = 0;
text = text.replace(boilerplate, (match) => {
  seen += 1;
  return seen % 6 === 1 ? match : '';
});

const boilerplate2 =
  /      \{ type: 'p', text: "Vanguard enforcement is real:[^}]+\},\n/g;
seen = 0;
text = text.replace(boilerplate2, (match) => {
  seen += 1;
  return seen % 6 === 1 ? match : '';
});

const boilerplate3 =
  /      \{ type: 'p', text: "Internal links across our blog[^}]+\},\n/g;
seen = 0;
text = text.replace(boilerplate3, (match) => {
  seen += 1;
  return seen % 6 === 1 ? match : '';
});

const boilerplate4 =
  /      \{ type: 'p', text: "Compare \[Lite vs Pro\][^}]+\},\n/g;
seen = 0;
text = text.replace(boilerplate4, (match) => {
  seen += 1;
  return seen % 6 === 1 ? match : '';
});

const boilerplate5 =
  /      \{ type: 'p', text: "Stream-proof mode, external loader[^}]+\},\n/g;
seen = 0;
text = text.replace(boilerplate5, (match) => {
  seen += 1;
  return seen % 6 === 1 ? match : '';
});

fs.writeFileSync(file, text);
console.log('Sanitized', file);
