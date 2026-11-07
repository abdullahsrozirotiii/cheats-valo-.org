import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

const siteOrigin = (process.env.SITE ?? 'https://cheatsvalo.org').replace(/\/$/, '');

export default defineConfig({
  site: siteOrigin,
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/valorant-cheats/',
    '/cheats/lite/': '/products/valorant-cheats/',
    '/cheats/pro/': '/products/valorant-cheats/',
    '/cheats/elite/': '/products/valorant-cheats/valo-cheats/',
    '/products/valorant-cheats/lite/': '/products/valorant-cheats/valo-cheats/',
    '/products/valorant-cheats/pro/': '/products/valorant-cheats/valo-cheats/',
    '/products/valorant-cheats/elite/': '/products/valorant-cheats/valo-cheats/',
    '/cheats/compare/': '/blog/valorant-lite-vs-pro/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
