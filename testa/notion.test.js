import { createMocks } from 'node-mocks-http'
import notion from 'pages/api/notion'

describe('/api/notion', () => {
  test('retourne une 405 si pas de POST', async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/notion',
    })

    // Call the route function with the mock objects
    await notion(req, res)

    // Assert the expected behavior
    expect(res._getStatusCode()).toBe(405)
  })
  test('retourne une 400 si les entrées sont non valides', async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/notion',
    })

    // Call the route function with the mock objects
    await notion(req, res)

    // Assert the expected behavior
    expect(res._getStatusCode()).toBe(400)
  })
})
