# Pre-submission audit — CheatsValo (Valorant)

**Game / niche:** Valorant PC, primary keyword **valorant cheats**  
**Production domain:** `https://cheatsvalo.org`  
**Audit date:** 2026-11-08  
**Build:** `npm run build` — **53** static routes, **52** sitemap URLs, **0** build errors  

**Ready for production submit?** **Conditional yes** — in-repo blockers below are addressed; **manual deploy checks** still required (no push/deploy was performed without your authorization).

---

## Fixed in this pass

### Game & content consistency
- Rewrote MOBA/Dota leftovers in [`src/data/blog/posts.ts`](../src/data/blog/posts.ts): features guide, ranked settings (Custom Game vs external tools), Lite vs Pro, Elite, aimbot, ESP, zoom, skin changer.
- Synced blog card copy in [`src/i18n/en.ts`](../src/i18n/en.ts) for `valorant-settings-for-ranked`.
- Replaced **Turbo** with **Unrated/Competitive** in [`src/data/products.ts`](../src/data/products.ts) and [`ProductDescriptionSection.astro`](../src/components/product/ProductDescriptionSection.astro).

### On-page / technical SEO
- Existing: `pageSeo.ts`, `clampMetaDescription`, homepage **valorant cheats** in title + H1.
- **Preview duplicate risk:** [`functions/_middleware.ts`](../functions/_middleware.ts) forces `noindex, nofollow` on `*.pages.dev` / `*.workers.dev`; Preview env may set `PUBLIC_FORCE_NOINDEX=true` at build time via [`isPreviewDeployment()`](../src/config/seo.ts).

### Redirects (Cloudflare Pages)
- [`public/_redirects`](../public/_redirects): **301** rules for `/cheats/*`, `/contact/` → `/support/`, legacy tier slugs → `valo-cheats/`, trailing-slash normalizations (aligned with [`scripts/redirects.mjs`](../scripts/redirects.mjs)).
- `/go/*` remains **302** to Zadeyo checkout.

### Sitemap
- [`src/config/sitemap.ts`](../src/config/sitemap.ts) excludes redirect-only paths: `/cheats/`, `/contact/`, `/products/valorant-cheats/{lite,pro,elite}/`.
- Production build: all `<loc>` use `https://cheatsvalo.org`.

### Structured data
- [`productSchema`](../src/utils/schema.ts): `Offer` (single price) or `AggregateOffer` (`lowPrice`/`highPrice`) from [`getProductPlans`](../src/data/productPricing.ts).
- Verified on build: Valo Cheats → `AggregateOffer` USD **35–150**, `offerCount: 4`.

---

## Build verification

| Check | Result |
|--------|--------|
| `npm run build` | Pass (53 pages) |
| `dist/sitemap.xml` | 52 URLs, `cheatsvalo.org` |
| `public/robots.txt` | `Sitemap: https://cheatsvalo.org/sitemap.xml`, `Disallow: /go/` |
| Product JSON-LD prices | Pass (sample: valo-cheats) |

---

## Lighthouse (local `astro preview`, mobile throttling)

Scores are **indicative** — production on Cloudflare edge, HTTPS, and caching differ from `http://localhost:4321/`.

| Page | Perf | A11y | Best practices | SEO |
|------|------|------|----------------|-----|
| `/` (home) | **73** | **96** | **100** | **100** |
| `/products/valorant-cheats/` | (not full run) | — | — | **100** (category-only run) |
| `/blog/valorant-cheats-features-guide/` | — | — | — | **100** (category-only run) |

**Performance gap (home):** TBT/LCP on local preview (hero images, slider JS, cold server). Retest on **production** URL after deploy; do not expect **100** performance without further JS/image work (out of scope for this audit — no redesign).

---

## Remaining / intentional

| Item | Severity | Notes |
|------|----------|--------|
| Post-deploy `curl -I` on `/cheats/`, `/contact/`, tier redirects | Manual | Confirm **301** from Cloudflare, not meta-refresh HTML |
| `https://cheatsvalo.org/sitemap.xml` HTTP 200 + XML type | Manual | `curl -I` after Pages deploy; [`public/_headers`](../public/_headers) sets `Content-Type` |
| Production Pages env: **unset `SITE`** | Manual | Preview-only: set `SITE` to workers origin for audits |
| Legacy alias `/go/dota-2` → Valorant checkout | Low | Intentional URL alias — not marketed as Dota |
| Performance 100 Lighthouse | Low | See above; SEO/A11y/BP strong on sample |
| Zadeyo checkout HTML | N/A | Out of repo; audit `cheatsvalo.org` URLs only |
| `INDEXNOW_KEY` | Optional | Skipped when unset at build |

---

## Critical issues before last audit sign-off

None **in source** after this pass. **Do not** mark fully live-ready until:

1. Cloudflare **production** redeploy from this tree.
2. `curl -I https://cheatsvalo.org/sitemap.xml` → **200**.
3. Redirect spot-check on **production** (not just local `dist`).

---

## Files changed (summary)

- `src/data/blog/posts.ts`, `src/i18n/en.ts`, `src/data/products.ts`
- `src/components/product/ProductDescriptionSection.astro`
- `src/utils/schema.ts`, `src/pages/products/valorant-cheats/[slug].astro`
- `src/config/seo.ts`, `src/layouts/BaseLayout.astro`, `src/config/sitemap.ts`
- `public/_redirects`
- `scripts/check-dist-links.mjs` (dev helper; static assets at repo root not validated as HTML paths)

---

## Git / deploy

No `git push` or Cloudflare deploy was executed (per your instructions). Commit and deploy when you authorize.
