import axios from 'axios'
import { createMocks } from 'node-mocks-http'
import notion from 'pages/api/notion'
import { trackAPIRequest } from 'utils/middleware'

jest.mock('utils/middleware', () => ({
  trackAPIRequest: jest.fn(),
}))
jest.mock('axios')
describe('/api/notion', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
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
  test("retourne une 400 si pas d'entrée", async () => {
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
  test('retourne une 400 si les entrées sont non valides', async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'foo',
        email: 'bar',
      },
    })

    // Call the route function with the mock objects
    await notion(req, res)

    // Assert the expected behavior
    expect(res._getStatusCode()).toBe(400)
  })
  test('retourne une 201 si les entrées sont valides', async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'contact',
        email: 'valid@email.com',
      },
    })

    // Call the route function with the mock objects
    await notion(req, res)

    // Assert the expected behavior
    expect(res._getStatusCode()).toBe(201)
  })
  test("Demande à l'API d'être tracée si les entrées sont valides", async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'contact',
        email: 'valid@email.com',
      },
    })

    // Call the route function with the mock objects
    await notion(req, res)

    // Assert the expected behavior
    expect(trackAPIRequest).toHaveBeenCalled()
  })
  test("Ne Demande pas à l'API d'être tracée si les entrées sont invalides", async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'foo',
        email: 'bar',
      },
    })

    // Call the route function with the mock objects
    await notion(req, res)

    // Assert the expected behavior
    expect(trackAPIRequest).not.toHaveBeenCalled()
  })
  test("N'appelle pas l'API notion si les entrées sont invalides", async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'foo',
        email: 'bar',
      },
    })

    // Call the route function with the mock objects
    await notion(req, res)

    // Assert the expected behavior
    expect(axios).not.toHaveBeenCalled()
  })
  test("Appelle l'API notion si les entrées sont valides", async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'contact',
        email: 'valid@email.com',
      },
    })

    // Call the route function with the mock objects
    await notion(req, res)

    // Assert the expected behavior
    expect(axios.post).toHaveBeenCalledWith('https://api.notion.com/v1/pages', expect.any(Object), expect.any(Object))
  })
})
