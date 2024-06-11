/**
 * @jest-environment node
 */

describe('/api/notion', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('retourne une 405 si pas de POST', async () => {
    const result = await fetch('http://localhost:3000/api/notion')

    expect(result.status).toBe(405)
  })

  test('retourne une 400 si les entrées sont non valides', async () => {
    const result = await fetch('http://localhost:3000/api/notion', {
      method: 'POST',
      body: JSON.stringify({
        type: 'foo',
        email: 'bar',
      }),
    })

    expect(result.status).toBe(400)
  })
})
