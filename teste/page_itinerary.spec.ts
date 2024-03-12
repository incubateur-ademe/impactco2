import { Page, expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'
import { mockRoutesItinerary } from './mock-routes/mock-routes-itinerary'

configurePlaywrightCoverage(test)

test.beforeEach(async ({ page }) => {
  await mockRoutesItinerary(page)
})

test("Recherche de la ville de départ et d'arrivée", async ({ page }) => {
  await test.step('On charge la page itinéraire dans le navigateur', async () => {
    await page.goto('/transport/itineraire')
  })

  await test.step('On clique sur le champ de départ, on rentre une première lettre, pas de suggestion affichée', async () => {
    // Given
    await page.getByPlaceholder('Départ').click({ force: true })
    await page.keyboard.type('n')
    // When
    const suggestions = await getNbOfSuggestions(page)
    // Then
    expect(suggestions).toEqual(0)
  })

  await test.step('Shares with no params', async () => {
    await page.getByTestId('header-share-button').click()

    await expect(page.getByTestId('clipboard-box')).toHaveText('http://localhost:3000/transport/itineraire?')
  })

  await test.step('integrates with no params', async () => {
    await page.getByTestId('header-integrate-button').click()

    await expect(page.getByTestId('clipboard-box')).toHaveText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&tabs=distance,itineraire,teletravail&km=10"></script>'
    )
  })

  await test.step('On rentre une 2ème lettre, et une 3ème, il y a bien des suggestions qui apparaissent', async () => {
    // Given
    await page.getByPlaceholder('Départ').click({ force: true })
    await page.keyboard.type('a')
    await page.keyboard.type('n')
    // When
    const suggestions = await getNbOfSuggestions(page)
    // Then
    expect(suggestions).toEqual(7)
  })

  await test.step('On peut rentrer un des choix', async () => {
    // Given
    const nantes = await page.getByTestId('transportSuggest').locator('div').filter({ hasText: 'Nantes 44000 France' })
    // When
    await nantes.click()
    expect(page.getByTestId('Address-Départ').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Nantes 44000 France'
    )
  })

  await test.step('Shares with start params', async () => {
    await page.getByTestId('header-share-button').click()

    await expect(page.getByTestId('clipboard-box')).toHaveText(
      'http://localhost:3000/transport/itineraire?itineraireStart=Nantes 44000 France&'
    )
  })

  await test.step('integrates with start params', async () => {
    await page.getByTestId('header-integrate-button').click()

    await expect(page.getByTestId('clipboard-box')).toHaveText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&tabs=distance,itineraire,teletravail&km=10&itineraireStart=Nantes 44000 France"></script>'
    )
  })

  await test.step('Arrivée - on peut rentrer directement 3 lettres, il y a aussi des suggestions qui apparaissent', async () => {
    // Given
    await page.getByPlaceholder('Arrivée').click({ force: true })
    await page.keyboard.type('a')
    await page.keyboard.type('n')
    await page.keyboard.type('g')
    // When
    const suggestions = await getNbOfSuggestions(page)
    // Then
    expect(suggestions).toEqual(7)
  })

  await test.step("Arrivée - On peut rentrer un des choix, les bilans carbones s'affichent automatiquement", async () => {
    // Given
    await expect(page.getByTestId('bar-chart-item-intercites')).not.toBeAttached()
    const angers = await page.getByTestId('transportSuggest').locator('div').filter({ hasText: 'Angers 49000 France' })
    // When
    await angers.click()
    // Then
    await expect(page.getByTestId('Address-Arrivée').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Angers 49000 France'
    )
    await expect(page.getByTestId('bar-chart-item-intercites')).toBeAttached()
    await expect(page.getByTestId('bar-chart-item-intercites')).toHaveText('Intercités  - 91.2 km0.82 kg CO2e')
  })

  await test.step('Shares with start and end params', async () => {
    await page.getByTestId('header-share-button').click()

    await expect(page.getByTestId('clipboard-box')).toHaveText(
      'http://localhost:3000/transport/itineraire?itineraireStart=Nantes 44000 France&itineraireEnd=Angers 49000 France'
    )
  })

  await test.step('integrates with start and end params', async () => {
    await page.getByTestId('header-integrate-button').click()

    await expect(page.getByTestId('clipboard-box')).toHaveText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&tabs=distance,itineraire,teletravail&km=10&itineraireStart=Nantes 44000 France&itineraireEnd=Angers 49000 France"></script>'
    )
  })
})

test('Default parameters (old way)', async ({ page }) => {
  await test.step('Load with start parameters', async () => {
    await page.goto('/transport/itineraire?start="Paris"')

    await expect(page.getByTestId('Address-Départ').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Paris  France',
      { timeout: 10000 }
    )
    await expect(page.getByTestId('Address-Arrivée').locator('form').locator('input')).toHaveAttribute('value', '')
    await expect(page.getByTestId('bar-chart-item-intercites')).not.toBeAttached()
  })

  await test.step('Load with end parameters', async () => {
    await page.goto('/transport/itineraire?end="Lyon"')

    await expect(page.getByTestId('Address-Départ').locator('form').locator('input')).toHaveAttribute('value', '')
    await expect(page.getByTestId('Address-Arrivée').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Lyon  France',
      { timeout: 10000 }
    )
    await expect(page.getByTestId('bar-chart-item-intercites')).not.toBeAttached()
  })

  await test.step('Load with start and end parameters', async () => {
    await page.goto('/transport/itineraire?start="Paris"&end="Lyon"')

    await expect(page.getByTestId('Address-Départ').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Paris  France',
      { timeout: 10000 }
    )
    await expect(page.getByTestId('Address-Arrivée').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Lyon  France',
      { timeout: 10000 }
    )
    await expect(page.getByTestId('bar-chart-item-intercites')).toBeAttached()
    await expect(page.getByTestId('bar-chart-item-intercites')).toHaveText('Intercités  - 91.2 km0.82 kg CO2e')
  })
})

test('Default parameters', async ({ page }) => {
  await test.step('Load with start parameters', async () => {
    await page.goto('/transport/itineraire?itineraireStart=Paris')

    await expect(page.getByTestId('Address-Départ').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Paris  France',
      { timeout: 10000 }
    )
    await expect(page.getByTestId('Address-Arrivée').locator('form').locator('input')).toHaveAttribute('value', '')
    await expect(page.getByTestId('bar-chart-item-intercites')).not.toBeAttached()
  })

  await test.step('Load with end parameters', async () => {
    await page.goto('/transport/itineraire?itineraireEnd=Lyon')

    await expect(page.getByTestId('Address-Départ').locator('form').locator('input')).toHaveAttribute('value', '')
    await expect(page.getByTestId('Address-Arrivée').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Lyon  France',
      { timeout: 10000 }
    )
    await expect(page.getByTestId('bar-chart-item-intercites')).not.toBeAttached()
  })

  await test.step('Load with start and end parameters', async () => {
    await page.goto(
      '/transport/itineraire?km=12&itineraireStart=Paris&itineraireEnd=Lyon&teletravailStart=Nantes&teletravailEnd=Marseille&tabs=distance'
    )

    await expect(page.getByTestId('Address-Départ').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Paris  France',
      { timeout: 10000 }
    )
    await expect(page.getByTestId('Address-Arrivée').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Lyon  France',
      { timeout: 10000 }
    )
    await expect(page.getByTestId('bar-chart-item-intercites')).toBeAttached()
    await expect(page.getByTestId('bar-chart-item-intercites')).toHaveText('Intercités  - 91.2 km0.82 kg CO2e')
  })
})

test('Load correct number of tabs and redirect with params', async ({ page }) => {
  await page.goto(
    '/iframes/transport/itineraire?km=12&itineraireStart=Paris&itineraireEnd=Lyon&teletravailStart=Nantes&teletravailEnd=Marseille&tabs=teletravail,distance'
  )

  await test.step('check number of tabs', async () => {
    await expect(page.getByTestId('teletravail-wrapper')).toBeVisible()
    await expect(page.getByTestId('transport-tab-teletravail')).toBeVisible()
    await expect(page.getByTestId('transport-tab-distance')).toBeVisible()
    await expect(page.getByTestId('transport-tab-itineraire')).not.toBeVisible()
  })

  await test.step('test redirection', async () => {
    await page.getByTestId('transport-tab-distance').click()

    await expect(page.getByTestId('distance-wrapper')).toBeVisible()
    await expect(page.getByTestId('slider-thumb-content')).toHaveText('12 km')

    await expect(page.getByTestId('bar-chart-item-busthermique')).toBeAttached()
    await expect(page.getByTestId('bar-chart-item-busthermique')).toHaveText('Bus (moteur thermique)1.36 kg CO2e')
  })
})

const getNbOfSuggestions = async (page: Page) => {
  await page.waitForTimeout(800)
  const count = await page.getByTestId('transportSuggest').locator('div').count()
  return count
}
