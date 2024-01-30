import formatPercent from 'utils/formatPercent'

describe('formatPercent', () => {
  test('Devrait calculer le pourcentage correctement sans formatage', () => {
    expect(formatPercent(25, 100, true)).toBe(25)
  })

  test('Ne met pas de virgule si le pourcentage est un chiffre entier', () => {
    expect(formatPercent(26, 100, true)).toBe(26)
  })

  test('Devrait calculer et formater correctement le pourcentage avec une écriture Française', () => {
    expect(formatPercent(26.4, 100)).toBe('26,4')
  })

  test("S'arrête à un chiffre après la virgule", () => {
    expect(formatPercent(26.47, 100)).toBe('26,5')
  })

  test('Calcul seul la fraction même si le 2ème argument ne vaut pas 100', () => {
    expect(formatPercent(3, 7)).toBe('42,9')
  })

  test('Ne peut pas gérer un 2è argument à zéro', () => {
    expect(formatPercent(25, 0)).toBe('∞')
  })

  test('Ne peut pas gérer une entrée non numérique', () => {
    expect(formatPercent('abc', 100, true)).toBe(NaN)
  })
})
