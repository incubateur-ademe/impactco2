import formatNumber from './formatNumber'

export const getNumberPrecision = (number: number) => {
  return number >= 1 ? { value: formatNumber(number), unit: 'kg' } : { value: formatNumber(number * 1000), unit: 'g' }
}
