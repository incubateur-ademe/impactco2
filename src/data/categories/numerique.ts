export const numeriques = [
  {
    name: 'Smartphone[s]',
    synonyms: [
      'telephone',
      'gsm',
      'mobile',
      'portable',
      'iphone',
      'samsung',
      'xiaomi',
      'Apple',
      'Samsung',
      'Huawei',
      'Xiaomi',
      'OPPO',
      'Sony',
      'Realme',
      'LG',
      'Honor',
      'OnePlus',
      'Google',
      'TCL',
      'Alcatel',
      'Nokia',
      'Motorola',
      'CAT',
      'InnJoo',
      'Lenovo',
      'Microsoft',
      'Elephone',
      'HTC',
      'ZTE',
      'Vivo',
      'Asus',
      'Wiko',
      'Haier',
      'BlackBerry',
    ],
    slug: 'smartphone',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 2.1,
      },
      {
        id: 5,
        value: 83,
      },
    ],
    usage: {
      peryear: 0.22,
      defaultyears: 2.5,
    },
    end: 0.2,
    include: {
      pre: 'Écran  moyen de 6,63 pouces, mix des technologies LCD et OLED, 8 Go de RAM, 210 Go de mémoire (mix pondéré entre 3 configurations, 24%, 24%, 52%).',
    },
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
    default: true,
  },
  {
    name: 'Ordinateur[s] fixe[s] sans écran (particulier)',
    slug: 'ordinateurfixeparticulier',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 2.9,
      },
      {
        id: 5,
        value: 258.6,
      },
    ],
    usage: {
      peryear: 5.2,
      defaultyears: 6,
    },
    end: 6.6,
    include: {
      pre: '1 CPU, 10 Go de RAM, 1173 Go de HDD, 442 Go de SSD, mix de carte graphique intégrée ou séparée (mix pondéré entre 5 configurations d’ordinateurs fixes sans écran, à usage particulier.).',
    },
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
    default: true,
  },
  {
    name: 'Ordinateur[s] fixe[s] sans écran (professionnel)',
    slug: 'ordinateurfixeprofessionnel',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 1.8,
      },
      {
        id: 5,
        value: 202.6,
      },
    ],
    usage: {
      peryear: 7.85,
      defaultyears: 6,
    },
    end: 6.6,
    include: {
      pre: '1 CPU, 8 Go de RAM, 1000 Go de HDD, 250 Go de SSD, carte graphique séparée (une configuration simple).',
    },
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
    default: true,
  },
  {
    name: "Écran[s] d'ordinateur",
    slug: 'ecran',
    category: 1,
    usage: {
      peryear: 3.6,
      defaultyears: 6,
    },
    end: 3.9,
    include: {
      pre: 'Dimension moyenne (24 pouces) et mix de technologies (98,6% LCD, 1,4% OLED) (mix pondéré entre 2 configurations d’écrans d’ordinateur.).',
    },
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
    ecv: [
      {
        id: 4,
        value: 1.3,
      },
      {
        id: 5,
        value: 64.6,
      },
    ],
  },
  {
    name: 'Tablette[s]',
    slug: 'tabletteclassique',
    category: 1,
    usage: {
      peryear: 0.6,
      defaultyears: 3,
    },
    end: 0.4,
    include: {
      pre: "Écran de 10,53 pouces, mix de technologies d'écran LCD, 4,7 Go de RAM, 144 Go de mémoire (mix pondéré entre 3 configurations de tablettes.).",
    },
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
    ecv: [
      {
        id: 4,
        value: 3.4,
      },
      {
        id: 5,
        value: 56.3,
      },
    ],
    default: true,
  },
  {
    name: 'Télévision[s]',
    slug: 'television',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 3.2,
      },
      {
        id: 5,
        value: 372.6,
      },
    ],
    usage: {
      peryear: 10.6,
      defaultyears: 8,
    },
    end: 11.8,
    include: {
      pre: 'Dimension et technologie moyennes (82% LCD (45 pouces), 1% OLED (53 pouces), 17% OLED (68 pouces)) (mix pondéré entre 3 configurations de téléviseurs.).',
    },
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
    default: true,
  },
  {
    name: 'Ordinateur[s] portable[s]',
    slug: 'ordinateurportable',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 12.3,
      },
      {
        id: 5,
        value: 170.3,
      },
    ],
    usage: {
      peryear: 1.52,
      defaultyears: 5,
    },
    end: 2.8,
    include: {
      pre: 'Écran moyen de 14,6 pouces, 1 CPU, 11 Go de RAM, 497 Go de SSD (mix pondéré entre 3 configurations d’ordinateurs portables à usage particulier).',
    },
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
    default: true,
  },
  {
    name: 'Enceinte[s] connectée[s]',
    slug: 'enceintebluetooth',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 0.3,
      },
      {
        id: 5,
        value: 19.5,
      },
    ],
    usage: {
      peryear: 1.2,
      defaultyears: 5,
    },
    end: 0.7,
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
  },
  {
    name: 'Téléphone[s] basique[s]',
    slug: 'telephonebasique',
    category: 1,
    ecv: [
      {
        id: 5,
        value: 23.3,
      },
    ],
    usage: {
      peryear: 0,
      defaultyears: 2.5,
    },
    end: 0.1,
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
  },
  {
    name: 'Casque[s] de réalité virtuelle',
    slug: 'casquevr',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 0.4,
      },
      {
        id: 5,
        value: 70.4,
      },
    ],
    usage: {
      peryear: 0.04,
      defaultyears: 5,
    },
    end: 1.3,
    include: {
      pre: 'Moyenne de deux technologies (50% LCD, 50% OLED) + prise en compte de deux manettes.',
    },
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
  },
  {
    name: 'Alimentation[s] externe[s]',
    subtitle: 'pour ordinateur portable',
    slug: 'alimentationordinateur',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 0.1,
      },
      {
        id: 5,
        value: 3.5,
      },
    ],
    end: 0.5,
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
  },
  {
    name: 'Alimentation[s] externe[s]',
    subtitle: 'pour smartphone ou tablette',
    slug: 'alimentationsmartphone',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 0,
      },
      {
        id: 5,
        value: 0.3,
      },
    ],
    end: 0.1,
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
  },
  {
    name: 'Disque[s] dur[s] externe[s]',
    slug: 'disquedur',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 0.1,
      },
      {
        id: 5,
        value: 11.5,
      },
    ],
    end: 0.3,
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
  },
  {
    name: 'Clef[s] usb',
    slug: 'clefusb',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 0,
      },
      {
        id: 5,
        value: 2.9,
      },
    ],
    include: {
      pre: 'Capacité moyenne (16 Go)',
    },
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
  },
  {
    name: 'Box[s]',
    slug: 'box',
    category: 1,
    ecv: [
      {
        id: 4,
        value: 0.6,
      },
      {
        id: 5,
        value: 60.8,
      },
    ],
    usage: {
      peryear: 3.8,
      defaultyears: 5,
    },
    end: 1.6,
    include: {
      pre: 'Utilisation personnelle et professionnelle ; xDSL, FTTx',
    },
    source:
      'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
  },
]
