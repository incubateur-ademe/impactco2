export default function formatNumberPrecision(value) {
  const tempValue = value < 1 ? value * 1000 : value
  return (
    tempValue.toLocaleString('fr-fr', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }) + (value < 1 ? ' g' : ' kg')
  )
}
