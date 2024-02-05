import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
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
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      url: '/api/notion',
    })

    // When
    await notion(req, res)

    // Then
    expect(res._getStatusCode()).toBe(405)
  })

  test('retourne une 400 si les entrées sont non valides', async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'foo',
        email: 'bar',
      },
    })

    // When
    await notion(req, res)

    // Then
    expect(res._getStatusCode()).toBe(400)
  })

  test('retourne une 201 si les entrées sont valides', async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'contact',
        email: 'valid@email.com',
        structure: 'structure',
        from: 'from',
      },
    })

    // When
    await notion(req, res)

    // Then
    expect(res._getStatusCode()).toBe(201)
  })

  test("Demande à l'API d'être tracée si les entrées sont valides", async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'contact',
        email: 'valid@email.com',
        structure: 'structure',
        from: 'from',
      },
    })

    // When
    await notion(req, res)

    // Then
    expect(trackAPIRequest).toHaveBeenCalled()
  })

  test("Ne Demande pas à l'API d'être tracée si les entrées sont invalides", async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'foo',
        email: 'bar',
      },
    })

    // When
    await notion(req, res)

    // Then
    expect(trackAPIRequest).not.toHaveBeenCalled()
  })

  test("N'appelle pas l'API notion si les entrées sont invalides", async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'foo',
        email: 'bar',
      },
    })

    // When
    await notion(req, res)

    // Then
    expect(axios).not.toHaveBeenCalled()
  })

  test("Appelle l'API notion si les entrées sont valides", async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      url: '/api/notion',
      body: {
        type: 'contact',
        email: 'valid@email.com',
        structure: 'structure',
        from: 'from',
      },
    })

    // When
    await notion(req, res)

    // Then
    expect(axios.post).toHaveBeenCalledWith('https://api.notion.com/v1/pages', expect.any(Object), expect.any(Object))
  })
})
