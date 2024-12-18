import { expect, test } from '@playwright/test'

test('Alimentation simulateur', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/alimentation')
  await expect(page.getByTestId('text-select-category')).toHaveValue('group')
  await expect(page.getByTestId('alimentation-category-viandes')).toBeVisible()
  await expect(page.getByTestId('alimentation-category-boucherie')).not.toBeVisible()

  await page.getByTestId('alimentation-category-viandes').click()
  await expect(page.getByTestId('category-boeuf')).toHaveText('Boeuf26.2 kg CO₂e')

  await page.getByTestId('text-select-category').selectOption('rayon')
  await expect(page.getByTestId('alimentation-category-viandes')).not.toBeVisible()
  await expect(page.getByTestId('alimentation-category-boucherie')).toBeVisible()

  await page.getByTestId('text-select-category').selectOption('popularity')
  await expect(page.getByTestId('alimentation-category-viandes')).not.toBeVisible()
  await expect(page.getByTestId('alimentation-category-boucherie')).not.toBeVisible()
  await expect(page.getByTestId('category-boeuf')).toHaveText('Boeuf26.2 kg CO₂e')

  await page.getByTestId('header-share-button').first().click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    'http://localhost:3000/outils/alimentation?alimentationCategory=popularity&language=fr'
  )
  await page.getByText('Rayons du magasin', { exact: true }).click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    'http://localhost:3000/outils/alimentation?alimentationCategory=rayon&language=fr'
  )

  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-integrate-button').first().click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="/alimentation" data-search="?alimentationCategory=popularity&theme=default&language=fr"></script>'
  )
  await page.getByLabel('Rayons du magasin').check()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="/alimentation" data-search="?alimentationCategory=rayon&theme=default&language=fr"></script>'
  )

  await page.getByText('Créer une liste d’aliments').click()
  await expect(page.getByLabel('Rayons du magasin')).toBeDisabled()

  await page.getByTestId('checkbox-alimentation-list-boeuf-checkbox').check()
  await page.getByTestId('checkbox-alimentation-list-porc-checkbox').check()
  await page.getByTestId('checkbox-alimentation-list-crevettes-checkbox').check()
  await page.locator('li').filter({ hasText: 'Poissons et fruits de mertout' }).getByRole('button').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="/alimentation" data-search="?alimentationEquivalents=boeuf,porc,crevettes,cabillaud,lieu,dorade,saumon,moules,huitres,thon,sardines&theme=default&language=fr"></script>'
  )

  await page.getByTestId('checkbox-custom-param-hideButtons-checkbox').check()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="/alimentation" data-search="?alimentationEquivalents=boeuf,porc,crevettes,cabillaud,lieu,dorade,saumon,moules,huitres,thon,sardines&theme=default&language=fr"></script>'
  )
})

test('Alimentation simulateur params', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/alimentation?alimentationCategory=popularity')
  await expect(page.getByTestId('text-select-category')).toBeVisible()
  await expect(page.getByTestId('alimentation-category-viandes')).not.toBeVisible()
  await expect(page.getByTestId('alimentation-category-boucherie')).not.toBeVisible()
  await expect(page.getByTestId('category-boeuf')).toHaveText('Boeuf26.2 kg CO₂e')
  await expect(page.getByRole('button', { name: 'Comprendre les données' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Aller plus loin' })).toBeVisible()
  await expect(page.getByTestId('header-share-button')).toHaveCount(2)
  await expect(page.getByTestId('header-integrate-button')).toHaveCount(2)

  await page.goto(
    'http://localhost:3000/outils/alimentation?alimentationEquivalents=boeuf,porc&alimentationCategory=rayon'
  )
  await expect(page.getByTestId('text-select-category')).not.toBeVisible()
  await expect(page.getByTestId('alimentation-category-viandes')).not.toBeVisible()
  await expect(page.getByTestId('alimentation-category-boucherie')).not.toBeVisible()
  await expect(page.getByTestId('category-boeuf')).toHaveText('Boeuf26.2 kg CO₂e')
  await expect(page.getByTestId('category-porc')).toHaveText('Porc9.66 kg CO₂e')
  await expect(page.getByRole('button', { name: 'Comprendre les données' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Aller plus loin' })).toBeVisible()
  await expect(page.getByTestId('header-share-button')).toHaveCount(2)
  await expect(page.getByTestId('header-integrate-button')).toHaveCount(2)

  await page.goto('http://localhost:3000/outils/alimentation?alimentationEquivalents=boeuf,porc&hideButtons=true')
  await expect(page.getByTestId('text-select-category')).not.toBeVisible()
  await expect(page.getByTestId('alimentation-category-viandes')).not.toBeVisible()
  await expect(page.getByTestId('alimentation-category-boucherie')).not.toBeVisible()
  await expect(page.getByTestId('category-boeuf')).toHaveText('Boeuf26.2 kg CO₂e')
  await expect(page.getByTestId('category-porc')).toHaveText('Porc9.66 kg CO₂e')
  await expect(page.getByRole('button', { name: 'Comprendre les données' })).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'Aller plus loin' })).not.toBeVisible()
  await expect(page.getByTestId('header-share-button')).not.toBeVisible()
  await expect(page.getByTestId('header-integrate-button')).not.toBeVisible()
})
