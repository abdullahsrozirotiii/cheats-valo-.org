export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function buildThreadReplies(tip: string, detail: string): ForumComment[] {
  const authors = ['neon_main', 'sage_lane', 'viper_lineups', 'chamber_hold', 'fade_info', 'kay_o_scan', 'jett_peek'];
  const ages = ['1h ago', '2h ago', '3h ago', '4h ago', '5h ago', '6h ago', '7h ago'];
  const bodies = [
    tip,
    detail,
    'Going to try this in Practice Range tonight before I queue unrated.',
    'Last patch my overlay felt off—status banner said wait, good reminder.',
    'Saved the guide link. The portal steps are clearer than random Discord paste.',
    'Small thing: I keep one ranked preset and one deathmatch preset, easier to A/B.',
    'Appreciate answers that stay on Valorant instead of generic copy-paste.',
  ];
  return bodies.map((body, i) => ({
    author: authors[i]!,
    age: ages[i]!,
    score: Math.max(4, 22 - i * 3),
    body,
  }));
}

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
}): ForumPost {
  const { answer, detail, tip, ...post } = input;
  const comments = buildThreadReplies(tip, detail);
  return {
    ...post,
    author: 'guide_team',
    age: '2 days ago',
    commentsCount: comments.length,
    upvotes: input.upvotes,
    flair: 'Guide Q&A',
    body: [answer, detail],
    comments,
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'what-does-valorant-esp-include', title: 'What does map awareness include in the guide?', upvotes: 73,
    excerpt: 'What Lite ESP shows in Valorant—agents through smokes, spike info, and last-seen on radar.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Valorant ESP setup guide', sourcePath: '/blog/valorant-esp-setup/',
    answer: 'The guide covers agent ESP, distance tags, ability cooldown hints, and smoke-wide silhouettes when configured lightly.',
    detail: 'It recommends starting with a restrained layout and enabling only the information you can read comfortably during a team fight.',
    tip: 'Keep the overlay uncluttered: begin with the core indicators, then adjust the range and visibility settings one at a time.',
  }),
  guideDiscussion({
    slug: 'how-to-set-up-map-overlay', title: 'How should I set up the map overlay for the first time?', upvotes: 58,
    excerpt: 'Start with the basic display options, confirm the overlay in a practice session, then adjust one setting at a time.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Valorant map hack setup guide', sourcePath: '/blog/valorant-esp-setup/',
    answer: 'Use the setup guide to enable the overlay, choose readable colors, and check that the indicators do not cover important parts of the game interface.',
    detail: 'Test your layout in a bot lobby before relying on it in a live match. A simple configuration is easier to understand than turning on every option immediately.',
    tip: 'If the screen feels crowded, reduce the number of indicators before changing their size or position.',
  }),
  guideDiscussion({
    slug: 'what-zoom-settings-are-comfortable', title: 'What camera zoom settings are comfortable to play with?', upvotes: 44,
    excerpt: 'The FOV guide focuses on wider context without hurting crosshair control.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Valorant radar & FOV guide', sourcePath: '/blog/valorant-radar-hack-guide/',
    answer: 'There is no single ideal FOV for every player. The guide recommends adjusting gradually and checking that you can still track agents, ability ranges, and duels.',
    detail: 'Keep a quick reset to the default FOV available so you can compare the wider view and return to familiar framing.',
    tip: 'Change one step at a time and play a short Deathmatch before settling on a new FOV.',
  }),
  guideDiscussion({
    slug: 'how-to-tune-script-delay-settings', title: 'How do delay settings affect aimbot and triggerbot?', upvotes: 32,
    excerpt: 'A practical question about timing, combo readability, and why the scripts guide recommends conservative tuning.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Valorant scripts for ranked MMR', sourcePath: '/blog/valorant-aimbot-ranked-guide/',
    answer: 'Delay settings control the spacing between automated actions. The guide recommends starting with slower timings and testing them in a practice setting before making changes.',
    detail: 'A consistent sequence is easier to review and tune than changing several timing values at once.',
    tip: 'Keep a note of each configuration you try so you can return to the last setup that behaved as expected.',
  }),
  guideDiscussion({
    slug: 'how-to-practice-auto-combos', title: 'What is a good way to tune triggerbot safely?', upvotes: 29,
    excerpt: 'Use Unrated, start with high delay, and watch the killfeed before Competitive.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Valorant triggerbot config', sourcePath: '/blog/valorant-triggerbot-config/',
    answer: 'Pick one rifle and one map to practice at a time. The guide walks through delay, hitbox priority, and when to disable triggerbot on pistols.',
    detail: 'Unrated lets you repeat rounds and see which settings feel natural without the pressure of full MMR swings.',
    tip: 'Test manual bursts first; that makes it much easier to spot when trigger delay is too aggressive.',
  }),
  guideDiscussion({
    slug: 'what-is-in-the-elite-tier', title: 'What additional tools are included in the Elite tier?', upvotes: 67,
    excerpt: 'The Elite guide explains how its extra utility modules compare with the Lite and Pro feature sets.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Valorant Elite tier guide', sourcePath: '/blog/valorant-elite-tier-guide/',
    answer: 'The guide describes Elite as including the Lite and Pro feature sets plus priority Vanguard patches, advanced macro slots, and Unlock All cosmetic preview.',
    detail: 'It also covers who may benefit from the extra modules and why it makes sense to understand the simpler feature set first.',
    tip: 'Compare the included features against your needs before choosing a tier; the full comparison is linked in the guide.',
  }),
  guideDiscussion({
    slug: 'how-do-lite-and-pro-differ', title: 'How do Lite and Pro differ in practice?', upvotes: 53,
    excerpt: 'Lite centers on awareness features, while Pro adds aimbot and triggerbot; here is the short version.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Valorant Lite vs Pro: which tier fits you', sourcePath: '/blog/valorant-lite-vs-pro/',
    answer: 'The comparison guide describes Lite as focused on ESP, radar, spike info, and stream-proof overlays. Pro adds aimbot, triggerbot, and recoil help on top of that foundation.',
    detail: 'The right choice depends on whether you need map information alone or also want the additional script modules described in the comparison.',
    tip: 'Use the full side-by-side comparison to check specific modules before making a decision.',
  }),
  guideDiscussion({
    slug: 'what-to-know-about-skin-changer', title: 'What should I know about the Skin Changer utility?', upvotes: 38,
    excerpt: 'The product guide explains how cosmetic previews work and what to expect from the utility.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Valorant Skin Changer guide', sourcePath: '/blog/valorant-skin-changer-guide/',
    answer: 'The guide describes Skin Changer as a local cosmetic preview utility. It explains setup, supported options, and how to restore the default appearance.',
    detail: 'Review the compatibility notes and follow the current setup instructions before using the utility.',
    tip: 'Cosmetic changes are local previews; check the guide for current limitations and setup steps.',
  }),
  guideDiscussion({
    slug: 'what-to-do-if-vac-cannot-verify', title: 'What should I do if Vanguard cannot verify my Valorant install?', upvotes: 24,
    excerpt: 'Start with Riot Client file verification and a clean restart before assuming the issue is an account restriction.',
    category: 'Patch Talk', categoryTone: 'orange', sourceTitle: 'Riot Anti-Cheat unable to verify Valorant', sourcePath: '/blog/vanguard-anti-cheat-errors/',
    answer: 'The troubleshooting guide says the message can result from game-file problems or software conflicts and does not always mean an account ban. First verify Valorant files through the Riot Client.',
    detail: 'It also recommends fully exiting the Riot Client, restarting the PC, and checking for conflicting overlays before trying more disruptive steps.',
    tip: 'Test a normal Riot Client launch before starting other software so you can narrow down the cause.',
  }),
  guideDiscussion({
    slug: 'how-does-an-external-loader-work', title: 'What does “external loader” mean?', upvotes: 46,
    excerpt: 'The external software guide explains the term and outlines the general setup described on the site.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Valorant external cheat guide', sourcePath: '/blog/valorant-external-cheat-guide/',
    answer: 'The article uses “external” to describe software that runs separately from the Valorant process and presents its interface as an overlay.',
    detail: 'It discusses the architecture at a high level and explains setup, patch updates, and the differences described between external and internal tools.',
    tip: 'Check compatibility and current status information whenever Valorant receives an update.',
  }),
  guideDiscussion({
    slug: 'how-to-check-stream-proof-capture', title: 'How can I check whether OBS captures an overlay?', upvotes: 21,
    excerpt: 'The stream-proof setup guide recommends recording a short test and checking the playback before streaming.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Stream-proof overlay setup for Valorant', sourcePath: '/blog/valorant-stream-proof-setup/',
    answer: 'Record a short local test with the exact OBS scene and capture mode you plan to use, then review the playback for any overlay elements.',
    detail: 'The guide recommends testing game capture and display capture separately, since capture methods and multi-monitor setups can behave differently.',
    tip: 'Do not rely on the preview alone; review a saved recording from the same scene you intend to stream.',
  }),
  guideDiscussion({
    slug: 'what-to-do-after-hwid-change', title: 'What should I check after changing PCs or hardware?', upvotes: 33,
    excerpt: 'The HWID guide covers common setup checks and when to contact support for an account or device reset.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Valorant HWID spoofer after ban', sourcePath: '/blog/valorant-hwid-spoofer-after-ban/',
    answer: 'Start by checking the account and device instructions for your product. The guide explains common HWID questions and when a reset request may be needed.',
    detail: 'Avoid changing several system settings at once. If the product does not recognize your device, contact support with the relevant error details.',
    tip: 'Use the official support path for device resets instead of relying on unrelated third-party tools.',
  }),
  guideDiscussion({
    slug: 'what-to-check-before-installing-tools', title: 'What should I review before installing a new tool?', upvotes: 18,
    excerpt: 'Check the official setup steps, current compatibility notes, and support information before proceeding.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'Valorant cheats features guide', sourcePath: '/blog/valorant-cheats-features-guide/',
    answer: 'Read the feature and setup information first, confirm that it matches your system, and check the current update/status notes.',
    detail: 'The site guide describes the available feature groups and links to more specific setup articles for individual modules.',
    tip: 'Use the linked product and support pages as the source of truth for current availability and compatibility.',
  }),
  guideDiscussion({
    slug: 'how-to-choose-valorant-product-tier', title: 'How do I choose the right Valorant product tier?', upvotes: 48,
    excerpt: 'Compare the feature sets first, then follow the official checkout and setup instructions for your selection.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'How to buy Valorant cheats in 2026', sourcePath: '/blog/how-to-buy-valorant-cheats-2026/',
    answer: 'The buying guide recommends comparing included features and choosing the tier that fits your needs before continuing through the official checkout.',
    detail: 'It covers the purchase flow, account access, downloading the current build, and checking setup instructions before launching.',
    tip: 'If you have a payment or account question, use the site support page and avoid sharing purchase details publicly.',
  }),
];

export const forumPosts: ForumPost[] = [
  {
    slug: 'can-practice-range-cheats-be-used-in-ranked', category: 'General', categoryTone: 'purple',
    title: 'Does Practice Range training carry into Competitive?',
    excerpt: 'Crosshair drills and lineups in Practice Range do not change ranked rules—third-party tools are a separate topic.',
    author: 'guide_team', age: '2 hours ago', commentsCount: 7, upvotes: 128, flair: 'Guide Q&A',
    sourceTitle: 'Valorant practice mode guide', sourcePath: '/blog/valorant-practice-mode-guide/',
    body: [
      'No. Anything you toggle in Practice Range or custom games stays there. Competitive still runs on Riot servers with Vanguard.',
      'Use the range to warm up sens and recoil. If you use external overlays or aim assists, that is outside normal practice settings—see our buying guide for how tiers work on PC.',
    ],
    comments: buildThreadReplies(
      'I only use range for 10 min before ranked. Good to know it does not affect matchmaking.',
      'The guide also mentions checking the status banner after patches—Vanguard updates are no joke.',
    ),
  },
  {
    slug: 'how-to-use-valorant-practice-range', category: 'General', categoryTone: 'purple',
    title: 'Best way to use Practice Range before Competitive?',
    excerpt: 'Warm-up routine from the guide: bots, spray wall, then one unrated if you are testing new sens.',
    author: 'guide_team', age: '4 hours ago', commentsCount: 7, upvotes: 86, flair: 'Guide Q&A',
    sourceTitle: 'How to use Valorant Practice Range', sourcePath: '/blog/how-to-use-valorant-practice-range/',
    body: [
      'The guide recommends bots on medium, then spray transfer drills, then spike plant practice if you entry. Keeps it under 15 minutes so you are not tilted before ranked.',
      'If you changed DPI or crosshair, do not jump straight into Competitive—one Deathmatch confirms the feel.',
    ],
    comments: buildThreadReplies(
      'I do 50 kills on bots then DM. Simple but works.',
      'Crosshair copy section in the guide helped me stop overthinking color.',
    ),
  },
  {
    slug: 'practice-valorant-lineups-safely', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'How do you practice smokes without wasting ranked time?',
    excerpt: 'Custom game + lineup markers from the crosshair settings guide.',
    author: 'guide_team', age: '6 hours ago', commentsCount: 7, upvotes: 64, flair: 'Guide Q&A',
    sourceTitle: 'Valorant crosshair & lineup tips', sourcePath: '/blog/valorant-crosshair-settings-tips/',
    body: [
      'Load a custom game on the map you play most, walk the spots from the guide, and throw smokes with the same crosshair you use in ranked.',
      'Film a 30s clip or screenshot the pixel gap so you remember the lineup after patches shuffle textures.',
    ],
    comments: buildThreadReplies(
      'Ascent mid smoke finally consistent after this.',
      'Static crosshair color matters more than I thought for lineup anchors.',
    ),
  },
  {
    slug: 'what-to-check-after-valorant-patch', category: 'Patch Talk', categoryTone: 'orange',
    title: 'What should I check before playing after a Valorant patch?',
    excerpt: 'The patch-day checklist: status banner, loader update, Deathmatch smoke test.',
    author: 'guide_team', age: '9 hours ago', commentsCount: 7, upvotes: 42, flair: 'Guide Q&A',
    sourceTitle: 'Vanguard patch day checklist', sourcePath: '/blog/vanguard-patch-day-checklist/',
    body: [
      'Read cheatsvalo.org status and Discord #status. Download the portal build, run one Deathmatch, then Competitive.',
      'If overlays glitch after Vanguard bumps kernel driver, stop and wait for the notes—do not stack random fixes.',
    ],
    comments: buildThreadReplies(
      'Waited 6 hours after patch last act—boring but account still clean.',
      'Checklist is short enough I actually follow it now.',
    ),
  },
  {
    slug: 'valorant-lite-or-pro-aimbot', category: 'Community', categoryTone: 'green',
    title: 'Lite or Pro: when do you actually need aimbot?',
    excerpt: 'Lite = ESP only. Pro adds aimbot/triggerbot per the comparison guide.',
    author: 'guide_team', age: '12 hours ago', commentsCount: 7, upvotes: 31, flair: 'Guide Q&A',
    sourceTitle: 'Valorant Lite vs Pro', sourcePath: '/blog/valorant-lite-vs-pro/',
    body: [
      'Lite is for players who only want info—wallhack, spike timer, radar. Pro is when you want help on crosshair placement but still use humanized delays.',
      'Elite is separate in the portal after checkout; this thread is just Lite vs Pro.',
    ],
    comments: buildThreadReplies(
      'Stuck on Lite for two weeks, upgraded after I trusted my game sense.',
      'Comparison table on the blog is the clearest tier breakdown I found.',
    ),
  },
  {
    slug: 'how-to-tune-triggerbot-in-unrated', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'Any tips for testing triggerbot settings safely?',
    excerpt: 'Use unrated first, lower fire delay, watch killfeed—notes from the triggerbot guide.',
    author: 'guide_team', age: '1 day ago', commentsCount: 7, upvotes: 27, flair: 'Guide Q&A',
    sourceTitle: 'Valorant triggerbot config', sourcePath: '/blog/valorant-triggerbot-config/',
    body: [
      'Start with trigger delay high and headshot-only off while you learn spray. The guide walks through Vandal vs Phantom feel.',
      'Stream-proof toggle matters if you clip for friends—test OBS like the stream-proof article says.',
    ],
    comments: buildThreadReplies(
      'Unrated only until my shots looked normal on replay.',
      'Lowered delay one notch per session instead of maxing day one.',
    ),
  },
  ...additionalGuidePosts,
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
