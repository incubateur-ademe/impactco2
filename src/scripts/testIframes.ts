import { FrameLocator, Page, chromium } from '@playwright/test'
import { expect } from '@playwright/test'
import { itineraireTest } from '../../teste/itineraire'
import { mockRoutesItinerary } from '../../teste/mock-routes/mock-routes-itinerary'

const checks = [
  {
    url: 'https://www.operadeparis.fr/infos-pratiques/preparer-votre-venue/palais-garnier',
    before: async (page: Page) => {
      await page.getByLabel('Accepter et fermer').click()
      await page.getByRole('button', { name: "Calculez l'empreinte carbone" }).click()
    },
    check: async (iframe: FrameLocator) => {
      await expect(iframe.getByTestId('header-share-button')).toBeInViewport()
      await expect(iframe.getByLabel('Arrivée')).toHaveAttribute(
        'value',
        "L'Opéra Restaurant Place Jacques Rouché Paris 75009 France",
        { timeout: 10000 }
      )
      await iframe.getByLabel('Arrivée').clear()

      await itineraireTest(iframe, true)
    },
  },
]
const test = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await mockRoutesItinerary(page)
  const errors: string[] = []
  for (let i = 0; i < checks.length; i++) {
    const { before, url, check } = checks[i]
    try {
      page.goto(url)
      if (before) {
        await before(page)
      }

      const iframe = page.locator('iframe[title="Impact CO₂"]').contentFrame()
      await iframe.locator('.main-iframe').scrollIntoViewIfNeeded()
      await check(iframe)
    } catch (e) {
      console.log(e)
      errors.push(url)
    }
  }

  if (errors.length) {
    console.log('Iframes are broken on the following sites :')
    errors.forEach(console.log)
  }
  browser.close()
}

test()
