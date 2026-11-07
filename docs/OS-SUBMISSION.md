# OS submission — cheatsvalo.org (pre-deploy)

## URLs (pending live deploy)
- Live website: `https://cheatsvalo.org/` (not verified until Cloudflare deploy)
- Sitemap: `https://cheatsvalo.org/sitemap.xml`
- Robots: `https://cheatsvalo.org/robots.txt`

## Homepage SEO (from build)
- Title: Valorant Cheats & Hacks | Aimbot, ESP & Wallhack (52 chars)
- Meta description: Valorant cheats for PC ranked: aimbot, ESP, wallhack, and skin changer tiers updated every Vanguard patch at cheatsvalo.org. (130 chars)
- H1: Valorant Cheats & Hacks (two-line hero)

## Keywords (research note)
- Primary: **valorant cheats**
- Supporting: **valorant aimbot**, **valorant esp** / **valorant wallhack**
- Exact global monthly volume and KD% were not pulled programmatically in this build; use [Semrush Keyword Overview](https://www.semrush.com/analytics/keywordoverview/) or Ahrefs before filing official SEO numbers. Do not invent metrics.

## Audience
Global PC Valorant players searching for undetected cheat tiers, setup guides, and utilities (HWID, UGC, skin unlock).

## Ranking justification
Kernel-level Vanguard raises barrier-to-entry for low-quality cheat sites; cheatsvalo.org targets commercial-intent queries with original tier pages, 18 guides, structured data, fast static delivery, and affiliate checkout aligned to Zadeyo Valorant products.

## Important pages
- `/`, `/products/valorant-cheats/`, `/products/valorant-cheats/lite|pro|elite/`, utilities, `/blog/`, `/faq/`, `/support/`, legal

## Git
- `https://github.com/Stellarhamza/NOT-OPTIMISED` branch `main` — **not pushed** until authorized

## QA checklist
- [x] Production build completes (`npm run build`)
- [x] 55 static routes generated, 54 sitemap URLs
- [x] Unique page SEO via `pageSeo.ts` + blog posts
- [x] User-supplied images only (+ logo); responsive WebP variants
- [x] Checkout `/go/*` → Zadeyo ABDULLAH URLs (`public/_redirects` + `serve.mjs`)
- [ ] Live URL / sitemap / robots verification (after deploy)
- [ ] Zadeyo price match manual check at checkout
- [ ] Lighthouse on production HTTPS (local mobile LH run saved as `lighthouse-home.json`)

## Notes for OS
Static Astro 7 `dist/` output; Cloudflare Pages with `_headers` and `_redirects`. Do not commit `.env` secrets.
