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

Optional build environment variable:

- `INDEXNOW_KEY` — if set, post-build IndexNow ping runs; otherwise skipped.

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
- https://cheatsvalo.org/sitemap.xml
- https://cheatsvalo.org/robots.txt
- https://cheatsvalo.org/go/valorant/ → external checkout (302)

## Successful build log

You should see **one** `npm run build`, **no** `wrangler deploy`, **no** `[@astrojs/cloudflare]` lines.
