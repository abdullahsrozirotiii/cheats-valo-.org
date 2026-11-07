# Cloudflare Pages — cheatsvalo.org

This repo is a **static Astro** site. Use **Cloudflare Pages (Git)**, not `npx wrangler deploy`.

## Dashboard settings

**Workers & Pages** → your project → **Settings** → **Builds**:

| Setting | Value |
|---------|--------|
| Framework preset | Astro (or None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| **Deploy command** | **(empty — remove `npx wrangler deploy`)** |
| Root directory | `/` |
| Node.js version | `22` |

Optional build environment variables:

- `INDEXNOW_KEY` — if set, post-build IndexNow ping runs; otherwise skipped.
- `SITE` — canonical origin for sitemap `<loc>`, `<link rel="canonical">`, and hreflang. **Production:** leave unset (defaults to `https://cheatsvalo.org`). **Workers preview re-audit:** set to your preview origin, e.g. `https://cheats-valo--org.abdullahsyed2326.workers.dev` (no trailing slash), rebuild, and redeploy that preview.

`astro.config.mjs`, `src/config/seo.ts`, and `scripts/finalize-sitemap.mjs` all read `SITE` at build time.

## Custom domain

Attach **cheatsvalo.org** to this Pages project. Keep DNS proxied (orange cloud) through Cloudflare.

`public/_redirects` is copied into `dist/` and powers `/go/*` checkout redirects on Pages.

## Why not Wrangler deploy?

`npx wrangler deploy` can auto-run `astro add cloudflare`, which:

1. Runs a **second** build with the Cloudflare adapter
2. Writes static files under `dist/client/` instead of `dist/`
3. Broke older post-build steps that only looked at `dist/sitemap-0.xml`

Post-build scripts now resolve `dist/` or `dist/client/` via [`scripts/lib/dist-dir.mjs`](../scripts/lib/dist-dir.mjs). Still use **Pages with an empty deploy command** — no Workers/KV required for this site.

## Post-deploy checks

- https://cheatsvalo.org/
- https://cheatsvalo.org/sitemap.xml — expect **HTTP 200** and `Content-Type: application/xml` (see `public/_headers` in `dist/`). Quick check: `curl -I https://cheatsvalo.org/sitemap.xml`
- https://cheatsvalo.org/robots.txt
- https://cheatsvalo.org/go/valorant/ → external checkout (302)

After a **preview** build with `SITE` set to your `*.workers.dev` origin, open `/sitemap.xml` on that host and confirm every `<loc>` uses the same origin as the page you are auditing (canonical/hreflang must match).

## Successful build log

You should see **one** `npm run build`, **no** `wrangler deploy`, **no** `[@astrojs/cloudflare]` lines.
