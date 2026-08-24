import { Equivalent } from 'types/equivalent'

export const computeFootprint = (equivalent: Equivalent) => {
  let total = 0
  if ('ecv' in equivalent && equivalent.ecv) {
    total += equivalent.ecv.reduce((sum, { value }) => sum + value, 0)
  } else if ('total' in equivalent && equivalent.total) {
    total += equivalent.total
  }
  return total
}

export const computeECV = (equivalent: Equivalent, yearsOfUsage?: number) => {
  let total = computeFootprint(equivalent)

  if (equivalent.usage && typeof equivalent.usage !== 'number') {
    total += (yearsOfUsage || equivalent.usage.defaultyears) * equivalent.usage.peryear
  }

  if (equivalent.end) {
    total += equivalent.end
  }

  return total
}
