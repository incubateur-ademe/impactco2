import { expect, test } from '@playwright/test'
import { distanceComparisonTest, distanceTest } from './distance'

test('Transport distance list', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/transport')
  await distanceTest(page)
})

test('Transport distance comparison', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/transport?defaultMode=comparison')
  await distanceComparisonTest(page)
})

test('Transport distance default values', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/transport?km=15')

  await expect(
    page.getByRole('link', { name: 'Covoiturage électrique un conducteur plus 1 passager 0.78 kg CO₂e' })
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Covoiturage thermique un conducteur plus 1 passager 1.63 kg CO₂e' })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bus électrique 0.33 kg CO₂e' })).not.toBeVisible()
  await page.getByRole('button', { name: 'Voir tous les modes de' }).click()
  await expect(page.getByRole('link', { name: 'Bus électrique 0.33 kg CO₂e' })).toBeVisible()

  await page.goto(
    'http://localhost:3000/outils/transport?comparison=scooter,avion&km=15&itineraireStart=Lyon%20France&itineraireEnd=Paris%20France&defaultMode=comparison&modes=intercites,voiturethermique,voitureelectrique,velo,veloelectrique,busthermique,tramway,metro,scooter,moto,rer,ter,trottinette,busgnv,voitureelectrique+1',
    { timeout: 60000 }
  )

  await expect(page.getByTestId('transport-tab-itineraire')).toBeVisible()

  await expect(page.getByText("Mode d'affichage :ListeComparaison")).toBeVisible()
  await expect(page.getByTestId('comparison-tile-0')).toHaveText(
    'Scooter ou moto légère thermique1.14 kg CO₂e Modifier'
  )
  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'Avion court courrierDésolé !L’itinéraire demandé n’est pas compatible avec ce mode de transport Modifier'
  )

  await page.getByText('Liste').click()
  await expect(page.getByRole('link', { name: 'Bus thermique 1.7 kg CO₂e' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bus électrique 0.33 kg CO₂e' })).not.toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Covoiturage électrique un conducteur plus 1 passager 0.78 kg CO₂e' })
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Covoiturage thermique un conducteur plus 1 passager 1.63 kg CO₂e' })
  ).not.toBeVisible()

  await page.getByRole('button', { name: 'Voir tous les modes de' }).click()
  await expect(page.getByRole('link', { name: 'Bus thermique 1.7 kg CO₂e' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bus électrique 0.33 kg CO₂e' })).not.toBeVisible()

  await page.goto('http://localhost:3000/outils/transport?modes=velo,voiturethermique&defaultMode=comparison')
  await expect(page.getByTestId('comparison-tile-0')).toHaveText(
    'Vélo ou marche0 kg CO₂eMoyen le plus écologique2.18Kg CO₂eévités'
  )
  await expect(page.getByTestId('comparison-tile-1')).toHaveText('Voiture thermique2.18 kg CO₂e')

  await page.goto(
    'http://localhost:3000/outils/transport?modes=velo,voiturethermique,voiturethermique+1&defaultMode=comparison'
  )
  await expect(page.getByTestId('comparison-tile-0')).toHaveText('Voiture thermique2.18 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'Covoiturage thermique (1 passager)1.09 kg CO₂eMoyen le plus écologique1.09Kg CO₂eévités Modifier'
  )
  await expect(page.getByRole('button', { name: 'Voir une autre comparaison' })).not.toBeVisible()

  await page.goto(
    'http://localhost:3000/outils/transport?&tabs=distance&km=15&mode=comparison&comparison=metro,avion&modes=voiturethermique,tgv,metro,avion'
  )
  await expect(page.getByTestId('transport-tab-itineraire')).not.toBeVisible()
  await expect(page.getByText("Mode d'affichage :ListeComparaison")).not.toBeVisible()
  await expect(page.getByTestId('comparison-tile-0')).toHaveText(
    'Métro0.07 kg CO₂eMoyen le plus écologique3.81Kg CO₂eévités Modifier'
  )
  await expect(page.getByTestId('comparison-tile-1')).toHaveText('Avion court courrier3.88 kg CO₂e Modifier')

  await page.goto(
    'http://localhost:3000/outils/transport?km=10&comparison=voiturethermique+1,voitureelectrique+2&defaultMode=comparison&language=fr&modes=voiturethermique+1,voitureelectrique+1',
    {
      timeout: 60000,
    }
  )
  await expect(page.getByTestId('comparison-tile-0')).toHaveText(
    'Covoiturage thermique (1 passager)1.09 kg CO₂e Modifier'
  )
  await expect(page.getByTestId('comparison-tile-1')).toHaveText(
    'Covoiturage électrique (2 passagers)0.34 kg CO₂eMoyen le plus écologique0.74Kg CO₂eévités Modifier'
  )

  await page.goto(
    'http://localhost:3000/outils/transport?km=10&comparison=voiturethermique+1,voitureelectrique+2&defaultMode=comparison&language=fr&modes=voiturethermique+1,voitureelectrique+1,tgv',
    {
      timeout: 60000,
    }
  )
  await expect(page.getByRole('button', { name: 'Voir une autre comparaison' })).not.toBeVisible()
})
