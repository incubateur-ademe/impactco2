// https://nextjs.org/docs/app/guides/json-ld

const websiteNode = {
  '@type': 'WebSite',
  '@id': 'https://impactco2.fr/#website',
  url: 'https://impactco2.fr/',
  name: 'Impact CO2',
  inLanguage: 'fr-FR',
  publisher: { '@id': 'https://www.ademe.fr/#organization' },
}

const organizationNode = {
  '@type': 'GovernmentOrganization',
  '@id': 'https://www.ademe.fr/#organization',
  name: 'ADEME',
  url: 'https://www.ademe.fr/',
  description: 'Agence de la transition écologique',
  sameAs: ['https://fr.wikipedia.org/wiki/ADEME'],
}

const outilsBreadcrumbNode = {
  '@type': 'BreadcrumbList',
  '@id': 'https://impactco2.fr/outils#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://impactco2.fr/' },
    { '@type': 'ListItem', position: 2, name: 'Outils', item: 'https://impactco2.fr/outils' },
  ],
}

function buildCollectionPageJsonLd(
  pageId: string,
  url: string,
  name: string,
  description: string,
  datePublished: string = '2024-01-01',
  dateModified: string = '2026-10-01'
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': pageId,
        url,
        name,
        description,
        datePublished,
        dateModified,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': 'https://impactco2.fr/#website' },
        about: { '@id': 'https://www.ademe.fr/#organization' },
        isAccessibleForFree: true,
        breadcrumb: { '@id': 'https://impactco2.fr/outils#breadcrumb' },
      },
      outilsBreadcrumbNode,
      websiteNode,
      organizationNode,
    ],
  }
}

export const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://impactco2.fr/#webpage',
      url: 'https://impactco2.fr/',
      name: 'Impact CO2',
      description:
        "Impact CO2, la boîte à outils gratuite de l'ADEME pour communiquer sur l'impact carbone de façon ludique.",
      datePublished: '2024-01-01',
      dateModified: '2026-10-01',
      inLanguage: 'fr-FR',
      isPartOf: { '@id': 'https://impactco2.fr/#website' },
      about: { '@id': 'https://www.ademe.fr/#organization' },
      primaryImageOfPage: { '@id': 'https://impactco2.fr/#primaryimage' },
      image: { '@id': 'https://impactco2.fr/#primaryimage' },
      breadcrumb: { '@id': 'https://impactco2.fr/#breadcrumb' },
      isAccessibleForFree: true,
      potentialAction: { '@type': 'ReadAction', target: ['https://impactco2.fr/'] },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://impactco2.fr/#website',
      url: 'https://impactco2.fr/',
      name: 'Impact CO2',
      inLanguage: 'fr-FR',
      publisher: { '@id': 'https://www.ademe.fr/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://impactco2.fr/?s={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://impactco2.fr/#webapp',
      name: 'Impact CO2',
      url: 'https://impactco2.fr/',
      applicationCategory: 'EnvironmentalApplication',
      operatingSystem: 'All',
      inLanguage: 'fr-FR',
      isAccessibleForFree: true,
      description: "Outils pour sensibiliser et comprendre l'impact carbone du quotidien.",
      publisher: { '@id': 'https://www.ademe.fr/#organization' },
    },
    {
      '@type': 'GovernmentOrganization',
      '@id': 'https://www.ademe.fr/#organization',
      name: 'ADEME',
      url: 'https://www.ademe.fr/',
      description: 'Agence de la transition écologique',
      sameAs: ['https://fr.wikipedia.org/wiki/ADEME'],
    },
    {
      '@type': 'ImageObject',
      '@id': 'https://impactco2.fr/#primaryimage',
      url: 'https://impactco2.fr/meta/main.png',
      contentUrl: 'https://impactco2.fr/meta/main.png',
      width: 1200,
      height: 630,
      inLanguage: 'fr-FR',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://impactco2.fr/#breadcrumb',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://impactco2.fr/' }],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://impactco2.fr/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Qu'est-ce qu'Impact CO2 ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Impact CO2 est une boîte à outils gratuite proposée par l'ADEME pour sensibiliser et communiquer sur l'impact carbone du quotidien.",
          },
        },
        {
          '@type': 'Question',
          name: 'Les outils Impact CO2 sont-ils gratuits ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, tous les outils proposés par Impact CO2 sont entièrement gratuits et accessibles librement.',
          },
        },
        {
          '@type': 'Question',
          name: "À qui s'adressent les outils Impact CO2 ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Les outils s'adressent aux médias, entreprises, collectivités et à toute personne souhaitant mieux comprendre et communiquer sur l'impact carbone.",
          },
        },
        {
          '@type': 'Question',
          name: "Qui est à l'origine d'Impact CO2 ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Impact CO2 est développé par l'ADEME, l'Agence de la transition écologique.",
          },
        },
      ],
    },
  ],
}

export const outilsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://impactco2.fr/outils#webpage',
      url: 'https://impactco2.fr/outils',
      name: 'Boîte à outils Impact CO2',
      description: "Catalogue d'outils gratuits de l'ADEME pour sensibiliser et communiquer sur l'impact carbone.",
      datePublished: '2024-01-01',
      dateModified: '2026-10-01',
      inLanguage: 'fr-FR',
      isPartOf: { '@id': 'https://impactco2.fr/#website' },
      about: { '@id': 'https://www.ademe.fr/#organization' },
      isAccessibleForFree: true,
      breadcrumb: { '@id': 'https://impactco2.fr/outils#breadcrumb' },
    },
    outilsBreadcrumbNode,
    websiteNode,
    organizationNode,
  ],
}

export const toolsJsonLd: Record<string, object> = {
  'kit-rse': buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/kit-rse#webpage',
    'https://impactco2.fr/outils/kit-rse',
    'Kit RSE',
    "Un outil digital gratuit de l'ADEME pour sensibiliser et communiquer sur l'impact carbone",
    '2026-09-16',
    '2026-09-16'
  ),
  livraison: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/livraison#webpage',
    'https://impactco2.fr/outils/livraison',
    'Comparateur carbone des moyens de livraisons',
    "Un outil digital gratuit de l'ADEME pour comparer l'empreinte carbone des différents moyens de livraison",
    '2026-09-30',
    '2026-09-30'
  ),
  transport: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/transport#webpage',
    'https://impactco2.fr/outils/transport',
    'Comparateur carbone des moyens de transport',
    "Un outil digital gratuit de l'ADEME pour comparer l'empreinte carbone des différents modes de transports",
    '2026-09-02',
    '2026-09-10'
  ),
  transportItineraire: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/transport/itineraire#webpage',
    'https://impactco2.fr/outils/transport/itineraire',
    'Comparateur carbone des moyens de transport',
    "Un outil digital gratuit de l'ADEME pour comparer l'empreinte carbone des différents modes de transports",
    '2026-09-02',
    '2026-09-10'
  ),
  alimentation: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/alimentation#webpage',
    'https://impactco2.fr/outils/alimentation',
    'Comparateur carbone des aliments',
    "Un outil digital gratuit de l'ADEME pour comparer l'empreinte carbone de différents aliments",
    '2026-05-04',
    '2026-06-22'
  ),
  comparateur: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/comparateur#webpage',
    'https://impactco2.fr/outils/comparateur',
    'Les ordres de grandeur carbone',
    "L'outil gratuit de l'ADEME pour comprendre les ordres de grandeur carbone",
    '2026-06-25',
    '2026-06-25'
  ),
  fruitsetlegumes: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/fruitsetlegumes#webpage',
    'https://impactco2.fr/outils/fruitsetlegumes',
    'Fruits & Légumes de saison',
    "L'outil gratuit de l'ADEME pour connaître les fruits & légumes de saison et leur empreinte carbone",
    '2025-01-23',
    '2026-06-22'
  ),
  chauffage: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/chauffage#webpage',
    'https://impactco2.fr/outils/chauffage',
    'Empreinte carbone des différents modes de chauffage',
    "L'outil gratuit de l'ADEME pour connaître l'empreinte carbone des différents modes de chauffage",
    '2026-04-13',
    '2026-06-22'
  ),
  mobilier: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/mobilier#webpage',
    'https://impactco2.fr/outils/mobilier',
    'Empreinte carbone des meubles',
    "L'outil gratuit de l'ADEME pour connaître l'empreinte carbone des meubles",
    '2024-08-26',
    '2026-06-22'
  ),
  electromenager: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/electromenager#webpage',
    'https://impactco2.fr/outils/electromenager',
    "Empreinte carbone de l'électroménager",
    "L'outil gratuit de l'ADEME pour connaître l'empreinte carbone des appareils électroménagers",
    '2024-08-26',
    '2026-06-22'
  ),
  habillement: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/habillement#webpage',
    'https://impactco2.fr/outils/habillement',
    'Empreinte carbone des vêtements',
    "L'outil gratuit de l'ADEME pour comparer l'empreinte carbone des vêtements",
    '2026-04-13',
    '2026-06-22'
  ),
  numerique: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/numerique#webpage',
    'https://impactco2.fr/outils/numerique',
    'Empreinte carbone du numérique',
    "L'outil gratuit de l'ADEME pour comparer l'empreinte carbone des appareils numériques",
    '2025-07-23',
    '2026-06-22'
  ),
  boisson: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/boisson#webpage',
    'https://impactco2.fr/outils/boisson',
    'Empreinte carbone des boissons',
    "L'outil gratuit de l'ADEME pour comparer l'empreinte carbone des boissons",
    '2024-08-26',
    '2026-06-22'
  ),
  usagenumerique: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/usagenumerique#webpage',
    'https://impactco2.fr/outils/usagenumerique',
    'Empreinte carbone des usages numériques',
    "L'outil gratuit de l'ADEME pour comparer l'empreinte carbone des usages numériques",
    '2024-09-23',
    '2026-06-22'
  ),
  quiz: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/quiz#webpage',
    'https://impactco2.fr/outils/quiz',
    'Quiz Carbone',
    'Apprendre les ordres de grandeur carbone de façon ludique',
    '2026-04-13',
    '2026-06-22'
  ),
  etiquettes: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/etiquettes#webpage',
    'https://impactco2.fr/outils/etiquettes',
    'Widget Carbone',
    'Un widget interactif pour comprendre les grandeurs carbones',
    '2026-08-24',
    '2026-08-24'
  ),
  detecteur: buildCollectionPageJsonLd(
    'https://impactco2.fr/outils/detecteur#webpage',
    'https://impactco2.fr/outils/detecteur',
    'Détecteur CO2',
    'Un outil pour mettre en avant les données carbones et les expliquer facilement',
    '2026-04-13',
    '2026-06-22'
  ),
}
