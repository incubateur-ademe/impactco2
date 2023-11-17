// Import the route file and the library
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { createMocks } from 'node-mocks-http'
import hello from 'pages/api/hello'

// Please read https://mswjs.io/docs/integrations/node
const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts/1', () => {
    return HttpResponse.json({ stubbed: 'stuff' })
  }),
]

const server = setupServer(...handlers)

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url)
})

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Write a test using Jest
test('should return a greeting message', async () => {
  // Create mock request and response objects
  const { req, res } = createMocks({
    method: 'GET',
  })

  // Call the route function with the mock objects
  await hello(req, res)

  // Assert the expected behavior
  expect(res._getStatusCode()).toBe(200)
  expect(JSON.parse(res._getData())).toStrictEqual({ stubbed: 'stuff' })
})
