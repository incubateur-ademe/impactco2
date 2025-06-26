import formatNumber from './formatNumber'

export const getNumberPrecision = (number: number) => {
  if (number >= 1_000_000) {
    return { value: formatNumber(number / 1_000_000), unit: 'mt' }
  }
  if (number >= 1_000) {
    return { value: formatNumber(number / 1_000), unit: 't' }
  }
  if (number >= 1) {
    return { value: formatNumber(number), unit: 'kg' }
  }
  return { value: formatNumber(number * 1000), unit: 'g' }
}
