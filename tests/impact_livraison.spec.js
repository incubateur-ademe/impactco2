// @ts-check
const { test, expect } = require('@playwright/test')

test('Accès à Impact-Livraison', async ({ page }) => {
  await test.step("Depuis l'accueil, on accède à impact-livraison depuis les catégories ", async () => {
    // Given
    await page.goto('/')

    // When
    await page.getByRole('button', { name: 'Catégories' }).click()
    await page.getByRole('link', { name: 'Livraison', exact: true }).click()

    // Then
    await expect(page).toHaveURL('/livraison')
    await expect(page).toHaveTitle(
      /Mesurer l'impact carbone de la livraison de colis/
    )
  })
  await test.step("Retour à l'accueil, on accède à impact-livraison depuis l'icône ", async () => {
    // Given
    await page.getByRole('link', { name: 'Accueil' }).click()
    await expect(page).toHaveURL('/')

    // When
    await page
      .getByRole('link', { name: '[object Object],Livraison' })
      .click({ force: true })

    // Then
    await expect(page).toHaveURL('/livraison')
  })
  await test.step("On peut accèder à impact-livraison directement depuis l'URL du navigateur", async () => {
    await page.goto('/livraison')
    await expect(page).toHaveTitle(
      /Mesurer l'impact carbone de la livraison de colis/
    )
  })
  await test.step("J'ai bien le titre, le fil d'ariane, le texte, et le lien qui s'affichent", async () => {
    await expect(page).toHaveTitle(
      /Mesurer l'impact carbone de la livraison de colis/
    )
    await expect(page.getByRole('heading')).toHaveText(
      "Mesurer l'impact carbone de la livraison de colis"
    )
    await expect(page.getByTestId('paragraph1')).toHaveText(
      '80 % des Français de 11 ans et plus font des achats en ligne.'
    )
    await expect(page.getByRole('link')).toHaveText(
      'Commerce en ligne - Étude ADEME 2023'
    )
  })
})
