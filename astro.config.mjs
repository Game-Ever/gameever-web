// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production defaults to gameeverstudio.com at the root. Preview deployments (GitHub Pages)
// set SITE_URL and BASE_PATH, e.g. https://game-ever.github.io + /gameever-web.
export default defineConfig({
  site: process.env.SITE_URL || 'https://gameeverstudio.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Skip the root redirect page and the /v2/ design comparison pages.
      filter: (page) => /\/(en|es)\//.test(page) && !page.includes('/v2/'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
    }),
  ],
});
