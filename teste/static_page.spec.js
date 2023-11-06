import { expect, test } from '@playwright/test'

test('Affichage sans erreur des pages statiques', async ({ page }) => {
  await test.step('On peut accèder au plan du site', async () => {
    await page.goto('/plan-du-site')
    await expect(page).toHaveTitle(/Plan du site | Impact CO2/)
  })
  await test.step('On peut accèder aux mentions légales', async () => {
    await page.goto('/mentions-legales')
    await expect(page).toHaveTitle(/Mentions légales | Impact CO2/)
  })
})
