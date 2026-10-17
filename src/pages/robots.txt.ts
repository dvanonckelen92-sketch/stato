import type { APIRoute } from 'astro';

// Alles mag gecrawld worden, ook door AI-zoekmachines. De bedankpagina heeft noindex (geen Disallow, anders ziet Google die niet).
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site).href}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
