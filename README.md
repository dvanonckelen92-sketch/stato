# stato.be

Website van STATO (Stato Plaatsbeschrijvingen), gebouwd met Astro 7. Statische HTML, geen JavaScript-bundel.

## Commando's

```bash
npm install
npm run dev        # lokaal ontwikkelen op http://localhost:4321
npm run build      # bouwt naar dist/
npm run preview    # bekijkt de build
node scripts/seo-audit.mjs   # controleert titels, descriptions, h1, schema en interne links in dist/
```

## Waar staat wat

- `src/data/site.ts`: naam, adres, telefoon, e-mail, ondernemingsnummer. Eén bron voor de hele site en de structured data. Houd dit gelijk met het Google Bedrijfsprofiel.
- `src/data/faq.ts`: veelgestelde vragen (wettelijke punten met bron Vlaanderen.be).
- `src/data/algemene-voorwaarden.ts`: algemene voorwaarden, letterlijk van de oude site.
- `src/pages/`: één bestand per pagina. De URL's zijn dezelfde als op de oude site.
- `src/assets/foto/`: originele foto's; Astro maakt er AVIF en WebP in de juiste maten van.
- `public/`: favicon, logo, OG-afbeelding, voorbeeldverslag (pdf), `_redirects` en `_headers`.
- `scripts/make-static-images.mjs`: maakt favicon-PNG's, het logo en de OG-afbeelding opnieuw.

## Hosting

Gebouwd voor Netlify of Cloudflare Pages (`_redirects` en `_headers` worden door beide gelezen).
Het offerteformulier gebruikt Netlify Forms. Bij een andere host: pas `formAction` aan in `src/data/site.ts`.

Na livegang: sitemap (`/sitemap-index.xml`) indienen in Google Search Console en het Google Bedrijfsprofiel nakijken.
