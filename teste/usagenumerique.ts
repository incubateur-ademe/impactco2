import { FrameLocator, Page, expect } from '@playwright/test'

export const usageNumeriqueTest = async (page: Page | FrameLocator, prod?: boolean) => {
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('0.08')

  await expect(page.getByTestId('etiquette-value').first()).toHaveText('4.02 kg CO₂e')

  await page.getByTestId('input-main-value-streaming').fill('10')
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('0.19')

  await page.getByTestId('text-select-appareil-streaming').selectOption("'tablette'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('0.17')

  await page.getByTestId('text-select-type-streaming').selectOption("'ultra HD'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('0.23')

  await page.getByTestId('text-select-network-streaming').selectOption("'mobile'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('0.85')

  await page.getByTestId('input-main-value-visio').fill('9')
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.03')

  await page.getByTestId('text-select-appareil-visio').selectOption("'TV'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.06')

  await page.getByTestId('text-select-type-visio').selectOption("'audio'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('0.98')

  await page.getByTestId('text-select-network-visio').selectOption("'mobile'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.04')

  await page.getByTestId('input-main-value-email').fill('150')
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.13')

  await page.getByTestId('text-select-appareil-email').selectOption("'ordinateur portable'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.11')

  await page.getByTestId('text-select-type-email').selectOption("'5.075'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.11')

  await page.getByTestId('text-select-network-email').selectOption("'mobile'")
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.12')

  await expect(page.getByTestId('category-visioconference')).toHaveText(
    '1 an de visioconférences - 468 heures11 kg CO₂e'
  )
  await expect(page.getByTestId('category-visioconference-value')).toHaveText('11')
  await expect(page.getByTestId('category-email')).toHaveText("1 an d'email - 7800 emails6.27 kg CO₂e")
  await expect(page.getByTestId('category-email-value')).toHaveText('6.27')
  await expect(page.getByTestId('category-streamingvideo')).toHaveText('1 an de streaming - 520 heures41.1 kg CO₂e')
  await expect(page.getByTestId('category-streamingvideo-value')).toHaveText('41.1')

  await page.getByTestId('header-share-button').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/outils/usagenumerique?emails=150&email . appareil='ordinateur portable'&email . taille='5.075'&email . terminaux . temps écriture=3&email . destinataires=1&email . réseau='mobile'&streaming . durée=600&streaming . appareil='tablette'&streaming . qualité='ultra HD'&streaming . réseau='mobile'&visio . durée=540&visio . appareil='TV'&visio . emplacements=2&visio . qualité='audio'&visio . réseau='mobile'&language=fr`
  )
  await page.getByTestId('custom-param-situation-checkbox').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/outils/usagenumerique?&language=fr`
  )
  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-integrate-button').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script data-name=\"impact-co2\" src=\"${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js\" data-type=\"usagenumerique\" data-search=\"?emails=150&email . appareil='ordinateur portable'&email . taille='5.075'&email . terminaux . temps écriture=3&email . destinataires=1&email . réseau='mobile'&streaming . durée=600&streaming . appareil='tablette'&streaming . qualité='ultra HD'&streaming . réseau='mobile'&visio . durée=540&visio . appareil='TV'&visio . emplacements=2&visio . qualité='audio'&visio . réseau='mobile'&language=fr&theme=default\"></script>`
  )
  await page.getByTestId('custom-param-display-simulator-checkbox').locator('label').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    `<script data-name=\"impact-co2\" src=\"${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js\" data-type=\"usagenumerique\" data-search=\"?emails=150&email . appareil='ordinateur portable'&email . taille='5.075'&email . terminaux . temps écriture=3&email . destinataires=1&email . réseau='mobile'&streaming . durée=600&streaming . appareil='tablette'&streaming . qualité='ultra HD'&streaming . réseau='mobile'&visio . durée=540&visio . appareil='TV'&visio . emplacements=2&visio . qualité='audio'&visio . réseau='mobile'&display=graphic&language=fr&theme=default\"></script>`
  )
  await page.getByTestId('custom-param-display-graphic-checkbox').locator('label').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script data-name=\"impact-co2\" src=\"${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js\" data-type=\"usagenumerique\" data-search=\"?emails=150&email . appareil='ordinateur portable'&email . taille='5.075'&email . terminaux . temps écriture=3&email . destinataires=1&email . réseau='mobile'&streaming . durée=600&streaming . appareil='tablette'&streaming . qualité='ultra HD'&streaming . réseau='mobile'&visio . durée=540&visio . appareil='TV'&visio . emplacements=2&visio . qualité='audio'&visio . réseau='mobile'&language=fr&theme=default\"></script>`
  )

  await page.getByTestId('custom-param-situation-checkbox').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script data-name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="usagenumerique" data-search="?&language=fr&theme=default"></script>`
  )
}
