/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/valorant-cheats/'],
  ['/cheats/', '/products/valorant-cheats/'],
  ['/cheats/lite', '/products/valorant-cheats/'],
  ['/cheats/lite/', '/products/valorant-cheats/'],
  ['/cheats/pro', '/products/valorant-cheats/'],
  ['/cheats/pro/', '/products/valorant-cheats/'],
  ['/cheats/elite', '/products/valorant-cheats/valo-cheats/'],
  ['/cheats/elite/', '/products/valorant-cheats/valo-cheats/'],
  ['/cheats/compare', '/blog/valorant-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/valorant-lite-vs-pro/'],
  ['/products/valorant-cheats/utilities', '/products/valorant-cheats/utilities/'],
  ['/products/valorant-cheats', '/products/valorant-cheats/'],
  ['/products/valorant-cheats/account-recovery', '/products/valorant-cheats/ugc/'],
  ['/products/valorant-cheats/account-recovery/', '/products/valorant-cheats/ugc/'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
