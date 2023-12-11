import { Equivalent } from 'types/equivalent'

export const computeFootprint = (equivalent: Equivalent) => {
  let total = 0
  if ('total' in equivalent) {
    total += equivalent.total
  } else if ('ecv' in equivalent) {
    total += equivalent.ecv.reduce((sum, { value }) => sum + value, 0)
  }
  return total
}

export const computeECV = (equivalent: Equivalent, yearsOfUsage?: number) => {
  let total = computeFootprint(equivalent)

  if ('usage' in equivalent) {
    total += (yearsOfUsage || equivalent.usage.defaultyears) * equivalent.usage.peryear
  }
  if ('end' in equivalent) {
    total += equivalent.end
  }

  return total
}
