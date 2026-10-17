// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
    }),
  ],
});
