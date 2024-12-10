import { computedEquivalents } from 'src/providers/equivalents'
import { ComputedEquivalent } from 'types/equivalent'

export enum AlimentationCategories {
  Group = 'group',
  Rayon = 'rayon',
  Popularity = 'popularity',
}

const slugByCategory: Record<AlimentationCategories, { name: string; equivalents: string[]; logos?: string[] }[]> = {
  group: [
    {
      name: 'poissons',
      equivalents: ['crevettes', 'cabillaud', 'lieu', 'dorade', 'saumon', 'moules', 'huitres', 'thon', 'sardines'],
      logos: ['crevettes', 'saumon'],
    },

    {
      name: 'viandes',
      logos: ['boeuf', 'poulet'],
      equivalents: ['boeuf', 'veau', 'porc', 'lapin', 'canard', 'poulet'],
    },
    {
      name: 'laitier',
      logos: ['oeuf', 'fromagedure'],
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
      logos: ['riz', 'ble'],
      equivalents: ['quinoa', 'riz', 'pates', 'ble', 'boulgour', 'poischiches', 'haricotsrouges', 'lentilles', 'mais'],
    },
    {
      name: 'plats',
      logos: ['cheeseburger', 'sushis'],
      equivalents: ['cheeseburger', 'kebab', 'burgerpoulet', 'pizza', 'sushis', 'burgervegetarien', 'frites', 'tofu'],
    },
    {
      name: 'encas',
      logos: ['painauchocolat', 'pateatartiner'],
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
      logos: ['pomme', 'laitue'],
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
      logos: ['veau', 'canard'],
      equivalents: ['boeuf', 'veau', 'porc', 'lapin', 'canard', 'poulet'],
    },
    {
      name: 'poissonnerie',
      logos: ['cabillaud', 'huitres'],

      equivalents: ['crevettes', 'cabillaud', 'lieu', 'dorade', 'saumon', 'moules', 'huitres', 'thon', 'sardines'],
    },
    {
      name: 'traiteur',
      logos: ['burgerpoulet', 'pizza'],

      equivalents: ['cheeseburger', 'kebab', 'burgerpoulet', 'sushis', 'pizza', 'burgervegetarien'],
    },
    {
      name: 'fromagerie',
      logos: ['fromagemolle', 'fromagebleu'],
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
      logos: ['baguette', 'croissant'],
      equivalents: ['baguette', 'painauchocolat', 'croissant', 'chaussonauxpommes', 'paindemie', 'painauxraisins'],
    },
    {
      name: 'epiceriesalee',
      logos: ['pates', 'haricotsrouges'],
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
      logos: ['bonbons', 'cookie'],
      equivalents: ['pateatartiner', 'boucheechocolat', 'cookie', 'brownie', 'bonbons', 'madeleine'],
    },
    {
      name: 'fruits',
      logos: ['banane', 'avocat'],
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
  { name: string; equivalents: ComputedEquivalent[]; mean: number; logos?: string[] }[]
> = {
  group: compute(slugByCategory.group),
  rayon: compute(slugByCategory.rayon),
  popularity: compute(slugByCategory.popularity),
}
