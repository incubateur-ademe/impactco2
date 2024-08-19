import { expect, test } from '@playwright/test'

test('Display detector', async ({ page }) => {
  await page.goto('/contenu/detecteur-co2')
  await expect(page.getByRole('alertdialog')).not.toBeVisible()

  await page.getByRole('button', { name: '100 kg de CO₂e' }).click()

  await expect(page.getByRole('alertdialog')).toBeVisible()
  await expect(page.getByLabel('Impact CO2')).toHaveAttribute('href', 'https://impactco2.fr/comparateur?value=100')
  await expect(page.getByLabel('Impact CO2')).toHaveAttribute('target', '_blank')
  await expect(page.getByLabel('Impact CO2')).toHaveAttribute('rel', 'noreferrer noopener')

  const value = await page.locator('.impactCO2-etiquette-value').textContent()

  await page.getByRole('button', { name: 'Obtenir une nouvelle' }).click()
  await expect(page.locator('.impactCO2-etiquette-value').textContent()).not.toBe(value)
})
