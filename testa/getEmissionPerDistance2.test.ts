import type { PageConfig } from 'next'
import { testApiHandler } from 'next-test-api-route-handler'
// Import the handler under test from the pages/api directory
import endpoint from '../pages/api/getEmissionsPerDistance.js'

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint

it('getEmissionPerDistance with next-test-api-route-handler', async () => {
  await testApiHandler({
    handler,
    url: '?km=3&fields=description,display&transportations=14',
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' })
      // console.log(
      //   'res: ',
      //   res.json().then((docs) => {
      //     console.log(docs)
      //   })
      // )
      await expect(res.json()).resolves.toStrictEqual([
        {
          id: 14,
          name: 'RER ou Transilien',
          emissions: {
            gco2e: 12.299999999999999,
            kgco2e: 0.012299999999999998,
            tco2e: 0.000012299999999999999,
          },
          description: '4,1 gCO2e/km/personne ; Base Carbone ADEME',
          display: { min: 11, max: 100 },
        },
      ])
    },
  })
})
