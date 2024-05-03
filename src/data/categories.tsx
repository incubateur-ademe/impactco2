import { boissons } from './categories/boisson'
import { casPratiques } from './categories/caspratiques'
import { chauffage } from './categories/chauffage'
import { computedEquivalents } from './categories/computedEquivalents'
import { deplacements } from './categories/deplacement'
import { electromenager } from './categories/electromenager'
import { flattenEquivalents } from './categories/flattenEquivalents'
import { fruitsEtLegumes } from './categories/fruitsetlegumes'
import { habillements } from './categories/habillement'
import { mobiliers } from './categories/mobilier'
import { numeriques } from './categories/numerique'
import { repas } from './categories/repas'
import { usageNumeriques } from './categories/usagenumerique'

export const categories = [
  {
    id: 13,
    hide: true,
    name: 'Cas pratiques',
    slug: 'caspratiques',
    header: 'de cas pratiques',
    title: "Découvrez l'impact de cas pratique sur le climat",
    description: "Comparez l'empreinte carbone d'un aller retour Paris New york, ou de votre soirée netflix",
    equivalent: 'cas pratique[s]',
    gender: 'm',
    divider: 1,
    unit: 'unité',
    include: '',
    meta: {
      title: 'Cas Pratique',
      description: "Découvrez l'impact sur le climat d'un aller retour Paris New york, ou de votre soirée netflix",
    },
    equivalents: computedEquivalents('caspratiques', casPratiques),
  },
  {
    id: 10,
    name: 'Usage numérique',
    slug: 'usagenumerique',
    header: 'des usages numériques',
    sources: [
      {
        label: 'Étude NégaOctet - 2022',
        href: 'https://base-empreinte.ademe.fr/documentation/base-impact?state=aWZCflVtbFNGbzBuREZJYVF5SmNVQUhtQThOQlhQQjBYcnRtZFVUWm96XzBl&session_state=7a05d0ef-f903-4d12-8c46-6d0b8301d7c5&code=b72ffd5d-c06a-4c52-bd55-e553b8ca6eb4.7a05d0ef-f903-4d12-8c46-6d0b8301d7c5.e8e7e1ec-ca0a-42ac-bf39-2abdf82b7fb2',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    title: "Découvrez l'impact des usages numériques<br/>sur le climat",
    description:
      "Mesurez facilement l'empreinte carbone des mails, du streaming ou de la visioconférence & comparez l'impact de ces usages à celui de la construction de vos appareils",
    equivalent: 'usage[s] numérique[s]',
    gender: 'm',
    divider: 1,
    unit: '',
    include: '',
    list: true,
    meta: {
      title: 'Usage numérique',
      description: "Comparez l'impact écologique en CO₂e des emails, de la visioconférence, du streaming, etc.",
    },
    equivalents: computedEquivalents('usagenumerique', usageNumeriques),
  },
  {
    id: 12,
    name: 'Livraison',
    slug: 'livraison',
    header: 'des livraison de colis',
    title: "Découvrez l'impact des livraison de colis<br/>sur le climat",
    description: "Mesurez facilement l'empreinte carbone d'une livraison",
    equivalent: 'impact[s] livraison[s]',
    gender: 'm',
    divider: 1,
    unit: '',
    include: '',
    list: true,
    meta: {
      title: 'Impact Carbone de la livraison de colis',
      description:
        'Découvrez l’impact carbone de la livraison d’un colis sur le climat et les conseils pour la réduire',
    },
  },
  {
    id: 8,
    name: 'Chauffage',
    slug: 'chauffage',
    header: 'du chauffage',
    sources: [
      {
        label: 'Étude : Consommation d’énergie par…',
        href: 'https://www.statistiques.developpement-durable.gouv.fr/consommation-denergie-par-usage-du-residentiel',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    title: "Découvrez l'impact du chauffage sur le climat",
    description:
      'Faites découvrir l’impact climatique des modes de chauffage à votre communauté grâce à ce simulateur.',
    equivalent: 'mode[s] de chauffage',
    gender: 'm',
    divider: 1,
    unit: 'm²',
    include: 'par m² par année.',
    meta: {
      title: 'Chauffage',
      description: "Comparez l'impact écologique en CO₂e d'une année de chauffage selon le type d'énergie utilisée ",
    },
    equivalents: computedEquivalents('chauffage', chauffage),
  },
  {
    id: 4,
    name: 'Transport',
    slug: 'transport',
    header: 'du transport',
    description: 'Calculer l’impact carbone des moyens de transport',
    sources: [
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    title: "Découvrez l'impact du transport sur le climat",
    equivalent: 'mode[s] de transport',
    gender: 'm',
    divider: 1,
    unit: 'km',
    include:
      "par personne en France. Sont incluses les émissions directes, la construction des véhicules (fabrication, maintenance et fin de vie) et la production et distribution de carburant et d'électricité. La construction des infrastructures (routes, rails, aéroports...) n'est pas incluse.",
    meta: {
      title: 'Transport',
      description:
        "Quelle est l'empreinte carbone de vos déplacements ? Avec Impact CO₂ vous connaitrez votre impact sur le climat",
    },
    equivalents: computedEquivalents('transport', flattenEquivalents(deplacements)),
  },
  {
    id: 9,
    name: 'Fruits et légumes',
    slug: 'fruitsetlegumes',
    header: 'des fruits et légumes de saisons',
    description: 'Retrouvez les fruits et légumes de la saison et comparez leur empreinte carbone',
    equivalent: 'fruit[s] et légume[s]',
    gender: 'm',
    divider: 1,
    unit: 'kg',
    include: 'par kg de produit pour des fruits et légumes de saison',
    meta: {
      title: 'Poids en CO₂e des fruits et légumes',
      description: "Comparez l'impact écologique en CO₂e des fruits et légumes selon la saison",
    },
    equivalents: computedEquivalents('fruitsetlegumes', fruitsEtLegumes),
  },
  {
    id: 1,
    name: 'Numérique',
    slug: 'numerique',
    header: 'du numérique',
    sources: [
      {
        label: 'Rapport : Modélisation et évaluation...',
        href: 'https://librairie.ademe.fr/consommer-autrement/127-modelisation-et-evaluation-environnementale-de-produits-de-consommation-et-biens-d-equipement.html',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    title: "Découvrez l'impact du numérique sur le climat",
    description: "Comparez l'empreinte carbone des appareils qui le composent, avec leurs usages et leur construction",
    equivalent: 'appareil[s]',
    gender: 'm',
    divider: 1,
    unit: 'unité',
    include: "par produit comprenant la fabrication, la distribution et l'usage",
    meta: {
      title: 'Numérique',
      description:
        'Le secteur du numérique représente 2,5% des émissions carbone en France. Comment réduire son impact numérique et agir pour le climat à son échelle ?',
    },
    equivalents: computedEquivalents('numerique', numeriques),
  },
  {
    id: 2,
    name: 'Repas',
    slug: 'repas',
    header: "de l'alimentation",
    sources: [
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    title: "Découvrez l'impact de l'alimentation sur le climat",
    description: "Comparez l'empreinte carbone des différents types de repas",
    equivalent: 'repas',
    gender: 'm',
    divider: 1,
    unit: 'repas',
    include: 'par repas comprenant la fabrication, la distribution et la consommation.',
    meta: {
      title: 'Repas',
      description:
        'Repas végétalien, végétarien, avec du boeuf, avec du poulet, avec du poisson gras, ou avec du poisson blanc... Découvrez leur valeur en CO₂e',
    },
    equivalents: computedEquivalents('repas', repas),
  },
  {
    id: 5,
    name: 'Habillement',
    slug: 'habillement',
    header: 'de la mode',
    sources: [
      {
        label: 'Rapport : Modélisation et évaluation...',
        href: 'https://librairie.ademe.fr/consommer-autrement/127-modelisation-et-evaluation-environnementale-de-produits-de-consommation-et-biens-d-equipement.html',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    title: "Découvrez l'impact de la mode sur le climat",
    description: "Comparez l'empreinte carbone de tous vos vêtements",
    equivalent: 'vêtement[s]',
    gender: 'm',
    divider: 1,
    unit: 'unité',
    include: "par produit comprenant la fabrication, la distribution et l'usage.",
    meta: {
      title: 'Habillement',
      description:
        "Connaissez-vous l'impact carbone des habits que vous portez ? Impact CO₂ détaille pour vous le poids en CO₂e de chaque vêtement",
    },
    equivalents: computedEquivalents('habillement', habillements),
  },
  {
    id: 7,
    name: 'Mobilier',
    slug: 'mobilier',
    header: 'du mobilier',
    sources: [
      {
        label: 'Rapport : Modélisation et évaluation...',
        href: 'https://librairie.ademe.fr/consommer-autrement/127-modelisation-et-evaluation-environnementale-de-produits-de-consommation-et-biens-d-equipement.html',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    title: "Découvrez l'impact du mobilier sur le climat",
    description: "Comparez l'empreinte carbone de vos meubles",
    equivalent: 'meuble[s]',
    gender: 'm',
    divider: 1,
    unit: 'unité',
    include: "par produit comprenant la fabrication, la distribution et l'usage.",
    meta: {
      title: 'Mobilier',
      description:
        'Le mobilier a un impact sur le climat ! Découvrez le poids en CO₂e de votre mobilier : chaise, table, canapé, lit, armoire...',
    },
    equivalents: computedEquivalents('mobilier', mobiliers),
  },
  {
    id: 6,
    name: 'Électroménager',
    slug: 'electromenager',
    header: "de l'électroménager",
    sources: [
      {
        label: 'Rapport : Modélisation et évaluation...',
        href: 'https://librairie.ademe.fr/consommer-autrement/127-modelisation-et-evaluation-environnementale-de-produits-de-consommation-et-biens-d-equipement.html',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    title: "Découvrez l'impact de l'électroménager sur le climat",
    description: "Comparez l'empreinte carbone de tous vos équipements",
    equivalent: 'appareil[s]',
    gender: 'm',
    divider: 1,
    unit: 'unité',
    include: "par produit comprenant la fabrication, la distribution et l'usage.",
    meta: {
      title: 'Électroménager',
      description:
        "Connaissez vous l'impact écologique de vos équipements électroménagers ? Impact CO₂ vous indique le poids CO₂e de chaque appareil !",
    },
    equivalents: computedEquivalents('electromenager', electromenager),
  },
  {
    id: 3,
    name: 'Boisson',
    slug: 'boisson',
    header: 'des boissons',
    title: "Découvrez l'impact des boissons sur le climat",
    description:
      "Comparez l'empreinte carbone de l'eau, des sodas, des boissons alcoolisées, du lait et des boissons chaudes",
    equivalent: 'boisson[s]',
    gender: 'f',
    divider: 1,
    unit: 'litre',
    include: 'par litre de produit comprenant la fabrication, la distribution et la consommation.',
    meta: {
      title: 'Boisson',
      description:
        "Découvrez l'impact sur le climat de la consommation de nos boissons quotidiennes, de la fabrication à la consommation",
    },
    equivalents: computedEquivalents('boisson', boissons),
  },
]
