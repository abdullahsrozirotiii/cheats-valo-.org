/**
 * Remove duplicated SEO boilerplate paragraphs from blog posts.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const file = path.join(root, 'src/data/blog/posts.ts');
let text = fs.readFileSync(file, 'utf8');

const patterns = [
  /      \{ type: 'p', text: "CheatsValo at cheatsvalo\.org maintains private valorant cheats[^}]+\},\n/g,
  /      \{ type: 'p', text: "Vanguard enforcement is real:[^}]+\},\n/g,
  /      \{ type: 'p', text: "Internal links across our blog[^}]+\},\n/g,
  /      \{ type: 'p', text: "Compare \[Lite vs Pro\][^}]+\},\n/g,
  /      \{ type: 'p', text: "Stream-proof mode, external loader[^}]+\},\n/g,
];

for (const pattern of patterns) {
  text = text.replace(pattern, '');
}

const fixes = [
  [/\bdota cheat\b/gi, 'valorant cheat'],
  [/\bVanilla Dota\b/g, 'Clean Valorant'],
  [/-dota_bot_populate/g, 'custom game bots'],
];

for (const [pattern, repl] of fixes) {
  text = text.replace(pattern, repl);
}

fs.writeFileSync(file, text);
console.log('Deduped footers in', file);
