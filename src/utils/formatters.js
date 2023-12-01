import { computeECVWithMultiplier } from './computeECV'
import formatName from './formatName'
import formatNumber from './formatNumber'

export function formatConstruction(equivalent) {
  return equivalent.total || equivalent.total === 0
    ? equivalent.total
    : equivalent.ecv.reduce((acc, cur) => acc + ([1, 2, 3, 4, 5].includes(cur.id) ? cur.value : 0), 0)
}
export function formatUsage(equivalent, years) {
  if (equivalent.usage) {
    return (years || equivalent.usage.defaultyears) * equivalent.usage.peryear
  }
  if (equivalent?.ecv?.find((ecv) => [6, 7, 8].includes(ecv.id))) {
    const usage = equivalent.ecv.reduce((acc, cur) => acc + ([6, 7, 8].includes(cur.id) ? cur.value : 0), 0)
    return usage
  }
  return 0
}

export function fullSentenceFormat(obj) {
  return (
    formatNumber(obj.weight / computeECVWithMultiplier(obj.equivalent)) +
    ' ' +
    formatName(
      (obj.equivalent.prefix || '') + obj.equivalent.name,
      obj.weight / computeECVWithMultiplier(obj.equivalent)
    )
  )
}
