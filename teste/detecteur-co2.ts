import { expect } from '@playwright/test'
import { FrameLocator, Page } from '@playwright/test'

export const detecteurCO2Test = async (
  page: Page | FrameLocator,
  expectedValue: number,
  label: string,
  locator?: number
) => {
  await expect(page.getByTestId('etiquette').first()).not.toBeVisible()

  await page.getByRole('button', { name: label }).click()

  await expect(page.getByTestId('etiquette').first()).toBeVisible()
  await expect(page.getByTestId('impact-co2-link').nth(locator || 0)).toHaveAttribute(
    'href',
    `https://impactco2.fr/comparateur?value=${expectedValue}`
  )
  await expect(page.getByTestId('impact-co2-link').nth(locator || 0)).toHaveAttribute('target', '_blank')
  await expect(page.getByTestId('impact-co2-link').nth(locator || 0)).toHaveAttribute('rel', 'noreferrer noopener')

  const value = await page
    .locator('.impactCO2-etiquette-value')
    .nth(locator || 0)
    .textContent()

  await page.getByRole('button', { name: 'Obtenir une nouvelle' }).first().click()
  await expect(await page.locator('.impactCO2-etiquette-value').nth(locator || 0)).not.toHaveText(value || '')
}
