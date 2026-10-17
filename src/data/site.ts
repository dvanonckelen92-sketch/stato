// Eén bron voor naam, adres en contactgegevens (NAP). Moet identiek zijn aan het Google Bedrijfsprofiel.
export const SITE = {
  url: 'https://www.stato.be',
  name: 'STATO',
  legalName: 'Stato Plaatsbeschrijvingen',
  tagline: 'Gedetailleerde plaatsbeschrijvingen',
  founder: 'Pieter Wolfs',
  email: 'info@stato.be',
  phone: '+32486520270',
  phoneDisplay: '0486 52 02 70',
  vat: 'BE0742579045',
  address: {
    street: 'Driewilgenstraat 30/301',
    postalCode: '3800',
    city: 'Sint-Truiden',
    region: 'Limburg',
    country: 'BE',
  },
  areaServed: ['Limburg', 'Vlaams-Brabant'],
  ogImage: '/og/stato-plaatsbeschrijving.jpg',
  sampleReport: '/voorbeeldverslag-plaatsbeschrijving-stato.pdf',
  // Formulier-endpoint. Standaard Netlify Forms (werkt zonder extra code op Netlify).
  // Andere host? Vervang door de URL van je formulierdienst.
  formAction: '/bedankt',
} as const;

export const NAV = [
  { href: '/onze-diensten', label: 'Diensten' },
  { href: '/tarieven-werkwijze', label: 'Tarieven & werkwijze' },
  { href: '/vastgoedprofessionals', label: 'Vastgoedprofessionals' },
  { href: '/over-stato', label: 'Over STATO' },
] as const;

export const BUSINESS_ID = `${SITE.url}/#business`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const FOUNDER_ID = `${SITE.url}/over-stato#pieter-wolfs`;
