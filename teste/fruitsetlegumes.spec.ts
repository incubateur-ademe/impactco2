import { expect, test } from '@playwright/test'

test('Page is loaded and month can be selected', async ({ page }) => {
  await page.goto('/fruitsetlegumes')

  await test.step('Page is loaded with current month', async () => {
    await expect(page.getByRole('heading').first()).toHaveText('Fruits et légumes')
    await expect(page.getByTestId('text-select-month')).toHaveValue(new Date().getMonth().toString())
  })
  await test.step('User can change month', async () => {
    await page.getByRole('combobox').selectOption('5')
    await expect(page.getByTestId('category-abricot-value')).toBeVisible()
    await page.getByTestId('header-share-button').click()
    await expect(page.getByTestId('clipboard-box')).toContainText(
      'http://localhost:3000/outils/fruitsetlegumes?month=5'
    )
    await page.getByTestId('custom-param-month-select').selectOption('9')
    await expect(page.getByTestId('clipboard-box')).toContainText(
      'http://localhost:3000/outils/fruitsetlegumes?month=9'
    )
    await page.getByTestId('custom-param-month-checkbox').click()
    await expect(page.getByTestId('clipboard-box')).toContainText('http://localhost:3000/outils/fruitsetlegumes')
    await page.getByTestId('cancel-button').click()
    await page.getByTestId('header-integrate-button').click()
    await expect(page.getByTestId('clipboard-box')).toContainText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="fruitsetlegumes" data-search="?month=9&theme=default"></script>'
    )
    await page.getByTestId('custom-param-month-select').selectOption('11')
    await expect(page.getByTestId('clipboard-box')).toContainText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="fruitsetlegumes" data-search="?month=11&theme=default"></script>'
    )
    await page.getByTestId('custom-param-month-checkbox').click()
    await expect(page.getByTestId('clipboard-box')).toContainText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="fruitsetlegumes" data-search="?theme=default"></script>'
    )

    await page.getByTestId('custom-param-theme-select').selectOption('night')
    await expect(page.getByTestId('clipboard-box')).toContainText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="fruitsetlegumes" data-search="?theme=night"></script>'
    )
  })
})

test('Page is loaded with forced month', async ({ page }) => {
  if (new Date().getMonth() === 5) {
    await page.goto('/outils/fruitsetlegumes?month=4')

    await expect(page.getByTestId('text-select-month')).toHaveValue('4')
    await expect(page.getByTestId('category-artichaut-value')).toBeVisible()
    await expect(page.getByTestId('category-ail-value')).not.toBeVisible()
  } else {
    await page.goto('/outils/fruitsetlegumes?month=5')

    await expect(page.getByTestId('text-select-month')).toHaveValue('5')
    await expect(page.getByTestId('category-abricot-value')).toBeVisible()
    await expect(page.getByTestId('category-ail-value')).not.toBeVisible()
  }
})
