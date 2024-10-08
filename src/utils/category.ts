import { Category } from 'types/category'
import { categories } from 'data/categories'

export const getCategory = (slug: string) =>
  slug === 'teletravail'
    ? {
        ...(categories.find((category) => category.slug === 'transport') as Category),
        name: 'Télétravail',
        tool: 'Impact Télétravail',
        slug: 'teletravail',
        description: 'Mesurer les économies de carbone réalisées grâce au télétravail',
      }
    : categories.find((category) => category.slug === slug)
