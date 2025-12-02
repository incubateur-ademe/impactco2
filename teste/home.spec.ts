import { expect, test } from '@playwright/test'

test("Page d'accueil et recherche", async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Accueil | Impact CO₂/)

  await page.getByTestId('input-search').clear()
  await page.getByTestId('input-search').fill('tra')
  await expect(page.getByTestId('equivalent-search-empty')).toHaveCount(0)
  await expect(page.getByTestId('equivalent-search-tramway')).toBeVisible()
  await expect(page.getByTestId('equivalent-search-trainenfrancejour')).toBeVisible()
  await expect(page.getByTestId('equivalent-search-traitementdechetsjour')).toBeVisible()

  await page.getByTestId('input-search').clear()
  await page.getByTestId('input-search').fill('tx')
  await expect(page.getByTestId('equivalent-search-empty')).toHaveCount(3)
})
