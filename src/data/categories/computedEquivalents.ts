import { ComputedEquivalent, Equivalent } from 'types/equivalent'
import { computeECV } from '../../utils/computeECV'

export const computedEquivalents = (category: string, equivalents: Equivalent[]) =>
  equivalents.map((equivalent) => ({
    ...equivalent,
    link: `/outils/${category}/${equivalent.slug}`,
    value: computeECV(equivalent),
  })) as ComputedEquivalent[]
