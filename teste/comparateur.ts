import { FrameLocator, Page, expect } from 'playwright/test'

export const comparateurTest = async (page: Page | FrameLocator, prod?: boolean, noEtiquette?: boolean) => {
  await page.getByRole('button', { name: 'Ajouter un équivalent' }).click()
  await expect(page.getByTestId('selected-equivalents-number')).toHaveText('3')
  await page.getByRole('button', { name: 'Fruits et légumes 0 /' }).click()
  await page.getByLabel('Abricot').check()
  await expect(page.getByTestId('selected-equivalents-fruitsetlegumes-number')).toHaveText('1')
  await expect(page.getByTestId('selected-equivalents-number')).toHaveText('4')
  await page.getByRole('button', { name: 'Revenir au comparateur' }).click()

  await expect(page.getByTestId('comparateur-abricot-value')).toHaveText('114')
  await expect(page.getByTestId('comparateur-abricot-name')).toHaveText("kg d'Abricot")

  await page.getByRole('button', { name: 'Comparer' }).nth(3).click()
  await expect(page.getByTestId('compared-equivalent-value')).toHaveText('88.1 kg CO₂e')

  await page.getByRole('button', { name: 'Ajouter un équivalent' }).click()
  await page.getByRole('button', { name: 'Fruits et légumes 0 /' }).click()
  await page.getByLabel('Ail').check()
  await expect(page.getByTestId('selected-equivalents-number')).toHaveText('4')
  await page.getByRole('button', { name: 'Revenir au comparateur' }).click()

  await expect(page.getByTestId('comparateur-ail-value')).toHaveText('246')
  await expect(page.getByTestId('comparateur-ail-name')).toHaveText("kg d'Ail")

  if (!noEtiquette) {
    await expect(page.getByTestId('etiquette-value').nth(0)).toHaveText('88.1')
    await expect(page.getByTestId('etiquette-abricot-value').nth(0)).toHaveText('100')
    await expect(page.getByTestId('etiquette-abricot-name').nth(0)).toHaveText("kg d'abricot")
    await expect(page.getByTestId('etiquette-ail-value').nth(0)).toHaveText('246')
    await expect(page.getByTestId('etiquette-ail-name').nth(0)).toHaveText("kg d'ail")
    await expect(page.getByTestId('etiquette-value').nth(1)).toHaveText('88.1')
    await expect(page.getByTestId('etiquette-abricot-value').nth(1)).toHaveText('100')
    await expect(page.getByTestId('etiquette-abricot-name').nth(1)).toHaveText("kg d'abricot")
    await expect(page.getByTestId('etiquette-ail-value').nth(1)).toHaveText('246')
    await expect(page.getByTestId('etiquette-ail-name').nth(1)).toHaveText("kg d'ail")
  }

  await page.getByLabel("kg d'Abricot").fill('5')
  await expect(page.getByTestId('compared-equivalent-value')).toHaveText('4.4 kg CO₂e')
  await expect(page.getByTestId('comparateur-ail-value')).toHaveText('12.3')
  if (!noEtiquette) {
    await expect(page.getByTestId('etiquette-value').nth(0)).toHaveText('4.4')
    await expect(page.getByTestId('etiquette-abricot-value').nth(0)).toHaveText('5')
    await expect(page.getByTestId('etiquette-ail-value').nth(0)).toHaveText('12.3')
    await expect(page.getByTestId('etiquette-value').nth(1)).toHaveText('4.4')
    await expect(page.getByTestId('etiquette-abricot-value').nth(1)).toHaveText('5')
    await expect(page.getByTestId('etiquette-ail-value').nth(1)).toHaveText('12.3')
  }
  await page.getByTestId('comparateur-tile-close').nth(0).click()
  await page.getByTestId('comparateur-tile-close').nth(0).click()
  await page.getByTestId('comparateur-tile-close').nth(0).click()

  await page.getByRole('button', { name: 'Ajouter un équivalent' }).click()
  await page.getByRole('button', { name: 'Fruits et légumes 1 /' }).click()
  await page.getByLabel('Tomate').check()
  await expect(page.getByTestId('selected-equivalents-number')).toHaveText('2')
  await page.getByRole('button', { name: 'Revenir au comparateur' }).click()

  await page.getByRole('button', { name: 'Ajouter un équivalent' }).click()
  await page.getByRole('button', { name: 'Transport 0 /' }).click()
  await page.getByText('Covoiturage électrique (3').click()
  await page.getByRole('button', { name: 'Revenir au comparateur' }).click()

  await expect(page.getByTestId('comparateur-voitureelectrique+3-value')).toHaveText('170')
  await page.getByRole('button', { name: 'Comparer les valeurs avec Covoiturage électrique (3 passagers)' }).click()
  await expect(page.getByTestId('compared-equivalent-link')).toHaveAttribute(
    'href',
    '/outils/transport/voitureelectrique+3'
  )
  await expect(page.getByTestId('input-base-value-unit')).toHaveText('km en Covoiturage électrique (3 passagers)')
  await expect(page.getByTestId('compared-equivalent-value')).toHaveText('2.59 kg CO₂e')

  await page.getByRole('button', { name: 'Comparer les valeurs avec Abricot' }).click()
  await page.getByLabel("kg d'Abricot").fill('5')

  await page.getByTestId('header-integrate-button').nth(0).click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="comparateur" data-search="?value=5&comparisons=ail,tomate,voitureelectrique+3&equivalent=abricot&language=fr&theme=default"></script>`
  )

  await page.locator('label').filter({ hasText: 'Intégrer ma propre comparaison' }).locator('span').nth(1).click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="comparateur" data-search="?&language=fr&theme=default"></script>`
  )

  if (!noEtiquette) {
    await page.getByTestId('header-integrate-button').nth(1).click()
    await expect(page.getByTestId('clipboard-box').nth(1)).toHaveText(
      `<script name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="comparateur/etiquette-animee" data-search="?value=4.403191585&comparisons=abricot,ail,tomate,voitureelectrique+3&language=fr&theme=default"></script>`
    )

    await page.getByTestId('header-integrate-button').nth(2).click()
    await expect(page.getByTestId('clipboard-box').nth(2)).toHaveText(
      `<script name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="comparateur/etiquette" data-search="?value=4.403191585&comparisons=abricot,ail,tomate,voitureelectrique+3&language=fr&theme=default"></script>`
    )
  }

  await page.getByTestId('cancel-button').nth(0).click()
  await page.getByRole('button', { name: "kg d'Abricot" }).click()
  await expect(page.getByTestId('comparateur-abricot-value')).toHaveText('114')
  await expect(page.getByTestId('comparateur-ail-value')).toHaveText('279')
  await expect(page.getByTestId('comparateur-voitureelectrique+3-value')).toHaveText('3,868')
}
