import livraisonjson from '../test-mock/livraison.json'

export const mockRoutes = async (page) => {
  await page.route(/hotjar/, async (route) => {
    await route.fulfill({
      status: 200,
      headers: {
        Etag: 'mocked, because it was run in a E2E environment',
      },
    })
  })

  await page.route('https://deploy-preview-1895--ecolab-data.netlify.app/co2-model.FR-lang.fr.json', async (route) => {
    await route.fulfill({
      body: JSON.stringify(livraisonjson),
    })
  })
}
