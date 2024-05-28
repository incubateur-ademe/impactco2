import { expect, test } from '@playwright/test'

test('Simulator chauffage', async ({ page }) => {
  await test.step('Load page', async () => {
    await page.goto('/chauffage')
  })

  await test.step('Page is loaded with values for 63m²', async () => {
    await expect(page.getByTestId('input-m2-value')).toHaveValue('63')
    await expect(page.getByTestId('category-link')).toHaveCount(7)
    await expect(page.getByTestId('category-pompeachaleur-value')).toHaveText('249')
  })

  await test.step('Values are updated with manual entry', async () => {
    await page.getByTestId('input-m2-value').fill('200')

    await expect(page.getByTestId('input-m2-value')).toHaveValue('200')
    await expect(page.getByTestId('category-link')).toHaveCount(7)
    await expect(page.getByTestId('category-pompeachaleur-value')).toHaveText('790')
  })

  await test.step('Iframe can be share with theme', async () => {
    await page.getByTestId('header-integrate-button').click()
    await expect(page.getByTestId('clipboard-box')).toContainText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="chauffage" data-search="?m2=200&theme=default"></script>'
    )

    await page.getByTestId('custom-param-theme-select').selectOption('night')
    await expect(page.getByTestId('clipboard-box')).toContainText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="chauffage" data-search="?m2=200&theme=night"></script>'
    )
  })

  await test.step('Iframe can be share with m2', async () => {
    await expect(page.getByTestId('input-m2')).toHaveValue('200')
    await page.getByTestId('input-m2-value').fill('300')
    await expect(page.getByTestId('clipboard-box')).toContainText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="chauffage" data-search="?m2=300&theme=night"></script>'
    )
    await expect(page.getByTestId('category-link')).toHaveCount(7)
    await expect(page.getByTestId('category-pompeachaleur-value')).toHaveText('1185')
  })
})

test('Simulator chauffage default value', async ({ page }) => {
  await test.step('Load page', async () => {
    await page.goto('/chauffage?m2=150')
  })

  await expect(page.getByTestId('input-m2-value')).toHaveValue('150')
  await expect(page.getByTestId('category-link')).toHaveCount(7)
  await expect(page.getByTestId('category-pompeachaleur-value')).toHaveText('593')
})
