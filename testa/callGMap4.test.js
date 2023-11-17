// Import the route file and the library
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { createMocks } from 'node-mocks-http'
import callGMap from 'pages/api/callGMap'

describe('CallGMap with msw', () => {
  const DISTANCE_MATRIX_ENDPOINT =
    'https://maps.googleapis.com/maps/api/distancematrix/json?nantes=&key=MOCKED_GMAP_KEY'

  test('200: Should reach the distancematrix API (nominal scenario)', async () => {
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
    callsHistory.push({
      bodystr: tryParseJSONObject(await request.clone().text()) || {},
      method: request.method,
      pathname: new URL(request.url).pathname,
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
  // See https://stackoverflow.com/a/20392392/2595513
  function tryParseJSONObject(jsonString) {
    try {
      var o = JSON.parse(jsonString)

      // Handle non-exception-throwing cases:
      // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
      // but... JSON.parse(null) returns null, and typeof null === "object",
      // so we must check for that, too. Thankfully, null is falsey, so this suffices:
      if (o && typeof o === 'object') {
        return o
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}

    return false
  }
})
