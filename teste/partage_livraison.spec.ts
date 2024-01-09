import { expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'

configurePlaywrightCoverage(test)
test.beforeEach(async ({ page }) => {
  await page.goto('/livraison')
  await expect(page.getByTestId('calculateurTitleH2')).toHaveText("Estimez l'impact de votre livraison")
})

test('On clique sur le bouton de partage en haut, une URL correcte est proposée', async ({ page }) => {
  // Given
  expect(page.getByTestId('clipboard-box')).not.toBeAttached()
  // When
  await page.locator('#shareUp').click()
  // Then
  await expect(page.getByTestId('clipboard-box')).toHaveText('http://localhost:3000/livraison')
})
test('On clique sur le bouton de partage en bas, une URL correcte est proposée', async ({ page }) => {
  // Given
  expect(page.getByTestId('clipboard-box')).not.toBeAttached()
  // When
  await page.locator('#shareDown').click()
  // Then
  await expect(page.getByTestId('clipboard-box')).toHaveText('http://localhost:3000/livraison#ressource')
})
