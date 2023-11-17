import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { StyleProvider } from 'components/providers/StyleProvider'
import Meeting from 'components/meeting/Meeting'

describe('Meeting', () => {
  // Mock & check HTTP call
  // Using https://mswjs.io/docs/integrations/node
  let apiNotionCalledNthTime = 0
  const server = setupServer(
    http.post('/api/notion', ({ request }) => {
      console.log('request: ', request)
      return HttpResponse.json({ calledApiNotion: 'yes' })
    })
  )
  server.events.on('request:start', ({ request }) => {
    console.log('MSW intercepted:', request.method, request.url)
    if (request.url === 'http://localhost/api/notion') {
      apiNotionCalledNthTime += 1
    }
  })
  beforeEach(() => (apiNotionCalledNthTime = 0))
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

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
    expect(apiNotionCalledNthTime).toBe(1)
  })
})
