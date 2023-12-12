import { expect, test } from '@playwright/test'
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

  await test.step('On rentre une 2ème lettre, et une 3ème, il y a bien des suggestions qui apparaissent', async () => {
    // Given
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
    expect(page.getByTestId('Address-Départ').locator('form')).toHaveAttribute('addressset', 'Nantes  France')
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
    await expect(page.getByTestId('Address-Arrivée').locator('form')).toHaveAttribute('addressset', 'Angers  France')
    await expect(page.getByTestId('bar-chart-item-intercites')).toBeAttached()
    await expect(page.getByTestId('bar-chart-item-intercites')).toHaveText('Intercités  - 91 km0,8 kg CO2e')
  })
})

const getNbOfSuggestions = async (page) => {
  await page.waitForTimeout(800)
  const count = await page.getByTestId('transportSuggest').locator('div').count()
  return count
}
