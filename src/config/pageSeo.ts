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
    title: 'Valorant Cheats – Aimbot, ESP & Wallhack | CheatsValo',
    description:
      'Valorant cheats for PC ranked: aimbot, ESP, wallhack, and skin changer tiers. Updated every Vanguard patch. Guides and status at cheatsvalo.org.',
  },
  '/products/valorant-cheats/': {
    title: 'Aimbot – VALORANT Cheats — Product Details | CheatsValo',
    description:
      'Undetected VALORANT cheats with player ESP, aimbot, and recoil control. Monthly and lifetime access. Updated for current patches.',
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
    title: 'Guides – ranked config tips for valorant cheats | CheatsValo',
    description:
      'Setup guides, Lite vs Pro comparisons, Vanguard patch checklists, and ranked config tips for valorant cheats at cheatsvalo.org.',
  },
  '/forum/': {
    title: 'Community – Valorant forum for configs & guides | CheatsValo',
    description:
      'Join the Valorant community forum: agents, configs, patch changes, guides, and player moments. Discuss tiers at cheatsvalo.org.',
  },
  '/faq/': {
    title: 'Cheats – FAQ for products, setup & guides | CheatsValo',
    description:
      'Answers on cheats tiers, map hack, scripts, HWID tools, checkout, and blog guides at cheatsvalo.org. Lite, Pro, and Elite explained.',
  },
  '/terms/': {
    title: 'Terms & Conditions | CheatsValo',
    description:
      'Purchase terms, license use, and refund policy for CheatsValo products sold through cheatsvalo.org.',
  },
  '/privacy/': {
    title: 'Privacy – analytics, cookies & contact data | CheatsValo',
    description:
      'Privacy: How cheatsvalo.org uses analytics, cookies, and contact data when you browse or request support. Policy for CheatsValo visitors.',
  },
  '/about/': {
    title: 'Cheats Tiers – What CheatsValo publishes | CheatsValo',
    description:
      'Cheats tiers: Lite, Pro, and Elite modules, utilities, setup guides, and Vanguard status notes for PC players at cheatsvalo.org.',
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
