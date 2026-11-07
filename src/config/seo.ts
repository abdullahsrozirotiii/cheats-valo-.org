import { t } from '../i18n';
import { SITE_DOMAIN as INDEXNOW_HOST_NAME } from './site';
import { getPageSeoEntry } from './pageSeo';

function resolveSiteOrigin(): string {
  const fromEnv = import.meta.env.SITE as string | undefined;
  if (fromEnv?.trim()) return fromEnv.replace(/\/$/, '');
  return `https://${t.site.domain}`;
}

export const SITE_ORIGIN = resolveSiteOrigin();

/** True when build targets a non-production host (e.g. Cloudflare *.workers.dev preview). */
export function isPreviewDeployment(): boolean {
  const flag = import.meta.env.PUBLIC_FORCE_NOINDEX as string | undefined;
  if (flag === 'true' || flag === '1') return true;
  try {
    const host = new URL(SITE_ORIGIN).hostname.toLowerCase();
    if (host.endsWith('.workers.dev')) return true;
    if (host !== 'cheatsvalo.org' && host !== 'www.cheatsvalo.org' && !host.endsWith('.cheatsvalo.org')) {
      return host.includes('pages.dev') || host.includes('workers.dev');
    }
  } catch {
    /* ignore */
  }
  return false;
}

export const DEFAULT_OG_IMAGE = '/images/gameplay/valorant-esp-wallhack.png';

export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID as string | undefined;

/** @example @cheatsvalo */
export const TWITTER_SITE = import.meta.env.PUBLIC_TWITTER_SITE as string | undefined;

export const TWITTER_CREATOR = import.meta.env.PUBLIC_TWITTER_CREATOR as string | undefined;

/** Comma-separated profile URLs (X, YouTube, etc.) for Organization sameAs. */
export function getOrganizationSameAs(): string[] {
  const raw = import.meta.env.PUBLIC_ORG_SAME_AS as string | undefined;
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export const INDEXNOW_KEY = import.meta.env.INDEXNOW_KEY as string | undefined;

export function canonicalUrl(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function resolvePageSeo(pathname: string): { title: string; description: string } {
  const entry = getPageSeoEntry(pathname);
  if (entry) return entry;
  return { title: t.site.title, description: t.site.description };
}

export function pageTitle(keyword: string, brand = t.site.name): string {
  const suffix = ` | ${brand}`;
  const max = 60;
  if (`${keyword}${suffix}`.length <= max) return `${keyword}${suffix}`;
  const trimmed = keyword.slice(0, Math.max(20, max - suffix.length - 1)).trim();
  return `${trimmed}${suffix}`;
}

/** SERP-safe meta description (≤155 chars; word-boundary trim). */
export function clampMetaDescription(text: string, maxLen = 155): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLen) return normalized;
  const slice = normalized.slice(0, maxLen - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const trimmed = lastSpace > 60 ? slice.slice(0, lastSpace) : slice;
  return `${trimmed.trimEnd()}…`;
}

export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const RSS_FEED_PATH = '/rss.xml';

/** Used by IndexNow postbuild script. */
export const INDEXNOW_HOST = INDEXNOW_HOST_NAME;
