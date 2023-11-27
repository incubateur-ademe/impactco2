import { test as baseTest } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

const istanbulCLIOutput = path.join(process.cwd(), 'coverage')

export const test = baseTest.extend({
  context: async ({ context }, use) => {
    await context.addInitScript(() =>
      window.addEventListener('beforeunload', () =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__))
      )
    )
    await fs.promises.mkdir(istanbulCLIOutput, { recursive: true })
    await context.exposeFunction('collectIstanbulCoverage', (coverageJSON: string) => {
      if (coverageJSON) fs.writeFileSync(path.join(istanbulCLIOutput, `playwright_coverage.json`), coverageJSON)
    })
    await use(context)
    for (const page of context.pages()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await page.evaluate(() => (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__)))
    }
  },
})

export const expect = test.expect
