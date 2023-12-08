import getStringAfterLastSlash from 'utils/getStringAfterLastSlash'

describe('getStringAfterLastSlash', () => {
  test('Retourne la chaîne de caractère qui est après le dernier slash', () => {
    expect(getStringAfterLastSlash('/aa/bb/cc')).toBe('cc')
  })
  test("Retourne une chaîne de caractère vide si il n'y a pas de slash", () => {
    expect(getStringAfterLastSlash('aabbcc')).toBe('')
  })
  test('Retourne une chaîne de caractère vide si un slash termine la chaîne', () => {
    expect(getStringAfterLastSlash('/aa/bb/cc/')).toBe('')
  })
})
