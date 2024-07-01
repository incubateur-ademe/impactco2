import { expect, test } from '@playwright/test'

test('Simulator livraison', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/livraison')

  await expect(page.getByTestId('livraison-colis-value')).toHaveText('2.46')
  await expect(page.getByTestId('livraison-habits-value')).toHaveText('29.6')

  await expect(page.getByTestId('etiquette-voiturethermique-value')).toContainText('11.3')
  await expect(page.getByTestId('etiquette-repasavecduboeuf-value')).toContainText('0.34')
  await expect(page.getByTestId('etiquette-streamingvideo-value')).toContainText('38.5')

  await page.getByTestId('text-select-livraison-produit').selectOption('grande consommation')
  await expect(page.getByLabel("Le point relais est t'il sur")).toBeVisible()
  await expect(page.getByTestId('input-km-value')).toBeVisible()
  await expect(page.getByTestId('text-select-km-type')).toBeVisible()
  await expect(page.getByTestId('livraison-colis-value')).toHaveText('10.2')

  await page.getByLabel('Oui', { exact: true }).check()
  await expect(page.getByTestId('input-km-value')).not.toBeVisible()
  await expect(page.getByTestId('text-select-km-type')).not.toBeVisible()
  await expect(page.getByTestId('livraison-colis-value')).toHaveText('8.73')

  await page.getByLabel("Le point relais est t'il sur").getByLabel('Non').check()
  await page.getByTestId('input-km-value').click()
  await page.getByTestId('input-km-value').fill('10')
  await expect(page.getByTestId('livraison-colis-value')).toHaveText('10.9')

  await page.getByTestId('text-select-km-type').selectOption('vélo')
  await expect(page.getByTestId('livraison-colis-value')).toHaveText('8.73')

  await page.getByTestId('text-select-livraison-retrait').selectOption('domicile')
  await expect(page.getByLabel("Le point relais est t'il sur")).not.toBeVisible()
  await expect(page.getByTestId('input-km-value')).not.toBeVisible()
  await expect(page.getByTestId('text-select-km-type')).not.toBeVisible()
  await expect(page.getByTestId('livraison-colis-value')).toHaveText('8.73')

  await page.getByLabel('Oui (transport par avion)').check()
  await expect(page.getByTestId('livraison-colis-value')).toHaveText('225')

  await expect(page.getByTestId('livraison-habits-value')).toHaveText('2,698')
  await page.getByTestId('input-number-value').fill('3')
  await expect(page.getByTestId('livraison-habits-value')).toHaveText('8,095')
  await page.getByTestId('text-select-frequence-type').selectOption('52')
  await expect(page.getByTestId('livraison-habits-value')).toHaveText('35,080')
})
