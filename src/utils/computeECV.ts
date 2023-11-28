import { Equivalent } from 'types/equivalent'

export const computeECV = (equivalent: Equivalent, yearsOfUsage?: number) => {
  let total = 0
  if (equivalent.total !== undefined) {
    total += equivalent.total
  } else if (equivalent.ecv) {
    total += equivalent.ecv.reduce((sum, { value }) => sum + value, 0)
  }

  if (equivalent.usage) {
    total += (yearsOfUsage || equivalent.usage.defaultyears) * equivalent.usage.peryear
  }

  total += equivalent.end || 0
  return total
}

export const computeECVWithMultiplier = (equivalent: Equivalent) =>
  computeECV(equivalent) * (equivalent.multiplier || 1)
