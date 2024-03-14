import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'
import TransportPage from 'pages/transport/index'
import { Category } from 'types/category.js'
import categories from 'data/categories.json'
import '../test-utils/match-media.js'
import { renderWithWrapper } from '../test-utils/render-with-wrapper.js'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))
jest.mock('@incubateur-ademe/publicodes-negaoctet', () => ({}))

const category = categories.find((e) => e.id === 4) as Category
describe('TransportPage - affiche la page itinéraire', () => {
  test('Par défaut, affiche le composant Distance', async () => {
    // Given
    mockRouter.push('/transport')
    // When
    renderWithWrapper(<TransportPage category={category} />)
    // Then
    expect(await screen.findByTestId('distance-wrapper')).toBeInTheDocument()
  })

  test('Par défaut, affiche les bilans carbone', async () => {
    // Given
    mockRouter.push('/transport')
    // When
    renderWithWrapper(<TransportPage category={category} />)
    // Then
    expect(await screen.findByTestId('bar-chart-item-velo')).toHaveTextContent('Vélo ou marche0 kg CO2e')
  })

  test("Par défaut, limite le nombre d'éléments affichés", async () => {
    // Given
    mockRouter.push('/transport')
    // When
    renderWithWrapper(<TransportPage category={category} />)
    // Then
    const co2list = screen.queryAllByTestId('bar-chart-item-value')
    expect(co2list.length).toBe(7)
  })

  test('Peut afficher tous les bilans carbone', async () => {
    // Given
    mockRouter.push('/transport')
    renderWithWrapper(<TransportPage category={category} />)
    // When
    act(() => {
      screen.getByLabelText('Voir tous les modes de transport').click()
    })
    // Then
    const co2list = screen.queryAllByTestId('bar-chart-item-value')
    expect(co2list.length).toBe(17)
  })

  test("Peut afficher le mode covoiturage, c'est à dire avec un nombre de participants", async () => {
    // Given
    mockRouter.push('/transport')
    renderWithWrapper(<TransportPage category={category} />)
    // When
    act(() => {
      screen.getByLabelText('Afficher le covoiturage').click()
    })
    // Then
    const voitureElectrique = await screen.queryAllByTestId('bar-chart-item-voitureelectrique')[0]
    expect(voitureElectrique.textContent).toBe('Voiture (moteur électrique)-avec 1 covoitureurs+0.52 kg CO2e')
  })

  test('shares with default parameters', async () => {
    mockRouter.push('/transport')
    renderWithWrapper(<TransportPage category={category} />)

    act(() => {
      screen.getByTestId('header-share-button').click()
    })

    await expect(screen.getByTestId('clipboard-box')).toHaveTextContent('http://localhost:3000/transport?km=10')
  })

  test('integrates with default parameters', async () => {
    mockRouter.push('/transport')
    renderWithWrapper(<TransportPage category={category} />)

    act(() => {
      screen.getByTestId('header-integrate-button').click()
    })

    await expect(screen.getByTestId('clipboard-box')).toHaveTextContent(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport" data-search="?theme=default&tabs=distance,itineraire,teletravail&km=10"></script>'
    )
  })

  test('shares with modified parameters', async () => {
    mockRouter.push('/transport')
    renderWithWrapper(<TransportPage category={category} />)

    act(() => {
      screen.getByTestId('slider-plus-button').click()
    })
    await expect(screen.getByTestId('slider-thumb-content')).toHaveTextContent('30 km')

    act(() => {
      screen.getByTestId('header-share-button').click()
    })

    await expect(screen.getByTestId('clipboard-box')).toHaveTextContent('http://localhost:3000/transport?km=30')
  })

  test('integrates with modified parameters', async () => {
    mockRouter.push('/transport')
    renderWithWrapper(<TransportPage category={category} />)

    act(() => {
      screen.getByTestId('slider-plus-button').click()
    })
    await expect(screen.getByTestId('slider-thumb-content')).toHaveTextContent('30 km')

    act(() => {
      screen.getByTestId('header-integrate-button').click()
    })

    await expect(screen.getByTestId('clipboard-box')).toHaveTextContent(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport" data-search="?theme=default&tabs=distance,itineraire,teletravail&km=30"></script>'
    )
  })

  test('shares with manual parameters', async () => {
    mockRouter.push('/transport')
    renderWithWrapper(<TransportPage category={category} />)
    act(() => {
      screen.getByTestId('header-share-button').click()
    })

    await userEvent.type(screen.getByTestId('custom-param-km-input'), '30')
    await expect(screen.getByTestId('clipboard-box')).toHaveTextContent('http://localhost:3000/transport?km=1030')

    act(() => {
      screen.getByTestId('custom-param-km-checkbox').click()
    })
    await expect(screen.getByTestId('clipboard-box')).toHaveTextContent('http://localhost:3000/transport')
  })

  test('integrates with manual parameters', async () => {
    mockRouter.push('/transport')
    renderWithWrapper(<TransportPage category={category} />)
    act(() => {
      screen.getByTestId('header-integrate-button').click()
    })

    await userEvent.type(screen.getByTestId('custom-param-km-input'), '30')
    await expect(screen.getByTestId('clipboard-box')).toHaveTextContent(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport" data-search="?theme=default&tabs=distance,itineraire,teletravail&km=1030"></script>'
    )

    act(() => {
      screen.getByTestId('custom-param-km-checkbox').click()
    })
    await expect(screen.getByTestId('clipboard-box')).toHaveTextContent(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport" data-search="?theme=default&tabs=distance,itineraire,teletravail"></script>'
    )

    act(() => {
      screen.getByTestId('custom-param-km-checkbox').click()
    })
    await expect(screen.getByTestId('clipboard-box')).toHaveTextContent(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport" data-search="?theme=default&tabs=distance,itineraire,teletravail&km=1030"></script>'
    )

    act(() => {
      screen.getByTestId('transport-integration-distance-checkbox').click()
    })
    await expect(screen.queryByTestId('custom-param-km-input')).toBeNull()
    await expect(screen.getByTestId('clipboard-box')).toHaveTextContent(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport" data-search="?theme=default&tabs=itineraire,teletravail"></script>'
    )
  })
})
