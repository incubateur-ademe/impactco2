// Import the route file and the library
import { createMocks } from 'node-mocks-http'
import hello from 'pages/api/hello'

// Write a test using Jest
test.only('should return a greeting message', async () => {
  // Create mock request and response objects
  const { req, res } = createMocks({
    method: 'GET',
  })

  // Call the route function with the mock objects
  await hello(req, res)

  // Assert the expected behavior
  expect(res._getStatusCode()).toBe(200)
  expect(JSON.parse(res._getData())).toEqual({ hello: 'world' })
})
