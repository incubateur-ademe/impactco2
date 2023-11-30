import { expect, test } from '@playwright/test'
import pti from 'playwright-to-istanbul'
import v8toIstanbul from 'v8-to-istanbul'

test.beforeEach(async ({ page }) => {
  await page.goto('/usagenumerique')
})

test('La page des usages numériques se charge correctement', async ({ page }) => {
  await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO2/)
  await expect(page.getByRole('heading').first()).toHaveText("Découvrez l'impact des usages numériquessur le climat")
})
test("Par défaut, des valeurs s'affichent pour les usages", async ({ page }) => {
  await page.coverage.startJSCoverage()
  await expect(page.getByTestId('impactNumeriqueTotal')).toHaveText('0,3 kg CO2e par semaine')
  const coverage = await page.coverage.stopJSCoverage()
  for (const entry of coverage) {
    const converter = v8toIstanbul('', 0, { source: entry.source })
    await converter.load()
    converter.applyCoverage(entry.functions)
    pti.write([...coverage], { includeHostname: true, storagePath: './.nyc_output' })
    // console.log(JSON.stringify(converter.toIstanbul()))
  }
})
