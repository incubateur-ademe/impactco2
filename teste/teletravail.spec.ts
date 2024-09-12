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
    const nantes = await page.getByTestId('transportSuggest').locator('li').filter({ hasText: 'Nantes 44000 France' })

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
    const angers = await page.getByTestId('transportSuggest').locator('li').filter({ hasText: 'Angers 49000 France' })

    await angers.click()
  })

  await expect(page.getByTestId('teletravail-generated-value')).toHaveText('7,289')
  await expect(page.getByTestId('etiquette-voiturethermique-value')).toHaveText('6,280')
  await expect(page.getByTestId('etiquette-repasavecduboeuf-value')).toHaveText('188')
  await expect(page.getByTestId('etiquette-streamingvideo-value')).toHaveText('21,348')

  await page.getByTestId('text-select-mode').selectOption('tramway')
  await expect(page.getByTestId('teletravail-generated-value')).toHaveText('144')

  await page.getByTestId('input-presentiel-value').fill('2')
  await expect(page.getByTestId('input-teletravail-value')).toHaveValue('1')
  await expect(page.getByTestId('teletravail-generated-value')).toHaveText('71.8')
  await expect(page.getByTestId('teletravail-saved-value')).toHaveText('26.9')
  await expect(page.getByTestId('teletravail-saved-percent')).toHaveText('0.27')
  await expect(page.getByTestId('etiquette-value')).toHaveText('26.9')

  await page.getByTestId('input-teletravail-value').fill('4')
  await expect(page.getByTestId('input-presentiel-value')).toHaveValue('2')
  await expect(page.getByTestId('teletravail-generated-value')).toHaveText('71.8')
  await expect(page.getByTestId('teletravail-saved-value')).toHaveText('108')
  await expect(page.getByTestId('teletravail-saved-percent')).toHaveText('1.09')
  await expect(page.getByTestId('etiquette-value')).toHaveText('108')

  await page.getByTestId('header-share-button').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    'http://localhost:3000/outils/teletravail?teletravailStart=Nantes 44000 France&teletravailEnd=Angers 49000 France&transport=tramway&presentiel=2&homeOffice=4&language=fr'
  )
  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-integrate-button').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="teletravail" data-search="?teletravailStart=Nantes 44000 France&teletravailEnd=Angers 49000 France&transport=tramway&presentiel=2&homeOffice=4&language=fr&theme=default"></script>'
  )
})

test('Teletravail default values', async ({ page }) => {
  await page.goto(
    'http://localhost:3000/outils/teletravail?teletravailStart=Nantes 44000 France&teletravailEnd=Angers 49000 France&transport=tramway&presentiel=2&homeOffice=4&language=fr'
  )
  await expect(page.getByTestId('teletravail-generated-value')).toHaveText('71.8', { timeout: 10000 })
  await expect(page.getByTestId('teletravail-saved-value')).toHaveText('108')
  await expect(page.getByTestId('teletravail-saved-percent')).toHaveText('1.09')
  await expect(page.getByTestId('etiquette-value')).toHaveText('108')
})

const getNbOfSuggestions = async (page: Page) => {
  await page.waitForTimeout(800)
  const count = await page.getByTestId('transportSuggest').locator('li').count()
  return count
}
