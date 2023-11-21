import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StyleProvider } from 'components/providers/StyleProvider'
import Meeting from 'components/meeting/Meeting'

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      post: jest.fn(),
    })),
  }
})

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
})
