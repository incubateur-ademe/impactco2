import { expect, test } from '@playwright/test'
import { comparateurTest } from './comparateur'

test('Comparateur', async ({ page }) => {
  await page.goto('http://localhost:3000/comparateur')

  await comparateurTest(page)
})

test('Iframes', async ({ page }) => {
  await page.goto(
    'http://localhost:3000/iframes/comparateur?value=5&comparisons=ail,tomate,voitureelectrique+3&equivalent=abricot'
  )
  await expect(page.getByTestId('compared-equivalent-value')).toHaveText('7.26 kg CO₂e')
  await expect(page.getByTestId('comparateur-ail-value')).toHaveText('18.9')
  await expect(page.getByTestId('comparateur-tomate-value')).toHaveText('11.6')
  await expect(page.getByTestId('comparateur-voitureelectrique+3-value')).toHaveText('281')

  await page.goto(
    'http://localhost:3000/iframes/comparateur/etiquette-animee?value=7.26&comparisons=abricot,ail,tomate,voitureelectrique+3'
  )
  await expect(page.getByTestId('etiquette-value')).toHaveText('7.26')
  await expect(page.getByTestId('etiquette-abricot-value')).toHaveText('5')
  await expect(page.getByTestId('etiquette-ail-value')).toHaveText('18.9')
  await expect(page.getByTestId('etiquette-tomate-value')).toHaveText('11.6')
  await expect(page.getByTestId('etiquette-voitureelectrique+3-value')).toHaveText('281')

  await page.goto(
    'http://localhost:3000/iframes/comparateur/etiquette?value=7.26&comparisons=abricot,ail,tomate,voitureelectrique+3'
  )
  await expect(page.getByTestId('etiquette-value')).toHaveText('7.26')
  await expect(page.getByTestId('etiquette-abricot-value')).toHaveText('5')
  await expect(page.getByTestId('etiquette-ail-value')).toHaveText('18.9')
  await expect(page.getByTestId('etiquette-tomate-value')).toHaveText('11.6')
  await expect(page.getByTestId('etiquette-voitureelectrique+3-value')).toHaveText('281')
})
