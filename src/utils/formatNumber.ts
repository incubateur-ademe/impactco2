export default function formatNumber(value: number) {
  if (!value) {
    return 0
  }
  let tempTotal = value > 0.0000001 ? Math.round(value * 10000000) / 10000000 : value
  tempTotal = tempTotal > 0.000001 ? Math.round(tempTotal * 1000000) / 1000000 : tempTotal
  tempTotal = tempTotal > 0.00001 ? Math.round(tempTotal * 100000) / 100000 : tempTotal
  tempTotal = tempTotal > 0.0001 ? Math.round(tempTotal * 10000) / 10000 : tempTotal
  tempTotal = tempTotal > 0.001 ? Math.round(tempTotal * 1000) / 1000 : tempTotal
  tempTotal = tempTotal > 0.01 ? Math.round(tempTotal * 100) / 100 : tempTotal
  tempTotal = tempTotal > 0.1 ? Math.round(tempTotal * 10) / 10 : tempTotal
  tempTotal = tempTotal > 5 ? Math.round(tempTotal * 1) / 1 : tempTotal
  return tempTotal.toLocaleString('fr-fr', { maximumFractionDigits: 11 })
}
