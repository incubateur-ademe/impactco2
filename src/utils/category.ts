import { Category } from 'types/category'
import { categories } from 'data/categories'
import { computedEquivalents } from 'data/categories/computedEquivalents'
import { repas } from 'data/categories/repas'

export const getCategory = (slug: string) => {
  switch (slug) {
    case 'teletravail':
      return {
        ...(categories.find((category) => category.slug === 'transport') as Category),
        name: 'Télétravail',
        tool: 'Impact Télétravail',
        slug: 'teletravail',
        description: 'Mesurer les économies de carbone réalisées grâce au télétravail',
      }
    case 'repas':
      return {
        ...(categories.find((category) => category.slug === 'alimentation') as Category),
        name: 'Repas',
        slug: 'repas',
        description: 'Comparer l’empreinte carbone des différents types de repas',
        tool: 'Impact Repas',
        equivalents: computedEquivalents('alimentation', repas),
      }
    default:
      return categories.find((category) => category.slug === slug)
  }
}
