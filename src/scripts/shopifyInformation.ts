import fs from 'fs'
import { categories } from '../data/categories'
import values from '../utils/Equivalent/values.json'
import { SimpleEquivalent } from '../../types/equivalent'

const existingValues: Record<string, SimpleEquivalent> = values

const ecvs: Record<string, SimpleEquivalent> = {}
const list: { value: string; label: string }[] = []

categories.forEach((category) => {
  category.equivalents?.forEach((equivalent) => {
    const value = existingValues[equivalent.slug]

    ecvs[equivalent.slug] = {
      category: category.id,
      value: equivalent.value * 1000,
      fr: value ? value.fr : 'TODO',
      en: value ? value.en : 'TODO',
      de: value ? value.de : 'TODO',
      es: value ? value.es : 'TODO',
      percentage: equivalent.percentage,
    }

    list.push({
      value: equivalent.slug,
      label: value ? value.fr : 'TODO',
    })
  })
})

fs.writeFileSync(`src/utils/Equivalent/values.json`, JSON.stringify(ecvs, null, 2))
fs.writeFileSync(
  `src/data/shopify/list.json`,
  JSON.stringify(
    [{ value: 'random', label: 'Aléatoire' }, ...list.sort((a, b) => a.label.localeCompare(b.label))],
    null,
    2
  )
)
