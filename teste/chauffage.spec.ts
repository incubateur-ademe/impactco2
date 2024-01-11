import { expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'

configurePlaywrightCoverage(test)

test('Chauffage page', async ({ page }) => {
  await test.step('Load page', async () => {
    await page.goto('/chauffage')
  })

  await test.step('Page is loaded with values for 63m²', async () => {
    await expect(page.getByTestId('slider-thumb-content')).toHaveText('63 m²')
    await expect(page.locator('.bar-chart-item')).toHaveCount(7)
    await expect(page.getByTestId('bar-chart-item-value').first()).toHaveText('260')
  })

  await test.step('Values are updated with button', async () => {
    await page.getByTestId('slider-plus-button').click()

    await expect(page.getByTestId('slider-thumb-content')).toHaveText('100 m²')
    await expect(page.locator('.bar-chart-item')).toHaveCount(7)
    await expect(page.getByTestId('bar-chart-item-value').first()).toHaveText('412')
  })

  await test.step('Values are updated with manual entry', async () => {
    await page.getByTestId('slider-thumb-content-edit').click()
    await page.getByTestId('slider-number-input').fill('200')
    await page.getByTestId('slider-number-input-validate').click()

    await expect(page.getByTestId('slider-thumb-content')).toHaveText('200 m²')
    await expect(page.locator('.bar-chart-item')).toHaveCount(7)
    await expect(page.getByTestId('bar-chart-item-value').first()).toHaveText('824')
  })
})
