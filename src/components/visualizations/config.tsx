import { ReactNode } from 'react'

export type VisualizationType = {
  slug: string
  emoji: string
  value: number
  label: ReactNode
  size: [number, number, number]
  large?: boolean
  small?: boolean
  xsmall?: boolean
}

export type VisualizationTypes =
  | 'avion'
  | 'boeuf'
  | 'chauffage'
  | 'console'
  | 'eau'
  | 'imprimante'
  | 'jeans'
  | 'lait'
  | 'liseuse'
  | 'manteau'
  | 'metro'
  | 'montre'
  | 'montreNumerique'
  | 'ordinateur'
  | 'poissonBlanc'
  | 'poissonGras'
  | 'pull'
  | 'smartphone'
  | 'smartphoneNumerique'
  | 'vegetalien'
  | 'voiture'

export type VisualizationCategories = 'boisson' | 'transport' | 'quotidien' | 'repas' | 'chauffage' | 'numerique'

export const categoryLinks: Record<VisualizationCategories, { to: string; label: string }> = {
  boisson: {
    to: '/boissons',
    label: "Comparez avec d'autres boissons",
  },
  transport: {
    to: '/transports',
    label: "Comparez avec d'autres modes de transport",
  },
  quotidien: {
    to: '/convertisseur',
    label: "Comparez à d'autres objets du quotidien",
  },
  repas: {
    to: '/repas',
    label: "Comparez à d'autres repas",
  },
  chauffage: {
    to: '/chauffage',
    label: "Comparez avec d'autres modes de chauffage",
  },
  numerique: {
    to: '/numerique',
    label: "Comparez avec d'autres objets numériques",
  },
}

const configs: Record<VisualizationTypes, { category: VisualizationCategories; equivalents: VisualizationType[] }> = {
  avion: {
    category: 'transport',
    equivalents: [
      {
        slug: 'avion',
        emoji: '✈️',
        label: (
          <>
            <strong>1 km</strong>
            <br />
            en avion
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'bus',
        emoji: '🚌',
        label: (
          <>
            <strong>2 km</strong>
            <br />
            en bus
          </>
        ),
        value: 2,
        size: [6, 7, 22],
      },
      {
        slug: 'train',
        emoji: '🚅',
        label: (
          <>
            <strong>73 km</strong>
            <br />
            en train
          </>
        ),
        value: 73,
        size: [20, 16, 35],
        small: true,
      },
    ],
  },
  boeuf: {
    category: 'repas',
    equivalents: [
      {
        slug: 'boeuf',
        emoji: '🥩',
        label: (
          <>
            1 repas
            <br />
            avec du boeuf
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'poulet',
        emoji: '🍗',
        label: (
          <>
            5 repas
            <br />
            avec du poulet
          </>
        ),
        value: 5,
        size: [10, 6, 24],
      },
      {
        slug: 'végé',
        emoji: '🥗',
        label: (
          <>
            14 repas
            <br />
            végétariens
          </>
        ),
        value: 14,
        size: [20, 15, 30],
      },
    ],
  },
  chauffage: {
    category: 'chauffage',
    equivalents: [
      {
        slug: 'fioul',
        emoji: '🛢',
        label: (
          <>
            <strong>2 ans de chauffage</strong>
            <br />
            au fioul
          </>
        ),
        value: 2,
        size: [8, 8, 16],
      },
      {
        slug: 'gaz',
        emoji: '💨',
        label: (
          <>
            <strong>3 ans de chauffage</strong>
            <br />
            au gaz
          </>
        ),
        value: 3,
        size: [9, 10, 24],
      },
      {
        slug: 'electrique',
        emoji: '⚡️',
        label: (
          <>
            <strong>18 ans de chauffage</strong>
            <br />
            électrique
          </>
        ),
        value: 18,
        size: [18, 16, 24],
      },
    ],
  },
  console: {
    category: 'numerique',
    equivalents: [
      {
        slug: 'ordinateur',
        emoji: '🖥️',
        label: '1 ordinateur de gamer',
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'console',
        emoji: '🎮',
        label: '4 consoles de salon',
        value: 4,
        size: [10, 7, 22],
      },
      {
        slug: 'portable',
        emoji: '👾',
        label: '10 consoles portable',
        value: 10,
        size: [15, 10, 33],
      },
    ],
  },
  eau: {
    category: 'boisson',
    equivalents: [
      {
        slug: 'bouteille',
        emoji: '💧',
        value: 1,
        label: (
          <>
            1 litre
            <br />
            d&apos;eau en bouteille
          </>
        ),
        size: [7, 6, 8],
      },
      {
        slug: 'robinet',
        emoji: '💧',
        value: 3432,
        label: (
          <>
            3432 litres
            <br />
            d&apos;eau du robinet
          </>
        ),
        size: [33, 36, 66],
        xsmall: true,
      },
    ],
  },
  imprimante: {
    category: 'numerique',
    equivalents: [
      {
        slug: 'ordinateur',
        emoji: '🖥️',
        label: '1 ordinateur portable',
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'imprimante',
        emoji: '🖨',
        label: '2 imprimantes',
        value: 2,
        size: [10, 8, 24],
      },
      {
        slug: 'smartphone',
        emoji: '📱',
        label: '5 smartphones',
        value: 5,
        size: [20, 12, 24],
      },
    ],
  },
  jeans: {
    category: 'quotidien',
    equivalents: [
      {
        slug: 'jeans',
        emoji: '👖',
        label: (
          <>
            fabriquer
            <br />
            <strong>1 jeans</strong>
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
        large: true,
      },
      {
        slug: 'smartphone',
        emoji: '📱',
        label: (
          <>
            produire
            <br />
            <strong>1 smartphone</strong>
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'boeuf',
        emoji: '🥩',
        label: (
          <>
            consommer
            <br />
            <strong>3 repas avec du boeuf</strong>
          </>
        ),
        value: 3,
        size: [10, 8, 24],
      },
    ],
  },
  lait: {
    category: 'boisson',
    equivalents: [
      {
        slug: 'lait',
        emoji: '🥛',
        label: (
          <>
            1 litre
            <br />
            de lait de vache
          </>
        ),
        value: 1,
        size: [14, 8, 30],
      },
      {
        slug: 'soja',
        emoji: '🍈',
        label: (
          <>
            3 litres
            <br />
            de lait de soja
          </>
        ),
        value: 3,
        size: [14, 8, 30],
      },
    ],
  },
  liseuse: {
    category: 'numerique',
    equivalents: [
      {
        slug: 'liseuse',
        emoji: '📱',
        label: '1 liseuse',
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'papier',
        emoji: '📗',
        label: '50 livres papier',
        value: 50,
        size: [29, 18, 66],
      },
    ],
  },
  manteau: {
    category: 'quotidien',
    equivalents: [
      {
        slug: 'manteau',
        emoji: '🧥',
        value: 1,
        label: (
          <>
            fabriquer
            <br />
            <strong>1 manteau</strong>
          </>
        ),
        size: [7.5, 6, 8],
      },
      {
        slug: 'voiture',
        emoji: '🚗',
        value: 445,
        label: (
          <>
            parcourir
            <br />
            <strong>445km en voiture</strong>
          </>
        ),
        size: [28, 28, 60],
        small: true,
      },
    ],
  },
  metro: {
    category: 'transport',
    equivalents: [
      {
        slug: 'voiture',
        emoji: '🚗',
        label: (
          <>
            <strong>1 km</strong>
            <br />
            en voiture
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'bus',
        emoji: '🚌',
        label: (
          <>
            <strong>2 km</strong>
            <br />
            en bus
          </>
        ),
        value: 2,
        size: [6, 7, 22],
      },
      {
        slug: 'metro',
        emoji: '🚇',
        label: (
          <>
            <strong>77 km</strong>
            <br />
            en métro
          </>
        ),
        value: 77,
        size: [20, 16, 35],
        small: true,
      },
    ],
  },
  montre: {
    category: 'quotidien',
    equivalents: [
      {
        slug: 'montre',
        emoji: '⌚️',
        label: (
          <>
            produire
            <br />
            <strong>1 montre connectée</strong>
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'boeuf',
        emoji: '🥩',
        label: (
          <>
            consommer
            <br />
            <strong>1 repas avec du boeuf</strong>
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'tshirt',
        emoji: '👕',
        label: (
          <>
            fabriquer
            <br />
            <strong>2 t-shirts</strong>
          </>
        ),
        value: 77,
        size: [10, 6, 24],
        large: true,
      },
    ],
  },
  montreNumerique: {
    category: 'numerique',
    equivalents: [
      {
        slug: 'ordinateur',
        emoji: '💻',
        label: '1 ordinateur portable',
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'smartphone',
        emoji: '📱',
        label: '5 smartphones',
        value: 5,
        size: [10, 8, 24],
      },
      {
        slug: 'montre',
        emoji: '⌚️',
        label: '14 montres connectées',
        value: 14,
        size: [20, 12, 24],
      },
    ],
  },
  ordinateur: {
    category: 'numerique',
    equivalents: [
      {
        slug: 'ordinateur',
        emoji: '🖥️',
        label: '1 ordinateur fixe (avec écran)',
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'portable',
        emoji: '💻',
        label: '3 ordinateurs portables',
        value: 3,
        size: [10, 8, 24],
      },
      {
        slug: 'tablettes',
        emoji: '📱',
        label: '9 tablettes',
        value: 9,
        size: [13, 10, 24],
      },
    ],
  },
  poissonBlanc: {
    category: 'repas',
    equivalents: [
      {
        slug: 'boeuf',
        emoji: '🥩',
        label: (
          <>
            1 repas avec
            <br />
            du boeuf
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'poisson',
        emoji: '🐟',
        label: (
          <>
            4 repas avec
            <br />
            du poisson blanc
          </>
        ),
        value: 4,
        size: [12, 7, 30],
      },
      {
        slug: 'vegetarian',
        emoji: '🥗',
        label: (
          <>
            14 repas
            <br />
            végétariens
          </>
        ),
        value: 14,
        size: [20, 15, 30],
      },
    ],
  },
  poissonGras: {
    category: 'repas',
    equivalents: [
      {
        slug: 'boeuf',
        emoji: '🥩',
        label: (
          <>
            1 repas avec
            <br />
            du boeuf
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'poisson',
        emoji: '🐟',
        label: (
          <>
            7 repas avec
            <br />
            du poisson blanc
          </>
        ),
        value: 7,
        size: [10, 7, 22],
      },
      {
        slug: 'vegetarian',
        emoji: '🥗',
        label: (
          <>
            14 repas
            <br />
            végétariens
          </>
        ),
        value: 14,
        size: [20, 15, 30],
      },
    ],
  },
  pull: {
    category: 'quotidien',
    equivalents: [
      {
        slug: 'pull',
        emoji: '🧶',
        label: (
          <>
            fabriquer
            <br />
            <strong>1 pull en laine</strong>
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'smartphone',
        emoji: '📱',
        label: (
          <>
            produire
            <br />
            <strong>2 smartphones</strong>
          </>
        ),
        value: 2,
        size: [10, 8, 16],
      },
      {
        slug: 'enceinte',
        emoji: '🔊',
        label: (
          <>
            produire
            <br />
            <strong>6 enceintes bluetooth</strong>
          </>
        ),
        value: 6,
        size: [10, 6, 24],
      },
    ],
  },
  smartphone: {
    category: 'quotidien',
    equivalents: [
      {
        slug: 'smartphone',
        emoji: '📱',
        label: (
          <>
            produire
            <br />
            <strong>1 smartphone</strong>
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'boeuf',
        emoji: '🥩',
        label: (
          <>
            consommer
            <br />
            <strong>4 repas avec du boeuf</strong>
          </>
        ),
        value: 4,
        size: [10, 7, 22],
      },
      {
        slug: 'tshirt',
        emoji: '👕',
        label: (
          <>
            fabriquer
            <br />
            <strong>5 t-shirts</strong>
          </>
        ),
        value: 5,
        size: [10, 6, 24],
        large: true,
      },
    ],
  },
  smartphoneNumerique: {
    category: 'numerique',
    equivalents: [
      {
        slug: 'television',
        emoji: '📺',
        label: '1 télévision',
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'ordinateur',
        emoji: '💻',
        label: '3 ordinateurs portables',
        value: 3,
        size: [10, 8, 24],
      },
      {
        slug: 'smartphone',
        emoji: '📱',
        label: '13 smartphones',
        value: 13,
        size: [20, 12, 24],
      },
    ],
  },
  vegetalien: {
    category: 'repas',
    equivalents: [
      {
        slug: 'boeuf',
        emoji: '🥩',
        label: (
          <>
            1 repas avec
            <br />
            du boeuf
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'poulet',
        emoji: '🍗',
        label: (
          <>
            5 repas avec
            <br />
            du poulet
          </>
        ),
        value: 5,
        size: [10, 6, 24],
      },
      {
        slug: 'vegetalien',
        emoji: '🍎',
        label: (
          <>
            19 repas
            <br />
            végétaliens
          </>
        ),
        value: 19,
        size: [20, 15, 30],
      },
    ],
  },
  voiture: {
    category: 'transport',
    equivalents: [
      {
        slug: 'voiture',
        emoji: '🚗',
        label: (
          <>
            <strong>1 km</strong>
            <br />
            en voiture
          </>
        ),
        value: 1,
        size: [7.5, 6, 8],
      },
      {
        slug: 'bus',
        emoji: '🚌',
        label: (
          <>
            <strong>2 km</strong>
            <br />
            en bus
          </>
        ),
        value: 2,
        size: [6, 7, 22],
      },
      {
        slug: 'tgv',
        emoji: '🚅',
        label: (
          <>
            <strong>112 km</strong>
            <br />
            en TGV
          </>
        ),
        value: 112,
        size: [20, 16, 35],
        small: true,
      },
    ],
  },
}

export default configs
