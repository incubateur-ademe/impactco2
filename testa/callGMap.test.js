// Import the route file and the library
import { rateLimit } from 'express-rate-limit'
import slowDown from 'express-slow-down'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { createMocks } from 'node-mocks-http'
import callGMap from 'pages/api/callGMap'
import matrixJson from 'test-mock/matrix.json'

jest.mock('express-slow-down', () =>
  jest.fn().mockImplementation(() => {
    return (req, res, next) => {
      return next()
    }
  })
)
jest.mock('express-rate-limit', () => ({
  rateLimit: jest.fn().mockImplementation(() => {
    return (req, res, next) => {
      return next()
    }
  }),
}))
describe('CallGMap', () => {
  const DISTANCE_MATRIX_ENDPOINT =
    'https://maps.googleapis.com/maps/api/distancematrix/json?nantes=&key=MOCKED_GMAP_KEY'

  test("Doit appeler l'API distanceMatrix", async () => {
    // Given
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
    })
    // When
    await callGMap(req, res)
    // Then
    expect(callsHistory[0]).toStrictEqual({
      pathname: '/maps/api/distancematrix/json',
      method: 'GET',
      searchParams: 'nantes=&key=MOCKED_GMAP_KEY',
    })
  })
  test('Doit retourner la même réponse que la distanceMatrix API', async () => {
    // Given
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
    })
    // When
    await callGMap(req, res)
    // Then
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toStrictEqual(matrixJson)
    console.log('res: ', res)
  })
  test('Si la limite est activée, refuse un appel ne provenant pas du site appelant', async () => {
    // Given
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
    })
    process.env = { ...process.env, LIMIT_API: 'activated' }
    // When
    await callGMap(req, res)
    // Then
    expect(res._getStatusCode()).toBe(403)
    expect(res._getData()).toStrictEqual('Not authorized')
  })
  test('Si la limite est activée, accepte un simple appel provenant du site appelant', async () => {
    // Given
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
      headers: {
        referer: 'https://example.com/any',
      },
    })
    process.env = { ...process.env, LIMIT_API: 'activated', WEBSITE_URL: 'example' }
    // When
    await callGMap(req, res)
    // Then
    expect(res._getStatusCode()).toBe(200)
  })
  test("Si la limite est activée, peut ralentir ou stopper l'exécution", async () => {
    // Given
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
      headers: {
        referer: 'https://example.com/any',
      },
    })
    process.env = { ...process.env, LIMIT_API: 'activated', WEBSITE_URL: 'example' }
    // When
    await callGMap(req, res)
    // Then
    expect(res._getStatusCode()).toBe(200)
    expect(slowDown).toHaveBeenCalledTimes(1)
    expect(rateLimit).toHaveBeenCalledTimes(1)
  })
  //---------
  // STUBBING PART BELOW
  //----------
  let callsHistory = []
  const server = setupServer(http.get(DISTANCE_MATRIX_ENDPOINT, () => HttpResponse.json(matrixJson)))
  const env = process.env
  server.events.on('request:start', async ({ request }) => {
    callsHistory.push({
      method: request.method,
      pathname: new URL(request.url).pathname,
      searchParams: new URL(request.url).searchParams.toString(),
    })
  })
  beforeAll(() => server.listen())
  beforeEach(() => {
    callsHistory = []
    jest.resetModules()
    process.env = { ...env, GMAP_API_KEY: 'MOCKED_GMAP_KEY' }
  })
  afterEach(() => {
    process.env = env
    server.resetHandlers()
  })
  afterAll(() => server.close())
})
