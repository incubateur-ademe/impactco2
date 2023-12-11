import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import TransportPage from 'pages/transport.tsx'
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
    expect(await screen.findByTestId('vlo-ou-marche')).toBeInTheDocument()
  })
})

function getTransportCategory() {
  return {
    id: 4,
    name: 'Transport',
    emoji: '🚴‍♂️',
    slug: 'transport',
    title: "Découvrez l'impact du transport sur le climat",
    equivalent: 'mode[s] de transport',
    gender: 'm',
    divider: 1,
    display: true,
    unit: 'km',
    include:
      "par personne en France. Sont incluses les émissions directes, la construction des véhicules (fabrication, maintenance et fin de vie) et la production et distribution de carburant et d'électricité. La construction des infrastructures (routes, rails, aéroports...) n'est pas incluse.",
    meta: {
      title: 'Transport',
      description:
        "Quelle est l'empreinte carbone de vos déplacements ? Avec Impact CO2 vous connaitrez votre impact sur le climat",
    },
  }
}
