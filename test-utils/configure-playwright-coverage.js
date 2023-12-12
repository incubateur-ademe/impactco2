import fs from 'fs'
import v8toIstanbul from 'v8-to-istanbul'
import slugify from '../src/utils/slugify'

// Freely inspired from official docs : https://playwright.dev/docs/api/class-coverage
export default function configurePlaywrightCoverage(test) {
  if (process.env.COVERAGE) {
    test.beforeEach(async ({ page }) => {
      await page.coverage.startJSCoverage()
    })
    test.afterEach(async ({ page }, testInfo) => {
      const coverage = await page.coverage.stopJSCoverage()
      let finalCovObj = {}
      for (const entry of coverage) {
        const converter = v8toIstanbul('', 0, { source: entry.source })
        await converter.load()
        converter.applyCoverage(entry.functions)
        const jsonCovered = converter.toIstanbul()
        const validObject = getValidObject(Object.values(jsonCovered)[0])
        if (validObject) {
          finalCovObj = { ...finalCovObj, ...validObject }
        }
      }
      if (!fs.existsSync('coverage')) {
        fs.mkdirSync('coverage')
      }
      fs.writeFileSync(`coverage/coverage-${slugify(testInfo.title)}.json`, JSON.stringify(finalCovObj, null, 1))
    })
  }
}

// HACK : Playwrights generates weird or buggy or unneeded JSON coverage file,
// so let's simplify them
function getValidObject(obj) {
  let res = null
  let localObj = JSON.parse(JSON.stringify(obj))
  if (localObj && localObj.path) {
    localObj.path = localObj.path.replaceAll('_N_E/', '')
    localObj.path = localObj.path.split('?')[0]
    if (localObj.path.indexOf('impactco2/src') > 0 || localObj.path.indexOf('impactco2/pages') > 0) {
      res = {}
      res[localObj.path] = localObj
    }
  }
  return res
}
