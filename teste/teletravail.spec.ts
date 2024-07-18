import { Page, expect, test } from '@playwright/test'
import { mockRoutesItinerary } from './mock-routes/mock-routes-itinerary'

test.beforeEach(async ({ page }) => {
  await mockRoutesItinerary(page)
})

test("Recherche de la ville de départ et d'arrivée", async ({ page }) => {
  await test.step('On charge la page itinéraire dans le navigateur', async () => {
    await page.goto('/transport/teletravail')
  })

  await test.step('On clique sur le champ de départ, on entre 3 lettres', async () => {
    await page.getByLabel('Lieu de domicile').click({ force: true })
    await page.keyboard.type('n')
    await page.keyboard.type('a')
    await page.keyboard.type('n')

    const suggestions = await getNbOfSuggestions(page)

    expect(suggestions).toEqual(7)
  })

  await test.step('On peut rentrer un des choix', async () => {
    const nantes = await page.getByTestId('transportSuggest').locator('div').filter({ hasText: 'Nantes 44000 France' })

    await nantes.click()
    expect(page.getByLabel('Lieu de domicile')).toHaveValue('Nantes 44000 France')
  })

  await test.step('Travail - on peut rentrer directement 3 lettres, il y a aussi des suggestions qui apparaissent', async () => {
    await page.getByLabel('Lieu de travail').click({ force: true })
    await page.keyboard.type('a')
    await page.keyboard.type('n')
    await page.keyboard.type('g')

    const suggestions = await getNbOfSuggestions(page)

    expect(suggestions).toEqual(7)
  })

  await test.step("Travail - On peut rentrer un des choix, les choix de transport s'affichent automatiquement", async () => {
    await expect(page.getByText('Choisissez votre mode de')).not.toBeAttached()
    const angers = await page.getByTestId('transportSuggest').locator('div').filter({ hasText: 'Angers 49000 France' })

    await angers.click()
  })

  await expect(page.getByTestId('teletravail-generated-value')).toHaveText('7,289')
  await expect(page.getByTestId('etiquette-voiturethermique-value')).toHaveText('6,280')
  await expect(page.getByTestId('etiquette-repasavecduboeuf-value')).toHaveText('188')
  await expect(page.getByTestId('etiquette-streamingvideo-value')).toHaveText('21,348')

  await page.getByTestId('text-select-mode').selectOption('tramway')
  await expect(page.getByTestId('teletravail-generated-value')).toHaveText('144')

  await page.getByTestId('input-presentiel-value').click()
  await page.getByTestId('input-presentiel-value').fill('2')
  await expect(page.getByTestId('input-teletravail-value')).toHaveValue('3')
  await expect(page.getByTestId('teletravail-generated-value')).toHaveText('71.8')
})

const getNbOfSuggestions = async (page: Page) => {
  await page.waitForTimeout(800)
  const count = await page.getByTestId('transportSuggest').locator('div').count()
  return count
}
