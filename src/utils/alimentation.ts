import { computedEquivalents } from 'src/providers/equivalents'
import { ComputedEquivalent } from 'types/equivalent'

export enum AlimentationCategories {
  Group = 'group',
  Rayon = 'rayon',
  Popularity = 'popularity',
}

const slugByCategory: Record<AlimentationCategories, { name: string; equivalents: string[] }[]> = {
  group: [
    {
      name: 'poissons',
      equivalents: ['crevettes', 'cabillaud', 'lieu', 'dorade', 'saumon', 'moules', 'huitres', 'thon', 'sardines'],
    },
    { name: 'viandes', equivalents: ['boeuf', 'veau', 'porc', 'lapin', 'canard', 'poulet'] },
    {
      name: 'laitier',
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
        'laitdevachealimentation',
      ],
    },
    {
      name: 'cereales',
      equivalents: [
        'quinoa',
        'riz',
        'pates',
        'ble',
        'boulgour',
        'poischiches',
        'haricotsrouges',
        'lentilles',
        'maisalimentation',
      ],
    },
    {
      name: 'autres',
      equivalents: ['cheeseburger', 'kebab', 'burgerpoulet', 'pizza', 'sushis', 'burgervegetarien', 'frites', 'tofu'],
    },
    {
      name: 'encas',
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
      equivalents: [
        'pommealimentation',
        'carottealimentation',
        'courgettealimentation',
        'tomatealimentation',
        'potironalimentation',
        'laituealimentation',
        'bananealimentation',
        'manguealimentation',
        'poireaualimentation',
        'avocatalimentation',
        'pommedeterre',
      ],
    },
  ],
  rayon: [
    {
      name: 'boucherie',
      equivalents: ['boeuf', 'veau', 'porc', 'lapin', 'canard', 'poulet'],
    },
    {
      name: 'poissonerie',
      equivalents: ['crevettes', 'cabillaud', 'lieu', 'dorade', 'saumon', 'moules', 'huitres', 'thon', 'sardines'],
    },
    {
      name: 'traiteur',
      equivalents: ['cheeseburger', 'kebab', 'burgerpoulet', 'sushis', 'pizza', 'burgervegetarien'],
    },
    {
      name: 'fromagerie',
      equivalents: [
        'beurre',
        'fromagedure',
        'feta',
        'fromagemolle',
        'mozarella',
        'fromagebleu',
        'yaourt',
        'fromageblanc',
        'laitdevachealimentation',
      ],
    },
    {
      name: 'boulangerie',
      equivalents: ['baguette', 'painauchocolat', 'croissant', 'chaussonauxpommes', 'paindemie', 'painauxraisins'],
    },
    {
      name: 'epiceriesalee',
      equivalents: [
        'oeuf',
        'maisalimentation',
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
      equivalents: ['pateatartiner', 'boucheechocolat', 'cookie', 'brownie', 'bonbons', 'madeleine'],
    },
    {
      name: 'fruits',
      equivalents: [
        'pommealimentation',
        'carottealimentation',
        'courgettealimentation',
        'tomatealimentation',
        'potironalimentation',
        'laituealimentation',
        'bananealimentation',
        'manguealimentation',
        'poireaualimentation',
        'avocatalimentation',
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
  { name: string; equivalents: ComputedEquivalent[]; mean: number }[]
> = {
  group: compute(slugByCategory.group),
  rayon: compute(slugByCategory.rayon),
  popularity: compute(slugByCategory.popularity),
}
