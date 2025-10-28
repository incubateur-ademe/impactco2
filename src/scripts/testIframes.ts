import { chromium } from '@playwright/test'
import axios from 'axios'
import { config } from 'dotenv'
import { mockRoutesItinerary } from '../../teste/mock-routes/mock-routes-itinerary'
import { checks } from './testIframes.config'

config()

const test = async () => {
  console.log('Check iframes')
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await mockRoutesItinerary(page)
  const errors: string[] = []
  for (let i = 0; i < checks.length; i++) {
    const { before, url, check, checkIframe, scroll, iframeContent, skipAutoCheck, skipWait } = checks[i]
    if (skipAutoCheck) {
      continue
    }

    console.log('check', url)
    try {
      await page.goto(url, { timeout: 60000 })
      if (!skipWait) {
        await page.waitForLoadState('networkidle', { timeout: 60000 })
      }

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
    } catch (e) {
      console.log(e)
      errors.push(`${url} (${e})`)
    }
  }

  if (errors.length) {
    if (process.env.MATTERMOST_IMPACTCO2) {
      axios.post(`https://mattermost.incubateur.net/hooks/${process.env.MATTERMOST_IMPACTCO2}`, {
        text: `Iframes are broken on the following site${errors.length > 1 ? 's' : ''}:\n ${errors.join('\n')}`,
      })
    } else {
      console.log('Iframes are broken on the following sites :')
      errors.forEach((error) => console.log(error))
    }
  } else {
    console.log('All good')
  }
  browser.close()
}

test()
