import { expect, test } from '@playwright/test'

test('Simulator chauffage', async ({ page }) => {
  await page.goto('/chauffage')

  await expect(page.getByTestId('input-m2-value')).toHaveValue('63')
  await expect(page.getByTestId('category-link')).toHaveCount(9)
  await expect(page.getByTestId('category-pompeachaleur-value')).toHaveText('103')

  await page.getByTestId('input-m2-value').fill('200')

  await expect(page.getByTestId('input-m2-value')).toHaveValue('200')
  await expect(page.getByTestId('category-link')).toHaveCount(9)
  await expect(page.getByTestId('category-pompeachaleur-value')).toHaveText('327')

  await page.getByTestId('header-integrate-button').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="chauffage" data-search="?m2=200&language=fr&theme=default"></script>'
  )

  await page.getByTestId('custom-param-theme-select').selectOption('night')
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="chauffage" data-search="?m2=200&language=fr&theme=night"></script>'
  )

  await expect(page.getByTestId('input-m2')).toHaveValue('200')
  await page.getByTestId('input-m2-value').fill('300')
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="chauffage" data-search="?m2=300&language=fr&theme=night"></script>'
  )
  await expect(page.getByTestId('category-link')).toHaveCount(9)
  await expect(page.getByTestId('category-pompeachaleur-value')).toHaveText('490')
})

test('Simulator chauffage default value', async ({ page }) => {
  await page.goto('/chauffage?m2=150')

  await expect(page.getByTestId('input-m2-value')).toHaveValue('150')
  await expect(page.getByTestId('category-link')).toHaveCount(9)
  await expect(page.getByTestId('category-pompeachaleur-value')).toHaveText('245')
})

test('Iframes link are opened in new tab', async ({ page }) => {
  await page.goto('/outils/chauffage')

  await expect(page.getByTestId('category-link')).toHaveCount(9)
  let links = page.getByTestId('category-link')
  let elementsCount = await links.count()

  for (let index = 0; index < elementsCount; index++) {
    await expect(links.nth(index)).not.toHaveAttribute('target')
    await expect(links.nth(index)).not.toHaveAttribute('rel')
  }
  await expect(page.getByTestId('impactco2-logos').last()).not.toHaveAttribute('rel')
  await expect(page.getByTestId('impactco2-logos').last()).not.toHaveAttribute('target')

  await page.goto('/iframes/chauffage')

  await expect(page.getByTestId('category-link')).toHaveCount(9)
  links = page.getByTestId('category-link')
  elementsCount = await links.count()

  for (let index = 0; index < elementsCount; index++) {
    await expect(links.nth(index)).toHaveAttribute('target', '_blank')
    await expect(links.nth(index)).toHaveAttribute('rel', 'noreferrer noopener')
  }
  await expect(page.getByTestId('impactco2-logos')).toHaveAttribute('target', '_blank')
  await expect(page.getByTestId('impactco2-logos')).toHaveAttribute('rel', 'noreferrer noopener')
})
