import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import TransportPage from 'pages/transport.tsx'
import categories from 'data/categories.json'
import '../test-utils/match-media.js'
import { renderWithWrapper } from '../test-utils/render-with-wrapper'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))
describe('TransportPage - affiche la page itinéraire', () => {
  test('Par défaut, affiche le composant Distance', async () => {
    // Given
    mockRouter.push('/transport')
    // When
    renderWithWrapper(<TransportPage category={getTransportCategory()} />)
    // Then
    expect(await screen.findByTestId('distanceWrapper')).toBeInTheDocument()
  })
  test('Par défaut, affiche les bilans carbone', async () => {
    // Given
    mockRouter.push('/transport')
    // When
    renderWithWrapper(<TransportPage category={getTransportCategory()} />)
    // Then
    expect(await screen.findByTestId('bar-chart-item-velo')).toHaveTextContent('Vélo ou marche00 kg CO2e')
  })
  test("Par défaut, limite le nombre d'éléments affichés", async () => {
    // Given
    mockRouter.push('/transport')
    // When
    renderWithWrapper(<TransportPage category={getTransportCategory()} />)
    // Then
    const velo = await screen.findByTestId('bar-chart-item-velo')
    const co2list = velo.parentElement.querySelectorAll('a')
    expect(co2list.length).toBe(7)
  })
  test('Peut afficher tous les bilans carbone', async () => {
    // Given
    mockRouter.push('/transport')
    renderWithWrapper(<TransportPage category={getTransportCategory()} />)
    const velo = await screen.findByTestId('bar-chart-item-velo')
    // When
    act(() => {
      screen.getByLabelText('Voir tous les modes de transport').click()
    })
    // Then
    const co2list = velo.parentElement.querySelectorAll('a')
    expect(co2list.length).toBe(17)
  })
  test("Peut afficher le mode covoiturage, c'est à dire avec un nombre de participants", async () => {
    // Given
    mockRouter.push('/transport')
    renderWithWrapper(<TransportPage category={getTransportCategory()} />)
    await screen.findByTestId('bar-chart-item-velo')
    // When
    act(() => {
      screen.getByLabelText('Afficher le covoiturage').click()
    })
    // Then
    const voitureElectrique = await screen.queryAllByTestId('bar-chart-item-voitureelectrique')[0]
    expect(voitureElectrique.textContent).toBe('Voiture (moteur électrique)-avec 1 covoitureurs+0,5 kg CO2e')
  })
})

function getTransportCategory() {
  return categories.find((e) => e.id === 4)
}
