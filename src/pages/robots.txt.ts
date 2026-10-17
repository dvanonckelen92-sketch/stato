import type { APIRoute } from 'astro';

// Alles mag gecrawld worden, ook door AI-zoekmachines. De bedankpagina heeft noindex (geen Disallow, anders ziet Google die niet).
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Allow: /

# AI-zoekmachines en -assistenten uitdrukkelijk toegelaten
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Google-Extended
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site).href}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
