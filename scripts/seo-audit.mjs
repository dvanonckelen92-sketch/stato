// Statische SEO-controle van dist/: titels, descriptions, h1, canonicals, JSON-LD, interne links.
// Draaien na de build: node scripts/seo-audit.mjs
import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const pages = fs.readdirSync(dist).filter((f) => f.endsWith('.html'));
const exists = (href) => {
  const p = href.split('#')[0].split('?')[0];
  if (p === '/' || p === '') return true;
  return [p, p + '.html', path.join(p, 'index.html')].some((c) => fs.existsSync(path.join(dist, c)));
};
const inbound = {};
let problems = 0;
for (const f of pages) {
  const h = fs.readFileSync(path.join(dist, f), 'utf8');
  const title = h.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const canon = h.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  const ld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
    try { return JSON.parse(m[1])['@graph'].map((n) => n['@type']).join(','); } catch { problems++; return 'ONGELDIG'; }
  });
  const links = [...h.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]).filter((l) => !l.startsWith('/_astro') && !/\.(svg|png|ico)$/.test(l));
  const dead = [...new Set(links.filter((l) => !exists(l)))];
  for (const l of new Set(links.map((l) => l.split('#')[0]))) inbound[l] = (inbound[l] || 0) + 1;
  const noAlt = (h.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length;
  const warn = [];
  if (title.length < 30 || title.length > 62) warn.push(`title ${title.length}`);
  if (desc.length < 110 || desc.length > 165) warn.push(`desc ${desc.length}`);
  if (h1 !== 1) warn.push(`h1 x${h1}`);
  if (dead.length) warn.push(`dode links: ${dead.join(' ')}`);
  if (noAlt) warn.push(`img zonder alt: ${noAlt}`);
  problems += warn.length;
  console.log(`\n${f}\n  title (${title.length}): ${title}\n  desc  (${desc.length}): ${desc}\n  canonical: ${canon}\n  schema: ${ld.join(' | ')}\n  ${warn.length ? 'LET OP: ' + warn.join('; ') : 'ok'}`);
}
console.log('\nInterne links per pagina (aantal pagina\'s die ernaar linken):');
for (const [k, v] of Object.entries(inbound).sort((a, b) => b[1] - a[1])) console.log(`  ${v}  ${k}`);
console.log(`\n${problems} aandachtspunt(en).`);
