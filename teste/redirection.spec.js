import { expect, test } from '@playwright/test'

test('Redirections', async ({ page }) => {
  await test.step('On est redirigé de /convertisseur vers /comparateur', async () => {
    await page.goto('/convertisseur')
    await expect(page).toHaveURL(/.*comparateur/)
  })
})
