import { computedEquivalents } from 'src/providers/equivalents'
import values from 'utils/Equivalent/values.json'

describe('Translation', () => {
  test('All equivalents are translated', () => {
    const missings = new Set()
    computedEquivalents.forEach((equivalent) => {
      //@ts-expect-error: ok
      const value = values[equivalent.slug]
      if (!value) {
        missings.add(`Missing value for ${equivalent.slug}`)
      }
      if (!value.fr || value.fr === 'TODO') {
        missings.add(`Missing value for ${equivalent.slug} in french`)
      }
      if (!value.en || value.en === 'TODO') {
        missings.add(`Missing value for ${equivalent.slug} in english`)
      }
      if (!value.de || value.de === 'TODO') {
        missings.add(`Missing value for ${equivalent.slug} in german`)
      }
      if (!value.es || value.es === 'TODO') {
        missings.add(`Missing value for ${equivalent.slug} in espagnol`)
      }
    })
    if ([...missings].length > 0) {
      missings.forEach(console.log)
      expect(true).toBeFalsy()
    }
  })
})
