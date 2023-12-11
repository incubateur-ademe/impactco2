import { expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'

configurePlaywrightCoverage(test)

test('Chauffage page', async ({ page }) => {
  await test.step('Load page', async () => {
    await page.goto('/chauffage')
  })

  await test.step('Page is loaded with values for 63m2', async () => {
    await expect(page.getByTestId('slider-thumb-content')).toHaveText('63 m2')
    await expect(page.locator('.bar-chart-item')).toHaveCount(7)
    await expect(page.locator('.bar-chart-item').first()).toHaveText('Chauffage avec une pompe à chaleur0246 kg CO2e')
  })

  await test.step('Values are updated with button', async () => {
    page.getByTestId('slider-plus-button').click()

    await expect(page.getByTestId('slider-thumb-content')).toHaveText('100 m2')
    await expect(page.locator('.bar-chart-item')).toHaveCount(7)
    await expect(page.locator('.bar-chart-item').first()).toHaveText('Chauffage avec une pompe à chaleur0390 kg CO2e')
  })

  await test.step('Values are updated with manual entry', async () => {
    page.getByTestId('slider-thumb-content-edit').click()
    page.getByTestId('slider-number-input').fill('200')
    page.getByTestId('slider-number-input-validate').click()

    await expect(page.getByTestId('slider-thumb-content')).toHaveText('200 m2')
    await expect(page.locator('.bar-chart-item')).toHaveCount(7)
    await expect(page.locator('.bar-chart-item').first()).toHaveText('Chauffage avec une pompe à chaleur0780 kg CO2e')
  })
})
