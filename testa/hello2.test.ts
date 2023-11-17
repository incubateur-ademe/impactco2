import type { PageConfig } from 'next'
import { testApiHandler } from 'next-test-api-route-handler'
// Import the handler under test from the pages/api directory
import endpoint from '../pages/api/hello'

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint

it('calls simple hello API endpoint', async () => {
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' })
      await expect(res.json()).resolves.toStrictEqual({ hello: 'world' }) // ◄ Passes!
    },
  })
})
