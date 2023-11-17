// Import the route file and the library
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { createMocks } from 'node-mocks-http'
import callGMap from 'pages/api/callGMap'

describe('CallGMap with msw', () => {
  // Please read https://mswjs.io/docs/integrations/node
  const handlers = [
    http.get('https://maps.googleapis.com/maps/api/distancematrix/json?nantes=&key=MOCKED_GMAP_KEY', () => {
      return HttpResponse.json({ calledDistanceMatrixApi: 'yes' })
    }),
  ]
  const server = setupServer(...handlers)
  server.events.on('request:start', ({ request }) => {
    console.log('MSW intercepted:', request.method, request.url)
  })
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  const env = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, GMAP_API_KEY: 'MOCKED_GMAP_KEY' }
  })
  afterEach(() => {
    process.env = env
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
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toStrictEqual({ calledDistanceMatrixApi: 'yes' })
  })
})
