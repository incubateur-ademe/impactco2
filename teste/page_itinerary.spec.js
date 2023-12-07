import { expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'
import { mockRoutes } from './mock-routes/mock-routes'

configurePlaywrightCoverage(test)

test.beforeEach(async ({ page }) => {
  await mockRoutes(page)
})

test('Recherche de la ville de départ', async ({ page }) => {
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
})

const getNbOfSuggestions = async (page) => {
  await page.waitForTimeout(1000)
  const count = await page.getByTestId('transportSuggest').locator('div').count()
  return count
}
