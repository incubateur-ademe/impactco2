import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { StyleProvider } from 'components/providers/StyleProvider'
import Meeting from 'components/meeting/Meeting'

describe('Meeting', () => {
  it("Lorsque un utilisateur entre son email et valide, un message de confirmation s'affiche à l'écran", async () => {
    // Given
    render(
      <StyleProvider>
        <Meeting />
      </StyleProvider>
    )
    expect(screen.queryByTestId('sentMessage')).not.toBeInTheDocument()
    // When
    await userEvent.clear(screen.queryByTestId('emailInput'))
    await userEvent.type(screen.queryByTestId('emailInput'), 'aa@bb.com')
    await userEvent.click(screen.getByLabelText('Prendre rendez-vous'))
    // Then
    expect(screen.queryByTestId('sentMessage')).toBeInTheDocument()
  })
  it("Lorsque un utilisateur entre son email et valide, l'email est envoyé à l'API pour traitement", async () => {
    // Given
    expect(callsHistory).toStrictEqual([])
    render(
      <StyleProvider>
        <Meeting />
      </StyleProvider>
    )
    expect(screen.queryByTestId('sentMessage')).not.toBeInTheDocument()
    // When
    await userEvent.clear(screen.queryByTestId('emailInput'))
    await userEvent.type(screen.queryByTestId('emailInput'), 'aa@bb.com')
    await userEvent.click(screen.getByLabelText('Prendre rendez-vous'))
    // Then
    expect(callsHistory.length).toBe(1)
    expect(callsHistory[0]).toStrictEqual({
      method: 'POST',
      pathname: '/api/notion',
      body: {
        email: 'aa@bb.com',
        type: 'contact',
      },
    })
  })

  // Mock & check HTTP call
  // Using https://mswjs.io/docs/integrations/node
  let callsHistory = []
  const server = setupServer(http.post('/api/notion', () => HttpResponse.json({})))

  server.events.on('request:start', async ({ request }) => {
    console.log('MSW intercepted:', request.method, request.url, request.headers)
    callsHistory.push({
      body: JSON.parse(await request.clone().text()),
      method: request.method,
      pathname: new URL(request.url).pathname,
    })
    console.log('callsHistory: ', callsHistory)
  })
  beforeEach(() => (callsHistory = []))
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
})
