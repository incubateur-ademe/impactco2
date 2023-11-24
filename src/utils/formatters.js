import formatName from './formatName'
import formatNumber from './formatNumber'

export function formatTotal(equivalent, years, end) {
  let total =
    equivalent.total || equivalent.total === 0
      ? equivalent.total
      : equivalent.ecv.reduce((acc, cur) => acc + cur.value, 0)

  if (years !== 0 && equivalent.usage) {
    total += (years || equivalent.usage.defaultyears) * equivalent.usage.peryear
  }

  if (end) {
    total += equivalent.end
  }
  return total
}
export function formatTotalByMultiplier(equivalent) {
  let total =
    equivalent.total || equivalent.total === 0
      ? equivalent.total
      : equivalent.ecv.reduce((acc, cur) => acc + cur.value, 0)

  if (equivalent.usage) {
    total += equivalent.usage.defaultyears * equivalent.usage.peryear
  }

  return equivalent.multiplier ? total * equivalent.multiplier : total
}
export function formatTotalByKm(equivalent, km) {
  return (
    (equivalent.total || equivalent.total === 0
      ? equivalent.total
      : (equivalent?.ecvs?.find((ecv) => ecv.max > km)?.ecv || equivalent.ecv).reduce(
          (acc, cur) => acc + cur.value,
          0
        )) * km
  )
}
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
    formatNumber(obj.weight / formatTotalByMultiplier(obj.equivalent)) +
    ' ' +
    formatName(
      (obj.equivalent.prefix || '') + obj.equivalent.name,
      obj.weight / formatTotalByMultiplier(obj.equivalent)
    )
  )
}
