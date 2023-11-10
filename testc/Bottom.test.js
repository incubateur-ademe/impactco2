import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithModal } from 'test-utils/render-with-modal'
import Bottom from 'components/misc/category/Bottom'

describe('Bottom - Texte et bouton affichés en bas de chaque thématique', () => {
  test('Affiche un texte et un bouton par défaut', async () => {
    // When
    renderWithModal(<Bottom category={{ divider: 1 }} />)
    // Then
    expect(await screen.findByTestId('bottomText')).toBeInTheDocument()
    expect(await screen.findByTestId('bottomButton')).toBeInTheDocument()
  })
  test("Le bouton a bien le texte 'Voir toutes les thématiques'", async () => {
    // When
    renderWithModal(<Bottom category={{ divider: 1 }} />)
    // Then
    expect(await actionButton(screen)).toHaveTextContent('Voir toutes les thématiques')
  })
  test('Le bouton redirige bien vers /thematiques par défaut', async () => {
    // When
    renderWithModal(<Bottom category={{ divider: 1 }} />)
    // Then
    expect(await actionButton(screen)).toHaveAttribute('href', '/thematiques')
  })
  test('Le bouton redirige bien vers https://impactco2.fr/thematiques si la propriété iframe est présente', async () => {
    // When
    renderWithModal(<Bottom category={{ divider: 1 }} iframe />)
    // Then
    expect(await actionButton(screen)).toHaveAttribute('href', 'https://impactco2.fr/thematiques')
  })
})

async function actionButton(screen) {
  return (await screen.findByTestId('bottomButton')).querySelector('a')
}
