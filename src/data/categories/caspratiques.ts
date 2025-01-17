export const casPratiques = [
  {
    slug: 'avion-pny',
    category: 13,
    total: 1770,
  },
  {
    slug: 'tgv-paris-berlin',
    category: 13,
    total: 7.26,
  },
  {
    slug: 'tgv-paris-marseille',
    category: 13,
    total: 4.4,
  },
  {
    slug: 'voiture-lille-nimes',
    category: 13,
    total: 410,
  },
  {
    unit: 'an',
    slug: 'francais',
    category: 13,
    percentage: true,
    total: 9300,
  },
  {
    synonyms: ['streaming', 'série', 'netflix'],
    unit: 'épisode',
    slug: 'game-of-thrones',
    category: 13,
    total: 0.0317,
  },
  {
    synonyms: ['streaming', 'série', 'netflix'],
    unit: 'intégrale',
    slug: 'friends',
    category: 13,
    total: 7.86,
  },
  {
    synonyms: ['sport', 'montagne', 'neige', 'vacances'],
    slug: 'ski',
    category: 13,
    total: 48.9,
    sources: [
      {
        label: 'ADEME',
        href: 'https://librairie.ademe.fr/ged/6913/guide_sectoriel_montagne_02062022.pdf',
      },
      {
        label: 'Infographie',
        href: 'https://mtaterre.fr/wp-content/uploads/2023/12/infographie-empreinte-carbone-une-journee-au-ski.pdf',
      },
    ],
  },
  {
    synonyms: ['eau', 'bassin', 'baignade', 'nager'],
    slug: 'piscine',
    category: 13,
    total: 7.54,
    sources: [
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
  },
  {
    synonyms: ['voyage', 'parcourir'],
    slug: 'terre-voiture',
    category: 13,
    total: 8704,
    sources: [
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
  },
  {
    synonyms: ['intégrale', 'séries'],
    slug: 'harry-potter',
    category: 13,
    total: 0.63,
    sources: [
      {
        label: 'Étude NégaOctet - 2022',
        href: 'https://base-empreinte.ademe.fr/documentation/base-impact?state=aWZCflVtbFNGbzBuREZJYVF5SmNVQUhtQThOQlhQQjBYcnRtZFVUWm96XzBl&session_state=7a05d0ef-f903-4d12-8c46-6d0b8301d7c5&code=b72ffd5d-c06a-4c52-bd55-e553b8ca6eb4.7a05d0ef-f903-4d12-8c46-6d0b8301d7c5.e8e7e1ec-ca0a-42ac-bf39-2abdf82b7fb2',
      },
    ],
  },
  {
    synonyms: ['voyage'],
    slug: 'hotel',
    category: 13,
    ecv: [
      {
        id: 50,
        value: 2.1,
      },
      {
        id: 51,
        value: 1.5,
      },
      {
        id: 52,
        value: 0.3,
      },
      {
        id: 53,
        value: 0.4,
      },
    ],
    sources: [
      {
        label: 'ADEME',
        href: 'https://librairie.ademe.fr/changement-climatique/7637-bilan-des-emissions-de-gaz-a-effet-de-serre-du-secteur-du-tourisme-en-france-en-2022.html',
      },
    ],
  },
  {
    synonyms: ['voyage', 'tente'],
    slug: 'camping',
    category: 13,
    total: 1.4,
  },
  {
    synonyms: ['voyage', 'airbnb'],
    slug: 'location',
    category: 13,
    ecv: [
      {
        id: 50,
        value: 2,
      },
      {
        id: 51,
        value: 2.7,
      },
      {
        id: 53,
        value: 0.5,
      },
    ],
    sources: [
      {
        label: 'ADEME',
        href: 'https://librairie.ademe.fr/changement-climatique/7637-bilan-des-emissions-de-gaz-a-effet-de-serre-du-secteur-du-tourisme-en-france-en-2022.html',
      },
    ],
  },
  {
    slug: 'residencesecondaire',
    category: 13,
    ecv: [
      {
        id: 50,
        value: 2.4,
      },
      {
        id: 51,
        value: 1.2,
      },
      {
        id: 53,
        value: 3.4,
      },
    ],
    sources: [
      {
        label: 'ADEME',
        href: 'https://librairie.ademe.fr/changement-climatique/7637-bilan-des-emissions-de-gaz-a-effet-de-serre-du-secteur-du-tourisme-en-france-en-2022.html',
      },
    ],
  },
]
