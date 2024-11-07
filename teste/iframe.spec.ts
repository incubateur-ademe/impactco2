import { expect, test } from '@playwright/test'
import { checks } from 'src/scripts/testIframes.config'
import { mockRoutesItinerary } from './mock-routes/mock-routes-itinerary'

test('Display transport iframe by script', async ({ page }) => {
  await page.goto('http://localhost:3000/test/iframe.html')

  await expect(page.frameLocator('#iFrameResizer0').getByTestId('comparison-tile-0')).toBeInViewport()
  await expect(page.frameLocator('#iFrameResizer0').getByTestId('comparison-tile-0')).toHaveText(
    'Voiture thermique2.18 kg CO₂e Modifier'
  )

  await expect(page.frameLocator('#iFrameResizer0').getByTestId('comparison-tile-1')).toBeInViewport()
  await expect(page.frameLocator('#iFrameResizer0').getByTestId('comparison-tile-1')).toHaveText(
    'TGV0.03 kg CO₂eMoyen le plus écologique2.15Kg CO₂eévités Modifier'
  )
})

checks.forEach(({ slug, before, url, check, checkIframe, scroll, iframeContent }) => {
  test(slug, async ({ page }) => {
    test.skip(process.env.TEST_IFRAME !== 'true', 'Disbaled because TEST_IFRAME is not true')
    await mockRoutesItinerary(page)

    await page.goto(url)
    await page.waitForLoadState('networkidle', { timeout: 60000 })

    if (before) {
      await before(page)
    }

    if (checkIframe) {
      const iframe = iframeContent ? iframeContent(page) : page.locator('#iFrameResizer0').contentFrame()
      if (scroll) {
        await iframe.locator('.main-iframe').scrollIntoViewIfNeeded()
      }
      await checkIframe(iframe)
    } else if (check) {
      await check(page)
    }
  })
})
