import { FrameLocator, Page, expect } from 'playwright/test'

export const distanceComparisonTest = async (page: Page | FrameLocator, prod?: boolean) => {
  await expect(page.getByTestId('comparison-tile-0')).toHaveText('Voiture thermique2.18 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'TGV0.03 kg CO₂eMoyen le plus écologique2.15Kg CO₂eévités Modifier'
  )

  await page.getByRole('button', { name: 'Voir une autre comparaison' }).click()
  await expect(page.getByTestId('comparison-tile-0')).toHaveText('Voiture électrique1.03 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'Métro0.04 kg CO₂eMoyen le plus écologique0.99Kg CO₂eévités Modifier'
  )

  await page.getByTestId('header-integrate-button').click()
  await page.getByTestId('text-select-comparison-1').selectOption('voiturethermique+2')
  await page.getByTestId('text-select-comparison-2').selectOption('avion')

  await page.getByTestId('cancel-button').click()

  await expect(page.getByTestId('comparison-tile-0')).toHaveText('Voiture électrique1.03 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'Métro0.04 kg CO₂eMoyen le plus écologique0.99Kg CO₂eévités Modifier'
  )

  await page.getByTestId('comparison-tile-0').getByRole('button', { name: 'Modifier' }).click()
  await page.getByRole('button', { name: 'TGV' }).click()
  await page.getByTestId('comparison-tile-1').getByRole('button', { name: 'Modifier' }).click()
  await page.getByRole('button', { name: 'Covoiturage thermique (2 passagers)' }).click()

  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'Covoiturage thermique (2 passagers)0.73 kg CO₂e Modifier'
  )
  await expect(page.getByTestId('comparison-tile-0')).toHaveText(
    'TGV0.03 kg CO₂eMoyen le plus écologique0.7Kg CO₂eévités Modifier'
  )
  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'Covoiturage thermique (2 passagers)0.73 kg CO₂e Modifier'
  )

  await page.getByTestId('comparison-tile-1').getByRole('button', { name: 'Modifier' }).click()
  await page.getByRole('button', { name: 'Avion', exact: true }).click()
  await expect(page.getByTestId('comparison-tile-0')).toHaveText(
    'TGV0.03 kg CO₂eMoyen le plus écologique2.56Kg CO₂eévités Modifier'
  )
  await expect(page.getByTestId('comparison-tile-1')).toHaveText('Avion court courrier2.59 kg CO₂e Modifier')

  await page.getByTestId('input-km-value').fill('10000')
  await expect(page.getByTestId('comparison-tile-0')).toHaveText(
    'TGV29.3 kg CO₂eMoyen le plus écologique1,490Kg CO₂eévités Modifier'
  )
  await expect(page.getByTestId('comparison-tile-1')).toHaveText('Avion long courrier1,520 kg CO₂e Modifier')
}

export const distanceTest = async (page: Page | FrameLocator, prod?: boolean) => {
  await expect(page.getByTestId('category-metro-value')).toHaveText('0.04')
  await expect(page.getByTestId('category-rer-value')).not.toBeVisible()
  await expect(page.getByTestId('category-tgv-value')).not.toBeVisible()

  await page.getByTestId('input-km-value').fill('100')
  await expect(page.getByTestId('category-metro-value')).not.toBeVisible()
  await expect(page.getByTestId('category-rer-value')).toHaveText('0.98')
  await expect(page.getByTestId('category-tgv-value')).not.toBeVisible()
  await page.getByTestId('input-km-value').fill('1000')
  await expect(page.getByTestId('category-metro-value')).not.toBeVisible()
  await expect(page.getByTestId('category-rer-value')).not.toBeVisible()
  await expect(page.getByTestId('category-tgv-value')).toHaveText('2.93')

  await page.getByTestId('header-integrate-button').click()
  await page.getByRole('combobox', { name: 'Arrivée' }).clear({ force: true })

  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="transport" data-search="?theme=default&language=fr&km=1000&defaultMode=list"></script>`
  )
  await page.getByText('Afficher par défaut').first().click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&km=1000&defaultMode=list"></script>`
  )
  await page
    .locator('label')
    .filter({ hasText: /^Itinéraire$/ })
    .locator('span')
    .nth(1)
    .click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=list"></script>`
  )
  await page.getByText('Afficher par défaut').nth(1).click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=comparison"></script>`
  )

  await page.locator('span').filter({ hasText: /^TGV$/ }).nth(2).click()
  await page.locator('span').filter({ hasText: /^TER$/ }).nth(2).click()
  await page.getByLabel('Intégrer').getByText('Covoiturage thermique', { exact: true }).click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=comparison&comparison=voiturethermique,autocar&modes=avion,intercites,voiturethermique,voitureelectrique+1,voitureelectrique,autocar,marche,velo,veloelectrique,busthermique,tramway,metro,scooter,moto,rer,buselectrique,trottinette,busgnv"></script>`
  )
  await page.getByTestId('text-select-comparison-1').selectOption('velo')
  await page.getByTestId('text-select-comparison-2').selectOption('moto')
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=comparison&comparison=velo,moto&modes=avion,intercites,voiturethermique,voitureelectrique+1,voitureelectrique,autocar,marche,velo,veloelectrique,busthermique,tramway,metro,scooter,moto,rer,buselectrique,trottinette,busgnv"></script>`
  )

  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-share-button').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/outils/transport?km=1000&defaultMode=list&language=fr`
  )
  await page.getByTestId('custom-param-km-checkbox').locator('span').nth(1).click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/outils/transport?defaultMode=list&language=fr`
  )

  await expect(page.locator('label').filter({ hasText: "Personnaliser l'itinéraire" })).not.toBeVisible()
  await page.getByRole('radio', { name: 'Itinéraire' }).check()
  await page.getByRole('combobox', { name: 'Arrivée' }).first().clear({ force: true })
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/outils/transport/itineraire?defaultMode=list&language=fr`
  )
  await expect(page.locator('label').filter({ hasText: "Personnaliser l'itinéraire" })).toBeVisible()
}
