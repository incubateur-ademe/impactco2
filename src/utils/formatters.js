export function formatNumber(value, noformat) {
  let tempTotal = Math.round(value * 1000000) / 1000000
  tempTotal =
    tempTotal > 0.0001 ? Math.round(tempTotal * 10000) / 10000 : tempTotal
  tempTotal =
    tempTotal > 0.001 ? Math.round(tempTotal * 1000) / 1000 : tempTotal
  tempTotal = tempTotal > 0.01 ? Math.round(tempTotal * 100) / 100 : tempTotal
  tempTotal = tempTotal > 0.1 ? Math.round(tempTotal * 10) / 10 : tempTotal
  tempTotal = tempTotal > 2 ? Math.round(tempTotal * 1) / 1 : tempTotal
  return noformat
    ? tempTotal
    : tempTotal.toLocaleString('fr-fr', { maximumFractionDigits: 10 })
}
export function formatNumberFixed(value, digits) {
  return value.toLocaleString('fr-fr', {
    maximumFractionDigits: digits || 1,
    minimumFractionDigits: digits || 1,
  })
}
export function formatName(name = '', value = 1, capital) {
  const newName = name
    .replaceAll('[s]', value > 1 ? 's' : '')
    .replaceAll('[x]', value > 1 ? 'x' : '')

  return capital ? newName : newName.toLowerCase()
}

export function formatPercent(value, total, noformat) {
  let tempPercent = (value / total) * 100
  return noformat
    ? tempPercent
    : tempPercent.toLocaleString('fr-fr', { maximumFractionDigits: 1 })
}
export function formatTotal(equivalent, years, end) {
  let total =
    equivalent.total || equivalent.total === 0
      ? equivalent.total
      : equivalent.ecv.reduce((acc, cur) => acc + cur.value, 0)
  if (years) {
    total += years * equivalent.usage.peryear
  }
  if (end) {
    total += equivalent.end
  }
  return total
}
