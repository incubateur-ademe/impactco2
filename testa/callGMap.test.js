// Import the route file and the library
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { createMocks } from 'node-mocks-http'
import callGMap from 'pages/api/callGMap'
import { tryParseJSONObject } from 'test-utils/try-json-parse'

describe('CallGMap with msw', () => {
  const DISTANCE_MATRIX_ENDPOINT =
    'https://maps.googleapis.com/maps/api/distancematrix/json?nantes=&key=MOCKED_GMAP_KEY'

  test('200: Should return the body of the response of the distancematrix API', async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
    })

    // Call the route function with the mock objects
    await callGMap(req, res)

    // Assert the expected behavior
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toStrictEqual({ called: 'api' })
  })
  test('200: Should reach the distancematrix API (nominal scenario)', async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
    })

    // Call the route function with the mock objects
    await callGMap(req, res)

    // Assert the expected behavior
    expect(callsHistory[0]).toStrictEqual({
      pathname: '/maps/api/distancematrix/json',
      method: 'GET',
      body: {},
      searchParams: 'nantes=&key=MOCKED_GMAP_KEY',
    })
  })
  //---------
  // STUBBING PART BELOW
  //----------
  // Mock & check HTTP call
  // Using https://mswjs.io/docs/integrations/node
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  // Mock & check HTTP call
  let callsHistory = []
  const server = setupServer(http.get(DISTANCE_MATRIX_ENDPOINT, () => HttpResponse.json({ called: 'api' })))

  server.events.on('request:start', async ({ request }) => {
    console.log(request.url)
    callsHistory.push({
      body: tryParseJSONObject(await request.clone().text()),
      method: request.method,
      pathname: new URL(request.url).pathname,
      searchParams: new URL(request.url).searchParams.toString(),
    })
  })
  beforeEach(() => (callsHistory = []))
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  // Mocking ENV variables
  const env = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, GMAP_API_KEY: 'MOCKED_GMAP_KEY' }
  })
  afterEach(() => {
    process.env = env
  })
})
