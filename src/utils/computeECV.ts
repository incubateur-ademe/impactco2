import { Equivalent } from 'types/equivalent'

export const computeECV = (equivalent: Equivalent, yearsOfUsage?: number) => {
  let total = 0
  if ('total' in equivalent) {
    total += equivalent.total
  } else if ('ecv' in equivalent) {
    total += equivalent.ecv.reduce((sum, { value }) => sum + value, 0)
  }

  if ('usage' in equivalent) {
    total += (yearsOfUsage || equivalent.usage.defaultyears) * equivalent.usage.peryear
  }

  if ('end' in equivalent) {
    total += equivalent.end
  }

  return total
}

export const computeECVWithMultiplier = (equivalent: Equivalent) =>
  computeECV(equivalent) * ('multiplier' in equivalent ? equivalent.multiplier : 1)
