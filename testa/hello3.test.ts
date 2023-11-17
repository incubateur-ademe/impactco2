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
  expect(JSON.parse(res._getData())).toStrictEqual({
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  })
})
