import { expect, test } from '@playwright/test'

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
    await page.getByTestId('input-search').click({ force: true })
  })

  await test.step('On rentre une première lettre', async () => {
    await page.keyboard.type('tx')
  })

  await test.step('Pas de résultat affiché', async () => {
    const nb_of_notfound = await page.getByTestId('equivalent-search-empty').count()
    expect(nb_of_notfound).toEqual(3)
  })
})

test('Barre de recherche (avec résultats)', async ({ page }) => {
  await test.step("On charge la page d'accueil dans le navigateur", async () => {
    await page.goto('/')
  })

  await test.step('On clique sur la barre de recherche', async () => {
    await page.getByTestId('input-search').click({ force: true })
  })

  await test.step('On entre plusieurs caractères qui forment une syllabe facile', async () => {
    await page.keyboard.type('t')
    await page.keyboard.type('r')
    await page.keyboard.type('a')
  })

  await test.step('Il y a bien des suggestions qui apparaissent', async () => {
    const nb_of_notfound = await page.getByTestId('equivalent-search-empty').count()
    expect(nb_of_notfound).toEqual(0)
    await expect(page.getByTestId('equivalent-search-tramway')).toBeVisible()
    await expect(page.getByTestId('equivalent-search-trainenfrancejour')).toBeVisible()
    await expect(page.getByTestId('equivalent-search-traitementdechetsjour')).toBeVisible()
  })
})
