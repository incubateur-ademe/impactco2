import { expect, test } from '@playwright/test'
import fs from 'fs'
import v8toIstanbul from 'v8-to-istanbul'

test.beforeEach(async ({ page }) => {
  await page.coverage.startJSCoverage()
  await page.goto('/usagenumerique')
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
  // pti.write([...coverage], { includeHostname: true, storagePath: './.nyc_output' })
  // console.log('testInfo: ', testInfo)
})

test('La page des usages numériques se charge correctement', async ({ page }) => {
  await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO2/)
  await expect(page.getByRole('heading').first()).toHaveText("Découvrez l'impact des usages numériquessur le climat")
})
test("Par défaut, des valeurs s'affichent pour les usages", async ({ page }) => {
  await expect(page.getByTestId('impactNumeriqueTotal')).toHaveText('0,3 kg CO2e par semaine')
  // for (const entry of coverage) {
  //   const converter = v8toIstanbul('', 0, { source: entry.source })
  //   await converter.load()
  //   converter.applyCoverage(entry.functions)
  //   // console.log(JSON.stringify(converter.toIstanbul()))
  // }
})

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

function getValidObject(obj) {
  let localObj = JSON.parse(JSON.stringify(obj))
  if (localObj && localObj.path) {
    localObj.path = localObj.path.replaceAll('_N_E/', '')
    localObj.path = localObj.path.split('?')[0]
    if (localObj.path.indexOf('impactco2/src') > 0) {
      console.log('ok for ' + localObj.path)
    }
    return localObj
  }
  return null
}
