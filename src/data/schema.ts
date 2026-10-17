import { SITE, BUSINESS_ID, WEBSITE_ID, FOUNDER_ID } from './site';

// Alleen gegevens die ook zichtbaar op de site staan. Geen reviews: Google toont geen sterren
// voor reviews die een bedrijf over zichzelf publiceert (Review snippet-richtlijnen).
export const businessNode = {
  // ProfessionalService is een LocalBusiness- en dus Organization-subtype; Organization erbij voor tools die geen subtypes herkennen.
  '@type': ['ProfessionalService', 'Organization'],
  '@id': BUSINESS_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  alternateName: 'STATO Plaatsbeschrijvingen',
  description:
    'STATO maakt gedetailleerde ingaande en uitgaande plaatsbeschrijvingen, huurchecks en controles van uitgevoerde werken voor particulieren, verhuurders en vastgoedkantoren in Limburg en Vlaams-Brabant.',
  url: `${SITE.url}/`,
  logo: `${SITE.url}/logo-stato.png`,
  image: `${SITE.url}${SITE.ogImage}`,
  telephone: SITE.phone,
  email: SITE.email,
  vatID: SITE.vat,
  sameAs: SITE.profiles.map((p) => p.url),
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    postalCode: SITE.address.postalCode,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  areaServed: SITE.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
  founder: { '@id': FOUNDER_ID },
  knowsAbout: [
    'Plaatsbeschrijving',
    'Ingaande plaatsbeschrijving',
    'Uitgaande plaatsbeschrijving',
    'Huurcheck',
    'Vlaams Woninghuurdecreet',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Diensten van STATO',
    itemListElement: [
      ['ingaande-plaatsbeschrijving', 'Ingaande plaatsbeschrijving'],
      ['uitgaande-plaatsbeschrijving', 'Uitgaande plaatsbeschrijving'],
      ['huurcheck', 'Huurcheck'],
      ['opvolging-van-werken', 'Opvolging van werken'],
    ].map(([id, name]) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', '@id': `${SITE.url}/onze-diensten#${id}`, name },
    })),
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: SITE.phone,
    email: SITE.email,
    availableLanguage: 'nl',
    areaServed: 'BE',
  },
};

export const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE.url}/`,
  name: SITE.name,
  alternateName: ['STATO Plaatsbeschrijvingen', 'Stato'],
  inLanguage: 'nl-BE',
  publisher: { '@id': BUSINESS_ID },
};

export const founderNode = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: SITE.founder,
  jobTitle: 'Oprichter en plaatsbeschrijver',
  worksFor: { '@id': BUSINESS_ID },
  url: `${SITE.url}/over-stato`,
};

export function serviceNode(id: string, name: string, description: string, path = '/onze-diensten') {
  return {
    '@type': 'Service',
    '@id': `${SITE.url}${path}#${id}`,
    name,
    serviceType: name,
    description,
    provider: { '@id': BUSINESS_ID },
    areaServed: SITE.areaServed.map((n) => ({ '@type': 'AdministrativeArea', name: n })),
    url: `${SITE.url}${path}#${id}`,
  };
}

export function faqNode(path: string, items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE.url}${path === '/' ? '/' : path}#faq`,
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a.replace(/<[^>]+>/g, '') },
    })),
  };
}
