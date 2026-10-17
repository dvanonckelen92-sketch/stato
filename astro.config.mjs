// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'node:child_process';

export default defineConfig({
  site: 'https://www.stato.be',
  // Zelfde URL's als de oude site (/over-stato, geen slash achteraan): geen redirects nodig.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Eén kleine stylesheet: inline in de HTML, dus geen render-blocking request.
    inlineStylesheets: 'always',
  },
  image: {
    responsiveStyles: true,
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Jost',
      cssVariable: '--font-heading',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Century Gothic', 'Futura', 'sans-serif'],
      display: 'swap',
    },
  ],
  integrations: [
    sitemap({
      // Google negeert priority en changefreq; bedankpagina en 404 horen niet in de sitemap.
      filter: (page) => !page.includes('/bedankt') && !page.includes('/404'),
      // lastmod = laatste commit van de paginabron, zodat de datum klopt (Google gebruikt hem alleen als hij juist is).
      serialize(item) {
        const slug = new URL(item.url).pathname.replace(/^\/|\/$/g, '') || 'index';
        try {
          const date = execSync(`git log -1 --format=%cI -- src/pages/${slug}.astro`, { encoding: 'utf8' }).trim();
          if (date) item.lastmod = date;
        } catch {}
        return item;
      },
    }),
  ],
});
