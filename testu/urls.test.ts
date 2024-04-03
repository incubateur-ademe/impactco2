import { buildCurrentUrlFor } from 'utils/urls'

describe('buildCurrentUrlFor', () => {
  // See https://webtips.dev/how-to-mock-processenv-in-jest
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, NEXT_PUBLIC_URL: 'https://example.com' }
  })

  afterEach(() => {
    process.env = env
  })

  test('concatenate path', () => {
    const res = buildCurrentUrlFor('livraison')
    expect(res).toEqual('https://example.com/livraison')
  })
  test('ignore extra / ', () => {
    const res = buildCurrentUrlFor('/livraison')
    expect(res).toEqual('https://example.com/livraison')
  })

  test('managed undefined', () => {
    process.env = { ...env, NEXT_PUBLIC_URL: undefined }
    const res = buildCurrentUrlFor('/livraison')
    expect(res).toEqual('https://impactco2.fr/livraison')
  })
})
