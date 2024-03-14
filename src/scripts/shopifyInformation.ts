import fs from 'fs'
import boissons from '../data/categories/boisson.json'
import chauffages from '../data/categories/chauffage.json'
import deplacements from '../data/categories/deplacement.json'
import electromenager from '../data/categories/electromenager.json'
import { flattenEquivalents } from '../data/categories/flattenEquivalents'
import fruitsetlegumes from '../data/categories/fruitsetlegumes.json'
import habillement from '../data/categories/habillement.json'
import mobilier from '../data/categories/mobilier.json'
import numerique from '../data/categories/numerique.json'
import repas from '../data/categories/repas.json'
import usageNumerique from '../data/categories/usagenumerique.json'
import values from '../data/shopify/values.json'
import { computeECV } from '../utils/computeECV'
import formatName from '../utils/formatName'
import { Equivalent, SimpleEquivalent } from '../../types/equivalent'

const existingValues: Record<string, SimpleEquivalent> = values
const existingEquivalentsByCategory: Record<string, Equivalent[]> = {
  boissons: boissons,
  fruitsetlegumes: fruitsetlegumes,
  electromenager: electromenager,
  habillement: habillement,
  mobilier: mobilier,
  repas: repas,
  numerique: numerique,
  deplacements: flattenEquivalents(deplacements),
  chauffages: chauffages,
  usageNumerique: usageNumerique,
}

const ecvs: Record<string, SimpleEquivalent> = {}
const list: { value: string; label: string }[] = []
Object.values(existingEquivalentsByCategory).forEach((equivalents) =>
  equivalents.forEach((equivalent) => {
    const name = `${equivalent.name}${equivalent.subtitle ? ` (${equivalent.subtitle})` : ''}`
    const label = `${equivalent.prefix || ''}${name.toLowerCase()}${equivalent.suffix || ''}`
    const value = existingValues[equivalent.slug]

    ecvs[equivalent.slug] = {
      category: equivalent.category,
      value: computeECV(equivalent) * 1000,
      fr: label,
      en: value && value.fr === label ? value.en : 'TODO',
      de: value && value.fr === label ? value.de : 'TODO',
      es: value && value.fr === label ? value.es : 'TODO',
      emoji: equivalent.emoji,
    }

    list.push({
      value: equivalent.slug,
      label: formatName(name, 1, true),
    })
  })
)

fs.writeFileSync(`src/data/shopify/values.json`, JSON.stringify(ecvs, null, 2))
fs.writeFileSync(
  `src/data/shopify/list.json`,
  JSON.stringify(
    [{ value: 'random', label: 'Aléatoire' }, ...list.sort((a, b) => a.label.localeCompare(b.label))],
    null,
    2
  )
)
