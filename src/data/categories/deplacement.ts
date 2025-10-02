export const deplacements = [
  {
    id: 1,
    slug: 'avion',
    synonyms: ['voler'],
    type: 'plane',
    category: 4,
    display: {
      min: 300,
    },
    ecvs: [
      {
        display: {
          min: 300,
          max: 1000,
        },
        subtitle: 'courtcourrier',
        ecv: [
          {
            id: 5,
            value: 0.000372,
          },
          {
            id: 6,
            value: 0.1232,
          },
          {
            id: 7,
            value: 0.101,
          },
        ],
      },
      {
        display: {
          min: 1001,
          max: 2000,
        },
        subtitle: 'moyencourrier',
        ecv: [
          {
            id: 5,
            value: 0.000361,
          },
          {
            id: 6,
            value: 0.1013,
          },
          {
            id: 7,
            value: 0.083,
          },
        ],
      },
      {
        display: {
          min: 2001,
          max: 5000,
        },
        subtitle: 'moyenlongcourrier',
        ecv: [
          {
            id: 5,
            value: 0.000294,
          },
          {
            id: 6,
            value: 0.0915,
          },
          {
            id: 7,
            value: 0.075,
          },
        ],
      },
      {
        subtitle: 'longcourrier',
        display: {
          min: 2001,
        },
        ecv: [
          {
            id: 5,
            value: 0.000294,
          },
          {
            id: 6,
            value: 0.0976,
          },
          {
            id: 7,
            value: 0.08,
          },
        ],
      },
    ],
    default: true,
    tile: false,
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
  {
    id: 4,
    subtitle: 'Thermique',
    synonyms: ['conduire'],
    slug: 'voiturethermique',
    withCarpool: true,
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
  },
  {
    id: 5,
    subtitle: 'Électrique',
    synonyms: ['conduire'],
    slug: 'voitureelectrique',
    withCarpool: true,
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
  },
  {
    id: 6,
    slug: 'autocar',
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.00442,
      },
      {
        id: 6,
        value: 0.03314,
      },
    ],
    default: true,
    tile: false,
    display: {
      min: 16,
    },
  },
  {
    id: 30,
    synonyms: ['marcher'],
    slug: 'marche',
    type: 'foot',
    category: 4,
    default: true,
    tile: false,
    total: 0,
    display: {
      max: 30,
    },
  },
  {
    id: 7,
    synonyms: ['pedaler'],
    slug: 'velo',
    type: 'foot',
    category: 4,
    default: true,
    tile: false,
    display: {
      max: 30,
    },
    ecv: [
      {
        id: 5,
        value: 0.00017,
      },
    ],
  },
  {
    id: 8,
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
  },
  {
    id: 9,
    subtitle: 'Thermique',
    slug: 'busthermique',
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.00892,
      },
      {
        id: 6,
        value: 0.1135,
      },
    ],
    default: true,
    tile: false,
    display: {
      max: 15,
    },
  },
  {
    id: 10,
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
  },
  {
    id: 11,
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
  },
  {
    id: 12,
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
  },
  {
    id: 13,
    slug: 'moto',
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.0292,
      },
      {
        id: 6,
        value: 0.1875,
      },
    ],
    default: true,
    tile: false,
    display: {
      min: 51,
    },
  },
  {
    id: 14,
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
  },
  {
    id: 15,
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
  },
  {
    id: 16,
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
  },
  {
    id: 17,
    slug: 'trottinette',
    type: 'foot',
    category: 4,
    ecv: [
      {
        id: 5,
        value: 0.0229,
      },
      {
        id: 6,
        value: 0.002,
      },
    ],
    default: true,
    tile: false,
    display: {
      max: 30,
    },
  },
  {
    id: 21,
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
  },
]
