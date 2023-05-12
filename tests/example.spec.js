// @ts-check
const { test, expect } = require('@playwright/test')

test("Le titre de la page d'accueil est bien renseigné", async ({ page }) => {
  await page.goto('/')

  // Le titre de la page est bien renseigné
  await expect(page).toHaveTitle(/Impact sur le climat des objets et gestes/)
})

test('La barre de recherche renvoie des résultats', async ({ page }) => {
  await page.goto('/')
  // await page.type('input#main_search', 'train', { delay: 200 });
  await page
    .getByRole('textbox', { name: 'Entrez un objet, un geste...' })
    .click({ force: true })
  await page.locator('#searchbar > div > form > div > input').type('hey')
  // Expect a title "to contain" a substring.
  // await expect(page).toHaveContent(/rer ou transilien/);
})

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });
