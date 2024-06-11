import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/usagenumerique')
})

test('Update share and integrate values when modifying parameters', async ({ page }) => {
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('0.27')
  await expect(page.getByTestId('etiquette-voiturethermique-value')).toContainText('65.3')
  await expect(page.getByTestId('etiquette-repasavecduboeuf-value')).toContainText('1.96')
  await expect(page.getByTestId('etiquette-streamingvideo-value')).toContainText('222')

  await page.getByTestId('input-main-value-streaming').fill('10')
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('0.37')

  await page.getByTestId('text-select-appareil-streaming').selectOption("'tablette'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('0.34')

  await page.getByTestId('text-select-type-streaming').selectOption("'ultra HD'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('0.72')

  await page.getByTestId('text-select-network-streaming').selectOption("'mobile FR'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('1.8')

  await page.getByTestId('input-main-value-visio').fill('9')
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('1.89')

  await page.getByTestId('text-select-appareil-visio').selectOption("'TV'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('1.93')

  await page.getByTestId('text-select-type-visio').selectOption("'audio'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('1.84')

  await page.getByTestId('text-select-network-visio').selectOption("'mobile FR'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('1.88')

  await page.getByTestId('input-main-value-email').fill('150')
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('1.89')

  await page.getByTestId('text-select-appareil-email').selectOption("'ordinateur et écran'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('1.92')

  await page.getByTestId('text-select-type-email').selectOption("'5.075'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('2.72')

  await page.getByTestId('text-select-network-email').selectOption("'mobile FR'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('2.73')

  await expect(page.getByTestId('category-visioconference')).toContainText('1 an de visioconférences (468 heures)')
  await expect(page.getByTestId('category-visioconference-value')).toContainText('6.97')
  await expect(page.getByTestId('category-email')).toContainText("1 an d'email (7800 emails)")
  await expect(page.getByTestId('category-email-value')).toContainText('44.6')
  await expect(page.getByTestId('category-streamingvideo')).toContainText('1 an de streaming (520 heures)')
  await expect(page.getByTestId('category-streamingvideo-value')).toContainText('90.6')

  await page.getByTestId('header-share-button').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    "http://localhost:3000/outils/usagenumerique?emails=150&email . appareil='ordinateur et écran'&email . transmission . émetteur . réseau='mobile FR'&email . taille='5.075'&email . terminaux . temps écriture=3&email . destinataires=1&streaming . durée=600&streaming . appareil='tablette'&streaming . transmission . réseau='mobile FR'&streaming . qualité='ultra HD'&visio . durée=540&visio . appareil='TV'&visio . emplacements=2&visio . transmission . réseau='mobile FR'&visio . qualité='audio'"
  )
  await page.getByTestId('custom-param-situation-checkbox').getByRole('img').click()
  await expect(page.getByTestId('clipboard-box')).toContainText('http://localhost:3000/outils/usagenumerique')
  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-integrate-button').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    "<script name=\"impact-co2\" src=\"http://localhost:3000/iframe.js\" data-type=\"usagenumerique\" data-search=\"?emails=150&email . appareil='ordinateur et écran'&email . transmission . émetteur . réseau='mobile FR'&email . taille='5.075'&email . terminaux . temps écriture=3&email . destinataires=1&streaming . durée=600&streaming . appareil='tablette'&streaming . transmission . réseau='mobile FR'&streaming . qualité='ultra HD'&visio . durée=540&visio . appareil='TV'&visio . emplacements=2&visio . transmission . réseau='mobile FR'&visio . qualité='audio'&theme=default\"></script>"
  )
  await page.getByTestId('custom-param-situation-checkbox').getByRole('img').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="usagenumerique" data-search="?theme=default"></script>'
  )
})

test('Load default values', async ({ page }) => {
  await page.goto(
    "http://localhost:3000/usagenumerique?emails=744&email . appareil='tablette'&email . transmission . émetteur . réseau='mobile FR'&email . taille=1&streaming . durée=2100&streaming . appareil='ordinateur portable'&streaming . transmission . réseau='mobile FR'&streaming . qualité='SD'&visio . durée=3100&visio . appareil='ordinateur et écran'&visio . emplacements=1&visio . transmission . réseau='mobile FR'&visio . qualité='audio'"
  )
  await expect(page.getByTestId('usagenumerique-generated-value')).toContainText('1.92')
})
