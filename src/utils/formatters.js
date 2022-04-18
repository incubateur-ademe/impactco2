export function formatNumber(value, noformat) {
  let tempTotal = Math.round(value * 100000) / 100000
  tempTotal =
    tempTotal > 0.001 ? Math.round(tempTotal * 10000) / 10000 : tempTotal
  tempTotal =
    tempTotal > 0.001 ? Math.round(tempTotal * 1000) / 1000 : tempTotal
  tempTotal = tempTotal > 0.01 ? Math.round(tempTotal * 100) / 100 : tempTotal
  tempTotal = tempTotal > 0.1 ? Math.round(tempTotal * 10) / 10 : tempTotal
  tempTotal = tempTotal > 1 ? Math.round(tempTotal * 1) / 1 : tempTotal
  return noformat ? tempTotal : tempTotal.toLocaleString('fr-fr')
}

export function formatName(name, value, capital) {
  const newName = name
    .replaceAll('[s]', value > 1 ? 's' : '')
    .replaceAll('[x]', value > 1 ? 'x' : '')

  return capital ? newName : newName.toLowerCase()
}

export function formatPercent(value, total) {
  let tempPercent = (value / total) * 100
  tempPercent = Math.round(tempPercent * 100) / 100
  tempPercent =
    tempPercent > 1 ? Math.round(tempPercent * 10) / 10 : tempPercent
  return tempPercent
}
