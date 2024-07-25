import { expect, test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/usagenumerique')
  await page.getByTestId('header-integrate-button').click()
  await page.getByTestId('custom-param-display-simulator-checkbox').locator('label').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    "<script name=\"impact-co2\" src=\"http://localhost:3000/iframe.js\" data-type=\"usagenumerique\" data-search=\"?emails=50&email . appareil='smartphone'&email . transmission . émetteur . réseau='fixe FR'&email . taille=0.075&email . terminaux . temps écriture=3&email . destinataires=1&streaming . durée=420&streaming . appareil='TV'&streaming . transmission . réseau='fixe FR'&streaming . qualité='HD'&visio . durée=180&visio . appareil='ordinateur portable'&visio . emplacements=2&visio . transmission . réseau='fixe FR'&visio . qualité='SD'&display=graphic&language=fr&theme=default\"></script>"
  )
  await page.getByTestId('custom-param-display-graphic-checkbox').locator('label').click()
})
