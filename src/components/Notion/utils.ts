import { unstable_cache } from 'next/cache'
import { NotionAPI } from 'notion-client'
import { getRevalidate } from 'utils/revalidate'

const notion = new NotionAPI()

const getNotionPageWithRetry = async (id: string, retries = 3) => {
  try {
    return await notion.getPage(id)
  } catch (e) {
    if (retries > 0) {
      const error = e as { response?: { status?: number; headers?: Headers } }
      const status = error.response?.status
      if (status === 429) {
        const retryAfterHeader = error.response?.headers?.get('retry-after')
        const delay = retryAfterHeader ? parseFloat(retryAfterHeader) * 1000 : 5000
        await new Promise((resolve) => setTimeout(resolve, delay))
        return getNotionPageWithRetry(id, retries - 1)
      }
    }
    throw e
  }
}

export const getNotionContentProps = unstable_cache(
  async (id: string) => {
    try {
      return await getNotionPageWithRetry(id)
    } catch (e) {
      console.error('Unable to get content from Notion', e)
      return undefined
    }
  },
  undefined,
  { revalidate: getRevalidate(process.env.NOTION_TABLE_REVALIDATE) }
)

export const improveAccessibility = (ref: HTMLDivElement) => {
  const elements = ref.getElementsByTagName('svg')
  for (const element of elements) {
    element.setAttribute('alt', '')
  }

  const mains = ref.getElementsByTagName('main')
  for (const main of mains) {
    main.outerHTML = `<div>${main.innerHTML}</div>`
  }
  const lis = ref.getElementsByTagName('li')
  for (const li of lis) {
    li.innerHTML = `<p>${li.innerHTML}</p>`
  }
  const texts = ref.getElementsByClassName('notion-text')
  for (const text of texts) {
    text.innerHTML = `<p>${text.innerHTML}</p>`
  }
  const calloutTexts = ref.getElementsByClassName('notion-callout-text')
  for (const calloutText of calloutTexts) {
    calloutText.innerHTML = `<p>${calloutText.innerHTML}</p>`
  }

  const icons = ref.getElementsByClassName('notion-page-icon')
  for (const icon of icons) {
    if (icon.tagName.toLowerCase() === 'span') {
      icon.removeAttribute('role')
      icon.removeAttribute('aria-label')
      icon.setAttribute('aria-hidden', 'true')
    } else if (icon.tagName.toLowerCase() === 'img') {
      icon.setAttribute('alt', '')
    }
  }
  const fastLinks = ref.getElementsByClassName('notion-hash-link')
  for (const fastLink of fastLinks) {
    fastLink.remove()
  }
}
