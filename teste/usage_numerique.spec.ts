import { expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'

configurePlaywrightCoverage(test)
test.beforeEach(async ({ page }) => {
  await page.goto('/usagenumerique')
})

test('La page des usages numériques se charge correctement', async ({ page }) => {
  await test.step("Par défaut, le titre de l'onglet et le titre de la page s'affichent", async () => {
    await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO₂/)
    await expect(page.getByRole('heading').first()).toHaveText(
      "Sensibiliser à l'impact des usages numériques sur le climat"
    )
  })
})

test("Par défaut, des valeurs s'affichent pour les usages", async ({ page }) => {
  await test.step('Une valeur globale est donnée', async () => {
    await expect(page.getByTestId('impactNumeriqueTotal')).toHaveText('0,3 kg CO2e par semaine')
  })
})

test('Update share and integrate values when modifying parameters', async ({ page }) => {
  await page.locator('[id="email\\ \\.\\ appareil"]').selectOption("'ordinateur et écran'")
  await expect(page.getByTestId('tile-voiturethermique-value')).toContainText('62')

  await page.locator('[id="email\\ \\.\\ taille"]').selectOption('10')
  await expect(page.getByTestId('tile-voiturethermique-value')).toContainText('189')

  await page.getByText('4G').first().click()
  await expect(page.getByTestId('tile-voiturethermique-value')).toContainText('190')

  await page.locator('[id="streaming\\ \\.\\ appareil"]').selectOption("'ordinateur portable'")
  await expect(page.getByTestId('tile-voiturethermique-value')).toContainText('187')

  await page.locator('[id="streaming\\ \\.\\ qualité"]').selectOption("'ultra HD'")
  await expect(page.getByTestId('tile-voiturethermique-value')).toContainText('250')

  await page.getByText('4G').nth(1).click()
  await expect(page.getByTestId('tile-voiturethermique-value')).toContainText('430')

  await page.locator('[id="visio\\ \\.\\ appareil"]').selectOption("'TV'")
  await expect(page.getByTestId('tile-voiturethermique-value')).toContainText('432')

  await page.locator('[id="visio\\ \\.\\ qualité"]').selectOption("'HD'")
  await expect(page.getByTestId('tile-voiturethermique-value')).toContainText('447')

  await page.getByText('4G').nth(2).click()
  await expect(page.getByTestId('tile-voiturethermique-value')).toContainText('480')

  await page.getByTestId('header-share-button').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    "http://localhost:3000/usagenumerique?emails=50&email . appareil='ordinateur et écran'&email . transmission . émetteur . réseau='mobile FR'&email . taille=10&streaming . durée=420&streaming . appareil='ordinateur portable'&streaming . transmission . réseau='mobile FR'&streaming . qualité='ultra HD'&visio . durée=180&visio . appareil='TV'&visio . emplacements=1&visio . transmission . réseau='mobile FR'&visio . qualité='HD'"
  )
  await page.getByTestId('custom-param-situation-checkbox').click({ force: true })
  await expect(page.getByTestId('clipboard-box')).toContainText('http://localhost:3000/usagenumerique?')

  await page.getByTestId('header-integrate-button').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    "<script name=\"impact-co2\" src=\"http://localhost:3000/iframe.js\" data-type=\"usagenumerique\" data-search=\"?emails=50&email . appareil='ordinateur et écran'&email . transmission . émetteur . réseau='mobile FR'&email . taille=10&streaming . durée=420&streaming . appareil='ordinateur portable'&streaming . transmission . réseau='mobile FR'&streaming . qualité='ultra HD'&visio . durée=180&visio . appareil='TV'&visio . emplacements=1&visio . transmission . réseau='mobile FR'&visio . qualité='HD'\"></script>"
  )
  await page.getByTestId('custom-param-situation-checkbox').click({ force: true })
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="usagenumerique" data-search="?"></script>'
  )
})

test('Load default values', async ({ page }) => {
  await page.goto(
    "http://localhost:3000/usagenumerique?emails=744&email . appareil='tablette'&email . transmission . émetteur . réseau='mobile FR'&email . taille=1&streaming . durée=2100&streaming . appareil='ordinateur portable'&streaming . transmission . réseau='mobile FR'&streaming . qualité='SD'&visio . durée=3100&visio . appareil='ordinateur et écran'&visio . emplacements=1&visio . transmission . réseau='mobile FR'&visio . qualité='audio'"
  )
  await expect(page.getByTestId('tile-voiturethermique-value')).toContainText('459')
})
