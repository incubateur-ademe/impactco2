// @ts-check
const { test, expect } = require('@playwright/test')

test("Le titre de la page d'accueil est bien renseigné", async ({ page }) => {
  await test.step("On charge la page d'accueil dans le navigateur", async () => {
    await page.goto('/')
  })
  await test.step("L'onglet s'affiche avec un titre correct", async () => {
    await expect(page).toHaveTitle(/Impact sur le climat des objets et gestes/)
  })
})

test("La barre de recherche de la page d'accueil ne suggère pas de résultats", async ({
  page,
}) => {
  // Ouverture de la page d'accueil dans le navigateur
  await page.goto('/')

  // Comptage du nombre de message affichant "non trouvé"
  let nb_of_notfound = await page.getByTestId('notfound').count()

  // Pas de "non trouvé" explicite au départ
  expect(nb_of_notfound).toEqual(0)

  // Comptage des suggestions
  let nb_of_suggestions = await page.getByTitle('simple suggestion').count()

  // Pas de suggestion au départ
  expect(nb_of_suggestions).toEqual(0)

  // Click sur la barre de recherche
  await page
    .getByRole('textbox', { name: 'Entrez un objet, un geste...' })
    .click({ force: true })

  // Entrer un seul caractère
  await page.keyboard.type('t')

  // Nouveau comptage des suggestions
  nb_of_suggestions = await page.getByTitle('simple suggestion').count()

  // Toujours pas de suggestion
  expect(nb_of_suggestions).toEqual(0)

  // Entrer un caractère bizarre
  await page.keyboard.type('w')

  // Encore un comptage des suggestions
  nb_of_suggestions = await page.getByTitle('simple suggestion').count()

  // Toujours pas de suggestion
  expect(nb_of_suggestions).toEqual(0)

  // Comptage du nombre de message affichant "non trouvé"
  nb_of_notfound = await page.getByTestId('notfound').count()

  // Cette fois-ci, un message "non trouvé" s'affiche
  expect(nb_of_notfound).toEqual(1)
})

test("La barre de recherche de la page d'accueil suggère des résultats", async ({
  page,
}) => {
  // Ouverture de la page d'accueil dans le navigateur
  await page.goto('/')

  // Click sur la barre de recherche
  await page
    .getByRole('textbox', { name: 'Entrez un objet, un geste...' })
    .click({ force: true })

  // L'utilisateur entre un texte en rapport avec les transports
  await page.keyboard.type('t')

  // Entrer un nouveau caractère...
  await page.keyboard.type('r')

  // Et un troisième
  await page.keyboard.type('a')

  // Comptage des suggestions
  let nb_of_suggestions = await page.getByTitle('simple suggestion').count()

  // Il y a bien des suggestions
  expect(nb_of_suggestions).toBeGreaterThan(0)

  // L'utilisateur appui sur la touche "Tab"
  await page.keyboard.press('Tab')

  // L'utilisateur appui sur la touche "Entrée"
  await page.keyboard.press('Enter')

  // L'utilisateur est redirigé vers une URL qui concerne les transports
  await expect(page).toHaveURL(/.*transport/)
})
