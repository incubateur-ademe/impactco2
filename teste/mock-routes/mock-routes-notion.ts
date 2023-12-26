import { Page } from '@playwright/test'
import { NotionCommand } from 'utils/notion'

export const mockRoutesNotion = async (page: Page, validData: NotionCommand) => {
  await page.route('/api/notion', async (route, request) => {
    const data = request.postDataJSON()
    if (
      validData.email === data.email &&
      validData.from === data.from &&
      validData.structure === data.structure &&
      validData.type === data.type &&
      validData.needs === data.needs
    ) {
      await route.fulfill({
        headers: {
          Etag: 'mocked, because it was run in a E2E environment',
        },
        body: 'success',
      })
    } else {
      await route.fulfill({
        headers: {
          Etag: 'mocked, because it was run in a E2E environment',
        },
        body: 'error',
        status: 500,
      })
    }
  })
}
