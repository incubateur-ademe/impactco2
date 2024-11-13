import { computedEquivalents } from 'src/providers/equivalents'
import { ComputedEquivalent } from 'types/equivalent'

export enum AlimentationCategories {
  Group = 'group',
  Rayon = 'rayon',
  Popularity = 'popularity',
}

const slugByCategory: Record<AlimentationCategories, { name: string; equivalents: string[]; logos?: number[] }[]> = {
  group: [
    {
      name: 'poissons',
      equivalents: ['crevettes', 'cabillaud', 'lieu', 'dorade', 'saumon', 'moules', 'huitres', 'thon', 'sardines'],
      logos: [0, 4],
    },

    { name: 'viandes', logos: [1, 4], equivalents: ['boeuf', 'veau', 'porc', 'lapin', 'canard', 'poulet'] },
    {
      name: 'laitier',
      logos: [6, 1],
      equivalents: [
        'beurre',
        'fromagedure',
        'feta',
        'fromagemolle',
        'mozarella',
        'fromagebleu',
        'oeuf',
        'matieregrasse',
        'yaourt',
        'fromageblanc',
        'laitdevache',
      ],
    },
    {
      name: 'cereales',
      logos: [1, 3],
      equivalents: ['quinoa', 'riz', 'pates', 'ble', 'boulgour', 'poischiches', 'haricotsrouges', 'lentilles', 'mais'],
    },
    {
      name: 'autres',
      logos: [0, 4],
      equivalents: ['cheeseburger', 'kebab', 'burgerpoulet', 'pizza', 'sushis', 'burgervegetarien', 'frites', 'tofu'],
    },
    {
      name: 'encas',
      logos: [3, 1],
      equivalents: [
        'boucheechocolat',
        'pateatartiner',
        'brownie',
        'painauchocolat',
        'cookie',
        'madeleine',
        'painauxraisins',
        'chaussonauxpommes',
        'croissant',
        'paindemie',
        'bonbons',
        'baguette',
      ],
    },
    {
      name: 'fruits',
      logos: [0, 5],
      equivalents: [
        'pomme',
        'carotte',
        'courgette',
        'tomate',
        'potiron',
        'laitue',
        'banane',
        'mangue',
        'poireau',
        'avocat',
        'pommedeterre',
      ],
    },
  ],
  rayon: [
    {
      name: 'boucherie',
      logos: [1, 4],
      equivalents: ['boeuf', 'veau', 'porc', 'lapin', 'canard', 'poulet'],
    },
    {
      name: 'poissonerie',
      logos: [1, 6],

      equivalents: ['crevettes', 'cabillaud', 'lieu', 'dorade', 'saumon', 'moules', 'huitres', 'thon', 'sardines'],
    },
    {
      name: 'traiteur',
      logos: [2, 4],

      equivalents: ['cheeseburger', 'kebab', 'burgerpoulet', 'sushis', 'pizza', 'burgervegetarien'],
    },
    {
      name: 'fromagerie',
      logos: [3, 5],
      equivalents: [
        'beurre',
        'fromagedure',
        'feta',
        'fromagemolle',
        'mozarella',
        'fromagebleu',
        'yaourt',
        'fromageblanc',
        'laitdevache',
      ],
    },
    {
      name: 'boulangerie',
      logos: [0, 2],
      equivalents: ['baguette', 'painauchocolat', 'croissant', 'chaussonauxpommes', 'paindemie', 'painauxraisins'],
    },
    {
      name: 'epiceriesalee',
      logos: [6, 8],
      equivalents: [
        'oeuf',
        'mais',
        'lentilles',
        'quinoa',
        'ble',
        'riz',
        'pates',
        'poischiches',
        'haricotsrouges',
        'boulgour',
        'frites',
        'tofu',
        'matieregrasse',
      ],
    },
    {
      name: 'epiceriesucree',
      logos: [4, 2],
      equivalents: ['pateatartiner', 'boucheechocolat', 'cookie', 'brownie', 'bonbons', 'madeleine'],
    },
    {
      name: 'fruits',
      logos: [6, 9],
      equivalents: [
        'pomme',
        'carotte',
        'courgette',
        'tomate',
        'potiron',
        'laitue',
        'banane',
        'mangue',
        'poireau',
        'avocat',
        'pommedeterre',
      ],
    },
  ],
  popularity: [
    {
      name: 'all',
      equivalents: [
        'boeuf',
        'porc',
        'boucheechocolat',
        'beurre',
        'pateatartiner',
        'fromagedure',
        'riz',
        'pates',
        'frites',
        'baguette',
      ],
    },
  ],
}
const compute = (category: { name: string; equivalents: string[] }[]) =>
  category
    .map((values) => ({
      ...values,
      equivalents: values.equivalents.map(
        (equivalent) =>
          computedEquivalents.find((computedEquivalent) => computedEquivalent.slug === equivalent) as ComputedEquivalent
      ),
    }))
    .map((values) => ({
      ...values,
      mean: values.equivalents.reduce((acc, { value }) => acc + value, 0) / values.equivalents.length,
    }))
    .sort((a, b) => b.mean - a.mean)

export const equivalentsByCategory: Record<
  AlimentationCategories,
  { name: string; equivalents: ComputedEquivalent[]; mean: number; logos?: number[] }[]
> = {
  group: compute(slugByCategory.group),
  rayon: compute(slugByCategory.rayon),
  popularity: compute(slugByCategory.popularity),
}
