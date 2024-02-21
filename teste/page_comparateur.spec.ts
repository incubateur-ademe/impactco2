import { expect, test } from '@playwright/test'

test('Comparateur', async ({ page }) => {
  await page.goto('http://localhost:3000/comparateur')

  await page.getByRole('button', { name: 'Ajouter un équivalent' }).click()
  await expect(page.getByTestId('selected-equivalents-number')).toContainText('3')
  await page.getByRole('button', { name: 'Fruits et légumes 0 / 75 Voir' }).click()
  await page.getByLabel('Abricot').check()
  await expect(page.getByTestId('selected-equivalents-fruitsetlegumes-number')).toContainText('1')
  await expect(page.getByTestId('selected-equivalents-number')).toContainText('4')
  await page.getByRole('button', { name: 'Valider la séléction' }).click()

  await expect(page.getByTestId('comparateur-abricot-value')).toContainText('11.4')
  await expect(page.getByTestId('comparateur-abricot-name')).toContainText("kg d'abricot")

  await page.getByRole('button', { name: 'Comparer' }).nth(3).click()
  await expect(page.getByTestId('compared-equivalent-value')).toContainText('8,81 kg CO2e')

  await page.getByRole('button', { name: 'Ajouter un équivalent' }).click()
  await page.getByRole('button', { name: 'Fruits et légumes 0 / 74 Voir' }).click()
  await page.getByLabel('Ail').check()
  await expect(page.getByTestId('selected-equivalents-number')).toContainText('4')
  await page.getByRole('button', { name: 'Valider la séléction' }).click()

  await expect(page.getByTestId('comparateur-ail-value')).toContainText('24.6')
  await expect(page.getByTestId('comparateur-ail-name')).toContainText("kg d'ail")

  await page.getByText('10').nth(1).click()
  await expect(page.getByTestId('etiquette-value').nth(0)).toContainText('8.81')
  await expect(page.getByTestId('etiquette-abricot-value').nth(0)).toContainText('10')
  await expect(page.getByTestId('etiquette-abricot-name').nth(0)).toContainText("kg d'abricot")
  await expect(page.getByTestId('etiquette-ail-value').nth(0)).toContainText('24.6')
  await expect(page.getByTestId('etiquette-ail-name').nth(0)).toContainText("kg d'ail")
  await expect(page.getByTestId('etiquette-value').nth(1)).toContainText('8.81')
  await expect(page.getByTestId('etiquette-abricot-value').nth(1)).toContainText('10')
  await expect(page.getByTestId('etiquette-abricot-name').nth(1)).toContainText("kg d'abricot")
  await expect(page.getByTestId('etiquette-ail-value').nth(1)).toContainText('24.6')
  await expect(page.getByTestId('etiquette-ail-name').nth(1)).toContainText("kg d'ail")

  await page.getByLabel("kg d'abricot").fill('5')
  await expect(page.getByTestId('compared-equivalent-value')).toContainText('4,4 kg CO2e')
  await expect(page.getByTestId('comparateur-ail-value')).toContainText('12.3')
  await expect(page.getByTestId('etiquette-value').nth(0)).toContainText('4.4')
  await expect(page.getByTestId('etiquette-abricot-value').nth(0)).toContainText('5')
  await expect(page.getByTestId('etiquette-ail-value').nth(0)).toContainText('12.3')
  await expect(page.getByTestId('etiquette-value').nth(1)).toContainText('4.4')
  await expect(page.getByTestId('etiquette-abricot-value').nth(1)).toContainText('5')
  await expect(page.getByTestId('etiquette-ail-value').nth(1)).toContainText('12.3')

  await page.getByTestId('comparateur-tile-close').nth(0).click()
  await page.getByTestId('comparateur-tile-close').nth(0).click()
  await page.getByTestId('comparateur-tile-close').nth(0).click()

  await page.getByRole('button', { name: 'Ajouter un équivalent' }).click()
  await page.getByRole('button', { name: 'Fruits et légumes 1 / 74 Voir' }).click()
  await page.getByLabel('Tomate').check()
  await expect(page.getByTestId('selected-equivalents-number')).toContainText('2')
  await page.getByRole('button', { name: 'Valider la séléction' }).click()

  await page
    .locator('section')
    .filter({ hasText: 'Comparateur Partager Intégrer' })
    .getByTestId('header-integrate-button')
    .click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="comparateur" data-search="?value=5&comparisons=ail,tomate&equivalent=abricot&theme=default"></script>'
  )

  await page.locator('label').filter({ hasText: 'Intégrer ma propre comparaison' }).locator('div').nth(1).click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="comparateur" data-search="?theme=default"></script>'
  )

  await page.getByTestId('header-integrate-button').nth(1).click()
  await expect(page.getByTestId('clipboard-box').nth(1)).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="comparateur/etiquette-animee" data-search="?theme=default&value=4403.1915850000005&comparisons=abricot,ail,tomate"></script>'
  )

  await page.getByTestId('header-integrate-button').nth(2).click()
  await expect(page.getByTestId('clipboard-box').nth(2)).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="comparateur/etiquette" data-search="?theme=default&value=4403.1915850000005&comparisons=abricot,ail,tomate"></script>'
  )

  await page.getByRole('button', { name: "kg d'abricot" }).click()
  await expect(page.getByTestId('comparateur-abricot-value')).toContainText('11.4')
  await expect(page.getByTestId('comparateur-ail-value')).toContainText('27.9')
})

test('Iframes', async ({ page }) => {
  await page.goto('http://localhost:3000/iframes/comparateur?value=5&comparisons=ail,tomate&equivalent=abricot')
  await expect(page.getByTestId('compared-equivalent-value')).toContainText('4,4 kg CO2e')
  await expect(page.getByTestId('comparateur-ail-value')).toContainText('12.3')
  await expect(page.getByTestId('comparateur-tomate-value')).toContainText('7.57')

  await page.goto(
    'http://localhost:3000/iframes/comparateur/etiquette-animee?value=4403.1915850000005&comparisons=abricot,ail,tomate'
  )
  await expect(page.getByTestId('etiquette-value')).toContainText('4.4')
  await expect(page.getByTestId('etiquette-abricot-value')).toContainText('5')
  await expect(page.getByTestId('etiquette-ail-value')).toContainText('12.3')
  await expect(page.getByTestId('etiquette-tomate-value')).toContainText('7.57')

  await page.goto(
    'http://localhost:3000/iframes/comparateur/etiquette?value=4403.1915850000005&comparisons=abricot,ail,tomate'
  )
  await expect(page.getByTestId('etiquette-value')).toContainText('4.4')
  await expect(page.getByTestId('etiquette-abricot-value')).toContainText('5')
  await expect(page.getByTestId('etiquette-ail-value')).toContainText('12.3')
  await expect(page.getByTestId('etiquette-tomate-value')).toContainText('7.57')
})
