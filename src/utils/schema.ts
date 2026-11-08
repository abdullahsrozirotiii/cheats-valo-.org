import type { FaqItem } from '../i18n/types';
import { SUPPORT_EMAIL } from '../config/site';
import {
  SITE_ORIGIN,
  absoluteAssetUrl,
  absoluteShareImageUrl,
  canonicalUrl,
  getOrganizationSameAs,
} from '../config/seo';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CheatsValo',
    url: `${SITE_ORIGIN}/`,
    inLanguage: 'en-US',
    description:
      'Valorant cheats with scripts, map hack, zoom hack, Skin Changer and ranked-safe tiers for PC.',
  };
}

export function organizationSchema() {
  const sameAs = getOrganizationSameAs();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CheatsValo',
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/apple-touch-icon.png`,
    email: SUPPORT_EMAIL,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        url: canonicalUrl('/support/'),
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
      },
    ],
  };
}

export function collectionPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'CheatsValo',
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function webPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'CheatsValo',
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.url),
    })),
  };
}

export function discussionForumPostingSchema(input: {
  name: string;
  text: string;
  url: string;
  author: string;
  comments: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: input.name,
    articleBody: input.text,
    url: canonicalUrl(input.url),
    author: { '@type': 'Person', name: input.author },
    commentCount: input.comments,
    isPartOf: { '@type': 'CollectionPage', name: 'CheatsValo Community Forum', url: canonicalUrl('/forum/') },
  };
}

function offerUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return canonicalUrl(path);
}

export function productSchema(input: {
  name: string;
  description: string;
  url: string;
  offerUrl: string;
  image?: string;
  sku?: string;
  /** USD list prices for schema Offer / AggregateOffer. */
  priceUsd?: number[];
}) {
  const prices = (input.priceUsd ?? []).filter((n) => Number.isFinite(n) && n > 0);
  const seller = {
    '@type': 'Organization' as const,
    name: 'CheatsValo',
  };
  const checkout = offerUrl(input.offerUrl);

  let offers: Record<string, unknown>;
  if (prices.length === 0) {
    offers = {
      '@type': 'Offer',
      url: checkout,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller,
    };
  } else if (prices.length === 1) {
    offers = {
      '@type': 'Offer',
      url: checkout,
      price: prices[0],
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller,
    };
  } else {
    offers = {
      '@type': 'AggregateOffer',
      url: checkout,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      priceCurrency: 'USD',
      offerCount: prices.length,
      availability: 'https://schema.org/InStock',
      seller,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    sku: input.sku ?? input.url.replace(/\//g, '-'),
    brand: {
      '@type': 'Brand',
      name: 'CheatsValo',
    },
    ...(input.image ? { image: absoluteShareImageUrl(input.image) } : {}),
    offers,
  };
}

/** @deprecated Prefer productSchema for product/cheat detail pages. */
export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  offerUrl?: string;
}) {
  return productSchema({
    name: input.name,
    description: input.description,
    url: input.url,
    offerUrl: input.offerUrl ?? input.url,
    image: input.image,
  });
}

export function articleSchema(input: {
  name: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    image: absoluteShareImageUrl(input.image),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: 'CheatsValo',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CheatsValo',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/apple-touch-icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl(input.url),
    },
  };
}

export function parseBlogDate(date: string): string {
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) return new Date().toISOString().slice(0, 10);
  return new Date(parsed).toISOString().slice(0, 10);
}
