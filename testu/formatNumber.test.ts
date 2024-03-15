import formatNumber from 'utils/formatNumber'

describe('formatNumber', () => {
  it('Formatte un nombre entier', () => {
    expect(formatNumber(123)).toBe(123)
  })
  it('Un nombre à décimale, supérieur à 100, est arrondi', () => {
    expect(formatNumber(123.39)).toBe(123)
    expect(formatNumber(123.89)).toBe(124)
  })
  it("Un nombre à décimale, supérieur à 10, ne garde qu'une seule décimale", () => {
    expect(formatNumber(13.39)).toBe(13.4)
    expect(formatNumber(13.897)).toBe(13.9)
  })
  it('Un nombre à décimale est arrondi de manière à ne garder que deux chiffres significatifs', () => {
    expect(formatNumber(0.456)).toBe(0.46)
    expect(formatNumber(0.0256)).toBe(0.03)
  })
})
