import { expect, test } from '@playwright/test'
import { usageNumeriqueTest } from './usagenumerique'

test.beforeEach(async ({ page }) => {
  await page.goto('/usagenumerique')
})

test('Update share and integrate values when modifying parameters', async ({ page }) => {
  await usageNumeriqueTest(page)
})

test('Load default values', async ({ page }) => {
  await page.goto(
    "http://localhost:3000/usagenumerique?emails=744&email . appareil='tablette'&email . transmission . émetteur . réseau='mobile FR'&email . taille=1&streaming . durée=2100&streaming . appareil='ordinateur portable'&streaming . transmission . réseau='mobile FR'&streaming . qualité='SD'&visio . durée=3100&visio . appareil='ordinateur et écran'&visio . emplacements=1&visio . transmission . réseau='mobile FR'&visio . qualité='audio'"
  )
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.94')
  await expect(page.getByTestId('category-email')).toHaveText("1 an d'email - 38688 emails43.9 kg CO₂e")

  await page.goto(
    "http://localhost:3000/usagenumerique?emails=744&email . appareil='tablette'&email . transmission . émetteur . réseau='mobile FR'&email . taille=1&streaming . durée=2100&streaming . appareil='ordinateur portable'&streaming . transmission . réseau='mobile FR'&streaming . qualité='SD'&visio . durée=3100&visio . appareil='ordinateur et écran'&visio . emplacements=1&visio . transmission . réseau='mobile FR'&visio . qualité='audio'&display=graphic"
  )
  await expect(page.getByTestId('usagenumerique-generated-value')).not.toBeVisible()
  await expect(page.getByTestId('category-email')).toHaveText("1 an d'email - 38688 emails43.9 kg CO₂e ")

  await page.goto(
    "http://localhost:3000/usagenumerique?emails=744&email . appareil='tablette'&email . transmission . émetteur . réseau='mobile FR'&email . taille=1&streaming . durée=2100&streaming . appareil='ordinateur portable'&streaming . transmission . réseau='mobile FR'&streaming . qualité='SD'&visio . durée=3100&visio . appareil='ordinateur et écran'&visio . emplacements=1&visio . transmission . réseau='mobile FR'&visio . qualité='audio'&display=simulator"
  )
  await expect(page.getByTestId('usagenumerique-generated-value')).toHaveText('1.94')
  await expect(page.getByTestId('category-email')).not.toBeVisible
})
