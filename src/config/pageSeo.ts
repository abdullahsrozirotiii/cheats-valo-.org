/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    // gscNote: Keep primary keyword "valorant cheats" near front; trim if title truncates in SERP.
    title: 'Valorant Cheats & Hacks | Aimbot, ESP & Wallhack',
    description:
      'Valorant cheats for PC ranked: aimbot, ESP, wallhack, and skin changer tiers updated every Vanguard patch at cheatsvalo.org.',
  },
  '/products/valorant-cheats/': {
    title: 'Valorant Cheats & Utilities | CheatsValo',
    description:
      'Valorant cheats plus HWID spoofer, UGC, and skin changer utilities. Lite, Pro, and Elite tiers on cheatsvalo.org.',
  },
  '/products/valorant-cheats/valo-cheats/': {
    title: 'Valo Cheats (Lite, Pro, Elite) | Valorant Cheats',
    description:
      'Compare Lite ESP, Pro aimbot, and Elite full suite. One checkout for private valorant cheats at cheatsvalo.org.',
  },
  '/products/valorant-cheats/hwid-spoofer/': {
    title: 'Valorant HWID Spoofer | CheatsValo',
    description:
      'HWID spoofer for Valorant PC: disk and MAC profile tools, verification checklist, portal setup at cheatsvalo.org.',
  },
  '/products/valorant-cheats/ugc/': {
    title: 'Valorant UGC | Ban appeal workspace | CheatsValo',
    description:
      'UGC appeal workflows for Riot restrictions and Vanguard cases. Structured disputes—not guaranteed unban.',
  },
  '/products/valorant-cheats/unlock-all/': {
    title: 'Valorant Skin Changer | Unlock All preview | CheatsValo',
    description:
      'Preview weapon and agent skins locally on your client. Unlock All utility for Valorant on PC.',
  },
  '/products/valorant-cheats/utilities/': {
    title: 'Valorant Utilities | HWID, UGC & Skin Changer',
    description:
      'Choose HWID Spoofer, UGC, or Skin Changer—when each utility fits and links to full product pages.',
  },
  '/blog/': {
    title: 'Valorant Cheats Guides & Patch Notes',
    description:
      'Setup guides, Lite vs Pro comparisons, Vanguard patch checklists, and ranked config tips for valorant cheats.',
  },
  '/forum/': {
    title: 'Valorant Community Forum | CheatsValo',
    description: 'Join Valorant players to discuss agents, configs, patch changes, guides, and community moments.',
  },
  '/faq/': {
    title: 'FAQ | Valorant Cheats, Products & Setup',
    description:
      'Answers on cheat tiers, map hack, scripts, HWID tools, checkout, and blog guides at cheatsvalo.org.',
  },
  '/terms/': {
    title: 'Terms & Conditions | CheatsValo',
    description:
      'Purchase terms, license use, and refund policy for CheatsValo products sold through cheatsvalo.org.',
  },
  '/privacy/': {
    title: 'Privacy Policy | CheatsValo',
    description:
      'How cheatsvalo.org uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About CheatsValo',
    description:
      'What CheatsValo publishes: Valorant cheat tiers, utilities, guides, and status notes at cheatsvalo.org.',
  },
  '/support/': {
    title: 'Support | CheatsValo',
    description:
      'Get help with loader setup, HWID, and checkout for Valorant cheat tiers and utilities.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
