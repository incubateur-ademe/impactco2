import { expect } from '@jest/globals'
import en from '../src/providers/locales/en.json'
import es from '../src/providers/locales/es.json'
import fr from '../src/providers/locales/fr.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkKeys = (translationA: any, translationB: any, path: string[], file: string) => {
  Object.keys(translationA).forEach((key) => {
    const currentPath = [...path, key].join('.')
    it(`should have translation ${currentPath} in ${file}`, () => {
      expect(translationB[key]).toBeDefined()
    })
    if (typeof translationA[key] === 'object' && translationA[key] !== null) {
      checkKeys(translationA[key], translationB[key], [...path, key], file)
    }
  })
}

describe('Translations', () => {
  checkKeys(en, fr, [], 'fr')
  checkKeys(fr, en, [], 'en')
  checkKeys(es, fr, [], 'fr')
  checkKeys(fr, es, [], 'es')
})
