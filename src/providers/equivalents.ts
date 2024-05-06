import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import { boissons } from 'data/categories/boisson'
import { casPratiques } from 'data/categories/caspratiques'
import { chauffage } from 'data/categories/chauffage'
import { deplacements } from 'data/categories/deplacement'
import { electromenager } from 'data/categories/electromenager'
import { flattenEquivalents } from 'data/categories/flattenEquivalents'
import { fruitsEtLegumes } from 'data/categories/fruitsetlegumes'
import { habillements } from 'data/categories/habillement'
import { mobiliers } from 'data/categories/mobilier'
import { numeriques } from 'data/categories/numerique'
import { repas } from 'data/categories/repas'
import { usageNumeriques } from 'data/categories/usagenumerique'
import { computeECV } from 'utils/computeECV'

const equivalents = [
  ...boissons,
  ...flattenEquivalents(deplacements),
  ...electromenager,
  ...habillements,
  ...mobiliers,
  ...numeriques,
  ...usageNumeriques,
  ...repas,
  ...chauffage,
  ...fruitsEtLegumes,
  ...casPratiques,
]

export const computedEquivalents = equivalents.map((equivalent) => ({
  ...equivalent,
  link: `/outils/${categories.find((category) => category.id === equivalent.category)?.slug}/${equivalent.slug}`,
  value: computeECV(equivalent),
})) as ComputedEquivalent[]
