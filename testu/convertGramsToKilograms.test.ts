import { convertGramsToKilograms } from 'components/livraison/utils'

describe('convertGramsToKilograms', () => {
  test('Converti un nombre de grammes (nombre), en kilogrammes (chaîne de caractère), avec virgule et 2 chiffres derrières', () => {
    expect(convertGramsToKilograms(1530)).toBe('1,53')
    expect(convertGramsToKilograms(1500)).toBe('1,50')
    expect(convertGramsToKilograms(500)).toBe('0,50')
  })

  test('Converti en arrondissant correctement', () => {
    expect(convertGramsToKilograms(1539)).toBe('1,54')
    expect(convertGramsToKilograms(2141)).toBe('2,14')
  })

  test('Est capable de convertir un poids nul', () => {
    expect(convertGramsToKilograms(0)).toBe('0,00')
  })

  test('Accepte un nombre de grammes négatifs', () => {
    expect(convertGramsToKilograms(-1000)).toBe('-1,00')
  })

  test("N'accepte pas une entrée non-numérique : renvoie une chaîne de caractère vide", () => {
    expect(convertGramsToKilograms('abc')).toBe('')
    expect(convertGramsToKilograms(/^/)).toBe('')
    expect(convertGramsToKilograms(new Date())).toBe('')
    expect(convertGramsToKilograms(NaN)).toBe('')
    expect(convertGramsToKilograms([])).toBe('')
  })
})
