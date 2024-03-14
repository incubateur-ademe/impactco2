import formatNumberPrecision from 'utils/formatNumberPrecision'

describe('formatNumberPrecision', () => {
  test('devrait formater un nombre inférieur à 1 kg (strictement) en grammes avec maximum 2 décimales', () => {
    expect(formatNumberPrecision(0.123456)).toBe('123,46 g')
    expect(formatNumberPrecision(0.12345)).toBe('123,45 g')
    expect(formatNumberPrecision(0.5)).toBe('500 g')
  })

  test('devrait formater un nombre supérieur ou égal à 1 en kilogrammes avec maximum 2 décimales', () => {
    expect(formatNumberPrecision(1)).toBe('1 kg')
    expect(formatNumberPrecision(2.3456)).toBe('2,35 kg')
    expect(formatNumberPrecision(3.456)).toBe('3,46 kg')
  })

  test('devrait gérer correctement la valeur zéro', () => {
    expect(formatNumberPrecision(0)).toBe('0 g')
  })

  test('devrait gérer correctement les valeurs négatives', () => {
    expect(formatNumberPrecision(-0.75)).toBe('-750 g')
  })
})
