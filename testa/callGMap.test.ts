import { rateLimit } from 'express-rate-limit'
import slowDown from 'express-slow-down'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks } from 'node-mocks-http'
import callGMap from 'pages/api/callGMap'
import matrixJson from 'test-mock/matrix.json'

const validBody = {
  destinations: {
    longitude: 1.2,
    latitude: 1.3,
  },
  origins: { longitude: 2.2, latitude: 2.3 },
}

jest.mock('express-slow-down', () =>
  jest.fn().mockImplementation(() => {
    return (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
      return next()
    }
  })
)
jest.mock('express-rate-limit', () => ({
  rateLimit: jest.fn().mockImplementation(() => {
    return (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
      return next()
    }
  }),
}))
const DISTANCE_MATRIX_ENDPOINT = 'https://maps.googleapis.com/maps/api/distancematrix/json'

describe('CallGMap', () => {
  test("Doit appeler l'API distanceMatrix", async () => {
    // Given
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap',
      body: validBody,
    })
    // When
    // @ts-expect-error: wrapped objects
    await callGMap(req, res)
    // Then
    expect(callsHistory[0]).toStrictEqual({
      pathname: '/maps/api/distancematrix/json',
      method: 'GET',
      searchParams: 'destinations=2.3%2C2.2&origins=1.3%2C1.2&mode=driving&key=MOCKED_GMAP_KEY',
    })
  })
  test('Si la limite est activée, refuse un appel ne provenant pas du site appelant', async () => {
    // Given
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap',
      body: validBody,
    })
    process.env = { ...process.env, LIMIT_API: 'activated' }
    // When
    // @ts-expect-error: wrapped objects
    await callGMap(req, res)
    // Then
    expect(res._getStatusCode()).toBe(403)
    expect(res._getData()).toStrictEqual('Not authorized')
  })
  test('Si la limite est activée, accepte un simple appel provenant du site appelant', async () => {
    // Given
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap',
      body: validBody,
      headers: {
        referer: 'https://example.com/any',
      },
    })
    process.env = { ...process.env, LIMIT_API: 'activated', NEXT_PUBLIC_URL: 'https://example.com' }
    // When
    // @ts-expect-error: wrapped objects
    await callGMap(req, res)
    // Then
    expect(res._getStatusCode()).toBe(200)
  })
  test("Si la limite est activée, peut ralentir ou stopper l'exécution", async () => {
    // Given
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap',
      body: validBody,
      headers: {
        referer: 'https://example.com/any',
      },
    })
    process.env = { ...process.env, LIMIT_API: 'activated', NEXT_PUBLIC_URL: 'https://example.com' }
    // When
    // @ts-expect-error: wrapped objects
    await callGMap(req, res)
    // Then
    expect(res._getStatusCode()).toBe(200)
    expect(slowDown).toHaveBeenCalledTimes(1)
    expect(rateLimit).toHaveBeenCalledTimes(1)
  })
  //---------
  // STUBBING PART BELOW
  //----------

  let callsHistory: {
    method: string
    pathname: string
    searchParams: string
  }[]
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
