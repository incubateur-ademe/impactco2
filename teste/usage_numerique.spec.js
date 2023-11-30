import { expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/before-each-e2e'

configurePlaywrightCoverage(test)

test('La page des usages numériques se charge correctement', async ({ page }) => {
  await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO2/)
  await expect(page.getByRole('heading').first()).toHaveText("Découvrez l'impact des usages numériquessur le climat")
})
test("Par défaut, des valeurs s'affichent pour les usages", async ({ page }) => {
  await expect(page.getByTestId('impactNumeriqueTotal')).toHaveText('0,3 kg CO2e par semaine')
})
