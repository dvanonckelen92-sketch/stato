// Eenmalig: maakt favicon-PNG's, het logo voor structured data en de OG-afbeelding.
// Draaien met: node scripts/make-static-images.mjs
import sharp from 'sharp';
import fs from 'node:fs';

const icon = fs.readFileSync('public/favicon.svg');
await sharp(icon, { density: 600 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(icon, { density: 600 }).resize(512, 512).png().toFile('public/icon-512.png');
await sharp(icon, { density: 600 }).resize(32, 32).png().toFile('public/favicon-32.png');

const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<rect width="600" height="600" fill="#fff"/>
<g transform="translate(220 110) scale(2.5)" fill="none" stroke-width="4">
<path d="M12 57V24L32 8l20 16v22L42 57z" stroke="#013673"/><path d="M42 57V46h10" stroke="#013673"/>
<path d="M18 28.5l3 3 5-5M18 37.5l3 3 5-5M18 46.5l3 3 5-5" stroke="#d39c4f" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M30 29h14M30 38h14M30 47h14" stroke="#013673" stroke-width="3.2"/></g>
<text x="300" y="345" text-anchor="middle" font-family="Century Gothic, Futura, Arial, sans-serif" font-size="104" letter-spacing="26" fill="#013673">STATO</text>
<rect x="282" y="365" width="40" height="8" fill="#d39c4f"/></svg>`;
await sharp(Buffer.from(logo)).png().toFile('public/logo-stato.png');

const photo = await sharp('src/assets/foto/plaatsbeschrijver-fotografeert-keuken.jpg').resize(1200, 630, { fit: 'cover', position: 'right' }).toBuffer();
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#14113a" stop-opacity=".97"/><stop offset=".55" stop-color="#14113a" stop-opacity=".88"/><stop offset="1" stop-color="#3e2f9d" stop-opacity=".15"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<g transform="translate(72 70) scale(1.1)" fill="none" stroke-width="4"><path d="M12 57V24L32 8l20 16v22L42 57z" stroke="#fff"/><path d="M42 57V46h10" stroke="#fff"/><path d="M18 28.5l3 3 5-5M18 37.5l3 3 5-5" stroke="#d39c4f" stroke-width="3.2" stroke-linecap="round"/><path d="M30 29h14M30 38h14" stroke="#fff" stroke-width="3.2"/></g>
<text x="160" y="128" font-family="Century Gothic, Arial, sans-serif" font-size="44" letter-spacing="12" fill="#fff">STATO</text>
<text x="72" y="300" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="62" fill="#fff">Gedetailleerde</text>
<text x="72" y="375" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="62" fill="#fff">plaatsbeschrijvingen</text>
<rect x="72" y="410" width="90" height="6" fill="#d39c4f"/>
<text x="72" y="475" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#e6e3f6">Limburg en Vlaams-Brabant · Verslag binnen 24 uur mogelijk</text>
</svg>`;
fs.mkdirSync('public/og', { recursive: true });
await sharp(photo).composite([{ input: Buffer.from(overlay) }]).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og/stato-plaatsbeschrijving.jpg');
console.log('ok');
