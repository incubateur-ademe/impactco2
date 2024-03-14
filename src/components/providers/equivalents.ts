import { ComputedEquivalent } from 'types/equivalent'
import categories from 'data/categories.json'
import boisson from 'data/categories/boisson.json'
import chauffage from 'data/categories/chauffage.json'
import deplacement from 'data/categories/deplacement.json'
import electromenager from 'data/categories/electromenager.json'
import { flattenEquivalents } from 'data/categories/flattenEquivalents'
import fruitsetlegumes from 'data/categories/fruitsetlegumes.json'
import habillement from 'data/categories/habillement.json'
import mobilier from 'data/categories/mobilier.json'
import numerique from 'data/categories/numerique.json'
import repas from 'data/categories/repas.json'
import usagenumerique from 'data/categories/usagenumerique.json'
import { computeECV } from 'utils/computeECV'

const equivalents = [
  ...boisson,
  ...flattenEquivalents(deplacement),
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...numerique,
  ...usagenumerique,
  ...repas,
  ...chauffage,
  ...fruitsetlegumes,
]

export const computedEquivalents = equivalents.map((equivalent) => ({
  ...equivalent,
  link: `/${categories.find((category) => category.id === equivalent.category)?.slug}/${equivalent.slug}`,
  value: computeECV(equivalent),
})) as ComputedEquivalent[]
