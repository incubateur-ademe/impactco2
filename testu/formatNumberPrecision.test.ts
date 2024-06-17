import { getNumberPrecision } from 'utils/formatNumberPrecision'

const formatNumberPrecision = (number: number) => {
  const { value, unit } = getNumberPrecision(number)
  return `${value} ${unit}`
}

describe('formatNumberPrecision', () => {
  test('devrait formater un nombre inférieur à 1 kg (strictement) en grammes', () => {
    expect(formatNumberPrecision(0.123456)).toBe('123 g')
    expect(formatNumberPrecision(0.09521)).toBe('95.2 g')
    expect(formatNumberPrecision(0.007544)).toBe('7.54 g')
  })

  test('devrait formater un nombre supérieur ou égal à 1 en kilogrammes avec maximum 2 décimales', () => {
    expect(formatNumberPrecision(1)).toBe('1 kg')
    expect(formatNumberPrecision(2.3456)).toBe('2.35 kg')
    expect(formatNumberPrecision(3.456)).toBe('3.46 kg')
  })

  test('devrait gérer correctement la valeur zéro', () => {
    expect(formatNumberPrecision(0)).toBe('0 g')
  })

  test('devrait gérer correctement les valeurs négatives', () => {
    expect(formatNumberPrecision(-0.75)).toBe('-750 g')
  })
})
