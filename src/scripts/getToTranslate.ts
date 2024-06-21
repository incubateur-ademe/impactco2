import boissons from '../data/categories/boisson.json'
import caspratiques from '../data/categories/caspratiques.json'
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

const equivalents = [
  ...caspratiques,
  ...boissons,
  ...fruitsetlegumes,
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...repas,
  ...numerique,
  ...flattenEquivalents(deplacements),
  ...chauffages,
  ...usageNumerique,
]

const values: Record<string, string> = {}
equivalents.forEach((equivalent) => {
  values[`name-${equivalent.slug}`] = equivalent.name
  if ('subtitle' in equivalent && equivalent.subtitle) {
    values[`subtitle-${equivalent.subtitle}`] = equivalent.subtitle
  }
  if ('prefix' in equivalent && equivalent.prefix) {
    values[`prefix-${equivalent.prefix}`] = equivalent.prefix
  }
  if ('suffix' in equivalent && equivalent.suffix) {
    values[`suffix-${equivalent.suffix}`] = equivalent.suffix
  }
})

console.log(JSON.stringify(values))
