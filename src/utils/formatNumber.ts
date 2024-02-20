export default function formatNumber(value: number) {
  if (!value) {
    return '0'
  }

  if (value > 100) {
    return Math.round(value)
  }

  if (value > 10) {
    return Math.round(value * 10) / 10
  }

  return Math.round(value * 100) / 100
}
