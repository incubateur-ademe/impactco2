import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/usagenumerique')
})

test('Update share and integrate values when modifying parameters', async ({ page }) => {
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('0.28')

  await expect(page.getByTestId('etiquette-value')).toHaveText('14.3')

  await page.getByTestId('input-main-value-streaming').fill('10')
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('0.37')

  await page.getByTestId('text-select-appareil-streaming').selectOption("'tablette'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('0.34')

  await page.getByTestId('text-select-type-streaming').selectOption("'ultra HD'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('0.72')

  await page.getByTestId('text-select-network-streaming').selectOption("'mobile FR'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.8')

  await page.getByTestId('input-main-value-visio').fill('9')
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.89')

  await page.getByTestId('text-select-appareil-visio').selectOption("'TV'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.93')

  await page.getByTestId('text-select-type-visio').selectOption("'audio'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.84')

  await page.getByTestId('text-select-network-visio').selectOption("'mobile FR'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.89')

  await page.getByTestId('input-main-value-email').fill('150')
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.9')

  await page.getByTestId('text-select-appareil-email').selectOption("'ordinateur et écran'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.93')

  await page.getByTestId('text-select-type-email').selectOption("'5.075'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('2.73')

  await page.getByTestId('text-select-network-email').selectOption("'mobile FR'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('2.74')

  await expect(page.getByTestId('category-visioconference')).toHaveText(
    '1 an de visioconférences - 468 heures7.07 kg CO₂e'
  )
  await expect(page.getByTestId('category-visioconference-value')).toHaveText('7.07')
  await expect(page.getByTestId('category-email')).toHaveText("1 an d'email - 7800 emails44.6 kg CO₂e")
  await expect(page.getByTestId('category-email-value')).toHaveText('44.6')
  await expect(page.getByTestId('category-streamingvideo')).toHaveText('1 an de streaming - 520 heures90.7 kg CO₂e')
  await expect(page.getByTestId('category-streamingvideo-value')).toHaveText('90.7')

  await page.getByTestId('header-share-button').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    "http://localhost:3000/outils/usagenumerique?emails=150&email . appareil='ordinateur et écran'&email . transmission . émetteur . réseau='mobile FR'&email . taille='5.075'&email . terminaux . temps écriture=3&email . destinataires=1&streaming . durée=600&streaming . appareil='tablette'&streaming . transmission . réseau='mobile FR'&streaming . qualité='ultra HD'&visio . durée=540&visio . appareil='TV'&visio . emplacements=2&visio . transmission . réseau='mobile FR'&visio . qualité='audio'&language=fr"
  )
  await page.getByTestId('custom-param-situation-checkbox').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText('http://localhost:3000/outils/usagenumerique?&language=fr')
  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-integrate-button').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    "<script name=\"impact-co2\" src=\"http://localhost:3000/iframe.js\" data-type=\"usagenumerique\" data-search=\"?emails=150&email . appareil='ordinateur et écran'&email . transmission . émetteur . réseau='mobile FR'&email . taille='5.075'&email . terminaux . temps écriture=3&email . destinataires=1&streaming . durée=600&streaming . appareil='tablette'&streaming . transmission . réseau='mobile FR'&streaming . qualité='ultra HD'&visio . durée=540&visio . appareil='TV'&visio . emplacements=2&visio . transmission . réseau='mobile FR'&visio . qualité='audio'&language=fr&theme=default\"></script>"
  )
  await page.getByTestId('custom-param-display-simulator-checkbox').locator('label').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    "<script name=\"impact-co2\" src=\"http://localhost:3000/iframe.js\" data-type=\"usagenumerique\" data-search=\"?emails=150&email . appareil='ordinateur et écran'&email . transmission . émetteur . réseau='mobile FR'&email . taille='5.075'&email . terminaux . temps écriture=3&email . destinataires=1&streaming . durée=600&streaming . appareil='tablette'&streaming . transmission . réseau='mobile FR'&streaming . qualité='ultra HD'&visio . durée=540&visio . appareil='TV'&visio . emplacements=2&visio . transmission . réseau='mobile FR'&visio . qualité='audio'&display=graphic&language=fr&theme=default\"></script>"
  )
  await page.getByTestId('custom-param-display-graphic-checkbox').locator('label').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    "<script name=\"impact-co2\" src=\"http://localhost:3000/iframe.js\" data-type=\"usagenumerique\" data-search=\"?emails=150&email . appareil='ordinateur et écran'&email . transmission . émetteur . réseau='mobile FR'&email . taille='5.075'&email . terminaux . temps écriture=3&email . destinataires=1&streaming . durée=600&streaming . appareil='tablette'&streaming . transmission . réseau='mobile FR'&streaming . qualité='ultra HD'&visio . durée=540&visio . appareil='TV'&visio . emplacements=2&visio . transmission . réseau='mobile FR'&visio . qualité='audio'&language=fr&theme=default\"></script>"
  )

  await page.getByTestId('custom-param-situation-checkbox').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="usagenumerique" data-search="?&language=fr&theme=default"></script>'
  )
})

test('Load default values', async ({ page }) => {
  await page.goto(
    "http://localhost:3000/usagenumerique?emails=744&email . appareil='tablette'&email . transmission . émetteur . réseau='mobile FR'&email . taille=1&streaming . durée=2100&streaming . appareil='ordinateur portable'&streaming . transmission . réseau='mobile FR'&streaming . qualité='SD'&visio . durée=3100&visio . appareil='ordinateur et écran'&visio . emplacements=1&visio . transmission . réseau='mobile FR'&visio . qualité='audio'"
  )
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.94')
  await expect(page.getByTestId('category-email')).toHaveText("1 an d'email - 38688 emails43.9 kg CO₂e")

  await page.goto(
    "http://localhost:3000/usagenumerique?emails=744&email . appareil='tablette'&email . transmission . émetteur . réseau='mobile FR'&email . taille=1&streaming . durée=2100&streaming . appareil='ordinateur portable'&streaming . transmission . réseau='mobile FR'&streaming . qualité='SD'&visio . durée=3100&visio . appareil='ordinateur et écran'&visio . emplacements=1&visio . transmission . réseau='mobile FR'&visio . qualité='audio'&display=graphic"
  )
  await expect(page.getByTestId('usagenumerique-generated-value')).not.toBeVisible()
  await expect(page.getByTestId('category-email')).toHaveText("1 an d'email - 38688 emails43.9 kg CO₂e")

  await page.goto(
    "http://localhost:3000/usagenumerique?emails=744&email . appareil='tablette'&email . transmission . émetteur . réseau='mobile FR'&email . taille=1&streaming . durée=2100&streaming . appareil='ordinateur portable'&streaming . transmission . réseau='mobile FR'&streaming . qualité='SD'&visio . durée=3100&visio . appareil='ordinateur et écran'&visio . emplacements=1&visio . transmission . réseau='mobile FR'&visio . qualité='audio'&display=simulator"
  )
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.94')
  await expect(page.getByTestId('category-email')).not.toBeVisible
})
