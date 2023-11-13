import livraisonjson from '../test-mock/livraison.json'

export const mockRoutes = async (page) => {
  await page.route('https://deploy-preview-1895--ecolab-data.netlify.app/co2-model.FR-lang.fr.json', async (route) => {
    await route.fulfill({
      body: JSON.stringify(livraisonjson),
    })
  })
}
