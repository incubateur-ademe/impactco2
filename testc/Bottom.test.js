import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithWrapper } from '../test-utils/render-with-wrapper.js'
import Bottom from 'components/misc/category/Bottom'

describe('Bottom - Texte et bouton affichés en bas de chaque thématique', () => {
  // See https://webtips.dev/how-to-mock-processenv-in-jest
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, NEXT_PUBLIC_URL: 'https://example.com' }
  })

  afterEach(() => {
    process.env = env
  })

  test('Affiche un texte et un bouton par défaut', async () => {
    // When
    renderWithWrapper(<Bottom category={{}} />)
    // Then
    expect(await screen.findByTestId('bottomText')).toBeInTheDocument()
    expect(await screen.findByTestId('bottomText')).toHaveTextContent('Valeurs exprimées en kg CO2e émis')
    expect(await screen.findByTestId('bottomButton')).toBeInTheDocument()
  })
  test("Le bouton a bien le texte 'Voir toutes les thématiques'", async () => {
    // When
    renderWithWrapper(<Bottom category={{}} />)
    // Then
    expect(await actionButton(screen)).toHaveTextContent('Voir toutes les thématiques')
  })
  test('Le bouton redirige bien vers /thematiques par défaut', async () => {
    // When
    renderWithWrapper(<Bottom category={{}} />)
    // Then
    expect(await actionButton(screen)).toHaveAttribute('href', '/thematiques')
  })
  test('Le bouton redirige bien vers https://example.com/thematiques si la propriété iframe est présente', async () => {
    // When
    renderWithWrapper(<Bottom category={{}} iframe />)
    // Then
    expect(await actionButton(screen)).toHaveAttribute('href', 'https://example.com/thematiques')
  })
})

async function actionButton(screen) {
  return (await screen.findByTestId('bottomButton')).querySelector('a')
}
