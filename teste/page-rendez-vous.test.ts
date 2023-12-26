import { expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'
import { mockRoutesNotion } from './mock-routes/mock-routes-notion'

configurePlaywrightCoverage(test)

test.beforeEach(async ({ page }) => {
  await mockRoutesNotion(page, {
    email: 'test@valid.fr',
    from: 'test',
    structure: 'entreprise',
    type: 'contact',
    needs: 'my needs',
  })
})

test('Send rendez-vous demands to api', async ({ page }) => {
  await test.step('Load page', async () => {
    await page.goto('/rendez-vous?fromLabel=test')
  })

  await test.step('Submit without filled data does not work', async () => {
    await expect(page.getByTestId('rendez-vous-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)

    await page.getByTestId('rendez-vous-button').click()

    await expect(page.getByTestId('rendez-vous-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Submit with incomplete data does not work', async () => {
    await expect(page.getByTestId('rendez-vous-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)

    await page.getByTestId('rendez-vous-structure-entreprise').click()
    await page.getByTestId('rendez-vous-needs').fill('my needs')

    await expect(page.getByTestId('rendez-vous-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Submit with incorrect data does not work', async () => {
    await expect(page.getByTestId('rendez-vous-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)

    await page.getByTestId('rendez-vous-email').fill('incorrect')

    await expect(page.getByTestId('rendez-vous-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Fill data and submit form', async () => {
    await page.getByTestId('rendez-vous-email').fill('test@valid.fr')

    await page.getByTestId('rendez-vous-button').click()

    await expect(page.getByTestId('rendez-vous-form')).toHaveCount(0)
    await expect(page.getByTestId('form-result-success')).toBeVisible()
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })
})

test('Show error if failing', async ({ page }) => {
  await test.step('Load page', async () => {
    await page.goto('/rendez-vous?fromLabel=test')
  })

  await test.step('Fill data and submit form', async () => {
    await page.getByTestId('rendez-vous-structure-entreprise').click()
    await page.getByTestId('rendez-vous-needs').fill('my invalid needs')
    await page.getByTestId('rendez-vous-email').fill('test@invalid.fr')

    await page.getByTestId('rendez-vous-button').click()

    await expect(page.getByTestId('rendez-vous-form')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
  })
})
