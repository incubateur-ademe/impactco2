// @ts-check
const { test, expect } = require('@playwright/test')

test('Poisson gras', async ({ page }) => {
  await test.step('On charge la page sur les poissons gras', async () => {
    await page.goto('/')
  })
  await test.step('1 repas avec du boeuf...', async () => {
    await expect(page.getByTitle('texte boeuf')).toHaveText(
      '1 repas avec du boeuf'
    )
  })
  await test.step('équivaut à 4 repas avec du poisson gras', async () => {
    await expect(page.getByTitle('emojis poissons')).toHaveText('🐟🐟🐟🐟')
    await expect(page.getByTitle('texte poissons')).toHaveText(
      '4 repas avec du poisson gras'
    )
  })
})
