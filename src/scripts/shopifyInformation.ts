import fs from 'fs'
import values from '../utils/Equivalent/values.json'
import { computeECV } from '../utils/computeECV'
import { ComputedEquivalent, SimpleEquivalent } from '../../types/equivalent'

const existingValues: Record<string, SimpleEquivalent> = values

const list: { value: string; label: string }[] = []

const equivalents: ComputedEquivalent[] = []

equivalents.forEach((equivalent) => {
  const value = existingValues[equivalent.slug]

  existingValues[equivalent.slug] = {
    category: equivalent.category,
    value: computeECV(equivalent) * 1000,
    fr: value ? value.fr : 'TODO',
    en: value ? value.en : 'TODO',
    es: value ? value.es : 'TODO',
  }

  list.push({
    value: equivalent.slug,
    label: value ? value.fr : 'TODO',
  })
})

fs.writeFileSync(`src/utils/Equivalent/values.json`, JSON.stringify(existingValues, null, 2))
