import formatNumber from 'utils/formatNumber'

describe('formatNumber', () => {
  it('Renvoie zéro quand la valeur est falsy', () => {
    expect(formatNumber(null)).toBe(0)
  })
  it('Arrondis et formatte un nombre à décimale au format Français', () => {
    expect(formatNumber(0.456)).toBe('0,5')
  })
  it("Formatte jusqu'à 11 chiffres après la virgule, au format Français", () => {
    expect(formatNumber(0.0000000000123456789)).toBe('0,00000000001')
  })
  it('Renvoie zéro si le chiffre est trop petit', () => {
    expect(formatNumber(0.00000000000123456789)).toBe('0')
  })
})
