import type { PageConfig } from 'next'
import { testApiHandler } from 'next-test-api-route-handler'
// Import the handler under test from the pages/api directory
import endpoint from '../pages/api/hello'

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint

it.skip('calls simple hello API endpoint', async () => {
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' })
      await expect(res.json()).resolves.toStrictEqual({
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      }) // ◄ Passes!
    },
  })
})
