export const deplacements = [
  {
    id: 1,
    slug: 'avion',
    synonyms: ['voler'],
    type: 'plane',
    category: 4,
    display: {
      min: 500,
    },
    ecvs: [
      {
        display: {
          min: 500,
          max: 1000,
        },
        empreinteId: 28130,
        subtitle: 'courtcourrier',
        ecv: [
          {
            id: 5,
            value: 0.00038,
          },
          {
            id: 6,
            value: 0.1412,
          },
          {
            id: 7,
            value: 0.117,
          },
        ],
      },
      {
        display: {
          min: 1001,
          max: 3500,
        },
        empreinteId: 28132,
        subtitle: 'moyencourrier',
        ecv: [
          {
            id: 5,
            value: 0.00036,
          },
          {
            id: 6,
            value: 0.1024,
          },
          {
            id: 7,
            value: 0.0848,
          },
        ],
      },
      {
        empreinteId: 28134,
        subtitle: 'longcourrier',
        display: {
          min: 3501,
        },
        ecv: [
          {
            id: 5,
            value: 0.00026,
          },
          {
            id: 6,
            value: 0.08299999999999999,
          },
          {
            id: 7,
            value: 0.0687,
          },
        ],
      },
    ],
    default: true,
    tile: false,
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=aerien',
    include: {
      post: "par personne en France. Nous prenons ici en compte l’impact carbone des trainées de condensation. Sont incluses les émissions directes, la construction des véhicules (fabrication, maintenance et fin de vie) et la production et distribution de carburant et d'électricité. La construction des infrastructures (routes, rails, aéroports...) n'est pas incluse.",
    },
  },
  {
    id: 2,
    empreinteId: 42760,
    synonyms: ['train'],
    slug: 'tgv',
    type: 'rail',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.00063,
      },
      {
        id: 6,
        value: 0.0023,
      },
    ],
    default: true,
    tile: true,
    display: {
      min: 150,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Ferroviaire2',
  },
  {
    id: 3,
    empreinteId: 42756,
    synonyms: ['train'],
    slug: 'intercites',
    type: 'rail',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.00318,
      },
      {
        id: 6,
        value: 0.0058,
      },
    ],
    default: true,
    tile: false,
    display: {
      min: 31,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Ferroviaire2',
  },
  {
    id: 4,
    subtitle: 'Thermique',
    synonyms: ['conduire'],
    slug: 'voiturethermique',
    carpool: 1,
    type: 'car',
    category: 4,
    ecv: [
      {
        value: 0.192,
        id: 6,
      },
      {
        value: 0.0256,
        id: 5,
      },
    ],
    default: true,
    tile: true,
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Routier2',
  },
  {
    id: 5,
    subtitle: 'Électrique',
    synonyms: ['conduire'],
    slug: 'voitureelectrique',
    carpool: 1,
    type: 'car',
    category: 4,
    ecv: [
      {
        value: 0.0198,
        id: 6,
      },
      {
        value: 0.0836,
        id: 5,
      },
    ],
    default: true,
    tile: false,
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Routier2',
  },
  {
    id: 6,
    slug: 'autocar',
    type: 'car',
    category: 4,
    ecv: [
      {
        value: 0.025,
        id: 6,
      },
      {
        value: 0.00442130627,
        _comment:
          '// = (Valeur en kgCO₂e/kg de véhicule * Masse type) / Nombre de passagers / Durée de vie en km = (4 * 12000) / 30 / 361884',
        id: 5,
      },
    ],
    default: true,
    tile: false,
    display: {
      min: 16,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Routier2',
  },
  {
    id: 7,
    synonyms: ['marcher', 'pedaler'],
    slug: 'velo',
    type: 'foot',
    category: 4,
    total: 0,
    default: true,
    tile: false,
    display: {
      max: 30,
    },
  },
  {
    id: 8,
    empreinteId: 28331,
    synonyms: ['pedaler'],
    slug: 'veloelectrique',
    type: 'foot',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.00872,
      },
      {
        id: 6,
        value: 0.00223,
      },
    ],
    default: true,
    tile: false,
    display: {
      max: 30,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Routier2',
  },
  {
    id: 9,
    empreinteId: 28004,
    subtitle: 'Thermique',
    slug: 'busthermique',
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.0089,
      },
      {
        id: 6,
        value: 0.1043,
      },
    ],
    default: true,
    tile: false,
    display: {
      max: 15,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Routier2',
  },
  {
    id: 10,
    empreinteId: 42761,
    slug: 'tramway',
    type: 'rail',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.00048,
      },
      {
        id: 6,
        value: 0.0038,
      },
    ],
    default: false,
    tile: false,
    display: {
      max: 12,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Ferroviaire2',
  },
  {
    id: 11,
    empreinteId: 42757,
    synonyms: ['rail'],
    slug: 'metro',
    type: 'rail',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.00024,
      },
      {
        id: 6,
        value: 0.0042,
      },
    ],
    default: true,
    tile: false,
    display: {
      max: 12,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Ferroviaire2',
  },
  {
    id: 12,
    empreinteId: 27992,
    slug: 'scooter',
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.0159,
      },
      {
        id: 6,
        value: 0.0604,
      },
    ],
    default: true,
    tile: false,
    display: {
      max: 50,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Routier2',
  },
  {
    id: 13,
    empreinteId: 27995,
    slug: 'moto',
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.0265,
      },
      {
        id: 6,
        value: 0.1648,
      },
    ],
    default: true,
    tile: false,
    display: {
      min: 51,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Routier2',
  },
  {
    id: 14,
    empreinteId: 42758,
    synonyms: ['train', 'rail'],
    slug: 'rer',
    type: 'rail',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.00318,
      },
      {
        id: 6,
        value: 0.0066,
      },
    ],
    default: true,
    tile: false,
    display: {
      min: 11,
      max: 100,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Ferroviaire2',
  },
  {
    id: 15,
    empreinteId: 42759,
    synonyms: ['train', 'rail'],
    slug: 'ter',
    type: 'rail',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.00479,
      },
      {
        id: 6,
        value: 0.0229,
      },
    ],
    default: false,
    tile: false,
    display: {
      max: 150,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Ferroviaire2',
  },
  {
    id: 16,
    empreinteId: 28003,
    subtitle: 'Électrique',
    slug: 'buselectrique',
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.0122,
      },
      {
        id: 6,
        value: 0.0095,
      },
    ],
    default: false,
    tile: false,
    display: {
      max: 15,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Routier2',
  },
  {
    id: 21,
    empreinteId: 28005,
    subtitle: 'GNV',
    slug: 'busgnv',
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.0089,
      },
      {
        id: 6,
        value: 0.1128,
      },
    ],
    default: false,
    tile: false,
    display: {
      max: 15,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Routier2',
  },
]
