import slugify from 'utils/slugify'

describe('slugify', () => {
  test('Transforme une chaîne de caractère en slug - avec des majuscules', () => {
    expect(slugify('HHWW')).toBe('hhww')
  })
  test('Transforme une chaîne de caractère en slug - avec un espace', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })
  test('Transforme une chaîne de caractère en slug - avec des caractères spéciaux', () => {
    expect(slugify('Ow!')).toBe('ow')
  })
  test('Transforme une chaîne de caractère en slug - avec des accents', () => {
    expect(slugify('éàù')).toBe('eau')
  })
})
