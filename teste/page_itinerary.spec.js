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

  await test.step('On clique sur le champ de départ', async () => {
    await page.getByPlaceholder('Départ').click({ force: true })
  })

  await test.step('On rentre une première lettre', async () => {
    await page.keyboard.type('n')
  })

  await test.step('Pas de suggestion affichée', async () => {
    const suggestions = await getNbOfSuggestions(page)
    expect(suggestions).toEqual(0)
  })

  await test.step('On rentre une 2ème lettre, et une 3ème', async () => {
    await page.keyboard.type('a')
    await page.keyboard.type('n')
  })

  await test.step('Il y a bien des suggestions qui apparaissent', async () => {
    const suggestions = await getNbOfSuggestions(page)
    expect(suggestions).toEqual(7)
  })

  await test.step('On peut rentrer un des choix', async () => {
    const nantes = await page.getByTestId('transportSuggest').locator('div').filter({ hasText: 'Nantes 44000 France' })
    await nantes.click()
    expect(page.getByTestId('Address-Départ').locator('form')).toHaveAttribute('addressset', 'Nantes  France')
  })

  await test.step('Arrivée - on peut rentrer directement 3 lettres, il y a aussi des suggestions qui apparaissent', async () => {
    await page.getByPlaceholder('Arrivée').click({ force: true })
    await page.keyboard.type('a')
    await page.keyboard.type('n')
    await page.keyboard.type('g')
    const suggestions = await getNbOfSuggestions(page)
    expect(suggestions).toEqual(7)
  })

  await test.step('Arrivée - On peut rentrer un des choix', async () => {
    const angers = await page.getByTestId('transportSuggest').locator('div').filter({ hasText: 'Angers 49000 France' })
    await angers.click()
    expect(page.getByTestId('Address-Arrivée').locator('form')).toHaveAttribute('addressset', 'Angers  France')
    await page.waitForTimeout(2000)
  })
})

const getNbOfSuggestions = async (page) => {
  await page.waitForTimeout(1000)
  const count = await page.getByTestId('transportSuggest').locator('div').count()
  return count
}
