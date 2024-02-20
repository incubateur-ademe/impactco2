import { expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'

configurePlaywrightCoverage(test)
test.beforeEach(async ({ page }) => {
  await page.goto('/livraison')
  await expect(page.getByText('par livraison')).toHaveCount(1)
})

test('Affichage simulateur livraison: le chargement de tous les composants fonctionne', async ({ page }) => {
  // L'intro s'affiche correctement
  await expect(page.getByTestId('paragraph1')).toHaveText(
    '80 % des Français de 11 ans et plus font des achats en ligne.'
  )
  // Le calculateur livraison s'affiche correctement
  await expect(page.getByTestId('calculateurTitleH2')).toHaveText("Estimez l'impact de votre livraison")
  // Les conseils s'affichent correctement
  await expect(page.getByTestId('titleAdviceLivraison')).toHaveText(
    'Conseil pour réduire l’impact carbone de vos livraisons'
  )
})

test("Affichage simulateur livraison: J'ai bien le titre de l'onglet, le titre de niveau 1, le fil d'ariane, et le lien vers la source qui s'affichent", async ({
  page,
}) => {
  await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO₂/)
  await expect(page.getByRole('heading').first()).toHaveText("Mesurer l'impact carbone de la livraison de colis")
  await expect(page.locator('nav[aria-label="fil d\'ariane"]')).toHaveText('AccueilThématiquesLivraison')
  await expect(page.getByTestId('lien-etude-ademe')).toHaveText('Commerce en ligne - Étude ADEME 2023 ')
})

test("Impact carbone d'une livraison : le bilan s'alourdit avec un colis volumineux", async ({ page }) => {
  // Given
  await expect(page.getByTestId('bcTotal')).toHaveText('2,46 kg de CO2e ')
  // When
  await page.locator('select#retraits').selectOption({ label: 'Livraison à domicile' })
  await page.locator('select#produits').selectOption({ label: 'Mobilier et gros électroménager' })
  // Then
  await expect(page.getByTestId('bcTotal')).toHaveText('30,96 kg de CO2e ')
})

test("Equivalences : Les équivalences par défaut s'affichent", async ({ page }) => {
  await expect(page.locator('#eq_nb_0')).toHaveText('11.3 km')
  await expect(page.locator('#eq_what_0')).toHaveText('en voiture')

  await expect(page.locator('#eq_nb_1')).toHaveText('0.34 repas')
  await expect(page.locator('#eq_what_1')).toHaveText('avec du boeuf')

  await expect(page.locator('#eq_nb_2')).toHaveText('38.5 heures')
  await expect(page.locator('#eq_what_2')).toHaveText('de streaming vidéo')
})

test("Equivalences : Une modale d'explication s'affiche", async ({ page }) => {
  // Given
  await expect(page.getByRole('button', { name: 'Fermer' })).not.toBeVisible()
  // When
  await page.getByRole('button', { name: 'Comprendre le calcul' }).click()
  // Then
  await page.getByRole('button', { name: 'Fermer' }).click()
})

test("Fréquences : Le bilan carbone s'alourdit avec le nb de colis par mois", async ({ page }) => {
  // Given
  await expect(page.locator('#kgCo2e')).toHaveText('2,46 kg CO2e')
  // When
  await page.locator('select#numbers').selectOption({ value: '2' })
  // Then
  await expect(page.locator('#kgCo2e')).toHaveText('4,93 kg CO2e')
})
