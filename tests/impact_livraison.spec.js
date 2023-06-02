// @ts-check
const { test, expect } = require('@playwright/test')

test('U1 - Affichage simulateur et source', async ({ page }) => {
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
  await test.step("J'ai bien le titre de l'onglet, le fil d'ariane, et le lien vers la source qui s'affichent", async () => {
    await expect(page).toHaveTitle(
      /Mesurer l'impact carbone de la livraison de colis/
    )
    await expect(page.getByRole('heading').first()).toHaveText(
      "Mesurer l'impact carbone de la livraison de colis"
    )
    await expect(page.getByTestId('paragraph1')).toHaveText(
      '80 % des Français de 11 ans et plus font des achats en ligne.'
    )
    await expect(page.getByTestId('lien-etude-ademe')).toHaveText(
      'Commerce en ligne - Étude ADEME 2023 '
    )
  })
  await test.step("J'ai bien le texte explicatif qui s'affiche", async () => {
    await expect(page.getByTestId('paragraph1')).toHaveText(
      '80 % des Français de 11 ans et plus font des achats en ligne.'
    )
  })
})
