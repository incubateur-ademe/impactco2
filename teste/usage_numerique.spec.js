import { expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'

configurePlaywrightCoverage(test)
test.beforeEach(async ({ page }) => {
  await page.goto('/usagenumerique')
})

test('La page des usages numériques se charge correctement', async ({ page }) => {
  await test.step("Par défaut, le titre de l'onglet et le titre de la page s'affichent", async () => {
    await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO2/)
    await expect(page.getByRole('heading').first()).toHaveText("Découvrez l'impact des usages numériquessur le climat")
  })
})
test("Par défaut, des valeurs s'affichent pour les usages", async ({ page }) => {
  await test.step('Une valeur globale est donnée', async () => {
    await expect(page.getByTestId('impactNumeriqueTotal')).toHaveText('0,3 kg CO2e par semaine')
  })
})
