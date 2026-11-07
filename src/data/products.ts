import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  'valo-cheats': [
    'valorant-lite-vs-pro',
    'valorant-cheats-features-guide',
    'valorant-esp-setup',
    'valorant-elite-tier-guide',
    'how-to-buy-valorant-cheats-2026',
    'vanguard-patch-day-checklist',
  ],
  lite: ['valorant-esp-setup', 'valorant-lite-vs-pro', 'valorant-radar-hack-guide', 'vanguard-patch-day-checklist'],
  pro: [
    'valorant-aimbot-ranked-guide',
    'valorant-triggerbot-config',
    'valorant-lite-vs-pro',
    'valorant-stream-proof-setup',
  ],
  elite: [
    'valorant-elite-tier-guide',
    'valorant-cheats-features-guide',
    'valorant-esp-setup',
    'vanguard-patch-day-checklist',
    'how-to-buy-valorant-cheats-2026',
  ],
  'hwid-spoofer': [
    'valorant-hwid-spoofer-after-ban',
    'vanguard-anti-cheat-errors',
    'vanguard-patch-day-checklist',
    'valorant-external-cheat-guide',
  ],
  ugc: [
    'vanguard-anti-cheat-errors',
    'valorant-hwid-spoofer-after-ban',
    'how-to-buy-valorant-cheats-2026',
  ],
  'unlock-all': [
    'valorant-skin-changer-guide',
    'valorant-cheats-features-guide',
    'valorant-stream-proof-setup',
  ],
};

const productBase = '/products/valorant-cheats/';

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on cheatsvalo.org and Discord #status before purchase—especially after a Valorant or Vanguard update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select Elite valorant cheats or the utility that matches your goal. Review the feature list before checkout via our secure checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Open Discord and confirm availability, Riot Client platform, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the operator portal, patch loader, and setup guide. Test in a lobby, load presets, then queue Unrated or Competitive.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Valorant and Vanguard receive frequent updates. Confirm module availability on the live status panel at cheatsvalo.org before you purchase or launch. Overlay behavior may differ in lobbies, replays and spectator mode after patches.';

const sharedLimitations =
  'Third-party software in Valorant can violate Riot Terms of Use and lead to Vanguard bans or account action. You use this software at your own risk. Compatibility and availability can change after game, Vanguard, or Windows updates without notice.';

const valorantSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqSteam', text: 'Current Valorant client on PC with latest patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and patch updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and patch delivery.' },
  { icon: 'reqCpu', text: 'A system that meets Valorant published hardware requirements.' },
];

type GalleryKey = keyof typeof galleryRaw;

const gameplay = '/images/gameplay';

const galleryRaw = {
  gpMapHack: {
    src: `${gameplay}/valorant-esp-wallhack.png`,
    alt: 'Valorant wallhack showing enemy agents through walls during a competitive round',
    caption: 'Wallhack & ESP',
    captionDesc: 'Enemy outlines, distance tags and ability cooldowns on Ascent mid control.',
  },
  gpScripts: {
    src: `${gameplay}/valorant-aimbot.png`,
    alt: 'Valorant aimbot smoothing onto a visible target with FOV ring',
    caption: 'Smooth aimbot',
    captionDesc: 'Humanized aim assist with visibility checks and bone priority presets.',
  },
  gpZoomHack: {
    src: `${gameplay}/valorant-radar.png`,
    alt: 'Valorant radar overlay with enemy positions on mini-map',
    caption: 'Radar overlay',
    captionDesc: 'Rotations and flank warnings without tabbing out of the fight.',
  },
  gpSkinChanger: {
    src: `${gameplay}/valorant-skin-changer.png`,
    alt: 'Valorant skin changer previewing premium weapon skins locally',
    caption: 'Skin unlock preview',
    captionDesc: 'Inspect and equip any skin bundle on your client—stream-safe previews.',
  },
  gpAutoKill: {
    src: `${gameplay}/valorant-triggerbot.png`,
    alt: 'Valorant triggerbot firing when crosshair crosses an enemy hitbox',
    caption: 'Triggerbot',
    captionDesc: 'Reaction timing tuned for Vandal taps without obvious flick snaps.',
  },
  gpFarmBot: {
    src: `${gameplay}/valorant-recoil-control.png`,
    alt: 'Valorant recoil control pattern overlay on rifle spray',
    caption: 'Recoil control',
    captionDesc: 'Spray tracking that keeps Phantom and Vandal patterns tight at range.',
  },
  gpHeroEsp: {
    src: `${gameplay}/valorant-player-esp.png`,
    alt: 'Valorant player ESP with agent name tags through smoke',
    caption: 'Player ESP',
    captionDesc: 'Agent tags, health bars and weapon readouts through smokes and utility.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

const utilityImageBase = '/images/products';

function utilitySlides(
  folder: string,
  slides: { file: string; alt: string; caption: string; captionDesc: string }[],
): ProductSlide[] {
  return slides.map((s) => ({
    src: `${utilityImageBase}/${folder}/${s.file}.png`,
    alt: s.alt,
    caption: s.caption,
    captionDesc: s.captionDesc,
  }));
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'valorant-cheats';
}

const tierAbout: Record<string, ProductPage['about']> = {
  'valo-cheats': [
    {
      type: 'p',
      text: 'Valo Cheats bundles Lite, Pro, and Elite in one operator portal. After checkout you pick the tier that matches your rank goals—ESP-only awareness, full aimbot automation, or the private Elite build with priority Vanguard patch delivery.',
    },
    { type: 'h2', text: 'Three tiers, one loader' },
    {
      type: 'p',
      text: 'Lite keeps overlays readable without aim automation. Pro adds smooth aimbot, triggerbot, and recoil control. Elite unlocks every combat module plus skin preview and faster patch cycles when slots are open.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  'valo-cheats': [
    { type: 'h2', text: 'Lite tier' },
    {
      type: 'p',
      text: 'Player ESP, wallhack lines, spike and ability timers, radar hints, and stream-proof mode. Best for players who only want information—not crosshair automation. Start with ranked presets in the portal.',
    },
    { type: 'h2', text: 'Pro tier' },
    {
      type: 'p',
      text: 'Everything in Lite plus smooth aimbot, triggerbot, recoil control, target selector, and humanized delay sliders. Tuned for Competitive and Unrated on PC.',
    },
    { type: 'h2', text: 'Elite tier' },
    {
      type: 'p',
      text: 'Full Lite + Pro stack, rage aim profiles, unlock-all skin preview, priority patch queue, and direct dev support. Limited slots—check the status banner on cheatsvalo.org before purchase.',
    },
    { type: 'h2', text: 'Checkout & tier selection' },
    {
      type: 'p',
      text: 'Complete secure checkout once, then choose Lite, Pro, or Elite inside the portal. Compare modules in our [Lite vs Pro guide](/blog/valorant-lite-vs-pro/) before you queue.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When you need it' },
    {
      type: 'p',
      text: 'Use when fresh Riot Client accounts fail instantly on one PC but work elsewhere—classic HWID enforcement. Do not use for account-only Vanguard cases; see [UGC](/products/valorant-cheats/ugc/) instead.',
    },
    { type: 'h2', text: 'Full workflow' },
    {
      type: 'p',
      text: 'Restore point, driver cleanup, spoof application, cold reboot, identifier verification, then conservative cheat profile before ranked. Full checklist ships in the portal and in our HWID blog guide.',
    },
  ],
  'ugc': [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'UGC (Unban & Governance Control) is an appeal workspace for Riot Client restrictions, Vanguard bans, trade holds and security flags. Build custom workflows, automate dispute steps and track case status from one dashboard—not a guaranteed unban service.',
    },
    { type: 'h2', text: 'Realistic expectations' },
    {
      type: 'p',
      text: 'Some Vanguard bans cannot be reversed. UGC organizes evidence and follow-ups for Riot review. Pair with [HWID Spoofer](/products/valorant-cheats/hwid-spoofer/) when hardware is flagged, or a new account when reputation is burned.',
    },
  ],
  'unlock-all': [
    { type: 'h2', text: 'Local preview only' },
    {
      type: 'p',
      text: 'Cosmetics display on your client for testing and content creation. Other players in your lobby see your actual inventory, not preview skins.',
    },
    { type: 'h2', text: 'Included with Elite' },
    {
      type: 'p',
      text: 'Skin Changer ships inside the Elite tier. Buy standalone here if you want cosmetic preview without full combat modules.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  'valo-cheats': {
    images: slide('gpHeroEsp', 'gpScripts', 'gpSkinChanger', 'gpMapHack'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: valorantSystemRequirements,
    fullFeatures: [
      'Lite: player ESP & wallhack',
      'Lite: spike & ability timers',
      'Lite: radar overlay',
      'Pro: smooth aimbot',
      'Pro: triggerbot',
      'Pro: recoil control',
      'Pro: target selector',
      'Elite: full module stack',
      'Elite: skin unlock preview',
      'Elite: priority patch queue',
      'Stream-proof overlay mode',
      'Ranked & unrated presets',
      'Cloud config backup',
      'Vanguard-aware updates',
    ],
    overview: {
      title: 'Lite, Pro, and Elite in one Valorant package',
      paragraphs: [
        'Valo Cheats (Lite • Pro • Elite) is the main combat product on cheatsvalo.org. One checkout unlocks the operator portal—pick Lite for ESP-only, Pro for aimbot automation, or Elite when every module and priority patches matter.',
        'Modules update with Vanguard patch cycles. Check the live status banner before every session and start with portal presets, not max sliders.',
      ],
    },
  },
  'hwid-spoofer': {
    images: utilitySlides('hwid-spoofer', [
      {
        file: 'hwid-spoofer-1',
        alt: 'HWID spoofer compatibility scan on Windows before Valorant',
        caption: 'Compatibility scan',
        captionDesc: 'Verify disk, MAC, and GPU identifiers before applying a new hardware profile.',
      },
      {
        file: 'hwid-spoofer-3',
        alt: 'HWID spoofer post-change verification dashboard',
        caption: 'Post-spoof verification',
        captionDesc: 'Confirm serial rotation and reboot checklist before launching the Riot Client.',
      },
    ]),
    goodToKnow:
      'Run the compatibility scan in the portal before spoofing. Create a Windows restore point first. Verify identifiers changed after a cold reboot before launching Valorant.',
    limitations:
      'Spoofing does not help account-only Vanguard cases. Never stack two spoof tools. Shared or work PCs may not be suitable. You accept all risk from driver-level changes.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point before running.' },
      { icon: 'reqShieldGuide', text: 'Follow the portal setup guide before launching Valorant after spoofing.' },
      { icon: 'reqWifi', text: 'Stable connection for portal verification tools.' },
    ],
    fullFeatures: [
      'Disk serial profile tools',
      'MAC address rotation',
      'Restore point checklist',
      'Compatibility scan',
      'Driver conflict detection',
      'Post-spoof verification',
      'Identifier diff report',
      'Cold reboot guide',
      'Portal step-by-step workflow',
      'Discord recovery support',
    ],
    overview: {
      title: 'Built around a clear hardware recovery workflow',
      paragraphs: [
        'The HWID Spoofer helps Valorant players recover when Vanguard flags PC hardware but the Riot Client account is still clean. Disk and MAC profile tools ship with a restore-point checklist, compatibility scan, and post-spoof verification steps.',
        'Use this path when fresh accounts fail instantly on one machine but work elsewhere—not for account-only Vanguard cases. After spoof, load a conservative cheat profile from cheatsvalo.org before queuing ranked.',
      ],
    },
  },
  ugc: {
    images: utilitySlides('ugc', [
      {
        file: 'ugc-gallery-1',
        alt: 'UGC appeal workspace with case timeline and documentation',
        caption: 'Appeal workspace',
        captionDesc: 'Track restriction cases, upload evidence, and follow templated dispute steps.',
      },
    ]),
    goodToKnow:
      'Gather order email, platform account details and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
    limitations:
      'UGC does not guarantee account restoration. Results vary by case type. Permanent Vanguard bans may require a new account path instead of appeal.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email used at checkout on cheatsvalo.org or at checkout on cheatsvalo.org.' },
      { icon: 'reqShieldAccount', text: 'Account details and ban or restriction notification if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for Discord support and case dashboard.' },
    ],
    fullFeatures: [
      'Custom appeal workflows',
      'Restriction dispute automation',
      'Case documentation templates',
      'Status tracking dashboard',
      'Identity verification guide',
      'Evidence upload structure',
      'Timeline tracker',
      'Follow-up response templates',
      'Multi-platform support',
    ],
    overview: {
      title: 'Built around account recovery and appeal workflows',
      paragraphs: [
        'UGC (Unban & Governance Control) helps you recover restricted gaming, social and marketplace accounts with structured appeal workflows and automation—not instant unban guarantees.',
        'Build custom dispute paths, track case status and rebuild your presence with smart restriction-management tools. Support walks you through each step via Discord when you need hands-on help.',
      ],
    },
  },
  'unlock-all': {
    images: utilitySlides('unlock-all', [
      {
        file: 'skin-changer-product',
        alt: 'Valorant skin changer local bundle preview screen',
        caption: 'Skin preview',
        captionDesc: 'Browse weapon and agent finishes locally on your client—other players see your real loadout.',
      },
    ]),
    goodToKnow:
      'Unlock All previews cosmetics locally on your client. Other players in your lobby see your real inventory—not preview skins. Included with Elite tier.',
    limitations:
      'Local preview only—does not modify Riot Client inventory or store state. Other players cannot see previewed bundles or finishes.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with Valorant installed via Riot Client.' },
      { icon: 'reqShieldGuide', text: 'Follow the portal setup guide before launching Valorant with preview skins enabled.' },
      { icon: 'reqWifi', text: 'Internet for portal updates and config sync.' },
    ],
    fullFeatures: [
      'Weapon skin preview',
      'Agent skin bundles',
      'Buddy & finisher preview',
      'Crosshair theme presets',
      'Favorites list',
      'Loadout export',
      'Local-only display',
      'Restore default loadout',
    ],
    overview: {
      title: 'Built around a local cosmetic preview workflow',
      paragraphs: [
        'Unlock All lets you browse weapon skins, agent bundles, and buddies locally in Valorant—searchable catalog, favorites, and loadout export without modifying live Riot Client purchases.',
        'Cosmetics display on your client for testing and content creation. Other players see your actual inventory, not preview skins. Included with Elite tier selection; available standalone for cosmetic preview without combat modules.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName = cheat.title;
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

/** Four catalog cards: merged Valo Cheats + three utilities. */
export const catalogProductPages = productPages;

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

const cheatsHubSlides = slide('gpScripts', 'gpAutoKill', 'gpFarmBot');

export const heroSlides = slide(
  'gpMapHack',
  'gpScripts',
  'gpZoomHack',
  'gpSkinChanger',
  'gpAutoKill',
  'gpFarmBot',
  'gpHeroEsp',
);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description: 'Elite valorant cheats, HWID spoofer, UGC recovery, and cosmetic utilities for Valorant on PC.',
  buyUrl: checkoutPath('valorant'),
};
