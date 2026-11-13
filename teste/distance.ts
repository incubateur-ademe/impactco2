import { FrameLocator, Page, expect } from '@playwright/test'

export const distanceComparisonTest = async (page: Page | FrameLocator, prod?: boolean) => {
  await expect(page.getByTestId('comparison-tile-0')).toHaveText('Voiture thermique2.28 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'TGV0.03 kg CO₂eMoyen le plus écologique2.25Kg CO₂eévités Modifier'
  )

  await page.getByRole('button', { name: 'Voir une autre comparaison' }).click()
  await expect(page.getByTestId('comparison-tile-0')).toHaveText('Voiture électrique1.08 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'Métro0.04 kg CO₂eMoyen le plus écologique1.03Kg CO₂eévités Modifier'
  )

  await page.getByTestId('header-integrate-button').click()
  await page.getByRole('button', { name: 'Voir les options avancées' }).click()
  await page.getByTestId('text-select-comparison-1').selectOption('voiturethermique+2')
  await page.getByTestId('text-select-comparison-2').selectOption('avion')

  await page.getByTestId('cancel-button').click()

  await expect(page.getByTestId('comparison-tile-0')).toHaveText('Voiture électrique1.08 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'Métro0.04 kg CO₂eMoyen le plus écologique1.03Kg CO₂eévités Modifier'
  )

  await page.getByTestId('comparison-tile-0').getByRole('button', { name: 'Modifier' }).click()
  await page.getByRole('button', { name: 'TGV' }).click()
  await page.getByTestId('comparison-tile-1').getByRole('button', { name: 'Modifier' }).click()
  await page.getByRole('button', { name: 'Covoiturage thermique' }).click()
  await page.getByRole('button', { name: 'Covoiturage thermique (3 personnes)' }).click()

  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'Covoiturage thermique (3 personnes)0.76 kg CO₂e Modifier'
  )
  await expect(page.getByTestId('comparison-tile-0')).toHaveText(
    'TGV0.03 kg CO₂eMoyen le plus écologique0.73Kg CO₂eévités Modifier'
  )
  await page.getByTestId('comparison-tile-1').getByRole('button', { name: 'Modifier' }).click()
  await page.getByRole('button', { name: 'Avion', exact: true }).click()
  await expect(page.getByTestId('comparison-tile-0')).toHaveText(
    'TGV0.03 kg CO₂eMoyen le plus écologique2.22Kg CO₂eévités Modifier'
  )
  await expect(page.getByTestId('comparison-tile-1')).toHaveText('Avion trajet court2.25 kg CO₂e Modifier')

  await page.getByTestId('input-km-value').fill('10000')
  await expect(page.getByTestId('comparison-tile-0')).toHaveText(
    'TGV29.3 kg CO₂eMoyen le plus écologique1,750Kg CO₂eévités Modifier'
  )
  await expect(page.getByTestId('comparison-tile-1')).toHaveText('Avion trajet long1,779 kg CO₂e Modifier')

  await page.getByTestId('comparison-tile-0').getByRole('button', { name: 'Modifier' }).click()
  await page.getByRole('button', { name: 'Covoiturage thermique' }).click()
  await page.getByRole('button', { name: 'Covoiturage thermique (Berline - Diesel - 5 personnes)' }).click()
  await page.getByTestId('comparison-tile-1').getByRole('button', { name: 'Modifier' }).click()
  await page.getByRole('button', { name: 'Voiture électrique', exact: true }).click()
  await page.getByRole('button', { name: 'Voiture électrique (Petite - 1 personne)' }).click()
  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'Voiture électrique (Petite - 1 personne)922 kg CO₂e Modifier'
  )
  await expect(page.getByTestId('comparison-tile-0')).toHaveText(
    'Covoiturage thermique (Berline - Diesel - 5 personnes)587 kg CO₂eMoyen le plus écologique335Kg CO₂eévités Modifier'
  )
}

export const distanceTest = async (page: Page | FrameLocator, prod?: boolean) => {
  await expect(page.getByTestId('category-metro-value')).toHaveText('0.04')
  await expect(page.getByTestId('category-rer-value')).not.toBeVisible()
  await expect(page.getByTestId('category-tgv-value')).not.toBeVisible()

  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Covoiturage électrique (à deux' })
  ).toContainText('Covoiturage électrique (à deux)0.54 kg CO₂e / personneusage : 18%, construction : 82%')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Voiture électrique (seul·e)' })
  ).toContainText('Voiture électrique (seul·e)1.08 kg CO₂e / personneusage : 18%, construction : 82%')
  await page
    .locator('#tabpanel-distance')
    .getByTestId('text-select-car-size-covoiturageelectrique')
    .selectOption('berline')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Covoiturage électrique (à deux' })
  ).toContainText('Covoiturage électrique (à deux)0.73 kg CO₂e / personneusage : 16%, construction : 84%')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Covoiturage électrique (à deux' })
  ).toHaveAttribute('href', '/outils/transport/voiture-berline-electrique+1')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Voiture électrique (seul·e)' })
  ).toContainText('Voiture électrique (seul·e)1.08 kg CO₂e / personneusage : 18%, construction : 82%')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Voiture électrique (seul·e)' })
  ).toHaveAttribute('href', '/outils/transport/voiture-compact-electrique')
  await page.getByRole('button', { name: 'Augmenter le nombre de' }).first().click()
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Covoiturage électrique (à trois' })
  ).toContainText('Covoiturage électrique (à trois)0.48 kg CO₂e / personneusage : 16%, construction : 84%')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Covoiturage électrique (à trois' })
  ).toHaveAttribute('href', '/outils/transport/voiture-berline-electrique+2')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Voiture électrique (seul·e)' })
  ).toContainText('Voiture électrique (seul·e)1.08 kg CO₂e / personneusage : 18%, construction : 82%')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Voiture électrique (seul·e)' })
  ).toHaveAttribute('href', '/outils/transport/voiture-compact-electrique')
  await page
    .locator('#tabpanel-distance')
    .getByTestId('text-select-car-size-voitureelectrique')
    .selectOption('citadine')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Covoiturage électrique (à trois' })
  ).toContainText('Covoiturage électrique (à trois)0.48 kg CO₂e / personneusage : 16%, construction : 84%')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Covoiturage électrique (à trois' })
  ).toHaveAttribute('href', '/outils/transport/voiture-berline-electrique+2')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Voiture électrique (seul·e)' })
  ).toContainText('Voiture électrique (seul·e)0.92 kg CO₂e / personneusage : 20%, construction : 80%')
  await expect(
    page.locator('#tabpanel-distance').getByRole('link', { name: 'Voiture électrique (seul·e)' })
  ).toHaveAttribute('href', '/outils/transport/voiture-citadine-electrique')

  await page.getByTestId('input-km-value').fill('100')
  await expect(page.locator('#tabpanel-distance').getByTestId('category-metro-value')).not.toBeVisible()
  await expect(page.locator('#tabpanel-distance').getByTestId('category-rer-value')).toHaveText('0.98')
  await expect(page.locator('#tabpanel-distance').getByTestId('category-tgv-value')).not.toBeVisible()
  await page.locator('#tabpanel-distance').getByTestId('input-km-value').fill('1000')
  await expect(page.locator('#tabpanel-distance').getByTestId('category-metro-value')).not.toBeVisible()
  await expect(page.locator('#tabpanel-distance').getByTestId('category-rer-value')).not.toBeVisible()
  await expect(page.locator('#tabpanel-distance').getByTestId('category-tgv-value')).toHaveText('2.93')

  await page.getByTestId('header-integrate-button').click()
  await page.getByRole('combobox', { name: 'Arrivée' }).clear({ force: true })

  await expect(page.getByTestId('clipboard-box').first()).toHaveText(
    `<script data-name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="transport" data-search="?theme=default&language=fr&km=1000&defaultMode=list"></script>`
  )

  await page.getByRole('button', { name: 'Voir les options avancées' }).click()
  await page.getByLabel('Ajouter sur votre site').locator('label').filter({ hasText: 'Comparaison' }).click()
  await expect(page.getByTestId('clipboard-box').first()).toHaveText(
    `<script data-name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="transport" data-search="?theme=default&language=fr&km=1000&defaultMode=comparison"></script>`
  )

  await page.locator('span').filter({ hasText: /^TGV$/ }).nth(2).click()
  await page.locator('span').filter({ hasText: /^TER$/ }).nth(2).click()
  await page.getByLabel('Ajouter sur votre site').getByText('Covoiturage thermique', { exact: true }).click()
  await expect(page.getByTestId('clipboard-box').first()).toHaveText(
    `<script data-name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="transport" data-search="?theme=default&language=fr&km=1000&defaultMode=comparison&comparison=voiturethermique,autocar&modes=avion,intercites,voiturethermique,voitureelectrique+1,voitureelectrique,autocar,marche,velo,veloelectrique,busthermique,tramway,metro,scooter,moto,rer,buselectrique,trottinette,campingcar,scooterelectrique,triporteurelectrique,van,voiturehybride+1,voiturehybride"></script>`
  )
  await page.getByTestId('text-select-comparison-1').selectOption('velo')
  await page.getByTestId('text-select-comparison-2').selectOption('moto')
  await expect(page.getByTestId('clipboard-box').first()).toHaveText(
    `<script data-name="impact-co2" src="${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/iframe.js" data-type="transport" data-search="?theme=default&language=fr&km=1000&defaultMode=comparison&comparison=velo,moto&modes=avion,intercites,voiturethermique,voitureelectrique+1,voitureelectrique,autocar,marche,velo,veloelectrique,busthermique,tramway,metro,scooter,moto,rer,buselectrique,trottinette,campingcar,scooterelectrique,triporteurelectrique,van,voiturehybride+1,voiturehybride"></script>`
  )

  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-share-button').click()
  await expect(page.getByTestId('clipboard-box').first()).toHaveText(
    `${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/outils/transport?km=1000&defaultMode=list&language=fr`
  )
  await page.getByTestId('custom-param-km-checkbox').locator('span').nth(1).click()
  await expect(page.getByTestId('clipboard-box').first()).toHaveText(
    `${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/outils/transport?defaultMode=list&language=fr`
  )

  await expect(page.locator('label').filter({ hasText: "Personnaliser l'itinéraire" })).not.toBeVisible()
  await page.getByRole('radio', { name: 'Itinéraire' }).check()
  await page.getByRole('combobox', { name: 'Arrivée' }).first().clear({ force: true })
  await expect(page.getByTestId('clipboard-box').first()).toHaveText(
    `${prod ? 'https://impactco2.fr' : 'http://localhost:3000'}/outils/transport/itineraire?defaultMode=list&language=fr`
  )
  await expect(page.locator('label').filter({ hasText: "Personnaliser l'itinéraire" })).toBeVisible()
}
