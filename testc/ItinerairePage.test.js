import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import ItinerairePage from 'pages/transport/itineraire.tsx'
import categories from 'data/categories.json'
import { renderWithWrapper } from '../test-utils/render-with-wrapper'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))
describe('ItinerairePage - affiche la page itinéraire', () => {
  test('Par défaut, affiche le composant Itineraire', async () => {
    // Given
    mockRouter.push('/transport/itineraire')
    // When
    renderWithWrapper(<ItinerairePage category={getTransportCategory()} />)
    // Then
    expect(await screen.findByTestId('itineraryWrapper')).toBeInTheDocument()
  })
})

function getTransportCategory() {
  return categories.find((e) => e.id === 4)
}
