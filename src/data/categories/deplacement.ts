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
    display: {
      min: 31,
    },
  },
  {
    id: 4,
    synonyms: ['conduire'],
    slug: 'voiturethermique',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.1105577600556303,
      },
      {
        id: 5,
        value: 0.03169565217391306,
      },
    ],
    default: true,
  },
  {
    id: 5,
    synonyms: ['conduire'],
    slug: 'voitureelectrique',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.01208836005563031,
      },
      {
        id: 5,
        value: 0.05527690217391306,
      },
    ],
    default: true,
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
    display: {
      max: 30,
    },
  },
  {
    id: 9,
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
    display: {
      max: 150,
    },
  },
  {
    id: 16,
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
    display: {
      max: 30,
    },
  },
  {
    id: 21,
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
    display: {
      max: 15,
    },
  },
  {
    id: 100,
    synonyms: ['conduire'],
    slug: 'voiture-citadine-essence',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.1169810600556303,
      },
      {
        id: 5,
        value: 0.027733695652173936,
      },
    ],
    default: true,
  },
  {
    id: 105,
    synonyms: ['conduire'],
    slug: 'voiture-citadine-diesel',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.09416971630563031,
      },
      {
        id: 5,
        value: 0.027733695652173936,
      },
    ],
    default: true,
  },
  {
    id: 110,
    synonyms: ['conduire'],
    slug: 'voiture-citadine-electrique',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.011504485055630311,
      },
      {
        id: 5,
        value: 0.046089130434782626,
      },
    ],
    default: true,
  },
  {
    id: 115,
    synonyms: ['conduire'],
    slug: 'voiture-citadine-hybride',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.1060514350556303,
      },
      {
        id: 5,
        value: 0.02919796195652175,
      },
    ],
    default: true,
  },
  {
    id: 120,
    synonyms: ['conduire'],
    slug: 'voiture-citadine-hybriderechargeable',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.09211716005563031,
      },
      {
        id: 5,
        value: 0.03677027173913044,
      },
    ],
    default: true,
  },
  {
    id: 125,
    synonyms: ['conduire'],
    slug: 'voiture-compact-essence',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.1380123725556303,
      },
      {
        id: 5,
        value: 0.03169565217391306,
      },
    ],
    default: true,
  },
  {
    id: 130,
    synonyms: ['conduire'],
    slug: 'voiture-compact-diesel',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.1105577600556303,
      },
      {
        id: 5,
        value: 0.03169565217391306,
      },
    ],
    default: true,
  },
  {
    id: 135,
    synonyms: ['conduire'],
    slug: 'voiture-compact-electrique',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.01208836005563031,
      },
      {
        id: 5,
        value: 0.05527690217391306,
      },
    ],
    default: true,
  },
  {
    id: 140,
    synonyms: ['conduire'],
    slug: 'voiture-compact-hybride',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.1134194350556303,
      },
      {
        id: 5,
        value: 0.03315991847826087,
      },
    ],
    default: true,
  },
  {
    id: 145,
    synonyms: ['conduire'],
    slug: 'voiture-compact-hybriderechargeable',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.0931681350556303,
      },
      {
        id: 5,
        value: 0.04073222826086956,
      },
    ],
    default: true,
  },
  {
    id: 150,
    synonyms: ['conduire'],
    slug: 'voiture-berline-essence',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.1496510600556303,
      },
      {
        id: 5,
        value: 0.03961956521739131,
      },
    ],
    default: true,
  },
  {
    id: 155,
    synonyms: ['conduire'],
    slug: 'voiture-berline-diesel',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.1437828350556303,
      },
      {
        id: 5,
        value: 0.03961956521739131,
      },
    ],
    default: true,
  },
  {
    id: 160,
    synonyms: ['conduire'],
    slug: 'voiture-berline-electrique',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.014735260055630313,
      },
      {
        id: 5,
        value: 0.0759790760869565,
      },
    ],
    default: true,
  },
  {
    id: 165,
    synonyms: ['conduire'],
    slug: 'voiture-berline-hybride',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.12976718505563029,
      },
      {
        id: 5,
        value: 0.041083831521739125,
      },
    ],
    default: true,
  },
  {
    id: 170,
    synonyms: ['conduire'],
    slug: 'voiture-berline-hybriderechargeable',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.11580859130563032,
      },
      {
        id: 5,
        value: 0.048656141304347804,
      },
    ],
    default: true,
  },
  {
    id: 175,
    synonyms: ['conduire'],
    slug: 'voiture-grandeberline-essence',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.2066193725556303,
      },
      {
        id: 5,
        value: 0.03961956521739131,
      },
    ],
    default: true,
  },
  {
    id: 180,
    synonyms: ['conduire'],
    slug: 'voiture-grandeberline-diesel',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.1300887163056303,
      },
      {
        id: 5,
        value: 0.03961956521739131,
      },
    ],
    default: true,
  },
  {
    id: 185,
    synonyms: ['conduire'],
    slug: 'voiture-grandeberline-electrique',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.014112460055630311,
      },
      {
        id: 5,
        value: 0.08024456521739132,
      },
    ],
    default: true,
  },
  {
    id: 190,
    synonyms: ['conduire'],
    slug: 'voiture-grandeberline-hybride',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.1408191850556303,
      },
      {
        id: 5,
        value: 0.041083831521739125,
      },
    ],
    default: true,
  },
  {
    id: 195,
    synonyms: ['conduire'],
    slug: 'voiture-grandeberline-hybriderechargeable',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    ignore: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.1373241350556303,
      },
      {
        id: 5,
        value: 0.048656141304347804,
      },
    ],
    default: true,
  },
  {
    id: 200,
    synonyms: ['conduire'],
    slug: 'voiturehybride',
    sources: [
      {
        label: 'Modélisation de l’empreinte carbone de la voiture - 2025',
        href: 'https://www.notion.so/accelerateur-transition-ecologique-ademe/Mod-lisation-de-l-empreinte-carbone-de-la-voiture-1f46523d57d780b3a1a8f1ceb5ff7f87',
      },
    ],
    withCarpool: true,
    type: 'car',
    category: 4,
    ecv: [
      {
        id: 6,
        value: 0.0931681350556303,
      },
      {
        id: 5,
        value: 0.04073222826086956,
      },
    ],
    default: false,
  },
]
