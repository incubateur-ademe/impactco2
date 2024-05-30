import { expect, test } from '@playwright/test'
import { mockRoutesNotion } from './mock-routes/mock-routes-notion'

test.beforeEach(async ({ page }) => {
  await mockRoutesNotion(page, {
    email: 'test@valid.fr',
    from: 'test',
    structure: 'entreprise',
    type: 'contact',
    needs: 'my needs',
    accepted: true,
  })
})

test('Send rendez-vous demands to api', async ({ page }) => {
  await test.step('Load page', async () => {
    await page.goto('/rendez-vous?fromLabel=test')
    await expect(page.getByTestId('rendez-vous-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Submit without filled data does not work', async () => {
    await page.getByTestId('rendez-vous-button').click()

    await expect(page.getByTestId('rendez-vous-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Submit with incomplete data does not work', async () => {
    await page.getByTestId('rendez-vous-structure-entreprise').click()
    await page.getByTestId('rendez-vous-needs').fill('my needs')

    await expect(page.getByTestId('rendez-vous-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Submit with incorrect data does not work', async () => {
    await page.getByTestId('input-email').fill('incorrect')

    await expect(page.getByTestId('rendez-vous-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Submit without acceptation does not work', async () => {
    await page.getByTestId('input-email').fill('test@valid.fr')

    await expect(page.getByTestId('rendez-vous-form')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toHaveCount(0)
  })

  await test.step('Fill data and submit form', async () => {
    await page.getByTestId('checkbox-accepted').click()
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
    await page.getByTestId('input-email').fill('test@invalid.fr')
    await page.getByTestId('checkbox-accepted').click()

    await page.getByTestId('rendez-vous-button').click()

    await expect(page.getByTestId('rendez-vous-form')).toHaveCount(0)
    await expect(page.getByTestId('form-result-error')).toBeVisible()
    await expect(page.getByTestId('form-result-success')).toHaveCount(0)
  })
})
