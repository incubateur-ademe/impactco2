import { test } from '@playwright/test'
import { detecteurCO2Test } from './detecteur-co2'

test('Display detector', async ({ page }) => {
  await page.goto('/contenu/detecteur-co2')
  await detecteurCO2Test(page, 100, '100 kg de CO₂e')
})
