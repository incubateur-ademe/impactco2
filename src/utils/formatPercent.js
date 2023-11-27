export default function formatPercent(value, total, noformat) {
  let tempPercent = (value / total) * 100
  return noformat ? tempPercent : tempPercent.toLocaleString('fr-fr', { maximumFractionDigits: 1 })
}
