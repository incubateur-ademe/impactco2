import { expect, test } from '@playwright/test'
import { mockRoutes } from '../test-mock/mock-route.js'

test.beforeEach(async ({ page }) => {
  mockRoutes(page)
  await page.goto('/livraison')
  await expect(page.getByText('par livraison')).toHaveCount(1)
})

test('Le partage dirige bien vers la bonne URL', async ({ page }) => {
  await test.step('On clique sur le bouton de partage en haut, une URL correcte est proposée', async () => {
    await page.locator('#shareUp').click()
    await expect(page.locator('#shareUrl')).toHaveValue('http://localhost:3000/livraison')
  })
  await test.step('On clique sur le bouton de partage en bas, une URL correcte est proposée', async () => {
    await page.locator('#button-close').click()
    await page.locator('#shareDown').click()
    await expect(page.locator('#shareUrl')).toHaveValue('http://localhost:3000/livraison#ressource')
  })
})
