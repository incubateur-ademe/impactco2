import { getNumberWithNDigitsAfterComma } from 'utils/formatters'

describe('getNumberWithNDigitsAfterComma', () => {
  test('Ne donne aucun chiffre après la virgule pour un chiffre entier', () => {
    expect(getNumberWithNDigitsAfterComma(25, 1)).toBe(25)
  })
  test('Donne 1 chiffre après la virgule (nominal)', () => {
    expect(getNumberWithNDigitsAfterComma(25.321, 1)).toBe(25.3)
  })
  test('Donne 2 chiffres après la virgule (nominal)', () => {
    expect(getNumberWithNDigitsAfterComma(25.321, 2)).toBe(25.32)
  })
  test('Donne 1 chiffre après la virgule et arrondi', () => {
    expect(getNumberWithNDigitsAfterComma(25.899, 1)).toBe(25.9)
  })
})
