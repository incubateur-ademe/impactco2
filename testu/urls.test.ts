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

  test('may say that base URL is not defined', () => {
    process.env = { ...env, NEXT_PUBLIC_URL: undefined }
    const res = buildCurrentUrlFor('/livraison')
    expect(res).toEqual('undefined/livraison')
  })
})
