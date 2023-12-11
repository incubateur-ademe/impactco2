import { DeplacementEquivalent } from 'types/equivalent'

export const filterByDistance = (display: DeplacementEquivalent['display'], value: number) => {
  if (!display || (!display.min && !display.max)) {
    return true
  }

  if (display.max && display.max < value) {
    return false
  }

  if (display.min && display.min > value) {
    return false
  }

  return true
}
