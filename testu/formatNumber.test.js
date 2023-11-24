import formatNumber from 'utils/formatNumber'

describe('formatNumber', () => {
  it('Renvoie zéro quand la valeur est falsy', () => {
    expect(formatNumber(null)).toBe(0)
  })
  it('Formatte un nombre entier au format Français', () => {
    expect(formatNumber(123)).toBe('123')
  })
  it('Un nombre à décimale, supérieur à 5, est tronqué ou arrondi', () => {
    expect(formatNumber(123.39)).toBe('123')
    expect(formatNumber(123.89)).toBe('124')
  })
  it('Un nombre à décimale, inférieur à 5, garde sa décimale', () => {
    expect(formatNumber(3.39)).toBe('3,4')
    expect(formatNumber(3.89)).toBe('3,9')
  })
  it("Un nombre à décimale est arrondi de manière à ne garder qu'un seul chiffre significatif", () => {
    expect(formatNumber(0.456)).toBe('0,5')
    expect(formatNumber(0.0256)).toBe('0,03')
  })
  it("Formatte jusqu'à 11 chiffres après la virgule, au format Français", () => {
    expect(formatNumber(0.0000000000123456789)).toBe('0,00000000001')
  })
  it('Renvoie zéro si le chiffre est trop petit', () => {
    expect(formatNumber(0.00000000000123456789)).toBe('0')
  })
})
