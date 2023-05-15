// @ts-check
const { test, expect } = require('@playwright/test')

test("Le titre de la page d'accueil est bien renseigné", async ({ page }) => {
  await page.goto('/')

  // Le titre de la page est bien renseigné
  await expect(page).toHaveTitle(/Impact sur le climat des objets et gestes/)
})

test("La barre de recherche de la page d'accueil suggère (ou pas) des résultats", async ({
  page,
}) => {
  // Chargement de la page
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

  // Entrer un caractère bizarre, un message explicite l'absence de résultat
  await page.keyboard.type('w')
  expect(await page.getByTitle('simple suggestion').count()).toEqual(0)
  expect(await page.getByTestId('notfound').count()).toEqual(1)

  // Entrer trois caractères
  await page.keyboard.press('Backspace')
  await page.keyboard.type('r')
  await page.keyboard.type('a')

  // Il y a bien des suggestions
  expect(await page.getByTitle('simple suggestion').count()).toBeGreaterThan(0)
})

test("Le clic sur la suggestion d'un résultat de la page d'accueil redirige vers le détail", async ({
  page,
}) => {
  await page.goto('/')
  await page
    .getByRole('textbox', { name: 'Entrez un objet, un geste...' })
    .click({ force: true })
  await page.keyboard.type('t')
  await page.keyboard.type('r')
  await page.keyboard.type('a')
  await page.keyboard.type('i')
  await page.keyboard.type('n')
  page.keyboard.press('Tab')
  page.keyboard.press('Enter')
  await expect(page).toHaveURL(/.*transport/)
})
