import { expect, test } from '@playwright/test'
import { mockRoutesNotion } from './mock-routes/mock-routes-notion'

test.beforeEach(async ({ page }) => {
  await mockRoutesNotion(page, {
    email: 'test@valid.fr',
    from: 'test',
    type: 'suggestion',
    suggestionType: 'avis',
    avis: 4,
    text: 'ce test envoit du lourd',
    accepted: true,
  })
})

test('Send suggestion demands to api', async ({ page }) => {
  await test.step('Load page', async () => {
    await page.goto('/suggestion?fromLabel=test')
    await expect(page.getByTestId('suggestion-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Submit without filled data does not work', async () => {
    await page.getByTestId('suggestion-button').click()

    await expect(page.getByTestId('suggestion-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Submit with incomplete data does not work', async () => {
    await page.getByTestId('suggestion-type-avis').click()
    await page.getByTestId('suggestion-text').fill('ce test envoit du lourd')
    await page.getByTestId('suggestion-button').click()

    await expect(page.getByTestId('suggestion-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Submit with incorrect data does not work', async () => {
    await page.getByTestId('input-email').fill('incorrect')
    await page.getByTestId('stars-avis-4').click()
    await page.getByTestId('suggestion-button').click()

    await expect(page.getByTestId('suggestion-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })
  await test.step('Submit without acceptation does not work', async () => {
    await page.getByTestId('input-email').fill('test@valid.fr')
    await page.getByTestId('suggestion-button').click()

    await expect(page.getByTestId('suggestion-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Fill data and submit form', async () => {
    await page.getByTestId('checkbox-accepted').click()
    await page.getByTestId('suggestion-button').click()

    await expect(page.getByTestId('suggestion-form')).toHaveCount(0)
    await expect(page.getByTestId('form-result-success')).toBeVisible()
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })
})

test('Show error if failing', async ({ page }) => {
  await test.step('Load page', async () => {
    await page.goto('/suggestion?fromLabel=test')
  })

  await test.step('Fill data and submit form', async () => {
    await page.getByTestId('suggestion-text').fill('my invalid review')
    await page.getByTestId('checkbox-accepted').click()

    await page.getByTestId('suggestion-button').click()

    await expect(page.getByTestId('suggestion-form')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
  })
})
