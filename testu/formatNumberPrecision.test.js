import { formatNumberPrecision } from 'utils/formatters'

describe('formatNumberPrecision', () => {
  test('devrait formater un nombre inférieur à 1 kg (strictement) en grammes avec 2 décimales', () => {
    expect(formatNumberPrecision(0.1234)).toBe('123,40 g')
    expect(formatNumberPrecision(0.5)).toBe('500,00 g')
  })

  test('devrait formater un nombre supérieur ou égal à 1 en kilogrammes avec 2 décimales', () => {
    expect(formatNumberPrecision(1)).toBe('1,00 kg')
    expect(formatNumberPrecision(2.3456)).toBe('2,35 kg')
  })

  test('devrait gérer correctement la valeur zéro', () => {
    expect(formatNumberPrecision(0)).toBe('0,00 g')
  })

  test('devrait gérer correctement les valeurs négatives', () => {
    expect(formatNumberPrecision(-0.75)).toBe('-750,00 g')
  })
})
