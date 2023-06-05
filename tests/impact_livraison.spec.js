import { mockRoutes } from '../test-mock/mock-route.js'

// @ts-check
const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`)
  mockRoutes(page)
})

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

test("U2 - Calcul de l'impact d'une livraison", async ({ page }) => {
  await test.step("On peut sélectionner le type de produit, le mode de livraison, et la fréquence d'achat", async () => {
    // Given
    await page.goto('/livraison')
    await expect(
      page.getByRole('combobox', { name: 'Vous commandez en majorité' })
    ).toBeVisible()
    await expect(
      page.getByRole('combobox', { name: 'Que vous faites livrer en' })
    ).toBeVisible()
    await expect(
      page.getByRole('combobox', { name: 'A la fréquence de' })
    ).toBeVisible()
  })
  await test.step('Le produit par défaut est le produit culturel physique', async () => {
    let currentFrequence = await page.$eval(
      'select#produits',
      (sel) => sel.options[sel.options.selectedIndex].textContent
    )
    expect(currentFrequence).toEqual('Produit culturel physique')
  })
  await test.step('La liste déroulante “Vous commandez en majorité” a bien les options “Produits de grande consommation”, “Habillement”, “Produits culturel physique”, “bien d’équipement volumineux”, et “autre”', async () => {
    await page
      .locator('select#produits')
      .selectOption({ label: 'Produits de grande consommation' })
    await page.locator('select#produits').selectOption({ label: 'Habillement' })
    await page
      .locator('select#produits')
      .selectOption({ label: 'Produit culturel physique' })
    await page
      .locator('select#produits')
      .selectOption({ label: "Bien d'équipement volumineux" })
  })
  await test.step('Le mode de retrait par défaut est à domicile', async () => {
    let currentFrequence = await page.$eval(
      'select#retraits',
      (sel) => sel.options[sel.options.selectedIndex].textContent
    )
    expect(currentFrequence).toEqual('Livraison à domicile')
  })
  await test.step('La liste déroulante “Que vous faites livrer” a bien 4 options', async () => {
    await page
      .locator('select#retraits')
      .selectOption({ label: 'Livraison à domicile' })
    await page
      .locator('select#retraits')
      .selectOption({ label: 'Point relais' })
    await page
      .locator('select#retraits')
      .selectOption({ label: 'Click & collect' })
    await page
      .locator('select#retraits')
      .selectOption({ label: 'Achat direct en magasin' })
  })
  await test.step('La fréquence par défaut est par mois', async () => {
    let currentFrequence = await page.$eval(
      'select#frequences',
      (sel) => sel.options[sel.options.selectedIndex].textContent
    )
    expect(currentFrequence).toEqual('Mois')
  })
  await test.step('La fréquence est par jour, semaine, mois ou année', async () => {
    await page.locator('select#frequences').selectOption({ label: 'Jour' })
    await page.locator('select#frequences').selectOption({ label: 'Semaine' })
    await page.locator('select#frequences').selectOption({ label: 'Mois' })
    await page.locator('select#frequences').selectOption({ label: 'Année' })
  })
})
