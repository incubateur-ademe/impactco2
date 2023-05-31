// @ts-check
const { test, expect } = require('@playwright/test')

test('Accès à Impact-Livraison', async ({ page }) => {
  await test.step("Depuis l'accueil, on accède à impact-livraison depuis les catégories ", async () => {
    // Given
    await page.goto('/')
    await expect(page).not.toHaveURL(/.*impactlivraison/)

    // When
    await page.getByRole('button', { name: 'Catégories' }).click()
    await page
      .getByRole('link', { name: 'Impact livraison', exact: true })
      .click()

    // Then
    await expect(page).toHaveURL(/.*impactlivraison/)
  })
  await test.step("Retour à l'accueil, on accède à impact-livraison depuis l'icône ", async () => {
    // Given
    await page.getByRole('link', { name: 'Accueil' }).click()
    await expect(page).not.toHaveURL(/.*impactlivraison/)

    // When
    await page
      .getByRole('link', { name: '[object Object],Impact livraison' })
      .click({ force: true })

    // Then
    await expect(page).toHaveURL(/.*impactlivraison/)
  })
  await test.step("On peut accèder à impact-livraison directement depuis l'URL du navigateur", async () => {
    await page.goto('/impactlivraison')
    await expect(page).toHaveTitle(
      /Poids en CO₂e des livraisons de colis | Impact CO2/
    )
  })
})
