import { expect, test } from '@playwright/test'
import { mockRoutes } from '../test-mock/mock-route.js'

test.beforeEach(async ({ page }) => {
  mockRoutes(page)
  await page.goto('/livraison')
  await expect(page.getByText('par livraison')).toHaveCount(1)
})

test('Affichage simulateur et source', async ({ page }) => {
  await test.step("On peut accèder à impact-livraison directement depuis l'URL du navigateur", async () => {
    await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO2/)
  })
  await test.step("J'ai bien le titre de l'onglet, le fil d'ariane, et le lien vers la source qui s'affichent", async () => {
    await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO2/)
    await expect(page.getByRole('heading').first()).toHaveText("Mesurer l'impact carbone de la livraison de colis")
    await expect(page.getByTestId('paragraph1')).toHaveText(
      '80 % des Français de 11 ans et plus font des achats en ligne.'
    )
    await expect(page.getByTestId('lien-etude-ademe')).toHaveText('Commerce en ligne - Étude ADEME 2023 ')
  })
  await test.step("J'ai bien le texte explicatif qui s'affiche", async () => {
    await expect(page.getByTestId('paragraph1')).toHaveText(
      '80 % des Français de 11 ans et plus font des achats en ligne.'
    )
  })
})

test("Calcul de l'impact d'une livraison", async ({ page }) => {
  await test.step("Le produit par défaut est l'habillement", async () => {
    let currentProduit = await page.$eval(
      'select#produits',
      (sel) => sel.options[sel.options.selectedIndex].textContent
    )
    expect(currentProduit).toEqual('Habillement (vêtements, chaussures, accessoires…)')
  })
  await test.step('Le mode de retrait par défaut est le point relais', async () => {
    let currentRetrait = await page.$eval(
      'select#retraits',
      (sel) => sel.options[sel.options.selectedIndex].textContent
    )
    expect(currentRetrait).toEqual('Point relais')
  })

  await test.step('Par défaut un calcul de CO2 est affiché', async () => {
    // Given
    await expect(page.getByTestId('bcTotal')).toHaveText('3,31 kg de CO2e ')
  })

  await test.step('Si on prend un colis volumineux, on a bien une augmentation de CO2', async () => {
    // Given
    await page.locator('select#retraits').selectOption({ label: 'Livraison à domicile' })
    await page.locator('select#produits').selectOption({ label: 'Mobilier et gros électroménager' }) // Ici
    // When-Then
    await expect(page.getByTestId('bcTotal')).toHaveText('70,59 kg de CO2e ')
  })

  await test.step('La liste déroulante “Vous commandez a bien les options “grande consommation”, “Habillement”, “Produits culturel“, “mobilier”', async () => {
    await page
      .locator('select#produits')
      .selectOption({ label: 'Produits de grande consommation (aliments, épicerie, boissons…)' })
    await page.locator('select#produits').selectOption({ label: 'Habillement (vêtements, chaussures, accessoires…)' })
    await page.locator('select#produits').selectOption({ label: 'Produits culturels (CD, livres, DVD…)' })
    await page.locator('select#produits').selectOption({ label: 'Mobilier et gros électroménager' })
  })

  await test.step('La liste déroulante “Que vous faites livrer” a bien 3 options', async () => {
    await page.locator('select#retraits').selectOption({ label: 'Livraison à domicile' })
    await page.locator('select#retraits').selectOption({ label: 'Point relais' })
    await page.locator('select#retraits').selectOption({ label: 'Click & collect' })
  })
})

test('Equivalences', async ({ page }) => {
  await test.step("Les équivalences par défaut s'affichent", async () => {
    await expect(page.locator('#eq_nb_0')).toHaveText('15 km')
    await expect(page.locator('#eq_what_0')).toHaveText('en voiture')

    await expect(page.locator('#eq_nb_1')).toHaveText('0,5 repas')
    await expect(page.locator('#eq_what_1')).toHaveText('avec du boeuf')

    await expect(page.locator('#eq_nb_2')).toHaveText('52 heures')
    await expect(page.locator('#eq_what_2')).toHaveText('de streaming vidéo')
  })

  await test.step("Une modale d'explication s'affiche", async () => {
    // Given
    await expect(page.getByRole('button', { name: 'Fermer' })).not.toBeVisible()
    // When
    await page.getByRole('button', { name: 'Comprendre le calcul' }).click()
    // Then
    await page.getByRole('button', { name: 'Fermer' }).click()
  })
})

test('Fréquences', async ({ page }) => {
  await test.step("Le bilan carbone s'alourdit avec le nb de colis par mois", async () => {
    // Given
    await expect(page.locator('#kgCo2e')).toHaveText('3,31 kg CO2e')
    // When
    await page.locator('select#numbers').selectOption({ value: '2' })
    // Then
    await expect(page.locator('#kgCo2e')).toHaveText('6,63 kg CO2e')
  })
  await test.step("Le bilan carbone s'alourdit avec la fréquence", async () => {
    await expect(page.locator('#kgCo2e')).toHaveText('6,63 kg CO2e')
    await page.locator('select#frequences').selectOption({ value: 'par_mois' })
    await expect(page.locator('#kgCo2e')).toHaveText('79,53 kg CO2e')
  })
})
