import { expect, test } from '@playwright/test'

test('On est redirigé de /convertisseur vers /comparateur', async ({ page }) => {
  await page.goto('/convertisseur')
  await expect(page).toHaveURL(/.*comparateur/)
})
test('On est redirigé de /categories vers /thematiques', async ({ page }) => {
  await page.goto('/categories')
  await expect(page).toHaveURL(/.*thematiques/)
})
test('On est redirigé de /beta/* vers /api/*', async ({ page }) => {
  await page.goto('/beta/notion')
  await expect(page).toHaveURL(/.*api\/notion/)
})
test('On est redirigé de /categories/deplacement/* vers /transport/*', async ({ page }) => {
  await page.goto('/categories/deplacement/tgv')
  await expect(page).toHaveURL(/.*transport\/tgv/)
})
test('On est redirigé de /categories/:slug* vers /:slug*', async ({ page }) => {
  await page.goto('/categories/chauffage')
  await expect(page).toHaveURL(/.*chauffage/)
})
test('On est redirigé de /empreinte-carbone/:slug* vers /:slug*', async ({ page }) => {
  await page.goto('/empreinte-carbone/chauffage')
  await expect(page).toHaveURL(/.*chauffage/)
})
test('On est redirigé de /iframes/categories/:slug* vers /iframes/:slug*', async ({ page }) => {
  await page.goto('/iframes/categories/chauffage')
  await expect(page).toHaveURL(/.*iframes\/chauffage/)
})
test('On est redirigé de /iframes/empreinte-carbone/:slug* vers /iframes/:slug*', async ({ page }) => {
  await page.goto('/iframes/empreinte-carbone/chauffage')
  await expect(page).toHaveURL(/.*iframes\/chauffage/)
})
test('On est redirigé de /iframes/tuiles/ vers /iframes/comparateur/', async ({ page }) => {
  await page.goto('/iframes/tuiles/')
  await expect(page).toHaveURL(/.*iframes\/comparateur/)
})
test('On est redirigé de /iframes/convertisseur/ vers /iframes/comparateur/', async ({ page }) => {
  await page.goto('/iframes/convertisseur/')
  await expect(page).toHaveURL(/.*iframes\/comparateur/)
})
