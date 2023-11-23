import getFrenchFormattedNumber from 'utils/getFrenchFormattedNumber'

describe('getFrenchFormattedNumber', () => {
  test('Donne un nombre au format Français', () => {
    expect(getFrenchFormattedNumber(25.12)).toBe('25,12')
  })
  test('Donne un nombre négatif au format Français', () => {
    expect(getFrenchFormattedNumber(-25.12)).toBe('-25,12')
  })
  test('Rend un zéro au format Français', () => {
    expect(getFrenchFormattedNumber(0)).toBe('0')
  })
  test('Ne tronque pas les décimales', () => {
    expect(getFrenchFormattedNumber(25.1277)).toBe('25,1277')
  })
})
