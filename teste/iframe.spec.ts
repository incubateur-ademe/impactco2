import { expect, test } from '@playwright/test'

test('Display transport iframe by script', async ({ page }) => {
  await page.goto('http://localhost:3000/test/iframe.html')

  await expect(page.frameLocator('#iFrameResizer0').getByTestId('comparison-tile-0')).toHaveText(
    'Voiture thermique2.18 kg CO₂e Modifier'
  )
  await expect(page.frameLocator('#iFrameResizer0').getByTestId('comparison-tile-1')).toHaveText(
    '2.15Kg CO₂eévitésTGV0.03 kg CO₂e Modifier'
  )
})
