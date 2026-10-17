import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

// Google Search gebruikt llms.txt niet (helpt noch schaadt); andere AI-diensten kunnen het wel lezen.
export const GET: APIRoute = () => {
  const u = (p: string) => `${SITE.url}${p}`;
  const body = `# STATO: gedetailleerde plaatsbeschrijvingen

> STATO (${SITE.legalName}) maakt ingaande en uitgaande plaatsbeschrijvingen, huurchecks en controles van uitgevoerde werken voor particulieren, verhuurders, huurders en vastgoedkantoren in Limburg en Vlaams-Brabant. Gevestigd in Sint-Truiden. Oprichter: ${SITE.founder}.

- Vaste prijs per type en grootte van het pand (studio, appartement, woning, garage, staanplaats, handelspand); prijs vooraf via offerte.
- Het tarief omvat zowel de intredende als de uitgaande plaatsbeschrijving. Geen extra verplaatsingskosten op basis van de locatie.
- Verslag indien gewenst digitaal binnen 24 uur na het plaatsbezoek; facturatie samen met de oplevering.
- Meterstanden (water, gas, elektriciteit) en rookmelders worden standaard opgenomen.
- Voor vastgoedkantoren: planning met huurder en verhuurder, rechtstreekse facturatie, ook als back-up plaatsbeschrijver.
- Contact: ${SITE.phoneDisplay} · ${SITE.email} · ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city} · ondernemingsnummer ${SITE.vat}

## Pagina's

- [Plaatsbeschrijving in Limburg en Vlaams-Brabant](${u('/')}): overzicht, aanpak, opbouw van het verslag, veelgestelde vragen
- [Onze diensten](${u('/onze-diensten')}): ingaande en uitgaande plaatsbeschrijving, huurcheck, opvolging van werken
- [Tarieven en werkwijze](${u('/tarieven-werkwijze')}): hoe de vaste prijzen werken, oplevering en facturatie
- [Vastgoedprofessionals](${u('/vastgoedprofessionals')}): uitbesteding en back-up voor vastgoedkantoren
- [Over STATO](${u('/over-stato')}): oprichter Pieter Wolfs
- [Vrijblijvende offerte](${u('/vrijblijvende-offerte')}): prijs aanvragen
- [Voorbeeldverslag (pdf)](${u(SITE.sampleReport)}): opbouw van een STATO-verslag, zonder privégegevens
- [Algemene voorwaarden](${u('/algemene-voorwaarden')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
