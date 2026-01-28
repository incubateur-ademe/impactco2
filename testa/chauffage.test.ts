/**
 * @jest-environment node
 */
import equivalentValues from '../src/utils/Equivalent/values.json'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'

const chauffageSlugs = [
  'chauffagegaz',
  'chauffagefioul',
  'chauffageelectrique',
  'pompeachaleur',
  'poeleagranule',
  'poeleabois',
  'reseaudechaleur',
  'chaudiereagranule',
  'chaudiereabois',
]

const getExpectedData = (m2: number, language: 'fr' | 'en') => {
  return chauffageSlugs.map((slug) => {
    const value = equivalentValues[slug as keyof typeof equivalentValues] as any
    const ecv = (value.value * m2) / 1000
    const name = getNameWithoutSuffix(language, { category: value.category, slug })
    return { ecv, name, slug }
  })
}

const expectCloseTo = (
  actual: { data: { slug: string; name: string; ecv: number }[]; warning: string },
  expected: { data: { slug: string; name: string; ecv: number }[] }
) => {
  expect(actual.data).toHaveLength(expected.data.length)
  actual.data.forEach((item: any, index: number) => {
    const expectedItem = expected.data[index]
    expect(item.slug).toBe(expectedItem.slug)
    expect(item.name).toBe(expectedItem.name)
    expect(item.ecv).toBeCloseTo(expectedItem.ecv, 6)
  })
  expect(actual.warning).toBe(
    "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite."
  )
}

describe('chauffage', () => {
  test('get default values', async () => {
    const result = await fetch('http://localhost:3000/api/v1/chauffage')

    expect(result.status).toBe(200)
    const data = await result.json()
    expectCloseTo(data, {
      data: getExpectedData(63, 'fr'),
    })
  })

  test('get values in english', async () => {
    const result = await fetch('http://localhost:3000/api/v1/chauffage?language=en')

    expect(result.status).toBe(200)
    const data = await result.json()
    expectCloseTo(data, {
      data: getExpectedData(63, 'en'),
    })
  })

  test('get specific values', async () => {
    const result = await fetch('http://localhost:3000/api/v1/chauffage?chauffages=4,6')

    expect(result.status).toBe(200)
    const data = await result.json()
    const expectedData = getExpectedData(63, 'fr')
    expectCloseTo(data, {
      data: [expectedData[3], expectedData[5]],
    })
  })

  test('get specific surface', async () => {
    const result = await fetch('http://localhost:3000/api/v1/chauffage?m2=100')

    expect(result.status).toBe(200)
    const data = await result.json()
    expectCloseTo(data, {
      data: getExpectedData(100, 'fr'),
    })
  })
})
