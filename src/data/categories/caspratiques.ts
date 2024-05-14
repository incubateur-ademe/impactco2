export const casPratiques = [
  {
    prefix: 'A/R ',
    name: 'Paris - New-York',
    subtitle: 'en avion',
    synonyms: ['transport', 'déplacement', 'déplacer', 'voyager'],
    unit: 'A/R',
    slug: 'avion-pny',
    category: 13,
    total: 1770,
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=aerien',
    meta: {
      title: 'A/R Paris - New-York en avion',
      description: "Impact carbone d'un aller retour Paris New-York en avion",
    },
    include: {
      pre: 'Distance totale parcourue : 11600 km.',
      postNewLine:
        "Sont incluses les émissions directes, la construction des véhicules (fabrication, maintenance et fin de vie) et la production et distribution de carburant et d'électricité. La construction des infrastructures (routes, rails, aéroports...) n'est pas incluse.",
    },
  },
  {
    prefix: 'A/R ',
    name: 'Paris - Berlin',
    subtitle: 'en TGV',
    synonyms: ['transport', 'déplacement', 'déplacer', 'voyager'],
    unit: 'A/R',
    slug: 'tgv-paris-berlin',
    category: 13,
    total: 7.26,
    source: 'https://base-empreinte.ademe.fr/documentation/base-impact',
    meta: {
      title: 'A/R Paris - Berlin en TGV',
      description: "Impact carbone d'un aller retour Paris Berlin en TGV",
    },
    include: {
      pre: 'Distance totale parcourue : 2478 km.',
      postNewLine:
        "Sont incluses les émissions directes, la construction des véhicules (fabrication, maintenance et fin de vie) et la production et distribution de carburant et d'électricité. La construction des infrastructures (routes, rails, aéroports...) n'est pas incluse.",
    },
  },
  {
    prefix: 'A/R ',
    name: 'Paris - Marseille',
    subtitle: 'en TGV',
    synonyms: ['transport', 'déplacement', 'déplacer', 'voyager'],
    unit: 'A/R',
    slug: 'tgv-paris-marseille',
    category: 13,
    total: 4.4,
    source: 'https://base-empreinte.ademe.fr/documentation/base-impact',
    meta: {
      title: 'A/R Paris - Marseille en TGV',
      description: "Impact carbone d'un aller retour Paris Marseille en TGV",
    },
    include: {
      pre: 'Distance totale parcourue : 1504 km.',
      postNewLine:
        "Sont incluses les émissions directes, la construction des véhicules (fabrication, maintenance et fin de vie) et la production et distribution de carburant et d'électricité. La construction des infrastructures (routes, rails, aéroports...) n'est pas incluse.",
    },
  },
  {
    prefix: 'A/R ',
    name: 'Lille - Nîmes',
    subtitle: 'en voiture thermique',
    synonyms: ['transport', 'déplacement', 'déplacer', 'voyager'],
    unit: 'A/R',
    slug: 'voiture-lille-nimes',
    category: 13,
    total: 410,
    source: 'https://base-empreinte.ademe.fr/documentation/base-impact',
    meta: {
      title: 'A/R Lille - Nîmes en voiture',
      description: "Impact carbone d'un aller retour Lille Nîmes en voiture",
    },
    include: {
      pre: 'Distance totale parcourue : 1882 km.',
      postNewLine:
        "Sont incluses les émissions directes, la construction des véhicules (fabrication, maintenance et fin de vie) et la production et distribution de carburant et d'électricité. La construction des infrastructures (routes, rails, aéroports...) n'est pas incluse.",
    },
  },
  {
    prefix: "% de l'",
    name: "Empreinte carbone d'un citoyen Français",
    synonyms: ['', 'déplacement', 'déplacer', 'voyager'],
    unit: 'an',
    slug: 'francais',
    category: 13,
    percentage: true,
    total: 9300,
    source: 'https://nosgestesclimat.fr/',
    meta: {
      title: 'Citoyen Français',
      description: "Empreinte carbone d'un citoyen français",
    },
    include: {
      pre: '',
      postNewLine:
        'Les français émettent en moyenne 9,3 tonnes de CO₂e par an (chiffre du Service des Données et Études Statistiques pour 2022, Ministère de la Transition Écologique). Cette moyenne varie beaucoup selon les modes de vie, l’utilisation ou non de la voiture, de l’avion, la vie en maison ou en appartement, le mode de chauffage, l’alimentation etc.',
    },
  },
  {
    name: 'Épisode[s] de Game of thrones',
    subtitle: 'en streaming',
    synonyms: ['streaming', 'série', 'netflix'],
    unit: 'épisode',
    slug: 'game-of-thrones',
    category: 13,
    total: 0.0317,
    source: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
    meta: {
      title: 'Épisode de Game of thrones',
      description: 'Impact carbone de regarder un épisode de Game of thrones en streaming',
    },
    include: {
      pre: '',
      postNewLine:
        'Un épisode de Game of thrones dure en moyenne 1h. La donnée est calculé sur une heure de streaming en haute définition, sur une télévision, en connexion wifi.',
    },
  },
  {
    name: 'Intégrale[s] de Friends',
    subtitle: 'en streaming',
    synonyms: ['streaming', 'série', 'netflix'],
    unit: 'intégrale',
    slug: 'friends',
    category: 13,
    total: 7.86,
    source: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
    meta: {
      title: 'Épisode de Friends',
      description: 'Impact carbone de regarder un épisode de Friends en streaming',
    },
    include: {
      pre: '',
      postNewLine:
        "L’intégrale de Friends est composée de 236 épisodes d'environ 20min. La donnée est calculé sur une heure de streaming en haute définition, sur une télévision, en connexion wifi.",
    },
  },
]
