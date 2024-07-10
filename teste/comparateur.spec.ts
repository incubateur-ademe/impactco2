import { expect, test } from '@playwright/test'

test('Comparateur', async ({ page }) => {
  await page.goto('http://localhost:3000/comparateur')

  await page.getByRole('button', { name: 'Ajouter un équivalent' }).click()
  await expect(page.getByTestId('selected-equivalents-number')).toContainText('3')
  await page.getByRole('button', { name: 'Fruits et légumes 0 /' }).click()
  await page.getByLabel('Abricot').check()
  await expect(page.getByTestId('selected-equivalents-fruitsetlegumes-number')).toContainText('1')
  await expect(page.getByTestId('selected-equivalents-number')).toContainText('4')
  await page.getByRole('button', { name: 'Revenir au comparateur' }).click()

  await expect(page.getByTestId('comparateur-abricot-value')).toContainText('114')
  await expect(page.getByTestId('comparateur-abricot-name')).toContainText("kg d'Abricot")

  await page.getByRole('button', { name: 'Comparer' }).nth(3).click()
  await expect(page.getByTestId('compared-equivalent-value')).toContainText('88.1 kg CO₂e')

  await page.getByRole('button', { name: 'Ajouter un équivalent' }).click()
  await page.getByRole('button', { name: 'Fruits et légumes 0 /' }).click()
  await page.getByLabel('Ail').check()
  await expect(page.getByTestId('selected-equivalents-number')).toContainText('4')
  await page.getByRole('button', { name: 'Revenir au comparateur' }).click()

  await expect(page.getByTestId('comparateur-ail-value')).toContainText('246')
  await expect(page.getByTestId('comparateur-ail-name')).toContainText("kg d'Ail")

  await expect(page.getByTestId('etiquette-value').nth(0)).toContainText('88.1')
  await expect(page.getByTestId('etiquette-abricot-value').nth(0)).toContainText('10')
  await expect(page.getByTestId('etiquette-abricot-name').nth(0)).toContainText("kg d'abricot")
  await expect(page.getByTestId('etiquette-ail-value').nth(0)).toContainText('246')
  await expect(page.getByTestId('etiquette-ail-name').nth(0)).toContainText("kg d'ail")
  await expect(page.getByTestId('etiquette-value').nth(1)).toContainText('88.1')
  await expect(page.getByTestId('etiquette-abricot-value').nth(1)).toContainText('10')
  await expect(page.getByTestId('etiquette-abricot-name').nth(1)).toContainText("kg d'abricot")
  await expect(page.getByTestId('etiquette-ail-value').nth(1)).toContainText('246')
  await expect(page.getByTestId('etiquette-ail-name').nth(1)).toContainText("kg d'ail")

  await page.getByLabel("kg d'Abricot").fill('5')
  await expect(page.getByTestId('compared-equivalent-value')).toContainText('4.4 kg CO₂e')
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
  await page.getByRole('button', { name: 'Fruits et légumes 1 /' }).click()
  await page.getByLabel('Tomate').check()
  await expect(page.getByTestId('selected-equivalents-number')).toContainText('2')
  await page.getByRole('button', { name: 'Revenir au comparateur' }).click()

  await page.getByRole('button', { name: 'Ajouter un équivalent' }).click()
  await page.getByRole('button', { name: 'Transport 0 /' }).click()
  await page.getByText('Covoiturage électrique (3').click()
  await page.getByRole('button', { name: 'Revenir au comparateur' }).click()

  await expect(page.getByTestId('comparateur-voitureelectrique+3-value')).toContainText('170')
  await page.getByRole('button', { name: 'Comparer les valeurs avec Covoiturage électrique (3 passagers)' }).click()
  await expect(
    page
      .locator('div')
      .filter({ hasText: 'Comparateur carboneLe bon outil pour obtenir les bons ordres de grandeurkm en' })
      .getByRole('link')
      .first()
  ).toHaveAttribute('href', '/outils/transport/voitureelectrique+3')
  await expect(page.locator('#contenu')).toContainText('km en Covoiturage électrique (3 passagers)')
  await expect(page.getByTestId('compared-equivalent-value')).toContainText('2.59 kg CO₂e')

  await page.getByRole('button', { name: 'Comparer les valeurs avec Abricot' }).click()
  await page.getByLabel("kg d'Abricot").fill('5')

  await page.getByTestId('header-integrate-button').nth(0).click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="comparateur" data-search="?value=5&comparisons=ail,tomate,voitureelectrique+3&equivalent=abricot&language=fr&theme=default"></script>'
  )

  await page.locator('label').filter({ hasText: 'Intégrer ma propre comparaison' }).locator('div').nth(1).click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="comparateur" data-search="?&language=fr&theme=default"></script>'
  )

  await page.getByTestId('header-integrate-button').nth(1).click()
  await expect(page.getByTestId('clipboard-box').nth(1)).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="comparateur/etiquette-animee" data-search="?value=4.403191585&comparisons=abricot,ail,tomate,voitureelectrique+3&language=fr&theme=default"></script>'
  )

  await page.getByTestId('header-integrate-button').nth(2).click()
  await expect(page.getByTestId('clipboard-box').nth(2)).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="comparateur/etiquette" data-search="?value=4.403191585&comparisons=abricot,ail,tomate,voitureelectrique+3&language=fr&theme=default"></script>'
  )

  await page.getByTestId('cancel-button').nth(0).click()
  await page.getByRole('button', { name: "kg d'Abricot" }).click()
  await expect(page.getByTestId('comparateur-abricot-value')).toContainText('114')
  await expect(page.getByTestId('comparateur-ail-value')).toContainText('279')
  await expect(page.getByTestId('comparateur-voitureelectrique+3-value')).toContainText('3,868')
})

test('Iframes', async ({ page }) => {
  await page.goto(
    'http://localhost:3000/iframes/comparateur?value=5&comparisons=ail,tomate,voitureelectrique+3&equivalent=abricot'
  )
  await expect(page.getByTestId('compared-equivalent-value')).toContainText('4.4 kg CO₂e')
  await expect(page.getByTestId('comparateur-ail-value')).toContainText('12.3')
  await expect(page.getByTestId('comparateur-tomate-value')).toContainText('7.57')
  await expect(page.getByTestId('comparateur-voitureelectrique+3-value')).toContainText('170')

  await page.goto(
    'http://localhost:3000/iframes/comparateur/etiquette-animee?value=4.403191585&comparisons=abricot,ail,tomate,voitureelectrique+3'
  )
  await expect(page.getByTestId('etiquette-value')).toContainText('4.4')
  await expect(page.getByTestId('etiquette-abricot-value')).toContainText('5')
  await expect(page.getByTestId('etiquette-ail-value')).toContainText('12.3')
  await expect(page.getByTestId('etiquette-tomate-value')).toContainText('7.57')
  await expect(page.getByTestId('etiquette-voitureelectrique+3-value')).toContainText('170')

  await page.goto(
    'http://localhost:3000/iframes/comparateur/etiquette?value=4.403191585&comparisons=abricot,ail,tomate,voitureelectrique+3'
  )
  await expect(page.getByTestId('etiquette-value')).toContainText('4.4')
  await expect(page.getByTestId('etiquette-abricot-value')).toContainText('5')
  await expect(page.getByTestId('etiquette-ail-value')).toContainText('12.3')
  await expect(page.getByTestId('etiquette-tomate-value')).toContainText('7.57')
  await expect(page.getByTestId('etiquette-voitureelectrique+3-value')).toContainText('170')
})
