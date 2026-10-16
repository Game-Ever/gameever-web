// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gameeverstudio.com',
  trailingSlash: 'always',
  redirects: { '/': '/en/' },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('gameeverstudio.com/'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
    }),
  ],
});
