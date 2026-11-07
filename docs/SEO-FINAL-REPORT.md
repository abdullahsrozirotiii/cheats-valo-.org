# CheatsValo.org — SEO implementation report

**Primary keyword:** `valorant cheats`  
**Date:** 2026-03-14  
**Domain:** https://cheatsvalo.org

## Summary

The site copy, metadata, heading hierarchy, and blog corpus were aligned to **Valorant** and the primary commercial keyword **valorant cheats**. Legacy MOBA/Dota lobby content was removed or rewritten on high-traffic guides. Technical SEO entries were consolidated around `/products/valorant-cheats/valo-cheats/`. Production build completes **53 static pages** with sitemap and RSS.

## Deliverables

| Artifact | Path |
|----------|------|
| Keyword map + SERP notes | `docs/SEO-KEYWORD-MAP.md` |
| Page SEO registry | `src/config/pageSeo.ts` |
| Homepage / global copy | `src/i18n/en.ts` |
| Blog posts | `src/data/blog/posts.ts` |
| Product sysreq naming | `src/data/products.ts` (`valorantSystemRequirements`) |

## Metadata changes

- **Products hub:** title/description now lead with “Valorant Cheats & Utilities”.
- **Removed stale elite-only** `PAGE_SEO` route; added `valo-cheats`, `hwid-spoofer`, `ugc`, `unlock-all`.
- **Product detail pages** already pass `description={product.desc}` via `[slug].astro`.

## Heading hierarchy

- **Home:** single hero H1; section titles in `WhySetupSection.astro` and `WorkflowSection.astro` use **H2**.
- **`CompareTable.astro`:** compare title demoted to **H2** (if embedded elsewhere).

## Content highlights

- **Features / toolkit / workflow / blog teasers** in `en.ts` rewritten for aimbot, ESP, radar, Vanguard, and Valorant modes (no MOBA hero scripting).
- **Top blog guides** rewritten for Practice Range, crosshair settings, and loader workflow (accurate Valorant training vs third-party cheats).
- **Fixed** sanitizer regression: restored `valorant-triggerbot-config` post (missing `slug` had broken the build).
- **Footer boilerplate** deduped across posts (`scripts/blog-dedupe-footers.mjs`).

## Technical SEO

- Canonical domain: `cheatsvalo.org` (unchanged).
- Internal links point to `/products/valorant-cheats/valo-cheats/` for tier CTAs.
- `dotaSystemRequirements` renamed to `valorantSystemRequirements`.
- Twitter example comment in `seo.ts` updated to `@cheatsvalo`.
- Legacy `/go/dota-2` redirects retained in checkout config (backward compatibility).

## Lighthouse (local `serve dist`, Mar 2026)

Scores are from **local static serve** (unminified assets, no CDN). Production on Cloudflare typically improves Performance; SEO and structure scores reflect on-page SEO work.

### Desktop

| URL | Perf | A11y | Best practices | SEO |
|-----|------|------|----------------|-----|
| `/` | 68 | 87 | 96 | **100** |
| `/products/valorant-cheats/` | 93 | **100** | 96 | **100** |
| `/products/valorant-cheats/valo-cheats/` | 59 | 94 | 96 | **100** |
| `/blog/valorant-practice-mode-guide/` | 72 | 97 | 96 | **100** |

### Mobile

| URL | Perf | A11y | Best practices | SEO |
|-----|------|------|----------------|-----|
| `/` | 53 | 96 | 96 | **100** |
| `/products/valorant-cheats/` | 65 | **100** | 96 | **100** |
| `/products/valorant-cheats/valo-cheats/` | 37 | 94 | 96 | **100** |
| `/blog/valorant-practice-mode-guide/` | 42 | 96 | 96 | **100** |

### Notes

- **SEO category: 100** on all audited URLs after heading and meta fixes.
- **Performance** on local preview is dominated by TBT, unminified JS/CSS, and cold `serve` latency—not representative of edge-cached production.
- **Home desktop a11y (87):** Lighthouse flagged contrast, carousel label/name alignment, and table `role` parent issues—worth a focused pass before claiming 100 a11y on home.

## Follow-ups (recommended)

1. **Google Search Console:** monitor impressions for `valorant cheats` after deploy; adjust `pageSeo.ts` titles if SERP truncation appears.
2. **IndexNow:** set `INDEXNOW_KEY` in env for faster recrawl (build script currently skips).
3. **Blog depth:** middle articles (`valorant-cheats-features-guide`, ranked aimbot guide) still use some automation metaphor copy—schedule a second editorial pass for full Valorant-native phrasing.
4. **Production Lighthouse:** rerun against `https://cheatsvalo.org` with CDN enabled for true Performance baselines.
5. **A11y:** fix color-contrast and carousel accessible naming on homepage (from Lighthouse `label-content-name-mismatch`).

## Build verification

```text
npm run build → 53 page(s) built
dist/sitemap.xml finalized (52 URLs in sitemap script output)
```
