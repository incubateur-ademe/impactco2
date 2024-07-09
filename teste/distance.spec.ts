import { expect, test } from '@playwright/test'

test('Transport distance list', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/transport')

  await expect(page.getByTestId('category-metro-value')).toContainText('0.04')
  await expect(page.getByTestId('category-rer-value')).not.toBeVisible()
  await expect(page.getByTestId('category-tgv-value')).not.toBeVisible()

  await page.getByTestId('input-km-value').fill('100')
  await expect(page.getByTestId('category-metro-value')).not.toBeVisible()
  await expect(page.getByTestId('category-rer-value')).toContainText('0.98')
  await expect(page.getByTestId('category-tgv-value')).not.toBeVisible()
  await page.getByTestId('input-km-value').fill('1000')
  await expect(page.getByTestId('category-metro-value')).not.toBeVisible()
  await expect(page.getByTestId('category-rer-value')).not.toBeVisible()
  await expect(page.getByTestId('category-tgv-value')).toContainText('2.93')

  await page.getByTestId('header-integrate-button').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport" data-search="?theme=default&language=fr&km=1000&defaultMode=list"></script>'
  )
  await page.getByRole('button', { name: 'Afficher par défaut' }).first().click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&km=1000&defaultMode=list"></script>'
  )
  await page
    .locator('label')
    .filter({ hasText: /^Itinéraire$/ })
    .locator('div')
    .nth(1)
    .click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=list"></script>'
  )
  await page.getByRole('button', { name: 'Afficher par défaut' }).nth(1).click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=comparison"></script>'
  )
  await page.locator('div').filter({ hasText: /^TGV$/ }).nth(2).click()
  await page.locator('div').filter({ hasText: /^TER$/ }).nth(2).click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=comparison&modes=avion,intercites,voiturethermique,voitureelectrique,autocar,velo,veloelectrique,busthermique,tramway,metro,scooter,moto,rer,buselectrique,trottinette,busgnv"></script>'
  )
  await page.getByTestId('text-select-comparison-1').selectOption('velo')
  await page.getByTestId('text-select-comparison-2').selectOption('moto')
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=comparison&modes=avion,intercites,voiturethermique,voitureelectrique,autocar,velo,veloelectrique,busthermique,tramway,metro,scooter,moto,rer,buselectrique,trottinette,busgnv"></script>'
  )

  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-share-button').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    'http://localhost:3000/outils/transport?km=1000&defaultMode=list&language=fr'
  )
  await page.getByTestId('custom-param-km-checkbox').locator('div').nth(1).click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    'http://localhost:3000/outils/transport?defaultMode=list&language=fr'
  )

  await expect(page.locator('label').filter({ hasText: "Personnaliser l'itinéraire" })).not.toBeVisible()
  await page.getByLabel('Itinéraire').check()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    'http://localhost:3000/outils/transport/itineraire?defaultMode=list&language=fr'
  )
  await expect(page.locator('label').filter({ hasText: "Personnaliser l'itinéraire" })).toBeVisible()
})
