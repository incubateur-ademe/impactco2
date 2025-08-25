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
    total: 9100,
    sources: [
      {
        label: 'Nos Gestes Climat',
        href: 'https://nosgestesclimat.fr',
      },
    ],
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
  {
    unit: 'an',
    slug: '2050',
    category: 13,
    percentage: true,
    total: 2000,
    sources: [
      {
        label: 'ADEME',
        href: 'https://agirpourlatransition.ademe.fr/particuliers/conso/conso-responsable/connaissez-vous-votre-empreinte-climat',
      },
    ],
  },
  {
    slug: 'voiturefrancaisejour',
    category: 13,
    total: 193699000,
    sources: [
      {
        label: 'Citepa - Secten',
        href: 'https://www.citepa.org/explorateur-de-donnees/',
      },
    ],
  },
  {
    slug: 'voiturefrancaisean',
    category: 13,
    total: 70700135000,
    sources: [
      {
        label: 'Citepa - Secten',
        href: 'https://www.citepa.org/explorateur-de-donnees/',
      },
    ],
  },
  {
    slug: 'populationfrancaise',
    category: 13,
    total: 624000000000,
    sources: [
      {
        label: 'Nos Gestes Climat',
        href: 'https://nosgestesclimat.fr/blog/environnement/definition-empreinte-carbone#empreinte-carbone-individuelle-nationale-ou-dentreprise-quelles-differences/',
      },
    ],
  },
  {
    slug: 'parcbovin',
    category: 13,
    total: 38032000000,
    sources: [
      {
        label: 'Citepa - Secten',
        href: 'https://www.citepa.org/explorateur-de-donnees/',
      },
    ],
  },
  {
    slug: 'chauffageenfrance',
    category: 13,
    total: 43320025000,
    sources: [
      {
        label: 'Batizoom',
        href: 'https://batizoom.ademe.fr/indicateurs/emissions-de-ges-liees-a-lexploitation-des-batiments-residentiels-par-usage/',
      },
    ],
  },
  {
    slug: 'numeriqueenfrance',
    category: 13,
    total: 29500000000,
    sources: [
      {
        label: 'ADEME',
        href: 'https://librairie.ademe.fr/societe-et-politiques-publiques/7880-evaluation-de-l-impact-environnemental-du-numerique-en-france.html',
      },
    ],
  },
  {
    slug: 'aviationcivileenfrance',
    category: 13,
    total: 4380000000,
    sources: [
      {
        label: 'Citepa - Secten',
        href: 'https://www.citepa.org/explorateur-de-donnees/',
      },
    ],
  },
  {
    slug: 'agricoleenfrancejour',
    category: 13,
    total: 216439000,
    sources: [
      {
        label: 'Citepa - Secten',
        href: 'https://www.citepa.org/explorateur-de-donnees/',
      },
    ],
  },
  {
    slug: 'chauffageenfrancejour',
    category: 13,
    total: 118685000,
    sources: [
      {
        label: 'Batizoom',
        href: 'https://batizoom.ademe.fr/indicateurs/emissions-de-ges-liees-a-lexploitation-des-batiments-residentiels-par-usage/',
      },
    ],
  },
  {
    slug: 'foretenfrancejour',
    category: 13,
    total: 151636000,
    sources: [
      {
        label: 'Citepa - Secten',
        href: 'https://www.citepa.org/explorateur-de-donnees/',
      },
    ],
  },
  {
    slug: 'climatisationenfrancejour',
    category: 13,
    total: 3277000,
    sources: [
      {
        label: 'Citepa - Secten',
        href: 'https://www.citepa.org/explorateur-de-donnees/',
      },
    ],
  },
  {
    slug: 'voiturefrancaiseheure',
    category: 13,
    total: 8071000,
    sources: [
      {
        label: 'Citepa - Secten',
        href: 'https://www.citepa.org/explorateur-de-donnees/',
      },
    ],
  },
  {
    slug: 'numeriqueenfrancejour',
    category: 13,
    total: 80822000,
    sources: [
      {
        label: 'ADEME',
        href: 'https://librairie.ademe.fr/changement-climatique/7880-evaluation-de-l-impact-environnemental-du-numerique-en-france.html',
      },
    ],
  },
  {
    slug: 'traitementdechetsjour',
    category: 13,
    total: 5178000,
    sources: [
      {
        label: 'Citepa - Secten',
        href: 'https://www.citepa.org/explorateur-de-donnees/',
      },
    ],
  },
  {
    slug: 'trainenfrancejour',
    category: 13,
    total: 1178000,
    sources: [
      {
        label: 'Citepa - Secten',
        href: 'https://www.citepa.org/explorateur-de-donnees/',
      },
    ],
  },
  {
    slug: 'datacenterjour',
    category: 13,
    total: 185000,
    sources: [
      {
        label: 'ADEME',
        href: 'https://operat.ademe.fr/public/home/',
      },
      {
        label: 'The Conversation',
        href: 'https://theconversation.page.link/V6Nj/',
      },
    ],
  },
  {
    slug: 'avion-johannesburg-paris-rugby',
    category: 13,
    total: 119430,
    sources: [
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
  },
  {
    slug: 'maisonneuve',
    category: 13,
    total: 50000,
    sources: [
      {
        label: 'ADEME',
        href: 'https://librairie.ademe.fr/changement-climatique/7472-9086-bilan-carbone-de-logements-a-saint-pierre-et-miquelon.html/',
      },
    ],
  },
]
