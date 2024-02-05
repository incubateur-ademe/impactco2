import { expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'

configurePlaywrightCoverage(test)
test('Le titre', async ({ page }) => {
  await test.step("On charge la page d'accueil dans le navigateur", async () => {
    await page.goto('/')
  })
  await test.step("L'onglet s'affiche avec un titre correct", async () => {
    await expect(page).toHaveTitle(/Accueil | Impact CO₂/)
  })
})

test('Barre de recherche (sans résultat)', async ({ page }) => {
  await test.step("On charge la page d'accueil dans le navigateur", async () => {
    await page.goto('/')
  })

  await test.step('On clique sur la barre de recherche', async () => {
    await page.getByRole('textbox', { name: 'Rechercher...' }).click({ force: true })
  })

  await test.step('On rentre une première lettre', async () => {
    await page.keyboard.type('t')
  })

  await test.step('Pas de suggestion affichée', async () => {
    const nb_of_suggestions = await page.getByTitle('simple suggestion').count()
    expect(nb_of_suggestions).toEqual(0)
  })

  await test.step('On rentre une 2ème lettre ayant peu de chance de retourner un résultat', async () => {
    await page.keyboard.type('x')
  })

  await test.step('Toujours pas de suggestion affichée', async () => {
    const nb_of_suggestions = await page.getByTitle('simple suggestion').count()
    expect(nb_of_suggestions).toEqual(0)
  })

  await test.step("Cette fois, en plus, un message explicite l'absence de résultat", async () => {
    const nb_of_notfound = await page.getByTitle('pas de résultat').count()
    expect(nb_of_notfound).toEqual(1)
  })
})

test('Barre de recherche (avec résultats)', async ({ page }) => {
  await test.step('On clique sur la barre de recherche', async () => {
    await page.goto('/')
  })

  await test.step('On clique sur la barre de recherche', async () => {
    await page.getByRole('textbox', { name: 'Rechercher...' }).click({ force: true })
  })

  await test.step('On entre plusieurs caractères qui forment une syllabe facile', async () => {
    await page.keyboard.type('t')
    await page.keyboard.type('r')
    await page.keyboard.type('a')
  })

  await test.step('Il y a bien des suggestions qui apparaissent', async () => {
    const nb_of_suggestions = await page.getByTitle('simple suggestion').count()
    expect(nb_of_suggestions).toBeGreaterThan(0)
  })

  await test.step('Au clavier, on peut valider la première suggestion', async () => {
    await page.keyboard.press('Enter')
  })

  await test.step("On est redirigé vers l'écran correspondant", async () => {
    await expect(page).toHaveURL(/.*transport/)
  })
})
