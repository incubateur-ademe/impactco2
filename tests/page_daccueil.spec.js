// @ts-check
const { test, expect } = require('@playwright/test')

test("Le titre de la page d'accueil est bien renseigné", async ({ page }) => {
  // Ouverture de la page d'accueil dans le navigateur
  await page.goto('/')

  // Le titre de la page est bien renseigné
  await expect(page).toHaveTitle(/Impact sur le climat des objets et gestes/)
})

test("La barre de recherche de la page d'accueil suggère (ou pas) des résultats", async ({
  page,
}) => {
  // Ouverture de la page d'accueil dans le navigateur
  await page.goto('/')

  // Pas de suggestion au départ
  expect(await page.getByTitle('simple suggestion').count()).toEqual(0)

  // Click sur la barre de recherche
  await page
    .getByRole('textbox', { name: 'Entrez un objet, un geste...' })
    .click({ force: true })

  // Entrer un seul caractère
  await page.keyboard.type('t')

  // Toujours pas de suggestion
  expect(await page.getByTitle('simple suggestion').count()).toEqual(0)

  // Entrer un caractère bizarre
  await page.keyboard.type('w')

  // Toujours pas de suggestion...
  expect(await page.getByTitle('simple suggestion').count()).toEqual(0)
  // ...Et un message "non trouvé" s'affiche
  expect(await page.getByTestId('notfound').count()).toEqual(1)

  // Supprimer un caractère
  await page.keyboard.press('Backspace')
  // Entrer un nouveau caractère...
  await page.keyboard.type('r')
  // Et un troisième
  await page.keyboard.type('a')
})

test("Le clic sur la suggestion d'un résultat de la page d'accueil redirige vers le détail", async ({
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

  // Il y a bien des suggestions
  expect(await page.getByTitle('simple suggestion').count()).toBeGreaterThan(0)

  // L'utilisateur appui sur la touche "Tab"
  await page.keyboard.press('Tab')

  // L'utilisateur appui sur la touche "Entrée"
  await page.keyboard.press('Enter')

  // L'utilisateur est redirigé vers une URL qui concerne les transports
  await expect(page).toHaveURL(/.*transport/)
})
