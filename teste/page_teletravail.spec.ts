import { Page, expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'
import { mockRoutesItinerary } from './mock-routes/mock-routes-itinerary'

configurePlaywrightCoverage(test)

test.beforeEach(async ({ page }) => {
  // On utilise les mêmes mocks que pour la page itineraire
  await mockRoutesItinerary(page)
})

test("Recherche de la ville de départ et d'arrivée", async ({ page }) => {
  await test.step('On charge la page itinéraire dans le navigateur', async () => {
    await page.goto('/transport/teletravail')
  })

  await test.step('On clique sur le champ de départ, on entre 3 lettres', async () => {
    // Given
    await page.getByPlaceholder('Domicile').click({ force: true })
    await page.keyboard.type('n')
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
    expect(page.getByTestId('Address-Domicile').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Nantes 44000 France'
    )
  })

  await test.step('Travail - on peut rentrer directement 3 lettres, il y a aussi des suggestions qui apparaissent', async () => {
    // Given
    await page.getByPlaceholder('Travail').click({ force: true })
    await page.keyboard.type('a')
    await page.keyboard.type('n')
    await page.keyboard.type('g')
    // When
    const suggestions = await getNbOfSuggestions(page)
    // Then
    expect(suggestions).toEqual(7)
  })

  await test.step("Travail - On peut rentrer un des choix, les choix de transport s'affichent automatiquement", async () => {
    // Given
    await expect(page.getByText('Choisissez votre mode de')).not.toBeAttached()
    const angers = await page.getByTestId('transportSuggest').locator('div').filter({ hasText: 'Angers 49000 France' })
    // When
    await angers.click()
    // Then
    await expect(page.getByTestId('Address-Travail').locator('form').locator('input')).toHaveAttribute(
      'value',
      'Angers 49000 France'
    )
    await expect(page.getByText('Choisissez votre mode de')).toBeAttached()
  })
  await test.step("Mode de transport - on peut choisir un mode de transport, le bilan s'affiche alors", async () => {
    // Given
    await expect(page.getByText('sur 5 jours')).not.toBeAttached()
    // When
    await page.getByTestId('transport-voitureelectrique').click()
    // Then
    await expect(page.getByText('sur 5 jours')).toBeAttached()
  })
  await test.step("Une modale d'explication peut s'ouvrir (et se fermer)", async () => {
    // Given
    await expect(page.getByRole('heading', { name: 'Mode télétravail' })).not.toBeAttached()
    // When
    await page.getByRole('button', { name: 'Voir et ajuster les détails' }).click()
    // Then
    await expect(page.getByRole('heading', { name: 'Mode télétravail' })).toBeAttached()
    await page.getByRole('button', { name: '+' }).click()
    await expect(page.getByRole('heading', { name: 'Mode télétravail' })).not.toBeAttached()
  })
  await test.step("Le bilan s'affiche, et peut se modifier. Les économies réalisées s'affichent.", async () => {
    // Given
    await expect(page.getByText("soit 6.56 %d'économisé sur")).not.toBeAttached()

    await expect(page.getByText('Présentiel5jours par semaine')).toBeAttached()
    await expect(page.getByText('Télétravail0jours par semaine')).toBeAttached()
    await expect(page.locator('div').filter({ hasText: /^4329 kgCO2eémissur 5 jours$/ })).toBeAttached()
    // When
    await page
      .locator('div')
      .filter({ hasText: /^Présentiel5jours par semaine$/ })
      .getByRole('button')
      .first()
      .click() // appui sur le bouton "moins"
    // Then
    await expect(page.getByText('Présentiel4jours par semaine')).toBeAttached()
    await expect(page.getByText('Télétravail1jours par semaine')).toBeAttached()
    await expect(page.locator('div').filter({ hasText: /^3463 kgCO2eémissur 4 jours$/ })).toBeAttached()
    await expect(page.getByText("soit 6.56 %d'économisé sur")).toBeAttached()
    await expect(page.getByTestId('saved')).toHaveText('649 kgCO2eévités sur 1 jour')
  })
})

const getNbOfSuggestions = async (page: Page) => {
  await page.waitForTimeout(800)
  const count = await page.getByTestId('transportSuggest').locator('div').count()
  return count
}
